import React, { useEffect } from 'react';
// next/link replaces react-router-dom's Link in the Next version.
import Link from 'next/link';
import { makeLink } from './Article';

const Questions = () => {
  useEffect(() => {
    document.title = 'Kishore Shenoy';
  }, []);

  return (
    <p>
      Shh! You were not supposed to see this. This page is under construction.{' '}<span className="tooltip-text">
      {/* next/link takes href instead of to, and scroll={false} keeps the scroll position, as react-router did. */}
      <Link href="/" scroll={false}>Let me show you your way out.</Link></span>
    </p>
  );
};

export default Questions;
