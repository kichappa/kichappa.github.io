import logo from './logo.svg';
import './style.css';
import Home from './components/Home.js';
import Projects from './components/Projects.js';
import Publications from './components/Publications.js';
import Questions from './components/Questions.js';
import About from './components/About.js';
import Navbar from './components/Navbar.js';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useLayoutEffect } from 'react';

function App() {
  const [portrait, setPortrait] = useState(
    window.matchMedia('(max-aspect-ratio: 6/10)').matches
  );
  const [mobile, setMobile] = useState(
    window.matchMedia('(max-aspect-ratio: 6/10) and (hover:none)').matches
  );
  const [expanded, setExpanded] = useState(false);

  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (portrait !== window.matchMedia('(max-aspect-ratio: 6/10)').matches) {
      setPortrait(window.matchMedia('(max-aspect-ratio: 6/10)').matches);
    }
    if (
      mobile !==
      window.matchMedia('(max-aspect-ratio: 6/10) and (hover:none)').matches
    ) {
      setMobile(
        window.matchMedia('(max-aspect-ratio: 6/10) and (hover:none)').matches
      );
    }
  }, [size]);

  return (
    <div className="App">
      <Navbar
        portrait={portrait}
        mobile={mobile}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
