import React, { useEffect, useState } from 'react';
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

export const documentOnClick = (e, setIsClicked, className = 'art') => {
  if (e.target.className === className) {
    console.log('Image clicked', e);
    setIsClicked(true);
    document.getElementById('expanded-img').src = e.target.src;
  } else {
    console.log('Other than image clicked', e);
    setIsClicked(false);
  }
};

const Artworks = ({ mobile }) => {
  // This variable keeps track of how many images are loaded to client.
  // It is not a state variable since each time the component loads, the images might reload.
  let howManyImagesLoaded = 0;
  // Sets if the images need to be visible.
  const [isVisible, setIsVisible] = useState(false);
  // This state stores the order of the images to be displayed.
  const [order, setOrder] = useState(false);
  // This is the DOM output that is used in return.
  const [output, setOutput] = useState(<></>);
  // This variable keeps track whether an image is clicked.
  const [isClicked, setIsClicked] = useState(false);
  // This state variable is the html DOM that stores the images.
  // The widthRatio is the ratio of image width to total screen width / divisions.
  // Divisions are total width/(300/3), 300 is the "unit width" for an image, 3 is the resolution of calculation.
  const [artworks, setArtworks] = useState([
    // art_0,
    { src: art_8, widthRatio: 1 },
    { src: art_3, widthRatio: 1 },
    { src: art_4, widthRatio: 1 },
    { src: art_9, widthRatio: 1 },
    { src: art_5, widthRatio: 1 },
    { src: art_7, widthRatio: 1 },
    { src: art_13, widthRatio: 1 },
    { src: art_17, widthRatio: 1 },
    { src: art_20, widthRatio: 1 },
    { src: art_19, widthRatio: 1 },
    { src: art_11, widthRatio: 1 },
    { src: art_18, widthRatio: 1 },
    { src: art_15, widthRatio: 1 },
    { src: art_1, widthRatio: 1 },
    { src: art_2, widthRatio: 1 },
    { src: art_6, widthRatio: 1 },
    { src: art_10, widthRatio: 1 },
    { src: art_12, widthRatio: 1 },
    // { src: art_14, widthRatio: 1 },
    // {src:art_16, widthRatio:1},
    { src: art_21, widthRatio: 1 },
    { src: art_22, widthRatio: 1 },
    { src: art_23, widthRatio: 1 },
  ]);

  // This useEffect is added to handle first time render, add resize listener, set ouptut and other (obv) stuff?
  useEffect(() => {
    document.title = 'My artworks';
    // This is made just to ensure that the images become visible.
    // setOutput([...getOutput(order)]);

    function handleResize() {
      setDivision(getDivision());
      setOrder(rearrangeImgs());
    }
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', (e) => documentOnClick(e, setIsClicked));
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', (e) =>
        documentOnClick(e, setIsClicked)
      );
    };
  }, []);

  // This useEffect rerenders the DOM once new order is calculated.
  useEffect(() => {
    console.log('Order or isVisible state is changed');
    setOutput([...getOutput(order)]);
  }, [order, isVisible]);

  // Divisions are total width/(300/3), 300 is the "unit width" for an image, 3 is the resolution of calculation.
  const getDivision = (weightRatio = false, width = 0) => {
    if (!weightRatio) {
      try {
        if (mobile)
          return Math.floor(
            (document.getElementsByClassName('art-gallery')[0].offsetWidth -
              20) / //20px for any "inaccuracies"
              (100 / 3)
          );
        else
          return Math.floor(
            (document.getElementsByClassName('art-gallery')[0].offsetWidth -
              20) / //20px for any "inaccuracies"
              (300 / 3)
          );
      } catch {
        return 1;
      }
    } else {
      if (mobile) return Math.ceil(width / (100 / 3));
      else return Math.ceil(width / (300 / 3));
    }
  };

  const [division, setDivision] = useState(getDivision());

  // This functions hides all the images until the images are all loaded.
  // It also calls the order calculator after all images get loaded.
  const imgOnLoad = (e, i) => {
    let newArtworks = [...artworks];
    howManyImagesLoaded++;
    newArtworks[i].widthRatio = getDivision(true, e.target.offsetWidth);
    newArtworks[i].target = e.target;
    setArtworks([...newArtworks]);
    if (howManyImagesLoaded === artworks.length) {
      setDivision(getDivision());
      console.log('All images loaded');
      setIsVisible(true);
      setOrder(rearrangeImgs());
    }
  };

  // This is the order calculator's math function.
  // It is a dynamic programming implementation of subset-sum problem.
  const subsetSum = (set, sum) => {
    // dp[i][j] is true if sum j can be formed out of first i numbers of `set`
    let dp = Array.from({ length: set.length + 1 }, () =>
      Array.from({ length: sum + 1 }, () => false)
    );
    dp[0][0] = true;
    let i = 1;
    outer: for (; i < set.length + 1; i++) {
      for (let j = 0; j < sum + 1; j++) {
        try {
          if (dp[i - 1][j]) {
            dp[i][j] = true;
          } else if ((j - set[i - 1] >= 0) & dp[i - 1][j - set[i - 1]]) {
            dp[i][j] = true;
          }
        } catch {
          console.log(
            '############## Some Error Occured here ##################'
          );
          console.log(i, j);
        }
        // If a perfect sum occurs, break the loop as we have achieved the goal.
        if ((j === sum) & dp[i][j]) {
          break outer;
        }
      }
    }
    // Searching what is the maximum sum that was attained.
    for (let j = sum; j > 0; j--) {
      // find dp[??][j (counts down from sum to lower)]==true
      let i_temp = dp.findIndex((obj) => obj[j]);
      if (i_temp !== -1) {
        i = i_temp;
        sum = j;
        break;
      }
    }

    // Indices of elements in `sum` that give this maximum sum.
    let sumIndices = [];
    for (
      // Just creating a copy variable just in case the variable gets passed by reference (! am I stupid ? Yes)
      let sumCount = sum;
      (i > 0) & (sumCount > 0);
      //Next sum is current sum-current element. Find i that matches this (dp[??][nextsum]).
      sumCount = sumCount - set[i - 1], i = dp.findIndex((obj) => obj[sumCount])
    ) {
      sumIndices.push(i - 1);
    }
    return sumIndices.reverse();
  };

  const nextFitAlgo = (set, sum, sort = false) => {
    console.log('Next-Fit Algorithm is being called.');
    let done = [];

    // sorted nextFitAlgo?
    if (sort) set.sort((a, b) => b - a);

    // Until everyelement is included in the calculation, keep running to find largest total width for that row.
    while (done.length < set.length) {
      // aim for total width = sum = division. Numbers that are possible are widthRatios.
      let longestCombination = subsetSum(set, sum);
      done.push(...longestCombination);
      // Once an element is added to width, it shouldn't be included in further width calculation.
      // So set width to target width + 1.
      set = set.map((obj, index) => {
        if (done.includes(index)) {
          obj = sum + 1;
        }
        return obj;
      });
    }
    return done;
  };

  //This functions rearranges the images by attempting to reduce the number of rows.
  const rearrangeImgs = () => {
    let division = getDivision();
    let widthRatios = [];
    // calculate widthRatios just in case artwork values are not stored.
    for (let art in artworks) {
      art = parseInt(art);
      widthRatios.push(getDivision(true, artworks[art].target.offsetWidth));
    }
    let done = nextFitAlgo(widthRatios, division);
    return done;
  };

  // This function accepts order of images and returns the img html on that order.
  // If order is omitted, it will not reorder but use the order from artworks' definition.
  const getOutput = (order = false) => {
    console.log('getOutput is being called');

    let output = [],
      list;
    if (order == false) {
      // If no order is specified, order it as 1, 2, 3, 4, 5...
      list = Array.from({ length: artworks.length }, (_, i) => i);
      console.log('No order');
    } else {
      list = order;
      console.log('Order exists');
    }
    for (let art in list) {
      art = list[art];
      output.push(
        <>
          <img
            className="art"
            style={isVisible ? {} : { visibility: 'true' }}
            src={artworks[art].src}
            alt=""
            onLoad={(e) => imgOnLoad(e, art)}
          />
        </>
      );
    }
    return output;
  };

  return (
    <>
      <div className="flex">
        <div style={{ display: 'block', marginLeft: '-50px' }}>
          <h2>These are my artworks</h2>
          <p>All are digital sketches.</p>
        </div>
      </div>
      <div
        id="expanded-wrapper1"
        onClick={null}
        style={
          isClicked
            ? {
                visibility: 'visible',
                opacity: 1,
                height: `${window.innerHeight}px`,
              }
            : { height: `${window.innerHeight}px` }
        }
      >
        <img
          id="expanded-img"
          src=""
          style={isClicked ? { visibility: 'visible', opacity: 1 } : {}}
        />
      </div>
      <div className="flex art-gallery">
        {output}
        <li></li>
      </div>
    </>
  );
};

export default Artworks;
