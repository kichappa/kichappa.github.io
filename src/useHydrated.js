import { useSyncExternalStore } from 'react';

// This file is new in the Next version. The server cannot know the shape of the window or whether it is a phone, so until React has hydrated the server HTML, the components draw a version that fits every screen and src/before-hydration.css picks the right parts. This hook tells them which phase they are in.

// This function would subscribe to changes, but the value below only changes once, at hydration, which React handles by itself.
const subscribe = () => () => {};

// This hook returns false on the server and while React hydrates the server HTML, and true after that. A component that mounts later, after a click on a link, gets true straight away.
const useHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

export default useHydrated;
