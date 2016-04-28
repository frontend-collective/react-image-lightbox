'use strict';

var Radium = require('radium');
var toolbarHeight = '50px';

var closeWindowKeyframes = Radium.keyframes({
    '0%': { opacity: 1 },
    '100%': { opacity: 0 }
}, 'closeWindow');

var styles = {
    outer: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        width: '100%',
        height: '100%'
    },
    outerAnimating: function outerAnimating(duration, isClosing) {
        return {
            transition: 'opacity ' + String(duration) + 'ms',
            animationDuration: String(duration) + 'ms',
            animationDirection: isClosing ? 'normal' : 'reverse',
            animationName: closeWindowKeyframes
        };
    },
    outerClosing: {
        opacity: 0
    },
    inner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },

    image: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        margin: 'auto',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    imagePrev: {
        left: '-100%',
        right: '100%'
    },
    imageNext: {
        left: '100%',
        right: '-100%'
    },
    imageCurrent: function imageCurrent(zoomRatio, offsetX, offsetY) {
        return {
            transform: 'scale3d(' + zoomRatio + ',' + zoomRatio + ',1) ',
            left: -1 * offsetX,
            right: offsetX,
            top: -1 * offsetY,
            bottom: offsetY
        };
    },
    imageDiscourager: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain'
    },
    imageAnimating: function imageAnimating(duration) {
        return {
            transition: ['transform ' + String(duration) + 'ms', 'left ' + String(duration) + 'ms', 'top ' + String(duration) + 'ms', 'right ' + String(duration) + 'ms', 'bottom ' + String(duration) + 'ms'].join(', ')
        };
    },

    navButtons: {
        border: 'none',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '20px',
        height: '34px',
        padding: '40px 30px',
        margin: 'auto',
        cursor: 'pointer',
        opacity: 0.7,

        ':hover': {
            opacity: 1
        },

        ':active': {
            opacity: 0.7
        }
    },
    navButtonPrev: {
        left: 0,
        background: 'rgba(0,0,0,0.2) url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjM0Ij48cGF0aCBkPSJtIDE5LDMgLTIsLTIgLTE2LDE2IDE2LDE2IDEsLTEgLTE1LC0xNSAxNSwtMTUgeiIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg==\') no-repeat center'
    },
    navButtonNext: {
        right: 0,
        background: 'rgba(0,0,0,0.2) url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjM0Ij48cGF0aCBkPSJtIDEsMyAyLC0yIDE2LDE2IC0xNiwxNiAtMSwtMSAxNSwtMTUgLTE1LC0xNSB6IiBmaWxsPSIjRkZGIi8+PC9zdmc+\') no-repeat center'
    },

    downloadBlocker: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\')',
        backgroundSize: 'cover'
    },

    toolbar: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: toolbarHeight
    },
    toolbarSide: {
        lineHeight: toolbarHeight,
        position: 'absolute',
        top: 0,
        bottom: 0,
        margin: 0,
        maxWidth: '48%'
    },
    toolbarLeftSide: {
        paddingLeft: '20px',
        paddingRight: 0,
        left: 0
    },
    toolbarRightSide: {
        paddingLeft: 0,
        paddingRight: '20px',
        right: 0
    },
    toolbarItem: {
        display: 'inline-block',
        lineHeight: toolbarHeight,
        padding: 0,
        color: '#FFFFFF',
        fontSize: '120%',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'

    },
    toolbarItemChild: {
        verticalAlign: 'middle'
    },

    builtinButton: {
        width: '40px',
        height: '35px',
        cursor: 'pointer',
        border: 'none',
        opacity: 0.7,

        ':hover': {
            opacity: 1
        },

        ':active': {
            outline: 'none'
        }
    },

    builtinButtonDisabled: {
        cursor: 'default',
        opacity: 0.5,

        ':hover': {
            opacity: 0.5
        }
    },

    closeButton: {
        background: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBkPSJtIDEsMyAxLjI1LC0xLjI1IDcuNSw3LjUgNy41LC03LjUgMS4yNSwxLjI1IC03LjUsNy41IDcuNSw3LjUgLTEuMjUsMS4yNSAtNy41LC03LjUgLTcuNSw3LjUgLTEuMjUsLTEuMjUgNy41LC03LjUgLTcuNSwtNy41IHoiIGZpbGw9IiNGRkYiLz48L3N2Zz4=\') no-repeat center'
    },

    zoomInButton: {
        background: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGcgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTEgMTlsNi02Ii8+PHBhdGggZD0iTTkgOGg2Ii8+PHBhdGggZD0iTTEyIDV2NiIvPjwvZz48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+\') no-repeat center'
    },

    zoomOutButton: {
        background: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGcgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTEgMTlsNi02Ii8+PHBhdGggZD0iTTkgOGg2Ii8+PC9nPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=\') no-repeat center'
    }
};

module.exports = styles;