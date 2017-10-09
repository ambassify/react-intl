import React from 'react';
import { decorate } from 'react-mixin';
import ReactPropTypes from 'prop-types';
import IntlMixin from '../mixin';

class FormattedNumber extends React.Component {

    static displayName = 'FormattedNumber'

    static formatOptions = [
        'localeMatcher', 'style', 'currency', 'currencyDisplay',
        'useGrouping', 'minimumIntegerDigits', 'minimumFractionDigits',
        'maximumFractionDigits', 'minimumSignificantDigits',
        'maximumSignificantDigits'
    ]

    static propTypes = {
        format: ReactPropTypes.string,
        value : ReactPropTypes.any.isRequired
    }

    render() {
        var props    = this.props;
        var value    = props.value;
        var format   = props.format;
        var defaults = format && this.getNamedFormat('number', format);
        var options  = FormattedNumber.filterFormatOptions(props, defaults);

        return (<span>{this.formatNumber(value, options)}</span>);
    }
}

export default decorate(IntlMixin)(FormattedNumber);
