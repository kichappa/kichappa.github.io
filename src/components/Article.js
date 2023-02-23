import React from 'react';
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
  text,
  heading = null,
  tagline = null,
  authors = null,
  citation = null,
  id = '',
  options = {},
  tags = [],
  portrait,
}) => {
  if (!('show' in options)) {
    options.show = true;
  } else if (options.show === false) {
    return <></>;
  }
  if (!('ltr' in options)) {
    options.ltr = true;
  }
  if (!('head' in options)) {
    options.head = 2;
  }
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
    ></Images>
  );

  //   console.log({ heading, tagline, authors, options });
  //   console.log({ portrait });
  let output = [],
    leftC = [],
    rightC = [],
    imageC = [],
    contentC = [],
    key = 0;
  if (type === '2c') {
    // images column
    imageC.push(images);

    // content column
    if (heading) {
      if (options.head === 1) {
        contentC.push(
          <h1 key={key++} className="v-centre">
            {heading}
          </h1>
        );
      } else if (options.head === 2) {
        contentC.push(
          <h2 key={key++} className="v-centre">
            {heading}
          </h2>
        );
      }
    }
    if (tagline) {
      contentC.push(
        <p key={key++} className="italics tagline">
          {tagline}
        </p>
      );
    }

    if (authors) {
      contentC.push(
        <p key={key++} className="authors">
          {makeAuthors(authors)}
        </p>
      );
    }
    if (tags) {
      tags.sort();
      let pTags = [];
      for (let i in tags) {
        pTags.push(
          <span key={key++} className="tag">
            {tags[i]}
          </span>
        );
      }
      contentC.push(<p className="tagContainer">{pTags}</p>);
    }
    contentC.push(text);
    if (citation) {
      contentC.push(
        <p key={key++} className="citation">
          {makeLink(citation.title, citation.link, ['title'], null, false)}
          <br />
          <span className="authors">{citation.authors}</span>
          <br />
          {citation.journal}
        </p>
      );
    }
    if (options.ltr | portrait) {
      leftC = imageC;
      rightC = contentC;
    } else {
      leftC = contentC;
      rightC = imageC;
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
