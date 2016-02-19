require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Lightbox = require('react-image-lightbox');

var images = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg'];

var thumbs = ['/images/1_thumb.jpg', '/images/2_thumb.jpg', '/images/3_thumb.jpg', '/images/4_thumb.jpg'];

var titles = ["", React.createElement(
    'span',
    null,
    'by ',
    React.createElement(
        'a',
        { href: 'http://flickr.com/photos/titrans/' },
        'quatre mains'
    ),
    ' (',
    React.createElement(
        'a',
        { href: 'http://creativecommons.org/licenses/by/2.0/', title: 'Attribution License' },
        'Some rights reserved'
    ),
    ')'
), React.createElement(
    'span',
    null,
    'by ',
    React.createElement(
        'a',
        { href: 'http://flickr.com/photos/lachlanrogers/' },
        'latch.r'
    ),
    ' (',
    React.createElement(
        'a',
        { href: 'http://creativecommons.org/licenses/by-sa/2.0/', title: 'Attribution-ShareAlike License' },
        'Some rights reserved'
    ),
    ')'
), React.createElement(
    'span',
    null,
    'by ',
    React.createElement(
        'a',
        { href: 'http://flickr.com/photos/fazen/' },
        'fazen'
    ),
    ' (',
    React.createElement(
        'a',
        { href: 'http://creativecommons.org/licenses/by/2.0/', title: 'Attribution License' },
        'Some rights reserved'
    ),
    ')'
)];
var App = React.createClass({
    displayName: 'App',

    getInitialState: function getInitialState() {
        return {
            index: 0,
            isOpen: false
        };
    },
    openLightbox: function openLightbox() {
        this.setState({ isOpen: true });
    },
    closeLightbox: function closeLightbox() {
        this.setState({ isOpen: false });
    },
    moveNext: function moveNext() {
        this.setState({ index: (this.state.index + 1) % images.length });
    },
    movePrev: function movePrev() {
        this.setState({ index: (this.state.index + images.length - 1) % images.length });
    },
    render: function render() {
        var lightbox = '';
        if (this.state.isOpen) {
            lightbox = React.createElement(Lightbox, {
                mainSrc: images[this.state.index],
                nextSrc: images[(this.state.index + 1) % images.length],
                prevSrc: images[(this.state.index + images.length - 1) % images.length],

                mainSrcThumbnail: thumbs[this.state.index],
                nextSrcThumbnail: thumbs[(this.state.index + 1) % images.length],
                prevSrcThumbnail: thumbs[(this.state.index + images.length - 1) % images.length],

                onCloseRequest: this.closeLightbox,
                onMovePrevRequest: this.movePrev,
                onMoveNextRequest: this.moveNext,

                imageTitle: titles[this.state.index]
            });
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'button',
                {
                    type: 'button',
                    id: 'open-lightbox',
                    className: 'demo-button',
                    onClick: this.openLightbox
                },
                'Open Lightbox'
            ),
            lightbox
        );
    }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-image-lightbox":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2ZyaXR6LmNocmlzdG9waGVyL1dvcmsvcmVhY3QtaW1hZ2UtbGlnaHRib3gvZXhhbXBsZS9zcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLEtBQUssR0FBTSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDaEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3BDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDOztBQUUvQyxJQUFJLE1BQU0sR0FBRyxDQUNULGVBQWUsRUFDZixlQUFlLEVBQ2YsZUFBZSxFQUNmLGVBQWUsQ0FDbEIsQ0FBQzs7QUFFRixJQUFJLE1BQU0sR0FBRyxDQUNULHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLHFCQUFxQixDQUN4QixDQUFDOztBQUVGLElBQUksTUFBTSxHQUFHLENBQ1QsRUFBRSxFQUVFOzs7O0lBRUk7O1VBQUcsSUFBSSxFQUFDLG1DQUFtQzs7S0FFdkM7O0lBQ0c7O1VBQUcsSUFBSSxFQUFDLDZDQUE2QyxFQUFDLEtBQUssRUFBQyxxQkFBcUI7O0tBRXBGOztDQUNELEVBR1A7Ozs7SUFFSTs7VUFBRyxJQUFJLEVBQUMseUNBQXlDOztLQUFZOztJQUN0RDs7VUFBRyxJQUFJLEVBQUMsZ0RBQWdELEVBQUMsS0FBSyxFQUFDLGdDQUFnQzs7S0FFbEc7O0NBQ0QsRUFHUDs7OztJQUVJOztVQUFHLElBQUksRUFBQyxpQ0FBaUM7O0tBRXJDOztJQUNHOztVQUFHLElBQUksRUFBQyw2Q0FBNkMsRUFBQyxLQUFLLEVBQUMscUJBQXFCOztLQUVwRjs7Q0FDRCxDQUVkLENBQUM7QUFDRixJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxD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ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbnZhciBMaWdodGJveCA9IHJlcXVpcmUoJ3JlYWN0LWltYWdlLWxpZ2h0Ym94Jyk7XG5cbnZhciBpbWFnZXMgPSBbXG4gICAgJy9pbWFnZXMvMS5qcGcnLFxuICAgICcvaW1hZ2VzLzIuanBnJyxcbiAgICAnL2ltYWdlcy8zLmpwZycsXG4gICAgJy9pbWFnZXMvNC5qcGcnLFxuXTtcblxudmFyIHRodW1icyA9IFtcbiAgICAnL2ltYWdlcy8xX3RodW1iLmpwZycsXG4gICAgJy9pbWFnZXMvMl90aHVtYi5qcGcnLFxuICAgICcvaW1hZ2VzLzNfdGh1bWIuanBnJyxcbiAgICAnL2ltYWdlcy80X3RodW1iLmpwZycsXG5dO1xuXG52YXIgdGl0bGVzID0gW1xuICAgIFwiXCIsXG4gICAgKFxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIGJ5Jm5ic3A7XG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cDovL2ZsaWNrci5jb20vcGhvdG9zL3RpdHJhbnMvXCI+XG4gICAgICAgICAgICAgICAgcXVhdHJlIG1haW5zXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAmbmJzcDsoPGEgaHJlZj1cImh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LzIuMC9cIiB0aXRsZT1cIkF0dHJpYnV0aW9uIExpY2Vuc2VcIj5cbiAgICAgICAgICAgICAgICBTb21lIHJpZ2h0cyByZXNlcnZlZFxuICAgICAgICAgICAgPC9hPilcbiAgICAgICAgPC9zcGFuPlxuICAgICksXG4gICAgKFxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIGJ5Jm5ic3A7XG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cDovL2ZsaWNrci5jb20vcGhvdG9zL2xhY2hsYW5yb2dlcnMvXCI+bGF0Y2gucjwvYT5cbiAgICAgICAgICAgICZuYnNwOyg8YSBocmVmPVwiaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMi4wL1wiIHRpdGxlPVwiQXR0cmlidXRpb24tU2hhcmVBbGlrZSBMaWNlbnNlXCI+XG4gICAgICAgICAgICAgICAgU29tZSByaWdodHMgcmVzZXJ2ZWRcbiAgICAgICAgICAgIDwvYT4pXG4gICAgICAgIDwvc3Bhbj5cbiAgICApLFxuICAgIChcbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICBieSZuYnNwO1xuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHA6Ly9mbGlja3IuY29tL3Bob3Rvcy9mYXplbi9cIj5cbiAgICAgICAgICAgICAgICBmYXplblxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgJm5ic3A7KDxhIGhyZWY9XCJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS8yLjAvXCIgdGl0bGU9XCJBdHRyaWJ1dGlvbiBMaWNlbnNlXCI+XG4gICAgICAgICAgICAgICAgU29tZSByaWdodHMgcmVzZXJ2ZWRcbiAgICAgICAgICAgIDwvYT4pXG4gICAgICAgIDwvc3Bhbj5cbiAgICApLFxuXTtcbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgaXNPcGVuOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgb3BlbkxpZ2h0Ym94OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbjogdHJ1ZSB9KTtcbiAgICB9LFxuICAgIGNsb3NlTGlnaHRib3g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNPcGVuOiBmYWxzZSB9KTtcbiAgICB9LFxuICAgIG1vdmVOZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGluZGV4OiAodGhpcy5zdGF0ZS5pbmRleCArIDEpICUgaW1hZ2VzLmxlbmd0aCB9KTtcbiAgICB9LFxuICAgIG1vdmVQcmV2OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGluZGV4OiAodGhpcy5zdGF0ZS5pbmRleCArIGltYWdlcy5sZW5ndGggLSAxKSAlIGltYWdlcy5sZW5ndGggfSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGlnaHRib3ggPSAnJztcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICBsaWdodGJveCA9IChcbiAgICAgICAgICAgICAgICA8TGlnaHRib3hcbiAgICAgICAgICAgICAgICAgICAgbWFpblNyYz17aW1hZ2VzW3RoaXMuc3RhdGUuaW5kZXhdfVxuICAgICAgICAgICAgICAgICAgICBuZXh0U3JjPXtpbWFnZXNbKHRoaXMuc3RhdGUuaW5kZXggKyAxKSAlIGltYWdlcy5sZW5ndGhdfVxuICAgICAgICAgICAgICAgICAgICBwcmV2U3JjPXtpbWFnZXNbKHRoaXMuc3RhdGUuaW5kZXggKyBpbWFnZXMubGVuZ3RoIC0gMSkgJSBpbWFnZXMubGVuZ3RoXX1cblxuICAgICAgICAgICAgICAgICAgICBtYWluU3JjVGh1bWJuYWlsPXt0aHVtYnNbdGhpcy5zdGF0ZS5pbmRleF19XG4gICAgICAgICAgICAgICAgICAgIG5leHRTcmNUaHVtYm5haWw9e3RodW1ic1sodGhpcy5zdGF0ZS5pbmRleCArIDEpICUgaW1hZ2VzLmxlbmd0aF19XG4gICAgICAgICAgICAgICAgICAgIHByZXZTcmNUaHVtYm5haWw9e3RodW1ic1sodGhpcy5zdGF0ZS5pbmRleCArIGltYWdlcy5sZW5ndGggLSAxKSAlIGltYWdlcy5sZW5ndGhdfVxuXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2VSZXF1ZXN0PXt0aGlzLmNsb3NlTGlnaHRib3h9XG4gICAgICAgICAgICAgICAgICAgIG9uTW92ZVByZXZSZXF1ZXN0PXt0aGlzLm1vdmVQcmV2fVxuICAgICAgICAgICAgICAgICAgICBvbk1vdmVOZXh0UmVxdWVzdD17dGhpcy5tb3ZlTmV4dH1cblxuICAgICAgICAgICAgICAgICAgICBpbWFnZVRpdGxlPXt0aXRsZXNbdGhpcy5zdGF0ZS5pbmRleF19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBpZD1cIm9wZW4tbGlnaHRib3hcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkZW1vLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub3BlbkxpZ2h0Ym94fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgT3BlbiBMaWdodGJveFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIHtsaWdodGJveH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5SZWFjdERPTS5yZW5kZXIoPEFwcC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuIl19
