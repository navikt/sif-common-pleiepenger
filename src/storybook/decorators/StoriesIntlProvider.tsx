import React from 'react';
import { IntlProvider } from 'react-intl';

import '@formatjs/intl-numberformat/polyfill-force';
import '@formatjs/intl-numberformat/locale-data/nb';
import '@formatjs/intl-datetimeformat/polyfill-force';
import '@formatjs/intl-datetimeformat/add-all-tz';
import '@formatjs/intl-datetimeformat/locale-data/nb';

import { MessageFileFormat } from '@navikt/sif-common-core/lib/dev-utils/intl/devIntlUtils';
import { sifCommonPleiepengerMessages } from '../../sif-common-pleiepenger/i18n';
import { arbeidstidPeriodeMessages } from '../../sif-common-pleiepenger/arbeidstid/arbeidstid-periode-dialog/i18n/arbeidstidPeriodeMessages';
import { arbeidstidEnkeltdagMessage } from '../../sif-common-pleiepenger';
import tidEnkeltdagFormMessages from '../../sif-common-pleiepenger/tid/tid-enkeltdag-dialog/tidEnkeltdagMessages';
import { timerOgMinutterMessages } from '../../sif-common-pleiepenger/common/timer-og-minutter/timerOgMinutterMessages';

export interface IntlProviderProps {
    locale: string;
    onError?: (error: any) => void;
}

const allMessages: MessageFileFormat = {
    nb: {
        ...sifCommonPleiepengerMessages.nb,
        ...arbeidstidPeriodeMessages.nb,
        ...arbeidstidEnkeltdagMessage.nb,
        ...tidEnkeltdagFormMessages.nb,
        ...timerOgMinutterMessages.nb,
    },
};

const StoriesIntlProvider: React.FunctionComponent<IntlProviderProps> = ({ locale, onError, children }) => {
    const messages = locale === 'nb' ? allMessages.nb : allMessages.nn;
    return (
        <IntlProvider locale={locale} messages={messages} onError={onError}>
            {children}
        </IntlProvider>
    );
};

export default StoriesIntlProvider;
