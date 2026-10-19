import React, { useEffect, useRef } from 'react';
import './Model3D.css';

// This component shows an interactive 3D model with model-viewer, sized like a big picture in an article's gallery. Until the model has loaded, and in the server HTML, the poster image is shown in its place.
const Model3D = ({ src, poster, alt }) => {
  // This ref points to the model-viewer element.
  const viewer = useRef(null);

  // This useEffect loads model-viewer in the browser only, because it needs window. It is told to use the Draco decoder kept in public/~/draco/ instead of Google's copy.
  useEffect(() => {
    self.ModelViewerElement = self.ModelViewerElement || {};
    self.ModelViewerElement.dracoDecoderLocation = '/~/draco/';
    import('@google/model-viewer');
  }, []);

  // This useEffect lets the model turn as soon as it shows. Once someone has moved it, it waits 15 seconds after they stop before turning again.
  useEffect(() => {
    const element = viewer.current;
    const onCameraChange = (e) => {
      if (e.detail.source === 'user-interaction') {
        element.autoRotateDelay = 15000;
      }
    };
    element.addEventListener('camera-change', onCameraChange);
    return () => element.removeEventListener('camera-change', onCameraChange);
  }, []);

  // The camera starts where the 2022 Blender camera was: 530 m from the building, 25 degrees above the ground, with a 25 degree view.
  return (
    <model-viewer
      ref={viewer}
      className="big-model"
      src={src}
      alt={alt}
      camera-target="0m 5m 3m"
      camera-orbit="-19.5deg 65.1deg 530m"
      field-of-view="25.4deg"
      min-camera-orbit="auto 35deg 200m"
      max-camera-orbit="auto 82deg 900m"
      tone-mapping="none"
      camera-controls=""
      disable-pan=""
      interaction-prompt="none"
      auto-rotate=""
      auto-rotate-delay="0"
      rotation-per-second="6deg"
    >
      <img slot="poster" className="big-model-poster" src={poster} alt={alt} />
    </model-viewer>
  );
};

export default Model3D;
