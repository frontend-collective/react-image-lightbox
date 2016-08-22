/*
 * react-image-lightbox
 * Copyright 2016 Chris Fritz All rights reserved.
 * @license Open source under the MIT License
 */

import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import {
    translate,
    getWindowWidth,
    getWindowHeight,
    isInIframe,
    getIEVersion,
} from './util';
import {
    KEYS,
    MIN_ZOOM_LEVEL,
    MAX_ZOOM_LEVEL,
    ZOOM_RATIO,
    WHEEL_MOVE_X_THRESHOLD,
    WHEEL_MOVE_Y_THRESHOLD,
    ZOOM_BUTTON_INCREMENT_SIZE,
} from './constant';
import baseStyles from './style.scss';

// Add fallback classes for browsers without flexbox support
let styles = baseStyles;
const _ieVersion = getIEVersion();
if (_ieVersion < 10) {
    styles = {
        ...styles,
        toolbarSide:      `${styles.toolbarSide} ${styles.toolbarSideNoFlex}`,
        toolbarLeftSide:  `${styles.toolbarLeftSide} ${styles.toolbarLeftSideNoFlex}`,
        toolbarRightSide: `${styles.toolbarRightSide} ${styles.toolbarRightSideNoFlex}`,
    };
}

class ReactImageLightbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //-----------------------------
            // Animation
            //-----------------------------

            // Lightbox is closing
            // When Lightbox is mounted, if animation is enabled it will open with the reverse of the closing animation
            isClosing: !props.animationDisabled,

            // Component parts should animate (e.g., when images are moving, or image is being zoomed)
            shouldAnimate: false,

            //-----------------------------
            // Zoom settings
            //-----------------------------
            // Zoom level of image
            zoomLevel: MIN_ZOOM_LEVEL,

            //-----------------------------
            // Image position settings
            //-----------------------------
            // Horizontal offset from center
            offsetX: 0,

            // Vertical offset from center
            offsetY: 0,
        };

        this.closeIfClickInner        = this.closeIfClickInner.bind(this);
        this.handleImageDoubleClick   = this.handleImageDoubleClick.bind(this);
        this.handleImageMouseWheel    = this.handleImageMouseWheel.bind(this);
        this.handleKeyInput           = this.handleKeyInput.bind(this);
        this.handleMouseUp            = this.handleMouseUp.bind(this);
        this.handleOuterMouseDown     = this.handleOuterMouseDown.bind(this);
        this.handleOuterMouseMove     = this.handleOuterMouseMove.bind(this);
        this.handleOuterMousewheel    = this.handleOuterMousewheel.bind(this);
        this.handleOuterTouchStart    = this.handleOuterTouchStart.bind(this);
        this.handleOuterTouchMove     = this.handleOuterTouchMove.bind(this);
        this.handleWindowResize       = this.handleWindowResize.bind(this);
        this.handleZoomInButtonClick  = this.handleZoomInButtonClick.bind(this);
        this.handleZoomOutButtonClick = this.handleZoomOutButtonClick.bind(this);
        this.requestClose             = this.requestClose.bind(this);
        this.requestMoveNext          = this.requestMoveNext.bind(this);
        this.requestMovePrev          = this.requestMovePrev.bind(this);
    }

    componentWillMount() {
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
        this.scrollX            = 0;
        this.scrollY            = 0;

        // Used in panning zoomed images
        this.isDragging       = false;
        this.dragStartX       = 0;
        this.dragStartY       = 0;
        this.dragStartOffsetX = 0;
        this.dragStartOffsetY = 0;

        // Used to differentiate between images with identical src
        this.keyCounter = 0;

        // Used to detect a move when all src's remain unchanged (four or more of the same image in a row)
        this.moveRequested = false;

        if (!this.props.animationDisabled) {
            // Make opening animation play
            this.setState({ isClosing: false });
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.attachListeners();

        this.loadAllImages();
    }

    componentWillReceiveProps(nextProps) {
        // Iterate through the source types for prevProps and nextProps to
        //  determine if any of the sources changed
        let sourcesChanged = false;
        const prevSrcDict = {};
        const nextSrcDict = {};
        this.getSrcTypes().forEach(srcType => {
            if (this.props[srcType.name] !== nextProps[srcType.name]) {
                sourcesChanged = true;

                prevSrcDict[this.props[srcType.name]] = true;
                nextSrcDict[nextProps[srcType.name]] = true;
            }
        });

        if (sourcesChanged || this.moveRequested) {
            // Reset the loaded state for images not rendered next
            Object.keys(prevSrcDict).forEach(prevSrc => {
                if (!(prevSrc in nextSrcDict) && (prevSrc in this.imageCache)) {
                    this.imageCache[prevSrc].loaded = false;
                }
            });

            this.moveRequested = false;

            // Load any new images
            this.loadAllImages(nextProps);
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        this.detachListeners();
    }

    // Attach key and mouse input events
    attachListeners() {
        if (!this.listenersAttached) {
            window.addEventListener('resize', this.handleWindowResize);
            window.addEventListener('mouseup', this.handleMouseUp);
            window.addEventListener('touchend', this.handleMouseUp);

            // Have to add an extra mouseup handler to catch mouseup events outside of the window
            //  if the page containing the lightbox is displayed in an iframe
            if (isInIframe()) {
                window.top.addEventListener('mouseup', this.handleMouseUp);
                window.top.addEventListener('touchend', this.handleMouseUp);
            }

            this.listenersAttached = true;
        }
    }

    // Change zoom level
    changeZoom(zoomLevel, clientX, clientY) {
        const windowWidth  = getWindowWidth();
        const windowHeight = getWindowHeight();

        // Constrain zoom level to the set bounds
        const nextZoomLevel = Math.max(MIN_ZOOM_LEVEL, Math.min(MAX_ZOOM_LEVEL, zoomLevel));

        // Ignore requests that don't change the zoom level
        if (nextZoomLevel === this.state.zoomLevel) {
            return;
        } else if (nextZoomLevel === MIN_ZOOM_LEVEL) {
            // Snap back to center if zoomed all the way out
            return this.setState({
                zoomLevel: nextZoomLevel,
                offsetX:   0,
                offsetY:   0,
            });
        }

        const currentZoomMultiplier = this.getZoomMultiplier();
        const nextZoomMultiplier    = this.getZoomMultiplier(nextZoomLevel);

        // Default to the center of the screen to zoom when no mouse position specified
        const percentXInCurrentBox = (typeof clientX !== 'undefined' ? clientX : windowWidth / 2) / windowWidth;
        const percentYInCurrentBox = (typeof clientY !== 'undefined' ? clientY : windowHeight / 2) / windowHeight;

        const currentBoxWidth  = windowWidth / currentZoomMultiplier;
        const currentBoxHeight = windowHeight / currentZoomMultiplier;

        const nextBoxWidth  = windowWidth / nextZoomMultiplier;
        const nextBoxHeight = windowHeight / nextZoomMultiplier;

        const deltaX = (nextBoxWidth - currentBoxWidth) * (percentXInCurrentBox - 0.5);
        const deltaY = (nextBoxHeight - currentBoxHeight) * (percentYInCurrentBox - 0.5);

        let nextOffsetX = this.state.offsetX - deltaX;
        let nextOffsetY = this.state.offsetY - deltaY;

        // When zooming out, limit the offset so things don't get left askew
        const maxOffsets = this.getMaxOffsets();
        if (this.state.zoomLevel > nextZoomLevel) {
            nextOffsetX = Math.max(maxOffsets.minX, Math.min(maxOffsets.maxX, nextOffsetX));
            nextOffsetY = Math.max(maxOffsets.minY, Math.min(maxOffsets.maxY, nextOffsetY));
        }

        this.setState({
            zoomLevel: nextZoomLevel,
            offsetX:   nextOffsetX,
            offsetY:   nextOffsetY,
        });
    }

    closeIfClickInner(event) {
        if (event.target.className.search(/\binner\b/) > -1) {
            this.requestClose(event);
        }
    }

    // Detach key and mouse input events
    detachListeners() {
        if (this.listenersAttached) {
            window.removeEventListener('resize', this.handleWindowResize);
            window.removeEventListener('mouseup', this.handleMouseUp);
            window.removeEventListener('touchend', this.handleMouseUp);

            if (isInIframe()) {
                window.top.removeEventListener('mouseup', this.handleMouseUp);
                window.top.removeEventListener('touchend', this.handleMouseUp);
            }

            this.listenersAttached = false;
        }
    }

    // Get info for the best suited image to display with the given srcType
    getBestImageForType(srcType) {
        let imageSrc = this.props[srcType];
        let fitSizes = {};

        if (this.isImageLoaded(imageSrc)) {
            // Use full-size image if available
            fitSizes = this.getFitSizes(this.imageCache[imageSrc].width, this.imageCache[imageSrc].height);
        } else if (this.isImageLoaded(this.props[`${srcType}Thumbnail`])) {
            // Fall back to using thumbnail if the image has not been loaded
            imageSrc = this.props[`${srcType}Thumbnail`];
            fitSizes = this.getFitSizes(this.imageCache[imageSrc].width, this.imageCache[imageSrc].height, true);
        } else {
            return null;
        }

        return {
            src:    imageSrc,
            height: fitSizes.height,
            width:  fitSizes.width,
        };
    }

    // Get sizing for when an image is larger than the window
    getFitSizes(width, height, stretch) {
        const windowHeight = getWindowHeight();
        const windowWidth  = getWindowWidth();
        let maxHeight      = windowHeight - (this.props.imagePadding * 2);
        let maxWidth       = windowWidth - (this.props.imagePadding * 2);

        if (!stretch) {
            maxHeight = Math.min(maxHeight, height);
            maxWidth  = Math.min(maxWidth, width);
        }

        const maxRatio = maxWidth / maxHeight;
        const srcRatio = width / height;

        const fitSizes = {};
        if (maxRatio > srcRatio) { // height is the constraining dimension of the photo
            fitSizes.width  = width * maxHeight / height;
            fitSizes.height = maxHeight;
        } else {
            fitSizes.width  = maxWidth;
            fitSizes.height = height * maxWidth / width;
        }

        return fitSizes;
    }

    getMaxOffsets(zoomLevel = this.state.zoomLevel) {
        const currentImageInfo = this.getBestImageForType('mainSrc');
        if (currentImageInfo === null) {
            return { maxX: 0, minX: 0, maxY: 0, minY: 0 };
        }

        const windowWidth    = getWindowWidth();
        const windowHeight   = getWindowHeight();
        const zoomMultiplier = this.getZoomMultiplier(zoomLevel);

        let maxX = 0;
        if (currentImageInfo.width - (windowWidth / zoomMultiplier) < 0) {
            // if there is still blank space in the X dimension, don't limit except to the opposite edge
            maxX = ((windowWidth / zoomMultiplier) - currentImageInfo.width) / 2;
        } else {
            maxX = (currentImageInfo.width - (windowWidth / zoomMultiplier)) / 2;
        }

        let maxY = 0;
        if (currentImageInfo.height - (windowHeight / zoomMultiplier) < 0) {
            // if there is still blank space in the Y dimension, don't limit except to the opposite edge
            maxY = ((windowHeight / zoomMultiplier) - currentImageInfo.height) / 2;
        } else {
            maxY = (currentImageInfo.height - (windowHeight / zoomMultiplier)) / 2;
        }

        return {
            maxX,
            maxY,
            minX: -1 * maxX,
            minY: -1 * maxY,
        };
    }

    getOffsetXFromWindowCenter(x) {
        const windowWidth  = getWindowWidth();
        return (windowWidth / 2) - x;
    }

    getOffsetYFromWindowCenter(y) {
        const windowHeight = getWindowHeight();
        return (windowHeight / 2) - y;
    }

    // Get image src types
    getSrcTypes() {
        return [
            {
                name:      'mainSrc',
                keyEnding: `i${this.keyCounter}`,
            },
            {
                name:      'mainSrcThumbnail',
                keyEnding: `t${this.keyCounter}`,
            },
            {
                name:      'nextSrc',
                keyEnding: `i${this.keyCounter + 1}`,
            },
            {
                name:      'nextSrcThumbnail',
                keyEnding: `t${this.keyCounter + 1}`,
            },
            {
                name:      'prevSrc',
                keyEnding: `i${this.keyCounter - 1}`,
            },
            {
                name:      'prevSrcThumbnail',
                keyEnding: `t${this.keyCounter - 1}`,
            },
        ];
    }

    // Get sizing when the image is scaled
    getZoomMultiplier(zoomLevel = this.state.zoomLevel) {
        return Math.pow(ZOOM_RATIO, zoomLevel);
    }

    // Handle user keyboard actions
    handleKeyInput(event) {
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

        const keyCode = event.which || event.keyCode;

        // Ignore key presses that happen too close to each other (when rapid fire key pressing or holding down the key)
        // But allow it if it's a lightbox closing action
        const currentTime = new Date();
        if ((currentTime.getTime() - this.lastKeyDownTime) < this.props.keyRepeatLimit &&
            keyCode !== KEYS.ESC
        ) {
            return;
        }
        this.lastKeyDownTime = currentTime.getTime();

        switch (keyCode) {
        // ESC key closes the lightbox
        case KEYS.ESC:
            event.preventDefault();
            this.requestClose(event);
            break;

        // Left arrow key moves to previous image
        case KEYS.LEFT_ARROW:
            if (!this.props.prevSrc) {
                return;
            }

            event.preventDefault();
            this.keyPressed = true;
            this.requestMovePrev(event);
            break;

        // Right arrow key moves to next image
        case KEYS.RIGHT_ARROW:
            if (!this.props.nextSrc) {
                return;
            }

            event.preventDefault();
            this.keyPressed = true;
            this.requestMoveNext(event);
            break;

        default:
        }
    }

    // Handle a mouse wheel event over the lightbox container
    handleOuterMousewheel(event) {
        // Prevent scrolling of the background
        event.preventDefault();
        event.stopPropagation();

        const xThreshold = WHEEL_MOVE_X_THRESHOLD;
        let actionDelay = 0;
        const imageMoveDelay = 500;

        clearTimeout(this.resetScrollTimeout);
        this.resetScrollTimeout = setTimeout(() => {
            this.scrollX = 0;
            this.scrollY = 0;
        }, 300);

        // Prevent rapid-fire zoom behavior
        if (this.wheelActionTimeout !== null || this.isAnimating()) {
            return;
        }

        if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
            // handle horizontal scrolls with image moves
            this.scrollY = 0;
            this.scrollX += event.deltaX;

            const bigLeapX = xThreshold / 2;
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
            this.wheelActionTimeout = setTimeout(() => {
                this.wheelActionTimeout = null;
            }, actionDelay);
        }
    }

    handleImageMouseWheel(event) {
        event.preventDefault();
        const yThreshold = WHEEL_MOVE_Y_THRESHOLD;

        if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
            event.stopPropagation();
            // If the vertical scroll amount was large enough, perform a zoom
            if (Math.abs(event.deltaY) < yThreshold) {
                return;
            }

            this.scrollX = 0;
            this.scrollY += event.deltaY;

            this.changeZoom(
                this.state.zoomLevel - event.deltaY,
                event.clientX,
                event.clientY
            );
        }
    }

    // Handle a double click on the current image
    handleImageDoubleClick(event) {
        if (this.state.zoomLevel > MIN_ZOOM_LEVEL) {
            // A double click when zoomed in zooms all the way out
            this.changeZoom(
                MIN_ZOOM_LEVEL,
                event.clientX,
                event.clientY
            );
        } else {
            // A double click when zoomed all the way out zooms in
            this.changeZoom(
                this.state.zoomLevel + ZOOM_BUTTON_INCREMENT_SIZE,
                event.clientX,
                event.clientY
            );
        }
    }

    // Handle a mouse click ending in the lightbox container
    handleMouseUp() {
        if (!this.isDragging) {
            return;
        }

        this.isDragging = false;

        // Snap image back into frame if outside max offset range
        const maxOffsets = this.getMaxOffsets();
        const nextOffsetX = Math.max(maxOffsets.minX, Math.min(maxOffsets.maxX, this.state.offsetX));
        const nextOffsetY = Math.max(maxOffsets.minY, Math.min(maxOffsets.maxY, this.state.offsetY));
        if (nextOffsetX !== this.state.offsetX || nextOffsetY !== this.state.offsetY) {
            this.setState({
                offsetX:       nextOffsetX,
                offsetY:       nextOffsetY,
                shouldAnimate: true,
            });

            setTimeout(() => {
                this.setState({ shouldAnimate: false });
            }, this.props.animationDuration);
        }
    }

    // Handle move start over the lightbox container
    // This happens:
    // - On a mouseDown event
    // - On a touchstart event
    handleMoveStart(clientX, clientY) {
        // Only allow dragging when zoomed
        if (this.state.zoomLevel <= MIN_ZOOM_LEVEL) {
            return;
        }

        this.isDragging       = true;
        this.dragStartX       = clientX;
        this.dragStartY       = clientY;
        this.dragStartOffsetX = this.state.offsetX;
        this.dragStartOffsetY = this.state.offsetY;
    }

    // Handle the mouse clicking down in the lightbox container
    handleOuterMouseDown(event) {
        event.preventDefault();
        this.handleMoveStart(event.clientX, event.clientY);
    }

    // Touch screen version of handleOuterMouseDown()
    handleOuterTouchStart(event) {
        const touchObj = event.changedTouches[0];
        this.handleMoveStart(parseInt(touchObj.clientX, 10), parseInt(touchObj.clientY, 10));
    }

    // Handle dragging over the lightbox container
    // This happens:
    // - After a mouseDown and before a mouseUp event
    // - After a touchstart and before a touchend event
    handleMove(clientX, clientY) {
        if (!this.isDragging) {
            return;
        }

        const zoomMultiplier = this.getZoomMultiplier();

        const newOffsetX = ((this.dragStartX - clientX) / zoomMultiplier) + this.dragStartOffsetX;
        const newOffsetY = ((this.dragStartY - clientY) / zoomMultiplier) + this.dragStartOffsetY;
        if (this.state.offsetX !== newOffsetX || this.state.offsetY !== newOffsetY) {
            this.setState({
                offsetX: newOffsetX,
                offsetY: newOffsetY,
            });
        }
    }

    // Handle the mouse dragging over the lightbox container
    // (after a mouseDown and before a mouseUp event)
    handleOuterMouseMove(event) {
        this.handleMove(event.clientX, event.clientY);
    }

    // Touch screen version of handleOuterMouseMove()
    handleOuterTouchMove(event) {
        event.preventDefault();

        // We shouldn't go any further if we're not zoomed
        if (this.state.zoomLevel <= MIN_ZOOM_LEVEL) {
            return;
        }

        const touchObj = event.changedTouches[0];
        this.handleMove(parseInt(touchObj.clientX, 10), parseInt(touchObj.clientY, 10));
    }

    // Handle the window resize event
    handleWindowResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(this.forceUpdate.bind(this), 100);
    }

    handleZoomInButtonClick() {
        this.changeZoom(this.state.zoomLevel + ZOOM_BUTTON_INCREMENT_SIZE);
    }

    handleZoomOutButtonClick() {
        this.changeZoom(this.state.zoomLevel - ZOOM_BUTTON_INCREMENT_SIZE);
    }

    // Detach key and mouse input events
    isAnimating() {
        return this.state.shouldAnimate || this.state.isClosing;
    }

    // Check if image is loaded
    isImageLoaded(imageSrc) {
        return imageSrc && (imageSrc in this.imageCache) && this.imageCache[imageSrc].loaded;
    }

    // Load image from src and call callback with image width and height on load
    loadImage(imageSrc, callback) {
        // Return the image info if it is already cached
        if (this.isImageLoaded(imageSrc)) {
            setTimeout(() => {
                callback(null, this.imageCache[imageSrc].width, this.imageCache[imageSrc].height);
            }, 1);
            return;
        }

        const that = this;
        const inMemoryImage = new Image();

        inMemoryImage.onerror = function onError() {
            callback('image load error');
        };

        inMemoryImage.onload = function onLoad() {
            that.imageCache[imageSrc] = {
                loaded: true,
                width:  this.width,
                height: this.height,
            };

            callback(null, this.width, this.height);
        };

        inMemoryImage.src = imageSrc;
    }

    // Load all images and their thumbnails
    loadAllImages(props = this.props) {
        const generateImageLoadedCallback = (srcType, imageSrc) => err => {
            // Give up showing image on error
            if (err) {
                if (window.console) {
                    window.console.warn(err);
                }
                return;
            }

            // Don't rerender if the src is not the same as when the load started
            // or if the component has unmounted
            if (this.props[srcType] !== imageSrc || !this.mounted) {
                return;
            }

            // Force rerender with the new image
            this.forceUpdate();
        };

        // Load the images
        this.getSrcTypes().forEach(srcType => {
            const type = srcType.name;

            // Load unloaded images
            if (props[type] && !this.isImageLoaded(props[type])) {
                this.loadImage(props[type], generateImageLoadedCallback(type, props[type]));
            }
        });
    }

    // Request that the lightbox be closed
    requestClose(event) {
        // Call the parent close request
        const closeLightbox = () => this.props.onCloseRequest(event);

        if (this.props.animationDisabled ||
            (event.type === 'keydown' && !this.props.animationOnKeyInput)
        ) {
            // No animation
            return closeLightbox();
        }

        // With animation
        // Start closing animation
        this.setState({ isClosing: true });

        // Perform the actual closing at the end of the animation
        setTimeout(closeLightbox, this.props.animationDuration);
    }

    requestMove(direction, event) {
        // Reset the zoom level on image move
        const nextState = {
            zoomLevel: MIN_ZOOM_LEVEL,
            offsetX:   0,
            offsetY:   0,
        };

        // Enable animated states
        if (!this.props.animationDisabled && (!this.keyPressed || this.props.animationOnKeyInput)) {
            nextState.shouldAnimate = true;
            setTimeout(
                () => this.setState({ shouldAnimate: false }),
                this.props.animationDuration
            );
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
    }

    // Request to transition to the next image
    requestMoveNext(event) {
        this.requestMove('next', event);
    }

    // Request to transition to the previous image
    requestMovePrev(event) {
        this.requestMove('prev', event);
    }

    render() {
        let transitionStyle = {};

        // Transition settings for sliding animations
        if (!this.props.animationDisabled && this.isAnimating()) {
            transitionStyle = {
                ...transitionStyle,
                transition: ['transform', 'left', 'top', 'right', 'bottom']
                    .map(x => `${x} ${this.props.animationDuration}ms`)
                    .join(', '),
            };
        }

        // Key endings to differentiate between images with the same src
        const keyEndings = {};
        this.getSrcTypes().forEach(({ name, keyEnding }) => {
            keyEndings[name] = keyEnding;
        });

        // Images to be displayed
        let images = [];
        const addImage = (srcType, imageClass, baseStyle = {}) => {
            // Ignore types that have no source defined for their full size image
            if (!this.props[srcType]) {
                return;
            }

            let imageStyle = { ...baseStyle, ...transitionStyle };
            if (this.state.zoomLevel > MIN_ZOOM_LEVEL) {
                imageStyle.cursor = 'move';
            }

            const bestImageInfo = this.getBestImageForType(srcType);
            if (bestImageInfo === null) {
                let loadingIcon;
                if (_ieVersion < 10) {
                    loadingIcon = (
                        <div className={styles.loadingContainer__icon}>
                            {translate('Loading...')}
                        </div>
                    );
                } else {
                    loadingIcon = (
                        <div className={`ril-loading-circle ${styles.loadingCircle} ${styles.loadingContainer__icon}`}>
                            <div className={`ril-loading-circle-point ${styles.loadingCirclePoint}`} />
                            <div className={`ril-loading-circle-point ${styles.loadingCirclePoint}`} />
                            <div className={`ril-loading-circle-point ${styles.loadingCirclePoint}`} />
                            <div className={`ril-loading-circle-point ${styles.loadingCirclePoint}`} />
                            <div className={`ril-loading-circle-point ${styles.loadingCirclePoint}`} />
                            <div className={`ril-loading-circle-point ${styles.loadingCirclePoint}`} />
                            <div className={`ril-loading-circle-point ${styles.loadingCirclePoint}`} />
                            <div className={`ril-loading-circle-point ${styles.loadingCirclePoint}`} />
                            <div className={`ril-loading-circle-point ${styles.loadingCirclePoint}`} />
                            <div className={`ril-loading-circle-point ${styles.loadingCirclePoint}`} />
                            <div className={`ril-loading-circle-point ${styles.loadingCirclePoint}`} />
                            <div className={`ril-loading-circle-point ${styles.loadingCirclePoint}`} />
                        </div>
                    );
                }

                // Fall back to loading icon if the thumbnail has not been loaded
                images.push(
                    <div
                        className={`${imageClass} ${styles.image} not-loaded ril-not-loaded`}
                        style={imageStyle}
                        key={this.props[srcType] + keyEndings[srcType]}
                    >
                        <div className={styles.loadingContainer} >
                            {loadingIcon}
                        </div>
                    </div>
                );

                return;
            }

            imageStyle.width  = bestImageInfo.width;
            imageStyle.height = bestImageInfo.height;

            const imageSrc = bestImageInfo.src;
            if (this.props.discourageDownloads) {
                imageStyle.backgroundImage = `url('${imageSrc}')`;
                images.push(
                    <div
                        className={`${imageClass} ${styles.image} ${styles.imageDiscourager}`}
                        onDoubleClick={this.handleImageDoubleClick}
                        onWheel={this.handleImageMouseWheel}
                        style={imageStyle}
                        key={imageSrc + keyEndings[srcType]}
                    >
                        <div className={`download-blocker ril-download-blocker ${styles.downloadBlocker}`} />
                    </div>
                );
            } else {
                let image = (<img
                    className={`${imageClass} ${styles.image}`}
                    onDoubleClick={this.handleImageDoubleClick}
                    onWheel={this.handleImageMouseWheel}
                    style={imageStyle}
                    src={imageSrc}
                    key={imageSrc + keyEndings[srcType]}
                    alt={this.props.imageTitle || translate('Image')}
                />);

                if (this.props.mainImageWrapper) {
                    image = this.props.mainImageWrapper(image);
                }

                images.push(image);
            }
        };

        const zoomMultiplier = this.getZoomMultiplier();
        const zoomStyle = _ieVersion < 10 ?
            { msTransform: `scale(${zoomMultiplier})`} :
            { transform: `scale3d(${zoomMultiplier}, ${zoomMultiplier}, 1)` };

        // Next Image (displayed on the right)
        addImage('nextSrc', `image-next ril-image-next ${styles.imageNext}`);
        // Main Image
        addImage(
            'mainSrc',
            'image-current ril-image-current',
            {
                ...zoomStyle,
                left:  -1 * zoomMultiplier * this.state.offsetX,
                right: zoomMultiplier * this.state.offsetX,
                top: -1 * zoomMultiplier * this.state.offsetY,
                bottom: zoomMultiplier * this.state.offsetY,
            }
        );
        // Previous Image (displayed on the left)
        addImage('prevSrc', `image-prev ril-image-prev ${styles.imagePrev}`);

        const noop = () => {};

        // Prepare styles and handlers for the zoom in/out buttons
        const zoomInButtonClasses  = [styles.toolbarItemChild, styles.builtinButton, styles.zoomInButton];
        const zoomOutButtonClasses = [styles.toolbarItemChild, styles.builtinButton, styles.zoomOutButton];
        let zoomInButtonHandler    = this.handleZoomInButtonClick;
        let zoomOutButtonHandler   = this.handleZoomOutButtonClick;

        // Disable zooming in when zoomed all the way in
        if (this.state.zoomLevel === MAX_ZOOM_LEVEL) {
            zoomInButtonClasses.push(styles.builtinButtonDisabled);
            zoomInButtonHandler = noop;
        }

        // Disable zooming out when zoomed all the way out
        if (this.state.zoomLevel === MIN_ZOOM_LEVEL) {
            zoomOutButtonClasses.push(styles.builtinButtonDisabled);
            zoomOutButtonHandler = noop;
        }

        // Ignore clicks during animation
        if (this.isAnimating()) {
            zoomInButtonHandler  = noop;
            zoomOutButtonHandler = noop;
        }

        // Clear default modal appearance
        const modalStyle = {
            overlay: {
                zIndex:          1000,
                backgroundColor: 'transparent',
            },
            content: {
                backgroundColor: 'transparent',
                border:          'none',
                borderRadius:    0,
                top:             0,
                left:            0,
                right:           0,
                bottom:          0,
            },
        };

        // DEPRECATION NOTICE
        // All unprefixed classes (listed below) will be removed in v4.0.0.
        // Use their `ril-` prefixed alternatives instead.
        //
        // DEPRECATED: close, closing, download-blocker, image-current,
        //             image-next, image-prev, inner, next-button, not-loaded,
        //             outer, prev-button, toolbar, toolbar-left, toolbar-right,
        //             zoom-in, zoom-out

        return (
            <Modal
                isOpen
                onRequestClose={noop}
                style={modalStyle}
                onAfterOpen={() => this.outerEl && this.outerEl.focus()} // Focus on the div with key handlers
            >
                <div // Floating modal with closing animations
                    className={`outer ril-outer ${styles.outer} ${styles.outerAnimating}` +
                        (this.state.isClosing ? ` closing ril-closing ${styles.outerClosing}` : '')
                    }
                    style={{
                        transition:         `opacity ${this.props.animationDuration}ms`,
                        animationDuration:  `${this.props.animationDuration}ms`,
                        animationDirection: this.state.isClosing ? 'normal' : 'reverse',
                    }}
                    ref={el => { this.outerEl = el; }}
                    onWheel={this.handleOuterMousewheel}
                    onMouseMove={this.handleOuterMouseMove}
                    onMouseDown={this.handleOuterMouseDown}
                    onTouchStart={this.handleOuterTouchStart}
                    onTouchMove={this.handleOuterTouchMove}
                    tabIndex="-1" // Enables key handlers on div
                    onKeyDown={this.handleKeyInput}
                    onKeyUp={this.handleKeyInput}
                >

                    <div // Image holder
                        className={`inner ril-inner ${styles.inner}`}
                        onClick={this.props.clickOutsideToClose ? this.closeIfClickInner : noop}
                    >
                        {images}
                    </div>

                    {!this.props.prevSrc ? '' :
                        <button // Move to previous image button
                            type="button"
                            className={`prev-button ril-prev-button ${styles.navButtons} ${styles.navButtonPrev}`}
                            key="prev"
                            onClick={!this.isAnimating() ? this.requestMovePrev : noop} // Ignore clicks during animation
                        />
                    }

                    {!this.props.nextSrc ? '' :
                        <button // Move to next image button
                            type="button"
                            className={`next-button ril-next-button ${styles.navButtons} ${styles.navButtonNext}`}
                            key="next"
                            onClick={!this.isAnimating() ? this.requestMoveNext : noop} // Ignore clicks during animation
                        />
                    }

                    <div // Lightbox toolbar
                        className={`toolbar ril-toolbar ${styles.toolbar}`}
                    >
                        <ul className={`toolbar-left ril-toolbar-left ${styles.toolbarSide} ${styles.toolbarLeftSide}`}>
                            <li className={styles.toolbarItem}>
                                <span className={styles.toolbarItemChild}>{this.props.imageTitle}</span>
                            </li>
                        </ul>

                        <ul
                            className={[
                                'toolbar-right',
                                'ril-toolbar-right',
                                styles.toolbarSide,
                                styles.toolbarRightSide,
                            ].join(' ')}
                        >
                            {!this.props.toolbarButtons ? '' : this.props.toolbarButtons.map((button, i) => (
                                <li key={i} className={styles.toolbarItem}>{button}</li>
                            ))}

                            <li className={styles.toolbarItem}>
                                <button // Lightbox zoom in button
                                    type="button"
                                    key="zoom-in"
                                    className={`zoom-in ril-zoom-in ${zoomInButtonClasses.join(' ')}`}
                                    onClick={zoomInButtonHandler}
                                />
                            </li>

                            <li className={styles.toolbarItem}>
                                <button // Lightbox zoom out button
                                    type="button"
                                    key="zoom-out"
                                    className={`zoom-out ril-zoom-out ${zoomOutButtonClasses.join(' ')}`}
                                    onClick={zoomOutButtonHandler}
                                />
                            </li>

                            <li className={styles.toolbarItem}>
                                <button // Lightbox close button
                                    type="button"
                                    key="close"
                                    className={`close ril-close ${styles.toolbarItemChild}` +
                                        ` ${styles.builtinButton} ${styles.closeButton}`
                                    }
                                    onClick={!this.isAnimating() ? this.requestClose : noop} // Ignore clicks during animation
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal>
        );
    }
}

ReactImageLightbox.propTypes = {
    //-----------------------------
    // Image sources
    //-----------------------------

    // Main display image url
    mainSrc: PropTypes.string.isRequired,

    // Main display image's wrapper
    mainImageWrapper: PropTypes.func,

    // Previous display image url (displayed to the left)
    // If left undefined, movePrev actions will not be performed, and the button not displayed
    prevSrc: PropTypes.string,

    // Next display image url (displayed to the right)
    // If left undefined, moveNext actions will not be performed, and the button not displayed
    nextSrc: PropTypes.string,

    //-----------------------------
    // Image thumbnail sources
    //-----------------------------

    // Thumbnail image url corresponding to props.mainSrc
    mainSrcThumbnail: PropTypes.string,

    // Thumbnail image url corresponding to props.prevSrc
    prevSrcThumbnail: PropTypes.string,

    // Thumbnail image url corresponding to props.nextSrc
    nextSrcThumbnail: PropTypes.string,

    //-----------------------------
    // Event Handlers
    //-----------------------------

    // Close window event
    // Should change the parent state such that the lightbox is not rendered
    onCloseRequest: PropTypes.func.isRequired,

    // Move to previous image event
    // Should change the parent state such that props.prevSrc becomes props.mainSrc,
    //  props.mainSrc becomes props.nextSrc, etc.
    onMovePrevRequest: PropTypes.func,

    // Move to next image event
    // Should change the parent state such that props.nextSrc becomes props.mainSrc,
    //  props.mainSrc becomes props.prevSrc, etc.
    onMoveNextRequest: PropTypes.func,

    //-----------------------------
    // Download discouragement settings
    //-----------------------------

    // Enable download discouragement (prevents [right-click -> Save Image As...])
    discourageDownloads: PropTypes.bool,

    //-----------------------------
    // Animation settings
    //-----------------------------

    // Disable all animation
    animationDisabled: PropTypes.bool,

    // Disable animation on actions performed with keyboard shortcuts
    animationOnKeyInput: PropTypes.bool,

    // Animation duration (ms)
    animationDuration: PropTypes.number,

    //-----------------------------
    // Keyboard shortcut settings
    //-----------------------------

    // Required interval of time (ms) between key actions
    // (prevents excessively fast navigation of images)
    keyRepeatLimit: PropTypes.number,

    // Amount of time (ms) restored after each keyup
    // (makes rapid key presses slightly faster than holding down the key to navigate images)
    keyRepeatKeyupBonus: PropTypes.number,

    //-----------------------------
    // Image info
    //-----------------------------

    // Image title
    imageTitle: PropTypes.node,

    //-----------------------------
    // Other
    //-----------------------------

    // Array of custom toolbar buttons
    toolbarButtons: PropTypes.arrayOf(PropTypes.node),

    // Padding (px) between the edge of the window and the lightbox
    imagePadding: PropTypes.number,

    // When true, clicks outside of the image close the lightbox
    clickOutsideToClose: PropTypes.bool,
};

ReactImageLightbox.defaultProps = {
    onMovePrevRequest: () => {},
    onMoveNextRequest: () => {},

    discourageDownloads: false,

    animationDisabled:   false,
    animationOnKeyInput: false,
    animationDuration:   300,

    keyRepeatLimit:      180,
    keyRepeatKeyupBonus: 40,

    imagePadding:        10,
    clickOutsideToClose: true,
};

export default ReactImageLightbox;
