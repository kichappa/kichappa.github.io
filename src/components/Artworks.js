import React, { useEffect } from 'react';
import art_0 from '../images/Art/Caricature copy.png';
import art_1 from '../images/Art/Caricature.png';
import art_2 from '../images/Art/Egg of the Noon copy.png';
import art_3 from '../images/Art/Ellipticapsicum copy.png';
import art_4 from '../images/Art/Elon Profile copy.png';
import art_5 from '../images/Art/Geometry Books copy.png';
import art_6 from '../images/Art/Hand holding object copy.png';
import art_7 from '../images/Art/Japanese Art copy.png';
import art_8 from '../images/Art/Master Copy -mc copy.png';
import art_9 from '../images/Art/Me -mc copy.png';
import art_10 from '../images/Art/Minus Chakra  copy.png';
import art_11 from '../images/Art/My hand copy.png';
import art_12 from '../images/Art/My Room copy.png';
import art_13 from '../images/Art/NOKIA small copy.png';
import art_14 from '../images/Art/Palm Contour copy.png';
import art_15 from '../images/Art/Sporty copy.png';
import art_16 from '../images/Art/Spray copy.png';
import art_17 from '../images/Art/Stravinsky by Picasso by Me copy.png';
import art_18 from '../images/Art/The Negative Orchid copy.png';
import art_19 from '../images/Art/The Pretentious Denis - Inverted copy.png';
import art_20 from '../images/Art/The Pretentious Denis copy.png';
import art_21 from '../images/Art/The Symmetric Vase copy.png';
import art_22 from '../images/Art/The Unsymmetric Vase copy.png';
import art_23 from '../images/Art/Warped Flowers copy.png';

const Artworks = () => {
  useEffect(() => {
    document.title = 'My artworks';
  }, []);
  let artworks = [
    // art_0,
    art_3,
    art_4,
    art_8,
    art_9,
    art_5,
    art_7,
    art_13,
    art_17,
    art_20,
    art_19,
    art_11,
    art_18,
    art_15,
    art_1,
    art_2,
    art_6,
    art_10,
    art_12,
    art_14,
    // art_16,
    art_21,
    art_22,
    art_23,
  ];
  let output = [];

  for (let art in artworks) {
    output.push(
      <>
        <img className="art" src={artworks[art]} alt="" />
      </>
    );
  }

  return (
    <>
      <div className="flex">
        <div style={{ display: 'block', marginLeft: '-50px' }}>
          <h2>These are my artworks</h2>
          <p>All are digital sketches.</p>
        </div>
      </div>

      <div className="flex art-gallery">{output}</div>
    </>
  );
};

export default Artworks;
