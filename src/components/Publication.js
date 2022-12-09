import React from 'react';
import Images from './Images';
const makeLink = (text, link, text_classes = []) => {
  let classes = '';
  for (let i in text_classes) {
    classes += text_classes[i] + ' ';
  }
  return (
    <a href={link} className={classes + 'tooltip-text'} target="_blank">
      {text}
      <span className="tooltip">Go to website</span>
    </a>
  );
};

const Publication = ({
  type,
  year,
  link,
  title,
  journal,
  authors,
  id = '',
  portrait,
}) => {
  //   console.log({ heading, tagline, authors, options });
  //   console.log({ portrait });
  let output = [];

  output = (
    <div className="article v-centre half-margin full" id={id}>
      {/* <div className="full h-centre"> */}
      <p className="citation zero-margin">
        {year}
        <br />
        {makeLink(title, link, ['title'])}
        <br />
        <span
          style={{
            fontWeight: 200,
            textTransform: 'uppercase',
            fontSize: 12,
            fontFamily: 'var(--head-font)',
          }}
        >
          {type}
        </span>
        <br />
        <span className="authors">{authors}</span>
        <br />
        {journal}
      </p>
      {/* </div> */}
    </div>
  );

  return output;
};
export default Publication;
