# This recipe is for "02 Blender Files/Maps 3D trim origin more trim.blend": the Revit model of AMP placed in a 2022
# capture of the Omiya campus from Google Maps. It replaces the plain 'bake' mode for that file:
#   node tools/blend2web/blend2web.mjs "<that file>" --name AMP --out "src/images/AMP Relax" --recipe amp --aspect 16:10
# What it does differently, and why:
#   - The Revit -> FBX import left every material fully metallic, which renders almost black. LOOK sets them back,
#     tuned against slide 1 of Final Presentation.pdf (the Enscape render over Google Earth).
#   - The curtain-panel frames are thinner than a pixel from the starting view and alias, so each flat facet of the
#     cladding becomes one polygon with a baked picture of its frames, panels and glass (a mipmapped texture).
#   - The Google capture already holds real light, so it is not baked; its 2000+ tile textures are packed into one atlas.
import bpy, bmesh, math, os
import numpy as np
import mathutils

BUILDING = 'Building'
SCAN = 'BuildingMesh-00424.007'
GLASS = ('Glass, Clear Glazing', 'Glass')
CLAD = ('Magnesium', 'Laminate, Navy', 'Glass, Clear Glazing')
PANELS = ('Laminate, Navy', 'Glass, Clear Glazing')
FURNITURE = ('Haworth _ Metal _ Stainless Steel', 'Haworth _ Paint _ Collection Light Blue', 'Haworth _ Paint _ Collection White')
CENTRE = np.array([0.0, -3.0, 8.0])
NO_SPECULAR = ('Asphalt, Bitumen', 'Concrete, Cast In Situ', 'Default Floor', 'Default Wall')
# This dictionary holds the colour (linear), metalness and roughness for materials that differ from plain paint.
LOOK = {
    'Magnesium': ((0.72, 0.73, 0.75), 0.2, 0.4),
    'Aluminium': ((0.75, 0.75, 0.77), 0.2, 0.4),
    'Haworth _ Metal _ Stainless Steel': ((0.6, 0.6, 0.6), 0.8, 0.3),
    'Laminate, Navy': ((0.085, 0.25, 0.56), 0.0, 0.45),
    'Asphalt, Bitumen': ((0.075, 0.045, 0.034), 0.0, 1.0),
}
# The 2022 sun direction from the .blend, and the light balance tuned against slide 1.
SUN_ELEVATION, SUN_AZIMUTH, SUN_STRENGTH, SKY_STRENGTH, EXPOSURE = 39.4, -166.2, 4.5, 0.15, -0.8


# This function returns the Principled BSDF node of a material, if it has one.
def principled(m):
    return next((n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED'), None)


# This function fixes the Revit materials: real metals keep some metalness, everything else becomes paint-like,
# and glass becomes a dark, very smooth surface that reflects the sky.
def fix_materials():
    for o in bpy.data.collections[BUILDING].objects:
        for slot in o.material_slots:
            m = slot.material
            if m is None:
                continue
            if m.name in GLASS:
                nt = m.node_tree
                for n in list(nt.nodes):
                    if n.type != 'OUTPUT_MATERIAL':
                        nt.nodes.remove(n)
                p = nt.nodes.new('ShaderNodeBsdfPrincipled')
                p.inputs['Base Color'].default_value = (0.02, 0.04, 0.06, 1)
                p.inputs['Metallic'].default_value = 0.0
                p.inputs['Roughness'].default_value = 0.04
                p.inputs['IOR'].default_value = 1.5
                p.inputs['Specular IOR Level'].default_value = 1.0
                nt.links.new(p.outputs['BSDF'], nt.nodes['Material Output'].inputs['Surface'])
                continue
            p = principled(m)
            if p is None:
                continue
            base, metal, rough = LOOK.get(m.name, (None, 0.0, 0.6))
            if base:
                p.inputs['Base Color'].default_value = (*base, 1)
            p.inputs['Metallic'].default_value = metal
            p.inputs['Roughness'].default_value = rough
            if m.name in NO_SPECULAR:
                p.inputs['Specular IOR Level'].default_value = 0.0


# This function lights the scene with a sky and the 2022 sun, and sets the colour settings the bake is saved with.
def light_scene():
    scene = bpy.context.scene
    w = scene.world or bpy.data.worlds.new('World')
    scene.world = w
    w.use_nodes = True
    nt = w.node_tree
    nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputWorld')
    sky = nt.nodes.new('ShaderNodeTexSky')
    sky.sun_disc = False
    sky.sun_elevation = math.radians(SUN_ELEVATION)
    sky.sun_rotation = math.radians(SUN_AZIMUTH)
    bg = nt.nodes.new('ShaderNodeBackground')
    bg.inputs['Strength'].default_value = SKY_STRENGTH
    nt.links.new(sky.outputs['Color'], bg.inputs['Color'])
    nt.links.new(bg.outputs['Background'], out.inputs['Surface'])
    sun = next((o for o in bpy.data.objects if o.type == 'LIGHT' and o.data.type == 'SUN'), None)
    if sun is None:
        sun = bpy.data.objects.new('Sun', bpy.data.lights.new('Sun', 'SUN'))
        scene.collection.objects.link(sun)
    sun.data.energy = SUN_STRENGTH
    sun.data.angle = math.radians(0.6)
    el, az = math.radians(SUN_ELEVATION), math.radians(SUN_AZIMUTH)
    to_sun = mathutils.Vector((math.sin(az) * math.cos(el), math.cos(az) * math.cos(el), math.sin(el)))
    sun.rotation_euler = (-to_sun).to_track_quat('-Z', 'Y').to_euler()
    vs = scene.view_settings
    vs.view_transform, vs.look, vs.exposure, vs.gamma = 'Standard', 'None', EXPOSURE, 1.0


# This function returns world-space normals, centres and areas of an object's faces as numpy arrays.
def face_data(o):
    me = o.data
    n = len(me.polygons)
    M = np.array(o.matrix_world)
    R = M[:3, :3]
    nrm = np.empty(n * 3); me.polygons.foreach_get('normal', nrm)
    cen = np.empty(n * 3); me.polygons.foreach_get('center', cen)
    area = np.empty(n); me.polygons.foreach_get('area', area)
    nrm = nrm.reshape(-1, 3) @ np.linalg.inv(R)
    nrm /= np.linalg.norm(nrm, axis=1, keepdims=True) + 1e-12
    return nrm, cen.reshape(-1, 3) @ R.T + M[:3, 3], area * abs(np.linalg.det(R)) ** (2 / 3)


# This function builds the cladding skin: one polygon per flat facet of the outside cladding, placed on the face of the
# frames, and bakes the real cladding behind it onto that polygon. It returns the skin object and the image path.
def build_skin(cfg, log):
    scene = bpy.context.scene
    data = {name: face_data(bpy.data.objects[name]) for name in CLAD}

    # This function tells which faces point away from the building's centre (the outside of the cladding).
    def outward(nrm, cen):
        out = cen - CENTRE
        out[:, 2] = 0
        out /= np.linalg.norm(out, axis=1, keepdims=True) + 1e-12
        return (np.einsum('ij,ij->i', nrm, out) > 0.2) | (nrm[:, 2] > 0.9)

    # Facets are groups of outward panel faces that share a plane.
    facets = []
    for name in PANELS:
        nrm, cen, area = data[name]
        for i in np.nonzero(outward(nrm, cen) & (area > 1e-4))[0]:
            n, d = nrm[i], float(nrm[i] @ cen[i])
            for f in facets:
                if f['n'] @ n > 0.999 and abs(f['d'] - d) < 0.4:
                    f['area'] += area[i]
                    f['nsum'] += n * area[i]
                    break
            else:
                facets.append(dict(n=n.copy(), d=d, area=float(area[i]), nsum=n * area[i]))
    facets = [f for f in facets if f['area'] >= 1.0]
    for f in facets:
        f['n'] = f['nsum'] / np.linalg.norm(f['nsum'])
    FN = np.array([f['n'] for f in facets])
    FD = np.array([f['d'] for f in facets])
    assign = {}
    for name in CLAD:
        nrm, cen, _ = data[name]
        match = (nrm @ FN.T > 0.999) & (np.abs(cen @ FN.T - FD[None, :]) < 0.4)
        assign[name] = np.where(match.any(1), match.argmax(1), -1)

    # Each facet's polygon is the 2D convex hull of its faces, on the outermost face of the frames, widened by 4 cm
    # so that neighbouring facets meet without cracks.
    verts, polys = [], []
    for k, f in enumerate(facets):
        pts = []
        for name in CLAD:
            o = bpy.data.objects[name]
            ids = np.nonzero(assign[name] == k)[0]
            if not len(ids):
                continue
            R = np.array(o.matrix_world)[:3, :3]; T = np.array(o.matrix_world)[:3, 3]
            vi = np.unique(np.concatenate([np.array(o.data.polygons[i].vertices) for i in ids]))
            pts.append(np.array([o.data.vertices[i].co[:] for i in vi]) @ R.T + T)
        if not pts:
            f['used'] = False
            continue
        f['used'] = True
        pts = np.concatenate(pts)
        n = f['n']
        f['dout'] = float((pts @ n).max())
        u = np.cross(n, [0, 0, 1.0]) if abs(n[2]) < 0.9 else np.cross(n, [1.0, 0, 0])
        u /= np.linalg.norm(u)
        v = np.cross(n, u)
        o2 = pts.mean(0)
        p2 = np.stack([(pts - o2) @ u, (pts - o2) @ v], 1)
        h = p2[mathutils.geometry.convex_hull_2d([tuple(q) for q in p2])]
        c = h.mean(0)
        h = h + (h - c) / (np.linalg.norm(h - c, axis=1, keepdims=True) + 1e-9) * 0.04
        base = len(verts)
        for x, y in h:
            q = o2 + x * u + y * v
            verts.append(tuple(q - (q @ n - f['dout']) * n))
        polys.append(list(range(base, base + len(h))))
    me = bpy.data.meshes.new('AMP_skin')
    me.from_pydata(verts, [], polys)
    skin = bpy.data.objects.new('AMP_skin', me)
    scene.collection.objects.link(skin)
    bm = bmesh.new()
    bm.from_mesh(me)
    bmesh.ops.triangulate(bm, faces=bm.faces, quad_method='BEAUTY', ngon_method='BEAUTY')
    bm.to_mesh(me)
    bm.free()
    log('skin: %d facets replace %d cladding faces' % (len(polys), sum(int((a >= 0).sum()) for a in assign.values())))

    me.uv_layers.new(name='bake')
    bpy.ops.object.select_all(action='DESELECT')
    skin.select_set(True)
    bpy.context.view_layer.objects.active = skin
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.004, area_weight=0.0, scale_to_bounds=True)
    bpy.ops.object.mode_set(mode='OBJECT')
    img = bpy.data.images.new('AMP_skin_bake', 4096, 4096, float_buffer=True)
    target = bpy.data.materials.new('AMP_skin_target')
    target.use_nodes = True
    tn = target.node_tree.nodes.new('ShaderNodeTexImage')
    tn.image = img
    target.node_tree.nodes.active = tn
    me.materials.append(target)
    # The skin must not shade the cladding while that is baked onto it.
    rays = ('visible_camera', 'visible_diffuse', 'visible_glossy', 'visible_transmission', 'visible_volume_scatter', 'visible_shadow')
    for attr in rays:
        setattr(skin, attr, False)
    bpy.ops.object.select_all(action='DESELECT')
    for name in CLAD:
        bpy.data.objects[name].select_set(True)
    skin.select_set(True)
    bpy.context.view_layer.objects.active = skin
    scene.cycles.samples = cfg.get('samples', 256)
    bpy.ops.object.bake(type='COMBINED', use_selected_to_active=True, cage_extrusion=0.15, max_ray_distance=0.6, margin=8, use_clear=True)
    for attr in rays:
        setattr(skin, attr, True)
    path = os.path.join(cfg['work'], 'AMP_skin_bake.png')
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_depth = '8'
    img.save_render(path, scene=scene)
    log('baked the cladding skin')

    # The cladding the skin replaces goes: faces on the facets, and the frame sides just behind them.
    for name in CLAD:
        o = bpy.data.objects[name]
        nrm, cen, _ = data[name]
        behind = np.zeros(len(cen), bool)
        for k, f in enumerate(facets):
            if not f['used']:
                continue
            pts = np.concatenate([data[x][1][assign[x] == k] for x in CLAD])
            c0 = pts.mean(0)
            rad = np.linalg.norm(pts - c0, axis=1).max() + 0.3
            off = cen @ f['n'] - f['dout']
            inplane = cen - off[:, None] * f['n'][None, :]
            behind |= (off <= 0.02) & (off > -0.45) & (np.linalg.norm(inplane - c0, axis=1) < rad)
        kill = (assign[name] >= 0) | behind
        bm = bmesh.new()
        bm.from_mesh(o.data)
        bm.faces.ensure_lookup_table()
        bmesh.ops.delete(bm, geom=[bm.faces[i] for i in np.nonzero(kill)[0]], context='FACES')
        bm.to_mesh(o.data)
        bm.free()
    return skin, path


# This function makes an unlit material that shows an image through the 'bake' UVs, and gives it to the object.
def set_unlit(o, image, name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    tex = nt.nodes.new('ShaderNodeTexImage')
    tex.image = image if isinstance(image, bpy.types.Image) else bpy.data.images.load(image)
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


# This function simplifies and joins the rest of the building, bakes its lighting with the skin in place, and returns
# the solid and glass objects.
def bake_building(cfg, log):
    scene = bpy.context.scene
    objs = [o for o in bpy.data.collections[BUILDING].objects if o.type == 'MESH' and len(o.data.polygons)]
    for o in objs:
        bm = bmesh.new()
        bm.from_mesh(o.data)
        bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=0.0005)
        bmesh.ops.dissolve_limit(bm, angle_limit=math.radians(0.5), verts=bm.verts, edges=bm.edges, delimit={'MATERIAL'})
        bmesh.ops.triangulate(bm, faces=bm.faces)
        bm.to_mesh(o.data)
        bm.free()
        if o.name in FURNITURE:
            mod = o.modifiers.new('dec', 'DECIMATE')
            mod.ratio = 0.25
            with bpy.context.temp_override(object=o, active_object=o):
                bpy.ops.object.modifier_apply(modifier='dec')
    solid_objs = [o for o in objs if o.name not in GLASS]
    glass_objs = [o for o in objs if o.name in GLASS]

    # This function joins objects into one with transforms applied.
    def join(group, name):
        bpy.ops.object.select_all(action='DESELECT')
        for o in group:
            o.select_set(True)
        bpy.context.view_layer.objects.active = group[0]
        bpy.ops.object.join()
        o = bpy.context.view_layer.objects.active
        o.name = o.data.name = name
        with bpy.context.temp_override(object=o, active_object=o, selected_objects=[o], selected_editable_objects=[o]):
            bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
        return o

    amp = join(solid_objs, 'AMP')
    glass = join(glass_objs, 'AMP_glass')
    for o, margin in ((amp, 0.0015), (glass, 0.004)):
        uv = o.data.uv_layers.new(name='bake')
        o.data.uv_layers.active = uv
        bpy.ops.object.select_all(action='DESELECT')
        o.select_set(True)
        bpy.context.view_layer.objects.active = o
        bpy.ops.object.mode_set(mode='EDIT')
        bpy.ops.mesh.select_all(action='SELECT')
        bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=margin, area_weight=0.0, scale_to_bounds=True)
        bpy.ops.object.mode_set(mode='OBJECT')

    # This function bakes the object's lighting into a new image and saves it through the colour settings.
    def bake(o, name, size):
        img = bpy.data.images.new(name, size, size, float_buffer=True)
        for slot in o.material_slots:
            n = slot.material.node_tree.nodes.new('ShaderNodeTexImage')
            n.image = img
            slot.material.node_tree.nodes.active = n
        bpy.ops.object.select_all(action='DESELECT')
        o.select_set(True)
        bpy.context.view_layer.objects.active = o
        scene.cycles.samples = cfg.get('samples', 256)
        bpy.ops.object.bake(type='COMBINED', margin=8, use_clear=True)
        path = os.path.join(cfg['work'], name + '.png')
        img.save_render(path, scene=scene)
        log('baked', name)
        return path

    # Sunlight passes through the remaining glass while the solid part is baked.
    saved = {}
    for slot in glass.material_slots:
        out = slot.material.node_tree.nodes['Material Output']
        saved[slot.material.name] = out.inputs['Surface'].links[0].from_socket
        tr = slot.material.node_tree.nodes.new('ShaderNodeBsdfTransparent')
        slot.material.node_tree.links.new(tr.outputs['BSDF'], out.inputs['Surface'])
    amp_png = bake(amp, 'AMP_bake', cfg.get('bake_px', 4096))
    for slot in glass.material_slots:
        slot.material.node_tree.links.new(saved[slot.material.name], slot.material.node_tree.nodes['Material Output'].inputs['Surface'])
    glass_png = bake(glass, 'AMP_glass_bake', 1024)
    set_unlit(amp, amp_png, 'AMP_unlit')
    set_unlit(glass, glass_png, 'AMP_glass_unlit')
    return amp, glass


# This function packs the scan's tile textures into one atlas and points the scan's UVs at it. Tiles are cropped to the
# part their UVs use, scaled down more the farther they are from AMP, and padded with their own edge pixels.
def pack_scan(cfg, log, A=4096, near=90.0, pad=4, radius=380.0):
    scan = bpy.data.objects[SCAN]
    scan.name = 'Scan'
    # The scan sits in a collection that is hidden in the view layer, where it cannot be selected.
    for c in list(scan.users_collection):
        c.objects.unlink(scan)
    bpy.context.scene.collection.objects.link(scan)
    bpy.ops.object.select_all(action='DESELECT')
    scan.hide_select = False
    scan.select_set(True)
    bpy.context.view_layer.objects.active = scan
    with bpy.context.temp_override(object=scan, active_object=scan, selected_objects=[scan], selected_editable_objects=[scan]):
        bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    me = scan.data
    # A few stray triangles from the capture sit about 1000 km away. Without this trim the model would span 2000 km,
    # and Draco's position rounding (14 bits over that span is about 128 m) would flatten the whole campus.
    co = np.empty(len(me.vertices) * 3); me.vertices.foreach_get('co', co); co = co.reshape(-1, 3)
    far = (np.hypot(co[:, 0] - CENTRE[0], co[:, 1] - CENTRE[1]) > radius) | (co[:, 2] < -40) | (co[:, 2] > 90)
    bm = bmesh.new()
    bm.from_mesh(me)
    bm.verts.ensure_lookup_table()
    bmesh.ops.delete(bm, geom=[bm.verts[i] for i in np.nonzero(far)[0]], context='VERTS')
    bm.to_mesh(me)
    bm.free()
    log('trimmed %d stray scan vertices' % int(far.sum()))
    n = len(me.polygons)
    mi = np.empty(n, np.int32); me.polygons.foreach_get('material_index', mi)
    uv = np.empty(len(me.loops) * 2); me.uv_layers[0].data.foreach_get('uv', uv); uv = uv.reshape(-1, 2)
    ls = np.empty(n, np.int32); me.polygons.foreach_get('loop_start', ls)
    lt = np.empty(n, np.int32); me.polygons.foreach_get('loop_total', lt)
    loop_mat = np.repeat(mi, lt)
    cen = np.empty(n * 3); me.polygons.foreach_get('center', cen); cen = cen.reshape(-1, 3)
    tiles = []
    for m in np.unique(mi):
        mat = scan.material_slots[int(m)].material
        tex = next((x for x in mat.node_tree.nodes if x.type == 'TEX_IMAGE' and x.image), None)
        if tex is None:
            continue
        img = tex.image
        W, H = img.size
        u = uv[loop_mat == m]
        c = cen[mi == m].mean(0)
        x0 = max(0, math.floor(u[:, 0].min() * W)); x1 = min(W, max(x0 + 1, math.ceil(u[:, 0].max() * W)))
        y0 = max(0, math.floor(u[:, 1].min() * H)); y1 = min(H, max(y0 + 1, math.ceil(u[:, 1].max() * H)))
        d = math.hypot(c[0] - CENTRE[0], c[1] - CENTRE[1])
        tiles.append(dict(m=int(m), img=img, W=W, H=H, crop=(x0, y0, x1, y1), w=1.0 if d < near else (near / d) ** 0.8))

    # This function places the tiles at scale k on shelves; it returns their positions or None if they do not fit.
    def layout(k):
        sizes = [(max(2, round((t['crop'][2] - t['crop'][0]) * min(1, k * t['w']))), max(2, round((t['crop'][3] - t['crop'][1]) * min(1, k * t['w'])))) for t in tiles]
        x = y = shelf = 0
        pos = {}
        for i in sorted(range(len(tiles)), key=lambda i: -sizes[i][1]):
            w, h = sizes[i][0] + 2 * pad, sizes[i][1] + 2 * pad
            if x + w > A:
                x, y, shelf = 0, y + shelf, 0
            if y + h > A:
                return None
            pos[i] = (x + pad, y + pad, sizes[i][0], sizes[i][1])
            x += w
            shelf = max(shelf, h)
        return pos

    lo, hi, pos = 0.02, 4.0, None
    for _ in range(30):
        k = (lo + hi) / 2
        p = layout(k)
        if p:
            pos, lo = p, k
        else:
            hi = k
    atlas = np.full((A, A, 4), 0.5, np.float32)
    atlas[..., 3] = 1
    new_uv = uv.copy()
    for i, t in enumerate(tiles):
        x, y, w, h = pos[i]
        x0, y0, x1, y1 = t['crop']
        W, H = t['W'], t['H']
        px = np.empty(W * H * 4, np.float32)
        t['img'].pixels.foreach_get(px)
        crop = px.reshape(H, W, 4)[y0:y1, x0:x1]
        tmp = bpy.data.images.new('blend2web tile', x1 - x0, y1 - y0, alpha=True, float_buffer=True)
        tmp.pixels.foreach_set(np.ascontiguousarray(crop).ravel())
        tmp.scale(w, h)
        out = np.empty(w * h * 4, np.float32)
        tmp.pixels.foreach_get(out)
        bpy.data.images.remove(tmp)
        atlas[y - pad:y + h + pad, x - pad:x + w + pad] = np.pad(out.reshape(h, w, 4), ((pad, pad), (pad, pad), (0, 0)), mode='edge')
        sel = loop_mat == t['m']
        new_uv[sel, 0] = (x + (np.clip(uv[sel, 0] * W, x0, x1) - x0) / (x1 - x0) * w) / A
        new_uv[sel, 1] = (y + (np.clip(uv[sel, 1] * H, y0, y1) - y0) / (y1 - y0) * h) / A
    me.uv_layers[0].data.foreach_set('uv', new_uv.ravel())
    me.uv_layers[0].name = 'bake'
    image = bpy.data.images.new('Scan_atlas', A, A, alpha=False)
    image.pixels.foreach_set(atlas.ravel())
    image.filepath_raw = os.path.join(cfg['work'], 'Scan_atlas.png')
    image.file_format = 'PNG'
    image.save()
    set_unlit(scan, image, 'Scan_unlit')
    log('packed %d scan tiles into a %d atlas (near tiles at %.0f%%)' % (len(tiles), A, min(1, k) * 100))
    return scan


# This function runs the recipe and returns the tone mapping model-viewer should use (none: the colours are baked).
def run(cfg, log, use_gpu):
    use_gpu()
    for o in bpy.data.objects:
        o.hide_select = False
    fix_materials()
    light_scene()
    skin, skin_png = build_skin(cfg, log)
    bake_building(cfg, log)
    set_unlit(skin, skin_png, 'AMP_skin_unlit')
    pack_scan(cfg, log, A=cfg.get('scan_px', 4096))
    keep = {'AMP', 'AMP_glass', 'AMP_skin', 'Scan'}
    for o in list(bpy.data.objects):
        if o.type == 'MESH' and o.name not in keep:
            bpy.data.objects.remove(o)
    # The model turns around the building unless --target says otherwise.
    if not cfg.get('target_object'):
        cfg['target_object'] = 'AMP'
    return 'none'
