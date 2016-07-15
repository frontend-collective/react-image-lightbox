import React from 'react';
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
        <a href="http://flickr.com/photos/titrans/">
            quatre mains
        </a>
        &nbsp;(<a href="http://creativecommons.org/licenses/by/2.0/" title="Attribution License">
            Some rights reserved
        </a>)
    </span>),
    (<span>
        by&nbsp;
        <a href="http://flickr.com/photos/lachlanrogers/">latch.r</a>
        &nbsp;(<a href="http://creativecommons.org/licenses/by-sa/2.0/" title="Attribution-ShareAlike License">
            Some rights reserved
        </a>)
    </span>),
    (<span>
        by&nbsp;
        <a href="http://flickr.com/photos/fazen/">
            fazen
        </a>
        &nbsp;(<a href="http://creativecommons.org/licenses/by/2.0/" title="Attribution License">
            Some rights reserved
        </a>)
    </span>),
];

const App = React.createClass({
    getInitialState() {
        return {
            index: 0,
            isOpen: false
        };
    },
    openLightbox() {
        this.setState({ isOpen: true });
    },
    closeLightbox() {
        this.setState({ isOpen: false });
    },
    moveNext() {
        this.setState({ index: (this.state.index + 1) % images.length });
    },
    movePrev() {
        this.setState({ index: (this.state.index + images.length - 1) % images.length });
    },
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

                    imageTitle={titles[this.state.index]}
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
                        Lightbox component for React.js
                    </h2>

                    <a
                        href="https://github.com/fritz-c/react-image-lightbox"
                        className={styles.btn}
                    >
                        View on GitHub
                    </a>

                    <a
                        href="https://github.com/fritz-c/react-image-lightbox/zipball/master"
                        className={styles.btn}
                    >
                        Download .zip
                    </a>

                    <a
                        href="https://github.com/fritz-c/react-image-lightbox/tarball/master"
                        className={styles.btn}
                    >
                        Download .tar.gz
                    </a>
                </section>

                <section className={styles['main-content']}>
                    <h1>
                        <a
                            id="react-image-lightbox"
                            className={styles.anchor}
                            href="#react-image-lightbox"
                            aria-hidden="true"
                        >
                            <span aria-hidden="true" className={`${styles.octicon} ${styles['octicon-link']}`}></span>
                        </a>

                        React Image Lightbox
                    </h1>

                    <p>A flexible lightbox component for displaying images in a React project.</p>

                    <h3>Demo</h3>

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

                    <p>Features</p>
                    <ul>
                        <li>Keyboard shortcuts (with rate limiting)</li>
                        <li>Image Zoom</li>
                        <li>Flexible rendering using src values assigned on the fly</li>
                        <li>Image preloading for smoother viewing</li>
                        <li>Few dependencies</li>
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
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
