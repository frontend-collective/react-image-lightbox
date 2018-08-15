!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports.ReactImageLightbox = factory() : root.ReactImageLightbox = factory();
}("undefined" != typeof self ? self : this, function() {
    /******/
    return function(modules) {
        // webpackBootstrap
        /******/ // The module cache
        /******/ var installedModules = {};
        /******/
        /******/ // The require function
        /******/        function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/ if (installedModules[moduleId]) 
            /******/ return installedModules[moduleId].exports;
            /******/
            /******/ // Create a new module (and put it into the cache)
            /******/            var module = installedModules[moduleId] = {
                /******/ i: moduleId,
                /******/ l: !1,
                /******/ exports: {}
                /******/            };
            /******/
            /******/ // Execute the module function
            /******/            
            /******/
            /******/ // Return the exports of the module
            /******/ return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            /******/
            /******/ // Flag the module as loaded
            /******/ module.l = !0, module.exports;
            /******/        }
        /******/
        /******/
        /******/ // expose the modules object (__webpack_modules__)
        /******/        
        /******/
        /******/
        /******/ // Load entry module and return exports
        /******/ return __webpack_require__.m = modules, 
        /******/
        /******/ // expose the module cache
        /******/ __webpack_require__.c = installedModules, 
        /******/
        /******/ // define getter function for harmony exports
        /******/ __webpack_require__.d = function(exports, name, getter) {
            /******/ __webpack_require__.o(exports, name) || 
            /******/ Object.defineProperty(exports, name, {
                /******/ configurable: !1,
                /******/ enumerable: !0,
                /******/ get: getter
                /******/            })
            /******/;
        }, 
        /******/
        /******/ // define __esModule on exports
        /******/ __webpack_require__.r = function(exports) {
            /******/ Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            /******/        }, 
        /******/
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/ __webpack_require__.n = function(module) {
            /******/ var getter = module && module.__esModule ? 
            /******/ function() {
                return module.default;
            } : 
            /******/ function() {
                return module;
            };
            /******/            
            /******/ return __webpack_require__.d(getter, "a", getter), getter;
            /******/        }, 
        /******/
        /******/ // Object.prototype.hasOwnProperty.call
        /******/ __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, 
        /******/
        /******/ // __webpack_public_path__
        /******/ __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 1);
        /******/    }
    /************************************************************************/
    /******/ ([ 
    /* 0 */
    /***/ function(module, exports) {
        var g;
        // This works in non-strict mode
                g = function() {
            return this;
        }();
        try {
            // This works if eval is allowed (see CSP)
            g = g || Function("return this")() || (0, eval)("this");
        } catch (e) {
            // This works if the window reference is available
            "object" == typeof window && (g = window);
        }
        // g can still be undefined, but nothing to do about it...
        // We return undefined, instead of nothing here, so it's
        // easier to handle this case. if(!global) { ...}
                module.exports = g;
    }, 
    /* 1 */
    /***/ function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var obj, _reactImageLightbox = __webpack_require__(2), _reactImageLightbox2 = (obj = _reactImageLightbox) && obj.__esModule ? obj : {
            default: obj
        };
        exports.default = _reactImageLightbox2.default;
    }, 
    /* 2 */
    /***/ function(module, exports, __webpack_require__) {
        "use strict";
        /* WEBPACK VAR INJECTION */        
        /* WEBPACK VAR INJECTION */ (function(global) {
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, _slicedToArray = function() {
                return function(arr, i) {
                    if (Array.isArray(arr)) return arr;
                    if (Symbol.iterator in Object(arr)) return function(arr, i) {
                        var _arr = [], _n = !0, _d = !1, _e = void 0;
                        try {
                            for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                            !i || _arr.length !== i); _n = !0) ;
                        } catch (err) {
                            _d = !0, _e = err;
                        } finally {
                            try {
                                !_n && _i.return && _i.return();
                            } finally {
                                if (_d) throw _e;
                            }
                        }
                        return _arr;
                    }(arr, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                };
            }(), _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _react = __webpack_require__(3), _react2 = _interopRequireDefault(_react), _propTypes2 = _interopRequireDefault(__webpack_require__(4)), _reactModal2 = _interopRequireDefault(__webpack_require__(5)), _util = __webpack_require__(6), _constant = __webpack_require__(7);
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _toConsumableArray(arr) {
                if (Array.isArray(arr)) {
                    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                    return arr2;
                }
                return Array.from(arr);
            }
            function _defineProperty(obj, key, value) {
                return key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value, obj;
            }
            __webpack_require__(8);
            var ReactImageLightbox = function(_Component) {
                function ReactImageLightbox(props) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, ReactImageLightbox);
                    var _this = function(self, call) {
                        if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !call || "object" != typeof call && "function" != typeof call ? self : call;
                    }(this, (ReactImageLightbox.__proto__ || Object.getPrototypeOf(ReactImageLightbox)).call(this, props));
                    return _this.state = {
                        //-----------------------------
                        // Animation
                        //-----------------------------
                        // Lightbox is closing
                        // When Lightbox is mounted, if animation is enabled it will open with the reverse of the closing animation
                        isClosing: !props.animationDisabled,
                        // Component parts should animate (e.g., when images are moving, or image is being zoomed)
                        shouldAnimate: !1,
                        //-----------------------------
                        // Zoom settings
                        //-----------------------------
                        // Zoom level of image
                        zoomLevel: _constant.MIN_ZOOM_LEVEL,
                        //-----------------------------
                        // Image position settings
                        //-----------------------------
                        // Horizontal offset from center
                        offsetX: 0,
                        // Vertical offset from center
                        offsetY: 0,
                        // image load error for srcType
                        loadErrorStatus: {}
                    }, _this.closeIfClickInner = _this.closeIfClickInner.bind(_this), _this.handleImageDoubleClick = _this.handleImageDoubleClick.bind(_this), 
                    _this.handleImageMouseWheel = _this.handleImageMouseWheel.bind(_this), _this.handleKeyInput = _this.handleKeyInput.bind(_this), 
                    _this.handleMouseUp = _this.handleMouseUp.bind(_this), _this.handleMouseDown = _this.handleMouseDown.bind(_this), 
                    _this.handleMouseMove = _this.handleMouseMove.bind(_this), _this.handleOuterMousewheel = _this.handleOuterMousewheel.bind(_this), 
                    _this.handleTouchStart = _this.handleTouchStart.bind(_this), _this.handleTouchMove = _this.handleTouchMove.bind(_this), 
                    _this.handleTouchEnd = _this.handleTouchEnd.bind(_this), _this.handlePointerEvent = _this.handlePointerEvent.bind(_this), 
                    _this.handleCaptionMousewheel = _this.handleCaptionMousewheel.bind(_this), _this.handleWindowResize = _this.handleWindowResize.bind(_this), 
                    _this.handleZoomInButtonClick = _this.handleZoomInButtonClick.bind(_this), _this.handleZoomOutButtonClick = _this.handleZoomOutButtonClick.bind(_this), 
                    _this.requestClose = _this.requestClose.bind(_this), _this.requestMoveNext = _this.requestMoveNext.bind(_this), 
                    _this.requestMovePrev = _this.requestMovePrev.bind(_this), _this;
                }
                return function(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
                }(ReactImageLightbox, _react.Component), _createClass(ReactImageLightbox, null, [ {
                    key: "isTargetMatchImage",
                    value: function(target) {
                        return target && /ril-image-current/.test(target.className);
                    }
                }, {
                    key: "parseMouseEvent",
                    value: function(mouseEvent) {
                        return {
                            id: "mouse",
                            source: _constant.SOURCE_MOUSE,
                            x: parseInt(mouseEvent.clientX, 10),
                            y: parseInt(mouseEvent.clientY, 10)
                        };
                    }
                }, {
                    key: "parseTouchPointer",
                    value: function(touchPointer) {
                        return {
                            id: touchPointer.identifier,
                            source: _constant.SOURCE_TOUCH,
                            x: parseInt(touchPointer.clientX, 10),
                            y: parseInt(touchPointer.clientY, 10)
                        };
                    }
                }, {
                    key: "parsePointerEvent",
                    value: function(pointerEvent) {
                        return {
                            id: pointerEvent.pointerId,
                            source: _constant.SOURCE_POINTER,
                            x: parseInt(pointerEvent.clientX, 10),
                            y: parseInt(pointerEvent.clientY, 10)
                        };
                    }
                    // Request to transition to the previous image
                                }, {
                    key: "getTransform",
                    value: function(_ref) {
                        var _ref$x = _ref.x, x = void 0 === _ref$x ? 0 : _ref$x, _ref$y = _ref.y, y = void 0 === _ref$y ? 0 : _ref$y, _ref$zoom = _ref.zoom, zoom = void 0 === _ref$zoom ? 1 : _ref$zoom, width = _ref.width, targetWidth = _ref.targetWidth, nextX = x, windowWidth = (0, 
                        _util.getWindowWidth)();
                        width > windowWidth && (nextX += (windowWidth - width) / 2);
                        var scaleFactor = zoom * (targetWidth / width);
                        return {
                            transform: "translate3d(" + nextX + "px," + y + "px,0) scale3d(" + scaleFactor + "," + scaleFactor + ",1)"
                        };
                    }
                } ]), _createClass(ReactImageLightbox, [ {
                    key: "componentWillMount",
                    value: function() {
                        // Timeouts - always clear it before umount
                        this.timeouts = [], 
                        // Current action
                        this.currentAction = _constant.ACTION_NONE, 
                        // Events source
                        this.eventsSource = _constant.SOURCE_ANY, 
                        // Empty pointers list
                        this.pointerList = [], 
                        // Prevent inner close
                        this.preventInnerClose = !1, this.preventInnerCloseTimeout = null, 
                        // Used to disable animation when changing props.mainSrc|nextSrc|prevSrc
                        this.keyPressed = !1, 
                        // Used to store load state / dimensions of images
                        this.imageCache = {}, 
                        // Time the last keydown event was called (used in keyboard action rate limiting)
                        this.lastKeyDownTime = 0, 
                        // Used for debouncing window resize event
                        this.resizeTimeout = null, 
                        // Used to determine when actions are triggered by the scroll wheel
                        this.wheelActionTimeout = null, this.resetScrollTimeout = null, this.scrollX = 0, 
                        this.scrollY = 0, 
                        // Used in panning zoomed images
                        this.moveStartX = 0, this.moveStartY = 0, this.moveStartOffsetX = 0, this.moveStartOffsetY = 0, 
                        // Used to swipe
                        this.swipeStartX = 0, this.swipeStartY = 0, this.swipeEndX = 0, this.swipeEndY = 0, 
                        // Used to pinch
                        this.pinchTouchList = null, this.pinchDistance = 0, 
                        // Used to differentiate between images with identical src
                        this.keyCounter = 0, 
                        // Used to detect a move when all src's remain unchanged (four or more of the same image in a row)
                        this.moveRequested = !1, this.props.animationDisabled || 
                        // Make opening animation play
                        this.setState({
                            isClosing: !1
                        });
                    }
                }, {
                    key: "componentDidMount",
                    value: function() {
                        var _this2 = this;
                        // Prevents cross-origin errors when using a cross-origin iframe
                                                this.windowContext = (0, _util.getHighestSafeWindowContext)(), 
                        this.listeners = {
                            resize: this.handleWindowResize,
                            mouseup: this.handleMouseUp,
                            touchend: this.handleTouchEnd,
                            touchcancel: this.handleTouchEnd,
                            pointerdown: this.handlePointerEvent,
                            pointermove: this.handlePointerEvent,
                            pointerup: this.handlePointerEvent,
                            pointercancel: this.handlePointerEvent
                        }, Object.keys(this.listeners).forEach(function(type) {
                            _this2.windowContext.addEventListener(type, _this2.listeners[type]);
                        }), this.loadAllImages();
                    }
                }, {
                    key: "componentWillReceiveProps",
                    value: function(nextProps) {
                        var _this3 = this, sourcesChanged = !1, prevSrcDict = {}, nextSrcDict = {};
                        // Iterate through the source types for prevProps and nextProps to
                        //  determine if any of the sources changed
                                                this.getSrcTypes().forEach(function(srcType) {
                            _this3.props[srcType.name] !== nextProps[srcType.name] && (sourcesChanged = !0, 
                            prevSrcDict[_this3.props[srcType.name]] = !0, nextSrcDict[nextProps[srcType.name]] = !0);
                        }), (sourcesChanged || this.moveRequested) && (
                        // Reset the loaded state for images not rendered next
                        Object.keys(prevSrcDict).forEach(function(prevSrc) {
                            !(prevSrc in nextSrcDict) && prevSrc in _this3.imageCache && (_this3.imageCache[prevSrc].loaded = !1);
                        }), this.moveRequested = !1, 
                        // Load any new images
                        this.loadAllImages(nextProps));
                    }
                }, {
                    key: "shouldComponentUpdate",
                    value: function() {
                        // Wait for move...
                        return !this.moveRequested;
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function() {
                        var _this4 = this;
                        this.didUnmount = !0, Object.keys(this.listeners).forEach(function(type) {
                            _this4.windowContext.removeEventListener(type, _this4.listeners[type]);
                        }), this.timeouts.forEach(function(tid) {
                            return clearTimeout(tid);
                        });
                    }
                }, {
                    key: "setTimeout",
                    value: function(_setTimeout) {
                        function setTimeout(_x, _x2) {
                            return _setTimeout.apply(this, arguments);
                        }
                        return setTimeout.toString = function() {
                            return _setTimeout.toString();
                        }, setTimeout;
                    }(function(func, time) {
                        var _this5 = this, id = setTimeout(function() {
                            _this5.timeouts = _this5.timeouts.filter(function(tid) {
                                return tid !== id;
                            }), func();
                        }, time);
                        return this.timeouts.push(id), id;
                    })
                }, {
                    key: "setPreventInnerClose",
                    value: function() {
                        var _this6 = this;
                        this.preventInnerCloseTimeout && this.clearTimeout(this.preventInnerCloseTimeout), 
                        this.preventInnerClose = !0, this.preventInnerCloseTimeout = this.setTimeout(function() {
                            _this6.preventInnerClose = !1, _this6.preventInnerCloseTimeout = null;
                        }, 100);
                    }
                    // Get info for the best suited image to display with the given srcType
                                }, {
                    key: "getBestImageForType",
                    value: function(srcType) {
                        var imageSrc = this.props[srcType], fitSizes = {};
                        if (this.isImageLoaded(imageSrc)) 
                        // Use full-size image if available
                        fitSizes = this.getFitSizes(this.imageCache[imageSrc].width, this.imageCache[imageSrc].height); else {
                            if (!this.isImageLoaded(this.props[srcType + "Thumbnail"])) return null;
                            // Fall back to using thumbnail if the image has not been loaded
                            imageSrc = this.props[srcType + "Thumbnail"], fitSizes = this.getFitSizes(this.imageCache[imageSrc].width, this.imageCache[imageSrc].height, !0);
                        }
                        return {
                            src: imageSrc,
                            height: this.imageCache[imageSrc].height,
                            width: this.imageCache[imageSrc].width,
                            targetHeight: fitSizes.height,
                            targetWidth: fitSizes.width
                        };
                    }
                    // Get sizing for when an image is larger than the window
                                }, {
                    key: "getFitSizes",
                    value: function(width, height, stretch) {
                        var boxSize = this.getLightboxRect(), maxHeight = boxSize.height - 2 * this.props.imagePadding, maxWidth = boxSize.width - 2 * this.props.imagePadding;
                        return stretch || (maxHeight = Math.min(maxHeight, height), maxWidth = Math.min(maxWidth, width)), 
                        maxWidth / maxHeight > width / height ? {
                            width: width * maxHeight / height,
                            height: maxHeight
                        } : {
                            width: maxWidth,
                            height: height * maxWidth / width
                        };
                    }
                }, {
                    key: "getMaxOffsets",
                    value: function() {
                        var zoomLevel = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.zoomLevel, currentImageInfo = this.getBestImageForType("mainSrc");
                        if (null === currentImageInfo) return {
                            maxX: 0,
                            minX: 0,
                            maxY: 0,
                            minY: 0
                        };
                        var boxSize = this.getLightboxRect(), zoomMultiplier = this.getZoomMultiplier(zoomLevel), maxX = 0, maxY = 0;
                        return {
                            maxX: 
                            // if there is still blank space in the X dimension, don't limit except to the opposite edge
                            maxX = zoomMultiplier * currentImageInfo.width - boxSize.width < 0 ? (boxSize.width - zoomMultiplier * currentImageInfo.width) / 2 : (zoomMultiplier * currentImageInfo.width - boxSize.width) / 2,
                            maxY: 
                            // if there is still blank space in the Y dimension, don't limit except to the opposite edge
                            maxY = zoomMultiplier * currentImageInfo.height - boxSize.height < 0 ? (boxSize.height - zoomMultiplier * currentImageInfo.height) / 2 : (zoomMultiplier * currentImageInfo.height - boxSize.height) / 2,
                            minX: -1 * maxX,
                            minY: -1 * maxY
                        };
                    }
                    // Get image src types
                                }, {
                    key: "getSrcTypes",
                    value: function() {
                        return [ {
                            name: "mainSrc",
                            keyEnding: "i" + this.keyCounter
                        }, {
                            name: "mainSrcThumbnail",
                            keyEnding: "t" + this.keyCounter
                        }, {
                            name: "nextSrc",
                            keyEnding: "i" + (this.keyCounter + 1)
                        }, {
                            name: "nextSrcThumbnail",
                            keyEnding: "t" + (this.keyCounter + 1)
                        }, {
                            name: "prevSrc",
                            keyEnding: "i" + (this.keyCounter - 1)
                        }, {
                            name: "prevSrcThumbnail",
                            keyEnding: "t" + (this.keyCounter - 1)
                        } ];
                    }
                    /**
     * Get sizing when the image is scaled
     */                }, {
                    key: "getZoomMultiplier",
                    value: function() {
                        var zoomLevel = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.zoomLevel;
                        return Math.pow(_constant.ZOOM_RATIO, zoomLevel);
                    }
                    /**
     * Get the size of the lightbox in pixels
     */                }, {
                    key: "getLightboxRect",
                    value: function() {
                        return this.outerEl ? this.outerEl.getBoundingClientRect() : {
                            width: (0, _util.getWindowWidth)(),
                            height: (0, _util.getWindowHeight)(),
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        };
                    }
                }, {
                    key: "clearTimeout",
                    value: function(_clearTimeout) {
                        function clearTimeout(_x3) {
                            return _clearTimeout.apply(this, arguments);
                        }
                        return clearTimeout.toString = function() {
                            return _clearTimeout.toString();
                        }, clearTimeout;
                    }(function(id) {
                        this.timeouts = this.timeouts.filter(function(tid) {
                            return tid !== id;
                        }), clearTimeout(id);
                    })
                }, {
                    key: "changeZoom",
                    value: function(zoomLevel, clientX, clientY) {
                        // Ignore if zoom disabled
                        if (this.props.enableZoom) {
                            // Constrain zoom level to the set bounds
                            var nextZoomLevel = Math.max(_constant.MIN_ZOOM_LEVEL, Math.min(_constant.MAX_ZOOM_LEVEL, zoomLevel));
                            // Ignore requests that don't change the zoom level
                                                        if (nextZoomLevel !== this.state.zoomLevel) if (nextZoomLevel !== _constant.MIN_ZOOM_LEVEL) {
                                var imageBaseSize = this.getBestImageForType("mainSrc");
                                if (null !== imageBaseSize) {
                                    var currentZoomMultiplier = this.getZoomMultiplier(), nextZoomMultiplier = this.getZoomMultiplier(nextZoomLevel), boxRect = this.getLightboxRect(), pointerX = void 0 !== clientX ? clientX - boxRect.left : boxRect.width / 2, pointerY = void 0 !== clientY ? clientY - boxRect.top : boxRect.height / 2, currentImageOffsetX = (boxRect.width - imageBaseSize.width * currentZoomMultiplier) / 2, currentImageOffsetY = (boxRect.height - imageBaseSize.height * currentZoomMultiplier) / 2, nextImageRealOffsetX = pointerX - (pointerX - (currentImageOffsetX - this.state.offsetX)) / currentZoomMultiplier * nextZoomMultiplier, nextImageRealOffsetY = pointerY - (pointerY - (currentImageOffsetY - this.state.offsetY)) / currentZoomMultiplier * nextZoomMultiplier, nextOffsetX = (boxRect.width - imageBaseSize.width * nextZoomMultiplier) / 2 - nextImageRealOffsetX, nextOffsetY = (boxRect.height - imageBaseSize.height * nextZoomMultiplier) / 2 - nextImageRealOffsetY;
                                    // When zooming out, limit the offset so things don't get left askew
                                    if (this.currentAction !== _constant.ACTION_PINCH) {
                                        var maxOffsets = this.getMaxOffsets();
                                        this.state.zoomLevel > nextZoomLevel && (nextOffsetX = Math.max(maxOffsets.minX, Math.min(maxOffsets.maxX, nextOffsetX)), 
                                        nextOffsetY = Math.max(maxOffsets.minY, Math.min(maxOffsets.maxY, nextOffsetY)));
                                    }
                                    this.setState({
                                        zoomLevel: nextZoomLevel,
                                        offsetX: nextOffsetX,
                                        offsetY: nextOffsetY
                                    });
                                }
                            } else 
                            // Snap back to center if zoomed all the way out
                            this.setState({
                                zoomLevel: nextZoomLevel,
                                offsetX: 0,
                                offsetY: 0
                            });
                        }
                    }
                }, {
                    key: "closeIfClickInner",
                    value: function(event) {
                        !this.preventInnerClose && event.target.className.search(/\bril-inner\b/) > -1 && this.requestClose(event);
                    }
                    /**
     * Handle user keyboard actions
     */                }, {
                    key: "handleKeyInput",
                    value: function(event) {
                        // Ignore key input during animations
                        if (event.stopPropagation(), !this.isAnimating()) 
                        // Allow slightly faster navigation through the images when user presses keys repeatedly
                        if ("keyup" !== event.type) {
                            var keyCode = event.which || event.keyCode, currentTime = new Date();
                            // Ignore key presses that happen too close to each other (when rapid fire key pressing or holding down the key)
                            // But allow it if it's a lightbox closing action
                                                        if (!(currentTime.getTime() - this.lastKeyDownTime < this.props.keyRepeatLimit && keyCode !== _constant.KEYS.ESC)) switch (this.lastKeyDownTime = currentTime.getTime(), 
                            keyCode) {
                              // ESC key closes the lightbox
                                case _constant.KEYS.ESC:
                                event.preventDefault(), this.requestClose(event);
                                break;

                                // Left arrow key moves to previous image
                                                              case _constant.KEYS.LEFT_ARROW:
                                if (!this.props.prevSrc && !this.props.prevCustomContent) return;
                                event.preventDefault(), this.keyPressed = !0, this.requestMovePrev(event);
                                break;

                                // Right arrow key moves to next image
                                                              case _constant.KEYS.RIGHT_ARROW:
                                if (!this.props.nextSrc && !this.props.nextCustomContent) return;
                                event.preventDefault(), this.keyPressed = !0, this.requestMoveNext(event);
                            }
                        } else this.lastKeyDownTime -= this.props.keyRepeatKeyupBonus;
                    }
                    /**
     * Handle a mouse wheel event over the lightbox container
     */                }, {
                    key: "handleOuterMousewheel",
                    value: function(event) {
                        var _this7 = this;
                        // Prevent scrolling of the background
                                                event.preventDefault(), event.stopPropagation();
                        var xThreshold = _constant.WHEEL_MOVE_X_THRESHOLD, actionDelay = 0;
                        // Prevent rapid-fire zoom behavior
                        if (this.clearTimeout(this.resetScrollTimeout), this.resetScrollTimeout = this.setTimeout(function() {
                            _this7.scrollX = 0, _this7.scrollY = 0;
                        }, 300), null === this.wheelActionTimeout && !this.isAnimating()) {
                            if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
                                // handle horizontal scrolls with image moves
                                this.scrollY = 0, this.scrollX += event.deltaX;
                                var bigLeapX = xThreshold / 2;
                                // If the scroll amount has accumulated sufficiently, or a large leap was taken
                                                                this.scrollX >= xThreshold || event.deltaX >= bigLeapX ? (
                                // Scroll right moves to next
                                this.requestMoveNext(event), actionDelay = 500, this.scrollX = 0) : (this.scrollX <= -1 * xThreshold || event.deltaX <= -1 * bigLeapX) && (
                                // Scroll left moves to previous
                                this.requestMovePrev(event), actionDelay = 500, this.scrollX = 0);
                            }
                            // Allow successive actions after the set delay
                                                        0 !== actionDelay && (this.wheelActionTimeout = this.setTimeout(function() {
                                _this7.wheelActionTimeout = null;
                            }, actionDelay));
                        }
                    }
                }, {
                    key: "handleImageMouseWheel",
                    value: function(event) {
                        event.preventDefault();
                        var yThreshold = _constant.WHEEL_MOVE_Y_THRESHOLD;
                        if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
                            // If the vertical scroll amount was large enough, perform a zoom
                            if (event.stopPropagation(), Math.abs(event.deltaY) < yThreshold) return;
                            this.scrollX = 0, this.scrollY += event.deltaY, this.changeZoom(this.state.zoomLevel - event.deltaY, event.clientX, event.clientY);
                        }
                    }
                    /**
     * Handle a double click on the current image
     */                }, {
                    key: "handleImageDoubleClick",
                    value: function(event) {
                        this.state.zoomLevel > _constant.MIN_ZOOM_LEVEL ? 
                        // A double click when zoomed in zooms all the way out
                        this.changeZoom(_constant.MIN_ZOOM_LEVEL, event.clientX, event.clientY) : 
                        // A double click when zoomed all the way out zooms in
                        this.changeZoom(this.state.zoomLevel + _constant.ZOOM_BUTTON_INCREMENT_SIZE, event.clientX, event.clientY);
                    }
                }, {
                    key: "shouldHandleEvent",
                    value: function(source) {
                        if (this.eventsSource === source) return !0;
                        if (this.eventsSource === _constant.SOURCE_ANY) return this.eventsSource = source, 
                        !0;
                        switch (source) {
                          case _constant.SOURCE_MOUSE:
                            return !1;

                          case _constant.SOURCE_TOUCH:
                            return this.eventsSource = _constant.SOURCE_TOUCH, this.filterPointersBySource(), 
                            !0;

                          case _constant.SOURCE_POINTER:
                            return this.eventsSource === _constant.SOURCE_MOUSE && (this.eventsSource = _constant.SOURCE_POINTER, 
                            this.filterPointersBySource(), !0);

                          default:
                            return !1;
                        }
                    }
                }, {
                    key: "addPointer",
                    value: function(pointer) {
                        this.pointerList.push(pointer);
                    }
                }, {
                    key: "removePointer",
                    value: function(pointer) {
                        this.pointerList = this.pointerList.filter(function(_ref2) {
                            return _ref2.id !== pointer.id;
                        });
                    }
                }, {
                    key: "filterPointersBySource",
                    value: function() {
                        var _this8 = this;
                        this.pointerList = this.pointerList.filter(function(_ref3) {
                            return _ref3.source === _this8.eventsSource;
                        });
                    }
                }, {
                    key: "handleMouseDown",
                    value: function(event) {
                        this.shouldHandleEvent(_constant.SOURCE_MOUSE) && ReactImageLightbox.isTargetMatchImage(event.target) && (this.addPointer(ReactImageLightbox.parseMouseEvent(event)), 
                        this.multiPointerStart(event));
                    }
                }, {
                    key: "handleMouseMove",
                    value: function(event) {
                        this.shouldHandleEvent(_constant.SOURCE_MOUSE) && this.multiPointerMove(event, [ ReactImageLightbox.parseMouseEvent(event) ]);
                    }
                }, {
                    key: "handleMouseUp",
                    value: function(event) {
                        this.shouldHandleEvent(_constant.SOURCE_MOUSE) && (this.removePointer(ReactImageLightbox.parseMouseEvent(event)), 
                        this.multiPointerEnd(event));
                    }
                }, {
                    key: "handlePointerEvent",
                    value: function(event) {
                        if (this.shouldHandleEvent(_constant.SOURCE_POINTER)) switch (event.type) {
                          case "pointerdown":
                            ReactImageLightbox.isTargetMatchImage(event.target) && (this.addPointer(ReactImageLightbox.parsePointerEvent(event)), 
                            this.multiPointerStart(event));
                            break;

                          case "pointermove":
                            this.multiPointerMove(event, [ ReactImageLightbox.parsePointerEvent(event) ]);
                            break;

                          case "pointerup":
                          case "pointercancel":
                            this.removePointer(ReactImageLightbox.parsePointerEvent(event)), this.multiPointerEnd(event);
                        }
                    }
                }, {
                    key: "handleTouchStart",
                    value: function(event) {
                        var _this9 = this;
                        this.shouldHandleEvent(_constant.SOURCE_TOUCH) && ReactImageLightbox.isTargetMatchImage(event.target) && ([].forEach.call(event.changedTouches, function(eventTouch) {
                            return _this9.addPointer(ReactImageLightbox.parseTouchPointer(eventTouch));
                        }), this.multiPointerStart(event));
                    }
                }, {
                    key: "handleTouchMove",
                    value: function(event) {
                        this.shouldHandleEvent(_constant.SOURCE_TOUCH) && this.multiPointerMove(event, [].map.call(event.changedTouches, function(eventTouch) {
                            return ReactImageLightbox.parseTouchPointer(eventTouch);
                        }));
                    }
                }, {
                    key: "handleTouchEnd",
                    value: function(event) {
                        var _this10 = this;
                        this.shouldHandleEvent(_constant.SOURCE_TOUCH) && ([].map.call(event.changedTouches, function(touch) {
                            return _this10.removePointer(ReactImageLightbox.parseTouchPointer(touch));
                        }), this.multiPointerEnd(event));
                    }
                }, {
                    key: "decideMoveOrSwipe",
                    value: function(pointer) {
                        this.state.zoomLevel <= _constant.MIN_ZOOM_LEVEL ? this.handleSwipeStart(pointer) : this.handleMoveStart(pointer);
                    }
                }, {
                    key: "multiPointerStart",
                    value: function(event) {
                        switch (this.handleEnd(null), this.pointerList.length) {
                          case 1:
                            event.preventDefault(), this.decideMoveOrSwipe(this.pointerList[0]);
                            break;

                          case 2:
                            event.preventDefault(), this.handlePinchStart(this.pointerList);
                        }
                    }
                }, {
                    key: "multiPointerMove",
                    value: function(event, pointerList) {
                        switch (this.currentAction) {
                          case _constant.ACTION_MOVE:
                            event.preventDefault(), this.handleMove(pointerList[0]);
                            break;

                          case _constant.ACTION_SWIPE:
                            event.preventDefault(), this.handleSwipe(pointerList[0]);
                            break;

                          case _constant.ACTION_PINCH:
                            event.preventDefault(), this.handlePinch(pointerList);
                        }
                    }
                }, {
                    key: "multiPointerEnd",
                    value: function(event) {
                        switch (this.currentAction !== _constant.ACTION_NONE && (this.setPreventInnerClose(), 
                        this.handleEnd(event)), this.pointerList.length) {
                          case 0:
                            this.eventsSource = _constant.SOURCE_ANY;
                            break;

                          case 1:
                            event.preventDefault(), this.decideMoveOrSwipe(this.pointerList[0]);
                            break;

                          case 2:
                            event.preventDefault(), this.handlePinchStart(this.pointerList);
                        }
                    }
                }, {
                    key: "handleEnd",
                    value: function(event) {
                        switch (this.currentAction) {
                          case _constant.ACTION_MOVE:
                            this.handleMoveEnd(event);
                            break;

                          case _constant.ACTION_SWIPE:
                            this.handleSwipeEnd(event);
                            break;

                          case _constant.ACTION_PINCH:
                            this.handlePinchEnd(event);
                        }
                    }
                    // Handle move start over the lightbox container
                    // This happens:
                    // - On a mouseDown event
                    // - On a touchstart event
                                }, {
                    key: "handleMoveStart",
                    value: function(_ref4) {
                        var clientX = _ref4.x, clientY = _ref4.y;
                        this.props.enableZoom && (this.currentAction = _constant.ACTION_MOVE, this.moveStartX = clientX, 
                        this.moveStartY = clientY, this.moveStartOffsetX = this.state.offsetX, this.moveStartOffsetY = this.state.offsetY);
                    }
                    // Handle dragging over the lightbox container
                    // This happens:
                    // - After a mouseDown and before a mouseUp event
                    // - After a touchstart and before a touchend event
                                }, {
                    key: "handleMove",
                    value: function(_ref5) {
                        var clientX = _ref5.x, clientY = _ref5.y, newOffsetX = this.moveStartX - clientX + this.moveStartOffsetX, newOffsetY = this.moveStartY - clientY + this.moveStartOffsetY;
                        this.state.offsetX === newOffsetX && this.state.offsetY === newOffsetY || this.setState({
                            offsetX: newOffsetX,
                            offsetY: newOffsetY
                        });
                    }
                }, {
                    key: "handleMoveEnd",
                    value: function() {
                        var _this11 = this;
                        this.currentAction = _constant.ACTION_NONE, this.moveStartX = 0, this.moveStartY = 0, 
                        this.moveStartOffsetX = 0, this.moveStartOffsetY = 0;
                        // Snap image back into frame if outside max offset range
                        var maxOffsets = this.getMaxOffsets(), nextOffsetX = Math.max(maxOffsets.minX, Math.min(maxOffsets.maxX, this.state.offsetX)), nextOffsetY = Math.max(maxOffsets.minY, Math.min(maxOffsets.maxY, this.state.offsetY));
                        nextOffsetX === this.state.offsetX && nextOffsetY === this.state.offsetY || (this.setState({
                            offsetX: nextOffsetX,
                            offsetY: nextOffsetY,
                            shouldAnimate: !0
                        }), this.setTimeout(function() {
                            _this11.setState({
                                shouldAnimate: !1
                            });
                        }, this.props.animationDuration));
                    }
                }, {
                    key: "handleSwipeStart",
                    value: function(_ref6) {
                        var clientX = _ref6.x, clientY = _ref6.y;
                        this.currentAction = _constant.ACTION_SWIPE, this.swipeStartX = clientX, this.swipeStartY = clientY, 
                        this.swipeEndX = clientX, this.swipeEndY = clientY;
                    }
                }, {
                    key: "handleSwipe",
                    value: function(_ref7) {
                        var clientX = _ref7.x, clientY = _ref7.y;
                        this.swipeEndX = clientX, this.swipeEndY = clientY;
                    }
                }, {
                    key: "handleSwipeEnd",
                    value: function(event) {
                        var xDiff = this.swipeEndX - this.swipeStartX, xDiffAbs = Math.abs(xDiff), yDiffAbs = Math.abs(this.swipeEndY - this.swipeStartY);
                        if (this.currentAction = _constant.ACTION_NONE, this.swipeStartX = 0, this.swipeStartY = 0, 
                        this.swipeEndX = 0, this.swipeEndY = 0, !(!event || this.isAnimating() || xDiffAbs < 1.5 * yDiffAbs)) {
                            if (xDiffAbs < _constant.MIN_SWIPE_DISTANCE) if (xDiffAbs < this.getLightboxRect().width / 4) return;
                            xDiff > 0 && this.props.prevSrc ? (event.preventDefault(), this.requestMovePrev()) : xDiff < 0 && this.props.nextSrc && (event.preventDefault(), 
                            this.requestMoveNext());
                        }
                    }
                }, {
                    key: "calculatePinchDistance",
                    value: function() {
                        var _ref8 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.pinchTouchList, _ref9 = _slicedToArray(_ref8, 2), a = _ref9[0], b = _ref9[1];
                        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
                    }
                }, {
                    key: "calculatePinchCenter",
                    value: function() {
                        var _ref10 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.pinchTouchList, _ref11 = _slicedToArray(_ref10, 2), a = _ref11[0], b = _ref11[1];
                        return {
                            x: a.x - (a.x - b.x) / 2,
                            y: a.y - (a.y - b.y) / 2
                        };
                    }
                }, {
                    key: "handlePinchStart",
                    value: function(pointerList) {
                        this.props.enableZoom && (this.currentAction = _constant.ACTION_PINCH, this.pinchTouchList = pointerList.map(function(_ref12) {
                            return {
                                id: _ref12.id,
                                x: _ref12.x,
                                y: _ref12.y
                            };
                        }), this.pinchDistance = this.calculatePinchDistance());
                    }
                }, {
                    key: "handlePinch",
                    value: function(pointerList) {
                        this.pinchTouchList = this.pinchTouchList.map(function(oldPointer) {
                            for (var i = 0; i < pointerList.length; i += 1) if (pointerList[i].id === oldPointer.id) return pointerList[i];
                            return oldPointer;
                        });
                        var newDistance = this.calculatePinchDistance(), zoomLevel = this.state.zoomLevel + newDistance - this.pinchDistance;
                        this.pinchDistance = newDistance;
                        var _calculatePinchCenter = this.calculatePinchCenter(this.pinchTouchList), clientX = _calculatePinchCenter.x, clientY = _calculatePinchCenter.y;
                        this.changeZoom(zoomLevel, clientX, clientY);
                    }
                }, {
                    key: "handlePinchEnd",
                    value: function() {
                        this.currentAction = _constant.ACTION_NONE, this.pinchTouchList = null, this.pinchDistance = 0;
                    }
                    // Handle the window resize event
                                }, {
                    key: "handleWindowResize",
                    value: function() {
                        this.clearTimeout(this.resizeTimeout), this.resizeTimeout = this.setTimeout(this.forceUpdate.bind(this), 100);
                    }
                }, {
                    key: "handleZoomInButtonClick",
                    value: function() {
                        this.changeZoom(this.state.zoomLevel + _constant.ZOOM_BUTTON_INCREMENT_SIZE);
                    }
                }, {
                    key: "handleZoomOutButtonClick",
                    value: function() {
                        this.changeZoom(this.state.zoomLevel - _constant.ZOOM_BUTTON_INCREMENT_SIZE);
                    }
                }, {
                    key: "handleCaptionMousewheel",
                    value: function(event) {
                        if (event.stopPropagation(), this.caption) {
                            var height = this.caption.getBoundingClientRect().height, _caption = this.caption, scrollHeight = _caption.scrollHeight, scrollTop = _caption.scrollTop;
                            (event.deltaY > 0 && height + scrollTop >= scrollHeight || event.deltaY < 0 && scrollTop <= 0) && event.preventDefault();
                        }
                    }
                    // Detach key and mouse input events
                                }, {
                    key: "isAnimating",
                    value: function() {
                        return this.state.shouldAnimate || this.state.isClosing;
                    }
                    // Check if image is loaded
                                }, {
                    key: "isImageLoaded",
                    value: function(imageSrc) {
                        return imageSrc && imageSrc in this.imageCache && this.imageCache[imageSrc].loaded;
                    }
                    // Load image from src and call callback with image width and height on load
                                }, {
                    key: "loadImage",
                    value: function(srcType, imageSrc, done) {
                        var _this12 = this;
                        // Return the image info if it is already cached
                                                if (this.isImageLoaded(imageSrc)) this.setTimeout(function() {
                            done();
                        }, 1); else {
                            var inMemoryImage = new global.Image();
                            this.props.imageCrossOrigin && (inMemoryImage.crossOrigin = this.props.imageCrossOrigin), 
                            inMemoryImage.onerror = function(errorEvent) {
                                _this12.props.onImageLoadError(imageSrc, srcType, errorEvent), 
                                // failed to load so set the state loadErrorStatus
                                _this12.setState(function(prevState) {
                                    return {
                                        loadErrorStatus: _extends({}, prevState.loadErrorStatus, _defineProperty({}, srcType, !0))
                                    };
                                }), done(errorEvent);
                            }, inMemoryImage.onload = function() {
                                _this12.props.onImageLoad(imageSrc, srcType, inMemoryImage), _this12.imageCache[imageSrc] = {
                                    loaded: !0,
                                    width: inMemoryImage.width,
                                    height: inMemoryImage.height
                                }, done();
                            }, inMemoryImage.src = imageSrc;
                        }
                    }
                    // Load all images and their thumbnails
                                }, {
                    key: "loadAllImages",
                    value: function() {
                        var _this13 = this, props = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props;
                        // Load the images
                        this.getSrcTypes().forEach(function(srcType) {
                            var type = srcType.name;
                            // there is no error when we try to load it initially
                                                        props[type] && _this13.state.loadErrorStatus[type] && _this13.setState(function(prevState) {
                                return {
                                    loadErrorStatus: _extends({}, prevState.loadErrorStatus, _defineProperty({}, type, !1))
                                };
                            }), 
                            // Load unloaded images
                            !props[type] || _this13.isImageLoaded(props[type]) || "mainSrc" === props[type] && props.mainCustomContent || "prevSrc" === props[type] && props.prevCustomContent || "nextSrc" === props[type] && props.nextCustomContent || _this13.loadImage(type, props[type], function(srcType, imageSrc) {
                                return function(err) {
                                    // Give up showing image on error
                                    err || _this13.props[srcType] !== imageSrc || _this13.didUnmount || 
                                    // Force rerender with the new image
                                    _this13.forceUpdate();
                                    // Don't rerender if the src is not the same as when the load started
                                    // or if the component has unmounted
                                                                };
                            }(type, props[type]));
                        });
                    }
                    // Request that the lightbox be closed
                                }, {
                    key: "requestClose",
                    value: function(event) {
                        var _this14 = this, closeLightbox = function() {
                            return _this14.props.onCloseRequest(event);
                        };
                        // Call the parent close request
                                                this.props.animationDisabled || "keydown" === event.type && !this.props.animationOnKeyInput ? 
                        // No animation
                        closeLightbox() : (
                        // With animation
                        // Start closing animation
                        this.setState({
                            isClosing: !0
                        }), 
                        // Perform the actual closing at the end of the animation
                        this.setTimeout(closeLightbox, this.props.animationDuration));
                    }
                }, {
                    key: "requestMove",
                    value: function(direction, event) {
                        var _this15 = this, nextState = {
                            zoomLevel: _constant.MIN_ZOOM_LEVEL,
                            offsetX: 0,
                            offsetY: 0
                        };
                        // Reset the zoom level on image move
                                                // Enable animated states
                        this.props.animationDisabled || this.keyPressed && !this.props.animationOnKeyInput || (nextState.shouldAnimate = !0, 
                        this.setTimeout(function() {
                            return _this15.setState({
                                shouldAnimate: !1
                            });
                        }, this.props.animationDuration)), this.keyPressed = !1, this.moveRequested = !0, 
                        "prev" === direction ? (this.keyCounter -= 1, this.setState(nextState), this.props.onMovePrevRequest(event)) : (this.keyCounter += 1, 
                        this.setState(nextState), this.props.onMoveNextRequest(event));
                    }
                    // Request to transition to the next image
                                }, {
                    key: "requestMoveNext",
                    value: function(event) {
                        this.requestMove("next", event);
                    }
                    // Request to transition to the previous image
                                }, {
                    key: "requestMovePrev",
                    value: function(event) {
                        this.requestMove("prev", event);
                    }
                }, {
                    key: "render",
                    value: function() {
                        var _this16 = this, _props = this.props, animationDisabled = _props.animationDisabled, animationDuration = _props.animationDuration, clickOutsideToClose = _props.clickOutsideToClose, discourageDownloads = _props.discourageDownloads, enableZoom = _props.enableZoom, imageTitle = _props.imageTitle, nextSrc = _props.nextSrc, prevSrc = _props.prevSrc, toolbarButtons = _props.toolbarButtons, reactModalStyle = _props.reactModalStyle, _onAfterOpen = _props.onAfterOpen, imageCrossOrigin = _props.imageCrossOrigin, reactModalProps = _props.reactModalProps, nextCustomContent = _props.nextCustomContent, prevCustomContent = _props.prevCustomContent, mainCustomContent = _props.mainCustomContent, _state = this.state, zoomLevel = _state.zoomLevel, offsetX = _state.offsetX, offsetY = _state.offsetY, isClosing = _state.isClosing, loadErrorStatus = _state.loadErrorStatus, boxSize = this.getLightboxRect(), transitionStyle = {};
                        // Transition settings for sliding animations
                        !animationDisabled && this.isAnimating() && (transitionStyle = _extends({}, transitionStyle, {
                            transition: "transform " + animationDuration + "ms"
                        }));
                        // Key endings to differentiate between images with the same src
                                                var keyEndings = {};
                        this.getSrcTypes().forEach(function(_ref13) {
                            var name = _ref13.name, keyEnding = _ref13.keyEnding;
                            keyEndings[name] = keyEnding;
                        });
                        // Images to be displayed
                        var images = [], addImage = function(srcType, imageClass, transforms) {
                            if ("mainSrc" === srcType && mainCustomContent) images.push(_react2.default.createElement("div", {
                                className: imageClass + " ril__image"
                            }, _extends({}, mainCustomContent, {
                                props: _extends({}, mainCustomContent.props, {
                                    key: srcType + "-mainCustomContent"
                                })
                            }))); else if ("prevSrc" === srcType && prevCustomContent) images.push(_react2.default.createElement("div", {
                                key: srcType + "-prevCustomContent"
                            })); else if ("nextSrc" === srcType && nextCustomContent) images.push(_react2.default.createElement("div", {
                                key: srcType + "-nextCustomContent"
                            })); else 
                            // Ignore types that have no source defined for their full size image
                            if (_this16.props[srcType]) {
                                var bestImageInfo = _this16.getBestImageForType(srcType), imageStyle = _extends({}, transitionStyle, ReactImageLightbox.getTransform(_extends({}, transforms, bestImageInfo)));
                                zoomLevel > _constant.MIN_ZOOM_LEVEL && (imageStyle.cursor = "move");
                                // support IE 9 and 11
                                                                // when error on one of the loads then push custom error stuff
                                if (null === bestImageInfo && (object = loadErrorStatus, Object.keys(object).some(function(key) {
                                    return object[key];
                                }))) images.push(_react2.default.createElement("div", {
                                    className: imageClass + " ril__image ril-errored",
                                    style: imageStyle,
                                    key: _this16.props[srcType] + keyEndings[srcType]
                                }, _react2.default.createElement("div", {
                                    className: "ril__errorContainer"
                                }, _this16.props.imageLoadErrorMessage))); else if (null !== bestImageInfo) {
                                    var object, imageSrc = bestImageInfo.src;
                                    discourageDownloads ? (imageStyle.backgroundImage = "url('" + imageSrc + "')", images.push(_react2.default.createElement("div", {
                                        className: imageClass + " ril__image ril__imageDiscourager",
                                        onDoubleClick: _this16.handleImageDoubleClick,
                                        onWheel: _this16.handleImageMouseWheel,
                                        style: imageStyle,
                                        key: imageSrc + keyEndings[srcType]
                                    }, _react2.default.createElement("div", {
                                        className: "ril-download-blocker ril__downloadBlocker"
                                    })))) : images.push(_react2.default.createElement("img", _extends({}, imageCrossOrigin ? {
                                        crossOrigin: imageCrossOrigin
                                    } : {}, {
                                        className: imageClass + " ril__image",
                                        onDoubleClick: _this16.handleImageDoubleClick,
                                        onWheel: _this16.handleImageMouseWheel,
                                        onDragStart: function(e) {
                                            return e.preventDefault();
                                        },
                                        style: imageStyle,
                                        src: imageSrc,
                                        key: imageSrc + keyEndings[srcType],
                                        alt: "string" == typeof imageTitle ? imageTitle : (0, _util.translate)("Image"),
                                        draggable: !1
                                    })));
                                } else {
                                    var loadingIcon = _react2.default.createElement("div", {
                                        className: "ril-loading-circle ril__loadingCircle ril__loadingContainer__icon"
                                    }, [].concat(_toConsumableArray(new Array(12))).map(function(_, index) {
                                        return _react2.default.createElement("div", {
                                            // eslint-disable-next-line react/no-array-index-key
                                            key: index,
                                            className: "ril-loading-circle-point ril__loadingCirclePoint"
                                        });
                                    }));
                                    // Fall back to loading icon if the thumbnail has not been loaded
                                                                        images.push(_react2.default.createElement("div", {
                                        className: imageClass + " ril__image ril-not-loaded",
                                        style: imageStyle,
                                        key: _this16.props[srcType] + keyEndings[srcType]
                                    }, _react2.default.createElement("div", {
                                        className: "ril__loadingContainer"
                                    }, loadingIcon)));
                                }
                            }
                        }, zoomMultiplier = this.getZoomMultiplier();
                        // Next Image (displayed on the right)
                        addImage("nextSrc", "ril-image-next ril__imageNext", {
                            x: boxSize.width
                        }), 
                        // Main Image
                        addImage("mainSrc", "ril-image-current", {
                            x: -1 * offsetX,
                            y: -1 * offsetY,
                            zoom: zoomMultiplier
                        }), 
                        // Previous Image (displayed on the left)
                        addImage("prevSrc", "ril-image-prev ril__imagePrev", {
                            x: -1 * boxSize.width
                        });
                        var modalStyle = {
                            overlay: _extends({
                                zIndex: 1e3,
                                backgroundColor: "transparent"
                            }, reactModalStyle.overlay),
                            content: _extends({
                                backgroundColor: "transparent",
                                overflow: "hidden",
                                // Needed, otherwise keyboard shortcuts scroll the page
                                border: "none",
                                borderRadius: 0,
                                padding: 0,
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            }, reactModalStyle.content)
                        };
                        return _react2.default.createElement(_reactModal2.default, _extends({
                            isOpen: !0,
                            onRequestClose: clickOutsideToClose ? this.requestClose : void 0,
                            onAfterOpen: function() {
                                // Focus on the div with key handlers
                                _this16.outerEl && _this16.outerEl.focus(), _onAfterOpen();
                            },
                            style: modalStyle,
                            contentLabel: (0, _util.translate)("Lightbox"),
                            appElement: void 0 !== global.window ? global.window.document.body : void 0
                        }, reactModalProps), _react2.default.createElement("div", {
                            // eslint-disable-line jsx-a11y/no-static-element-interactions
                            // Floating modal with closing animations
                            className: "ril-outer ril__outer ril__outerAnimating " + this.props.wrapperClassName + " " + (isClosing ? "ril-closing ril__outerClosing" : ""),
                            style: {
                                transition: "opacity " + animationDuration + "ms",
                                animationDuration: animationDuration + "ms",
                                animationDirection: isClosing ? "normal" : "reverse"
                            },
                            ref: function(el) {
                                _this16.outerEl = el;
                            },
                            onWheel: this.handleOuterMousewheel,
                            onMouseMove: this.handleMouseMove,
                            onMouseDown: this.handleMouseDown,
                            onTouchStart: this.handleTouchStart,
                            onTouchMove: this.handleTouchMove,
                            tabIndex: "-1",
                            onKeyDown: this.handleKeyInput,
                            onKeyUp: this.handleKeyInput
                        }, _react2.default.createElement("div", {
                            // eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
                            // Image holder
                            className: "ril-inner ril__inner",
                            onClick: clickOutsideToClose ? this.closeIfClickInner : void 0
                        }, images), prevSrc || prevCustomContent ? _react2.default.createElement("button", {
                            // Move to previous image button
                            type: "button",
                            className: "ril-prev-button ril__navButtons ril__navButtonPrev",
                            key: "prev",
                            "aria-label": this.props.prevLabel,
                            onClick: this.isAnimating() ? void 0 : this.requestMovePrev
                        }) : null, nextSrc || nextCustomContent ? _react2.default.createElement("button", {
                            // Move to next image button
                            type: "button",
                            className: "ril-next-button ril__navButtons ril__navButtonNext",
                            key: "next",
                            "aria-label": this.props.nextLabel,
                            onClick: this.isAnimating() ? void 0 : this.requestMoveNext
                        }) : null, _react2.default.createElement("div", {
                            // Lightbox toolbar
                            className: "ril-toolbar ril__toolbar"
                        }, _react2.default.createElement("ul", {
                            className: "ril-toolbar-left ril__toolbarSide ril__toolbarLeftSide"
                        }, _react2.default.createElement("li", {
                            className: "ril-toolbar__item ril__toolbarItem"
                        }, _react2.default.createElement("span", {
                            className: "ril-toolbar__item__child ril__toolbarItemChild"
                        }, imageTitle))), _react2.default.createElement("ul", {
                            className: "ril-toolbar-right ril__toolbarSide ril__toolbarRightSide"
                        }, toolbarButtons && toolbarButtons.map(function(button, i) {
                            return _react2.default.createElement("li", {
                                key: "button_" + (i + 1),
                                className: "ril-toolbar__item ril__toolbarItem"
                            }, button);
                        }), enableZoom && _react2.default.createElement("li", {
                            className: "ril-toolbar__item ril__toolbarItem"
                        }, _react2.default.createElement("button", {
                            // Lightbox zoom in button
                            type: "button",
                            key: "zoom-in",
                            "aria-label": this.props.zoomInLabel,
                            className: [ "ril-zoom-in", "ril__toolbarItemChild", "ril__builtinButton", "ril__zoomInButton" ].concat(_toConsumableArray(zoomLevel === _constant.MAX_ZOOM_LEVEL ? [ "ril__builtinButtonDisabled" ] : [])).join(" "),
                            disabled: this.isAnimating() || zoomLevel === _constant.MAX_ZOOM_LEVEL,
                            onClick: this.isAnimating() || zoomLevel === _constant.MAX_ZOOM_LEVEL ? void 0 : this.handleZoomInButtonClick
                        })), enableZoom && _react2.default.createElement("li", {
                            className: "ril-toolbar__item ril__toolbarItem"
                        }, _react2.default.createElement("button", {
                            // Lightbox zoom out button
                            type: "button",
                            key: "zoom-out",
                            "aria-label": this.props.zoomOutLabel,
                            className: [ "ril-zoom-out", "ril__toolbarItemChild", "ril__builtinButton", "ril__zoomOutButton" ].concat(_toConsumableArray(zoomLevel === _constant.MIN_ZOOM_LEVEL ? [ "ril__builtinButtonDisabled" ] : [])).join(" "),
                            disabled: this.isAnimating() || zoomLevel === _constant.MIN_ZOOM_LEVEL,
                            onClick: this.isAnimating() || zoomLevel === _constant.MIN_ZOOM_LEVEL ? void 0 : this.handleZoomOutButtonClick
                        })), _react2.default.createElement("li", {
                            className: "ril-toolbar__item ril__toolbarItem"
                        }, _react2.default.createElement("button", {
                            // Lightbox close button
                            type: "button",
                            key: "close",
                            "aria-label": this.props.closeLabel,
                            className: "ril-close ril-toolbar__item__child ril__toolbarItemChild ril__builtinButton ril__closeButton",
                            onClick: this.isAnimating() ? void 0 : this.requestClose
                        })))), this.props.imageCaption && 
                        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                        _react2.default.createElement("div", {
                            // Image caption
                            onWheel: this.handleCaptionMousewheel,
                            onMouseDown: function(event) {
                                return event.stopPropagation();
                            },
                            className: "ril-caption ril__caption",
                            ref: function(el) {
                                _this16.caption = el;
                            }
                        }, _react2.default.createElement("div", {
                            className: "ril-caption-content ril__captionContent"
                        }, this.props.imageCaption))));
                    }
                } ]), ReactImageLightbox;
            }();
            ReactImageLightbox.propTypes = {
                //-----------------------------
                // Image sources
                //-----------------------------
                // Main display image url
                mainSrc: _propTypes2.default.string,
                // eslint-disable-line react/no-unused-prop-types
                // Previous display image url (displayed to the left)
                // If left undefined, movePrev actions will not be performed, and the button not displayed
                prevSrc: _propTypes2.default.string,
                // Next display image url (displayed to the right)
                // If left undefined, moveNext actions will not be performed, and the button not displayed
                nextSrc: _propTypes2.default.string,
                //-----------------------------
                // Image thumbnail sources
                //-----------------------------
                // Thumbnail image url corresponding to props.mainSrc
                mainSrcThumbnail: _propTypes2.default.string,
                // eslint-disable-line react/no-unused-prop-types
                // Thumbnail image url corresponding to props.prevSrc
                prevSrcThumbnail: _propTypes2.default.string,
                // eslint-disable-line react/no-unused-prop-types
                // Thumbnail image url corresponding to props.nextSrc
                nextSrcThumbnail: _propTypes2.default.string,
                // eslint-disable-line react/no-unused-prop-types
                //-----------------------------
                // Event Handlers
                //-----------------------------
                // Close window event
                // Should change the parent state such that the lightbox is not rendered
                onCloseRequest: _propTypes2.default.func.isRequired,
                // Move to previous image event
                // Should change the parent state such that props.prevSrc becomes props.mainSrc,
                //  props.mainSrc becomes props.nextSrc, etc.
                onMovePrevRequest: _propTypes2.default.func,
                // Move to next image event
                // Should change the parent state such that props.nextSrc becomes props.mainSrc,
                //  props.mainSrc becomes props.prevSrc, etc.
                onMoveNextRequest: _propTypes2.default.func,
                // Called when an image fails to load
                // (imageSrc: string, srcType: string, errorEvent: object): void
                onImageLoadError: _propTypes2.default.func,
                // Called when image successfully loads
                onImageLoad: _propTypes2.default.func,
                // Open window event
                onAfterOpen: _propTypes2.default.func,
                //-----------------------------
                // Download discouragement settings
                //-----------------------------
                // Enable download discouragement (prevents [right-click -> Save Image As...])
                discourageDownloads: _propTypes2.default.bool,
                //-----------------------------
                // Animation settings
                //-----------------------------
                // Disable all animation
                animationDisabled: _propTypes2.default.bool,
                // Disable animation on actions performed with keyboard shortcuts
                animationOnKeyInput: _propTypes2.default.bool,
                // Animation duration (ms)
                animationDuration: _propTypes2.default.number,
                //-----------------------------
                // Keyboard shortcut settings
                //-----------------------------
                // Required interval of time (ms) between key actions
                // (prevents excessively fast navigation of images)
                keyRepeatLimit: _propTypes2.default.number,
                // Amount of time (ms) restored after each keyup
                // (makes rapid key presses slightly faster than holding down the key to navigate images)
                keyRepeatKeyupBonus: _propTypes2.default.number,
                //-----------------------------
                // Image info
                //-----------------------------
                // Image title
                imageTitle: _propTypes2.default.node,
                // Image caption
                imageCaption: _propTypes2.default.node,
                // Optional crossOrigin attribute
                imageCrossOrigin: _propTypes2.default.string,
                //-----------------------------
                // Lightbox style
                //-----------------------------
                // Set z-index style, etc., for the parent react-modal (format: https://github.com/reactjs/react-modal#styles )
                reactModalStyle: _propTypes2.default.shape({}),
                // Padding (px) between the edge of the window and the lightbox
                imagePadding: _propTypes2.default.number,
                wrapperClassName: _propTypes2.default.string,
                //-----------------------------
                // Other
                //-----------------------------
                // Array of custom toolbar buttons
                toolbarButtons: _propTypes2.default.arrayOf(_propTypes2.default.node),
                // When true, clicks outside of the image close the lightbox
                clickOutsideToClose: _propTypes2.default.bool,
                // Set to false to disable zoom functionality and hide zoom buttons
                enableZoom: _propTypes2.default.bool,
                // Override props set on react-modal (https://github.com/reactjs/react-modal)
                reactModalProps: _propTypes2.default.shape({}),
                // Aria-labels
                nextLabel: _propTypes2.default.string,
                prevLabel: _propTypes2.default.string,
                zoomInLabel: _propTypes2.default.string,
                zoomOutLabel: _propTypes2.default.string,
                closeLabel: _propTypes2.default.string,
                imageLoadErrorMessage: _propTypes2.default.node,
                // customContent
                mainCustomContent: _propTypes2.default.node,
                prevCustomContent: _propTypes2.default.node,
                nextCustomContent: _propTypes2.default.node
            }, ReactImageLightbox.defaultProps = {
                imageTitle: null,
                imageCaption: null,
                toolbarButtons: null,
                reactModalProps: {},
                animationDisabled: !1,
                animationDuration: 300,
                animationOnKeyInput: !1,
                clickOutsideToClose: !0,
                closeLabel: "Close lightbox",
                discourageDownloads: !1,
                enableZoom: !0,
                imagePadding: 10,
                imageCrossOrigin: null,
                keyRepeatKeyupBonus: 40,
                keyRepeatLimit: 180,
                mainSrcThumbnail: null,
                nextLabel: "Next image",
                nextSrc: null,
                nextSrcThumbnail: null,
                onAfterOpen: function() {},
                onImageLoadError: function() {},
                onImageLoad: function() {},
                onMoveNextRequest: function() {},
                onMovePrevRequest: function() {},
                prevLabel: "Previous image",
                prevSrc: null,
                prevSrcThumbnail: null,
                reactModalStyle: {},
                wrapperClassName: "",
                zoomInLabel: "Zoom in",
                zoomOutLabel: "Zoom out",
                imageLoadErrorMessage: "This image failed to load",
                mainCustomContent: null,
                prevCustomContent: null,
                nextCustomContent: null
            }, exports.default = ReactImageLightbox;
        }).call(this, __webpack_require__(0))
        /***/;
    }, 
    /* 3 */
    /***/ function(module, exports) {
        module.exports = require("react");
        /***/    }, 
    /* 4 */
    /***/ function(module, exports) {
        module.exports = require("prop-types");
        /***/    }, 
    /* 5 */
    /***/ function(module, exports) {
        module.exports = require("react-modal");
        /***/    }, 
    /* 6 */
    /***/ function(module, exports, __webpack_require__) {
        "use strict";
        /* WEBPACK VAR INJECTION */        
        /* WEBPACK VAR INJECTION */ (function(global) {
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.translate = 
            /**
 * Placeholder for future translate functionality
 */
            function(str) {
                var replaceStrings = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                if (!str) return "";
                var translated = str;
                replaceStrings && Object.keys(replaceStrings).forEach(function(placeholder) {
                    translated = translated.replace(placeholder, replaceStrings[placeholder]);
                });
                return translated;
            }, exports.getWindowWidth = function() {
                return void 0 !== global.window ? global.window.innerWidth : 0;
            }, exports.getWindowHeight = function() {
                return void 0 !== global.window ? global.window.innerHeight : 0;
            }
            // Get the highest window context that isn't cross-origin
            // (When in an iframe)
            , exports.getHighestSafeWindowContext = function getHighestSafeWindowContext() {
                var self = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : global.window.self;
                // If we reached the top level, return self
                                if (self === global.window.top) return self;
                var getOrigin = function(href) {
                    return href.match(/(.*\/\/.*?)(\/|$)/)[1];
                };
                // If parent is the same origin, we can move up one context
                // Reference: https://stackoverflow.com/a/21965342/1601953
                                if (getOrigin(self.location.href) === getOrigin(self.document.referrer)) return getHighestSafeWindowContext(self.parent);
                // If a different origin, we consider the current level
                // as the top reachable one
                                return self;
            }
            /* WEBPACK VAR INJECTION */;
        }).call(this, __webpack_require__(0))
        /***/;
    }, 
    /* 7 */
    /***/ function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        // Min image zoom level
        exports.MIN_ZOOM_LEVEL = 0, exports.MAX_ZOOM_LEVEL = 300, exports.ZOOM_RATIO = 1.007, 
        exports.ZOOM_BUTTON_INCREMENT_SIZE = 100, exports.WHEEL_MOVE_X_THRESHOLD = 200, 
        exports.WHEEL_MOVE_Y_THRESHOLD = 1, exports.KEYS = {
            ESC: 27,
            LEFT_ARROW: 37,
            RIGHT_ARROW: 39
        }, exports.ACTION_NONE = 0, exports.ACTION_MOVE = 1, exports.ACTION_SWIPE = 2, exports.ACTION_PINCH = 3, 
        exports.ACTION_ROTATE = 4, exports.SOURCE_ANY = 0, exports.SOURCE_MOUSE = 1, exports.SOURCE_TOUCH = 2, 
        exports.SOURCE_POINTER = 3, exports.MIN_SWIPE_DISTANCE = 200;
        // Max image zoom level
        }, 
    /* 8 */
    /***/ function(module, exports) {
        // removed by extract-text-webpack-plugin
        /***/}
    /******/ ]);
});