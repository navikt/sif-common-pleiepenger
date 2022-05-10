import React from 'react';
import { IntlProvider } from 'react-intl';
import { MessageFileFormat } from '@navikt/sif-common-core/lib/dev-utils/intl/devIntlUtils';
import { arbeidstidEnkeltdagMessage } from '../../../sif-common-pleiepenger';
import { arbeidstidPeriodeMessages } from '../../../sif-common-pleiepenger/arbeidstid/arbeidstid-periode-dialog/i18n/arbeidstidPeriodeMessages';
import { sifCommonPleiepengerMessages } from '../../../sif-common-pleiepenger/i18n';
import tidEnkeltdagFormMessages from '../../../sif-common-pleiepenger/tid/tid-enkeltdag-dialog/tidEnkeltdagMessages';
import { timerOgMinutterMessages } from '../../../sif-common-pleiepenger/common/timer-og-minutter/timerOgMinutterMessages';
import { appMessages } from './messages';

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
        ...appMessages.nb,
    },
};

const AppIntlProvider: React.FunctionComponent<IntlProviderProps> = ({ locale, onError, children }) => {
    const messages = locale === 'nb' ? allMessages.nb : allMessages.nn;
    return (
        <IntlProvider locale={locale} messages={messages} onError={onError}>
            {children}
        </IntlProvider>
    );
};

export default AppIntlProvider;
