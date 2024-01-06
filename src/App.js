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

function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.matchMedia('(hover:none)').matches
  );
}

function App() {
  const [portrait, setPortrait] = useState(
    window.matchMedia('(max-aspect-ratio: 6/10)').matches
  );
  const [mobile, setMobile] = useState(isMobileDevice());
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

  const amIAtHome = (pathName) => {
    return pathName.startsWith('#/#') || pathName === '' || pathName === '#/';
  };

  const amIAtProjects = (pathName) => {
    return pathName.startsWith('#/projects') || pathName.startsWith('#/p#');
  };

  // Also change --menu-items in style.css inside root at line 233
  const [items, setItems] = useState([
    {
      name: 'Home',
      isLinkAFunction: true,
      link: '/',
      linkFunction: amIAtHome,
    },
    {
      name: 'Projects',
      isLinkAFunction: true,
      link: '/projects',
      linkCheck: '#/projects',
      linkFunction: amIAtProjects,
    },
    {
      name: 'Publications',
      isLinkAFunction: false,
      link: '/publications',
      linkCheck: '#/publications',
    },
    {
      name: 'Artworks',
      isLinkAFunction: false,
      link: '/artworks',
      linkCheck: '#/artworks',
    },
    // {
    //   name: 'Questions',
    //   isLinkAFunction: false,
    //   link: '/questions',
    //   linkCheck: '#/questions',
    // },
    {
      name: 'Links',
      isLinkAFunction: false,
      link: '/links',
      linkCheck: '#/links',
    },
  ]);

  useEffect(() => {
    // console.log(window.location);
    setPathname(window.location.hash);
    if ((window.location.hash.match(/#([^/?=]+)/g) || []).length > 0) {
      console.log(window.location.hash.match(/#([^/?=]+)/g)[0].slice(1));
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
      setMobile(isMobileDevice());
    }
  }, [size]);

  const scrollIntoView = (hash) => {
    try {
      console.log(hash);
      console.log(hash.match(/#([^/?=]+)/g)[0]);
      console.log(hash.match(/#([^/?=]+)/g)[0].slice(1));
      console.log(
        document.getElementById(hash.match(/#([^/?=]+)/g)[0].slice(1))
      );
      document
        .getElementById(hash.match(/#([^/?=]+)/g)[0].slice(1))
        .scrollIntoView({ behavior: 'auto', alignToTop: true });
    } catch {}
  };

  var rFS =
    document.documentElement.requestFullscreen ||
    document.documentElement.mozRequestFullScreen ||
    document.documentElement.webkitRequestFullScreen ||
    document.documentElement.msRequestFullscreen;

  const documentOnClick = (e, expanded) => {
    // console.log(expanded, document.getElementById('navbar'));
    // console.log(
    //   e.target,
    //   expanded,
    //   !document.getElementById('navbar').contains(e.target),
    //   expanded && !document.getElementById('navbar').contains(e.target)
    // );
    if (mobile && !document.getElementById('navbar').contains(e.target)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    setPathname(window.location.hash);
    if ((window.location.hash.match(/#([^/?=]+)/g) || []).length > 0) {
      console.log(window.location.hash.match(/#([^/?=]+)/g)[0].slice(1));
      scrollIntoView(window.location.hash);
    }

    document.addEventListener('click', (e) => documentOnClick(e, expanded));
    return () => {
      document.removeEventListener('click', (e) =>
        documentOnClick(e, expanded)
      );
    };
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
            items={items}
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
                path="/links"
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
