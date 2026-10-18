import React, { useRef, useState, useEffect } from 'react';

// This component draws an article's gallery: the big images in a sideways scrolling strip and, when there is more than one, a row of thumbnails under it. Each image is [id, src, caption, style].
const Images = ({ img }) => {
  // This ref points to the strip of big images.
  const mainImgRef = useRef(null);
  // This state stores which image is shown in the strip.
  const [currentImg, setCurrentImg] = useState(0);
  // This state counts the big images that have loaded. Nothing reads it.
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // This function returns one <img> for an image, with the given class and click and load handlers.
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
        {/* Next imports images as objects, so the URL is in .src in the Next version. */}
        <img
          key={img[0]}
          src={img[1].src}
          className={options.className ? options.className : type}
          alt={img[2]}
          style={img[3]}
          onClick={options.onClick}
          onLoad={options.onLoad}
        />
      </>
    );
  };

  // This function runs when a big image loads. It scrolls the strip back to the start and counts the image.
  const imageLoaded = () => {
    mainImgRef.current.parentNode.scroll(0, 0);

    setImagesLoaded(imagesLoaded + 1);
  };

  // This function shows image i in the strip.
  const imageClicked = (e = null, i = currentImg) => {
    setCurrentImg(i);
  };
  // This useEffect scrolls the strip to the current image whenever it changes.
  useEffect(() => {
    mainImgRef.current.parentNode.scroll(
      currentImg * mainImgRef.current.childNodes[0].offsetWidth,
      0
    );
  }, [currentImg]);

  // This useEffect shows the first image when the gallery appears.
  useEffect(() => {
    imageClicked();
  }, []);

  // This loop is meant to give each image an empty style when it has none. It reads img.image, which does not exist, so it never runs.
  for (let image in img.image) {
    if (img.images[image].length === 3) {
      img.images[image].push({});
    }
  }

  // These variables hold the result, the big images and the thumbnails. gallery is not used.
  let images = [],
    gallery = [],
    bigImages = [],
    gImages = [];

  // This loop makes a big image with its caption and a thumbnail for each image. The thumbnail of the current image is highlighted.
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
  // This check shows a single image on its own, and several images as a strip with thumbnails.
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
