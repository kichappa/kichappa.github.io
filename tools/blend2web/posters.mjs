// This script remakes the poster of every model whose .view.json has changed since its poster was made.
// Usage: npm run posters [-- --force] [-- --watch]
// --force remakes every poster; --watch keeps running and remakes a poster each time its .view.json is saved.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { makePoster, readStamp, readWidth, viewStamp } from './poster.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, '..', '..', 'src');
const viewSuffix = '.view.json';

// This function lists every .view.json under src/.
const findViews = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return findViews(p);
    return e.name.endsWith(viewSuffix) ? [p] : [];
  });

// This function remakes one model's poster if its view has changed (or always, with force), at the old poster's width.
// A view that is not valid JSON yet, for example halfway through an edit, is skipped with a message.
const update = async (viewPath, force) => {
  const dir = path.dirname(viewPath);
  const name = path.basename(viewPath).slice(0, -viewSuffix.length);
  const glb = path.join(dir, `${name}.glb`);
  const poster = path.join(dir, `${name}-poster.jpg`);
  const label = path.relative(src, poster);
  if (!fs.existsSync(glb)) return;
  let view;
  try {
    view = JSON.parse(fs.readFileSync(viewPath, 'utf8'));
  } catch (e) {
    console.log(`${path.relative(src, viewPath)} is not valid JSON (${e.message}); poster not changed`);
    return;
  }
  if (!force && readStamp(poster) === viewStamp(view)) return;
  const started = Date.now();
  await makePoster(glb, view, poster, readWidth(poster) || 1600);
  console.log(`${label} remade for ${(view.attributes || {})['camera-orbit'] || 'the automatic view'} in ${((Date.now() - started) / 1000).toFixed(1)} s`);
};

// This function watches src/ and remakes a poster shortly after its .view.json is saved. Saves that arrive while a
// poster is being made are gathered and handled after it, so only one Chrome runs at a time.
const watch = () => {
  const waiting = new Set();
  let timer = null;
  let busy = false;
  const run = async () => {
    if (busy) return;
    busy = true;
    while (waiting.size) {
      const viewPath = waiting.values().next().value;
      waiting.delete(viewPath);
      await update(viewPath, false).catch((e) => console.error(`poster for ${viewPath} failed: ${e.message}`));
    }
    busy = false;
  };
  fs.watch(src, { recursive: true }, (event, file) => {
    if (!file || !file.endsWith(viewSuffix)) return;
    waiting.add(path.join(src, file));
    clearTimeout(timer);
    timer = setTimeout(run, 400);
  });
  console.log('Watching src/ for .view.json changes; posters are remade on save.');
};

// This function remakes the out-of-date posters, then keeps watching if asked.
export const posters = async ({ force = false, keepWatching = false } = {}) => {
  for (const viewPath of findViews(src)) {
    await update(viewPath, force);
  }
  if (keepWatching) watch();
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  posters({ force: args.includes('--force'), keepWatching: args.includes('--watch') }).catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
