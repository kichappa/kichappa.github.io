import React, { useRef, useState, useEffect } from 'react';

const Images = ({ img }) => {
  const mainImgRef = useRef(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const imageLoaded = () => {
    mainImgRef.current.parentNode.scroll(0, 0);

    setImagesLoaded(imagesLoaded + 1);
  };

  const imageClicked = (e = null, i = currentImg) => {
    setCurrentImg(i);
  };
  useEffect(() => {
    mainImgRef.current.parentNode.scroll(
      currentImg * mainImgRef.current.childNodes[0].width,
      0
    );
  }, [currentImg]);

  useEffect(() => {
    imageClicked();
  }, []);

  for (let image in img.image) {
    if (img.images[image].length === 3) {
      img.images[image].push({});
    }
  }

  let images = [],
    gallery = [];
  if (img.images.length === 1) {
    images.push(
      <img
        key={img.images[0][0]}
        src={img.images[0][1]}
        className={img.type}
        alt={img.images[0][2]}
        style={img.images[0][3]}
        onLoad={imageLoaded}
      />
    );
  } else {
    let bigImages = [],
      gImages = [];
    for (let i in img.images) {
      bigImages.push(
        <img
          key={img.images[i][0]}
          src={img.images[i][1]}
          className={img.type}
          alt={img.images[i][2]}
          style={img.images[0][3]}
          onLoad={imageLoaded}
        />
      );
      gImages.push(
        <img
          key={img.images[i][0]}
          src={img.images[i][1]}
          className={i == currentImg ? 'gallery current' : 'gallery'}
          alt={img.images[i][2]}
          style={img.images[0][3]}
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
