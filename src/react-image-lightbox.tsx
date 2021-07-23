import React, { Component, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import {
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
  MIN_SWIPE_DISTANCE,
  EventSource,
  Gesture,
} from './constant';
import './style.css';

type MoveRequestEvent =
  | React.MouseEvent
  | React.WheelEvent
  | React.KeyboardEvent;
type PointerlikeEvent =
  | React.TouchEvent
  | React.PointerEvent
  | React.MouseEvent;

type LightboxProps = typeof ReactImageLightbox.defaultProps & {
  //-----------------------------
  // Image sources
  //-----------------------------

  // Main display image url
  mainSrc: string;

  // Previous display image url (displayed to the left)
  // If left undefined, movePrev actions will not be performed, and the button not displayed
  prevSrc?: string;

  // Next display image url (displayed to the right)
  // If left undefined, moveNext actions will not be performed, and the button not displayed
  nextSrc?: string;

  //-----------------------------
  // Image thumbnail sources
  //-----------------------------

  // Thumbnail image url corresponding to props.mainSrc
  mainSrcThumbnail?: string;

  // Thumbnail image url corresponding to props.prevSrc
  prevSrcThumbnail?: string;

  // Thumbnail image url corresponding to props.nextSrc
  nextSrcThumbnail?: string;

  //-----------------------------
  // Event Handlers
  //-----------------------------

  // Close window event
  // Should change the parent state such that the lightbox is not rendered
  onCloseRequest: (event: React.MouseEvent | React.KeyboardEvent) => void;

  // Move to previous image event
  // Should change the parent state such that props.prevSrc becomes props.mainSrc,
  //  props.mainSrc becomes props.nextSrc, etc.
  onMovePrevRequest?: (event?: MoveRequestEvent) => void;

  // Move to next image event
  // Should change the parent state such that props.nextSrc becomes props.mainSrc,
  //  props.mainSrc becomes props.prevSrc, etc.
  onMoveNextRequest?: (event?: MoveRequestEvent) => void;

  // Called when an image fails to load
  onImageLoadError?: (
    imageSrc: string,
    srcType: string,
    errorEvent: Event | string
  ) => void;

  // Called when image successfully loads
  onImageLoad?: (imageSrc: string, srcType: string, image: object) => void;

  // Open window event
  onAfterOpen?: () => void;

  //-----------------------------
  // Download discouragement settings
  //-----------------------------

  // Enable download discouragement (prevents [right-click -> Save Image As...])
  discourageDownloads?: boolean;

  //-----------------------------
  // Animation settings
  //-----------------------------

  // Disable all animation
  animationDisabled?: boolean;

  // Disable animation on actions performed with keyboard shortcuts
  animationOnKeyInput?: boolean;

  // Animation duration (ms)
  animationDuration?: number;

  //-----------------------------
  // Keyboard shortcut settings
  //-----------------------------

  // Required interval of time (ms) between key actions
  // (prevents excessively fast navigation of images)
  keyRepeatLimit?: number;

  // Amount of time (ms) restored after each keyup
  // (makes rapid key presses slightly faster than holding down the key to navigate images)
  keyRepeatKeyupBonus?: number;

  //-----------------------------
  // Image info
  //-----------------------------

  /** Image title (Descriptive element above image) */
  imageTitle?: React.ReactNode;

  /** Image caption (Descriptive element below image) */
  imageCaption?: React.ReactNode;

  /**
   * `crossorigin` attribute to append to `img` elements
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-crossorigin}
   */
  imageCrossOrigin?: React.ComponentProps<'img'>['crossOrigin'] | null;

  //-----------------------------
  // Lightbox style
  //-----------------------------

  /**
   * Set z-index style, etc., for the parent react-modal
   * {@link https://github.com/reactjs/react-modal#styles}
   */
  reactModalStyle?: Modal.Styles;

  // Padding (px) between the edge of the window and the lightbox
  imagePadding?: number;

  wrapperClassName?: string;

  //-----------------------------
  // Other
  //-----------------------------

  // Array of custom toolbar buttons
  toolbarButtons?: React.ReactNode[];

  // When true, clicks outside of the image close the lightbox
  clickOutsideToClose?: boolean;

  // Set to false to disable zoom functionality and hide zoom buttons
  enableZoom?: boolean;

  /**
   * Override props set on react-modal
   * {@link https://github.com/reactjs/react-modal}
   */
  reactModalProps?: Partial<Modal.Props>;

  // Aria-labels
  /** `aria-label` and `title` set on the 'Next' button. Defaults to `'Next image'`.                                                                                | */
  nextLabel?: string;
  /** `aria-label` and `title` set on the 'Previous' button. Defaults to `'Previous image'`.                                                                        | */
  prevLabel?: string;
  /** `aria-label` and `title` set on the 'Zoom In' button. Defaults to `'Zoom in'`.                                                                                | */
  zoomInLabel?: string;
  /** `aria-label` and `title` set on the 'Zoom Out' button. Defaults to `'Zoom out'`.                                                                              | */
  zoomOutLabel?: string;
  /** `aria-label` and `title` set on the 'Close Lightbox' button. Defaults to `'Close lightbox'`.                                                                  | */
  closeLabel?: string;

  imageLoadErrorMessage?: React.ReactNode;

  /** Custom Loading indicator shown while loading images */
  loader?: React.ReactNode;
};

interface LightboxState {
  //-----------------------------
  // Animation
  //-----------------------------

  // Lightbox is closing
  // When Lightbox is mounted, if animation is enabled it will open with the reverse of the closing animation
  isClosing: boolean;

  // Component parts should animate (e.g., when images are moving, or image is being zoomed)
  shouldAnimate: boolean;

  //-----------------------------
  // Zoom settings
  //-----------------------------
  // Zoom level of image
  zoomLevel: number;

  //-----------------------------
  // Image position settings
  //-----------------------------
  // Horizontal offset from center
  offsetX: number;

  // Vertical offset from center
  offsetY: number;

  // image load error for srcType
  loadErrorStatus: { [srcType in SrcTypePlusThumbnails]?: Error };
}

interface Pointer {
  id: number | string;
  source: EventSource;
  x: number;
  y: number;
}
type PinchTouch = Pick<Pointer, 'id' | 'x' | 'y'>;

interface ImageCacheEntry {
  loaded: boolean;
  width: number;
  height: number;
}

type SrcType = 'mainSrc' | 'prevSrc' | 'nextSrc';
type SrcTypePlusThumbnails =
  | SrcType
  | 'mainSrcThumbnail'
  | 'prevSrcThumbnail'
  | 'nextSrcThumbnail';

class ReactImageLightbox extends Component<LightboxProps, LightboxState> {
  static isTargetMatchImage(target: unknown) {
    return (
      !!target &&
      target instanceof HTMLElement &&
      /ril-image-current/.test(target.className)
    );
  }

  static parseMouseEvent(mouseEvent: React.MouseEvent): Pointer {
    return {
      id: 'mouse',
      source: EventSource.Mouse,
      x: Math.floor(mouseEvent.clientX),
      y: Math.floor(mouseEvent.clientY),
    };
  }

  static parseTouchPointer(touchPointer: React.Touch): Pointer {
    return {
      id: touchPointer.identifier,
      source: EventSource.Touch,
      x: Math.floor(touchPointer.clientX),
      y: Math.floor(touchPointer.clientY),
    };
  }

  static parsePointerEvent(pointerEvent: React.PointerEvent): Pointer {
    return {
      id: pointerEvent.pointerId,
      source: EventSource.Pointer,
      x: Math.floor(pointerEvent.clientX),
      y: Math.floor(pointerEvent.clientY),
    };
  }

  // Request to transition to the previous image
  static getTransform({
    x = 0,
    y = 0,
    zoom = 1,
    width = 1,
    targetWidth = 1,
  }: {
    x?: number;
    y?: number;
    zoom?: number;
    width?: number;
    targetWidth?: number;
  }) {
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

  static defaultProps = {
    imageTitle: null,
    imageCaption: null,
    reactModalProps: {},
    animationDisabled: false,
    animationDuration: 300,
    animationOnKeyInput: false,
    clickOutsideToClose: true,
    closeLabel: 'Close lightbox',
    discourageDownloads: false,
    enableZoom: true,
    imagePadding: 10,
    keyRepeatKeyupBonus: 40,
    keyRepeatLimit: 180,
    nextLabel: 'Next image',
    onAfterOpen: () => {},
    onImageLoadError: () => {},
    onImageLoad: () => {},
    onMoveNextRequest: () => {},
    onMovePrevRequest: () => {},
    prevLabel: 'Previous image',
    reactModalStyle: {},
    wrapperClassName: '',
    zoomInLabel: 'Zoom in',
    zoomOutLabel: 'Zoom out',
    imageLoadErrorMessage: 'This image failed to load',
    loader: undefined,
  };

  static propTypes = {
    //-----------------------------
    // Image sources
    //-----------------------------

    // Main display image url
    mainSrc: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types

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

    // custom loader
    loader: PropTypes.node,
  };

  pointerList: Pointer[] = [];
  timeouts: NodeJS.Timeout[] = [];
  outerEl: React.RefObject<HTMLDivElement> = React.createRef();
  zoomInBtn: React.RefObject<HTMLButtonElement> = React.createRef();
  zoomOutBtn: React.RefObject<HTMLButtonElement> = React.createRef();
  caption: React.RefObject<HTMLDivElement> = React.createRef();

  // Current action
  currentAction = Gesture.None;

  // Events source
  eventsSource = EventSource.Any;

  // Prevent inner close
  preventInnerClose = false;
  preventInnerCloseTimeout: NodeJS.Timeout | null = null;

  // Used to disable animation when changing props.mainSrc|nextSrc|prevSrc
  keyPressed = false;

  // Used to store load state / dimensions of images
  imageCache: { [imageSrc: string]: ImageCacheEntry } = {};

  // Time the last keydown event was called (used in keyboard action rate limiting)
  lastKeyDownTime = 0;

  // Used for debouncing window resize event
  resizeTimeout: NodeJS.Timeout | null = null;

  // Used to determine when actions are triggered by the scroll wheel
  wheelActionTimeout: NodeJS.Timeout | null = null;
  resetScrollTimeout: NodeJS.Timeout | null = null;
  scrollX = 0;
  scrollY = 0;

  // Used in panning zoomed images
  moveStartX = 0;
  moveStartY = 0;
  moveStartOffsetX = 0;
  moveStartOffsetY = 0;

  // Used to swipe
  swipeStartX = 0;
  swipeStartY = 0;
  swipeEndX = 0;
  swipeEndY = 0;

  // Used to pinch¥
  pinchTouchList: PinchTouch[] | null = null;
  pinchDistance = 0;

  // Used to differentiate between images with identical src
  keyCounter = 0;

  // Used to detect a move when all src's remain unchanged (four or more of the same image in a row)
  moveRequested = false;

  didUnmount = false;

  windowContext: Window = window;

  listeners: { [name: string]: React.EventHandler<any> } = {};

  state = {
    //-----------------------------
    // Animation
    //-----------------------------

    // Lightbox is closing
    // When Lightbox is mounted, if animation is enabled it will open with the reverse of the closing animation
    isClosing: !this.props.animationDisabled,

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
    loadErrorStatus: {} as { [k in SrcTypePlusThumbnails]?: Error },
  };

  constructor(props: LightboxProps) {
    super(props);

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

  componentDidMount() {
    if (!this.props.animationDisabled) {
      // Make opening animation play
      this.setState({ isClosing: false });
    }

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

  shouldComponentUpdate(nextProps: LightboxProps) {
    this.getSrcTypes().forEach(srcType => {
      if (this.props[srcType.name] !== nextProps[srcType.name]) {
        this.moveRequested = false;
      }
    });

    // Wait for move...
    return !this.moveRequested;
  }

  componentDidUpdate(prevProps: LightboxProps) {
    let sourcesChanged = false;
    const prevSrcDict: { [src: string]: true } = {};
    const nextSrcDict: { [src: string]: true } = {};
    this.getSrcTypes().forEach(srcType => {
      if (prevProps[srcType.name] !== this.props[srcType.name]) {
        sourcesChanged = true;

        prevSrcDict[prevProps[srcType.name]!] = true;
        nextSrcDict[this.props[srcType.name]!] = true;
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
      this.loadAllImages(this.props);
    }
  }

  componentWillUnmount() {
    this.didUnmount = true;
    Object.keys(this.listeners).forEach(type => {
      this.windowContext.removeEventListener(type, this.listeners[type]);
    });
    this.timeouts.forEach(tid => clearTimeout(tid));
  }

  setTimeout(func: Function, time: number) {
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
  getBestImageForType(srcType: SrcType) {
    let imageSrc = this.props[srcType];
    if (!imageSrc) {
      return null;
    }

    let fitSizes = { width: 1, height: 1 };
    const thumbnailSrc = this.props[`${srcType}Thumbnail` as const];
    if (this.isImageLoaded(imageSrc)) {
      // Use full-size image if available
      fitSizes = this.getFitSizes(
        this.imageCache[imageSrc].width,
        this.imageCache[imageSrc].height
      );
    } else if (thumbnailSrc && this.isImageLoaded(thumbnailSrc)) {
      // Fall back to using thumbnail if the image has not been loaded
      imageSrc = thumbnailSrc;
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
  getFitSizes(width: number, height: number, stretch = false) {
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
    ] as const;
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

  clearTimeout(id: NodeJS.Timeout) {
    this.timeouts = this.timeouts.filter(tid => tid !== id);
    clearTimeout(id);
  }

  // Change zoom level
  changeZoom(zoomLevel: number, clientX?: number, clientY?: number) {
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
    if (this.currentAction !== Gesture.Pinch) {
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

  closeIfClickInner(event: React.MouseEvent<HTMLDivElement>) {
    if (
      !this.preventInnerClose &&
      event.target instanceof HTMLDivElement &&
      event.target.className.search(/\bril-inner\b/) > -1
    ) {
      this.requestClose(event);
    }
  }

  /**
   * Handle user keyboard actions
   */
  handleKeyInput(event: React.KeyboardEvent) {
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

  /**
   * Handle a mouse wheel event over the lightbox container
   */
  handleOuterMousewheel(event: React.WheelEvent) {
    // Prevent scrolling of the background
    event.stopPropagation();

    const xThreshold = WHEEL_MOVE_X_THRESHOLD;
    let actionDelay = 0;
    const imageMoveDelay = 500;

    if (this.resetScrollTimeout) {
      this.clearTimeout(this.resetScrollTimeout);
    }
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

  handleImageMouseWheel(event: React.WheelEvent) {
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
  handleImageDoubleClick(event: React.MouseEvent) {
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

  shouldHandleEvent(source: EventSource) {
    if (this.eventsSource === source) {
      return true;
    }
    if (this.eventsSource === EventSource.Any) {
      this.eventsSource = source;
      return true;
    }
    switch (source) {
      case EventSource.Mouse:
        return false;
      case EventSource.Touch:
        this.eventsSource = EventSource.Touch;
        this.filterPointersBySource();
        return true;
      case EventSource.Pointer:
        if (this.eventsSource === EventSource.Mouse) {
          this.eventsSource = EventSource.Pointer;
          this.filterPointersBySource();
          return true;
        }
        return false;
      default:
        return false;
    }
  }

  addPointer(pointer: Pointer) {
    this.pointerList.push(pointer);
  }

  removePointer(pointer: Pointer) {
    this.pointerList = this.pointerList.filter(({ id }) => id !== pointer.id);
  }

  filterPointersBySource() {
    this.pointerList = this.pointerList.filter(
      ({ source }) => source === this.eventsSource
    );
  }

  handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    if (
      this.shouldHandleEvent(EventSource.Mouse) &&
      ReactImageLightbox.isTargetMatchImage(event.target)
    ) {
      this.addPointer(ReactImageLightbox.parseMouseEvent(event));
      this.multiPointerStart(event);
    }
  }

  handleMouseMove(event: React.MouseEvent) {
    if (this.shouldHandleEvent(EventSource.Mouse)) {
      this.multiPointerMove(event, [ReactImageLightbox.parseMouseEvent(event)]);
    }
  }

  handleMouseUp(event: React.MouseEvent) {
    if (this.shouldHandleEvent(EventSource.Mouse)) {
      this.removePointer(ReactImageLightbox.parseMouseEvent(event));
      this.multiPointerEnd(event);
    }
  }

  handlePointerEvent(event: React.PointerEvent<any>) {
    if (this.shouldHandleEvent(EventSource.Pointer)) {
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

  handleTouchStart(event: React.TouchEvent) {
    if (
      this.shouldHandleEvent(EventSource.Touch) &&
      ReactImageLightbox.isTargetMatchImage(event.target)
    ) {
      [].forEach.call(event.changedTouches, eventTouch =>
        this.addPointer(ReactImageLightbox.parseTouchPointer(eventTouch))
      );
      this.multiPointerStart(event);
    }
  }

  handleTouchMove(event: React.TouchEvent) {
    if (this.shouldHandleEvent(EventSource.Touch)) {
      const pointers = [];
      for (let index = 0; index < event.changedTouches.length; index++) {
        pointers.push(
          ReactImageLightbox.parseTouchPointer(event.changedTouches[index])
        );
      }

      this.multiPointerMove(event, pointers);
    }
  }

  handleTouchEnd(event: React.TouchEvent) {
    if (this.shouldHandleEvent(EventSource.Touch)) {
      [].map.call(event.changedTouches, touch =>
        this.removePointer(ReactImageLightbox.parseTouchPointer(touch))
      );
      this.multiPointerEnd(event);
    }
  }

  decideMoveOrSwipe(pointer: Pointer) {
    if (this.state.zoomLevel <= MIN_ZOOM_LEVEL) {
      this.handleSwipeStart(pointer);
    } else {
      this.handleMoveStart(pointer);
    }
  }

  multiPointerStart(event: PointerlikeEvent) {
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

  multiPointerMove(event: PointerlikeEvent, pointerList: Pointer[]) {
    switch (this.currentAction) {
      case Gesture.Move: {
        event.preventDefault();
        this.handleMove(pointerList[0]);
        break;
      }
      case Gesture.Swipe: {
        event.preventDefault();
        this.handleSwipe(pointerList[0]);
        break;
      }
      case Gesture.Pinch: {
        event.preventDefault();
        this.handlePinch(pointerList);
        break;
      }
      default:
        break;
    }
  }

  multiPointerEnd(event: PointerlikeEvent) {
    if (this.currentAction !== Gesture.None) {
      this.setPreventInnerClose();
      this.handleEnd(event);
    }
    switch (this.pointerList.length) {
      case 0: {
        this.eventsSource = EventSource.Any;
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

  handleEnd(event: PointerlikeEvent | null) {
    switch (this.currentAction) {
      case Gesture.Move:
        this.handleMoveEnd();
        break;
      case Gesture.Swipe:
        this.handleSwipeEnd(event);
        break;
      case Gesture.Pinch:
        this.handlePinchEnd();
        break;
      default:
        break;
    }
  }

  // Handle move start over the lightbox container
  // This happens:
  // - On a mouseDown event
  // - On a touchstart event
  handleMoveStart({ x: clientX, y: clientY }: Pointer) {
    if (!this.props.enableZoom) {
      return;
    }
    this.currentAction = Gesture.Move;
    this.moveStartX = clientX;
    this.moveStartY = clientY;
    this.moveStartOffsetX = this.state.offsetX;
    this.moveStartOffsetY = this.state.offsetY;
  }

  // Handle dragging over the lightbox container
  // This happens:
  // - After a mouseDown and before a mouseUp event
  // - After a touchstart and before a touchend event
  handleMove({ x: clientX, y: clientY }: Pointer) {
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
    this.currentAction = Gesture.None;
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

  handleSwipeStart({ x: clientX, y: clientY }: Pointer) {
    this.currentAction = Gesture.Swipe;
    this.swipeStartX = clientX;
    this.swipeStartY = clientY;
    this.swipeEndX = clientX;
    this.swipeEndY = clientY;
  }

  handleSwipe({ x: clientX, y: clientY }: Pointer) {
    this.swipeEndX = clientX;
    this.swipeEndY = clientY;
  }

  handleSwipeEnd(event: PointerlikeEvent | null) {
    const xDiff = this.swipeEndX - this.swipeStartX;
    const xDiffAbs = Math.abs(xDiff);
    const yDiffAbs = Math.abs(this.swipeEndY - this.swipeStartY);

    this.currentAction = Gesture.None;
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

  calculatePinchDistance([a, b]: PinchTouch[]) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }

  calculatePinchCenter([a, b]: PinchTouch[]) {
    return {
      x: a.x - (a.x - b.x) / 2,
      y: a.y - (a.y - b.y) / 2,
    };
  }

  handlePinchStart(pointerList: Pointer[]) {
    if (!this.props.enableZoom) {
      return;
    }
    this.currentAction = Gesture.Pinch;
    this.pinchTouchList = pointerList.map(({ id, x, y }) => ({ id, x, y }));
    this.pinchDistance = this.calculatePinchDistance(this.pinchTouchList);
  }

  handlePinch(pointerList: Pointer[]) {
    this.pinchTouchList = (this.pinchTouchList || []).map(oldPointer => {
      for (let i = 0; i < pointerList.length; i += 1) {
        if (pointerList[i].id === oldPointer.id) {
          return pointerList[i];
        }
      }

      return oldPointer;
    });

    const newDistance = this.calculatePinchDistance(this.pinchTouchList);

    const zoomLevel = this.state.zoomLevel + newDistance - this.pinchDistance;

    this.pinchDistance = newDistance;
    const { x: clientX, y: clientY } = this.calculatePinchCenter(
      this.pinchTouchList
    );
    this.changeZoom(zoomLevel, clientX, clientY);
  }

  handlePinchEnd() {
    this.currentAction = Gesture.None;
    this.pinchTouchList = null;
    this.pinchDistance = 0;
  }

  // Handle the window resize event
  handleWindowResize() {
    if (this.resizeTimeout !== null) {
      this.clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = this.setTimeout(this.forceUpdate.bind(this), 100);
  }

  handleZoomInButtonClick() {
    const nextZoomLevel = this.state.zoomLevel + ZOOM_BUTTON_INCREMENT_SIZE;
    this.changeZoom(nextZoomLevel);
    if (nextZoomLevel === MAX_ZOOM_LEVEL) {
      this.zoomOutBtn.current?.focus();
    }
  }

  handleZoomOutButtonClick() {
    const nextZoomLevel = this.state.zoomLevel - ZOOM_BUTTON_INCREMENT_SIZE;
    this.changeZoom(nextZoomLevel);
    if (nextZoomLevel === MIN_ZOOM_LEVEL) {
      this.zoomInBtn.current?.focus();
    }
  }

  handleCaptionMousewheel(event: React.WheelEvent) {
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
  isImageLoaded(imageSrc: string | undefined) {
    return (
      !!imageSrc &&
      imageSrc in this.imageCache &&
      this.imageCache[imageSrc].loaded
    );
  }

  // Load image from src and call callback with image width and height on load
  loadImage(
    srcType: SrcTypePlusThumbnails,
    imageSrc: string,
    done: (error?: string | Event) => void
  ) {
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
    const generateLoadDoneCallback = (
      srcType: SrcTypePlusThumbnails,
      imageSrc: string
    ) => (err?: string | Event) => {
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
      const srcToLoad = props[type];

      // there is no error when we try to load it initially
      if (srcToLoad && this.state.loadErrorStatus[type]) {
        this.setState(prevState => ({
          loadErrorStatus: { ...prevState.loadErrorStatus, [type]: false },
        }));
      }

      // Load unloaded images
      if (srcToLoad && !this.isImageLoaded(srcToLoad)) {
        this.loadImage(
          type,
          srcToLoad,
          generateLoadDoneCallback(type, srcToLoad)
        );
      }
    });
  }

  // Request that the lightbox be closed
  requestClose(event: React.MouseEvent | React.KeyboardEvent) {
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

  requestMove(direction: 'prev' | 'next', event?: MoveRequestEvent) {
    let shouldAnimate: boolean = false;
    // Enable animated states
    if (
      !this.props.animationDisabled &&
      (!this.keyPressed || this.props.animationOnKeyInput)
    ) {
      shouldAnimate = true;
      this.setTimeout(
        () => this.setState({ shouldAnimate: false }),
        this.props.animationDuration
      );
    }

    // Reset the zoom level on image move
    const nextState = {
      zoomLevel: MIN_ZOOM_LEVEL,
      offsetX: 0,
      offsetY: 0,
      ...(shouldAnimate ? ({ shouldAnimate: true } as {}) : {}),
    };

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
  requestMoveNext(event?: MoveRequestEvent) {
    this.requestMove('next', event);
  }

  // Request to transition to the previous image
  requestMovePrev(event?: MoveRequestEvent) {
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
      loader,
    } = this.props;
    const {
      zoomLevel,
      offsetX,
      offsetY,
      isClosing,
      loadErrorStatus,
    } = this.state;

    const boxSize = this.getLightboxRect();
    let transitionStyle: { transition?: string } = {};

    // Transition settings for sliding animations
    if (!animationDisabled && this.isAnimating()) {
      transitionStyle = {
        transition: `transform ${animationDuration}ms`,
      };
    }

    // Key endings to differentiate between images with the same src
    const keyEndings: { [srcType in SrcTypePlusThumbnails]?: string } = {};
    this.getSrcTypes().forEach(({ name, keyEnding }) => {
      keyEndings[name] = keyEnding;
    });

    // Images to be displayed
    const images: JSX.Element[] = [];
    const addImage = (
      srcType: SrcType,
      imageClass: string,
      transforms: { x?: number; y?: number; zoom?: number }
    ) => {
      // Ignore types that have no source defined for their full size image
      if (!this.props[srcType]) {
        return;
      }
      const bestImageInfo = this.getBestImageForType(srcType);

      const imageStyle: CSSProperties = {
        ...transitionStyle,
        ...ReactImageLightbox.getTransform({
          ...transforms,
          ...bestImageInfo,
        }),
      };

      if (zoomLevel > MIN_ZOOM_LEVEL) {
        imageStyle.cursor = 'move';
      }

      // when error on one of the loads then push custom error stuff
      if (
        bestImageInfo === null &&
        (Object.keys(loadErrorStatus) as SrcTypePlusThumbnails[]).some(
          key => loadErrorStatus[key]
        )
      ) {
        images.push(
          <div
            className={`${imageClass} ril__image ril-errored`}
            style={imageStyle}
            key={(this.props[srcType] || '') + keyEndings[srcType]}
          >
            <div className="ril__errorContainer">
              {this.props.imageLoadErrorMessage}
            </div>
          </div>
        );

        return;
      }
      if (bestImageInfo === null) {
        const loadingIcon =
          loader !== undefined ? (
            loader
          ) : (
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
            key={(this.props[srcType] || '') + keyEndings[srcType]}
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
              typeof imageTitle === 'string'
                ? imageTitle || undefined
                : undefined
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
        contentLabel="Lightbox"
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
          tabIndex={-1} // Enables key handlers on div
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

          {prevSrc && (
            <button // Move to previous image button
              type="button"
              className="ril-prev-button ril__navButtons ril__navButtonPrev"
              key="prev"
              aria-label={this.props.prevLabel}
              title={this.props.prevLabel}
              onClick={!this.isAnimating() ? this.requestMovePrev : undefined} // Ignore clicks during animation
            />
          )}

          {nextSrc && (
            <button // Move to next image button
              type="button"
              className="ril-next-button ril__navButtons ril__navButtonNext"
              key="next"
              aria-label={this.props.nextLabel}
              title={this.props.nextLabel}
              onClick={!this.isAnimating() ? this.requestMoveNext : undefined} // Ignore clicks during animation
            />
          )}

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
                    title={this.props.zoomInLabel}
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
                    title={this.props.zoomOutLabel}
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
                  title={this.props.closeLabel}
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

export default ReactImageLightbox;
