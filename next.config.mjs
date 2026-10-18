// This file is new in the Next version. It sets up what react-scripts used to set up for the React version.
import { PHASE_PRODUCTION_BUILD } from 'next/constants.js';

const nextConfig = (phase) => ({
  // Every page is written to out/ as plain HTML, so GitHub Pages can serve the site without a server.
  output: 'export',
  // Each page is written as a folder with an index.html, like out/~/projects/index.html.
  trailingSlash: true,
  // The React version did not wrap App in React.StrictMode (see src/index.js), so Next's default of turning it on is undone here. StrictMode would run every effect twice while developing.
  reactStrictMode: false,
  // Next shows a badge in the bottom left corner while developing. It covers the mobile logo, so it is turned off.
  devIndicators: false,
  // next dev would otherwise write an AGENTS.md file into the repo.
  agentRules: false,
  // Next's own files are served from /~/_next/ instead of /_next/, so a repo named _next can never take that path on GitHub Pages. postbuild.js moves the folder to match.
  assetPrefix: phase === PHASE_PRODUCTION_BUILD ? '/~' : undefined,
  webpack(config) {
    // This is Next's rule that turns an imported image into an object like { src, width, height }.
    const imageRule = config.module.rules.find(
      (rule) => rule && rule.loader === 'next-image-loader'
    );
    config.module.rules.push(
      // This rule copies what react-scripts did for Cross.svg: the default import is the image (here Next's image object) and `ReactComponent` is the SVG as a React component, so CSS can style its .st0 fill. The SVGR options are the ones react-scripts used.
      {
        test: /\.svg$/i,
        include: /Cross\.svg$/,
        issuer: imageRule.issuer,
        dependency: imageRule.dependency,
        resourceQuery: imageRule.resourceQuery,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          { loader: imageRule.loader, options: imageRule.options },
        ],
      },
      // Next stops using its image rule for .svg files once a custom .svg rule like the one above exists. This copy of the image rule keeps every other SVG an image object, as before.
      { ...imageRule, test: /\.svg$/i, exclude: /Cross\.svg$/ }
    );
    return config;
  },
});

export default nextConfig;
