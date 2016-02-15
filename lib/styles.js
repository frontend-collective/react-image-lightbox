'use strict';

var toolbarHeight = '50px';
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
        height: '100%',

        animating: function animating(duration) {
            return {
                transition: 'opacity ' + String(duration) + 'ms'
            };
        }
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
    imageCurrent: {
        left: 0,
        right: 0
    },
    imageDiscourager: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain'
    },
    imageAnimating: function imageAnimating(duration) {
        return {
            transition: ['left ' + String(duration) + 'ms', 'right ' + String(duration) + 'ms'].join(', ')
        };
    },

    navButtons: {
        border: 'none',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '20px',
        height: '34px',
        padding: '40px 40px',
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
        background: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjM0Ij48cGF0aCBkPSJtIDE5LDMgLTIsLTIgLTE2LDE2IDE2LDE2IDEsLTEgLTE1LC0xNSAxNSwtMTUgeiIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg==\') no-repeat center'
    },
    navButtonNext: {
        right: 0,
        background: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjM0Ij48cGF0aCBkPSJtIDEsMyAyLC0yIDE2LDE2IC0xNiwxNiAtMSwtMSAxNSwtMTUgLTE1LC0xNSB6IiBmaWxsPSIjRkZGIi8+PC9zdmc+\') no-repeat center'
    },

    downloadBlocker: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(\'../img/please-use-download-button.gif\')',
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
        padding: '0 6px',
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

    closeButton: {
        width: '25px',
        height: '25px',
        cursor: 'pointer',
        border: 'none',
        background: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBkPSJtIDEsMyAxLjI1LC0xLjI1IDcuNSw3LjUgNy41LC03LjUgMS4yNSwxLjI1IC03LjUsNy41IDcuNSw3LjUgLTEuMjUsMS4yNSAtNy41LC03LjUgLTcuNSw3LjUgLTEuMjUsLTEuMjUgNy41LC03LjUgLTcuNSwtNy41IHoiIGZpbGw9IiNGRkYiLz48L3N2Zz4=\') no-repeat center',

        ':hover': {
            opacity: 0.7
        },

        ':active': {
            outline: 'none'
        }
    }
};

module.exports = styles;