import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/Logo.svg';

const Navbar = ({ portrait, mobile, expanded, setExpanded }) => {
  let location = useLocation();
  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => {
    setPathname(window.location.pathname);
  }, [location]);

  console.log(portrait);
  if (!portrait) {
    return (
      <>
        <div className="menu">
          <img src={logo} alt="My Logo" id="logo" />
          {pathname === '/' ? (
            <p className="current">Home</p>
          ) : (
            <Link to="/">Home</Link>
          )}
          {pathname === '/projects' ? (
            <p className="current">Projects</p>
          ) : (
            <Link to="/projects">Projects</Link>
          )}
          {pathname === '/publications' ? (
            <p className="current">Publications</p>
          ) : (
            <Link to="/publications">Publications</Link>
          )}
          {pathname === '/questions' ? (
            <p className="current">Questions</p>
          ) : (
            <Link to="/questions">Questions</Link>
          )}
          {pathname === '/about' ? (
            <p className="current">About</p>
          ) : (
            <Link to="/about">About</Link>
          )}
        </div>
      </>
    );
  } else if (mobile) {
    if (!expanded) {
      return (
        <>
          <img src={logo} alt="My Logo" id="logo" />
          <div className="menu"></div>
        </>
      );
    }
  }
};

export default Navbar;
