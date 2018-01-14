/**
 * Get the version of Internet Explorer in use, or undefined
 *
 * @return {?number} ieVersion - IE version as an integer, or undefined if not IE
 */
export function getIEVersion() {
  if (
    typeof global.window === 'undefined' ||
    typeof global.window.navigator === 'undefined'
  ) {
    return undefined;
  }

  const match = global.window.navigator.userAgent.match(
    /(?:MSIE |Trident\/.*; rv:)(\d+)/
  );
  return match ? parseInt(match[1], 10) : undefined;
}

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
