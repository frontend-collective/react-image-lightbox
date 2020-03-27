import React, { Component } from 'react';
import Lightbox from '../../src';
// import Lightbox from 'react-image-lightbox';
// In your own app, you would need to use import styles once in the app
// import 'react-image-lightbox/styles.css';
import './stylesheets/vendor/stylesheet.css';
import './stylesheets/vendor/github-light.css';
import './stylesheets/app.css';
import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';
import image4 from './images/4.jpg';
import image1Thumb from './images/1_thumb.jpg';
import image2Thumb from './images/2_thumb.jpg';
import image3Thumb from './images/3_thumb.jpg';
import image4Thumb from './images/4_thumb.jpg';

const images = [image1, image2, image3, image4];
const thumbs = [image1Thumb, image2Thumb, image3Thumb, image4Thumb];

const titles = [
  '',
  <span>
    by&nbsp;
    <a className="creditLink" href="http://flickr.com/photos/titrans/">
      quatre mains
    </a>
    &nbsp; (
    <a
      className="creditLink"
      href="http://creativecommons.org/licenses/by/2.0/"
      title="Attribution License"
    >
      Some rights reserved
    </a>
    )
  </span>,
  <span>
    by&nbsp;
    <a className="creditLink" href="http://flickr.com/photos/lachlanrogers/">
      latch.r
    </a>
    &nbsp; (
    <a
      className="creditLink"
      href="http://creativecommons.org/licenses/by-sa/2.0/"
      title="Attribution-ShareAlike License"
    >
      Some rights reserved
    </a>
    )
  </span>,
  <span>
    by&nbsp;
    <a className="creditLink" href="http://flickr.com/photos/fazen/">
      fazen
    </a>
    &nbsp; (
    <a
      className="creditLink"
      href="http://creativecommons.org/licenses/by/2.0/"
      title="Attribution License"
    >
      Some rights reserved
    </a>
    )
  </span>,
];

const captions = [
  'Cat in the snow',
  '',
  <p>
    .. not in the&nbsp;
    <em>mood</em>
    &nbsp;for games right now
    <br />
    ...
    <br />
    ...
    <br />
    ...
    <br />
    ...
    <br />
    ...
    <br />
    ...
    <br />
    C&#39;mon. Seriously.
  </p>,
  '',
];

class App extends Component {
  static onImageLoadError(imageSrc, _srcType, errorEvent) {
    console.error(`Could not load image at ${imageSrc}`, errorEvent); // eslint-disable-line no-console
  }

  constructor() {
    super();

    this.state = {
      index: 0,
      isOpen: false,
    };

    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.moveNext = this.moveNext.bind(this);
    this.movePrev = this.movePrev.bind(this);
  }

  openLightbox() {
    this.setState({ isOpen: true });
  }

  closeLightbox() {
    this.setState({ isOpen: false });
  }

  moveNext() {
    this.setState(prevState => ({
      index: (prevState.index + 1) % images.length,
    }));
  }

  movePrev() {
    this.setState(prevState => ({
      index: (prevState.index + images.length - 1) % images.length,
    }));
  }

  render() {
    let lightbox;
    if (this.state.isOpen) {
      lightbox = (
        <Lightbox
          mainSrc={images[0]}
          onCloseRequest={this.closeLightbox}
          enableRotate={true}
        />
      );
    }

    return (
      <div>
        <section className="page-header">
          <h1 className="project-name">React Image Lightbox</h1>

          <h2 className="project-tagline">
            Flexible lightbox component for displaying images with React
          </h2>
        </section>

        <section className="main-content">
          <h2>Demo</h2>

          <div>
            <button
              type="button"
              id="open-lightbox"
              className="demoButton"
              onClick={this.openLightbox}
            >
              Open Lightbox
            </button>
            {lightbox}
          </div>

          <h2>Features</h2>
          <ul>
            <li>Keyboard shortcuts (with rate limiting)</li>
            <li>Image Zoom</li>
            <li>Flexible rendering using src values assigned on the fly</li>
            <li>Image preloading for smoother viewing</li>
            <li>
              Mobile friendly, with pinch to zoom and swipe (Thanks,{' '}
              <a href="https://github.com/webcarrot">@webcarrot</a>
              !)
            </li>
            <li>No external CSS</li>
          </ul>

          <a href="https://github.com/frontend-collective/react-image-lightbox">
            Examples and Documentation on Github
          </a>

          <footer className="site-footer">
            <span className="site-footer-owner">
              <a href="https://github.com/frontend-collective/react-image-lightbox">
                React Image Lightbox
              </a>{' '}
              is maintained by{' '}
              <a href="https://github.com/frontend-collective">
                Frontend Collective
              </a>
              .
            </span>

            <span className="site-footer-credits">
              This page was generated by{' '}
              <a href="https://pages.github.com">GitHub Pages</a> using the{' '}
              <a href="https://github.com/jasonlong/cayman-theme">
                Cayman theme
              </a>{' '}
              by <a href="https://twitter.com/jasonlong">Jason Long</a>.
            </span>
          </footer>
        </section>

        <a href="https://github.com/frontend-collective/react-image-lightbox">
          <img
            style={{ position: 'absolute', top: 0, right: 0, border: 0 }}
            src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
          />
        </a>
      </div>
    );
  }
}

export default App;
