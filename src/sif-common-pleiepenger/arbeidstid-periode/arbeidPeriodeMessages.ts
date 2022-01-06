import { ComponentMessages, Locale } from '../i18n';

enum Keys {
    'arbeidstidPeriodeDialogContentLabel' = 'arbeidstidPeriodeDialogContentLabel',
    'redusertArbeidstidPerUke' = 'redusertArbeidstidPerUke',
    'arbeidstidPeriodeForm_tittel' = 'arbeidstidPeriodeForm_tittel',
}

interface Messages {
    [Keys.arbeidstidPeriodeDialogContentLabel]: string;
    [Keys.redusertArbeidstidPerUke]: (timerNormalt: string, timerRedusert: string) => string;
    [Keys.arbeidstidPeriodeForm_tittel]: (arbeidsstedNavn: string) => string;
}

const arbeidIPeriodeMessages_NB: Messages = {
    [Keys.arbeidstidPeriodeDialogContentLabel]: 'Registrer jobb for en periode',
    [Keys.arbeidstidPeriodeForm_tittel]: (arbeidsstedNavn) => `Periode med jobb - ${arbeidsstedNavn}`,
    [Keys.redusertArbeidstidPerUke]: (timerNormalt, timerRedusert) =>
        `prosent av ${timerNormalt} (${timerRedusert} per dag)`,
};

export const arbeidIPeriodeMessages: ComponentMessages<Messages> = {
    [Locale.nb]: arbeidIPeriodeMessages_NB,
};

export const getArbeidIPeriodeMessages = (locale: string): Messages => {
    switch (locale) {
        case 'nn':
            return arbeidIPeriodeMessages.nn;
        default:
            return arbeidIPeriodeMessages.nb;
    }
};
