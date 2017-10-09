
import React from '../react';

import IntlMixin from '../mixin';

var FormattedMessage = React.createClass({
    displayName: 'FormattedMessage',
    mixins: [IntlMixin],

    propTypes: {
        tagName: React.PropTypes.string,
        message: React.PropTypes.string.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return { tagName: 'span' };
    },

    render: function render() {
        var props = this.props;
        var tagName = props.tagName;
        var message = props.message;

        var guid = Math.floor(Math.random() * 0x10000000000).toString(16);
        var tokenRegex = new RegExp('(@__ELEMENT-' + guid + '-\\d+__@)', 'g');
        var elements = {};

        var generateToken = function () {
            var counter = 0;
            return function () {
                return '@__ELEMENT-' + guid + '-' + (counter += 1) + '__@';
            };
        }();

        var values = Object.keys(props).reduce(function (values, name) {
            var value = props[name];
            var token;

            if (React.isValidElement(value)) {
                token = generateToken();
                values[name] = token;
                elements[token] = value;
            } else {
                values[name] = value;
            }

            return values;
        }, {});

        var formattedMessage = this.formatMessage(message, values);

        var children = formattedMessage.split(tokenRegex).filter(function (part) {
            return !!part;
        }).map(function (part) {
            return elements[part] || part;
        });

        var elementArgs = [tagName, null].concat(children);
        return React.createElement.apply(null, elementArgs);
    }
});

export default FormattedMessage;