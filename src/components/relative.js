import React from 'react';
import { decorate } from 'react-mixin';
import ReactPropTypes from 'prop-types';
import IntlMixin from '../mixin';

class FormattedRelative extends React.Component {

    static displayName = 'FormattedRelative'

    static formatOptions: [
        'style', 'units'
    ]

    static propTypes = {
        format: ReactPropTypes.string,
        value : ReactPropTypes.any.isRequired,
        now   : ReactPropTypes.any
    }

    render() {
        var props    = this.props;
        var value    = props.value;
        var format   = props.format;
        var defaults = format && this.getNamedFormat('relative', format);
        var options  = FormattedRelative.filterFormatOptions(props, defaults);

        var formattedRelativeTime = this.formatRelative(value, options, {
            now: props.now
        });

        return (<span>{formattedRelativeTime}</span>);
    }
}

export default decorate(IntlMixin)(FormattedRelative);
