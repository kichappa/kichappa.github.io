import React, { useRef, useState } from 'react';

const Images = ({ img }) => {
  const mainImgRef = useRef(null);
  const [currentImg, setCurrentImg] = useState(0);

  const imageClicked = (e, i) => {
    // console.log({ e, i });
    setCurrentImg(i);
    // console.log(mainImgRef.current.childNodes[0].width);
    // console.log(mainImgRef.current.parentNode);
    mainImgRef.current.parentNode.scroll(
      i * mainImgRef.current.childNodes[0].width,
      0
    );
    let translate = `translateX(calc(0px - ${i} *${getComputedStyle(
      document.body
    ).getPropertyValue('--article-item-width')}))`;
    // let translate = `translateX(0px - calc(${i} * var(--article-item-width)))`;
    // console.log(translate);
    // mainImgRef.current.style.transform = translate;
  };

  let images = [],
    gallery = [];
  if (img.images.length === 1) {
    images.push(
      <img src={img.images[0][0]} className={img.type} alt={img.images[0][1]} />
    );
  } else {
    let bigImages = [],
      gImages = [];
    for (let i in img.images) {
      bigImages.push(
        <img
          src={img.images[i][0]}
          className={img.type}
          alt={img.images[i][1]}
        />
      );
      gImages.push(
        <img
          src={img.images[i][0]}
          className={i == currentImg ? 'gallery current' : 'gallery'}
          alt={img.images[i][1]}
          onClick={(e) => imageClicked(e, i)}
        />
      );
    }
    images.push(
      <>
        <div className="images-wrapper0">
          <div className="images-wrapper1" ref={mainImgRef}>
            {bigImages}
          </div>
        </div>
      </>
    );
    images.push(
      <>
        <div className="gallery-wrapper0">
          <div className="gallery-wrapper1">{gImages}</div>
        </div>
      </>
    );
  }
  return images;
};

export default Images;
