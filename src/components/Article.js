import React from 'react';
import Images from './Images';
import shortid from 'shortid';
// useHydrated is new in the Next version (see src/useHydrated.js).
import useHydrated from '../useHydrated.js';
// This function returns a link that opens in a new tab and shows a tooltip on hover. By default the link takes its font from the text around it.
export const makeLink = (
  text,
  link,
  text_classes = [],
  tooltip = null,
  inherit = true
) => {
  // This loop joins the extra classes into one string.
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

// This function returns the 'by' line of an article. Each author is [name] or [name, link], and authors with a link become links.
export const makeAuthors = (authors, text_classes) => {
  let output = [];
  output.push(
    <>
      by
      <br />
    </>
  );

  // This loop adds each author, then a comma, or a full stop after the last one.
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

// This component draws one project article: an image gallery in one column and the heading, tags, text and citation in the other. options can hide the article (show), put the images on the right (ltr) and pick the heading size (head).
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
  // This is new in the Next version. It is false until React has hydrated the server HTML. It is read before the early return below because hooks must always run.
  const hydrated = useHydrated();
  // These checks fill in the default options, and draw nothing when the article is hidden.
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
  // This variable holds the gallery. Each image gets a short random id in front, which Images uses as its key.
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
  // These variables hold the result, the left and right columns, and the image and content columns before they are placed. key numbers the content elements.
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
    // This block adds the article's tags in alphabetical order.
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
    // This block adds the citation, with the title as a link.
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
    // This check puts the images on the left when the article is left-to-right or the window is portrait, and on the right otherwise.
    // In the Next version portrait is only used after hydration, because the server cannot know the shape of the window. Until then the article is drawn in its landscape order, and before-hydration.css moves the images first in portrait windows.
    if (options.ltr | (hydrated && portrait)) {
      leftC = imageC;
      rightC = contentC;
    } else {
      leftC = contentC;
      rightC = imageC;
    }
    // console.log({ leftC, rightC });

    // In the Next version the data-before-hydration mark tells before-hydration.css which articles have their text first.
    output = (
      <div
        className="flex article v-centre"
        id={id}
        data-before-hydration={hydrated || options.ltr ? undefined : 'rtl'}
      >
        {/* In the Next version the two columns have keys. When hydration turns a portrait article images-first, React then moves the columns instead of rebuilding them; rebuilding would restart MathJax and its first typeset would fail on the removed nodes. */}
        <div
          className="article-item"
          key={leftC === imageC ? 'images' : 'content'}
        >
          {leftC}
        </div>
        <div
          className="article-item"
          key={rightC === imageC ? 'images' : 'content'}
        >
          {rightC}
        </div>
      </div>
    );
  }

  return output;
};
export default Article;
// export makeAuthors;
