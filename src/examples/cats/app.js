import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Lightbox from '../../react-image-lightbox';
import styles from './stylesheets/app.scss';

import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';
import image4 from './images/4.jpg';
import image1Thumb from './images/1_thumb.jpg';
import image2Thumb from './images/2_thumb.jpg';
import image3Thumb from './images/3_thumb.jpg';
import image4Thumb from './images/4_thumb.jpg';

const images = [ image1, image2, image3, image4 ];
const thumbs = [ image1Thumb, image2Thumb, image3Thumb, image4Thumb ];

const titles = [
    '',
    (<span>
        by&nbsp;
        <a className={styles.creditLink} href="http://flickr.com/photos/titrans/">
            quatre mains
        </a>
        &nbsp;
        (<a
            className={styles.creditLink}
            href="http://creativecommons.org/licenses/by/2.0/"
            title="Attribution License"
        >
            Some rights reserved
        </a>)
    </span>),
    (<span>
        by&nbsp;
        <a className={styles.creditLink} href="http://flickr.com/photos/lachlanrogers/">
            latch.r
        </a>
        &nbsp;
        (<a
            className={styles.creditLink}
            href="http://creativecommons.org/licenses/by-sa/2.0/"
            title="Attribution-ShareAlike License"
        >
            Some rights reserved
        </a>)
    </span>),
    (<span>
        by&nbsp;
        <a className={styles.creditLink} href="http://flickr.com/photos/fazen/">
            fazen
        </a>
        &nbsp;
        (<a
            className={styles.creditLink}
            href="http://creativecommons.org/licenses/by/2.0/"
            title="Attribution License"
        >
            Some rights reserved
        </a>)
    </span>),
];

const captions = [
    'Cat in the snow',
    '',
    (<p>
        .. not in the&nbsp;
        <em>
            mood
        </em>
        &nbsp;for games right now<br />
        ...<br />
        ...<br />
        ...<br />
        ...<br />
        ...<br />
        ...<br />
        C&#39;mon. Seriously.
    </p>),
    '',
];

class App extends Component {
    constructor() {
        super();

        this.state = {
            index: 0,
            isOpen: false
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
        this.setState({ index: (this.state.index + 1) % images.length });
    }

    movePrev() {
        this.setState({ index: (this.state.index + images.length - 1) % images.length });
    }

    static onImageLoadError(imageSrc, _srcType, errorEvent) {
        console.error(`Could not load image at ${imageSrc}`, errorEvent); // eslint-disable-line no-console
    }

    render() {
        let lightbox;
        if (this.state.isOpen) {
            lightbox = (
                <Lightbox
                    mainSrc={images[this.state.index]}
                    nextSrc={images[(this.state.index + 1) % images.length]}
                    prevSrc={images[(this.state.index + images.length - 1) % images.length]}

                    mainSrcThumbnail={thumbs[this.state.index]}
                    nextSrcThumbnail={thumbs[(this.state.index + 1) % images.length]}
                    prevSrcThumbnail={thumbs[(this.state.index + images.length - 1) % images.length]}

                    onCloseRequest={this.closeLightbox}
                    onMovePrevRequest={this.movePrev}
                    onMoveNextRequest={this.moveNext}
                    onImageLoadError={App.onImageLoadError}

                    imageTitle={titles[this.state.index]}
                    imageCaption={captions[this.state.index]}
                />
            );
        }

        return (
            <div>
                <section className={styles['page-header']}>
                    <h1 className={styles['project-name']}>
                        React Image Lightbox
                    </h1>

                    <h2 className={styles['project-tagline']}>
                        Flexible lightbox component for displaying images with React
                    </h2>
                </section>

                <section className={styles['main-content']}>
                    <h2>Demo</h2>

                    <div>
                        <button
                            type="button"
                            id="open-lightbox"
                            className={styles.demoButton}
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
                            Mobile friendly, with pinch to zoom and swipe
                            (Thanks, <a href="https://github.com/webcarrot">@webcarrot</a>!)
                        </li>
                        <li>No external CSS</li>
                    </ul>

                    <a href="https://github.com/fritz-c/react-image-lightbox">Examples and Documentation on Github</a>

                    <footer className={styles['site-footer']}>
                        <span className={styles['site-footer-owner']}>
                            <a href="https://github.com/fritz-c/react-image-lightbox">React Image Lightbox</a> is maintained by <a href="https://github.com/fritz-c">fritz-c</a>.
                        </span>

                        <span className={styles['site-footer-credits']}>
                            This page was generated by <a href="https://pages.github.com">GitHub Pages</a> using the <a href="https://github.com/jasonlong/cayman-theme">Cayman theme</a> by <a href="https://twitter.com/jasonlong">Jason Long</a>.
                        </span>
                    </footer>
                </section>

                <a href="https://github.com/fritz-c/react-image-lightbox">
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

ReactDOM.render(<App />, document.getElementById('app'));
