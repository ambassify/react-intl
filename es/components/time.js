var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { decorate } from 'react-mixin';
import ReactPropTypes from 'prop-types';
import IntlMixin from '../mixin';

var FormattedTime = function (_React$Component) {
    _inherits(FormattedTime, _React$Component);

    function FormattedTime() {
        _classCallCheck(this, FormattedTime);

        return _possibleConstructorReturn(this, (FormattedTime.__proto__ || Object.getPrototypeOf(FormattedTime)).apply(this, arguments));
    }

    _createClass(FormattedTime, [{
        key: 'render',
        value: function render() {
            var props = this.props;
            var value = props.value;
            var format = props.format;
            var defaults = format && this.getNamedFormat('time', format);
            var options = FormattedTime.filterFormatOptions(props, defaults);

            return React.createElement(
                'span',
                null,
                this.formatTime(value, options)
            );
        }
    }]);

    return FormattedTime;
}(React.Component);

FormattedTime.displayName = 'FormattedTime';
FormattedTime.formatOptions = ['localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday', 'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName'];
FormattedTime.propTypes = {
    format: ReactPropTypes.string,
    value: ReactPropTypes.any.isRequired
};


export default decorate(IntlMixin)(FormattedTime);