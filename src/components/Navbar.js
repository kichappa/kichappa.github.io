import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/Logo.svg';
import logoBlack from '../images/LogoBlack.svg';
import hamburger from '../images/Hamburger.svg';
import cross from '../images/Cross.svg';

const Navbar = ({ portrait, mobile, expanded, setExpanded, pathName }) => {
  const menuExpandContainer = useRef(null);
  const menuContainer = useRef(null);

  const expandMenu = ({ expand = expanded }) => {
    if (!expand) {
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
    setExpanded(!expand);
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
          {pathName.startsWith('#/projects') ? (
            <p className="current">Projects</p>
          ) : (
            <Link to="/projects">Projects</Link>
          )}
          {pathName.startsWith('#/publications') ? (
            <p className="current">Publications</p>
          ) : (
            <Link to="/publications">Publications</Link>
          )}
          {pathName.startsWith('#/questions') ? (
            <p className="current">Questions</p>
          ) : (
            <Link to="/questions">Questions</Link>
          )}
          {pathName.startsWith('#/about') ? (
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
        <div id="navbar">
          <div className="wrapper">
            <img src={appropriate_logo} alt="My Logo" id="logo" />
            <div className="menu-buttons-container" onClick={expandMenu}>
              <div className="wrapper1">
                <div className="wrapper2" ref={menuExpandContainer}>
                  <img
                    src={hamburger}
                    alt="hamburger menu"
                    className="menu-button"
                  />
                  <img
                    src={cross}
                    alt="hamburger menu"
                    className="menu-button"
                  />
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
                  onClick={() => expandMenu(false)}
                  to="/"
                >
                  <p className="link">Home</p>
                </Link>
              )}
              {pathName.startsWith('#/projects') ? (
                <div className="menu-item">
                  <p className="current">Projects</p>
                </div>
              ) : (
                <Link
                  className="menu-item"
                  onClick={() => expandMenu(false)}
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
                  onClick={() => expandMenu(false)}
                  to="/publications"
                >
                  <p className="link">Publications</p>
                </Link>
              )}
              {pathName.startsWith('#/questions') ? (
                <div className="menu-item">
                  <p className="current">Questions</p>
                </div>
              ) : (
                <Link
                  className="menu-item"
                  onClick={() => expandMenu(false)}
                  to="/questions"
                >
                  <p className="link">Questions</p>
                </Link>
              )}
              {pathName.startsWith('#/about') ? (
                <div className="menu-item">
                  <p className="current">About</p>
                </div>
              ) : (
                <Link
                  className="menu-item"
                  onClick={() => expandMenu(false)}
                  to="/about"
                >
                  <p className="link">About</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="navbar">
          <div className="wrapper">
            <img src={appropriate_logo} alt="My Logo" id="logo" />
            <div className="menu-buttons-container" onClick={expandMenu}>
              <div className="wrapper1">
                <div className="wrapper2" ref={menuExpandContainer}>
                  <img
                    src={hamburger}
                    alt="hamburger menu"
                    className="menu-button"
                  />
                  <img
                    src={cross}
                    alt="hamburger menu"
                    className="menu-button"
                  />
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
                  onClick={() => expandMenu(false)}
                  to="/"
                >
                  <p className="link">Home</p>
                </Link>
              )}
              {pathName.startsWith('#/projects') ? (
                <div className="menu-item">
                  <p className="current">Projects</p>
                </div>
              ) : (
                <Link
                  className="menu-item"
                  onClick={() => expandMenu(false)}
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
                  onClick={() => expandMenu(false)}
                  to="/publications"
                >
                  <p className="link">Publications</p>
                </Link>
              )}
              {pathName.startsWith('#/questions') ? (
                <div className="menu-item">
                  <p className="current">Questions</p>
                </div>
              ) : (
                <Link
                  className="menu-item"
                  onClick={() => expandMenu(false)}
                  to="/questions"
                >
                  <p className="link">Questions</p>
                </Link>
              )}
              {pathName.startsWith('#/about') ? (
                <div className="menu-item">
                  <p className="current">About</p>
                </div>
              ) : (
                <Link
                  className="menu-item"
                  onClick={() => expandMenu(false)}
                  to="/about"
                >
                  <p className="link">About</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Navbar;
