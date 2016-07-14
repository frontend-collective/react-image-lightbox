import React from 'react';
import ReactDOM from 'react-dom';
import Lightbox from '../../react-image-lightbox';
import './stylesheets/app.scss';

const images = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
];

const thumbs = [
    'images/1_thumb.jpg',
    'images/2_thumb.jpg',
    'images/3_thumb.jpg',
    'images/4_thumb.jpg',
];

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
                <button
                    type="button"
                    id="open-lightbox"
                    className="demo-button"
                    onClick={this.openLightbox}
                >
                    Open Lightbox
                </button>
                {lightbox}
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
