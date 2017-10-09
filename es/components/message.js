var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { decorate } from 'react-mixin';
import ReactPropTypes from 'prop-types';
import IntlMixin from '../mixin';

var FormattedMessage = function (_React$Component) {
    _inherits(FormattedMessage, _React$Component);

    function FormattedMessage() {
        _classCallCheck(this, FormattedMessage);

        return _possibleConstructorReturn(this, (FormattedMessage.__proto__ || Object.getPrototypeOf(FormattedMessage)).apply(this, arguments));
    }

    _createClass(FormattedMessage, [{
        key: 'render',
        value: function render() {
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
    }]);

    return FormattedMessage;
}(React.Component);

FormattedMessage.displayName = 'FormattedMessage';
FormattedMessage.propTypes = {
    tagName: ReactPropTypes.string,
    message: ReactPropTypes.string.isRequired
};
FormattedMessage.defaultProps = {
    tagName: 'span'
};


export default decorate(IntlMixin)(FormattedMessage);