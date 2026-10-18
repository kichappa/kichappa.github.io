'use client';
// 'use client' is new in the Next version. App keeps state and listens to the window, so it has to run in the browser.
import logo from './logo.svg';
import './style.css';
// The page components (Home, Projects, Publications, Questions, About and Artworks) are imported in src/Route.js in the Next version, next to the list of routes that uses them.
import Navbar from './components/Navbar.js';
// usePathname from next/navigation replaces useLocation from react-router-dom in the Next version.
import { usePathname } from 'next/navigation';
import { useState, useEffect, useLayoutEffect } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
// AppContext is new in the Next version (see src/AppContext.js).
import AppContext from './AppContext.js';

// This function tells whether the visitor is on a phone or tablet, from the browser name or from a screen that cannot hover.
function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.matchMedia('(hover:none)').matches
  );
}

// This component is the whole app: the navbar, the content area and the state they share.
function App({ children }) {
  // In the Next version these two states read window only in the browser, because the server has no window. The browser still starts with the real values, so the handlers made on the first render see them as before. Anything drawn from them waits for hydration (see src/useHydrated.js).
  // This state stores whether the window is narrower than 6:10, which switches the site to its portrait layout.
  const [portrait, setPortrait] = useState(
    typeof window !== 'undefined' &&
      window.matchMedia('(max-aspect-ratio: 6/10)').matches
  );
  // This state stores whether the visitor is on a phone or tablet (see isMobileDevice).
  const [mobile, setMobile] = useState(
    typeof window !== 'undefined' && isMobileDevice()
  );
  // This state stores whether the portrait menu is open.
  const [expanded, setExpanded] = useState(false);

  // This state stores the window's width and height, so the effects below can react to a resize.
  const [size, setSize] = useState([0, 0]);
  // This useLayoutEffect keeps size up to date by listening to resize events.
  useLayoutEffect(() => {
    // This function copies the window's current size into the size state.
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
  // This state stores the current route in the '#/projects' form that the navbar uses to mark the current page.
  const [pathname, setPathname] = useState(getHashPath(''));

  // This function tells whether pathName is the home page.
  const amIAtHome = (pathName) => {
    return pathName.startsWith('#/#') || pathName === '' || pathName === '#/';
  };

  // This function tells whether pathName is the projects page, under either of its two paths.
  const amIAtProjects = (pathName) => {
    return pathName.startsWith('#/projects') || pathName.startsWith('#/p#');
  };

  // Also change --menu-items in style.css inside root at line 233
  // In the Next version the links start with /~/, the folder that holds every page except home.
  // This state stores the navbar's items. Each item is marked current either by its linkFunction or by pathname starting with its linkCheck.
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

  // This useEffect runs after every page change. It updates pathname and scrolls to the article named in the hash, if there is one.
  useEffect(() => {
    // console.log(window.location);
    // In the Next version the hash form of the path comes from getHashPath.
    setPathname(getHashPath(window.location.hash));
    if ((window.location.hash.match(/#([^/?=]+)/g) || []).length > 0) {
      console.log(window.location.hash.match(/#([^/?=]+)/g)[0].slice(1));
      scrollIntoView(window.location.hash);
    }
  }, [location]);

  // This useEffect runs after every resize and updates portrait and mobile when they no longer match the window.
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

  // This function scrolls to the element named by the first '#' in the hash that is not followed by '/', like spy-sim in '#/p#spy-sim'. Any error, like a missing element, is ignored.
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

  // This variable holds the browser's function for going fullscreen. Nothing uses it yet.
  // In the Next version this lookup only runs in the browser, because the server has no document.
  var rFS =
    typeof document !== 'undefined' &&
    (document.documentElement.requestFullscreen ||
      document.documentElement.mozRequestFullScreen ||
      document.documentElement.webkitRequestFullScreen ||
      document.documentElement.msRequestFullscreen);

  // This function closes the portrait menu on phones when a click lands outside the navbar.
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

  // This useEffect runs once when App first appears. It sets pathname, scrolls to the linked article, and listens for clicks outside the navbar.
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
