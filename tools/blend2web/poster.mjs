// This module makes a model's poster: a screenshot of the model in model-viewer at its starting view. blend2web.mjs
// uses it after a conversion, and posters.mjs uses it again whenever a .view.json changes.
// Each poster carries a stamp of the view it was made from (a JPEG comment), so a poster for an old view can be found.
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const stampLabel = 'blend2web view ';

// This function gives a short fingerprint of a view, which is what a poster depends on besides the model.
export const viewStamp = (view) => crypto.createHash('sha1').update(JSON.stringify(view)).digest('hex').slice(0, 12);

// This function reads the stamp back from a poster, or gives null for a poster without one.
export const readStamp = (jpg) => {
  if (!fs.existsSync(jpg)) return null;
  const head = fs.readFileSync(jpg).subarray(0, 1024).toString('latin1');
  const at = head.indexOf(stampLabel);
  return at < 0 ? null : head.slice(at + stampLabel.length, at + stampLabel.length + 12);
};

// This function reads a poster's width in pixels from its JPEG frame header, so a new poster can keep the old size.
export const readWidth = (jpg) => {
  if (!fs.existsSync(jpg)) return null;
  const data = fs.readFileSync(jpg);
  for (let at = 2; at + 9 < data.length && data[at] === 0xff; at += 2 + data.readUInt16BE(at + 2)) {
    if (data[at + 1] === 0xc0 || data[at + 1] === 0xc2) return data.readUInt16BE(at + 7);
  }
  return null;
};

// This function puts the stamp into a JPEG as a comment segment, after the JFIF header when there is one.
const writeStamp = (jpg, stamp) => {
  const data = fs.readFileSync(jpg);
  let at = 2;
  if (data[2] === 0xff && data[3] === 0xe0) at = 4 + data.readUInt16BE(4);
  const text = Buffer.from(stampLabel + stamp, 'latin1');
  const segment = Buffer.alloc(4 + text.length);
  segment.writeUInt16BE(0xfffe, 0);
  segment.writeUInt16BE(2 + text.length, 2);
  text.copy(segment, 4);
  fs.writeFileSync(jpg, Buffer.concat([data.subarray(0, at), segment, data.subarray(at)]));
};

// This function serves the model with model-viewer from a small local server, opens it in headless Chrome at the
// starting view, and saves a screenshot as the poster, so the poster matches the first frame of the model exactly.
export const makePoster = async (glb, view, outJpg, width = 1600, chromePath = null) => {
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
    // The screenshot goes to a temporary file first, so the site never picks up a half-written poster.
    const temp = outJpg + '.tmp.jpg';
    await page.locator('model-viewer').screenshot({ path: temp, type: 'jpeg', quality: 88 });
    writeStamp(temp, viewStamp(view));
    fs.renameSync(temp, outJpg);
  } finally {
    await browser.close();
    server.close();
  }
};
