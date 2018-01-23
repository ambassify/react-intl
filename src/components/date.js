import React from 'react';
import { decorate } from 'react-mixin';
import ReactPropTypes from 'prop-types';
import IntlMixin from '../mixin';

class FormattedDate extends React.Component {

    static displayName = 'FormattedDate';

    static formatOptions = [
        'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
        'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
        'timeZoneName'
    ];

    static propTypes = {
        format: ReactPropTypes.string,
        value : ReactPropTypes.any.isRequired
    }

    render() {
        var props    = this.props;
        var value    = props.value;
        var format   = props.format;
        var defaults = format && this.getNamedFormat('date', format);
        var options  = FormattedDate.filterFormatOptions(props, defaults);

        return (<span>{this.formatData(value, options)}</span>);
    }
}

export default decorate(IntlMixin)(FormattedDate);
