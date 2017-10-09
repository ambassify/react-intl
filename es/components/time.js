
import React from '../react';

import IntlMixin from '../mixin';

var FormattedTime = React.createClass({
    displayName: 'FormattedTime',
    mixins: [IntlMixin],

    statics: {
        formatOptions: ['localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday', 'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName']
    },

    propTypes: {
        format: React.PropTypes.string,
        value: React.PropTypes.any.isRequired
    },

    render: function render() {
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
});

export default FormattedTime;