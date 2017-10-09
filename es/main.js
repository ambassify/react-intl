

import { IntlMixin, FormattedDate, FormattedTime, FormattedRelative, FormattedNumber, FormattedMessage, FormattedHTMLMessage, __addLocaleData } from './react-intl';

export { IntlMixin, FormattedDate, FormattedTime, FormattedRelative, FormattedNumber, FormattedMessage, FormattedHTMLMessage, __addLocaleData } from './react-intl';

export default {
    IntlMixin: IntlMixin,
    FormattedDate: FormattedDate,
    FormattedTime: FormattedTime,
    FormattedRelative: FormattedRelative,
    FormattedNumber: FormattedNumber,
    FormattedMessage: FormattedMessage,
    FormattedHTMLMessage: FormattedHTMLMessage,

    __addLocaleData: __addLocaleData
};

if (typeof window !== 'undefined') {
    window.ReactIntlMixin = IntlMixin;
    IntlMixin.__addLocaleData = __addLocaleData;
}