
import React from './react';

import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';
import createFormatCache from 'intl-format-cache';

var typesSpec = {
    locales: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]),

    formats: React.PropTypes.object,
    messages: React.PropTypes.object
};

function assertIsDate(date, errMsg) {
    if (!isFinite(date)) {
        throw new TypeError(errMsg);
    }
}

export default {
    statics: {
        filterFormatOptions: function filterFormatOptions(obj, defaults) {
            if (!defaults) {
                defaults = {};
            }

            return (this.formatOptions || []).reduce(function (opts, name) {
                if (obj.hasOwnProperty(name)) {
                    opts[name] = obj[name];
                } else if (defaults.hasOwnProperty(name)) {
                    opts[name] = defaults[name];
                }

                return opts;
            }, {});
        }
    },

    propTypes: typesSpec,
    contextTypes: typesSpec,
    childContextTypes: typesSpec,

    getNumberFormat: createFormatCache(Intl.NumberFormat),
    getDateTimeFormat: createFormatCache(Intl.DateTimeFormat),
    getMessageFormat: createFormatCache(IntlMessageFormat),
    getRelativeFormat: createFormatCache(IntlRelativeFormat),

    getChildContext: function getChildContext() {
        var context = this.context;
        var props = this.props;

        return {
            locales: props.locales || context.locales,
            formats: props.formats || context.formats,
            messages: props.messages || context.messages
        };
    },

    formatDate: function formatDate(date, options) {
        date = new Date(date);
        assertIsDate(date, 'A date or timestamp must be provided to formatDate()');
        return this._format('date', date, options);
    },

    formatTime: function formatTime(date, options) {
        date = new Date(date);
        assertIsDate(date, 'A date or timestamp must be provided to formatTime()');
        return this._format('time', date, options);
    },

    formatRelative: function formatRelative(date, options, formatOptions) {
        date = new Date(date);
        assertIsDate(date, 'A date or timestamp must be provided to formatRelative()');
        return this._format('relative', date, options, formatOptions);
    },

    formatNumber: function formatNumber(num, options) {
        return this._format('number', num, options);
    },

    formatMessage: function formatMessage(message, values) {
        var locales = this.props.locales || this.context.locales;
        var formats = this.props.formats || this.context.formats;

        if (typeof message === 'function') {
            return message(values);
        }

        if (typeof message === 'string') {
            message = this.getMessageFormat(message, locales, formats);
        }

        return message.format(values);
    },

    getIntlMessage: function getIntlMessage(path) {
        var messages = this.props.messages || this.context.messages;
        var pathParts = path.split('.');

        var message;

        try {
            message = pathParts.reduce(function (obj, pathPart) {
                return obj[pathPart];
            }, messages);
        } finally {
            if (message === undefined) {
                throw new ReferenceError('Could not find Intl message: ' + path);
            }
        }

        return message;
    },

    getNamedFormat: function getNamedFormat(type, name) {
        var formats = this.props.formats || this.context.formats;
        var format = null;

        try {
            format = formats[type][name];
        } finally {
            if (!format) {
                throw new ReferenceError('No ' + type + ' format named: ' + name);
            }
        }

        return format;
    },

    _format: function _format(type, value, options, formatOptions) {
        var locales = this.props.locales || this.context.locales;

        if (options && typeof options === 'string') {
            options = this.getNamedFormat(type, options);
        }

        switch (type) {
            case 'date':
            case 'time':
                return this.getDateTimeFormat(locales, options).format(value);
            case 'number':
                return this.getNumberFormat(locales, options).format(value);
            case 'relative':
                return this.getRelativeFormat(locales, options).format(value, formatOptions);
            default:
                throw new Error('Unrecognized format type: ' + type);
        }
    }
};