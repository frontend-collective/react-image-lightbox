/**
 * Get the version of Internet Explorer in use, or undefined
 *
 * @return {?number} ieVersion - IE version as an integer, or undefined if not IE
 */
export function getIEVersion() {
    if (typeof window === 'undefined') {
        return undefined;
    }

    const match = window.navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
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
        Object.keys(replaceStrings).forEach((placeholder) => {
            translated = translated.replace(placeholder, replaceStrings[placeholder]);
        });
    }

    return translated;
}


export function getWindowWidth() {
    if (typeof window === 'undefined') {
        return 0;
    }

    return window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
}

export function getWindowHeight() {
    if (typeof window === 'undefined') {
        return 0;
    }

    return window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
}

// Returns true if this window is rendered as an iframe inside another window
// with the same origin.
export function isInSameOriginIframe() {
    try {
        return (window.self !== window.top) && window.top.document;
    } catch (e) {
        return false;
    }
}
