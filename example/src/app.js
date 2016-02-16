var React    = require('react');
var ReactDOM = require('react-dom');
var Lightbox = require('react-image-lightbox');

var images = [
    '//placekitten.com/1500/500?image=3',
    '//placekitten.com/2000/1500?image=8',
    '//placekitten.com/800/1200?image=5',
    // '//placekitten.com/300/400',
    '//placekitten.com/1500/1500?image=13',
];

var titles = [
    "",
    (
        <span>
            by&nbsp;
            <a href="http://flickr.com/photos/titrans/">
                quatre mains
            </a>
            &nbsp;(<a href="http://creativecommons.org/licenses/by/2.0/" title="Attribution License">
                Some rights reserved
            </a>)
        </span>
    ),
    (
        <span>
            by&nbsp;
            <a href="http://flickr.com/photos/lachlanrogers/">latch.r</a>
            &nbsp;(<a href="http://creativecommons.org/licenses/by-sa/2.0/" title="Attribution-ShareAlike License">
                Some rights reserved
            </a>)
        </span>
    ),
    (
        <span>
            by&nbsp;
            <a href="http://flickr.com/photos/fazen/">
                fazen
            </a>
            &nbsp;(<a href="http://creativecommons.org/licenses/by/2.0/" title="Attribution License">
                Some rights reserved
            </a>)
        </span>
    ),
];
var App = React.createClass({
    getInitialState: function() {
        return {
            index: 0,
            isOpen: false
        };
    },
    openLightbox: function() {
        this.setState({ isOpen: true });
    },
    closeLightbox: function() {
        this.setState({ isOpen: false });
    },
    moveNext: function() {
        this.setState({ index: (this.state.index + 1) % images.length });
    },
    movePrev: function() {
        this.setState({ index: (this.state.index + images.length - 1) % images.length });
    },
    render: function() {
        var lightbox = '';
        if (this.state.isOpen) {
            lightbox = (
                <Lightbox
                    mainSrc={images[this.state.index]}
                    nextSrc={images[(this.state.index + 1) % images.length]}
                    prevSrc={images[(this.state.index + images.length - 1) % images.length]}

                    onCloseRequest={this.closeLightbox}
                    onMovePrevRequest={this.movePrev}
                    onMoveNextRequest={this.moveNext}

                    imageTitle={titles[this.state.index]}
                />
            );
        }

        return (
            <div>
                <button type="button" onClick={this.openLightbox}>Open Lightbox</button>
                {lightbox}
            </div>
        );
    }
});

ReactDOM.render(<App/>, document.getElementById('app'));
