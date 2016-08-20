# React Image Lightbox

[![NPM](https://nodei.co/npm/react-image-lightbox.png)](https://npmjs.org/package/react-image-lightbox)

A flexible lightbox component for displaying images in a React project.

[DEMO](https://fritz-c.github.io/react-image-lightbox/)

Features
- Keyboard shortcuts (with rate limiting)
- Image Zoom
- Flexible rendering using src values assigned on the fly
- Image preloading for smoother viewing
- No external CSS

## Example

```jsx
var React    = require('react');
var Lightbox = require('react-image-lightbox');

var images = [
    '//placekitten.com/1500/500',
    '//placekitten.com/4000/3000',
    '//placekitten.com/800/1200',
    '//placekitten.com/1500/1500'
];

module.exports = React.createClass({
    getInitialState: function() {
        return {
            index: 0,
            isOpen: false
        };
    },
    openLightbox: function() {
        this.setState({ isOpen: true });
    },
    closeLightbox: function() {
        this.setState({ isOpen: false });
    },
    moveNext: function() {
        this.setState({ index: (this.state.index + 1) % images.length });
    },
    movePrev: function() {
        this.setState({ index: (this.state.index + images.length - 1) % images.length });
    },
    render: function() {
        var lightbox = '';
        if (this.state.isOpen) {
            lightbox = (
                <Lightbox
                    mainSrc={images[this.state.index]}
                    nextSrc={images[(this.state.index + 1) % images.length]}
                    prevSrc={images[(this.state.index + images.length - 1) % images.length]}

                    onCloseRequest={this.closeLightbox}
                    onMovePrevRequest={this.movePrev}
                    onMoveNextRequest={this.moveNext}
                />
            );
        }

        return (
            <div>
                <button type="button" onClick={this.openLightbox}>Open Lightbox</button>
                {lightbox}
            </div>
        );
    }
});

```

## Deprecation Notice

All unprefixed classes (listed below) will be removed in v4.0.0. Use their `ril-` prefixed alternatives instead.
`close`, `closing`, `download-blocker`, `image-current`, `image-next`, `image-prev`, `inner`, `next-button`, `not-loaded`, `outer`, `prev-button`, `toolbar`, `toolbar-left`, `toolbar-right`, `zoom-in`, `zoom-out`

## Options

Property            | Type   | Default        | Required | Description
:-------------------|:------:|:--------------:|:--------:|:----------------------------------------
mainSrc             | string |                |    yes   | Main display image url
prevSrc             | string |                |          | Previous display image url (displayed to the left). If left undefined, movePrev actions will not be performed, and the button not displayed
nextSrc             | string |                |          | Next display image url (displayed to the right). If left undefined, moveNext actions will not be performed, and the button not displayed
mainSrcThumbnail    | string |                |          | Thumbnail image url corresponding to props.mainSrc
prevSrcThumbnail    | string |                |          | Thumbnail image url corresponding to props.prevSrc
nextSrcThumbnail    | string |                |          | Thumbnail image url corresponding to props.nextSrc
onCloseRequest      | func   |                |    yes   | Close window event. Should change the parent state such that the lightbox is not rendered
onMovePrevRequest   | func   | empty function |          | Move to previous image event. Should change the parent state such that props.prevSrc becomes props.mainSrc, props.mainSrc becomes props.nextSrc, etc.
onMoveNextRequest   | func   | empty function |          | Move to next image event. Should change the parent state such that props.nextSrc becomes props.mainSrc, props.mainSrc becomes props.prevSrc, etc.
discourageDownloads | bool   | `false`        |          | Enable download discouragement (prevents [right-click -> Save Image As...])
animationDisabled   | bool   | `false`        |          | Disable all animation
animationOnKeyInput | bool   | `false`        |          | Disable animation on actions performed with keyboard shortcuts
animationDuration   | number | `300`          |          | Animation duration (ms)
keyRepeatLimit      | number | `180`          |          | Required interval of time (ms) between key actions (prevents excessively fast navigation of images)
keyRepeatKeyupBonus | number | `40`           |          | Amount of time (ms) restored after each keyup (makes rapid key presses slightly faster than holding down the key to navigate images)
imageTitle          | string |                |          | Image title
toolbarButtons      | node[] |                |          | Array of custom toolbar buttons
reactModalStyle     | Object | `{}`           |          | Set z-index style, etc., for the parent react-modal (format: https://github.com/reactjs/react-modal#styles )
imagePadding        | number | `10`           |          | Padding (px) between the edge of the window and the lightbox
clickOutsideToClose | bool   | `true`         |          | When true, clicks outside of the image close the lightbox
enableZoom          | bool   | `true`         |          | Set to false to disable zoom functionality and hide zoom buttons

## Contributing

After cloning the repository and running `npm install` inside, you can use the following commands to develop and build the project.

```sh
# Starts a webpack dev server that hosts a demo page with the lightbox.
# It uses react-hot-loader so changes are reflected on save.
npm start

# Lints the code with eslint and my custom rules.
npm run lint

# Lints and builds the code, placing the result in the dist directory.
# This build is necessary to reflect changes if you're 
#  `npm link`-ed to this repository from another local project.
npm run build
```

Pull requests are welcome!

## License

MIT
