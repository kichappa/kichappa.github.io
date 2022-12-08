import React from 'react';

const Article = ({
  type,
  img,
  text,
  heading = null,
  tagline = null,
  authors = null,
  citation = null,
  options = {},
  portrait,
}) => {
  if (!('ltr' in options)) {
    options.ltr = true;
  }
  if (!('head' in options)) {
    options.head = 2;
  }
  //   console.log({ heading, tagline, authors, options });
  //   console.log({ portrait });
  let output = [],
    leftC = [],
    rightC = [],
    key = 0;
  if (type === '2c') {
    if (options.ltr | portrait) {
      //   console.log('here');
      leftC.push(img);
      if (heading) {
        if (options.head === 1) {
          rightC.push(
            <h1 key={key++} className="centre">
              {heading}
            </h1>
          );
        } else if (options.head === 2) {
          rightC.push(
            <h2 key={key++} className="centre">
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
            {authors}
          </p>
        );
      }
      rightC.push(text);
      if (citation) {
        rightC.push(
          <p key={key++} className="citation">
            <a
              href={citation.link}
              target="_blank"
              className="title tooltip-text"
            >
              {citation.title}
              <span className="tooltip">Go to website</span>
            </a>
            <br />
            <span className="authors">{citation.authors}</span>
            <br />
            {citation.journal}
          </p>
        );
      }
    } else {
      //   console.log('there');
      rightC.push(img);
      if (heading) {
        if (options.head === 1) {
          leftC.push(
            <h1 key={key++} className="centre">
              {heading}
            </h1>
          );
        } else if (options.head === 2) {
          leftC.push(
            <h2 key={key++} className="centre">
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
      <div className="flex article centre">
        <div className="article-item">{leftC}</div>
        <div className="article-item">{rightC}</div>
      </div>
    );
  }

  return output;
};
export default Article;
