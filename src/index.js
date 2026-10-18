'use client';
// 'use client' is new in the Next version. This file used to be the script that started the app. Now src/app/layout.js renders it, and it still has to run in the browser.
import React from 'react';
// react-dom/client is not imported in the Next version, because Next creates the React root itself.
import './index.css';
import App from './App';
// This stylesheet is new in the Next version (see before-hydration.css). It is imported after App so it comes after style.css.
import './before-hydration.css';
import reportWebVitals from './reportWebVitals';
// react-router-dom is not imported in the Next version. Next routes by the real path, like /~/projects/, so App is not wrapped in a HashRouter.

// This component replaces root.render(...) from the React version. src/app/layout.js puts it inside <div id="root">, and Next hands it the page for the current path as children.
const Index = ({ children }) => {
  return <App>{children}</App>;
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default Index;
