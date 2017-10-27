var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { decorate } from 'react-mixin';
import ReactPropTypes from 'prop-types';
import escape from '../escape';
import IntlMixin from '../mixin';

var FormattedHTMLMessage = function (_React$Component) {
    _inherits(FormattedHTMLMessage, _React$Component);

    function FormattedHTMLMessage() {
        _classCallCheck(this, FormattedHTMLMessage);

        return _possibleConstructorReturn(this, (FormattedHTMLMessage.__proto__ || Object.getPrototypeOf(FormattedHTMLMessage)).apply(this, arguments));
    }

    _createClass(FormattedHTMLMessage, [{
        key: 'render',
        value: function render() {
            var props = this.props;
            var tagName = props.tagName;
            var message = props.message;

            var values = Object.keys(props).reduce(function (values, name) {
                var value = props[name];

                if (typeof value === 'string') {
                    value = escape(value);
                } else if (React.isValidElement(value)) {
                    value = ReactDOMServer.renderToStaticMarkup(value);
                }

                values[name] = value;
                return values;
            }, {});

            return React.createElement('tagName', { dangerouslySetInnerHTML: {
                    __html: this.formatMessage(message, values)
                } });
        }
    }]);

    return FormattedHTMLMessage;
}(React.Component);

FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';
FormattedHTMLMessage.propTypes = {
    tagName: ReactPropTypes.string,
    message: ReactPropTypes.string.isRequired
};
FormattedHTMLMessage.defaultProps = {
    tagName: 'span'
};


export default decorate(IntlMixin)(FormattedHTMLMessage);