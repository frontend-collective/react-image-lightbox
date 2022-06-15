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
  return typeof globalThis.window !== 'undefined'
    ? globalThis.window.innerWidth
    : 0;
}

export function getWindowHeight() {
  return typeof globalThis.window !== 'undefined'
    ? globalThis.window.innerHeight
    : 0;
}

const isCrossOriginFrame = () => {
  try {
    return (
      globalThis.window.location.hostname !==
      globalThis.window.parent.location.hostname
    );
  } catch (e) {
    return true;
  }
};

// Get the highest window context that isn't cross-origin
// (When in an iframe)
export function getHighestSafeWindowContext(self = globalThis.window.self) {
  // If we reached the top level, return self
  if (self === global.window.top) {
    return self;
  }

  // If parent is the same origin, we can move up one context
  // Reference: https://stackoverflow.com/a/21965342/1601953
  if (!isCrossOriginFrame()) {
    return getHighestSafeWindowContext(self.parent);
  }

  // If a different origin, we consider the current level
  // as the top reachable one
  return self;
}
