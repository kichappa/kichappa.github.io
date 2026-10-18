'use client';
// 'use client' is new in the Next version. App keeps state and listens to the window, so it has to run in the browser.
import logo from './logo.svg';
import './style.css';
// The page components (Home, Projects, Publications, Questions, About and Artworks) are imported in src/Route.js in the Next version, next to the list of routes that uses them.
import Navbar from './components/Navbar.js';
// usePathname from next/navigation replaces useLocation from react-router-dom in the Next version.
import { usePathname } from 'next/navigation';
// createContext is new in the Next version, for AppContext below.
import { useState, useEffect, useLayoutEffect, createContext } from 'react';
import { MathJaxContext } from 'better-react-mathjax';

function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.matchMedia('(hover:none)').matches
  );
}

// This context is new in the Next version. In the React version App passed mobile, portrait and pathName to each page through <Routes>. Next gives App the page as children instead, so the same values reach the page through this context (see src/Route.js).
export const AppContext = createContext({});

function App({ children }) {
  // In the Next version these two states read window only in the browser, because the server has no window. The browser still starts with the real values, so the handlers made on the first render see them as before. Anything drawn from them waits for hydration (see src/useHydrated.js).
  const [portrait, setPortrait] = useState(
    typeof window !== 'undefined' &&
      window.matchMedia('(max-aspect-ratio: 6/10)').matches
  );
  const [mobile, setMobile] = useState(
    typeof window !== 'undefined' && isMobileDevice()
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

  // In the Next version location is the real path, like '/~/projects/', instead of react-router's location object.
  let location = usePathname();
  // This function is new in the Next version. The React version kept the whole route in window.location.hash, like '#/projects' or '#/p#spy-sim'. This function builds that same string from the real path (without the /~ prefix) and the hash, so the checks below and in Navbar.js work unchanged.
  const getHashPath = (hash) =>
    '#' +
    (location.replace(/^\/~(?=\/)/, '').replace(/\/$/, '') || '/') +
    hash;
  // In the Next version this starts without the hash, because the server cannot see it. The effects below add the hash after hydration.
  const [pathname, setPathname] = useState(getHashPath(''));

  const amIAtHome = (pathName) => {
    return pathName.startsWith('#/#') || pathName === '' || pathName === '#/';
  };

  const amIAtProjects = (pathName) => {
    return pathName.startsWith('#/projects') || pathName.startsWith('#/p#');
  };

  // Also change --menu-items in style.css inside root at line 233
  // In the Next version the links start with /~/, the folder that holds every page except home.
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
      link: '/~/projects',
      linkCheck: '#/projects',
      linkFunction: amIAtProjects,
    },
    {
      name: 'Publications',
      isLinkAFunction: false,
      link: '/~/publications',
      linkCheck: '#/publications',
    },
    {
      name: 'Artworks',
      isLinkAFunction: false,
      link: '/~/artworks',
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
      link: '/~/links',
      linkCheck: '#/links',
    },
  ]);

  useEffect(() => {
    // console.log(window.location);
    // In the Next version the hash form of the path comes from getHashPath.
    setPathname(getHashPath(window.location.hash));
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

  // In the Next version this lookup only runs in the browser, because the server has no document.
  var rFS =
    typeof document !== 'undefined' &&
    (document.documentElement.requestFullscreen ||
      document.documentElement.mozRequestFullScreen ||
      document.documentElement.webkitRequestFullScreen ||
      document.documentElement.msRequestFullscreen);

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
    // In the Next version the hash form of the path comes from getHashPath.
    setPathname(getHashPath(window.location.hash));
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
      {/* In the Next version MathJax is told not to typeset the whole page as soon as it loads. The server HTML already holds the TeX text, and MathJax could rewrite it while React is still hydrating, which makes hydration fail. Each <MathJax> still typesets its own text after hydration, as before. */}
      <MathJaxContext config={{ startup: { typeset: false } }}>
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
            {/* In the Next version the <Routes> list moved to src/Route.js. Next renders the page for the current path as children, and the page reads mobile, portrait and pathName from this context. */}
            <AppContext.Provider
              value={{ mobile: mobile, portrait: portrait, pathName: pathname }}
            >
              {children}
            </AppContext.Provider>
          </div>
        </div>
      </MathJaxContext>
    </>
  );
}

export default App;
