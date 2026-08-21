'use client';
import { useState, useEffect, useLayoutEffect, createContext } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import Navbar from '@/components/Navbar';
import './style.css';
import './index.css';
import './App.css';
import './fonts.css';

export const ResponsiveContext = createContext({ portrait: false, mobile: false });

const mathJaxConfig = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
  },
};

function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.matchMedia('(hover:none)').matches
  );
}

const amIAtHome = (pathName) => {
  return pathName === '/';
};

const amIAtProjects = (pathName) => {
  return pathName.startsWith('/projects') || pathName.startsWith('/p');
};

const navItems = [
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
    linkCheck: '/projects',
    linkFunction: amIAtProjects,
  },
  {
    name: 'Publications',
    isLinkAFunction: false,
    link: '/publications',
    linkCheck: '/publications',
  },
  {
    name: 'Artworks',
    isLinkAFunction: false,
    link: '/artworks',
    linkCheck: '/artworks',
  },
  {
    name: 'Links',
    isLinkAFunction: false,
    link: '/links',
    linkCheck: '/links',
  },
];

export default function RootLayout({ children }) {
  const [portrait, setPortrait] = useState(false);
  const [mobile, setMobile] = useState(false);
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
    if (mobile !== window.matchMedia('(max-aspect-ratio: 6/10) and (hover:none)').matches) {
      setMobile(isMobileDevice());
    }
  }, [size]);

  useEffect(() => {
    setPortrait(window.matchMedia('(max-aspect-ratio: 6/10)').matches);
    setMobile(isMobileDevice());

    const documentOnClick = (e) => {
      if (mobile && !document.getElementById('navbar')?.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener('click', documentOnClick);
    return () => document.removeEventListener('click', documentOnClick);
  }, []);

  return (
    <html lang="en">
      <body>
        <MathJaxContext version={3} config={mathJaxConfig}>
          <ResponsiveContext.Provider value={{ portrait, mobile }}>
            <div className="App">
              <Navbar
                portrait={portrait}
                mobile={mobile}
                expanded={expanded}
                setExpanded={setExpanded}
                items={navItems}
              />
              <div className="content">{children}</div>
            </div>
          </ResponsiveContext.Provider>
        </MathJaxContext>
      </body>
    </html>
  );
}
