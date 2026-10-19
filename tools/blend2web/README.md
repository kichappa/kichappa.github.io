# blend2web

Turns a Blender file into a 3D model for the `Model3D` component (`src/components/Model3D.js`), which shows it in a
project's gallery: revolving slowly, stopping when someone drags it, and starting again 7 seconds after they let go.

```
npm run model -- "path/to/scene.blend" --name NAME --out "src/images/Some Project"
```

It needs Blender (4.2 or newer; it looks in `D:\Tools` and `C:\Program Files\Blender Foundation`, or pass
`--blender`) and Google Chrome (for the poster).

## What it makes

| File | What it is |
|---|---|
| `NAME.glb` | The model: Draco-compressed geometry and WebP textures. |
| `NAME-poster.jpg` | A screenshot of the model at its starting view, taken in model-viewer itself. It is shown until the model loads, and is the gallery thumbnail. |
| `NAME.view.json` | The starting view: `aspect` (the frame's shape) and `attributes` (model-viewer settings such as `camera-orbit`). Edit it by hand to change the view; then make a new poster by running the tool again. |
| `NAME.model.js` | One import that holds all three, for the gallery. |

Then in the project's page, for example `src/components/Projects.js`:

```js
import my_model from '../images/Some Project/NAME.model.js';
// ...
images: [
  [my_model.poster, 'Caption under the model.', {}, my_model],
  // ... the other images
],
```

## How the starting view is chosen

From the camera in the .blend (the scene camera, or `--camera NAME`). The model turns around the point the camera
looks at (where its centre ray first hits the model), or around the middle of an object given with `--target NAME`.
The frame takes the shape of the render resolution, or `--aspect 16:10`. A visitor can zoom from `--zoom-in` (0.38)
to `--zoom-out` (1.7) times the camera's distance, and tilt 30 degrees higher or 17 degrees lower.

Without a camera, model-viewer frames the model by itself.

## Modes

- `--mode bake` (default): Blender's lighting (lamps, world, shadows, colour management) is baked into textures with
  Cycles, and the browser shows them unlit. The model then looks like Blender's render from every side. Use this for
  buildings and anything where the look matters. See-through materials are baked separately and shown 35% opaque
  (`--glass-alpha`).
- `--mode pbr`: materials stay as they are and the browser lights them with a neutral studio light. Faster to make and
  better for glass and shiny objects, but it will not match Blender's render.

## Recipes

Some files need their own steps. `--recipe NAME` runs `blender/recipes/NAME.py` instead of the bake mode. `amp` is the
recipe for the AMP project:

```
npm run model -- "D:/Books/Architecture/Architectural Design Studio/Student's centre/02 Blender Files/Maps 3D trim origin more trim.blend" --name AMP --out "src/images/AMP Relax" --recipe amp --aspect 16:10
```

## Other options

`--exclude a,b` leaves objects out. `--bake-px 4096` and `--samples 256` set the bake size and quality. `--quality 85`
is the WebP quality. `--save-blend file.blend` keeps the processed scene. `--keep-work` keeps the temporary files.
