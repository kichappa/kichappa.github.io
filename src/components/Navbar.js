import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/Logo.svg';
import logoBlack from '../images/LogoBlack.svg';
import hamburger from '../images/Hamburger.svg';
import cross from '../images/Cross.svg';

const Navbar = ({ portrait, mobile, expanded, setExpanded, pathName }) => {
  const menuExpandContainer = useRef(null);
  const menuContainer = useRef(null);

  useEffect(() => {
    expandMenu();
  }, [expanded]);

  const expandMenu = (expand = expanded) => {
    if (mobile) {
      if (expand) {
        menuExpandContainer.current.className += ' expanded';
        menuContainer.current.className += ' expanded';
        document.documentElement.style.setProperty('--menu-expanded', 1);
      } else {
        menuExpandContainer.current.className = menuExpandContainer.current.className.replace(
          ' expanded',
          ''
        );
        menuContainer.current.className = menuContainer.current.className.replace(
          ' expanded',
          ''
        );
        document.documentElement.style.setProperty('--menu-expanded', 0);
      }
    }
    // setExpanded(!expand);
  };
  let appropriate_logo = logo;
  if (mobile) {
    appropriate_logo = logoBlack;
  }
  console.log(pathName);
  // console.log(portrait);
  if (!portrait) {
    return (
      <>
        <div className="menu">
          <img src={appropriate_logo} alt="My Logo" id="logo" />
          {pathName.startsWith('#/#') |
          (pathName === '') |
          (pathName === '#/') ? (
            <p className="current">Home</p>
          ) : (
            <Link to="/">Home</Link>
          )}
          {pathName.startsWith('#/projects') || pathName.startsWith('#/p#') ? (
            <p className="current">Projects</p>
          ) : (
            <Link to="/projects">Projects</Link>
          )}
          {pathName.startsWith('#/publications') ? (
            <p className="current">Publications</p>
          ) : (
            <Link to="/publications">Publications</Link>
          )}
          {pathName.startsWith('#/artworks') ? (
            <p className="current">Artworks</p>
          ) : (
            <Link to="/artworks">Artworks</Link>
          )}
          {pathName.startsWith('#/questions') ? (
            <p className="current">Questions</p>
          ) : (
            <Link to="/questions">Questions</Link>
          )}
          {pathName.startsWith('#/contact') ? (
            <p className="current">Links+Contact</p>
          ) : (
            <Link to="/links">Links+Contact</Link>
          )}
        </div>
      </>
    );
  } else if (mobile) {
    return (
      <div id="navbar">
        <div className="wrapper">
          <img src={appropriate_logo} alt="My Logo" id="logo" />
          <div
            className="menu-buttons-container"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="wrapper1">
              <div className="wrapper2" ref={menuExpandContainer}>
                <div className="menu-button-menu-wrapper" data="Menu">
                  <img
                    src={hamburger}
                    alt="hamburger menu"
                    className="menu-button"
                  />
                </div>
                <img src={cross} alt="hamburger menu" className="menu-button" />
              </div>
            </div>
          </div>
          <div className="menu" ref={menuContainer}>
            {pathName.startsWith('#/#') |
            (pathName === '') |
            (pathName === '#/') ? (
              <div className="menu-item">
                <p className="current">Home</p>
              </div>
            ) : (
              <Link
                className="menu-item"
                onClick={() => setExpanded(false)}
                to="/"
              >
                <p className="link">Home</p>
              </Link>
            )}
            {pathName.startsWith('#/projects') ||
            pathName.startsWith('#/p#') ? (
              <div className="menu-item">
                <p className="current">Projects</p>
              </div>
            ) : (
              <Link
                className="menu-item"
                onClick={() => setExpanded(false)}
                to="/projects"
              >
                <p className="link">Projects</p>
              </Link>
            )}
            {pathName.startsWith('#/publications') ? (
              <div className="menu-item">
                <p className="current">Publications</p>
              </div>
            ) : (
              <Link
                className="menu-item"
                onClick={() => setExpanded(false)}
                to="/publications"
              >
                <p className="link">Publications</p>
              </Link>
            )}
            {pathName.startsWith('#/artworks') ? (
              <div className="menu-item">
                <p className="current">Artworks</p>
              </div>
            ) : (
              <Link
                className="menu-item"
                onClick={() => setExpanded(false)}
                to="/artworks"
              >
                <p className="link">Artworks</p>
              </Link>
            )}
            {pathName.startsWith('#/questions') ? (
              <div className="menu-item">
                <p className="current">Questions</p>
              </div>
            ) : (
              <Link
                className="menu-item"
                onClick={() => setExpanded(false)}
                to="/questions"
              >
                <p className="link">Questions</p>
              </Link>
            )}
            {pathName.startsWith('#/contact') ? (
              <div className="menu-item">
                <p className="current">Links+Contact</p>
              </div>
            ) : (
              <Link
                className="menu-item"
                onClick={() => setExpanded(false)}
                to="/links"
              >
                <p className="link">Links+Contact</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
