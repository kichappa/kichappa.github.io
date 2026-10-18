// This script is new in the Next version. npm runs it after `npm run build` (see "postbuild" in package.json) to finish the static site in out/.
const fs = require('fs');
const path = require('path');

// Next's own files move from out/_next to out/~/_next, to match assetPrefix in next.config.mjs.
fs.renameSync(path.join('out', '_next'), path.join('out', '~', '_next'));

// This function works around a Next bug on Windows. Next names each page's prefetch files by joining the route's segments with dots, like __next.!fg.projects.__PAGE__.txt, but on Windows it joins them with backslashes, so the files end up in folders like __next.!fg/projects/__PAGE__.txt and every prefetch gets a 404. It moves each such file back to its dotted name. When the build ran on another system there are no such folders and it does nothing.
const flattenSegmentFolders = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (!entry.name.startsWith('__next.')) {
      flattenSegmentFolders(full);
      continue;
    }
    // This loop walks the misplaced folder and moves each file up, naming it after its path with dots.
    const stack = [[full, entry.name]];
    while (stack.length) {
      const [folder, name] = stack.pop();
      for (const child of fs.readdirSync(folder, { withFileTypes: true })) {
        const childPath = path.join(folder, child.name);
        if (child.isDirectory()) stack.push([childPath, name + '.' + child.name]);
        else fs.renameSync(childPath, path.join(dir, name + '.' + child.name));
      }
    }
    fs.rmSync(full, { recursive: true });
  }
};

flattenSegmentFolders('out');
