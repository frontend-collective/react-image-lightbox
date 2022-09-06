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

import LeftArrow from './leftArrowCarousel.svg';
import RightArrow from './rightArrowCarousel.svg';

const images = [image1, image2, image3, image4];
const thumbs = [image1Thumb, image2Thumb, image3Thumb, image4Thumb];

const CloseSvg = ({
  width = 20,
  height = 20,
  fill = '#525252',
  className,
  onClick,
  ...svgProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      {...svgProps}
    >
      <path
        d="M19.1386 18.1946C19.2638 18.3198 19.3341 18.4896 19.3341 18.6666C19.3341 18.8436 19.2638 19.0134 19.1386 19.1386C19.0134 19.2638 18.8436 19.3341 18.6666 19.3341C18.4896 19.3341 18.3198 19.2638 18.1946 19.1386L9.99995 10.9426L1.80528 19.1386C1.6801 19.2638 1.51031 19.3341 1.33328 19.3341C1.15625 19.3341 0.986463 19.2638 0.86128 19.1386C0.736098 19.0134 0.665771 18.8436 0.665771 18.6666C0.665771 18.4896 0.736098 18.3198 0.86128 18.1946L9.05728 9.99995L0.86128 1.80528C0.736098 1.6801 0.665771 1.51031 0.665771 1.33328C0.665771 1.15625 0.736098 0.986463 0.86128 0.86128C0.986463 0.736098 1.15625 0.665771 1.33328 0.665771C1.51031 0.665771 1.6801 0.736098 1.80528 0.86128L9.99995 9.05728L18.1946 0.86128C18.3198 0.736098 18.4896 0.665771 18.6666 0.665771C18.8436 0.665771 19.0134 0.736098 19.1386 0.86128C19.2638 0.986463 19.3341 1.15625 19.3341 1.33328C19.3341 1.51031 19.2638 1.6801 19.1386 1.80528L10.9426 9.99995L19.1386 18.1946Z"
        fill={fill}
      />
    </svg>
  );
};

const CloseButton = ({
  close,
  className,
  description = null,
  label = 'Close',
  fill = '#525252',
  height = 20,
  role = 'button',
  tabIndex = null,
  width = 20,
  ...otherProps
}) => {
  return (
    <CloseSvg
      aria-label={label}
      style={{
        accessibleDescription: {
          display: 'none',
        },
        button: {
          cursor: 'pointer',
        },
        ...otherProps.style,
      }}
      className={className}
      fill={fill}
      height={height}
      onClick={close}
      role={role}
      {...(tabIndex != null ? { tabIndex } : {})}
      width={width}
      {...(description != null
        ? { 'aria-describedby': 'close-button-description' }
        : {})}
    />
  );
};

const ImageHeader = ({ imageTitle, imageIndex, totalImageCount }) => {
  return (
    <div className="ril_title" style={{ paddingTop: 16 }}>
      {imageTitle}
      <div className="ril_status" style={{ paddingTop: 1 }}>
        Image {imageIndex} of {totalImageCount}
      </div>
    </div>
  );
};

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
          mainSrc={images[this.state.index]}
          nextSrc={images[(this.state.index + 1) % images.length]}
          prevSrc={
            images[(this.state.index + images.length - 1) % images.length]
          }
          mainSrcThumbnail={thumbs[this.state.index]}
          nextSrcThumbnail={thumbs[(this.state.index + 1) % images.length]}
          prevSrcThumbnail={
            thumbs[(this.state.index + images.length - 1) % images.length]
          }
          onCloseRequest={this.closeLightbox}
          onMovePrevRequest={this.movePrev}
          onMoveNextRequest={this.moveNext}
          onImageLoadError={App.onImageLoadError}
          imageTitle="Venue Title"
          imageIndex={this.state.index + 1}
          enableZoom={false}
          nextButtonImage={RightArrow}
          prevButtonImage={LeftArrow}
          // closeButtonImage={Close}
          closeButtonComponent={CloseButton}
          closeButtonComponentProps={{
            style: {
              padding: '1.833rem',
            },
            fill: '#0D74AF',
          }}
          thumbnailImages={thumbs}
          imageHeaderComponent={ImageHeader}
          maxHeightOffset={152}
          maxWidthOffset={150}
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
