// This file is new in the Next version. It holds what public/index.html held in the React version, and renders src/index.js inside <div id="root"> the way index.html and index.js did together.
import Index from '../index.js';

// This metadata replaces the <title> tag of public/index.html. Pages override it with their own titles.
export const metadata = {
  title: 'Kishore Shenoy',
};

// Next writes its own viewport meta tag unless these are cleared. They are cleared so that the page keeps only the two viewport tags copied from public/index.html below.
export const viewport = {
  width: null,
  initialScale: null,
};

// This script is new in the Next version. It sits in <head>, so it runs before any of the page is drawn.
// First, the React version kept the route in the hash, like /#/projects or /#/p#spy-sim. GitHub Pages cannot redirect on the server, so old links are sent on to the new pages here, like /~/projects/ or /~/p/#spy-sim. The page stays hidden while the browser moves on.
// Second, it marks <html> with data-mobile when isMobileDevice() in App.js would be true. The server cannot know this, so before-hydration.css uses the mark to show the phone version of the logo and tag filters until React takes over.
const beforePaint = `
if (window.location.hash.indexOf('#/') === 0) {
  var url = new URL(window.location.hash.slice(1), window.location.origin);
  var path = url.pathname;
  if (path.slice(-1) === '/') path = path.slice(0, -1);
  document.documentElement.style.visibility = 'hidden';
  window.location.replace((path ? '/~' + path + '/' : '/') + url.search + url.hash);
}
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.matchMedia('(hover:none)').matches
) {
  document.documentElement.setAttribute('data-mobile', '');
}
`;

// This layout is the HTML page around every route. suppressHydrationWarning is there because the script above adds data-mobile to <html> before React sees it.
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Next writes <meta charset="utf-8" /> itself, so it is not repeated here. */}
        {/* favicon */}
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/favicon/ms-icon-144x144.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* %PUBLIC_URL% is a react-scripts placeholder. Next serves public/ from the site root, so it is left out here and below. */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#cddd51" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#cddd51" />
        <meta name="Kishore Shenot" content="About me" />
        {/* <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
        <script
          id="MathJax-script"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        ></script> */}

        {/*
          manifest.json provides metadata used when your web app is installed on a
          user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
        */}
        <link rel="manifest" href="/manifest.json" />
        {/*
          Notice the use of %PUBLIC_URL% in the tags above.
          It will be replaced with the URL of the `public` folder during the build.
          Only files inside the `public` folder can be referenced from the HTML.

          Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
          work correctly both with client-side routing and a non-root public URL.
          Learn how to configure a non-root public URL by running `npm run build`.
        */}
        {/* <title>Kishore Shenoy</title> is written by Next from `metadata` above. */}
        <script dangerouslySetInnerHTML={{ __html: beforePaint }} />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
          <Index>{children}</Index>
        </div>
        {/*
          This HTML file is a template.
          If you open it directly in the browser, you will see an empty page.

          You can add webfonts, meta tags, or analytics to this file.
          The build step will place the bundled scripts into the <body> tag.

          To begin the development, run `npm start` or `yarn start`.
          To create a production bundle, use `npm run build` or `yarn build`.
        */}
        {/* <script type="text/javascript">
          if (window.MathJax) {
            MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
          }
        </script> */}
      </body>
    </html>
  );
}
