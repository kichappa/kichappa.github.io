// This script is npm run dev: the same Next dev server as npm start, plus the poster watcher from posters.mjs, so
// saving a model's .view.json remakes its poster and the page shows the new one.
// Usage: npm run dev [-- -p 4200]
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { posters } from './posters.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const next = path.resolve(here, '..', '..', 'node_modules', 'next', 'dist', 'bin', 'next');

const server = spawn(process.execPath, [next, 'dev', '--webpack', ...process.argv.slice(2)], { stdio: 'inherit' });
server.on('exit', (code) => process.exit(code ?? 0));
posters({ keepWatching: true }).catch((e) => console.error(`poster watcher stopped: ${e.message}`));
