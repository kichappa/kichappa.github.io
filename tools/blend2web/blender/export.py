# This script runs inside Blender: blender -b scene.blend --python export.py -- config.json
# It turns the scene into what Model3D shows: a .glb and the model-viewer settings for the starting view.
# blend2web.mjs writes the config, starts this script, and then finishes the files (compression, poster, module).
import bpy, bmesh, sys, os, json, math, time, importlib
import numpy as np
import mathutils

argv = sys.argv[sys.argv.index('--') + 1:]
cfg = json.load(open(argv[0]))
scene = bpy.context.scene
t0 = time.time()


# This function prints a progress line with the seconds since the start.
def log(*a):
    print('[blend2web %5.0fs]' % (time.time() - t0), *a, flush=True)


# This function makes Cycles use the graphics card when there is one (OptiX, then CUDA), and the processor otherwise.
def use_gpu():
    scene.render.engine = 'CYCLES'
    prefs = bpy.context.preferences.addons['cycles'].preferences
    for kind in ('OPTIX', 'CUDA', 'HIP', 'METAL'):
        try:
            prefs.compute_device_type = kind
        except TypeError:
            continue
        prefs.get_devices()
        devices = [d for d in prefs.devices if d.type == kind]
        if devices:
            for d in prefs.devices:
                d.use = d.type == kind
            scene.cycles.device = 'GPU'
            log('rendering on', kind, devices[0].name)
            return
    scene.cycles.device = 'CPU'
    log('rendering on the processor')


# This function selects exactly the given objects and makes the first one active, which most operators need.
def select(objects):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objects:
        o.hide_select = False
        o.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]


# This function returns the camera the web view starts from: the one named in the config, else the scene camera.
def find_camera():
    name = cfg.get('camera')
    if name:
        cam = bpy.data.objects.get(name)
        if cam is None or cam.type != 'CAMERA':
            raise SystemExit('No camera named %r in this file' % name)
        return cam
    if scene.camera is None:
        # Some files have a camera that is not set as the scene camera; the first one is used then.
        cams = sorted((o for o in bpy.data.objects if o.type == 'CAMERA'), key=lambda o: o.name)
        if cams:
            log('no scene camera; using', cams[0].name)
            return cams[0]
    return scene.camera


# This function removes what should not be on the web: objects hidden from renders and objects named in --exclude.
# It also turns curves, text and modifiers into plain meshes, which is what glTF can hold.
def prepare_meshes():
    exclude = set(cfg.get('exclude', []))
    for o in list(scene.objects):
        if o.type in ('MESH', 'CURVE', 'SURFACE', 'META', 'FONT') and (o.hide_render or o.name in exclude):
            bpy.data.objects.remove(o)
    for o in scene.objects:
        o.hide_set(False)
        o.hide_viewport = False
        # Objects in collections that are hidden in the view layer cannot be selected, so they move to the scene's own collection.
        if not o.visible_get():
            for c in list(o.users_collection):
                c.objects.unlink(o)
            scene.collection.objects.link(o)
    geometry = [o for o in scene.objects if o.type in ('MESH', 'CURVE', 'SURFACE', 'META', 'FONT')]
    if not geometry:
        raise SystemExit('There is nothing to export in this file')
    select(geometry)
    bpy.ops.object.duplicates_make_real()
    geometry = [o for o in scene.objects if o.type in ('MESH', 'CURVE', 'SURFACE', 'META', 'FONT')]
    select(geometry)
    bpy.ops.object.convert(target='MESH')
    meshes = [o for o in scene.objects if o.type == 'MESH']
    log('meshes', len(meshes), 'faces', sum(len(o.data.polygons) for o in meshes))
    return meshes


# This function tells whether a material is see-through: glass, transmission, or a low alpha.
def is_glass(m):
    if m is None or not m.use_nodes:
        return False
    for n in m.node_tree.nodes:
        if n.type == 'BSDF_GLASS':
            return True
        if n.type == 'BSDF_PRINCIPLED':
            tw = n.inputs.get('Transmission Weight') or n.inputs.get('Transmission')
            if (tw is not None and not tw.is_linked and tw.default_value > 0.5) or (not n.inputs['Alpha'].is_linked and n.inputs['Alpha'].default_value < 0.6):
                return True
    return False


# This function adds a sky and a sun when the scene has no light of its own, so that baking has something to show.
def ensure_light():
    has_lamp = any(o.type == 'LIGHT' for o in scene.objects)
    w = scene.world
    has_world = w is not None and w.use_nodes and any(n.type in ('TEX_SKY', 'TEX_ENVIRONMENT') for n in w.node_tree.nodes)
    if has_lamp or has_world:
        return
    log('the scene has no lights; adding a sky and a sun')
    w = w or bpy.data.worlds.new('World')
    scene.world = w
    w.use_nodes = True
    nt = w.node_tree
    nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputWorld')
    sky = nt.nodes.new('ShaderNodeTexSky')
    sky.sun_disc = False
    sky.sun_elevation = math.radians(45)
    sky.sun_rotation = math.radians(135)
    bg = nt.nodes.new('ShaderNodeBackground')
    bg.inputs['Strength'].default_value = 0.3
    nt.links.new(sky.outputs['Color'], bg.inputs['Color'])
    nt.links.new(bg.outputs['Background'], out.inputs['Surface'])
    sun = bpy.data.objects.new('blend2web sun', bpy.data.lights.new('blend2web sun', 'SUN'))
    sun.data.energy = 4.0
    sun.data.angle = math.radians(1)
    sun.rotation_euler = (math.radians(45), 0, math.radians(135))
    scene.collection.objects.link(sun)


# This function joins the given meshes into one object with all transforms applied.
def join(objects, name):
    select(objects)
    if len(objects) > 1:
        bpy.ops.object.join()
    o = bpy.context.view_layer.objects.active
    o.name = name
    o.data.name = name
    with bpy.context.temp_override(object=o, active_object=o, selected_objects=[o], selected_editable_objects=[o]):
        bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return o


# This function moves the faces that use see-through materials into a separate object, which is returned (or None).
def split_glass(o):
    glass_slots = [i for i, s in enumerate(o.material_slots) if is_glass(s.material)]
    if not glass_slots:
        return None
    select([o])
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='DESELECT')
    for i in glass_slots:
        o.active_material_index = i
        bpy.ops.object.material_slot_select()
    bpy.ops.mesh.separate(type='SELECTED')
    bpy.ops.object.mode_set(mode='OBJECT')
    g = [x for x in bpy.context.selected_objects if x != o][0]
    g.name = o.name + '_glass'
    g.data.name = g.name
    return g


# This function merges flat faces (Revit and other CAD exports split them into many triangles) without changing the shape.
def simplify(o):
    bm = bmesh.new()
    bm.from_mesh(o.data)
    before = len(bm.faces)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=0.0005)
    bmesh.ops.dissolve_limit(bm, angle_limit=math.radians(0.5), verts=bm.verts, edges=bm.edges, delimit={'MATERIAL', 'SEAM', 'UV'})
    bmesh.ops.triangulate(bm, faces=bm.faces)
    bm.to_mesh(o.data)
    bm.free()
    log('%s: %d -> %d faces' % (o.name, before, len(o.data.polygons)))


# This function gives the object a new UV map covering one atlas, keeping its other UVs for its own textures.
def unwrap(o, margin):
    uv = o.data.uv_layers.new(name='bake')
    o.data.uv_layers.active = uv
    select([o])
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=margin, area_weight=0.0, scale_to_bounds=True)
    bpy.ops.object.mode_set(mode='OBJECT')


# This function bakes the full lighting of the object into a new image and saves it through the scene's colour settings,
# so the image holds the colours Blender shows. It returns the saved path.
def bake(o, name, size, samples):
    img = bpy.data.images.new(name, size, size, float_buffer=True)
    for slot in o.material_slots:
        if slot.material is None:
            continue
        nt = slot.material.node_tree
        n = nt.nodes.new('ShaderNodeTexImage')
        n.image = img
        nt.nodes.active = n
    select([o])
    scene.cycles.samples = samples
    bpy.ops.object.bake(type='COMBINED', margin=8, use_clear=True)
    path = os.path.join(cfg['work'], name + '.png')
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_depth = '8'
    img.save_render(path, scene=scene)
    log('baked', name)
    return path


# This function swaps the object's materials for one unlit material showing the given image through the 'bake' UVs.
# The glTF exporter turns a Background shader into KHR_materials_unlit.
def make_unlit(o, png, name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    tex = nt.nodes.new('ShaderNodeTexImage')
    tex.image = bpy.data.images.load(png)
    uvn = nt.nodes.new('ShaderNodeUVMap')
    uvn.uv_map = 'bake'
    nt.links.new(uvn.outputs['UV'], tex.inputs['Vector'])
    bg = nt.nodes.new('ShaderNodeBackground')
    nt.links.new(tex.outputs['Color'], bg.inputs['Color'])
    nt.links.new(bg.outputs['Background'], out.inputs['Surface'])
    o.data.materials.clear()
    o.data.materials.append(m)
    for uv in list(o.data.uv_layers):
        if uv.name != 'bake':
            o.data.uv_layers.remove(uv)


# This function is the 'bake' mode: everything becomes at most two objects (solid and glass) whose lighting is baked
# into textures. The browser then shows unlit colours, which look like Blender's render from every side.
def bake_mode(meshes):
    ensure_light()
    use_gpu()
    solid = join(meshes, cfg['name'])
    glass = split_glass(solid)
    for o in [solid] + ([glass] if glass else []):
        simplify(o)
    unwrap(solid, 0.0015)
    if glass:
        unwrap(glass, 0.004)
        # Light passes through the glass while the solid part is baked.
        saved = {}
        for slot in glass.material_slots:
            out = slot.material.node_tree.nodes.get('Material Output')
            if out and out.inputs['Surface'].is_linked:
                saved[slot.material.name] = out.inputs['Surface'].links[0].from_socket
                tr = slot.material.node_tree.nodes.new('ShaderNodeBsdfTransparent')
                slot.material.node_tree.links.new(tr.outputs['BSDF'], out.inputs['Surface'])
    px, samples = cfg.get('bake_px', 4096), cfg.get('samples', 256)
    solid_png = bake(solid, cfg['name'] + '_bake', px, samples)
    if glass:
        for slot in glass.material_slots:
            if slot.material.name in saved:
                slot.material.node_tree.links.new(saved[slot.material.name], slot.material.node_tree.nodes['Material Output'].inputs['Surface'])
        glass_png = bake(glass, cfg['name'] + '_glass_bake', max(512, px // 4), samples)
        make_unlit(glass, glass_png, cfg['name'] + '_glass_unlit')
    make_unlit(solid, solid_png, cfg['name'] + '_unlit')
    return 'none'


# This function is the 'pbr' mode: materials stay as they are and the browser lights them. Glass BSDF nodes, which glTF
# cannot hold, become a Principled BSDF with full transmission.
def pbr_mode(meshes):
    for m in bpy.data.materials:
        if not m.use_nodes:
            continue
        nt = m.node_tree
        for n in list(nt.nodes):
            if n.type == 'BSDF_GLASS':
                p = nt.nodes.new('ShaderNodeBsdfPrincipled')
                p.inputs['Base Color'].default_value = n.inputs['Color'].default_value
                p.inputs['Roughness'].default_value = n.inputs['Roughness'].default_value
                p.inputs['IOR'].default_value = n.inputs['IOR'].default_value
                p.inputs['Transmission Weight'].default_value = 1.0
                for link in list(n.outputs['BSDF'].links):
                    nt.links.new(p.outputs['BSDF'], link.to_socket)
                nt.nodes.remove(n)
    return 'neutral'


# This function works out model-viewer's starting view from the Blender camera: the point it orbits (camera-target),
# where the camera sits around that point (camera-orbit), the lens (field-of-view), and how far a visitor may turn and zoom.
# model-viewer uses glTF coordinates, where y is up: Blender (x, y, z) is (x, z, -y) there.
def view_from_camera(cam, cam_matrix, tone_mapping):
    W = scene.render.resolution_x
    H = scene.render.resolution_y
    if cfg.get('aspect'):
        W, H = cfg['aspect']
    aspect = W / H
    # The frame's shape is written in lowest terms, so a 1920 x 1080 render gives 16 / 9.
    if float(W).is_integer() and float(H).is_integer():
        g = math.gcd(int(W), int(H))
        W, H = int(W) // g, int(H) // g
    shape = '%g / %g' % (W, H)
    attrs = {'tone-mapping': tone_mapping}
    # A model lit in the browser gets a soft shadow on the ground, which baked models already have.
    if tone_mapping != 'none':
        attrs['shadow-intensity'] = '1'
    if cam is None:
        log('no camera; model-viewer will frame the model by itself')
        return {'aspect': shape, 'attributes': attrs}
    mw = cam_matrix
    pos = mw.translation.copy()
    fwd = (mw.to_quaternion() @ mathutils.Vector((0, 0, -1))).normalized()
    target_name = cfg.get('target_object')
    if target_name:
        o = bpy.data.objects[target_name]
        corners = [o.matrix_world @ mathutils.Vector(c) for c in o.bound_box]
        target = sum(corners, mathutils.Vector()) / 8
    else:
        hit, loc, *_ = scene.ray_cast(bpy.context.evaluated_depsgraph_get(), pos, fwd)
        if hit:
            target = loc
        else:
            centre = sum((o.matrix_world.translation for o in scene.objects if o.type == 'MESH'), mathutils.Vector()) / max(1, sum(1 for o in scene.objects if o.type == 'MESH'))
            target = pos + fwd * max(0.1, (centre - pos).dot(fwd))
    gl = lambda v: mathutils.Vector((v.x, v.z, -v.y))
    off = gl(pos) - gl(target)
    r = off.length
    phi = math.degrees(math.acos(max(-1, min(1, off.y / r))))
    theta = math.degrees(math.atan2(off.x, off.z))
    c = cam.data
    fit = c.sensor_fit if c.sensor_fit != 'AUTO' else ('HORIZONTAL' if aspect >= 1 else 'VERTICAL')
    if fit == 'HORIZONTAL':
        vfov = 2 * math.atan(math.tan(c.angle_x / 2) / aspect) if c.sensor_fit != 'AUTO' else 2 * math.atan(math.tan(c.angle / 2) / aspect)
    else:
        vfov = c.angle_y if c.sensor_fit != 'AUTO' else c.angle
    t = target
    attrs.update({
        'camera-target': '%.3gm %.3gm %.3gm' % tuple(gl(t)),
        'camera-orbit': '%.1fdeg %.1fdeg %.4gm' % (theta, phi, r),
        'field-of-view': '%.1fdeg' % math.degrees(vfov),
        'min-camera-orbit': 'auto %.0fdeg %.4gm' % (max(1, phi - 30), r * cfg.get('zoom_in', 0.38)),
        'max-camera-orbit': 'auto %.0fdeg %.4gm' % (min(89, phi + 17), r * cfg.get('zoom_out', 1.7)),
    })
    log('view', attrs['camera-orbit'], 'around', attrs['camera-target'], 'fov', attrs['field-of-view'])
    return {'aspect': shape, 'attributes': attrs}


# This function writes the .glb: Draco geometry, WebP textures, and normals only when the browser lights the model.
def export_glb(mode):
    meshes = [o for o in scene.objects if o.type == 'MESH']
    # Draco rounds positions to a 14-bit grid over each mesh's size, so a few stray far-away vertices would flatten the rest.
    for o in meshes:
        co = np.empty(len(o.data.vertices) * 3)
        o.data.vertices.foreach_get('co', co)
        co = co.reshape(-1, 3) @ np.array(o.matrix_world)[:3, :3].T
        size = float((co.max(0) - co.min(0)).max()) if len(co) else 0.0
        if size > 20000:
            raise SystemExit('%s is %.0f km across, probably because of stray far-away vertices. Remove them, or leave the object out with --exclude.' % (o.name, size / 1000))
    select(meshes)
    bpy.ops.export_scene.gltf(
        filepath=cfg['raw_glb'], export_format='GLB', use_selection=True, export_apply=True, export_yup=True,
        export_normals=mode == 'pbr', export_tangents=False, export_texcoords=True, export_vertex_color='NONE',
        export_cameras=False, export_lights=False, export_materials='EXPORT',
        export_image_format='WEBP', export_image_quality=cfg.get('quality', 85),
        export_draco_mesh_compression_enable=True, export_draco_mesh_compression_level=7,
        export_draco_position_quantization=14, export_draco_texcoord_quantization=14)
    log('exported', cfg['raw_glb'])


cam = find_camera()
# The camera is read now, with constraints such as Track To applied, because later steps may remove what it tracks.
cam_matrix = cam.evaluated_get(bpy.context.evaluated_depsgraph_get()).matrix_world.copy() if cam else None
meshes = prepare_meshes()
if cfg.get('recipe'):
    sys.path.insert(0, os.path.dirname(__file__))
    recipe = importlib.import_module('recipes.' + cfg['recipe'])
    tone = recipe.run(cfg, log, use_gpu)
else:
    tone = bake_mode(meshes) if cfg.get('mode', 'bake') == 'bake' else pbr_mode(meshes)
view = view_from_camera(cam, cam_matrix, tone)
json.dump(view, open(cfg['view_json'], 'w'), indent=2)
export_glb('pbr' if tone != 'none' else 'bake')
if cfg.get('save_blend'):
    bpy.ops.wm.save_as_mainfile(filepath=cfg['save_blend'], compress=True)
log('done')
