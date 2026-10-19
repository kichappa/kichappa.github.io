import React, { useEffect, useRef, useState } from 'react';
import './Model3D.css';

// This component shows an interactive 3D model with model-viewer, sized like a big picture in an article's gallery. Until the model has loaded, and in the server HTML, the poster image is shown in its place.
// `view` comes from the model's .view.json (made by tools/blend2web): `aspect` is the shape of the frame and `attributes` are model-viewer settings, such as camera-orbit for the starting view. Without it, model-viewer frames the model by itself. `resumeAfter` is how long the model waits after being moved before it revolves again.
const Model3D = ({ src, poster, alt, view = {}, resumeAfter = 7000 }) => {
  // This ref points to the model-viewer element.
  const viewer = useRef(null);
  // This state stores whether the model is revolving. The Revolve button shows it and switches it.
  const [revolving, setRevolving] = useState(true);
  // This ref remembers that the visitor switched revolving off with the button, so it does not come back on by itself.
  const stoppedByButton = useRef(false);
  // This ref holds the timer that switches revolving back on after the visitor stops moving the model.
  const resumeTimer = useRef(null);

  // This useEffect loads model-viewer in the browser only, because it needs window. It is told to use the Draco decoder kept in public/~/draco/ instead of Google's copy.
  useEffect(() => {
    self.ModelViewerElement = self.ModelViewerElement || {};
    self.ModelViewerElement.dracoDecoderLocation = '/~/draco/';
    import('@google/model-viewer');
  }, []);

  // This useEffect stops the revolving while someone moves the model, and switches it back on resumeAfter milliseconds after they stop, unless they switched it off with the button.
  useEffect(() => {
    const element = viewer.current;
    const onCameraChange = (e) => {
      if (e.detail.source !== 'user-interaction') {
        return;
      }
      setRevolving(false);
      clearTimeout(resumeTimer.current);
      if (!stoppedByButton.current) {
        resumeTimer.current = setTimeout(() => setRevolving(true), resumeAfter);
      }
    };
    element.addEventListener('camera-change', onCameraChange);
    return () => {
      element.removeEventListener('camera-change', onCameraChange);
      clearTimeout(resumeTimer.current);
    };
  }, [resumeAfter]);

  // This function is the Revolve button. It switches revolving on or off straight away.
  const toggleRevolve = () => {
    clearTimeout(resumeTimer.current);
    stoppedByButton.current = revolving;
    setRevolving(!revolving);
  };

  // The settings before view.attributes are defaults that a model's .view.json can override; the ones after it belong to the Revolve button.
  return (
    <model-viewer
      ref={viewer}
      className="big-model"
      style={{ aspectRatio: view.aspect || '16 / 10' }}
      src={src}
      alt={alt}
      camera-controls=""
      disable-pan=""
      interaction-prompt="none"
      rotation-per-second="6deg"
      {...view.attributes}
      auto-rotate={revolving ? '' : undefined}
      auto-rotate-delay="0"
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
