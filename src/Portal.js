'use strict';

var React    = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
    portalElement: null,

    propTypes: {
        portalId: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            portalId: 'react-image-lightbox-portal',
        };
    },

    componentDidMount: function () {
        var portalElement = this.props.portalId && document.getElementById(this.props.portalId);
        if (!portalElement) {
            portalElement = document.createElement('div');
            portalElement.id = this.props.portalId;
            document.body.appendChild(portalElement);
        }
        this.portalElement = portalElement;

        this.componentDidUpdate();
    },

    componentWillUnmount: function () {
        document.body.removeChild(this.portalElement);
    },

    componentDidUpdate: function () {
        ReactDOM.render((<div {...this.props}>{this.props.children}</div>), this.portalElement);
    },

    render: function() {
        return null;
    },
});
