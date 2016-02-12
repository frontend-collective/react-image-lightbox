var React    = require('react');
var ReactDOM = require('react-dom');
var Lightbox = require('../../lib/index');

var appElement = document.getElementById('example');

var images = [
    'http://placekitten.com/300/400',
    'http://placekitten.com/4000/3000',
    'http://placekitten.com/800/1200',
    'http://placekitten.com/1500/1500'
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
        this.setState({ index: (this.state.index - 1) % images.length });
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

ReactDOM.render(<App/>, appElement);
