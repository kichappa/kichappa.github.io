import React, { useEffect } from 'react';

const Questions = () => {
  useEffect(() => {
    document.title = 'Kishore Shenoy';
  }, []);

  return <p>Here are my questions</p>;
};

export default Questions;
