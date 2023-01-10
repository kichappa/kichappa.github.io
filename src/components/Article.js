import React, { useEffect } from 'react';
import Images from './Images';
import shortid from 'shortid';
export const makeLink = (
  text,
  link,
  text_classes = [],
  tooltip = null,
  inherit = true
) => {
  let classes = '';
  for (let i in text_classes) {
    classes += text_classes[i] + ' ';
  }
  return (
    <a
      href={link}
      className={classes + 'tooltip-text'}
      target="_blank"
      style={
        inherit
          ? {
              fontFamily: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
            }
          : {}
      }
    >
      {text}
      <span className="tooltip">{tooltip ? tooltip : 'Go to website'}</span>
    </a>
  );
};

export const makeAuthors = (authors, text_classes) => {
  let output = [];
  output.push(
    <>
      by
      <br />
    </>
  );

  for (let i in authors) {
    if (authors[i].length === 1) {
      output.push(<>{authors[i][0]}</>);
    } else if (authors[i].length === 2) {
      output.push(<>{makeLink(authors[i][0], authors[i][1], text_classes)}</>);
    }
    if (i == authors.length - 1) {
      output.push(<>.</>);
    } else {
      output.push(<>, </>);
    }
  }

  return output;
};

const Article = ({
  type,
  img,
  currentImgState,
  text,
  heading = null,
  tagline = null,
  authors = null,
  citation = null,
  id = '',
  options = {},
  portrait,
}) => {
  if (!('ltr' in options)) {
    options.ltr = true;
  }
  if (!('head' in options)) {
    options.head = 2;
  }
  // console.log({ ...currentImgState, id: id });
  let images = (
    <Images
      key={shortid.generate().substring(0, 6)}
      img={{
        ...img,
        images: img.images.map((obj) => [
          shortid.generate().substring(0, 6),
          ...obj,
        ]),
      }}
      currentImgState={{ ...currentImgState, id: id }}
    ></Images>
  );

  //   console.log({ heading, tagline, authors, options });
  //   console.log({ portrait });
  let output = [],
    leftC = [],
    rightC = [],
    key = 0;
  useEffect(() => {
    currentImgState.modifier(id, 0, true);
  }, []);
  if (type === '2c') {
    if (options.ltr | portrait) {
      //   console.log('here');
      leftC.push(images);
      if (heading) {
        if (options.head === 1) {
          rightC.push(
            <h1 key={key++} className="v-centre">
              {heading}
            </h1>
          );
        } else if (options.head === 2) {
          rightC.push(
            <h2 key={key++} className="v-centre">
              {heading}
            </h2>
          );
        }
      }
      if (tagline) {
        rightC.push(
          <p key={key++} className="italics tagline">
            {tagline}
          </p>
        );
      }
      if (authors) {
        rightC.push(
          <p key={key++} className="authors">
            {makeAuthors(authors)}
          </p>
        );
      }
      rightC.push(text);
      if (citation) {
        rightC.push(
          <p key={key++} className="citation">
            {makeLink(citation.title, citation.link, ['title'], null, false)}
            <br />
            <span className="authors">{citation.authors}</span>
            <br />
            {citation.journal}
          </p>
        );
      }
    } else {
      //   console.log('there');
      rightC.push(images);
      if (heading) {
        if (options.head === 1) {
          leftC.push(
            <h1 key={key++} className="v-centre">
              {heading}
            </h1>
          );
        } else if (options.head === 2) {
          leftC.push(
            <h2 key={key++} className="v-centre">
              {heading}
            </h2>
          );
        }
      }
      if (tagline) {
        leftC.push(
          <p key={key++} className="italics tagline">
            {tagline}
          </p>
        );
      }
      if (authors) {
        leftC.push(
          <p key={key++} className="authors">
            {authors}
          </p>
        );
      }
      leftC.push(text);
    }
    // console.log({ leftC, rightC });

    output = (
      <div className="flex article v-centre" id={id}>
        <div className="article-item">{leftC}</div>
        <div className="article-item">{rightC}</div>
      </div>
    );
  }

  return output;
};
export default Article;
// export makeAuthors;
