import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = 'Kishore Shenoy';
  }, []);

  return <p>Look at my photo</p>;
};

export default About;
