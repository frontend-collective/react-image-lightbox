/**
 * Get the version of Internet Explorer in use, or undefined
 *
 * @return {?number} ieVersion - IE version as an integer, or undefined if not IE
 */
export function getIEVersion() {
    var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
    return match ? parseInt(match[1]) : undefined;
}

/**
 * Placeholder for future translate functionality
 */
export function translate(str, replaceStrings = null) {
    if (!str) {
        return '';
    }

    if (replaceStrings) {
        for (let placeholder in replaceStrings) {
            str = str.replace(placeholder, replaceStrings[placeholder]);
        }
    }

    return str;
}


export function getWindowWidth () {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

export function getWindowHeight () {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

// Returns true if this window is rendered as an iframe inside another window
export function isInIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
