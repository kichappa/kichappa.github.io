import React, { useEffect } from 'react';
import caricature from '../images/Caricature.svg';
import Article from './Article';

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
          <p className="italics tagline">I am Kishore Shenoy.</p>
          <p>Howdy, visitor. Let me tell you a bit about myself.</p>{' '}
          <p>
            I love math, coding, and design. I am a{' '}
            {/* <span className="tooltip-text">
              civil engineer
              <span
                className="tooltip2"
                data-tooltip="Bachelor of Technology"
              ></span>
            </span>{' '} */}
            <span className="tooltip-text">
              civil engineer
              <span className="tooltip">Bachelor of Technology</span>
            </span>{' '}
            by training and an alumnus of{' '}
            <span className="tooltip-text">
              IIT Madras
              <span className="tooltip">
                Indian Institute of Technology Madras
              </span>
            </span>
            . I believe there are two types of hobbies:{' '}
            <span className="tooltip-text">
              beyond
              <span className="tooltip">perceptive</span>
            </span>{' '}
            and{' '}
            <span className="tooltip-text">
              anterior to
              <span className="tooltip">participative</span>
            </span>{' '}
            the fourth wall. In the former, I love watching detective TV shows
            and The Office. My favourite TV show is Psych. I spend my free time
            thinking of coding silly and creative design problems as part of the
            latter.
          </p>
          <p>
            I primarily code using Python. I have a love-hate relationship with
            the scipy library. ReactJS is my go-to library for web development;
            I hate jQuery. Although I don't have much experience, I thoroughly
            enjoy WebGL and Shaders programming. I have worked on three creative
            coding projects as of now. I am currently ideating on a fourth one.
          </p>
          <p>
            I am currently applying for graduate school in computational science
            and engineering programs in the Fall '23 admission cycle. Hopefully,
            I will get into my dream school. Let me leave you with some
            afterthoughts as you finish this very discontinuous brief about
            myself.
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
