import logo from './logo.svg';
import './style.css';
import Home from './components/Home.js';
import Projects from './components/Projects.js';
import Publications from './components/Publications.js';
import Questions from './components/Questions.js';
import About from './components/About.js';
import Navbar from './components/Navbar.js';
import Artworks from './components/Artworks.js';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, useLayoutEffect } from 'react';
import { MathJaxContext } from 'better-react-mathjax';

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

  let location = useLocation();
  const [pathname, setPathname] = useState(window.location.hash);
  useEffect(() => {
    // console.log(window.location);
    setPathname(window.location.hash);
    if ((window.location.hash.match(/#(?!\/).+/g) || []).length > 0) {
      console.log(window.location.hash.match(/#(?!\/).+/g)[0].slice(1));
      scrollIntoView(window.location.hash);
    }
  }, [location]);

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

  const scrollIntoView = (hash) => {
    try {
      console.log(
        document.getElementById(hash.match(/#(?!\/).+/g)[0].slice(1))
      );
      document
        .getElementById(hash.match(/#(?!\/).+/g)[0].slice(1))
        .scrollIntoView({ behavior: 'auto', alignToTop: true });
    } catch {}
  };

  var rFS =
    document.documentElement.requestFullscreen ||
    document.documentElement.mozRequestFullScreen ||
    document.documentElement.webkitRequestFullScreen ||
    document.documentElement.msRequestFullscreen;

  useEffect(() => {
    setPathname(window.location.hash);
    if ((window.location.hash.match(/#(?!\/).+/g) || []).length > 0) {
      console.log(window.location.hash.match(/#(?!\/).+/g)[0].slice(1));
      scrollIntoView(window.location.hash);
    }
  }, []);

  return (
    <>
      <MathJaxContext>
        <div className="App">
          <Navbar
            portrait={portrait}
            mobile={mobile}
            expanded={expanded}
            setExpanded={setExpanded}
            pathName={pathname}
          />
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    mobile={mobile}
                    portrait={portrait}
                    pathName={pathname}
                  />
                }
              />
              <Route
                path="/projects"
                element={
                  <Projects
                    mobile={mobile}
                    portrait={portrait}
                    pathName={pathname}
                  />
                }
              />
              <Route
                path="/p"
                element={
                  <Projects
                    mobile={mobile}
                    portrait={portrait}
                    pathName={pathname}
                  />
                }
              />
              <Route
                path="/publications"
                element={
                  <Publications
                    mobile={mobile}
                    portrait={portrait}
                    pathName={pathname}
                  />
                }
              />
              <Route
                path="/artworks"
                element={
                  <Artworks
                    mobile={mobile}
                    portrait={portrait}
                    pathName={pathname}
                  />
                }
              />
              <Route
                path="/questions"
                element={
                  <Questions
                    mobile={mobile}
                    portrait={portrait}
                    pathName={pathname}
                  />
                }
              />
              <Route
                path="/about"
                element={
                  <About
                    mobile={mobile}
                    portrait={portrait}
                    pathName={pathname}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </MathJaxContext>
    </>
  );
}

export default App;
