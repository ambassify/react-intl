
import React from '../react';

import escape from '../escape';
import IntlMixin from '../mixin';

var FormattedHTMLMessage = React.createClass({
    displayName: 'FormattedHTMLMessage',
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

        var values = Object.keys(props).reduce(function (values, name) {
            var value = props[name];

            if (typeof value === 'string') {
                value = escape(value);
            } else if (React.isValidElement(value)) {
                value = React.renderToStaticMarkup(value);
            }

            values[name] = value;
            return values;
        }, {});

        return React.createElement('tagName', { dangerouslySetInnerHTML: {
                __html: this.formatMessage(message, values)
            } });
    }
});

export default FormattedHTMLMessage;