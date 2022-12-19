import React, { useEffect, useState } from 'react';
import { makeAuthors, makeLink } from './Article';
import caricature from '../images/Me -mc copy.png';
import linkedin from '../images/icons/linkedin.svg';
import github from '../images/icons/github.svg';

const About = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (e) => {
    console.log(e.target.parentNode.parentNode, e.target.offsetWidth);
    e.target.parentNode.parentNode.scroll(e.target.offsetWidth + 20, 0);
    let iframe = document.getElementsById('hidden_iframe');
    iframe.addEventListener('load', () => {
      // Check for the presence of the CAPTCHA element
      if (iframe.contentDocument.querySelector('.g-recaptcha')) {
        iframe.style.display = true;
        iframe.style.height = 50;
        iframe.contentDocument
          .querySelector('.g-recaptcha')
          .scrollIntoView({ behavior: 'auto', alignToTop: true });
      } else {
        console.log(
          'No CAPTCHA challenge is required for this form submission.'
        );
      }
    });
  };

  useEffect(() => {
    document.title = 'Kishore Shenoy';
  }, []);

  return (
    <>
      <div className="flex article">
        <div
          className="flex article-item"
          style={{ flexDirection: 'column', alignItems: 'center' }}
        >
          <h2 style={{ width: '100%', marginBottom: '10px' }}>
            Links are here...
          </h2>
          <img src={caricature} id="thisisme" alt="logo" />
          <p style={{ marginBottom: '30px' }}>This is me!</p>
          <div>
            <h3>
              Download my resume{' '}
              {makeLink('here.', '/files/resume.pdf', [], 'Open PDF')}
              <br />
              See my print friendly portfolios{' '}
              {makeLink(
                'here.',
                'https://kichappa.github.io/portfolio',
                [],
                'Open portfolios'
              )}
            </h3>
          </div>
          <div className="icons-wrapper">
            <a
              href="https://www.linkedin.com/in/kishoreshenoy/"
              style={{ color: '#cddd51' }}
              target="_blank"
            >
              <svg className="icon">
                <use href={linkedin + '#img'}></use>
              </svg>
            </a>
            <a
              href="https://github.com/kichappa"
              style={{ color: '#cddd51' }}
              target="_blank"
            >
              <svg className="icon">
                <use href={github + '#img'}></use>
              </svg>
            </a>
          </div>
        </div>
        <div className="article-item" id="contact">
          <h2>Contact me here...</h2>

          <>
            <div className="images-wrapper0 form-wrapper0">
              <div
                className={
                  formSubmitted
                    ? 'images-wrapper1 form-wrapper1 submitted'
                    : 'images-wrapper1 form-wrapper1'
                }
              >
                {/* <form
                  id="fs-frm"
                  name="simple-contact-form"
                  accept-charset="utf-8"
                  action="https://formspree.io/f/xpzeapbp"
                  method="post"
                  onSubmit={handleSubmit}
                  target="hidden_iframe"
                >
                  <input type="hidden" name="_next" value="" />
                  <fieldset id="fs-frm-inputs">
                    <p>
                      I know that having a form is discouraging, but I promise
                      you I will check your message and reply back! It's just
                      that I don't want to expose my email on a public domain.
                    </p>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Bruton Gaster"
                      required=""
                    />
                    <label htmlFor="email-address">Email Address</label>
                    <input
                      type="email"
                      name="_replyto"
                      id="email-address"
                      placeholder="bud@thecosby.show"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      required=""
                    />
                    <label htmlFor="message">Message</label>
                    <textarea
                      rows="5"
                      name="message"
                      id="message"
                      placeholder="My father was called Mary, his father before him was called Mary and his father before him was called Craig."
                      required=""
                    ></textarea>
                    <input
                      type="hidden"
                      name="_subject"
                      id="email-subject"
                      value="Contact Form Submission"
                    />
                  </fieldset>
                  <input type="submit" value="Submit" />
                </form> */}
                <form
                  id="fs-frm"
                  name="fs-frm"
                  acceptCharset="utf-8"
                  encType="text/plain"
                  action="https://docs.google.com/forms/d/e/1FAIpQLScYIU5jEGsiwUvZp0QGKfI1ZyWzD0lx6JsO4XqBZzmba4luDQ/formResponse?"
                  target="hidden_iframe"
                  onSubmit={() => {
                    handleSubmit();
                    return 'submitted = true;';
                  }}
                >
                  <fieldset id="fs-frm-inputs">
                    <p>
                      I know that having a form is discouraging, but I promise
                      you I will check your message and reply back! It's just
                      that I don't want to expose my email on a public domain.
                    </p>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="entry.57080146"
                      id="name"
                      placeholder="Bruton Gaster"
                      required=""
                    />
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      name="entry.560788154"
                      id="email"
                      placeholder="bud@thecosby.show"
                      required=""
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    />
                    <label htmlFor="message">Message</label>
                    <textarea
                      rows="5"
                      type="text"
                      name="entry.132408585"
                      id="message"
                      placeholder="My father was called Mary, his father before him was called Mary and his father before him was called Craig."
                      required=""
                    ></textarea>
                  </fieldset>
                  <input type="submit" value="Submit" />
                </form>
                <div className="thankyou">
                  <iframe
                    name="hidden_iframe"
                    id="hidden_iframe"
                    style={{ width: '100%', height: 0, display: 'none' }}
                    // style="display:none;"
                    onLoad="if(submitted) {}"
                  ></iframe>
                  <p>
                    Heyyo, I got your message. I will reply as soon as possible!
                  </p>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default About;
