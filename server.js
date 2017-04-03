var React = require('react');
var ReactDOMServer = require('react-dom/server');
var LightBox = require('./dist/umd/react-image-lightbox');

console.log(
  ReactDOMServer.renderToString(
    React.createElement(LightBox, {
      mainSrc: '/path/to/foo',
      prevSrc: '/path/to/foo',
      nextSrc: '/path/to/foo',
      onCloseRequest: () => null,
    })
  )
);
