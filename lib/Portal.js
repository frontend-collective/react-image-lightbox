'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
    displayName: 'exports',

    portalElement: null,

    propTypes: {
        portalId: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            portalId: 'react-image-lightbox-portal'
        };
    },

    componentDidMount: function componentDidMount() {
        var portalElement = this.props.portalId && document.getElementById(this.props.portalId);
        if (!portalElement) {
            portalElement = document.createElement('div');
            portalElement.id = this.props.portalId;
            document.body.appendChild(portalElement);
        }
        this.portalElement = portalElement;

        this.componentDidUpdate();
    },

    componentWillUnmount: function componentWillUnmount() {
        document.body.removeChild(this.portalElement);
    },

    componentDidUpdate: function componentDidUpdate() {
        ReactDOM.render(React.createElement(
            'div',
            this.props,
            this.props.children
        ), this.portalElement);
    },

    render: function render() {
        return null;
    }
});