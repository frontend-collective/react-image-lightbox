import { SOURCE_MOUSE, SOURCE_TOUCH, SOURCE_POINTER } from './constant';

/**
 * Placeholder for future translate functionality
 */
export function translate(str, replaceStrings = null) {
  if (!str) {
    return '';
  }

  let translated = str;
  if (replaceStrings) {
    Object.keys(replaceStrings).forEach(placeholder => {
      translated = translated.replace(placeholder, replaceStrings[placeholder]);
    });
  }

  return translated;
}

export function getWindowWidth() {
  return typeof global.window !== 'undefined' ? global.window.innerWidth : 0;
}

export function getWindowHeight() {
  return typeof global.window !== 'undefined' ? global.window.innerHeight : 0;
}

// Get the highest window context that isn't cross-origin
// (When in an iframe)
export function getHighestSafeWindowContext(self = global.window.self) {
  // If we reached the top level, return self
  if (self === global.window.top) {
    return self;
  }

  const getOrigin = href => href.match(/(.*\/\/.*?)(\/|$)/)[1];

  // If parent is the same origin, we can move up one context
  // Reference: https://stackoverflow.com/a/21965342/1601953
  if (getOrigin(self.location.href) === getOrigin(self.document.referrer)) {
    return getHighestSafeWindowContext(self.parent);
  }

  // If a different origin, we consider the current level
  // as the top reachable one
  return self;
}

// Used to store load state / dimensions of images
const imageCache = {};

export function isTargetMatchImage(target) {
  return target && /ril-image-current/.test(target.className);
}

export function parseMouseEvent(mouseEvent) {
  return {
    id: 'mouse',
    source: SOURCE_MOUSE,
    x: parseInt(mouseEvent.clientX, 10),
    y: parseInt(mouseEvent.clientY, 10),
  };
}

export function parseTouchPointer(touchPointer) {
  return {
    id: touchPointer.identifier,
    source: SOURCE_TOUCH,
    x: parseInt(touchPointer.clientX, 10),
    y: parseInt(touchPointer.clientY, 10),
  };
}

export function parsePointerEvent(pointerEvent) {
  return {
    id: pointerEvent.pointerId,
    source: SOURCE_POINTER,
    x: parseInt(pointerEvent.clientX, 10),
    y: parseInt(pointerEvent.clientY, 10),
  };
}

// Request to transition to the previous image
export function getTransform({ x = 0, y = 0, zoom = 1, width, targetWidth }) {
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

// Get image src types
export function getSrcTypes(keyCounter) {
  return [
    {
      name: 'mainSrc',
      keyEnding: `i${keyCounter}`,
    },
    {
      name: 'mainSrcThumbnail',
      keyEnding: `t${keyCounter}`,
    },
    {
      name: 'nextSrc',
      keyEnding: `i${keyCounter + 1}`,
    },
    {
      name: 'nextSrcThumbnail',
      keyEnding: `t${keyCounter + 1}`,
    },
    {
      name: 'prevSrc',
      keyEnding: `i${keyCounter - 1}`,
    },
    {
      name: 'prevSrcThumbnail',
      keyEnding: `t${keyCounter - 1}`,
    },
  ];
}

// Check if image is loaded
export function isImageLoaded(imageSrc) {
  return imageSrc && imageSrc in imageCache && imageCache[imageSrc].loaded;
}

// Get cached image info
export function getLoadedImageInfo(imageSrc) {
  return imageCache[imageSrc];
}

// Load image from src and call callback with image width and height on load
export function loadImage(srcType, imageSrc, imageCrossOrigin, done) {
  // Return the image info if it is already cached
  if (isImageLoaded(imageSrc)) {
    setTimeout(done, 1);
    return;
  }

  if (imageCache[imageSrc]) {
    imageCache[imageSrc].onload.push(done);
    return;
  }

  imageCache[imageSrc] = {
    loaded: false,
    onload: [done],
  };

  const inMemoryImage = new global.Image();

  inMemoryImage.crossOrigin = imageCrossOrigin;

  inMemoryImage.onerror = error => {
    const { onload } = imageCache[imageSrc];
    delete imageCache[imageSrc];
    onload.forEach(callback => callback(error));
  };

  inMemoryImage.onload = () => {
    const { onload } = imageCache[imageSrc];
    imageCache[imageSrc] = {
      loaded: true,
      width: inMemoryImage.width,
      height: inMemoryImage.height,
    };
    onload.forEach(callback => callback(null, inMemoryImage));
  };

  inMemoryImage.src = imageSrc;
}

// Load all images and their thumbnails
export function loadAllImages(
  props,
  { keyCounter, loadDone, loadErrorStatus }
) {
  // Load the images
  return getSrcTypes(keyCounter).reduce((out, { name: type }) => {
    const imageSrc = props[type];
    // there is no error when we try to load it initially
    if (imageSrc && out[type]) {
      return {
        ...out,
        [type]: false,
      };
    }

    // Load unloaded images
    if (imageSrc && !isImageLoaded(imageSrc)) {
      loadImage(type, imageSrc, props.imageCrossOrigin, (err, inMemoryImage) =>
        loadDone(err, type, imageSrc, inMemoryImage)
      );
    }

    return out;
  }, loadErrorStatus);
}
