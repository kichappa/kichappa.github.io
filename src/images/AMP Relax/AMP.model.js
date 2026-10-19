// This file was made by tools/blend2web from Maps 3D trim origin more trim.blend; run it again rather than editing the model files.
// The starting view is in AMP.view.json and can be edited by hand; npm run posters (or npm run dev) then remakes the poster.
import src from './AMP.glb';
import poster from './AMP-poster.jpg';
import view from './AMP.view.json';

// This object is what Model3D takes: the model file, its poster, and the model-viewer settings for its starting view.
const model = { src, poster, view };

export default model;
