import React from 'react';
import { IntlProvider } from 'react-intl';
import { arbeidstidEnkeltdagMessage } from '../../../sif-common-pleiepenger';
import { arbeidstidPeriodeMessages } from '../../../sif-common-pleiepenger/arbeidstid-periode/arbeidstidPeriodeMessages';
import { sifCommonPleiepengerMessages } from '../../../sif-common-pleiepenger/i18n';
import tidEnkeltdagFormMessages from '../../../sif-common-pleiepenger/tid-enkeltdag-dialog/tidEnkeltdagMessages';
import { timerOgMinutterMessages } from '../../../sif-common-pleiepenger/timer-og-minutter/timerOgMinutterMessages';
import { MessageFileFormat } from '../../utils/devIntlUtils';
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
