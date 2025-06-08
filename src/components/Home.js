import React, { useEffect } from 'react';
import caricature from '../images/Caricature.svg';
import Article from './Article';
import { makeLink } from './Article';

const Home = ({ portrait }) => {
  useEffect(() => {
    document.title = 'Kishore Shenoy';
  }, []);

  return (
    <>
      <div className="flex article">
        <img src={caricature} id="caricature" alt="logo" />
        <div className="home-article">
          <h1 className="centre">Hello World!</h1>
          <p className="italics tagline">I am Kishore Shenoy</p>
          <p>Howdy, visitor. Let me tell you a bit about myself.</p>{' '}
          <p>
            I love math, coding, design and art. I am a{' '}
            {/* <span className="tooltip-text">
              civil engineer
              <span
                className="tooltip2"
                data-tooltip="Bachelor of Technology"
              ></span>
            </span>{' '} */}
            <span className="tooltip-text">
              CSE
              <span className="tooltip">
                Computational Science and Engineering
              </span>
            </span>{' '}
            doctoral student at Georgia Tech and an alumnus of{' '}
            <span className="tooltip-text">
              IIT Madras
              <span className="tooltip">
                Indian Institute of Technology Madras
              </span>
            </span>
            . I believe there are two types of hobbies:{' '}
            <span className="tooltip-text">
              within
              <span className="tooltip">participative</span>
            </span>{' '}
            and{' '}
            <span className="tooltip-text">
              beyond
              <span className="tooltip">perceptive</span>
            </span>{' '}
            the fourth wall. I spend my free time thinking of coding silly yet
            creative design problems as part of the former and love watching
            detective TV shows and The Office as a part of the latter. My
            favorite TV show is Psych (please watch it).
          </p>
          <p>
            I primarily code using Julia (yes, my new bestie). I used to love
            python but not anymore. ReactJS is my go-to library for web
            development; I hate jQuery, we are not friends if you don't too.
            And, let's not forget my thorough joy with WebGL and shaders. You
            will see me try and force use the GPU for every single thing. I have
            worked on three creative coding projects to date and am currently
            ideating on a{' '}
            <span className="tooltip-text">
              fourth one
              <span className="tooltip">(yes, still)</span>
            </span>{' '}
            .
          </p>
          <p>
            My research focuses on using a combination of biomimicry,
            manufacturing and computation, and is advised by{' '}
            {makeLink(
              'Dr. Emily Sanders',
              'https://www.me.gatech.edu/faculty/sanders',
              [],
              'Go to her website'
            )}{' '}
            homed in the Woodruff School of Mechanical Engineering. I am excited!
            Let me leave you with some afterthoughts as you finish this very
            discontinuous brief about myself.
          </p>
          <p className="last">
            How do shapes affect the function of buildings? What are our limits
            as engineers? Can Python play GeoGuessr? I like to explore such
            questions, questions that deal with computation and design. My
            skills in engineering and my creative outlook help me work on
            bridging design and engineering.
          </p>
        </div>
      </div>

      {/* <div className="flex">
        <div className="seperator"></div>
      </div> */}
    </>
  );
};

export default Home;
