import { getWindowWidth } from './util';
import { SOURCE_MOUSE, SOURCE_TOUCH, SOURCE_POINTER } from './constant';

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
export function isImageLoaded(imageSrc, state) {
  return imageSrc && imageSrc in imageCache && imageCache[imageSrc].loaded;
}

// Get cached image info
export function getLoadedImageInfo(imageSrc, state) {
  return imageCache[imageSrc];
}

// Load image from src and call callback with image width and height on load
export function loadImage(srcType, imageSrc, imageCrossOrigin, done) {
  // Return the image info if it is already cached
  if (isImageLoaded(imageSrc)) {
    setTimeout(done, 1);
    return;
  }

  const inMemoryImage = new global.Image();

  if (imageCrossOrigin) {
    inMemoryImage.crossOrigin = imageCrossOrigin;
  }

  inMemoryImage.onerror = done;

  inMemoryImage.onload = () => {
    imageCache[imageSrc] = {
      loaded: true,
      width: inMemoryImage.width,
      height: inMemoryImage.height,
    };
    done(null, inMemoryImage);
  };

  inMemoryImage.src = imageSrc;
}

// Load all images and their thumbnails
export function loadAllImages(props, state) {
  // Load the images
  return getSrcTypes(state.keyCounter).reduce((loadErrorStatus, srcType) => {
    const type = srcType.name;
    const imageSrc = props[type];
    // there is no error when we try to load it initially
    if (imageSrc && loadErrorStatus[type]) {
      return {
        ...loadErrorStatus,
        [type]: false,
      };
    }

    // Load unloaded images
    if (imageSrc && !isImageLoaded(imageSrc)) {
      loadImage(type, imageSrc, props.imageCrossOrigin, (err, inMemoryImage) =>
        state.loadDone(err, type, imageSrc, inMemoryImage)
      );
    }

    return loadErrorStatus;
  }, state.loadErrorStatus);
}
