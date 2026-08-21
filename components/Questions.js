import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeLink } from './Article';

const Questions = () => {
  useEffect(() => {
    document.title = 'Kishore Shenoy';
  }, []);

  return (
    <p>
      Shh! You were not supposed to see this. This page is under construction.{' '}<span className="tooltip-text">
      <Link to="/">Let me show you your way out.</Link></span>
    </p>
  );
};

export default Questions;
