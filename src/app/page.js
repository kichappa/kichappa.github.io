import Route from '../Route.js';

// This page is new in the Next version. It replaces <Route path="/" element={<Home ... />} /> from App.js in the React version. The title used to be set only by document.title in Home.js; here it is also written into the static HTML.
export const metadata = {
  title: 'Kishore Shenoy',
};

// This component renders the same element the React version's route rendered.
export default function Page() {
  return <Route path="/" />;
}
