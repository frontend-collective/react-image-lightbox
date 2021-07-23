export function getWindowWidth() {
  return typeof window !== 'undefined' ? window.innerWidth : 0;
}

export function getWindowHeight() {
  return typeof window !== 'undefined' ? window.innerHeight : 0;
}

const isCrossOriginFrame = () => {
  try {
    return window.location.hostname !== window.parent.location.hostname;
  } catch (e) {
    return true;
  }
};

// Get the highest window context that isn't cross-origin
// (When in an iframe)
export function getHighestSafeWindowContext(
  self: Window = window.self
): Window {
  // If we reached the top level, return self
  if (self === window.top) {
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
