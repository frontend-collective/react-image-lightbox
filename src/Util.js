/**
 * Checks if the user is using Internet Explorer
 *
 * @return {boolean} isIE - True if the user is on IE
 */
function isIE() {
    var ua = window.navigator.userAgent;
    return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
}

module.exports = {
    isIE: isIE,
};
