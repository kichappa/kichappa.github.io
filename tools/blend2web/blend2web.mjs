// This script turns a .blend file into a 3D model for the Model3D component (see README.md next to it).
// Usage: npm run model -- <file.blend> --name NAME --out DIR [options]
// It writes NAME.glb, NAME-poster.jpg, NAME.view.json and NAME.model.js into DIR.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, KHRDracoMeshCompression } from '@gltf-transform/extensions';
import { dedup, prune } from '@gltf-transform/functions';
import draco3d from 'draco3dgltf';
import { chromium } from 'playwright-core';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');

// This object lists every option with its default; README.md explains them.
const defaults = {
  name: null,
  out: null,
  mode: 'bake',
  recipe: null,
  camera: null,
  target: null,
  exclude: '',
  aspect: null,
  'bake-px': 4096,
  samples: 256,
  quality: 85,
  'glass-alpha': 0.35,
  'zoom-in': 0.38,
  'zoom-out': 1.7,
  'poster-width': 1600,
  blender: process.env.BLENDER || null,
  chrome: process.env.CHROME || null,
  'save-blend': null,
  'keep-work': false,
};

// This function reads the command line into the file name and an options object.
const parseArgs = (argv) => {
  const opts = { ...defaults };
  const files = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      if (!(key in defaults)) throw new Error(`Unknown option --${key}`);
      opts[key] = typeof defaults[key] === 'boolean' ? true : argv[++i];
    } else {
      files.push(argv[i]);
    }
  }
  if (files.length !== 1 || !opts.name || !opts.out) {
    throw new Error('Usage: npm run model -- <file.blend> --name NAME --out DIR [options]');
  }
  return { blend: path.resolve(files[0]), opts };
};

// This function finds Blender: --blender, then $BLENDER, then the newest Blender in the usual install folders.
const findBlender = (given) => {
  if (given) return given;
  const candidates = [];
  for (const dir of ['D:/Tools', 'C:/Program Files/Blender Foundation']) {
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir)) {
      const exe = path.join(dir, entry, 'blender.exe');
      if (/blender/i.test(entry) && fs.existsSync(exe)) candidates.push(exe);
    }
  }
  candidates.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  if (!candidates.length) throw new Error('Blender not found; pass --blender <path to blender.exe>');
  return candidates[0];
};

// This function runs the Blender half (blender/export.py), which bakes, exports the raw .glb and works out the view.
const runBlender = (blend, opts, work) => {
  const config = {
    name: opts.name,
    mode: opts.mode,
    recipe: opts.recipe,
    camera: opts.camera,
    target_object: opts.target,
    exclude: opts.exclude ? opts.exclude.split(',') : [],
    aspect: opts.aspect ? opts.aspect.split(/[:/x]/).map(Number) : null,
    bake_px: Number(opts['bake-px']),
    samples: Number(opts.samples),
    quality: Number(opts.quality),
    zoom_in: Number(opts['zoom-in']),
    zoom_out: Number(opts['zoom-out']),
    work,
    raw_glb: path.join(work, 'raw.glb'),
    view_json: path.join(work, 'view.json'),
    save_blend: opts['save-blend'] ? path.resolve(opts['save-blend']) : null,
  };
  const configPath = path.join(work, 'config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  const blender = findBlender(opts.blender);
  console.log(`Blender: ${blender}`);
  const result = spawnSync(blender, ['-b', blend, '--python', path.join(here, 'blender', 'export.py'), '--', configPath], { stdio: 'inherit' });
  if (result.status !== 0 || !fs.existsSync(config.raw_glb)) throw new Error('Blender did not finish; see its output above');
  return { rawGlb: config.raw_glb, view: JSON.parse(fs.readFileSync(config.view_json, 'utf8')) };
};

// This function finishes the .glb: unlit glass becomes see-through, unused data goes, and the geometry is re-encoded with Draco.
const finishGlb = async (rawGlb, outGlb, glassAlpha) => {
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
  });
  const doc = await io.read(rawGlb);
  for (const m of doc.getRoot().listMaterials()) {
    if (/glass/i.test(m.getName()) && m.getExtension('KHR_materials_unlit')) {
      m.setAlphaMode('BLEND');
      m.setBaseColorFactor([1, 1, 1, glassAlpha]);
      m.setDoubleSided(true);
    }
  }
  await doc.transform(dedup(), prune());
  doc.createExtension(KHRDracoMeshCompression).setRequired(true).setEncoderOptions({
    method: KHRDracoMeshCompression.EncoderMethod.EDGEBREAKER,
    encodeSpeed: 3,
    decodeSpeed: 5,
    quantizationBits: { POSITION: 14, TEXCOORD_0: 14, NORMAL: 10 },
  });
  await io.write(outGlb, doc);
};

// This function serves the model with model-viewer from a small local server, opens it in headless Chrome at the
// starting view, and saves a screenshot as the poster, so the poster matches the first frame of the model exactly.
const makePoster = async (glb, view, outJpg, width, chromePath) => {
  const [aw, ah] = (view.aspect || '16 / 10').split('/').map(Number);
  const height = Math.round((width * ah) / aw);
  const attrs = Object.entries(view.attributes || {}).map(([k, v]) => `${k}="${v}"`).join(' ');
  const files = {
    '/': ['text/html', `<!doctype html><style>body{margin:0;background:#000}model-viewer{width:${width}px;height:${height}px;background:#000}</style>
<script>self.ModelViewerElement = { dracoDecoderLocation: '/draco/' };</script>
<script type="module" src="/model-viewer.min.js"></script>
<model-viewer src="/model.glb" ${attrs} interaction-prompt="none"></model-viewer>`],
    '/model-viewer.min.js': ['text/javascript', path.join(root, 'node_modules/@google/model-viewer/dist/model-viewer.min.js')],
    '/model.glb': ['model/gltf-binary', glb],
  };
  const dracoDir = path.join(root, 'node_modules/three/examples/jsm/libs/draco/gltf');
  const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];
    const draco = url.startsWith('/draco/') ? path.join(dracoDir, path.basename(url)) : null;
    const entry = files[url] || (draco && fs.existsSync(draco) ? [url.endsWith('.wasm') ? 'application/wasm' : 'text/javascript', draco] : null);
    if (!entry) {
      res.writeHead(404);
      return res.end();
    }
    res.writeHead(200, { 'Content-Type': entry[0] });
    res.end(entry[1].startsWith('<!doctype') ? entry[1] : fs.readFileSync(entry[1]));
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch(chromePath ? { executablePath: chromePath } : { channel: 'chrome', args: ['--ignore-gpu-blocklist'] });
  try {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.waitForFunction(() => document.querySelector('model-viewer')?.loaded, null, { timeout: 180000 });
    await page.waitForTimeout(1500);
    await page.locator('model-viewer').screenshot({ path: outJpg, type: 'jpeg', quality: 88 });
  } finally {
    await browser.close();
    server.close();
  }
};

// This function writes the module the site imports: the model, the poster and the view, as one object for Model3D.
const writeModule = (out, name, blend) => {
  const text = `// This file was made by tools/blend2web from ${path.basename(blend)}; run it again rather than editing the model files.
// The starting view is in ${name}.view.json and can be edited by hand.
import src from './${name}.glb';
import poster from './${name}-poster.jpg';
import view from './${name}.view.json';

// This object is what Model3D takes: the model file, its poster, and the model-viewer settings for its starting view.
const model = { src, poster, view };

export default model;
`;
  fs.writeFileSync(path.join(out, `${name}.model.js`), text);
};

// This function runs the whole conversion and prints what was made.
const main = async () => {
  const { blend, opts } = parseArgs(process.argv.slice(2));
  const out = path.resolve(opts.out);
  fs.mkdirSync(out, { recursive: true });
  const work = fs.mkdtempSync(path.join(os.tmpdir(), 'blend2web-'));
  try {
    const { rawGlb, view } = runBlender(blend, opts, work);
    const glb = path.join(out, `${opts.name}.glb`);
    await finishGlb(rawGlb, glb, Number(opts['glass-alpha']));
    fs.writeFileSync(path.join(out, `${opts.name}.view.json`), JSON.stringify(view, null, 2) + '\n');
    const poster = path.join(out, `${opts.name}-poster.jpg`);
    await makePoster(glb, view, poster, Number(opts['poster-width']), opts.chrome);
    writeModule(out, opts.name, blend);
    const mb = (f) => (fs.statSync(f).size / 1048576).toFixed(1) + ' MB';
    console.log(`\nMade in ${out}:\n  ${opts.name}.glb (${mb(glb)})\n  ${opts.name}-poster.jpg (${mb(poster)})\n  ${opts.name}.view.json\n  ${opts.name}.model.js`);
    console.log(`\nIn a gallery: import model from '.../${opts.name}.model.js'; then add [model.poster, 'Caption', {}, model] to the images list.`);
  } finally {
    if (!opts['keep-work']) fs.rmSync(work, { recursive: true, force: true });
    else console.log(`Work files kept in ${work}`);
  }
};

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
