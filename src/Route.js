'use client';
// This file is new in the Next version. App.js used to hold the <Routes> list below and pass mobile, portrait and pathName to the page for the current path. In Next each page.js in src/app renders this component with its path, and the values come from App through AppContext.
import { useContext } from 'react';
import Home from './components/Home.js';
import Projects from './components/Projects.js';
import Publications from './components/Publications.js';
import Questions from './components/Questions.js';
import About from './components/About.js';
import Artworks from './components/Artworks.js';
import AppContext from './AppContext.js';

const Route = ({ path }) => {
  const { mobile, portrait, pathName } = useContext(AppContext);
  const pathname = pathName;

  // This object is the <Routes> list from App.js in the React version, keyed by the old paths.
  const routes = {
    '/': <Home mobile={mobile} portrait={portrait} pathName={pathname} />,
    '/projects': (
      <Projects mobile={mobile} portrait={portrait} pathName={pathname} />
    ),
    '/p': <Projects mobile={mobile} portrait={portrait} pathName={pathname} />,
    '/publications': (
      <Publications mobile={mobile} portrait={portrait} pathName={pathname} />
    ),
    '/artworks': (
      <Artworks mobile={mobile} portrait={portrait} pathName={pathname} />
    ),
    '/questions': (
      <Questions mobile={mobile} portrait={portrait} pathName={pathname} />
    ),
    '/links': <About mobile={mobile} portrait={portrait} pathName={pathname} />,
  };

  return routes[path];
};

export default Route;
