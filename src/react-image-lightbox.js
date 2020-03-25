import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import {
  translate,
  getWindowWidth,
  getWindowHeight,
  getHighestSafeWindowContext,
} from './util';
import {
  KEYS,
  MIN_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
  ZOOM_RATIO,
  WHEEL_MOVE_X_THRESHOLD,
  WHEEL_MOVE_Y_THRESHOLD,
  ZOOM_BUTTON_INCREMENT_SIZE,
  ACTION_NONE,
  ACTION_MOVE,
  ACTION_SWIPE,
  ACTION_PINCH,
  SOURCE_ANY,
  SOURCE_MOUSE,
  SOURCE_TOUCH,
  SOURCE_POINTER,
  MIN_SWIPE_DISTANCE,
} from './constant';
import './style.css';

class ReactImageLightbox extends Component {
  static isTargetMatchImage(target) {
    return target && /ril-image-current/.test(target.className);
  }

  static parseMouseEvent(mouseEvent) {
    return {
      id: 'mouse',
      source: SOURCE_MOUSE,
      x: parseInt(mouseEvent.clientX, 10),
      y: parseInt(mouseEvent.clientY, 10),
    };
  }

  static parseTouchPointer(touchPointer) {
    return {
      id: touchPointer.identifier,
      source: SOURCE_TOUCH,
      x: parseInt(touchPointer.clientX, 10),
      y: parseInt(touchPointer.clientY, 10),
    };
  }

  static parsePointerEvent(pointerEvent) {
    return {
      id: pointerEvent.pointerId,
      source: SOURCE_POINTER,
      x: parseInt(pointerEvent.clientX, 10),
      y: parseInt(pointerEvent.clientY, 10),
    };
  }

  // Request to transition to the previous image
  static getTransform({ x = 0, y = 0, zoom = 1, width, targetWidth }) {
    let nextX = x;
    const windowWidth = getWindowWidth();
    if (width > windowWidth) {
      nextX += (windowWidth - width) / 2;
    }
    const scaleFactor = zoom * (targetWidth / width);

    return {
      transform: `translate3d(${nextX}px,${y}px,0) scale3d(${scaleFactor},${scaleFactor},1)`,
    };
  }

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

      // image load error for srcType
      loadErrorStatus: {},
    };

    // Refs
    this.outerEl = React.createRef();
    this.zoomInBtn = React.createRef();
    this.zoomOutBtn = React.createRef();
    this.caption = React.createRef();

    this.closeIfClickInner = this.closeIfClickInner.bind(this);
    this.handleImageDoubleClick = this.handleImageDoubleClick.bind(this);
    this.handleImageMouseWheel = this.handleImageMouseWheel.bind(this);
    this.handleKeyInput = this.handleKeyInput.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleOuterMousewheel = this.handleOuterMousewheel.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handlePointerEvent = this.handlePointerEvent.bind(this);
    this.handleCaptionMousewheel = this.handleCaptionMousewheel.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleZoomInButtonClick = this.handleZoomInButtonClick.bind(this);
    this.handleZoomOutButtonClick = this.handleZoomOutButtonClick.bind(this);
    this.requestClose = this.requestClose.bind(this);
    this.requestMoveNext = this.requestMoveNext.bind(this);
    this.requestMovePrev = this.requestMovePrev.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    // Timeouts - always clear it before umount
    this.timeouts = [];

    // Current action
    this.currentAction = ACTION_NONE;

    // Events source
    this.eventsSource = SOURCE_ANY;

    // Empty pointers list
    this.pointerList = [];

    // Prevent inner close
    this.preventInnerClose = false;
    this.preventInnerCloseTimeout = null;

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
    this.moveStartX = 0;
    this.moveStartY = 0;
    this.moveStartOffsetX = 0;
    this.moveStartOffsetY = 0;

    // Used to swipe
    this.swipeStartX = 0;
    this.swipeStartY = 0;
    this.swipeEndX = 0;
    this.swipeEndY = 0;

    // Used to pinch
    this.pinchTouchList = null;
    this.pinchDistance = 0;

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
    // Prevents cross-origin errors when using a cross-origin iframe
    this.windowContext = getHighestSafeWindowContext();

    this.listeners = {
      resize: this.handleWindowResize,
      mouseup: this.handleMouseUp,
      touchend: this.handleTouchEnd,
      touchcancel: this.handleTouchEnd,
      pointerdown: this.handlePointerEvent,
      pointermove: this.handlePointerEvent,
      pointerup: this.handlePointerEvent,
      pointercancel: this.handlePointerEvent,
    };
    Object.keys(this.listeners).forEach(type => {
      this.windowContext.addEventListener(type, this.listeners[type]);
    });

    this.loadAllImages();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
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
        if (!(prevSrc in nextSrcDict) && prevSrc in this.imageCache) {
          this.imageCache[prevSrc].loaded = false;
        }
      });

      this.moveRequested = false;

      // Load any new images
      this.loadAllImages(nextProps);
    }
  }

  shouldComponentUpdate() {
    // Wait for move...
    return !this.moveRequested;
  }

  componentWillUnmount() {
    this.didUnmount = true;
    Object.keys(this.listeners).forEach(type => {
      this.windowContext.removeEventListener(type, this.listeners[type]);
    });
    this.timeouts.forEach(tid => clearTimeout(tid));
  }

  setTimeout(func, time) {
    const id = setTimeout(() => {
      this.timeouts = this.timeouts.filter(tid => tid !== id);
      func();
    }, time);
    this.timeouts.push(id);
    return id;
  }

  setPreventInnerClose() {
    if (this.preventInnerCloseTimeout) {
      this.clearTimeout(this.preventInnerCloseTimeout);
    }
    this.preventInnerClose = true;
    this.preventInnerCloseTimeout = this.setTimeout(() => {
      this.preventInnerClose = false;
      this.preventInnerCloseTimeout = null;
    }, 100);
  }

  // Get info for the best suited image to display with the given srcType
  getBestImageForType(srcType) {
    let imageSrc = this.props[srcType];
    let fitSizes = {};

    if (this.isImageLoaded(imageSrc)) {
      // Use full-size image if available
      fitSizes = this.getFitSizes(
        this.imageCache[imageSrc].width,
        this.imageCache[imageSrc].height
      );
    } else if (this.isImageLoaded(this.props[`${srcType}Thumbnail`])) {
      // Fall back to using thumbnail if the image has not been loaded
      imageSrc = this.props[`${srcType}Thumbnail`];
      fitSizes = this.getFitSizes(
        this.imageCache[imageSrc].width,
        this.imageCache[imageSrc].height,
        true
      );
    } else {
      return null;
    }

    return {
      src: imageSrc,
      height: this.imageCache[imageSrc].height,
      width: this.imageCache[imageSrc].width,
      targetHeight: fitSizes.height,
      targetWidth: fitSizes.width,
    };
  }

  // Get sizing for when an image is larger than the window
  getFitSizes(width, height, stretch) {
    const boxSize = this.getLightboxRect();
    let maxHeight = boxSize.height - this.props.imagePadding * 2;
    let maxWidth = boxSize.width - this.props.imagePadding * 2;

    if (!stretch) {
      maxHeight = Math.min(maxHeight, height);
      maxWidth = Math.min(maxWidth, width);
    }

    const maxRatio = maxWidth / maxHeight;
    const srcRatio = width / height;

    if (maxRatio > srcRatio) {
      // height is the constraining dimension of the photo
      return {
        width: (width * maxHeight) / height,
        height: maxHeight,
      };
    }

    return {
      width: maxWidth,
      height: (height * maxWidth) / width,
    };
  }

  getMaxOffsets(zoomLevel = this.state.zoomLevel) {
    const currentImageInfo = this.getBestImageForType('mainSrc');
    if (currentImageInfo === null) {
      return { maxX: 0, minX: 0, maxY: 0, minY: 0 };
    }

    const boxSize = this.getLightboxRect();
    const zoomMultiplier = this.getZoomMultiplier(zoomLevel);

    let maxX = 0;
    if (zoomMultiplier * currentImageInfo.width - boxSize.width < 0) {
      // if there is still blank space in the X dimension, don't limit except to the opposite edge
      maxX = (boxSize.width - zoomMultiplier * currentImageInfo.width) / 2;
    } else {
      maxX = (zoomMultiplier * currentImageInfo.width - boxSize.width) / 2;
    }

    let maxY = 0;
    if (zoomMultiplier * currentImageInfo.height - boxSize.height < 0) {
      // if there is still blank space in the Y dimension, don't limit except to the opposite edge
      maxY = (boxSize.height - zoomMultiplier * currentImageInfo.height) / 2;
    } else {
      maxY = (zoomMultiplier * currentImageInfo.height - boxSize.height) / 2;
    }

    return {
      maxX,
      maxY,
      minX: -1 * maxX,
      minY: -1 * maxY,
    };
  }

  // Get image src types
  getSrcTypes() {
    return [
      {
        name: 'mainSrc',
        keyEnding: `i${this.keyCounter}`,
      },
      {
        name: 'mainSrcThumbnail',
        keyEnding: `t${this.keyCounter}`,
      },
      {
        name: 'nextSrc',
        keyEnding: `i${this.keyCounter + 1}`,
      },
      {
        name: 'nextSrcThumbnail',
        keyEnding: `t${this.keyCounter + 1}`,
      },
      {
        name: 'prevSrc',
        keyEnding: `i${this.keyCounter - 1}`,
      },
      {
        name: 'prevSrcThumbnail',
        keyEnding: `t${this.keyCounter - 1}`,
      },
    ];
  }

  /**
   * Get sizing when the image is scaled
   */
  getZoomMultiplier(zoomLevel = this.state.zoomLevel) {
    return ZOOM_RATIO ** zoomLevel;
  }

  /**
   * Get the size of the lightbox in pixels
   */
  getLightboxRect() {
    if (this.outerEl.current) {
      return this.outerEl.current.getBoundingClientRect();
    }

    return {
      width: getWindowWidth(),
      height: getWindowHeight(),
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
  }

  clearTimeout(id) {
    this.timeouts = this.timeouts.filter(tid => tid !== id);
    clearTimeout(id);
  }

  // Change zoom level
  changeZoom(zoomLevel, clientX, clientY) {
    // Ignore if zoom disabled
    if (!this.props.enableZoom) {
      return;
    }

    // Constrain zoom level to the set bounds
    const nextZoomLevel = Math.max(
      MIN_ZOOM_LEVEL,
      Math.min(MAX_ZOOM_LEVEL, zoomLevel)
    );

    // Ignore requests that don't change the zoom level
    if (nextZoomLevel === this.state.zoomLevel) {
      return;
    }

    if (nextZoomLevel === MIN_ZOOM_LEVEL) {
      // Snap back to center if zoomed all the way out
      this.setState({
        zoomLevel: nextZoomLevel,
        offsetX: 0,
        offsetY: 0,
      });

      return;
    }

    const imageBaseSize = this.getBestImageForType('mainSrc');
    if (imageBaseSize === null) {
      return;
    }

    const currentZoomMultiplier = this.getZoomMultiplier();
    const nextZoomMultiplier = this.getZoomMultiplier(nextZoomLevel);

    // Default to the center of the image to zoom when no mouse position specified
    const boxRect = this.getLightboxRect();
    const pointerX =
      typeof clientX !== 'undefined'
        ? clientX - boxRect.left
        : boxRect.width / 2;
    const pointerY =
      typeof clientY !== 'undefined'
        ? clientY - boxRect.top
        : boxRect.height / 2;

    const currentImageOffsetX =
      (boxRect.width - imageBaseSize.width * currentZoomMultiplier) / 2;
    const currentImageOffsetY =
      (boxRect.height - imageBaseSize.height * currentZoomMultiplier) / 2;

    const currentImageRealOffsetX = currentImageOffsetX - this.state.offsetX;
    const currentImageRealOffsetY = currentImageOffsetY - this.state.offsetY;

    const currentPointerXRelativeToImage =
      (pointerX - currentImageRealOffsetX) / currentZoomMultiplier;
    const currentPointerYRelativeToImage =
      (pointerY - currentImageRealOffsetY) / currentZoomMultiplier;

    const nextImageRealOffsetX =
      pointerX - currentPointerXRelativeToImage * nextZoomMultiplier;
    const nextImageRealOffsetY =
      pointerY - currentPointerYRelativeToImage * nextZoomMultiplier;

    const nextImageOffsetX =
      (boxRect.width - imageBaseSize.width * nextZoomMultiplier) / 2;
    const nextImageOffsetY =
      (boxRect.height - imageBaseSize.height * nextZoomMultiplier) / 2;

    let nextOffsetX = nextImageOffsetX - nextImageRealOffsetX;
    let nextOffsetY = nextImageOffsetY - nextImageRealOffsetY;

    // When zooming out, limit the offset so things don't get left askew
    if (this.currentAction !== ACTION_PINCH) {
      const maxOffsets = this.getMaxOffsets();
      if (this.state.zoomLevel > nextZoomLevel) {
        nextOffsetX = Math.max(
          maxOffsets.minX,
          Math.min(maxOffsets.maxX, nextOffsetX)
        );
        nextOffsetY = Math.max(
          maxOffsets.minY,
          Math.min(maxOffsets.maxY, nextOffsetY)
        );
      }
    }

    this.setState({
      zoomLevel: nextZoomLevel,
      offsetX: nextOffsetX,
      offsetY: nextOffsetY,
    });
  }

  closeIfClickInner(event) {
    if (
      !this.preventInnerClose &&
      event.target.className.search(/\bril-inner\b/) > -1
    ) {
      this.requestClose(event);
    }
  }

  /**
   * Handle user keyboard actions
   */
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
    if (
      currentTime.getTime() - this.lastKeyDownTime <
        this.props.keyRepeatLimit &&
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
        if (!this.props.prevSrc && !this.props.prevCustomContent) {
          return;
        }

        event.preventDefault();
        this.keyPressed = true;
        this.requestMovePrev(event);
        break;

      // Right arrow key moves to next image
      case KEYS.RIGHT_ARROW:
        if (!this.props.nextSrc && !this.props.nextCustomContent) {
          return;
        }

        event.preventDefault();
        this.keyPressed = true;
        this.requestMoveNext(event);
        break;

      default:
    }
  }

  /**
   * Handle a mouse wheel event over the lightbox container
   */
  handleOuterMousewheel(event) {
    // Prevent scrolling of the background
    event.stopPropagation();

    const xThreshold = WHEEL_MOVE_X_THRESHOLD;
    let actionDelay = 0;
    const imageMoveDelay = 500;

    this.clearTimeout(this.resetScrollTimeout);
    this.resetScrollTimeout = this.setTimeout(() => {
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
      } else if (
        this.scrollX <= -1 * xThreshold ||
        event.deltaX <= -1 * bigLeapX
      ) {
        // Scroll left moves to previous
        this.requestMovePrev(event);
        actionDelay = imageMoveDelay;
        this.scrollX = 0;
      }
    }

    // Allow successive actions after the set delay
    if (actionDelay !== 0) {
      this.wheelActionTimeout = this.setTimeout(() => {
        this.wheelActionTimeout = null;
      }, actionDelay);
    }
  }

  handleImageMouseWheel(event) {
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

  /**
   * Handle a double click on the current image
   */
  handleImageDoubleClick(event) {
    if (this.state.zoomLevel > MIN_ZOOM_LEVEL) {
      // A double click when zoomed in zooms all the way out
      this.changeZoom(MIN_ZOOM_LEVEL, event.clientX, event.clientY);
    } else {
      // A double click when zoomed all the way out zooms in
      this.changeZoom(
        this.state.zoomLevel + ZOOM_BUTTON_INCREMENT_SIZE,
        event.clientX,
        event.clientY
      );
    }
  }

  shouldHandleEvent(source) {
    if (this.eventsSource === source) {
      return true;
    }
    if (this.eventsSource === SOURCE_ANY) {
      this.eventsSource = source;
      return true;
    }
    switch (source) {
      case SOURCE_MOUSE:
        return false;
      case SOURCE_TOUCH:
        this.eventsSource = SOURCE_TOUCH;
        this.filterPointersBySource();
        return true;
      case SOURCE_POINTER:
        if (this.eventsSource === SOURCE_MOUSE) {
          this.eventsSource = SOURCE_POINTER;
          this.filterPointersBySource();
          return true;
        }
        return false;
      default:
        return false;
    }
  }

  addPointer(pointer) {
    this.pointerList.push(pointer);
  }

  removePointer(pointer) {
    this.pointerList = this.pointerList.filter(({ id }) => id !== pointer.id);
  }

  filterPointersBySource() {
    this.pointerList = this.pointerList.filter(
      ({ source }) => source === this.eventsSource
    );
  }

  handleMouseDown(event) {
    if (
      this.shouldHandleEvent(SOURCE_MOUSE) &&
      ReactImageLightbox.isTargetMatchImage(event.target)
    ) {
      this.addPointer(ReactImageLightbox.parseMouseEvent(event));
      this.multiPointerStart(event);
    }
  }

  handleMouseMove(event) {
    if (this.shouldHandleEvent(SOURCE_MOUSE)) {
      this.multiPointerMove(event, [ReactImageLightbox.parseMouseEvent(event)]);
    }
  }

  handleMouseUp(event) {
    if (this.shouldHandleEvent(SOURCE_MOUSE)) {
      this.removePointer(ReactImageLightbox.parseMouseEvent(event));
      this.multiPointerEnd(event);
    }
  }

  handlePointerEvent(event) {
    if (this.shouldHandleEvent(SOURCE_POINTER)) {
      switch (event.type) {
        case 'pointerdown':
          if (ReactImageLightbox.isTargetMatchImage(event.target)) {
            this.addPointer(ReactImageLightbox.parsePointerEvent(event));
            this.multiPointerStart(event);
          }
          break;
        case 'pointermove':
          this.multiPointerMove(event, [
            ReactImageLightbox.parsePointerEvent(event),
          ]);
          break;
        case 'pointerup':
        case 'pointercancel':
          this.removePointer(ReactImageLightbox.parsePointerEvent(event));
          this.multiPointerEnd(event);
          break;
        default:
          break;
      }
    }
  }

  handleTouchStart(event) {
    if (
      this.shouldHandleEvent(SOURCE_TOUCH) &&
      ReactImageLightbox.isTargetMatchImage(event.target)
    ) {
      [].forEach.call(event.changedTouches, eventTouch =>
        this.addPointer(ReactImageLightbox.parseTouchPointer(eventTouch))
      );
      this.multiPointerStart(event);
    }
  }

  handleTouchMove(event) {
    if (this.shouldHandleEvent(SOURCE_TOUCH)) {
      this.multiPointerMove(
        event,
        [].map.call(event.changedTouches, eventTouch =>
          ReactImageLightbox.parseTouchPointer(eventTouch)
        )
      );
    }
  }

  handleTouchEnd(event) {
    if (this.shouldHandleEvent(SOURCE_TOUCH)) {
      [].map.call(event.changedTouches, touch =>
        this.removePointer(ReactImageLightbox.parseTouchPointer(touch))
      );
      this.multiPointerEnd(event);
    }
  }

  decideMoveOrSwipe(pointer) {
    if (this.state.zoomLevel <= MIN_ZOOM_LEVEL) {
      this.handleSwipeStart(pointer);
    } else {
      this.handleMoveStart(pointer);
    }
  }

  multiPointerStart(event) {
    this.handleEnd(null);
    switch (this.pointerList.length) {
      case 1: {
        event.preventDefault();
        this.decideMoveOrSwipe(this.pointerList[0]);
        break;
      }
      case 2: {
        event.preventDefault();
        this.handlePinchStart(this.pointerList);
        break;
      }
      default:
        break;
    }
  }

  multiPointerMove(event, pointerList) {
    switch (this.currentAction) {
      case ACTION_MOVE: {
        event.preventDefault();
        this.handleMove(pointerList[0]);
        break;
      }
      case ACTION_SWIPE: {
        event.preventDefault();
        this.handleSwipe(pointerList[0]);
        break;
      }
      case ACTION_PINCH: {
        event.preventDefault();
        this.handlePinch(pointerList);
        break;
      }
      default:
        break;
    }
  }

  multiPointerEnd(event) {
    if (this.currentAction !== ACTION_NONE) {
      this.setPreventInnerClose();
      this.handleEnd(event);
    }
    switch (this.pointerList.length) {
      case 0: {
        this.eventsSource = SOURCE_ANY;
        break;
      }
      case 1: {
        event.preventDefault();
        this.decideMoveOrSwipe(this.pointerList[0]);
        break;
      }
      case 2: {
        event.preventDefault();
        this.handlePinchStart(this.pointerList);
        break;
      }
      default:
        break;
    }
  }

  handleEnd(event) {
    switch (this.currentAction) {
      case ACTION_MOVE:
        this.handleMoveEnd(event);
        break;
      case ACTION_SWIPE:
        this.handleSwipeEnd(event);
        break;
      case ACTION_PINCH:
        this.handlePinchEnd(event);
        break;
      default:
        break;
    }
  }

  // Handle move start over the lightbox container
  // This happens:
  // - On a mouseDown event
  // - On a touchstart event
  handleMoveStart({ x: clientX, y: clientY }) {
    if (!this.props.enableZoom) {
      return;
    }
    this.currentAction = ACTION_MOVE;
    this.moveStartX = clientX;
    this.moveStartY = clientY;
    this.moveStartOffsetX = this.state.offsetX;
    this.moveStartOffsetY = this.state.offsetY;
  }

  // Handle dragging over the lightbox container
  // This happens:
  // - After a mouseDown and before a mouseUp event
  // - After a touchstart and before a touchend event
  handleMove({ x: clientX, y: clientY }) {
    const newOffsetX = this.moveStartX - clientX + this.moveStartOffsetX;
    const newOffsetY = this.moveStartY - clientY + this.moveStartOffsetY;
    if (
      this.state.offsetX !== newOffsetX ||
      this.state.offsetY !== newOffsetY
    ) {
      this.setState({
        offsetX: newOffsetX,
        offsetY: newOffsetY,
      });
    }
  }

  handleMoveEnd() {
    this.currentAction = ACTION_NONE;
    this.moveStartX = 0;
    this.moveStartY = 0;
    this.moveStartOffsetX = 0;
    this.moveStartOffsetY = 0;
    // Snap image back into frame if outside max offset range
    const maxOffsets = this.getMaxOffsets();
    const nextOffsetX = Math.max(
      maxOffsets.minX,
      Math.min(maxOffsets.maxX, this.state.offsetX)
    );
    const nextOffsetY = Math.max(
      maxOffsets.minY,
      Math.min(maxOffsets.maxY, this.state.offsetY)
    );
    if (
      nextOffsetX !== this.state.offsetX ||
      nextOffsetY !== this.state.offsetY
    ) {
      this.setState({
        offsetX: nextOffsetX,
        offsetY: nextOffsetY,
        shouldAnimate: true,
      });
      this.setTimeout(() => {
        this.setState({ shouldAnimate: false });
      }, this.props.animationDuration);
    }
  }

  handleSwipeStart({ x: clientX, y: clientY }) {
    this.currentAction = ACTION_SWIPE;
    this.swipeStartX = clientX;
    this.swipeStartY = clientY;
    this.swipeEndX = clientX;
    this.swipeEndY = clientY;
  }

  handleSwipe({ x: clientX, y: clientY }) {
    this.swipeEndX = clientX;
    this.swipeEndY = clientY;
  }

  handleSwipeEnd(event) {
    const xDiff = this.swipeEndX - this.swipeStartX;
    const xDiffAbs = Math.abs(xDiff);
    const yDiffAbs = Math.abs(this.swipeEndY - this.swipeStartY);

    this.currentAction = ACTION_NONE;
    this.swipeStartX = 0;
    this.swipeStartY = 0;
    this.swipeEndX = 0;
    this.swipeEndY = 0;

    if (!event || this.isAnimating() || xDiffAbs < yDiffAbs * 1.5) {
      return;
    }

    if (xDiffAbs < MIN_SWIPE_DISTANCE) {
      const boxRect = this.getLightboxRect();
      if (xDiffAbs < boxRect.width / 4) {
        return;
      }
    }

    if (xDiff > 0 && this.props.prevSrc) {
      event.preventDefault();
      this.requestMovePrev();
    } else if (xDiff < 0 && this.props.nextSrc) {
      event.preventDefault();
      this.requestMoveNext();
    }
  }

  calculatePinchDistance([a, b] = this.pinchTouchList) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }

  calculatePinchCenter([a, b] = this.pinchTouchList) {
    return {
      x: a.x - (a.x - b.x) / 2,
      y: a.y - (a.y - b.y) / 2,
    };
  }

  handlePinchStart(pointerList) {
    if (!this.props.enableZoom) {
      return;
    }
    this.currentAction = ACTION_PINCH;
    this.pinchTouchList = pointerList.map(({ id, x, y }) => ({ id, x, y }));
    this.pinchDistance = this.calculatePinchDistance();
  }

  handlePinch(pointerList) {
    this.pinchTouchList = this.pinchTouchList.map(oldPointer => {
      for (let i = 0; i < pointerList.length; i += 1) {
        if (pointerList[i].id === oldPointer.id) {
          return pointerList[i];
        }
      }

      return oldPointer;
    });

    const newDistance = this.calculatePinchDistance();

    const zoomLevel = this.state.zoomLevel + newDistance - this.pinchDistance;

    this.pinchDistance = newDistance;
    const { x: clientX, y: clientY } = this.calculatePinchCenter(
      this.pinchTouchList
    );
    this.changeZoom(zoomLevel, clientX, clientY);
  }

  handlePinchEnd() {
    this.currentAction = ACTION_NONE;
    this.pinchTouchList = null;
    this.pinchDistance = 0;
  }

  // Handle the window resize event
  handleWindowResize() {
    this.clearTimeout(this.resizeTimeout);
    this.resizeTimeout = this.setTimeout(this.forceUpdate.bind(this), 100);
  }

  handleZoomInButtonClick() {
    const nextZoomLevel = this.state.zoomLevel + ZOOM_BUTTON_INCREMENT_SIZE;
    this.changeZoom(nextZoomLevel);
    if (nextZoomLevel === MAX_ZOOM_LEVEL) {
      this.zoomOutBtn.current.focus();
    }
  }

  handleZoomOutButtonClick() {
    const nextZoomLevel = this.state.zoomLevel - ZOOM_BUTTON_INCREMENT_SIZE;
    this.changeZoom(nextZoomLevel);
    if (nextZoomLevel === MIN_ZOOM_LEVEL) {
      this.zoomInBtn.current.focus();
    }
  }

  handleCaptionMousewheel(event) {
    event.stopPropagation();

    if (!this.caption.current) {
      return;
    }

    const { height } = this.caption.current.getBoundingClientRect();
    const { scrollHeight, scrollTop } = this.caption.current;
    if (
      (event.deltaY > 0 && height + scrollTop >= scrollHeight) ||
      (event.deltaY < 0 && scrollTop <= 0)
    ) {
      event.preventDefault();
    }
  }

  // Detach key and mouse input events
  isAnimating() {
    return this.state.shouldAnimate || this.state.isClosing;
  }

  // Check if image is loaded
  isImageLoaded(imageSrc) {
    return (
      imageSrc &&
      imageSrc in this.imageCache &&
      this.imageCache[imageSrc].loaded
    );
  }

  // Load image from src and call callback with image width and height on load
  loadImage(srcType, imageSrc, done) {
    // Return the image info if it is already cached
    if (this.isImageLoaded(imageSrc)) {
      this.setTimeout(() => {
        done();
      }, 1);
      return;
    }

    const inMemoryImage = new global.Image();

    if (this.props.imageCrossOrigin) {
      inMemoryImage.crossOrigin = this.props.imageCrossOrigin;
    }

    inMemoryImage.onerror = errorEvent => {
      this.props.onImageLoadError(imageSrc, srcType, errorEvent);

      // failed to load so set the state loadErrorStatus
      this.setState(prevState => ({
        loadErrorStatus: { ...prevState.loadErrorStatus, [srcType]: true },
      }));

      done(errorEvent);
    };

    inMemoryImage.onload = () => {
      this.props.onImageLoad(imageSrc, srcType, inMemoryImage);

      this.imageCache[imageSrc] = {
        loaded: true,
        width: inMemoryImage.width,
        height: inMemoryImage.height,
      };

      done();
    };

    inMemoryImage.src = imageSrc;
  }

  // Load all images and their thumbnails
  loadAllImages(props = this.props) {
    const generateLoadDoneCallback = (srcType, imageSrc) => err => {
      // Give up showing image on error
      if (err) {
        return;
      }

      // Don't rerender if the src is not the same as when the load started
      // or if the component has unmounted
      if (this.props[srcType] !== imageSrc || this.didUnmount) {
        return;
      }

      // Force rerender with the new image
      this.forceUpdate();
    };

    // Load the images
    this.getSrcTypes().forEach(srcType => {
      const type = srcType.name;

      // there is no error when we try to load it initially
      if (props[type] && this.state.loadErrorStatus[type]) {
        this.setState(prevState => ({
          loadErrorStatus: { ...prevState.loadErrorStatus, [type]: false },
        }));
      }

      // Load unloaded images
      if (props[type] && !this.isImageLoaded(props[type]) &&
      !(props[type] === 'mainSrc' && props.mainCustomContent) && 
      !(props[type] === 'prevSrc' && props.prevCustomContent) && 
      !(props[type] === 'nextSrc' && props.nextCustomContent) ) {
        this.loadImage(
          type,
          props[type],
          generateLoadDoneCallback(type, props[type])
        );
      }
    });
  }

  // Request that the lightbox be closed
  requestClose(event) {
    // Call the parent close request
    const closeLightbox = () => this.props.onCloseRequest(event);

    if (
      this.props.animationDisabled ||
      (event.type === 'keydown' && !this.props.animationOnKeyInput)
    ) {
      // No animation
      closeLightbox();
      return;
    }

    // With animation
    // Start closing animation
    this.setState({ isClosing: true });

    // Perform the actual closing at the end of the animation
    this.setTimeout(closeLightbox, this.props.animationDuration);
  }

  requestMove(direction, event) {
    // Reset the zoom level on image move
    const nextState = {
      zoomLevel: MIN_ZOOM_LEVEL,
      offsetX: 0,
      offsetY: 0,
    };

    // Enable animated states
    if (
      !this.props.animationDisabled &&
      (!this.keyPressed || this.props.animationOnKeyInput)
    ) {
      nextState.shouldAnimate = true;
      this.setTimeout(
        () => this.setState({ shouldAnimate: false }),
        this.props.animationDuration
      );
    }
    this.keyPressed = false;

    this.moveRequested = true;

    if (direction === 'prev') {
      this.keyCounter -= 1;
      this.setState(nextState);
      this.props.onMovePrevRequest(event);
    } else {
      this.keyCounter += 1;
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
    const {
      animationDisabled,
      animationDuration,
      clickOutsideToClose,
      discourageDownloads,
      enableZoom,
      imageTitle,
      nextSrc,
      prevSrc,
      toolbarButtons,
      reactModalStyle,
      onAfterOpen,
      imageCrossOrigin,
      reactModalProps,
      nextCustomContent,
      prevCustomContent,
      mainCustomContent,
    } = this.props;
    const {
      zoomLevel,
      offsetX,
      offsetY,
      isClosing,
      loadErrorStatus,
    } = this.state;

    const boxSize = this.getLightboxRect();
    let transitionStyle = {};

    // Transition settings for sliding animations
    if (!animationDisabled && this.isAnimating()) {
      transitionStyle = {
        ...transitionStyle,
        transition: `transform ${animationDuration}ms`,
      };
    }

    // Key endings to differentiate between images with the same src
    const keyEndings = {};
    this.getSrcTypes().forEach(({ name, keyEnding }) => {
      keyEndings[name] = keyEnding;
    });

    // Images to be displayed
    const images = [];
    const addImage = (srcType, imageClass, transforms) => {
      if(srcType === 'mainSrc' && mainCustomContent) {
        images.push(
          <div key={`${srcType}-mainCustomContent`} className={`${imageClass} ril__image`} >
            {mainCustomContent}
          </div>
        );
        return;
      }
      if(srcType === 'prevSrc' && prevCustomContent) {
        images.push(<div key={`${srcType}-prevCustomContent`} />);
        return;
      }
      if(srcType === 'nextSrc' && nextCustomContent) {
        images.push(<div key={`${srcType}-nextCustomContent`} />);
        return;
      }
      // Ignore types that have no source defined for their full size image
      if (!this.props[srcType]) {
        return;
      }
      const bestImageInfo = this.getBestImageForType(srcType);

      const imageStyle = {
        ...transitionStyle,
        ...ReactImageLightbox.getTransform({
          ...transforms,
          ...bestImageInfo,
        }),
      };

      if (zoomLevel > MIN_ZOOM_LEVEL) {
        imageStyle.cursor = 'move';
      }

      // support IE 9 and 11
      const hasTrueValue = object =>
        Object.keys(object).some(key => object[key]);

      // when error on one of the loads then push custom error stuff
      if (bestImageInfo === null && hasTrueValue(loadErrorStatus)) {
        images.push(
          <div
            className={`${imageClass} ril__image ril-errored`}
            style={imageStyle}
            key={this.props[srcType] + keyEndings[srcType]}
          >
            <div className="ril__errorContainer">
              {this.props.imageLoadErrorMessage}
            </div>
          </div>
        );

        return;
      }
      if (bestImageInfo === null) {
        const loadingIcon = (
          <div className="ril-loading-circle ril__loadingCircle ril__loadingContainer__icon">
            {[...new Array(12)].map((_, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="ril-loading-circle-point ril__loadingCirclePoint"
              />
            ))}
          </div>
        );

        // Fall back to loading icon if the thumbnail has not been loaded
        images.push(
          <div
            className={`${imageClass} ril__image ril-not-loaded`}
            style={imageStyle}
            key={this.props[srcType] + keyEndings[srcType]}
          >
            <div className="ril__loadingContainer">{loadingIcon}</div>
          </div>
        );

        return;
      }

      const imageSrc = bestImageInfo.src;
      if (discourageDownloads) {
        imageStyle.backgroundImage = `url('${imageSrc}')`;
        images.push(
          <div
            className={`${imageClass} ril__image ril__imageDiscourager`}
            onDoubleClick={this.handleImageDoubleClick}
            onWheel={this.handleImageMouseWheel}
            style={imageStyle}
            key={imageSrc + keyEndings[srcType]}
          >
            <div className="ril-download-blocker ril__downloadBlocker" />
          </div>
        );
      } else {
        images.push(
          <img
            {...(imageCrossOrigin ? { crossOrigin: imageCrossOrigin } : {})}
            className={`${imageClass} ril__image`}
            onDoubleClick={this.handleImageDoubleClick}
            onWheel={this.handleImageMouseWheel}
            onDragStart={e => e.preventDefault()}
            style={imageStyle}
            src={imageSrc}
            key={imageSrc + keyEndings[srcType]}
            alt={
              typeof imageTitle === 'string' ? imageTitle : translate('Image')
            }
            draggable={false}
          />
        );
      }
    };

    const zoomMultiplier = this.getZoomMultiplier();
    // Next Image (displayed on the right)
    addImage('nextSrc', 'ril-image-next ril__imageNext', {
      x: boxSize.width,
    });
    // Main Image
    addImage('mainSrc', 'ril-image-current', {
      x: -1 * offsetX,
      y: -1 * offsetY,
      zoom: zoomMultiplier,
    });
    // Previous Image (displayed on the left)
    addImage('prevSrc', 'ril-image-prev ril__imagePrev', {
      x: -1 * boxSize.width,
    });

    const modalStyle = {
      overlay: {
        zIndex: 1000,
        backgroundColor: 'transparent',
        ...reactModalStyle.overlay, // Allow style overrides via props
      },
      content: {
        backgroundColor: 'transparent',
        overflow: 'hidden', // Needed, otherwise keyboard shortcuts scroll the page
        border: 'none',
        borderRadius: 0,
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        ...reactModalStyle.content, // Allow style overrides via props
      },
    };

    return (
      <Modal
        isOpen
        onRequestClose={clickOutsideToClose ? this.requestClose : undefined}
        onAfterOpen={() => {
          // Focus on the div with key handlers
          if (this.outerEl.current) {
            this.outerEl.current.focus();
          }

          onAfterOpen();
        }}
        style={modalStyle}
        contentLabel={translate('Lightbox')}
        appElement={
          typeof global.window !== 'undefined'
            ? global.window.document.body
            : undefined
        }
        {...reactModalProps}
      >
        <div // eslint-disable-line jsx-a11y/no-static-element-interactions
          // Floating modal with closing animations
          className={`ril-outer ril__outer ril__outerAnimating ${
            this.props.wrapperClassName
          } ${isClosing ? 'ril-closing ril__outerClosing' : ''}`}
          style={{
            transition: `opacity ${animationDuration}ms`,
            animationDuration: `${animationDuration}ms`,
            animationDirection: isClosing ? 'normal' : 'reverse',
          }}
          ref={this.outerEl}
          onWheel={this.handleOuterMousewheel}
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          tabIndex="-1" // Enables key handlers on div
          onKeyDown={this.handleKeyInput}
          onKeyUp={this.handleKeyInput}
        >
          <div // eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            // Image holder
            className="ril-inner ril__inner"
            onClick={clickOutsideToClose ? this.closeIfClickInner : undefined}
          >
            {images}
          </div>

          {prevSrc || prevCustomContent ? (
            <button // Move to previous image button
              type="button"
              className="ril-prev-button ril__navButtons ril__navButtonPrev"
              key="prev"
              aria-label={this.props.prevLabel}
              onClick={!this.isAnimating() ? this.requestMovePrev : undefined} // Ignore clicks during animation
            />
          ): null}

          {nextSrc || nextCustomContent ? (
            <button // Move to next image button
              type="button"
              className="ril-next-button ril__navButtons ril__navButtonNext"
              key="next"
              aria-label={this.props.nextLabel}
              onClick={!this.isAnimating() ? this.requestMoveNext : undefined} // Ignore clicks during animation
            />
          ): null}

          <div // Lightbox toolbar
            className="ril-toolbar ril__toolbar"
          >
            <ul className="ril-toolbar-left ril__toolbarSide ril__toolbarLeftSide">
              <li className="ril-toolbar__item ril__toolbarItem">
                <span className="ril-toolbar__item__child ril__toolbarItemChild">
                  {imageTitle}
                </span>
              </li>
            </ul>

            <ul className="ril-toolbar-right ril__toolbarSide ril__toolbarRightSide">
              {toolbarButtons &&
                toolbarButtons.map((button, i) => (
                  <li
                    key={`button_${i + 1}`}
                    className="ril-toolbar__item ril__toolbarItem"
                  >
                    {button}
                  </li>
                ))}

              {enableZoom && (
                <li className="ril-toolbar__item ril__toolbarItem">
                  <button // Lightbox zoom in button
                    type="button"
                    key="zoom-in"
                    aria-label={this.props.zoomInLabel}
                    className={[
                      'ril-zoom-in',
                      'ril__toolbarItemChild',
                      'ril__builtinButton',
                      'ril__zoomInButton',
                      ...(zoomLevel === MAX_ZOOM_LEVEL
                        ? ['ril__builtinButtonDisabled']
                        : []),
                    ].join(' ')}
                    ref={this.zoomInBtn}
                    disabled={
                      this.isAnimating() || zoomLevel === MAX_ZOOM_LEVEL
                    }
                    onClick={
                      !this.isAnimating() && zoomLevel !== MAX_ZOOM_LEVEL
                        ? this.handleZoomInButtonClick
                        : undefined
                    }
                  />
                </li>
              )}

              {enableZoom && (
                <li className="ril-toolbar__item ril__toolbarItem">
                  <button // Lightbox zoom out button
                    type="button"
                    key="zoom-out"
                    aria-label={this.props.zoomOutLabel}
                    className={[
                      'ril-zoom-out',
                      'ril__toolbarItemChild',
                      'ril__builtinButton',
                      'ril__zoomOutButton',
                      ...(zoomLevel === MIN_ZOOM_LEVEL
                        ? ['ril__builtinButtonDisabled']
                        : []),
                    ].join(' ')}
                    ref={this.zoomOutBtn}
                    disabled={
                      this.isAnimating() || zoomLevel === MIN_ZOOM_LEVEL
                    }
                    onClick={
                      !this.isAnimating() && zoomLevel !== MIN_ZOOM_LEVEL
                        ? this.handleZoomOutButtonClick
                        : undefined
                    }
                  />
                </li>
              )}

              <li className="ril-toolbar__item ril__toolbarItem">
                <button // Lightbox close button
                  type="button"
                  key="close"
                  aria-label={this.props.closeLabel}
                  className="ril-close ril-toolbar__item__child ril__toolbarItemChild ril__builtinButton ril__closeButton"
                  onClick={!this.isAnimating() ? this.requestClose : undefined} // Ignore clicks during animation
                />
              </li>
            </ul>
          </div>

          {this.props.imageCaption && (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div // Image caption
              onWheel={this.handleCaptionMousewheel}
              onMouseDown={event => event.stopPropagation()}
              className="ril-caption ril__caption"
              ref={this.caption}
            >
              <div className="ril-caption-content ril__captionContent">
                {this.props.imageCaption}
              </div>
            </div>
          )}
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
  mainSrc: (props, prop, component) => {
    if (!props.mainSrc && !props.mainCustomContent) {
      return new Error(
        `One of 'mainSrc' or 'mainCustomContent' is required by ${
          component
        } component.`
      );
    }
    if (!props.mainCustomContent && typeof props.mainSrc !== 'string') {
      return new Error(`Invalid prop \`${prop}\` of type \`${
        typeof props.mainSrc
      }\` supplied to \`${component}\`, expected \`string\`.`);
    }
    return null;
  }, // eslint-disable-line react/no-unused-prop-types

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
  mainSrcThumbnail: PropTypes.string, // eslint-disable-line react/no-unused-prop-types

  // Thumbnail image url corresponding to props.prevSrc
  prevSrcThumbnail: PropTypes.string, // eslint-disable-line react/no-unused-prop-types

  // Thumbnail image url corresponding to props.nextSrc
  nextSrcThumbnail: PropTypes.string, // eslint-disable-line react/no-unused-prop-types

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

  // Called when an image fails to load
  // (imageSrc: string, srcType: string, errorEvent: object): void
  onImageLoadError: PropTypes.func,

  // Called when image successfully loads
  onImageLoad: PropTypes.func,

  // Open window event
  onAfterOpen: PropTypes.func,

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

  // Image caption
  imageCaption: PropTypes.node,

  // Optional crossOrigin attribute
  imageCrossOrigin: PropTypes.string,

  //-----------------------------
  // Lightbox style
  //-----------------------------

  // Set z-index style, etc., for the parent react-modal (format: https://github.com/reactjs/react-modal#styles )
  reactModalStyle: PropTypes.shape({}),

  // Padding (px) between the edge of the window and the lightbox
  imagePadding: PropTypes.number,

  wrapperClassName: PropTypes.string,

  //-----------------------------
  // Other
  //-----------------------------

  // Array of custom toolbar buttons
  toolbarButtons: PropTypes.arrayOf(PropTypes.node),

  // When true, clicks outside of the image close the lightbox
  clickOutsideToClose: PropTypes.bool,

  // Set to false to disable zoom functionality and hide zoom buttons
  enableZoom: PropTypes.bool,

  // Override props set on react-modal (https://github.com/reactjs/react-modal)
  reactModalProps: PropTypes.shape({}),

  // Aria-labels
  nextLabel: PropTypes.string,
  prevLabel: PropTypes.string,
  zoomInLabel: PropTypes.string,
  zoomOutLabel: PropTypes.string,
  closeLabel: PropTypes.string,

  imageLoadErrorMessage: PropTypes.node,

  // customContent
  mainCustomContent: PropTypes.node,
  prevCustomContent: PropTypes.node,
  nextCustomContent: PropTypes.node,
};

ReactImageLightbox.defaultProps = {
  imageTitle: null,
  imageCaption: null,
  toolbarButtons: null,
  reactModalProps: {},
  animationDisabled: false,
  animationDuration: 300,
  animationOnKeyInput: false,
  clickOutsideToClose: true,
  closeLabel: 'Close lightbox',
  discourageDownloads: false,
  enableZoom: true,
  imagePadding: 10,
  imageCrossOrigin: null,
  keyRepeatKeyupBonus: 40,
  keyRepeatLimit: 180,
  mainSrc: null,
  mainSrcThumbnail: null,
  nextLabel: 'Next image',
  nextSrc: null,
  nextSrcThumbnail: null,
  onAfterOpen: () => {},
  onImageLoadError: () => {},
  onImageLoad: () => {},
  onMoveNextRequest: () => {},
  onMovePrevRequest: () => {},
  prevLabel: 'Previous image',
  prevSrc: null,
  prevSrcThumbnail: null,
  reactModalStyle: {},
  wrapperClassName: '',
  zoomInLabel: 'Zoom in',
  zoomOutLabel: 'Zoom out',
  imageLoadErrorMessage: 'This image failed to load',
  mainCustomContent: null,
  prevCustomContent: null,
  nextCustomContent: null,
};

export default ReactImageLightbox;
