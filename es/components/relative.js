
import React from '../react';

import IntlMixin from '../mixin';

var FormattedRelative = React.createClass({
    displayName: 'FormattedRelative',
    mixins: [IntlMixin],

    statics: {
        formatOptions: ['style', 'units']
    },

    propTypes: {
        format: React.PropTypes.string,
        value: React.PropTypes.any.isRequired,
        now: React.PropTypes.any
    },

    render: function render() {
        var props = this.props;
        var value = props.value;
        var format = props.format;
        var defaults = format && this.getNamedFormat('relative', format);
        var options = FormattedRelative.filterFormatOptions(props, defaults);

        var formattedRelativeTime = this.formatRelative(value, options, {
            now: props.now
        });

        return React.createElement(
            'span',
            null,
            formattedRelativeTime
        );
    }
});

export default FormattedRelative;