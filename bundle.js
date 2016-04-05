require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Constants file

'use strict';

var constants = {
    // Min image zoom level
    MIN_ZOOM_LEVEL: 0,

    // Max image zoom level
    MAX_ZOOM_LEVEL: 300,

    // Size ratio between previous and next zoom levels
    ZOOM_RATIO: 1.007,

    // How much to increase/decrease the zoom level when the zoom buttons are clicked
    ZOOM_BUTTON_INCREMENT_SIZE: 100,

    // Used to judge the amount of horizontal scroll needed to initiate a image move
    WHEEL_MOVE_X_THRESHOLD: 200,

    // Used to judge the amount of vertical scroll needed to initiate a zoom action
    WHEEL_MOVE_Y_THRESHOLD: 1
};

module.exports = Object.freeze(constants);

},{}],2:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
    displayName: 'exports',

    portalElement: null,

    propTypes: {
        portalId: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            portalId: 'react-image-lightbox-portal'
        };
    },

    componentDidMount: function componentDidMount() {
        var portalElement = this.props.portalId && document.getElementById(this.props.portalId);
        if (!portalElement) {
            portalElement = document.createElement('div');
            portalElement.id = this.props.portalId;
            document.body.appendChild(portalElement);
        }
        this.portalElement = portalElement;

        this.componentDidUpdate();
    },

    componentWillUnmount: function componentWillUnmount() {
        document.body.removeChild(this.portalElement);
    },

    componentDidUpdate: function componentDidUpdate() {
        ReactDOM.render(React.createElement(
            'div',
            this.props,
            this.props.children
        ), this.portalElement);
    },

    render: function render() {
        return null;
    }
});

},{"react":undefined,"react-dom":undefined}],3:[function(require,module,exports){
'use strict';

var Radium = require('radium');
var toolbarHeight = '50px';

var closeWindowKeyframes = Radium.keyframes({
    '0%': { opacity: '1' },
    '100%': { opacity: '0' }
}, 'closeWindow');

var styles = {
    outer: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        width: '100%',
        height: '100%'
    },
    outerAnimating: function outerAnimating(duration, isClosing) {
        return {
            transition: 'opacity ' + String(duration) + 'ms',
            animationDuration: String(duration) + 'ms',
            animationDirection: isClosing ? 'normal' : 'reverse',
            animationName: closeWindowKeyframes
        };
    },
    outerClosing: {
        opacity: 0
    },
    inner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },

    image: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        margin: 'auto',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    imagePrev: {
        left: '-100%',
        right: '100%'
    },
    imageNext: {
        left: '100%',
        right: '-100%'
    },
    imageCurrent: function imageCurrent(zoomRatio, offsetX, offsetY) {
        return {
            transform: 'scale3d(' + zoomRatio + ',' + zoomRatio + ',1) ',
            left: -1 * offsetX,
            right: offsetX,
            top: -1 * offsetY,
            bottom: offsetY
        };
    },
    imageDiscourager: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain'
    },
    imageAnimating: function imageAnimating(duration) {
        return {
            transition: ['transform ' + String(duration) + 'ms', 'left ' + String(duration) + 'ms', 'top ' + String(duration) + 'ms', 'right ' + String(duration) + 'ms', 'bottom ' + String(duration) + 'ms'].join(', ')
        };
    },

    navButtons: {
        border: 'none',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '20px',
        height: '34px',
        padding: '40px 30px',
        margin: 'auto',
        cursor: 'pointer',
        opacity: 0.7,

        ':hover': {
            opacity: 1
        },

        ':active': {
            opacity: 0.7
        }
    },
    navButtonPrev: {
        left: 0,
        background: 'rgba(0,0,0,0.2) url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjM0Ij48cGF0aCBkPSJtIDE5LDMgLTIsLTIgLTE2LDE2IDE2LDE2IDEsLTEgLTE1LC0xNSAxNSwtMTUgeiIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg==\') no-repeat center'
    },
    navButtonNext: {
        right: 0,
        background: 'rgba(0,0,0,0.2) url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjM0Ij48cGF0aCBkPSJtIDEsMyAyLC0yIDE2LDE2IC0xNiwxNiAtMSwtMSAxNSwtMTUgLTE1LC0xNSB6IiBmaWxsPSIjRkZGIi8+PC9zdmc+\') no-repeat center'
    },

    downloadBlocker: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\')',
        backgroundSize: 'cover'
    },

    toolbar: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: toolbarHeight
    },
    toolbarSide: {
        lineHeight: toolbarHeight,
        position: 'absolute',
        top: 0,
        bottom: 0,
        margin: 0,
        maxWidth: '48%'
    },
    toolbarLeftSide: {
        paddingLeft: '20px',
        paddingRight: 0,
        left: 0
    },
    toolbarRightSide: {
        paddingLeft: 0,
        paddingRight: '20px',
        right: 0
    },
    toolbarItem: {
        display: 'inline-block',
        lineHeight: toolbarHeight,
        padding: '0',
        color: '#FFFFFF',
        fontSize: '120%',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'

    },
    toolbarItemChild: {
        verticalAlign: 'middle'
    },

    builtinButton: {
        width: '40px',
        height: '35px',
        cursor: 'pointer',
        border: 'none',
        opacity: 0.7,

        ':hover': {
            opacity: 1
        },

        ':active': {
            outline: 'none'
        }
    },

    builtinButtonDisabled: {
        cursor: 'default',
        opacity: 0.5,

        ':hover': {
            opacity: 0.5
        }
    },

    closeButton: {
        background: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBkPSJtIDEsMyAxLjI1LC0xLjI1IDcuNSw3LjUgNy41LC03LjUgMS4yNSwxLjI1IC03LjUsNy41IDcuNSw3LjUgLTEuMjUsMS4yNSAtNy41LC03LjUgLTcuNSw3LjUgLTEuMjUsLTEuMjUgNy41LC03LjUgLTcuNSwtNy41IHoiIGZpbGw9IiNGRkYiLz48L3N2Zz4=\') no-repeat center'
    },

    zoomInButton: {
        background: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGcgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTEgMTlsNi02Ii8+PHBhdGggZD0iTTkgOGg2Ii8+PHBhdGggZD0iTTEyIDV2NiIvPjwvZz48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+\') no-repeat center'
    },

    zoomOutButton: {
        background: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGcgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTEgMTlsNi02Ii8+PHBhdGggZD0iTTkgOGg2Ii8+PC9nPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=\') no-repeat center'
    }
};

module.exports = styles;

},{"radium":undefined}],"react-image-lightbox":[function(require,module,exports){
/*
 * react-image-lightbox 1.0.0
 * Copyright 2016 Chris Fritz All rights reserved.
 * @license Open source under the MIT License
 */
'use strict';

var React = require('react');
var Radium = require('radium');
var StyleRoot = Radium.StyleRoot;
var Styles = require('./Styles');
var Portal = require('./Portal');
var Constant = require('./Constant');

function _getWindowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function _getWindowHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

// Returns true if this window is rendered as an iframe inside another window
function _isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

var ReactImageLightbox = React.createClass({
    displayName: 'ReactImageLightbox',

    propTypes: {
        ///////////////////////////////
        // Image sources
        ///////////////////////////////

        // Main display image url
        mainSrc: React.PropTypes.string.isRequired,

        // Previous display image url (displayed to the left)
        // If left undefined, movePrev actions will not be performed, and the button not displayed
        prevSrc: React.PropTypes.string,

        // Next display image url (displayed to the right)
        // If left undefined, moveNext actions will not be performed, and the button not displayed
        nextSrc: React.PropTypes.string,

        ///////////////////////////////
        // Image thumbnail sources
        ///////////////////////////////

        // Thumbnail image url corresponding to props.mainSrc
        mainSrcThumbnail: React.PropTypes.string,

        // Thumbnail image url corresponding to props.prevSrc
        prevSrcThumbnail: React.PropTypes.string,

        // Thumbnail image url corresponding to props.nextSrc
        nextSrcThumbnail: React.PropTypes.string,

        ///////////////////////////////
        // Event Handlers
        ///////////////////////////////

        // Close window event
        // Should change the parent state such that the lightbox is not rendered
        onCloseRequest: React.PropTypes.func.isRequired,

        // Move to previous image event
        // Should change the parent state such that props.prevSrc becomes props.mainSrc,
        //  props.mainSrc becomes props.nextSrc, etc.
        onMovePrevRequest: React.PropTypes.func,

        // Move to next image event
        // Should change the parent state such that props.nextSrc becomes props.mainSrc,
        //  props.mainSrc becomes props.prevSrc, etc.
        onMoveNextRequest: React.PropTypes.func,

        ///////////////////////////////
        // Download discouragement settings
        ///////////////////////////////

        // Enable download discouragement (prevents [right-click -> Save Image As...])
        discourageDownloads: React.PropTypes.bool,

        ///////////////////////////////
        // Animation settings
        ///////////////////////////////

        // Disable all animation
        animationDisabled: React.PropTypes.bool,

        // Disable animation on actions performed with keyboard shortcuts
        animationOnKeyInput: React.PropTypes.bool,

        // Animation duration (ms)
        animationDuration: React.PropTypes.number,

        ///////////////////////////////
        // Keyboard shortcut settings
        ///////////////////////////////

        // Required interval of time (ms) between key actions
        // (prevents excessively fast navigation of images)
        keyRepeatLimit: React.PropTypes.number,

        // Amount of time (ms) restored after each keyup
        // (makes rapid key presses slightly faster than holding down the key to navigate images)
        keyRepeatKeyupBonus: React.PropTypes.number,

        ///////////////////////////////
        // Image info
        ///////////////////////////////

        // Image title
        imageTitle: React.PropTypes.node,

        ///////////////////////////////
        // Other
        ///////////////////////////////

        // Array of custom toolbar buttons
        toolbarButtons: React.PropTypes.arrayOf(React.PropTypes.node),

        // Padding (px) between the edge of the window and the lightbox
        imagePadding: React.PropTypes.number
    },

    getDefaultProps: function getDefaultProps() {
        return {
            onMovePrevRequest: function onMovePrevRequest() {},
            onMoveNextRequest: function onMoveNextRequest() {},

            discourageDownloads: false,

            animationDisabled: false,
            animationOnKeyInput: false,
            animationDuration: 300,

            keyRepeatLimit: 180,
            keyRepeatKeyupBonus: 40,

            imagePadding: 10
        };
    },

    getInitialState: function getInitialState() {
        return {
            ///////////////////////////////
            // Animation
            ///////////////////////////////

            // Lightbox is closing
            // When Lightbox is mounted, if animation is enabled it will open with the reverse of the closing animation
            isClosing: !this.props.animationDisabled,

            // Component parts should animate (e.g., when images are moving, or image is being zoomed)
            shouldAnimate: false,

            ///////////////////////////////
            // Zoom settings
            ///////////////////////////////
            // Zoom level of image
            zoomLevel: Constant.MIN_ZOOM_LEVEL,

            ///////////////////////////////
            // Image position settings
            ///////////////////////////////
            // Horizontal offset from center
            offsetX: 0,

            // Vertical offset from center
            offsetY: 0
        };
    },

    componentWillMount: function componentWillMount() {
        // Whether event listeners for keyboard and mouse input have been attached or not
        this.listenersAttached = false;

        // Used to disable animation when changing props.mainSrc|nextSrc|prevSrc
        this.keyPressed = false;

        // Used to store load state / dimensions of images
        this.imageCache = {};

        // Time the last keydown event was called (used in keyboard action rate limiting)
        this.lastKeyDownTime = 0;

        // Used for debouncing window resize event
        this.resizeTimeout = null;

        // Used to determine when actions are triggered by the scroll wheel
        this.wheelActionTimeout = null;
        this.resetScrollTimeout = null;
        this.scrollX = 0;
        this.scrollY = 0;

        // Used in panning zoomed images
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.dragStartOffsetX = 0;
        this.dragStartOffsetY = 0;

        // Used to differentiate between images with identical src
        this.keyCounter = 0;

        // Used to detect a move when all src's remain unchanged (four or more of the same image in a row)
        this.moveRequested = false;
    },

    componentDidMount: function componentDidMount() {
        this.attachListeners();

        if (!this.props.animationDisabled) {
            // Make opening animation play
            this.setState({ isClosing: false });
        }

        this.loadAllImages();
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var sourcesChanged = this.getSrcTypes().some((function (srcType) {
            return this.props[srcType.name] != nextProps[srcType.name];
        }).bind(this));

        if (sourcesChanged || this.moveRequested) {
            this.moveRequested = false;

            // Load any new images
            this.loadAllImages(nextProps);
        }
    },

    componentWillUnmount: function componentWillUnmount() {
        this.detachListeners();
    },

    // Handle user keyboard actions
    handleKeyInput: function handleKeyInput(event) {
        event.stopPropagation();

        // Ignore key input during animations
        if (this.isAnimating()) {
            return;
        }

        // Allow slightly faster navigation through the images when user presses keys repeatedly
        if (event.type === 'keyup') {
            this.lastKeyDownTime -= this.props.keyRepeatKeyupBonus;
            return;
        }

        var keyCode = event.which || event.keyCode;
        var key = {
            esc: 27,
            leftArrow: 37,
            rightArrow: 39
        };

        // Ignore key presses that happen too close to each other (when rapid fire key pressing or holding down the key)
        // But allow it if it's a lightbox closing action
        var currentTime = new Date();
        if (currentTime.getTime() - this.lastKeyDownTime < this.props.keyRepeatLimit && keyCode != key.esc) {
            return;
        }
        this.lastKeyDownTime = currentTime.getTime();

        switch (keyCode) {
            // ESC key closes the lightbox
            case key.esc:
                event.preventDefault();
                this.requestClose(event);
                break;

            // Left arrow key moves to previous image
            case key.leftArrow:
                if (!this.props.prevSrc) {
                    return;
                }

                event.preventDefault();
                this.keyPressed = true;
                this.requestMovePrev(event);
                break;

            // Right arrow key moves to next image
            case key.rightArrow:
                if (!this.props.nextSrc) {
                    return;
                }

                event.preventDefault();
                this.keyPressed = true;
                this.requestMoveNext(event);
                break;

            default:
        }
    },

    // Handle the window resize event
    handleWindowResize: function handleWindowResize(event) {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(this.forceUpdate.bind(this), 100);
    },

    // Handle a mouse wheel event over the lightbox container
    handleOuterMousewheel: function handleOuterMousewheel(event) {
        // Prevent scrolling of the background
        event.preventDefault();
        event.stopPropagation();

        var xThreshold = Constant.WHEEL_MOVE_X_THRESHOLD;
        var actionDelay = 0;
        var imageMoveDelay = 500;

        clearTimeout(this.resetScrollTimeout);
        this.resetScrollTimeout = setTimeout((function () {
            this.scrollX = 0;
            this.scrollY = 0;
        }).bind(this), 300);

        // Prevent rapid-fire zoom behavior
        if (this.wheelActionTimeout !== null || this.isAnimating()) {
            return;
        }

        if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
            // handle horizontal scrolls with image moves
            this.scrollY = 0;
            this.scrollX += event.deltaX;

            var bigLeapX = xThreshold / 2;
            // If the scroll amount has accumulated sufficiently, or a large leap was taken
            if (this.scrollX >= xThreshold || event.deltaX >= bigLeapX) {
                // Scroll right moves to next
                this.requestMoveNext(event);
                actionDelay = imageMoveDelay;
                this.scrollX = 0;
            } else if (this.scrollX <= -1 * xThreshold || event.deltaX <= -1 * bigLeapX) {
                // Scroll left moves to previous
                this.requestMovePrev(event);
                actionDelay = imageMoveDelay;
                this.scrollX = 0;
            }
        }

        // Allow successive actions after the set delay
        if (actionDelay !== 0) {
            this.wheelActionTimeout = setTimeout((function () {
                this.wheelActionTimeout = null;
            }).bind(this), actionDelay);
        }
    },

    handleImageMouseWheel: function handleImageMouseWheel(event) {
        event.preventDefault();
        var yThreshold = Constant.WHEEL_MOVE_Y_THRESHOLD;

        if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
            event.stopPropagation();
            // If the vertical scroll amount was large enough, perform a zoom
            if (Math.abs(event.deltaY) < yThreshold) {
                return;
            }

            this.scrollX = 0;
            this.scrollY += event.deltaY;

            this.changeZoom(this.state.zoomLevel - event.deltaY, event.clientX, event.clientY);
        }
    },

    getOffsetXFromWindowCenter: function getOffsetXFromWindowCenter(x) {
        var windowWidth = _getWindowWidth();
        return windowWidth / 2 - x;
    },
    getOffsetYFromWindowCenter: function getOffsetYFromWindowCenter(y) {
        var windowHeight = _getWindowHeight();
        return windowHeight / 2 - y;
    },

    // Handle a double click on the current image
    handleImageDoubleClick: function handleImageDoubleClick(event) {
        if (this.state.zoomLevel > Constant.MIN_ZOOM_LEVEL) {
            // A double click when zoomed in zooms all the way out
            this.changeZoom(Constant.MIN_ZOOM_LEVEL, event.clientX, event.clientY);
        } else {
            // A double click when zoomed all the way out zooms in
            this.changeZoom(this.state.zoomLevel + Constant.ZOOM_BUTTON_INCREMENT_SIZE, event.clientX, event.clientY);
        }
    },

    // Handle the mouse clicking down in the lightbox container
    handleOuterMouseDown: function handleOuterMouseDown(event) {
        event.preventDefault();

        // Allow dragging when zoomed
        if (this.state.zoomLevel > Constant.MIN_ZOOM_LEVEL) {
            this.isDragging = true;
            this.dragStartX = event.clientX;
            this.dragStartY = event.clientY;
            this.dragStartOffsetX = this.state.offsetX;
            this.dragStartOffsetY = this.state.offsetY;
        }
    },

    // Handle the mouse dragging over the lightbox container
    // (after a mouseDown and before a mouseUp event)
    handleOuterMouseMove: function handleOuterMouseMove(event) {
        if (!this.isDragging) {
            return;
        }

        var zoomMultiplier = this.getZoomMultiplier();

        var newOffsetX = (this.dragStartX - event.clientX) / zoomMultiplier + this.dragStartOffsetX;
        var newOffsetY = (this.dragStartY - event.clientY) / zoomMultiplier + this.dragStartOffsetY;
        if (this.state.offsetX !== newOffsetX || this.state.offsetY !== newOffsetY) {
            this.setState({
                offsetX: newOffsetX,
                offsetY: newOffsetY
            });
        }
    },

    // Handle a mouse click ending in the lightbox container
    handleMouseUp: function handleMouseUp(event) {
        if (!this.isDragging) {
            return;
        }

        this.isDragging = false;

        // Snap image back into frame if outside max offset range
        var maxOffsets = this.getMaxOffsets();
        var nextOffsetX = Math.max(maxOffsets.minX, Math.min(maxOffsets.maxX, this.state.offsetX));
        var nextOffsetY = Math.max(maxOffsets.minY, Math.min(maxOffsets.maxY, this.state.offsetY));
        if (nextOffsetX !== this.state.offsetX || nextOffsetY !== this.state.offsetY) {
            this.setState({
                offsetX: nextOffsetX,
                offsetY: nextOffsetY,
                shouldAnimate: true
            });

            setTimeout((function () {
                this.setState({ shouldAnimate: false });
            }).bind(this), this.props.animationDuration);
        }
    },

    handleZoomInButtonClick: function handleZoomInButtonClick(event) {
        this.changeZoom(this.state.zoomLevel + Constant.ZOOM_BUTTON_INCREMENT_SIZE);
    },

    handleZoomOutButtonClick: function handleZoomOutButtonClick(event) {
        this.changeZoom(this.state.zoomLevel - Constant.ZOOM_BUTTON_INCREMENT_SIZE);
    },

    // Change zoom level
    changeZoom: function changeZoom(zoomLevel, clientX, clientY) {
        var windowWidth = _getWindowWidth();
        var windowHeight = _getWindowHeight();

        // Default to the center of the screen to zoom when no mouse position specified
        clientX = typeof clientX !== 'undefined' ? clientX : windowWidth / 2;
        clientY = typeof clientY !== 'undefined' ? clientY : windowHeight / 2;

        // Constrain zoom level to the set bounds
        var nextZoomLevel = Math.max(Constant.MIN_ZOOM_LEVEL, Math.min(Constant.MAX_ZOOM_LEVEL, zoomLevel));

        // Ignore requests that don't change the zoom level
        if (nextZoomLevel === this.state.zoomLevel) {
            return;
        } else if (nextZoomLevel === Constant.MIN_ZOOM_LEVEL) {
            // Snap back to center if zoomed all the way out
            return this.setState({
                zoomLevel: nextZoomLevel,
                offsetX: 0,
                offsetY: 0
            });
        }

        var currentZoomMultiplier = this.getZoomMultiplier();
        var nextZoomMultiplier = this.getZoomMultiplier(nextZoomLevel);

        var percentXInCurrentBox = clientX / windowWidth;
        var percentYInCurrentBox = clientY / windowHeight;

        var currentBoxWidth = windowWidth / currentZoomMultiplier;
        var currentBoxHeight = windowHeight / currentZoomMultiplier;

        var nextBoxWidth = windowWidth / nextZoomMultiplier;
        var nextBoxHeight = windowHeight / nextZoomMultiplier;

        var deltaX = (nextBoxWidth - currentBoxWidth) * (percentXInCurrentBox - 0.5);
        var deltaY = (nextBoxHeight - currentBoxHeight) * (percentYInCurrentBox - 0.5);

        var nextOffsetX = this.state.offsetX - deltaX;
        var nextOffsetY = this.state.offsetY - deltaY;

        // When zooming out, limit the offset so things don't get left askew
        var maxOffsets = this.getMaxOffsets();
        if (this.state.zoomLevel > nextZoomLevel) {
            nextOffsetX = Math.max(maxOffsets.minX, Math.min(maxOffsets.maxX, nextOffsetX));
            nextOffsetY = Math.max(maxOffsets.minY, Math.min(maxOffsets.maxY, nextOffsetY));
        }

        this.setState({
            zoomLevel: nextZoomLevel,
            offsetX: nextOffsetX,
            offsetY: nextOffsetY
        });
    },

    // Request that the lightbox be closed
    requestClose: function requestClose(event) {
        var closeLightbox = (function closeLightbox() {
            // Call the parent close request
            return this.props.onCloseRequest(event);
        }).bind(this);

        if (this.props.animationDisabled || event.type === 'keydown' && !this.props.animationOnKeyInput) {
            // No animation
            return closeLightbox();
        } else {
            // With animation

            // Start closing animation
            this.setState({ isClosing: true });

            // Perform the actual closing at the end of the animation
            setTimeout(closeLightbox, this.props.animationDuration);
        }
    },

    requestMove: function requestMove(direction, event) {
        // Reset the zoom level on image move
        var nextState = {
            zoomLevel: Constant.MIN_ZOOM_LEVEL,
            offsetX: 0,
            offsetY: 0
        };

        // Enable animated states
        if (!this.props.animationDisabled && (!this.keyPressed || this.props.animationOnKeyInput)) {
            nextState.shouldAnimate = true;
            setTimeout((function () {
                this.setState({ shouldAnimate: false });
            }).bind(this), this.props.animationDuration);
        }
        this.keyPressed = false;

        this.moveRequested = true;

        if (direction === 'prev') {
            this.keyCounter--;
            this.setState(nextState);
            this.props.onMovePrevRequest(event);
        } else {
            this.keyCounter++;
            this.setState(nextState);
            this.props.onMoveNextRequest(event);
        }
    },

    // Request to transition to the previous image
    requestMovePrev: function requestMovePrev(event) {
        this.requestMove('prev', event);
    },

    // Request to transition to the next image
    requestMoveNext: function requestMoveNext(event) {
        this.requestMove('next', event);
    },

    // Attach key and mouse input events
    attachListeners: function attachListeners() {
        if (!this.listenersAttached) {
            document.addEventListener('keydown', this.handleKeyInput);
            document.addEventListener('keyup', this.handleKeyInput);
            window.addEventListener('resize', this.handleWindowResize);
            window.addEventListener('mouseup', this.handleMouseUp);

            // Have to add an extra mouseup handler to catch mouseup events outside of the window
            //  if the page containing the lightbox is displayed in an iframe
            if (_isInIframe()) {
                window.top.addEventListener('mouseup', this.handleMouseUp);
            }

            this.listenersAttached = true;
        }
    },

    // Detach key and mouse input events
    detachListeners: function detachListeners() {
        if (this.listenersAttached) {
            document.removeEventListener('keydown', this.handleKeyInput);
            document.removeEventListener('keyup', this.handleKeyInput);
            window.removeEventListener('resize', this.handleWindowResize);
            window.removeEventListener('mouseup', this.handleMouseUp);

            if (_isInIframe()) {
                window.top.removeEventListener('mouseup', this.handleMouseUp);
            }

            this.listenersAttached = false;
        }
    },

    // Get image src types
    getSrcTypes: function getSrcTypes() {
        return [{
            name: 'mainSrc',
            keyEnding: 'i' + this.keyCounter
        }, {
            name: 'mainSrcThumbnail',
            keyEnding: 't' + this.keyCounter
        }, {
            name: 'nextSrc',
            keyEnding: 'i' + (this.keyCounter + 1)
        }, {
            name: 'nextSrcThumbnail',
            keyEnding: 't' + (this.keyCounter + 1)
        }, {
            name: 'prevSrc',
            keyEnding: 'i' + (this.keyCounter - 1)
        }, {
            name: 'prevSrcThumbnail',
            keyEnding: 't' + (this.keyCounter - 1)
        }];
    },

    // Get sizing for when an image is larger than the window
    getFitSizes: function getFitSizes(width, height, stretch) {
        var windowHeight = _getWindowHeight();
        var windowWidth = _getWindowWidth();
        var maxHeight = windowHeight - this.props.imagePadding * 2;
        var maxWidth = windowWidth - this.props.imagePadding * 2;

        if (!stretch) {
            maxHeight = Math.min(maxHeight, height);
            maxWidth = Math.min(maxWidth, width);
        }

        var maxRatio = maxWidth / maxHeight;
        var srcRatio = width / height;

        var fitSizes = {};
        if (maxRatio > srcRatio) {
            // height is the constraining dimension of the photo
            fitSizes.width = width * maxHeight / height;
            fitSizes.height = maxHeight;
        } else {
            fitSizes.width = maxWidth;
            fitSizes.height = height * maxWidth / width;
        }

        return fitSizes;
    },

    // Get sizing when the image is scaled
    getZoomMultiplier: function getZoomMultiplier(zoomLevel) {
        zoomLevel = typeof zoomLevel !== 'undefined' ? zoomLevel : this.state.zoomLevel;
        return Math.pow(Constant.ZOOM_RATIO, zoomLevel);
    },

    getMaxOffsets: function getMaxOffsets(zoomLevel) {
        zoomLevel = typeof zoomLevel !== 'undefined' ? zoomLevel : this.state.zoomLevel;
        var currentImageInfo = this.getBestImageForType('mainSrc');
        if (currentImageInfo === null) {
            return { maxX: 0, minX: 0, maxY: 0, minY: 0 };
        }

        var windowWidth = _getWindowWidth();
        var windowHeight = _getWindowHeight();
        var zoomMultiplier = this.getZoomMultiplier(zoomLevel);

        var maxX = 0;
        if (currentImageInfo.width - windowWidth / zoomMultiplier < 0) {
            // if there is still blank space in the X dimension, don't limit except to the opposite edge
            maxX = (windowWidth / zoomMultiplier - currentImageInfo.width) / 2;
        } else {
            maxX = (currentImageInfo.width - windowWidth / zoomMultiplier) / 2;
        }

        var maxY = 0;
        if (currentImageInfo.height - windowHeight / zoomMultiplier < 0) {
            // if there is still blank space in the Y dimension, don't limit except to the opposite edge
            maxY = (windowHeight / zoomMultiplier - currentImageInfo.height) / 2;
        } else {
            maxY = (currentImageInfo.height - windowHeight / zoomMultiplier) / 2;
        }

        return {
            maxX: maxX,
            minX: -1 * maxX,
            maxY: maxY,
            minY: -1 * maxY
        };
    },

    // Detach key and mouse input events
    isAnimating: function isAnimating() {
        return this.state.shouldAnimate || this.state.isClosing;
    },

    // Load image from src and call callback with image width and height on load
    loadImage: function loadImage(imageSrc, callback) {
        // Return the image info if it is already cached
        if (this.isImageLoaded(imageSrc)) {
            setTimeout(function () {
                callback(null, this.imageCache[imageSrc].width, this.imageCache[imageSrc].height);
            }, 1);
            return;
        }

        var that = this;
        var inMemoryImage = new Image();

        inMemoryImage.onerror = function () {
            callback('image load error');
        };

        inMemoryImage.onload = function () {
            that.imageCache[imageSrc] = {
                loaded: true,
                width: this.width,
                height: this.height
            };

            callback(null, this.width, this.height);
        };

        inMemoryImage.src = imageSrc;
    },

    // Load all images and their thumbnails
    loadAllImages: function loadAllImages(props) {
        props = props || this.props;
        var generateImageLoadedCallback = (function (srcType, imageSrc) {
            return (function (err) {
                // Give up showing image on error
                if (err) {
                    if (window.console) {
                        window.console.warn(err);
                    }
                    return;
                }

                // Don't rerender if the src is not the same as when the load started
                if (this.props[srcType] != imageSrc) {
                    return;
                }

                // Force rerender with the new image
                this.forceUpdate();
            }).bind(this);
        }).bind(this);

        // Load the images
        this.getSrcTypes().forEach((function (srcType) {
            var type = srcType.name;

            // Load unloaded images
            if (props[type] && !this.isImageLoaded(props[type])) {
                this.loadImage(props[type], generateImageLoadedCallback(type, props[type]));
            }
        }).bind(this));
    },

    // Load image from src and call callback with image width and height on load
    isImageLoaded: function isImageLoaded(imageSrc) {
        return imageSrc && imageSrc in this.imageCache && this.imageCache[imageSrc].loaded;
    },

    // Get info for the best suited image to display with the given srcType
    getBestImageForType: function getBestImageForType(srcType) {
        var imageSrc = this.props[srcType];
        var fitSizes = {};

        if (this.isImageLoaded(imageSrc)) {
            // Use full-size image if available
            fitSizes = this.getFitSizes(this.imageCache[imageSrc].width, this.imageCache[imageSrc].height);
        } else if (this.isImageLoaded(this.props[srcType + 'Thumbnail'])) {
            // Fall back to using thumbnail if the image has not been loaded
            imageSrc = this.props[srcType + 'Thumbnail'];
            fitSizes = this.getFitSizes(this.imageCache[imageSrc].width, this.imageCache[imageSrc].height, true);
        } else {
            return null;
        }

        return {
            src: imageSrc,
            height: fitSizes.height,
            width: fitSizes.width
        };
    },

    render: function render() {
        // Transition settings for sliding animations
        var transitionStyle = {};
        if (!this.props.animationDisabled && this.isAnimating()) {
            transitionStyle = Styles.imageAnimating(this.props.animationDuration);
        }

        // Key endings to differentiate between images with the same src
        var keyEndings = {};
        this.getSrcTypes().forEach(function (srcType) {
            keyEndings[srcType.name] = srcType.keyEnding;
        });

        // Images to be displayed
        var images = [];
        var addImage = (function (srcType, imageClass, baseStyle) {
            // Ignore types that have no source defined for their full size image
            if (!this.props[srcType]) {
                return;
            }

            var imageStyle = [Styles.image, baseStyle, transitionStyle];
            if (this.state.zoomLevel > Constant.MIN_ZOOM_LEVEL) {
                imageStyle.push({ cursor: 'move' });
            }

            var bestImageInfo = this.getBestImageForType(srcType);
            if (bestImageInfo === null) {
                // Fall back to loading icon if the thumbnail has not been loaded
                images.push(React.createElement('div', {
                    className: imageClass + ' not-loaded',
                    style: imageStyle,
                    key: this.props[srcType] + keyEndings[srcType]
                }));

                return;
            }

            imageStyle.push({
                width: bestImageInfo.width,
                height: bestImageInfo.height
            });

            var imageSrc = bestImageInfo.src;
            if (this.props.discourageDownloads) {
                imageStyle.push({ backgroundImage: 'url(\'' + imageSrc + '\')' });
                imageStyle.push(Styles.imageDiscourager);
                images.push(React.createElement(
                    'div',
                    {
                        className: imageClass,
                        onDoubleClick: this.handleImageDoubleClick,
                        onWheel: this.handleImageMouseWheel,
                        style: imageStyle,
                        key: imageSrc + keyEndings[srcType]
                    },
                    React.createElement('div', { className: 'download-blocker', style: [Styles.downloadBlocker] })
                ));
            } else {
                images.push(React.createElement('img', {
                    className: imageClass,
                    onDoubleClick: this.handleImageDoubleClick,
                    onWheel: this.handleImageMouseWheel,
                    style: imageStyle,
                    src: imageSrc,
                    key: imageSrc + keyEndings[srcType]
                }));
            }
        }).bind(this);

        var zoomMultiplier = this.getZoomMultiplier();
        // Next Image (displayed on the right)
        addImage('nextSrc', 'image-next', Styles.imageNext);
        // Main Image
        addImage('mainSrc', 'image-current', Styles.imageCurrent(zoomMultiplier, zoomMultiplier * this.state.offsetX, zoomMultiplier * this.state.offsetY));
        // Previous Image (displayed on the left)
        addImage('prevSrc', 'image-prev', Styles.imagePrev);

        var noop = function noop() {};

        // Prepare styles and handlers for the zoom in/out buttons
        var zoomInButtonStyle = [Styles.toolbarItemChild, Styles.builtinButton, Styles.zoomInButton];
        var zoomOutButtonStyle = [Styles.toolbarItemChild, Styles.builtinButton, Styles.zoomOutButton];
        var zoomInButtonHandler = this.handleZoomInButtonClick;
        var zoomOutButtonHandler = this.handleZoomOutButtonClick;

        // Disable zooming in when zoomed all the way in
        if (this.state.zoomLevel === Constant.MAX_ZOOM_LEVEL) {
            zoomInButtonStyle.push(Styles.builtinButtonDisabled);
            zoomInButtonHandler = noop;
        }

        // Disable zooming out when zoomed all the way out
        if (this.state.zoomLevel === Constant.MIN_ZOOM_LEVEL) {
            zoomOutButtonStyle.push(Styles.builtinButtonDisabled);
            zoomOutButtonHandler = noop;
        }

        // Ignore clicks during animation
        if (this.isAnimating()) {
            zoomInButtonHandler = noop;
            zoomOutButtonHandler = noop;
        }

        return React.createElement(
            Portal,
            null,
            React.createElement(
                StyleRoot,
                null,
                React.createElement(
                    'div',
                    { // Floating modal with closing animations
                        className: 'outer' + (this.state.isClosing ? ' closing' : ''),
                        onWheel: this.handleOuterMousewheel,
                        onMouseMove: this.handleOuterMouseMove,
                        onMouseDown: this.handleOuterMouseDown,
                        onMouseUp: this.handleOuterMouseUp,
                        style: [Styles.outer, Styles.outerAnimating(this.props.animationDuration, this.state.isClosing), this.state.isClosing ? Styles.outerClosing : {}]
                    },
                    React.createElement(
                        'div',
                        { // Image holder
                            className: 'inner',
                            style: [Styles.inner]
                        },
                        images
                    ),
                    !this.props.prevSrc ? '' : React.createElement('button', { // Move to previous image button
                        type: 'button',
                        className: 'prev-button',
                        key: 'prev',
                        style: [Styles.navButtons, Styles.navButtonPrev],
                        onClick: !this.isAnimating() ? this.requestMovePrev : noop // Ignore clicks during animation
                    }),
                    !this.props.nextSrc ? '' : React.createElement('button', { // Move to next image button
                        type: 'button',
                        className: 'next-button',
                        key: 'next',
                        style: [Styles.navButtons, Styles.navButtonNext],
                        onClick: !this.isAnimating() ? this.requestMoveNext : noop // Ignore clicks during animation
                    }),
                    React.createElement(
                        'div',
                        { // Lightbox toolbar
                            className: 'toolbar',
                            style: [Styles.toolbar]
                        },
                        React.createElement(
                            'ul',
                            { className: 'toolbar-left', style: [Styles.toolbarSide, Styles.toolbarLeftSide] },
                            React.createElement(
                                'li',
                                { style: [Styles.toolbarItem] },
                                React.createElement(
                                    'span',
                                    { style: [Styles.toolbarItemChild] },
                                    this.props.imageTitle
                                )
                            )
                        ),
                        React.createElement(
                            'ul',
                            { className: 'toolbar-right', style: [Styles.toolbarSide, Styles.toolbarRightSide] },
                            !this.props.toolbarButtons ? '' : this.props.toolbarButtons.map(function (button, i) {
                                return React.createElement(
                                    'li',
                                    { key: i, style: [Styles.toolbarItem] },
                                    button
                                );
                            }),
                            React.createElement(
                                'li',
                                { style: [Styles.toolbarItem] },
                                React.createElement('button', { // Lightbox zoom in button
                                    type: 'button',
                                    key: 'zoom-in',
                                    className: 'zoom-in',
                                    style: zoomInButtonStyle,
                                    onClick: zoomInButtonHandler
                                })
                            ),
                            React.createElement(
                                'li',
                                { style: [Styles.toolbarItem] },
                                React.createElement('button', { // Lightbox zoom out button
                                    type: 'button',
                                    key: 'zoom-out',
                                    className: 'zoom-out',
                                    style: zoomOutButtonStyle,
                                    onClick: zoomOutButtonHandler
                                })
                            ),
                            React.createElement(
                                'li',
                                { style: [Styles.toolbarItem] },
                                React.createElement('button', { // Lightbox close button
                                    type: 'button',
                                    key: 'close',
                                    className: 'close',
                                    style: [Styles.toolbarItemChild, Styles.builtinButton, Styles.closeButton],
                                    onClick: !this.isAnimating() ? this.requestClose : noop // Ignore clicks during animation
                                })
                            )
                        )
                    )
                )
            )
        );
    }
});

module.exports = Radium.call(undefined, ReactImageLightbox);

},{"./Constant":1,"./Portal":2,"./Styles":3,"radium":undefined,"react":undefined}]},{},[]);
