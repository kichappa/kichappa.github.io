import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
// next/link replaces react-router-dom's Link in the Next version.
import Link from 'next/link';
import logo from '../images/Logo.svg';
import logoBlack from '../images/LogoBlack.svg';
import hamburger from '../images/Hamburger.svg';
import cross from '../images/Cross.svg';
// useHydrated is new in the Next version (see src/useHydrated.js).
import useHydrated from '../useHydrated.js';

// This component draws the navbar: a top menu in landscape windows, and a bottom bar with a sliding menu in portrait windows.
const Navbar = ({
  portrait,
  mobile,
  expanded,
  setExpanded,
  pathName,
  items,
}) => {
  // This ref points to the box that slides the hamburger and cross icons.
  const menuExpandContainer = useRef(null);
  // This ref points to the portrait menu that slides up when opened.
  const menuContainer = useRef(null);
  // This is new in the Next version. It is false until React has hydrated the server HTML.
  const hydrated = useHydrated();

  // This useEffect opens or closes the portrait menu whenever expanded changes.
  useEffect(() => {
    expandMenu();
  }, [expanded]);

  // This function opens or closes the portrait menu on phones by adding or removing the 'expanded' class and setting --menu-expanded, which style.css uses to slide the menu.
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

  // This function returns the navbar for the given shape: the top menu when not portrait, the bottom bar otherwise. The current page is shown as plain text and the others as links.
  const getNavBar = (
    mobile,
    portrait,
    setExpanded,
    expanded,
    items,
    pathName
  ) => {
    // console.log(pathName);
    // console.log(items);

    // items.map((item) => {
    //   if (item.isLinkAFunction) {
    //     console.log("I'm a function");
    //     console.log(item.linkFunction(pathName));
    //   } else {
    //     console.log(pathName.startsWith(item.link));
    //   }
    // });

    // for (let i = 0; i < items.length; i++) {
    //   console.log(items[i].name);
    //   console.log('Is a function?', items[i].isLinkAFunction);
    //   console.log(items[i].link);
    //   console.log('pathname=', pathName);
    //   if (items[i].isLinkAFunction) {
    //     console.log(items[i].linkFunction);
    //     console.log(items[i].linkFunction(pathName));
    //   } else {
    //     console.log(pathName.startsWith(items[i].linkCheck));
    //   }
    // }

    // function isMobileDevice() {
    //   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    //     navigator.userAgent
    //   );
    // }
    // console.log('is mobile?', mobile);
    // console.log('is portrait?', portrait);
    // console.log(window.matchMedia('(hover:none)').matches);
    // console.log(isMobileDevice());

    if (!portrait) {
      return (
        <>
          {/* In the Next version the mark below lets before-hydration.css hide this menu in portrait windows until hydration. */}
          <div
            className="menu"
            data-before-hydration={hydrated ? undefined : 'landscape'}
          >
            {/* In the Next version the logo comes from getLogo() below. */}
            {getLogo()}
            {items.map((item) => {
              if (
                (item.isLinkAFunction && item.linkFunction(pathName)) ||
                (!item.isLinkAFunction && pathName.startsWith(item.linkCheck))
              ) {
                return <p className="current">{item.name}</p>;
              } else {
                // next/link takes href instead of to. scroll={false} keeps the scroll position of .content when the page changes, as react-router did; Next would otherwise scroll the new page into view.
                return (
                  <Link href={item.link} scroll={false}>
                    {item.name}
                  </Link>
                );
              }
            })}
          </div>
        </>
      );
    } else {
      return (
        // In the Next version the mark below lets before-hydration.css hide this navbar in other windows until hydration.
        <div
          id="navbar"
          class="nav-mob"
          data-before-hydration={hydrated ? undefined : 'portrait'}
        >
          <div className="wrapper">
            {/* In the Next version the logo comes from getLogo() below. */}
            {getLogo()}
            <div
              className="menu-buttons-container"
              onClick={() => setExpanded(!expanded)}
            >
              <div className="wrapper1">
                <div className="wrapper2" ref={menuExpandContainer}>
                  <div className="menu-button-menu-wrapper" data="Menu">
                    {/* Next imports images as objects, so the URL is in .src in the Next version. */}
                    <img
                      src={hamburger.src}
                      alt="hamburger menu"
                      className="menu-button"
                    />
                  </div>
                  <img
                    src={cross.src}
                    alt="hamburger menu"
                    className="menu-button"
                  />
                </div>
              </div>
            </div>
            <div className="menu" ref={menuContainer}>
              {items.map((item) => {
                if (
                  (item.isLinkAFunction && item.linkFunction(pathName)) ||
                  (!item.isLinkAFunction && pathName.startsWith(item.linkCheck))
                ) {
                  return (
                    <div className="menu-item">
                      <p className="current">{item.name}</p>
                    </div>
                  );
                } else {
                  return (
                    // next/link takes href instead of to, and scroll={false} keeps the scroll position, as in the top menu above.
                    <Link
                      className="menu-item"
                      onClick={() => setExpanded(false)}
                      href={item.link}
                      scroll={false}
                    >
                      <p className="link">{item.name}</p>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
      );
    }
  };

  // This variable holds the logo to show: the black-background version on phones.
  let appropriate_logo = logo;
  if (mobile) {
    appropriate_logo = logoBlack;
  }
  // console.log(pathName);

  // This function is new in the Next version and draws the logo for getNavBar. Next imports images as objects, so the URL is in .src. Before hydration the server cannot know if this is a phone, so both logos are drawn and before-hydration.css keeps the one appropriate_logo would be. The keys let React keep that same <img> when the other one is removed after hydration.
  const getLogo = () => {
    if (!hydrated) {
      return [
        <img
          key="logo"
          src={logo.src}
          alt="My Logo"
          id="logo"
          data-before-hydration="logo"
        />,
        <img
          key="logoBlack"
          src={logoBlack.src}
          alt="My Logo"
          id="logo"
          data-before-hydration="logo-black"
        />,
      ];
    }
    return [
      <img
        key={mobile ? 'logoBlack' : 'logo'}
        src={appropriate_logo.src}
        alt="My Logo"
        id="logo"
      />,
    ];
  };

  // In the Next version the navbar is returned through the code below. Before hydration the server cannot know the shape of the window, so both navbars are drawn and before-hydration.css shows the one that matches (max-aspect-ratio: 6/10), the query App.js uses for portrait. After hydration only getNavBar's own pick is drawn, as in the React version. The keys let React keep the visible navbar when the other one is removed.
  if (!hydrated) {
    return [
      <React.Fragment key="landscape">
        {getNavBar(mobile, false, setExpanded, expanded, items, pathName)}
      </React.Fragment>,
      <React.Fragment key="portrait">
        {getNavBar(mobile, true, setExpanded, expanded, items, pathName)}
      </React.Fragment>,
    ];
  }
  return [
    <React.Fragment key={portrait ? 'portrait' : 'landscape'}>
      {getNavBar(mobile, portrait, setExpanded, expanded, items, pathName)}
    </React.Fragment>,
  ];

  // console.log(portrait);
  // if (!portrait) {
  //   return (
  //     <>
  //       <div className="menu">
  //         <img src={appropriate_logo} alt="My Logo" id="logo" />
  //         {pathName.startsWith('#/#') |
  //         (pathName === '') ||
  //         (pathName === '#/') ? (
  //           <p className="current">Home</p>
  //         ) : (
  //           <Link to="/">Home</Link>
  //         )}
  //         {pathName.startsWith('#/projects') || pathName.startsWith('#/p#') ? (
  //           <p className="current">Projects</p>
  //         ) : (
  //           <Link to="/projects">Projects</Link>
  //         )}
  //         {pathName.startsWith('#/publications') ? (
  //           <p className="current">Publications</p>
  //         ) : (
  //           <Link to="/publications">Publications</Link>
  //         )}
  //         {pathName.startsWith('#/artworks') ? (
  //           <p className="current">Artworks</p>
  //         ) : (
  //           <Link to="/artworks">Artworks</Link>
  //         )}
  //         {pathName.startsWith('#/questions') ? (
  //           <p className="current">Questions</p>
  //         ) : (
  //           <Link to="/questions">Questions</Link>
  //         )}
  //         {pathName.startsWith('#/contact') ? (
  //           <p className="current">Links+Contact</p>
  //         ) : (
  //           <Link to="/links">Links+Contact</Link>
  //         )}
  //       </div>
  //     </>
  //   );
  // } else if (mobile) {
  //   return (
  //     <div id="navbar">
  //       <div className="wrapper">
  //         <img src={appropriate_logo} alt="My Logo" id="logo" />
  //         <div
  //           className="menu-buttons-container"
  //           onClick={() => setExpanded(!expanded)}
  //         >
  //           <div className="wrapper1">
  //             <div className="wrapper2" ref={menuExpandContainer}>
  //               <div className="menu-button-menu-wrapper" data="Menu">
  //                 <img
  //                   src={hamburger}
  //                   alt="hamburger menu"
  //                   className="menu-button"
  //                 />
  //               </div>
  //               <img
  //                  src = {cross}
  //                  alt = "hamburger menu"
  //                  className = "menu-button" />
  //             </div>
  //           </div>
  //         </div>
  //         <div className="menu" ref={menuContainer}>
  //           {pathName.startsWith('#/#') |
  //           (pathName === '') |
  //           (pathName === '#/') ? (
  //             <div className="menu-item">
  //               <p className="current">Home</p>
  //             </div>
  //           ) : (
  //             <Link
  //               className="menu-item"
  //               onClick={() => setExpanded(false)}
  //               to="/"
  //             >
  //               <p className="link">Home</p>
  //             </Link>
  //           )}
  //           {pathName.startsWith('#/projects') ||
  //           pathName.startsWith('#/p#') ? (
  //             <div className="menu-item">
  //               <p className="current">Projects</p>
  //             </div>
  //           ) : (
  //             <Link
  //               className="menu-item"
  //               onClick={() => setExpanded(false)}
  //               to="/projects"
  //             >
  //               <p className="link">Projects</p>
  //             </Link>
  //           )}
  //           {pathName.startsWith('#/publications') ? (
  //             <div className="menu-item">
  //               <p className="current">Publications</p>
  //             </div>
  //           ) : (
  //             <Link
  //               className="menu-item"
  //               onClick={() => setExpanded(false)}
  //               to="/publications"
  //             >
  //               <p className="link">Publications</p>
  //             </Link>
  //           )}
  //           {pathName.startsWith('#/artworks') ? (
  //             <div className="menu-item">
  //               <p className="current">Artworks</p>
  //             </div>
  //           ) : (
  //             <Link
  //               className="menu-item"
  //               onClick={() => setExpanded(false)}
  //               to="/artworks"
  //             >
  //               <p className="link">Artworks</p>
  //             </Link>
  //           )}
  //           {pathName.startsWith('#/questions') ? (
  //             <div className="menu-item">
  //               <p className="current">Questions</p>
  //             </div>
  //           ) : (
  //             <Link
  //               className="menu-item"
  //               onClick={() => setExpanded(false)}
  //               to="/questions"
  //             >
  //               <p className="link">Questions</p>
  //             </Link>
  //           )}
  //           {pathName.startsWith('#/contact') ? (
  //             <div className="menu-item">
  //               <p className="current">Links+Contact</p>
  //             </div>
  //           ) : (
  //             <Link
  //               className="menu-item"
  //               onClick={() => setExpanded(false)}
  //               to="/links"
  //             >
  //               <p className="link">Links+Contact</p>
  //             </Link>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
};

export default Navbar;
