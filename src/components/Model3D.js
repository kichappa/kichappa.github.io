import React, { useEffect, useRef, useState } from 'react';
import './Model3D.css';

// This component shows an interactive 3D model with model-viewer, sized like a big picture in an article's gallery. Until the model has loaded, and in the server HTML, the poster image is shown in its place.
const Model3D = ({ src, poster, alt }) => {
  // This ref points to the model-viewer element.
  const viewer = useRef(null);
  // This state stores whether the model is revolving. The Revolve button shows it and switches it.
  const [revolving, setRevolving] = useState(true);
  // This ref remembers that the visitor switched revolving off with the button, so it does not come back on by itself.
  const stoppedByButton = useRef(false);
  // This ref holds the timer that switches revolving back on 7 seconds after the visitor stops moving the model.
  const resumeTimer = useRef(null);

  // This useEffect loads model-viewer in the browser only, because it needs window. It is told to use the Draco decoder kept in public/~/draco/ instead of Google's copy.
  useEffect(() => {
    self.ModelViewerElement = self.ModelViewerElement || {};
    self.ModelViewerElement.dracoDecoderLocation = '/~/draco/';
    import('@google/model-viewer');
  }, []);

  // This useEffect stops the revolving while someone moves the model, and switches it back on 7 seconds after they stop, unless they switched it off with the button.
  useEffect(() => {
    const element = viewer.current;
    const onCameraChange = (e) => {
      if (e.detail.source !== 'user-interaction') {
        return;
      }
      setRevolving(false);
      clearTimeout(resumeTimer.current);
      if (!stoppedByButton.current) {
        resumeTimer.current = setTimeout(() => setRevolving(true), 7000);
      }
    };
    element.addEventListener('camera-change', onCameraChange);
    return () => {
      element.removeEventListener('camera-change', onCameraChange);
      clearTimeout(resumeTimer.current);
    };
  }, []);

  // This function is the Revolve button. It switches revolving on or off straight away.
  const toggleRevolve = () => {
    clearTimeout(resumeTimer.current);
    stoppedByButton.current = revolving;
    setRevolving(!revolving);
  };

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
      auto-rotate={revolving ? '' : undefined}
      auto-rotate-delay="0"
      rotation-per-second="6deg"
    >
      <img slot="poster" className="big-model-poster" src={poster} alt={alt} />
      {/* The pointer is stopped here so that pressing the button does not also turn the model. */}
      <button
        className={revolving ? 'model-revolve on' : 'model-revolve'}
        aria-pressed={revolving}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggleRevolve}
      >
        Revolve
      </button>
    </model-viewer>
  );
};

export default Model3D;
