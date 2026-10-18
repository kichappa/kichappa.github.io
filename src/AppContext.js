import { createContext } from 'react';

// This file is new in the Next version. In the React version App passed mobile, portrait and pathName to each page through <Routes>. Next gives App the page as children instead, so the same values reach the page through this context (see src/Route.js). It is kept out of App.js so that pages do not import App.js and its CSS a second time.
const AppContext = createContext({});

export default AppContext;
