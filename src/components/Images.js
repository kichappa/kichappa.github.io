import React, { useRef, useState, useEffect } from 'react';

const Images = ({ img }) => {
  const mainImgRef = useRef(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const getImageDom = (img, type, options = {}) => {
    options = {
      ...{
        className: false,
        onClick: () => {},
        onLoad: () => {},
      },
      ...options,
    };
    // console.log(img, type, options.className, options.onLoad, options.onClick);
    return (
      <>
        <img
          key={img[0]}
          src={img[1]}
          className={options.className ? options.className : type}
          alt={img[2]}
          style={img[3]}
          onClick={options.onClick}
          onLoad={options.onLoad}
        />
      </>
    );
  };

  const imageLoaded = () => {
    mainImgRef.current.parentNode.scroll(0, 0);

    setImagesLoaded(imagesLoaded + 1);
  };

  const imageClicked = (e = null, i = currentImg) => {
    setCurrentImg(i);
  };
  useEffect(() => {
    mainImgRef.current.parentNode.scroll(
      currentImg * mainImgRef.current.childNodes[0].offsetWidth,
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
    gallery = [],
    bigImages = [],
    gImages = [];

  for (let i in img.images) {
    bigImages.push(
      <div className="big-picture-wrapper">
        {getImageDom(img.images[i], img.type, { onLoad: imageLoaded })}
        <p style={{ marginLeft: '5px', marginRight: '5px' }}>
          {img.images[i][2]}
        </p>
      </div>
    );
    gImages.push(
      getImageDom(img.images[i], img.type, {
        className: i == currentImg ? 'gallery current' : 'gallery',
        onClick: (e) => imageClicked(e, i),
      })
    );
  }
  if (img.images.length === 1) {
    images = bigImages;
  } else {
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
