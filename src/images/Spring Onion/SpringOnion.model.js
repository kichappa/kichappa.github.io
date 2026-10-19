// This file was made by growth-rl's render/blender/web_model.py; run it again rather than editing the model files.
// The starting view is in SpringOnion.view.json and can be edited by hand; npm run posters (or npm run dev) then remakes the poster.
import src from './SpringOnion.glb';
import poster from './SpringOnion-poster.jpg';
import view from './SpringOnion.view.json';

// This object is what Model3D takes: the model file, its poster, and the model-viewer settings for its starting view.
const model = { src, poster, view };

export default model;
