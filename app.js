require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Lightbox = require('react-image-lightbox');

var images = ['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg'];

var thumbs = ['images/1_thumb.jpg', 'images/2_thumb.jpg', 'images/3_thumb.jpg', 'images/4_thumb.jpg'];

var titles = ["", React.createElement(
    'span',
    null,
    'by ',
    React.createElement(
        'a',
        { href: 'http://flickr.com/photos/titrans/' },
        'quatre mains'
    ),
    ' (',
    React.createElement(
        'a',
        { href: 'http://creativecommons.org/licenses/by/2.0/', title: 'Attribution License' },
        'Some rights reserved'
    ),
    ')'
), React.createElement(
    'span',
    null,
    'by ',
    React.createElement(
        'a',
        { href: 'http://flickr.com/photos/lachlanrogers/' },
        'latch.r'
    ),
    ' (',
    React.createElement(
        'a',
        { href: 'http://creativecommons.org/licenses/by-sa/2.0/', title: 'Attribution-ShareAlike License' },
        'Some rights reserved'
    ),
    ')'
), React.createElement(
    'span',
    null,
    'by ',
    React.createElement(
        'a',
        { href: 'http://flickr.com/photos/fazen/' },
        'fazen'
    ),
    ' (',
    React.createElement(
        'a',
        { href: 'http://creativecommons.org/licenses/by/2.0/', title: 'Attribution License' },
        'Some rights reserved'
    ),
    ')'
)];
var App = React.createClass({
    displayName: 'App',

    getInitialState: function getInitialState() {
        return {
            index: 0,
            isOpen: false
        };
    },
    openLightbox: function openLightbox() {
        this.setState({ isOpen: true });
    },
    closeLightbox: function closeLightbox() {
        this.setState({ isOpen: false });
    },
    moveNext: function moveNext() {
        this.setState({ index: (this.state.index + 1) % images.length });
    },
    movePrev: function movePrev() {
        this.setState({ index: (this.state.index + images.length - 1) % images.length });
    },
    render: function render() {
        var lightbox = '';
        if (this.state.isOpen) {
            lightbox = React.createElement(Lightbox, {
                mainSrc: images[this.state.index],
                nextSrc: images[(this.state.index + 1) % images.length],
                prevSrc: images[(this.state.index + images.length - 1) % images.length],

                mainSrcThumbnail: thumbs[this.state.index],
                nextSrcThumbnail: thumbs[(this.state.index + 1) % images.length],
                prevSrcThumbnail: thumbs[(this.state.index + images.length - 1) % images.length],

                onCloseRequest: this.closeLightbox,
                onMovePrevRequest: this.movePrev,
                onMoveNextRequest: this.moveNext,

                imageTitle: titles[this.state.index]
            });
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'button',
                {
                    type: 'button',
                    id: 'open-lightbox',
                    className: 'demo-button',
                    onClick: this.openLightbox
                },
                'Open Lightbox'
            ),
            lightbox
        );
    }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-image-lightbox":undefined}]},{},[1]);
