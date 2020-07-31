import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === 'object' || typeof call === 'function')) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter))
    return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

/**
 * Placeholder for future translate functionality
 */
function translate(str) {
  var replaceStrings =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!str) {
    return '';
  }

  var translated = str;

  if (replaceStrings) {
    Object.keys(replaceStrings).forEach(function(placeholder) {
      translated = translated.replace(placeholder, replaceStrings[placeholder]);
    });
  }

  return translated;
}
function getWindowWidth() {
  return typeof global.window !== 'undefined' ? global.window.innerWidth : 0;
}
function getWindowHeight() {
  return typeof global.window !== 'undefined' ? global.window.innerHeight : 0;
} // Get the highest window context that isn't cross-origin
// (When in an iframe)

function getHighestSafeWindowContext() {
  var self =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : global.window.self;
  var referrer = self.document.referrer; // If we reached the top level, return self

  if (self === global.window.top || !referrer) {
    return self;
  }

  var getOrigin = function getOrigin(href) {
    return href.match(/(.*\/\/.*?)(\/|$)/)[1];
  }; // If parent is the same origin, we can move up one context
  // Reference: https://stackoverflow.com/a/21965342/1601953

  if (getOrigin(self.location.href) === getOrigin(referrer)) {
    return getHighestSafeWindowContext(self.parent);
  } // If a different origin, we consider the current level
  // as the top reachable one

  return self;
}

// Min image zoom level
var MIN_ZOOM_LEVEL = 0; // Max image zoom level

var MAX_ZOOM_LEVEL = 300; // Size ratio between previous and next zoom levels

var ZOOM_RATIO = 1.007; // How much to increase/decrease the zoom level when the zoom buttons are clicked

var ZOOM_BUTTON_INCREMENT_SIZE = 100; // Used to judge the amount of horizontal scroll needed to initiate a image move

var WHEEL_MOVE_X_THRESHOLD = 200; // Used to judge the amount of vertical scroll needed to initiate a zoom action

var WHEEL_MOVE_Y_THRESHOLD = 1;
var KEYS = {
  ESC: 27,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
}; // Actions

var ACTION_NONE = 0;
var ACTION_MOVE = 1;
var ACTION_SWIPE = 2;
var ACTION_PINCH = 3;

var SOURCE_ANY = 0;
var SOURCE_MOUSE = 1;
var SOURCE_TOUCH = 2;
var SOURCE_POINTER = 3; // Minimal swipe distance

var MIN_SWIPE_DISTANCE = 200;

var ReactImageLightbox = /*#__PURE__*/ (function(_Component) {
  _inherits(ReactImageLightbox, _Component);

  var _super = _createSuper(ReactImageLightbox);

  _createClass(ReactImageLightbox, null, [
    {
      key: 'isTargetMatchImage',
      value: function isTargetMatchImage(target) {
        return target && /ril-image-current/.test(target.className);
      },
    },
    {
      key: 'parseMouseEvent',
      value: function parseMouseEvent(mouseEvent) {
        return {
          id: 'mouse',
          source: SOURCE_MOUSE,
          x: parseInt(mouseEvent.clientX, 10),
          y: parseInt(mouseEvent.clientY, 10),
        };
      },
    },
    {
      key: 'parseTouchPointer',
      value: function parseTouchPointer(touchPointer) {
        return {
          id: touchPointer.identifier,
          source: SOURCE_TOUCH,
          x: parseInt(touchPointer.clientX, 10),
          y: parseInt(touchPointer.clientY, 10),
        };
      },
    },
    {
      key: 'parsePointerEvent',
      value: function parsePointerEvent(pointerEvent) {
        return {
          id: pointerEvent.pointerId,
          source: SOURCE_POINTER,
          x: parseInt(pointerEvent.clientX, 10),
          y: parseInt(pointerEvent.clientY, 10),
        };
      }, // Request to transition to the previous image
    },
    {
      key: 'getTransform',
      value: function getTransform(_ref) {
        var _ref$x = _ref.x,
          x = _ref$x === void 0 ? 0 : _ref$x,
          _ref$y = _ref.y,
          y = _ref$y === void 0 ? 0 : _ref$y,
          _ref$zoom = _ref.zoom,
          zoom = _ref$zoom === void 0 ? 1 : _ref$zoom,
          width = _ref.width,
          targetWidth = _ref.targetWidth;
        var nextX = x;
        var windowWidth = getWindowWidth();

        if (width > windowWidth) {
          nextX += (windowWidth - width) / 2;
        }

        var scaleFactor = zoom * (targetWidth / width);
        return {
          transform: 'translate3d('
            .concat(nextX, 'px,')
            .concat(y, 'px,0) scale3d(')
            .concat(scaleFactor, ',')
            .concat(scaleFactor, ',1)'),
        };
      },
    },
  ]);

  function ReactImageLightbox(props) {
    var _this;

    _classCallCheck(this, ReactImageLightbox);

    _this = _super.call(this, props);
    _this.state = {
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
    }; // Refs

    _this.outerEl = /*#__PURE__*/ React.createRef();
    _this.zoomInBtn = /*#__PURE__*/ React.createRef();
    _this.zoomOutBtn = /*#__PURE__*/ React.createRef();
    _this.caption = /*#__PURE__*/ React.createRef();
    _this.closeIfClickInner = _this.closeIfClickInner.bind(
      _assertThisInitialized(_this)
    );
    _this.handleImageDoubleClick = _this.handleImageDoubleClick.bind(
      _assertThisInitialized(_this)
    );
    _this.handleImageMouseWheel = _this.handleImageMouseWheel.bind(
      _assertThisInitialized(_this)
    );
    _this.handleKeyInput = _this.handleKeyInput.bind(
      _assertThisInitialized(_this)
    );
    _this.handleMouseUp = _this.handleMouseUp.bind(
      _assertThisInitialized(_this)
    );
    _this.handleMouseDown = _this.handleMouseDown.bind(
      _assertThisInitialized(_this)
    );
    _this.handleMouseMove = _this.handleMouseMove.bind(
      _assertThisInitialized(_this)
    );
    _this.handleOuterMousewheel = _this.handleOuterMousewheel.bind(
      _assertThisInitialized(_this)
    );
    _this.handleTouchStart = _this.handleTouchStart.bind(
      _assertThisInitialized(_this)
    );
    _this.handleTouchMove = _this.handleTouchMove.bind(
      _assertThisInitialized(_this)
    );
    _this.handleTouchEnd = _this.handleTouchEnd.bind(
      _assertThisInitialized(_this)
    );
    _this.handlePointerEvent = _this.handlePointerEvent.bind(
      _assertThisInitialized(_this)
    );
    _this.handleCaptionMousewheel = _this.handleCaptionMousewheel.bind(
      _assertThisInitialized(_this)
    );
    _this.handleWindowResize = _this.handleWindowResize.bind(
      _assertThisInitialized(_this)
    );
    _this.handleZoomInButtonClick = _this.handleZoomInButtonClick.bind(
      _assertThisInitialized(_this)
    );
    _this.handleZoomOutButtonClick = _this.handleZoomOutButtonClick.bind(
      _assertThisInitialized(_this)
    );
    _this.requestClose = _this.requestClose.bind(_assertThisInitialized(_this));
    _this.requestMoveNext = _this.requestMoveNext.bind(
      _assertThisInitialized(_this)
    );
    _this.requestMovePrev = _this.requestMovePrev.bind(
      _assertThisInitialized(_this)
    );
    _this.requestMoveTo = _this.requestMoveTo.bind(
      _assertThisInitialized(_this)
    );
    return _this;
  } // eslint-disable-next-line camelcase

  _createClass(ReactImageLightbox, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function UNSAFE_componentWillMount() {
        // Timeouts - always clear it before umount
        this.timeouts = []; // Current action

        this.currentAction = ACTION_NONE; // Events source

        this.eventsSource = SOURCE_ANY; // Empty pointers list

        this.pointerList = []; // Prevent inner close

        this.preventInnerClose = false;
        this.preventInnerCloseTimeout = null; // Used to disable animation when changing props.mainSrc|nextSrc|prevSrc

        this.keyPressed = false; // Used to store load state / dimensions of images

        this.imageCache = {}; // Time the last keydown event was called (used in keyboard action rate limiting)

        this.lastKeyDownTime = 0; // Used for debouncing window resize event

        this.resizeTimeout = null; // Used to determine when actions are triggered by the scroll wheel

        this.wheelActionTimeout = null;
        this.resetScrollTimeout = null;
        this.scrollX = 0;
        this.scrollY = 0; // Used in panning zoomed images

        this.moveStartX = 0;
        this.moveStartY = 0;
        this.moveStartOffsetX = 0;
        this.moveStartOffsetY = 0; // Used to swipe

        this.swipeStartX = 0;
        this.swipeStartY = 0;
        this.swipeEndX = 0;
        this.swipeEndY = 0; // Used to pinch

        this.pinchTouchList = null;
        this.pinchDistance = 0; // Used to differentiate between images with identical src

        this.keyCounter = 0; // Used to detect a move when all src's remain unchanged (four or more of the same image in a row)

        this.moveRequested = false;
        this.setState({
          isClosing: false,
        });

        if (!this.props.animationDisabled) {
          // Make opening animation play
          this.setState({
            isClosing: false,
          });
        }
      },
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

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
        Object.keys(this.listeners).forEach(function(type) {
          _this2.windowContext.addEventListener(type, _this2.listeners[type]);
        });
        this.loadAllImages();
      }, // eslint-disable-next-line camelcase
    },
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var _this3 = this;

        // Iterate through the source types for prevProps and nextProps to
        //  determine if any of the sources changed
        var sourcesChanged = false;
        var prevSrcDict = {};
        var nextSrcDict = {};
        this.getSrcTypes().forEach(function(srcType) {
          if (_this3.props[srcType.name] !== nextProps[srcType.name]) {
            sourcesChanged = true;
            prevSrcDict[_this3.props[srcType.name]] = true;
            nextSrcDict[nextProps[srcType.name]] = true;
          }
        });

        if (sourcesChanged || this.moveRequested) {
          // Reset the loaded state for images not rendered next
          Object.keys(prevSrcDict).forEach(function(prevSrc) {
            if (!(prevSrc in nextSrcDict) && prevSrc in _this3.imageCache) {
              _this3.imageCache[prevSrc].loaded = false;
            }
          });
          this.moveRequested = false; // Load any new images

          this.loadAllImages(nextProps);
        }
      },
    },
    {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate() {
        // Wait for move...
        return !this.moveRequested;
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var _this4 = this;

        this.didUnmount = true;
        Object.keys(this.listeners).forEach(function(type) {
          _this4.windowContext.removeEventListener(
            type,
            _this4.listeners[type]
          );
        });
        this.timeouts.forEach(function(tid) {
          return clearTimeout(tid);
        });
      },
    },
    {
      key: 'setTimeout',
      value: (function(_setTimeout) {
        function setTimeout(_x, _x2) {
          return _setTimeout.apply(this, arguments);
        }

        setTimeout.toString = function() {
          return _setTimeout.toString();
        };

        return setTimeout;
      })(function(func, time) {
        var _this5 = this;

        var id = setTimeout(function() {
          _this5.timeouts = _this5.timeouts.filter(function(tid) {
            return tid !== id;
          });
          func();
        }, time);
        this.timeouts.push(id);
        return id;
      }),
    },
    {
      key: 'setPreventInnerClose',
      value: function setPreventInnerClose() {
        var _this6 = this;

        if (this.preventInnerCloseTimeout) {
          this.clearTimeout(this.preventInnerCloseTimeout);
        }

        this.preventInnerClose = true;
        this.preventInnerCloseTimeout = this.setTimeout(function() {
          _this6.preventInnerClose = false;
          _this6.preventInnerCloseTimeout = null;
        }, 100);
      }, // Get info for the best suited image to display with the given srcType
    },
    {
      key: 'getBestImageForType',
      value: function getBestImageForType(srcType) {
        var imageSrc = this.props[srcType];
        var fitSizes = {};

        if (this.isImageLoaded(imageSrc)) {
          // Use full-size image if available
          fitSizes = this.getFitSizes(
            this.imageCache[imageSrc].width,
            this.imageCache[imageSrc].height
          );
        } else if (
          this.isImageLoaded(this.props[''.concat(srcType, 'Thumbnail')])
        ) {
          // Fall back to using thumbnail if the image has not been loaded
          imageSrc = this.props[''.concat(srcType, 'Thumbnail')];
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
      }, // Get sizing for when an image is larger than the window
    },
    {
      key: 'getFitSizes',
      value: function getFitSizes(width, height, stretch) {
        var boxSize = this.getLightboxRect();
        var imageVerticalPadding =
          this.props.imagePadding < 128 ? 129 : this.props.imagePadding;
        imageVerticalPadding = boxSize.width > 600 ? 170 : imageVerticalPadding;
        var widthImagePadding =
          boxSize.width < 600 ? 15 : this.props.imagePadding;
        var maxHeight = boxSize.height - imageVerticalPadding * 2;
        var maxWidth = boxSize.width - widthImagePadding * 2;
        maxWidth = boxSize.width > 1340 ? 1000 : maxWidth;
        maxHeight = boxSize.height > 1071.2 ? 1071.2 : maxHeight;

        if (!stretch) {
          maxHeight = Math.min(maxHeight, height);
          maxWidth = Math.min(maxWidth, width);
        }

        var maxRatio = maxWidth / maxHeight;
        var srcRatio = width / height;

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
      },
    },
    {
      key: 'getMaxOffsets',
      value: function getMaxOffsets() {
        var zoomLevel =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : this.state.zoomLevel;
        var currentImageInfo = this.getBestImageForType('mainSrc');

        if (currentImageInfo === null) {
          return {
            maxX: 0,
            minX: 0,
            maxY: 0,
            minY: 0,
          };
        }

        var boxSize = this.getLightboxRect();
        var zoomMultiplier = this.getZoomMultiplier(zoomLevel);
        var maxX = 0;

        if (zoomMultiplier * currentImageInfo.width - boxSize.width < 0) {
          // if there is still blank space in the X dimension, don't limit except to the opposite edge
          maxX = (boxSize.width - zoomMultiplier * currentImageInfo.width) / 2;
        } else {
          maxX = (zoomMultiplier * currentImageInfo.width - boxSize.width) / 2;
        }

        var maxY = 0;

        if (zoomMultiplier * currentImageInfo.height - boxSize.height < 0) {
          // if there is still blank space in the Y dimension, don't limit except to the opposite edge
          maxY =
            (boxSize.height - zoomMultiplier * currentImageInfo.height) / 2;
        } else {
          maxY =
            (zoomMultiplier * currentImageInfo.height - boxSize.height) / 2;
        }

        return {
          maxX: maxX,
          maxY: maxY,
          minX: -1 * maxX,
          minY: -1 * maxY,
        };
      }, // Get image src types
    },
    {
      key: 'getSrcTypes',
      value: function getSrcTypes() {
        return [
          {
            name: 'mainSrc',
            keyEnding: 'i'.concat(this.keyCounter),
          },
          {
            name: 'mainSrcThumbnail',
            keyEnding: 't'.concat(this.keyCounter),
          },
          {
            name: 'nextSrc',
            keyEnding: 'i'.concat(this.keyCounter + 1),
          },
          {
            name: 'nextSrcThumbnail',
            keyEnding: 't'.concat(this.keyCounter + 1),
          },
          {
            name: 'prevSrc',
            keyEnding: 'i'.concat(this.keyCounter - 1),
          },
          {
            name: 'prevSrcThumbnail',
            keyEnding: 't'.concat(this.keyCounter - 1),
          },
        ];
      },
      /**
       * Get sizing when the image is scaled
       */
    },
    {
      key: 'getZoomMultiplier',
      value: function getZoomMultiplier() {
        var zoomLevel =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : this.state.zoomLevel;
        return Math.pow(ZOOM_RATIO, zoomLevel);
      },
      /**
       * Get the size of the lightbox in pixels
       */
    },
    {
      key: 'getLightboxRect',
      value: function getLightboxRect() {
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
      },
    },
    {
      key: 'clearTimeout',
      value: (function(_clearTimeout) {
        function clearTimeout(_x3) {
          return _clearTimeout.apply(this, arguments);
        }

        clearTimeout.toString = function() {
          return _clearTimeout.toString();
        };

        return clearTimeout;
      })(function(id) {
        this.timeouts = this.timeouts.filter(function(tid) {
          return tid !== id;
        });
        clearTimeout(id);
      }), // Change zoom level
    },
    {
      key: 'changeZoom',
      value: function changeZoom(zoomLevel, clientX, clientY) {
        // Ignore if zoom disabled
        if (!this.props.enableZoom) {
          return;
        } // Constrain zoom level to the set bounds

        var nextZoomLevel = Math.max(
          MIN_ZOOM_LEVEL,
          Math.min(MAX_ZOOM_LEVEL, zoomLevel)
        ); // Ignore requests that don't change the zoom level

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

        var imageBaseSize = this.getBestImageForType('mainSrc');

        if (imageBaseSize === null) {
          return;
        }

        var currentZoomMultiplier = this.getZoomMultiplier();
        var nextZoomMultiplier = this.getZoomMultiplier(nextZoomLevel); // Default to the center of the image to zoom when no mouse position specified

        var boxRect = this.getLightboxRect();
        var pointerX =
          typeof clientX !== 'undefined'
            ? clientX - boxRect.left
            : boxRect.width / 2;
        var pointerY =
          typeof clientY !== 'undefined'
            ? clientY - boxRect.top
            : boxRect.height / 2;
        var currentImageOffsetX =
          (boxRect.width - imageBaseSize.width * currentZoomMultiplier) / 2;
        var currentImageOffsetY =
          (boxRect.height - imageBaseSize.height * currentZoomMultiplier) / 2;
        var currentImageRealOffsetX = currentImageOffsetX - this.state.offsetX;
        var currentImageRealOffsetY = currentImageOffsetY - this.state.offsetY;
        var currentPointerXRelativeToImage =
          (pointerX - currentImageRealOffsetX) / currentZoomMultiplier;
        var currentPointerYRelativeToImage =
          (pointerY - currentImageRealOffsetY) / currentZoomMultiplier;
        var nextImageRealOffsetX =
          pointerX - currentPointerXRelativeToImage * nextZoomMultiplier;
        var nextImageRealOffsetY =
          pointerY - currentPointerYRelativeToImage * nextZoomMultiplier;
        var nextImageOffsetX =
          (boxRect.width - imageBaseSize.width * nextZoomMultiplier) / 2;
        var nextImageOffsetY =
          (boxRect.height - imageBaseSize.height * nextZoomMultiplier) / 2;
        var nextOffsetX = nextImageOffsetX - nextImageRealOffsetX;
        var nextOffsetY = nextImageOffsetY - nextImageRealOffsetY; // When zooming out, limit the offset so things don't get left askew

        if (this.currentAction !== ACTION_PINCH) {
          var maxOffsets = this.getMaxOffsets();

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
      },
    },
    {
      key: 'closeIfClickInner',
      value: function closeIfClickInner(event) {
        if (
          !this.preventInnerClose &&
          event.target.className.search(/\bril-inner\b/) > -1
        ) {
          this.requestClose(event);
        }
      },
      /**
       * Handle user keyboard actions
       */
    },
    {
      key: 'handleKeyInput',
      value: function handleKeyInput(event) {
        event.stopPropagation(); // Ignore key input during animations

        if (this.isAnimating()) {
          return;
        } // Allow slightly faster navigation through the images when user presses keys repeatedly

        if (event.type === 'keyup') {
          this.lastKeyDownTime -= this.props.keyRepeatKeyupBonus;
          return;
        }

        var keyCode = event.which || event.keyCode; // Ignore key presses that happen too close to each other (when rapid fire key pressing or holding down the key)
        // But allow it if it's a lightbox closing action

        var currentTime = new Date();

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
        }
      },
      /**
       * Handle a mouse wheel event over the lightbox container
       */
    },
    {
      key: 'handleOuterMousewheel',
      value: function handleOuterMousewheel(event) {
        var _this7 = this;

        // Prevent scrolling of the background
        event.stopPropagation();
        var xThreshold = WHEEL_MOVE_X_THRESHOLD;
        var actionDelay = 0;
        var imageMoveDelay = 500;
        this.clearTimeout(this.resetScrollTimeout);
        this.resetScrollTimeout = this.setTimeout(function() {
          _this7.scrollX = 0;
          _this7.scrollY = 0;
        }, 300); // Prevent rapid-fire zoom behavior

        if (this.wheelActionTimeout !== null || this.isAnimating()) {
          return;
        }

        if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
          // handle horizontal scrolls with image moves
          this.scrollY = 0;
          this.scrollX += event.deltaX;
          var bigLeapX = xThreshold / 2; // If the scroll amount has accumulated sufficiently, or a large leap was taken

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
        } // Allow successive actions after the set delay

        if (actionDelay !== 0) {
          this.wheelActionTimeout = this.setTimeout(function() {
            _this7.wheelActionTimeout = null;
          }, actionDelay);
        }
      },
    },
    {
      key: 'handleImageMouseWheel',
      value: function handleImageMouseWheel(event) {
        var yThreshold = WHEEL_MOVE_Y_THRESHOLD;

        if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
          event.stopPropagation(); // If the vertical scroll amount was large enough, perform a zoom

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
      },
      /**
       * Handle a double click on the current image
       */
    },
    {
      key: 'handleImageDoubleClick',
      value: function handleImageDoubleClick(event) {
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
      },
    },
    {
      key: 'shouldHandleEvent',
      value: function shouldHandleEvent(source) {
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
      },
    },
    {
      key: 'addPointer',
      value: function addPointer(pointer) {
        this.pointerList.push(pointer);
      },
    },
    {
      key: 'removePointer',
      value: function removePointer(pointer) {
        this.pointerList = this.pointerList.filter(function(_ref2) {
          var id = _ref2.id;
          return id !== pointer.id;
        });
      },
    },
    {
      key: 'filterPointersBySource',
      value: function filterPointersBySource() {
        var _this8 = this;

        this.pointerList = this.pointerList.filter(function(_ref3) {
          var source = _ref3.source;
          return source === _this8.eventsSource;
        });
      },
    },
    {
      key: 'handleMouseDown',
      value: function handleMouseDown(event) {
        if (
          this.shouldHandleEvent(SOURCE_MOUSE) &&
          ReactImageLightbox.isTargetMatchImage(event.target)
        ) {
          this.addPointer(ReactImageLightbox.parseMouseEvent(event));
          this.multiPointerStart(event);
        }
      },
    },
    {
      key: 'handleMouseMove',
      value: function handleMouseMove(event) {
        if (this.shouldHandleEvent(SOURCE_MOUSE)) {
          this.multiPointerMove(event, [
            ReactImageLightbox.parseMouseEvent(event),
          ]);
        }
      },
    },
    {
      key: 'handleMouseUp',
      value: function handleMouseUp(event) {
        if (this.shouldHandleEvent(SOURCE_MOUSE)) {
          this.removePointer(ReactImageLightbox.parseMouseEvent(event));
          this.multiPointerEnd(event);
        }
      },
    },
    {
      key: 'handlePointerEvent',
      value: function handlePointerEvent(event) {
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
          }
        }
      },
    },
    {
      key: 'handleTouchStart',
      value: function handleTouchStart(event) {
        var _this9 = this;

        if (
          this.shouldHandleEvent(SOURCE_TOUCH) &&
          ReactImageLightbox.isTargetMatchImage(event.target)
        ) {
          [].forEach.call(event.changedTouches, function(eventTouch) {
            return _this9.addPointer(
              ReactImageLightbox.parseTouchPointer(eventTouch)
            );
          });
          this.multiPointerStart(event);
        }
      },
    },
    {
      key: 'handleTouchMove',
      value: function handleTouchMove(event) {
        if (this.shouldHandleEvent(SOURCE_TOUCH)) {
          this.multiPointerMove(
            event,
            [].map.call(event.changedTouches, function(eventTouch) {
              return ReactImageLightbox.parseTouchPointer(eventTouch);
            })
          );
        }
      },
    },
    {
      key: 'handleTouchEnd',
      value: function handleTouchEnd(event) {
        var _this10 = this;

        if (this.shouldHandleEvent(SOURCE_TOUCH)) {
          [].map.call(event.changedTouches, function(touch) {
            return _this10.removePointer(
              ReactImageLightbox.parseTouchPointer(touch)
            );
          });
          this.multiPointerEnd(event);
        }
      },
    },
    {
      key: 'decideMoveOrSwipe',
      value: function decideMoveOrSwipe(pointer) {
        if (this.state.zoomLevel <= MIN_ZOOM_LEVEL) {
          this.handleSwipeStart(pointer);
        } else {
          this.handleMoveStart(pointer);
        }
      },
    },
    {
      key: 'multiPointerStart',
      value: function multiPointerStart(event) {
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
        }
      },
    },
    {
      key: 'multiPointerMove',
      value: function multiPointerMove(event, pointerList) {
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
        }
      },
    },
    {
      key: 'multiPointerEnd',
      value: function multiPointerEnd(event) {
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
        }
      },
    },
    {
      key: 'handleEnd',
      value: function handleEnd(event) {
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
        }
      }, // Handle move start over the lightbox container
      // This happens:
      // - On a mouseDown event
      // - On a touchstart event
    },
    {
      key: 'handleMoveStart',
      value: function handleMoveStart(_ref4) {
        var clientX = _ref4.x,
          clientY = _ref4.y;

        if (!this.props.enableZoom) {
          return;
        }

        this.currentAction = ACTION_MOVE;
        this.moveStartX = clientX;
        this.moveStartY = clientY;
        this.moveStartOffsetX = this.state.offsetX;
        this.moveStartOffsetY = this.state.offsetY;
      }, // Handle dragging over the lightbox container
      // This happens:
      // - After a mouseDown and before a mouseUp event
      // - After a touchstart and before a touchend event
    },
    {
      key: 'handleMove',
      value: function handleMove(_ref5) {
        var clientX = _ref5.x,
          clientY = _ref5.y;
        var newOffsetX = this.moveStartX - clientX + this.moveStartOffsetX;
        var newOffsetY = this.moveStartY - clientY + this.moveStartOffsetY;

        if (
          this.state.offsetX !== newOffsetX ||
          this.state.offsetY !== newOffsetY
        ) {
          this.setState({
            offsetX: newOffsetX,
            offsetY: newOffsetY,
          });
        }
      },
    },
    {
      key: 'handleMoveEnd',
      value: function handleMoveEnd() {
        var _this11 = this;

        this.currentAction = ACTION_NONE;
        this.moveStartX = 0;
        this.moveStartY = 0;
        this.moveStartOffsetX = 0;
        this.moveStartOffsetY = 0; // Snap image back into frame if outside max offset range

        var maxOffsets = this.getMaxOffsets();
        var nextOffsetX = Math.max(
          maxOffsets.minX,
          Math.min(maxOffsets.maxX, this.state.offsetX)
        );
        var nextOffsetY = Math.max(
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
          this.setTimeout(function() {
            _this11.setState({
              shouldAnimate: false,
            });
          }, this.props.animationDuration);
        }
      },
    },
    {
      key: 'handleSwipeStart',
      value: function handleSwipeStart(_ref6) {
        var clientX = _ref6.x,
          clientY = _ref6.y;
        this.currentAction = ACTION_SWIPE;
        this.swipeStartX = clientX;
        this.swipeStartY = clientY;
        this.swipeEndX = clientX;
        this.swipeEndY = clientY;
      },
    },
    {
      key: 'handleSwipe',
      value: function handleSwipe(_ref7) {
        var clientX = _ref7.x,
          clientY = _ref7.y;
        this.swipeEndX = clientX;
        this.swipeEndY = clientY;
      },
    },
    {
      key: 'handleSwipeEnd',
      value: function handleSwipeEnd(event) {
        var xDiff = this.swipeEndX - this.swipeStartX;
        var xDiffAbs = Math.abs(xDiff);
        var yDiffAbs = Math.abs(this.swipeEndY - this.swipeStartY);
        this.currentAction = ACTION_NONE;
        this.swipeStartX = 0;
        this.swipeStartY = 0;
        this.swipeEndX = 0;
        this.swipeEndY = 0;

        if (!event || this.isAnimating() || xDiffAbs < yDiffAbs * 1.5) {
          return;
        }

        if (xDiffAbs < MIN_SWIPE_DISTANCE) {
          var boxRect = this.getLightboxRect();

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
      },
    },
    {
      key: 'calculatePinchDistance',
      value: function calculatePinchDistance() {
        var _ref8 =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : this.pinchTouchList,
          _ref9 = _slicedToArray(_ref8, 2),
          a = _ref9[0],
          b = _ref9[1];

        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
      },
    },
    {
      key: 'calculatePinchCenter',
      value: function calculatePinchCenter() {
        var _ref10 =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : this.pinchTouchList,
          _ref11 = _slicedToArray(_ref10, 2),
          a = _ref11[0],
          b = _ref11[1];

        return {
          x: a.x - (a.x - b.x) / 2,
          y: a.y - (a.y - b.y) / 2,
        };
      },
    },
    {
      key: 'handlePinchStart',
      value: function handlePinchStart(pointerList) {
        if (!this.props.enableZoom) {
          return;
        }

        this.currentAction = ACTION_PINCH;
        this.pinchTouchList = pointerList.map(function(_ref12) {
          var id = _ref12.id,
            x = _ref12.x,
            y = _ref12.y;
          return {
            id: id,
            x: x,
            y: y,
          };
        });
        this.pinchDistance = this.calculatePinchDistance();
      },
    },
    {
      key: 'handlePinch',
      value: function handlePinch(pointerList) {
        this.pinchTouchList = this.pinchTouchList.map(function(oldPointer) {
          for (var i = 0; i < pointerList.length; i += 1) {
            if (pointerList[i].id === oldPointer.id) {
              return pointerList[i];
            }
          }

          return oldPointer;
        });
        var newDistance = this.calculatePinchDistance();
        var zoomLevel = this.state.zoomLevel + newDistance - this.pinchDistance;
        this.pinchDistance = newDistance;

        var _this$calculatePinchC = this.calculatePinchCenter(
            this.pinchTouchList
          ),
          clientX = _this$calculatePinchC.x,
          clientY = _this$calculatePinchC.y;

        this.changeZoom(zoomLevel, clientX, clientY);
      },
    },
    {
      key: 'handlePinchEnd',
      value: function handlePinchEnd() {
        this.currentAction = ACTION_NONE;
        this.pinchTouchList = null;
        this.pinchDistance = 0;
      }, // Handle the window resize event
    },
    {
      key: 'handleWindowResize',
      value: function handleWindowResize() {
        this.clearTimeout(this.resizeTimeout);
        this.resizeTimeout = this.setTimeout(this.forceUpdate.bind(this), 100);
      },
    },
    {
      key: 'handleZoomInButtonClick',
      value: function handleZoomInButtonClick() {
        var nextZoomLevel = this.state.zoomLevel + ZOOM_BUTTON_INCREMENT_SIZE;
        this.changeZoom(nextZoomLevel);

        if (nextZoomLevel === MAX_ZOOM_LEVEL) {
          this.zoomOutBtn.current.focus();
        }
      },
    },
    {
      key: 'handleZoomOutButtonClick',
      value: function handleZoomOutButtonClick() {
        var nextZoomLevel = this.state.zoomLevel - ZOOM_BUTTON_INCREMENT_SIZE;
        this.changeZoom(nextZoomLevel);

        if (nextZoomLevel === MIN_ZOOM_LEVEL) {
          this.zoomInBtn.current.focus();
        }
      },
    },
    {
      key: 'handleCaptionMousewheel',
      value: function handleCaptionMousewheel(event) {
        event.stopPropagation();

        if (!this.caption.current) {
          return;
        }

        var _this$caption$current = this.caption.current.getBoundingClientRect(),
          height = _this$caption$current.height;

        var _this$caption$current2 = this.caption.current,
          scrollHeight = _this$caption$current2.scrollHeight,
          scrollTop = _this$caption$current2.scrollTop;

        if (
          (event.deltaY > 0 && height + scrollTop >= scrollHeight) ||
          (event.deltaY < 0 && scrollTop <= 0)
        ) {
          event.preventDefault();
        }
      }, // Detach key and mouse input events
    },
    {
      key: 'isAnimating',
      value: function isAnimating() {
        return this.state.shouldAnimate || this.state.isClosing;
      }, // Check if image is loaded
    },
    {
      key: 'isImageLoaded',
      value: function isImageLoaded(imageSrc) {
        return (
          imageSrc &&
          imageSrc in this.imageCache &&
          this.imageCache[imageSrc].loaded
        );
      }, // Load image from src and call callback with image width and height on load
    },
    {
      key: 'loadImage',
      value: function loadImage(srcType, imageSrc, done) {
        var _this12 = this;

        // Return the image info if it is already cached
        if (this.isImageLoaded(imageSrc)) {
          this.setTimeout(function() {
            done();
          }, 1);
          return;
        }

        var inMemoryImage = new global.Image();

        if (this.props.imageCrossOrigin) {
          inMemoryImage.crossOrigin = this.props.imageCrossOrigin;
        }

        inMemoryImage.onerror = function(errorEvent) {
          _this12.props.onImageLoadError(imageSrc, srcType, errorEvent); // failed to load so set the state loadErrorStatus

          _this12.setState(function(prevState) {
            return {
              loadErrorStatus: _objectSpread2(
                _objectSpread2({}, prevState.loadErrorStatus),
                {},
                _defineProperty({}, srcType, true)
              ),
            };
          });

          done(errorEvent);
        };

        inMemoryImage.onload = function() {
          _this12.props.onImageLoad(imageSrc, srcType, inMemoryImage);

          _this12.imageCache[imageSrc] = {
            loaded: true,
            width: inMemoryImage.width,
            height: inMemoryImage.height,
          };
          done();
        };

        inMemoryImage.src = imageSrc;
      }, // Load all images and their thumbnails
    },
    {
      key: 'loadAllImages',
      value: function loadAllImages() {
        var _this13 = this;

        var props =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : this.props;

        var generateLoadDoneCallback = function generateLoadDoneCallback(
          srcType,
          imageSrc
        ) {
          return function(err) {
            // Give up showing image on error
            if (err) {
              return;
            } // Don't rerender if the src is not the same as when the load started
            // or if the component has unmounted

            if (_this13.props[srcType] !== imageSrc || _this13.didUnmount) {
              return;
            } // Force rerender with the new image

            _this13.forceUpdate();
          };
        }; // Load the images

        this.getSrcTypes().forEach(function(srcType) {
          var type = srcType.name; // there is no error when we try to load it initially

          if (props[type] && _this13.state.loadErrorStatus[type]) {
            _this13.setState(function(prevState) {
              return {
                loadErrorStatus: _objectSpread2(
                  _objectSpread2({}, prevState.loadErrorStatus),
                  {},
                  _defineProperty({}, type, false)
                ),
              };
            });
          } // Load unloaded images

          if (props[type] && !_this13.isImageLoaded(props[type])) {
            _this13.loadImage(
              type,
              props[type],
              generateLoadDoneCallback(type, props[type])
            );
          }
        });
      }, // Request that the lightbox be closed
    },
    {
      key: 'requestClose',
      value: function requestClose(event) {
        var _this14 = this;

        // Call the parent close request
        var closeLightbox = function closeLightbox() {
          return _this14.props.onCloseRequest(event);
        };
        /*if (
        this.props.animationDisabled ||
        (event.type === 'keydown' && !this.props.animationOnKeyInput)
      ) {*/

        if (event.type === 'keydown' && !this.props.animationOnKeyInput) {
          // No animation
          closeLightbox();
          return;
        } // With animation
        // Start closing animation

        this.setState({
          isClosing: true,
        }); // Perform the actual closing at the end of the animation

        this.setTimeout(closeLightbox, this.props.animationDuration);
      },
    },
    {
      key: 'requestMove',
      value: function requestMove(direction, to, event) {
        var _this15 = this;

        // Reset the zoom level on image move
        var nextState = {
          zoomLevel: MIN_ZOOM_LEVEL,
          offsetX: 0,
          offsetY: 0,
        }; // Enable animated states

        if (
          !this.props.animationDisabled &&
          (!this.keyPressed || this.props.animationOnKeyInput)
        ) {
          nextState.shouldAnimate = true;
          this.setTimeout(function() {
            return _this15.setState({
              shouldAnimate: false,
            });
          }, this.props.animationDuration);
        }

        this.keyPressed = false;
        this.moveRequested = true;

        if (direction === 'prev') {
          this.keyCounter -= 1;
          this.setState(nextState);
          this.props.onMovePrevRequest(event);
        }

        if (direction === 'next') {
          this.keyCounter += 1;
          this.setState(nextState);
          this.props.onMoveNextRequest(event);
        }

        if (direction === 'to') {
          var diff = to - this.props.index;
          this.keyCounter += diff;
          this.setState(nextState);
          this.props.onIndicatorClick(to);
        }
      }, // Request to transition to the next image
    },
    {
      key: 'requestMoveNext',
      value: function requestMoveNext(event) {
        this.requestMove('next', event);
      }, // Request to transition to the previous image
    },
    {
      key: 'requestMovePrev',
      value: function requestMovePrev(event) {
        this.requestMove('prev', event);
      },
    },
    {
      key: 'requestMoveTo',
      value: function requestMoveTo(event, to) {
        this.requestMove('to', to, event);
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this16 = this;

        var _this$props = this.props,
          animationDisabled = _this$props.animationDisabled,
          animationDuration = _this$props.animationDuration,
          clickOutsideToClose = _this$props.clickOutsideToClose,
          discourageDownloads = _this$props.discourageDownloads,
          enableZoom = _this$props.enableZoom,
          imageTitle = _this$props.imageTitle,
          nextSrc = _this$props.nextSrc,
          prevSrc = _this$props.prevSrc,
          toolbarButtons = _this$props.toolbarButtons,
          reactModalStyle = _this$props.reactModalStyle,
          _onAfterOpen = _this$props.onAfterOpen,
          imageCrossOrigin = _this$props.imageCrossOrigin,
          reactModalProps = _this$props.reactModalProps,
          index = _this$props.index,
          length = _this$props.length,
          onIndicatorClick = _this$props.onIndicatorClick;
        var _this$state = this.state,
          zoomLevel = _this$state.zoomLevel,
          offsetX = _this$state.offsetX,
          offsetY = _this$state.offsetY,
          isClosing = _this$state.isClosing,
          loadErrorStatus = _this$state.loadErrorStatus; //const imageName = mainSrc;

        var renderIndicators = function renderIndicators() {
          var indicators = [];

          var _loop = function _loop(i) {
            indicators.push(
              /*#__PURE__*/ React.createElement('li', {
                key: i,
                onClick: function onClick(event) {
                  if (!_this16.isAnimating()) _this16.requestMoveTo(event, i);
                },
                className: i === index ? 'active' : '',
              })
            );
          };

          for (var i = 0; i < length; i++) {
            _loop(i);
          }

          return indicators;
        };

        var boxSize = this.getLightboxRect();
        var transitionStyle = {}; // Transition settings for sliding animations

        if (!animationDisabled && this.isAnimating()) {
          transitionStyle = _objectSpread2(
            _objectSpread2({}, transitionStyle),
            {},
            {
              transition: 'transform '.concat(animationDuration, 'ms'),
            }
          );
        } // Key endings to differentiate between images with the same src

        var keyEndings = {};
        this.getSrcTypes().forEach(function(_ref13) {
          var name = _ref13.name,
            keyEnding = _ref13.keyEnding;
          keyEndings[name] = keyEnding;
        }); // Images to be displayed

        var images = [];
        var imageMargin = 0;
        var leftButtonStyle = {
          left: 0,
        };
        var rigthButtonStyle = {
          right: 0,
        };
        var headerStyle = {
          top: 0,
        };
        var descriptionBoxStyle = {
          top: 0,
        };

        var addImage = function addImage(srcType, imageClass, transforms) {
          // Ignore types that have no source defined for their full size image
          if (!_this16.props[srcType]) {
            return;
          }

          var getTop = function getTop(imageHeight) {
            var headerHeight = 80;
            var windowHeight = window.innerHeight;
            var topBlankSpace = (windowHeight - imageHeight) / 2;
            return topBlankSpace - headerHeight - 10;
          };

          var getButtonMarginSize = function getButtonMarginSize(imageWidth) {
            var windowWidth = window.innerWidth;
            var margin = (windowWidth - imageWidth) / 2;
            return margin;
          };

          var getHeaderMargin = function getHeaderMargin(imageHeight) {
            var headerSize = 80;
            var windowHeight = window.innerHeight;
            var margin = (windowHeight - imageHeight) / 2 - headerSize;
            return margin;
          };

          var gettopBlankSpace = function gettopBlankSpace(imageHeight) {
            var windowHeight = window.innerHeight;
            return (windowHeight - imageHeight) / 2;
          };

          var getTopMarginForNavigationButtons = function getTopMarginForNavigationButtons(
            imageHeight
          ) {
            var top = getTop(imageHeight);
            var topBlankSpace = gettopBlankSpace(imageHeight);
            var imageStartsAt = topBlankSpace - top;
            var buttonHeight = 60;
            return imageStartsAt + imageHeight / 2 - buttonHeight / 2;
          };

          var getHeightForText = function getHeightForText(textStartsAt) {
            var indicatorsHeight = 54;
            return window.innerHeight - indicatorsHeight - textStartsAt;
          };

          var bestImageInfo = _this16.getBestImageForType(srcType);

          var imageStyle = {};

          if (bestImageInfo && srcType === 'mainSrc') {
            imageMargin = Math.floor(
              getButtonMarginSize(bestImageInfo.targetWidth)
            );
            var imageTop = getTop(bestImageInfo.targetHeight);
            var marginForNavigationButtons = getTopMarginForNavigationButtons(
              bestImageInfo.targetHeight
            );
            headerStyle.top =
              getHeaderMargin(bestImageInfo.targetHeight) - imageTop;
            headerStyle.width = bestImageInfo.targetWidth;
            headerStyle.margin = '0 auto';
            leftButtonStyle.left = imageMargin;
            leftButtonStyle.marginTop = marginForNavigationButtons;
            rigthButtonStyle.right = imageMargin - 1;
            rigthButtonStyle.marginTop = marginForNavigationButtons;

            var newTransforms = _objectSpread2({}, transforms);

            newTransforms.y -= imageTop;
            var textStartsAt =
              gettopBlankSpace(bestImageInfo.targetHeight) -
              imageTop +
              bestImageInfo.targetHeight +
              10;
            descriptionBoxStyle.top = textStartsAt;
            descriptionBoxStyle.width = bestImageInfo.targetWidth;
            descriptionBoxStyle.margin = '0 auto';
            descriptionBoxStyle.maxHeight = getHeightForText(textStartsAt);
            imageStyle = _objectSpread2(
              _objectSpread2({}, transitionStyle),
              ReactImageLightbox.getTransform(
                _objectSpread2(_objectSpread2({}, newTransforms), bestImageInfo)
              )
            );
          } else {
            imageStyle = _objectSpread2(
              _objectSpread2({}, transitionStyle),
              ReactImageLightbox.getTransform(
                _objectSpread2(_objectSpread2({}, transforms), bestImageInfo)
              )
            );
          }

          if (zoomLevel > MIN_ZOOM_LEVEL) {
            imageStyle.cursor = 'move';
          } // support IE 9 and 11

          var hasTrueValue = function hasTrueValue(object) {
            return Object.keys(object).some(function(key) {
              return object[key];
            });
          }; // when error on one of the loads then push custom error stuff

          if (bestImageInfo === null && hasTrueValue(loadErrorStatus)) {
            images.push(
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: ''.concat(
                    imageClass,
                    ' ril__image ril-errored fade-in'
                  ),
                  style: imageStyle,
                  key: _this16.props[srcType] + keyEndings[srcType],
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'ril__errorContainer',
                  },
                  _this16.props.imageLoadErrorMessage
                )
              )
            );
            return;
          }

          if (bestImageInfo === null) {
            var loadingIcon = /*#__PURE__*/ React.createElement(
              'div',
              {
                className:
                  'ril-loading-circle ril__loadingCircle ril__loadingContainer__icon',
              },
              _toConsumableArray(new Array(12)).map(function(_, index) {
                return /*#__PURE__*/ React.createElement('div', {
                  // eslint-disable-next-line react/no-array-index-key
                  key: index,
                  className: 'ril-loading-circle-point ril__loadingCirclePoint',
                });
              })
            ); // Fall back to loading icon if the thumbnail has not been loaded

            images.push(
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: ''.concat(
                    imageClass,
                    ' ril__image ril-not-loaded'
                  ),
                  style: imageStyle,
                  key: _this16.props[srcType] + keyEndings[srcType],
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'ril__loadingContainer',
                  },
                  loadingIcon
                )
              )
            );
            return;
          }

          var imageSrc = bestImageInfo.src;

          if (discourageDownloads) {
            imageStyle.backgroundImage = "url('".concat(imageSrc, "')");
            images.push(
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: ''.concat(
                    imageClass,
                    ' ril__image ril__imageDiscourager'
                  ),
                  onDoubleClick: _this16.handleImageDoubleClick,
                  onWheel: _this16.handleImageMouseWheel,
                  style: imageStyle,
                  key: imageSrc + keyEndings[srcType],
                },
                /*#__PURE__*/ React.createElement('div', {
                  className: 'ril-download-blocker ril__downloadBlocker',
                })
              )
            );
          } else {
            images.push(
              /*#__PURE__*/ React.createElement(
                'img',
                _extends(
                  {},
                  imageCrossOrigin
                    ? {
                        crossOrigin: imageCrossOrigin,
                      }
                    : {},
                  {
                    className: ''.concat(imageClass, ' ril__image'),
                    onDoubleClick: _this16.handleImageDoubleClick,
                    onWheel: _this16.handleImageMouseWheel,
                    onDragStart: function onDragStart(e) {
                      return e.preventDefault();
                    },
                    style: imageStyle,
                    src: imageSrc,
                    key: imageSrc + keyEndings[srcType],
                    alt:
                      typeof imageTitle === 'string'
                        ? imageTitle
                        : translate('Image'),
                    draggable: false,
                  }
                )
              )
            );
          }
        };

        var zoomMultiplier = this.getZoomMultiplier(); // Next Image (displayed on the right)

        addImage('nextSrc', 'ril-image-next ril__imageNext', {
          x: boxSize.width,
        }); // Main Image

        addImage('mainSrc', 'ril-image-current fade-in', {
          x: -1 * offsetX,
          y: -1 * offsetY,
          zoom: zoomMultiplier,
        }); // Previous Image (displayed on the left)

        addImage('prevSrc', 'ril-image-prev ril__imagePrev', {
          x: -1 * boxSize.width,
        });
        var modalStyle = {
          overlay: _objectSpread2(
            {
              zIndex: 1000,
              backgroundColor: 'transparent',
            },
            reactModalStyle.overlay
          ),
          content: _objectSpread2(
            {
              backgroundColor: 'transparent',
              overflow: 'hidden',
              // Needed, otherwise keyboard shortcuts scroll the page
              border: 'none',
              borderRadius: 0,
              padding: 0,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
            reactModalStyle.content
          ),
        };
        return /*#__PURE__*/ React.createElement(
          Modal,
          _extends(
            {
              isOpen: true,
              onRequestClose: clickOutsideToClose
                ? this.requestClose
                : undefined,
              onAfterOpen: function onAfterOpen() {
                // Focus on the div with key handlers
                if (_this16.outerEl.current) {
                  _this16.outerEl.current.focus();
                }

                _onAfterOpen();
              },
              style: modalStyle,
              contentLabel: translate('Lightbox'),
              appElement:
                typeof global.window !== 'undefined'
                  ? global.window.document.body
                  : undefined,
            },
            reactModalProps
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              // eslint-disable-line jsx-a11y/no-static-element-interactions
              // Floating modal with closing animations
              className: 'ril-outer ril__outer ril__outerAnimating '
                .concat(this.props.wrapperClassName, ' ')
                .concat(isClosing ? 'ril-closing ril__outerClosing' : ''),
              style: {
                transition: 'opacity '.concat(animationDuration, 'ms'),
                animationDuration: ''.concat(animationDuration, 'ms'),
                animationDirection: isClosing ? 'normal' : 'reverse',
              },
              ref: this.outerEl,
              onWheel: this.handleOuterMousewheel,
              onMouseMove: this.handleMouseMove,
              onMouseDown: this.handleMouseDown,
              onTouchStart: this.handleTouchStart,
              onTouchMove: this.handleTouchMove,
              tabIndex: '-1', // Enables key handlers on div
              onKeyDown: this.handleKeyInput,
              onKeyUp: this.handleKeyInput,
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                // eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
                // Image holder
                className: 'ril-inner ril__inner',
                onClick: clickOutsideToClose
                  ? this.closeIfClickInner
                  : undefined,
              },
              images
            ),
            prevSrc &&
              /*#__PURE__*/ React.createElement('button', {
                // Move to previous image button
                type: 'button',
                className: 'ril-prev-button ril__navButtons ril__navButtonPrev',
                key: 'prev',
                style: leftButtonStyle,
                'aria-label': this.props.prevLabel,
                onClick: !this.isAnimating() ? this.requestMovePrev : undefined, // Ignore clicks during animation
              }),
            nextSrc &&
              /*#__PURE__*/ React.createElement('button', {
                // Move to next image button
                type: 'button',
                className: 'ril-next-button ril__navButtons ril__navButtonNext',
                key: 'next',
                style: rigthButtonStyle,
                'aria-label': this.props.nextLabel,
                onClick: !this.isAnimating() ? this.requestMoveNext : undefined, // Ignore clicks during animation
              }),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                // Lightbox toolbar
                className: 'ril-toolbar ril__toolbar',
                style: headerStyle,
              },
              /*#__PURE__*/ React.createElement(
                'ul',
                {
                  className:
                    'ril-toolbar-left ril__toolbarSide ril__toolbarLeftSide',
                },
                /*#__PURE__*/ React.createElement(
                  'li',
                  {
                    className: 'ril-toolbar__item ril__toolbarItem',
                  },
                  /*#__PURE__*/ React.createElement(
                    'span',
                    {
                      className:
                        'ril-toolbar__item__child ril__toolbarItemChild',
                    },
                    imageTitle
                  )
                )
              ),
              /*#__PURE__*/ React.createElement(
                'ul',
                {
                  className:
                    'ril-toolbar-right ril__toolbarSide ril__toolbarRightSide',
                },
                toolbarButtons &&
                  toolbarButtons.map(function(button, i) {
                    return /*#__PURE__*/ React.createElement(
                      'li',
                      {
                        key: 'button_'.concat(i + 1),
                        className: 'ril-toolbar__item ril__toolbarItem',
                      },
                      button
                    );
                  }),
                enableZoom &&
                  /*#__PURE__*/ React.createElement(
                    'li',
                    {
                      className: 'ril-toolbar__item ril__toolbarItem',
                    },
                    /*#__PURE__*/ React.createElement('button', {
                      // Lightbox zoom in button
                      type: 'button',
                      key: 'zoom-in',
                      'aria-label': this.props.zoomInLabel,
                      className: [
                        'ril-zoom-in',
                        'ril__toolbarItemChild',
                        'ril__builtinButton',
                        'ril__zoomInButton',
                      ]
                        .concat(
                          _toConsumableArray(
                            zoomLevel === MAX_ZOOM_LEVEL
                              ? ['ril__builtinButtonDisabled']
                              : []
                          )
                        )
                        .join(' '),
                      ref: this.zoomInBtn,
                      disabled:
                        this.isAnimating() || zoomLevel === MAX_ZOOM_LEVEL,
                      onClick:
                        !this.isAnimating() && zoomLevel !== MAX_ZOOM_LEVEL
                          ? this.handleZoomInButtonClick
                          : undefined,
                    })
                  ),
                enableZoom &&
                  /*#__PURE__*/ React.createElement(
                    'li',
                    {
                      className: 'ril-toolbar__item ril__toolbarItem',
                    },
                    /*#__PURE__*/ React.createElement('button', {
                      // Lightbox zoom out button
                      type: 'button',
                      key: 'zoom-out',
                      'aria-label': this.props.zoomOutLabel,
                      className: [
                        'ril-zoom-out',
                        'ril__toolbarItemChild',
                        'ril__builtinButton',
                        'ril__zoomOutButton',
                      ]
                        .concat(
                          _toConsumableArray(
                            zoomLevel === MIN_ZOOM_LEVEL
                              ? ['ril__builtinButtonDisabled']
                              : []
                          )
                        )
                        .join(' '),
                      ref: this.zoomOutBtn,
                      disabled:
                        this.isAnimating() || zoomLevel === MIN_ZOOM_LEVEL,
                      onClick:
                        !this.isAnimating() && zoomLevel !== MIN_ZOOM_LEVEL
                          ? this.handleZoomOutButtonClick
                          : undefined,
                    })
                  ),
                /*#__PURE__*/ React.createElement(
                  'li',
                  {
                    className: 'ril-toolbar__item ril__toolbarItem',
                  },
                  /*#__PURE__*/ React.createElement('button', {
                    // Lightbox close button
                    type: 'button',
                    key: 'close',
                    'aria-label': this.props.closeLabel,
                    className:
                      'ril-close ril-toolbar__item__child ril__toolbarItemChild ril__builtinButton ril__closeButton',
                    onClick: !this.isAnimating()
                      ? this.requestClose
                      : undefined, // Ignore clicks during animation
                  })
                )
              )
            ),
            Number.isInteger(this.props.index) &&
              this.props.length &&
              /*#__PURE__*/ React.createElement(
                'div',
                null,
                /*#__PURE__*/ React.createElement(
                  'ol',
                  {
                    className: 'ril__indicators',
                  },
                  renderIndicators()
                )
              ),
            this.props.imageCaption &&
              /*#__PURE__*/
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              React.createElement(
                'div',
                {
                  // Image caption
                  onWheel: this.handleCaptionMousewheel,
                  onMouseDown: function onMouseDown(event) {
                    return event.stopPropagation();
                  },
                  className: 'ril-caption ril__caption',
                  ref: this.caption,
                  style: descriptionBoxStyle,
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'ril-caption-content ril__captionContent',
                  },
                  this.props.imageCaption
                )
              )
          )
        );
      },
    },
  ]);

  return ReactImageLightbox;
})(Component);

ReactImageLightbox.propTypes = {
  //-----------------------------
  // Image sources
  //-----------------------------
  // Main display image url
  mainSrc: PropTypes.string.isRequired,
  // eslint-disable-line react/no-unused-prop-types
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
  // eslint-disable-line react/no-unused-prop-types
  // Thumbnail image url corresponding to props.prevSrc
  prevSrcThumbnail: PropTypes.string,
  // eslint-disable-line react/no-unused-prop-types
  // Thumbnail image url corresponding to props.nextSrc
  nextSrcThumbnail: PropTypes.string,
  // eslint-disable-line react/no-unused-prop-types
  //-----------------------------
  // Event Handlers
  //-----------------------------
  // Close window event
  // Should change the parent state such that the lightbox is not rendered
  onCloseRequest: PropTypes.func.isRequired,
  // Move to an image that corresponds to the selected index event
  // Should change the parent state such that props.prevSrc becomes props.mainSrc,
  //  props.mainSrc becomes props.nextSrc, etc.
  onIndicatorClick: PropTypes.func,
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
  // Image Name
  imageName: PropTypes.string,
  // Image Date
  imageDate: PropTypes.string,
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
  mainSrcThumbnail: null,
  nextLabel: 'Next image',
  nextSrc: null,
  nextSrcThumbnail: null,
  onAfterOpen: function onAfterOpen() {},
  onImageLoadError: function onImageLoadError() {},
  onImageLoad: function onImageLoad() {},
  onIndicatorClick: function onIndicatorClick() {},
  onMoveNextRequest: function onMoveNextRequest() {},
  onMovePrevRequest: function onMovePrevRequest() {},
  prevLabel: 'Previous image',
  prevSrc: null,
  prevSrcThumbnail: null,
  reactModalStyle: {},
  wrapperClassName: '',
  zoomInLabel: 'Zoom in',
  zoomOutLabel: 'Zoom out',
  imageLoadErrorMessage: 'This image failed to load',
  imageName: '',
  ImageDate: null,
};

export default ReactImageLightbox;
