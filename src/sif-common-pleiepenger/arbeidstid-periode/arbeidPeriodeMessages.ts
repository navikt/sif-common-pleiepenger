import { ComponentMessages, Locale } from '../i18n';

interface Messages {
    arbeidstidPeriodeDialogContentLabel: string;
    redusertArbeidstidPerUke: (timerNormalt: string, timerRedusert: string) => string;
    form_tittel: (arbeidsstedNavn: string) => string;
    form_submitButtonLabel: string;
    form_cancelButtonLabel: string;
    form_fraOgMed_label: string;
    form_tilOgMed_label: string;
    form_tidFasteDagerEllerProsent_label: (skalEllerHarJobbet: string) => string;
    form_tidFasteDagerEllerProsent_prosent: string;
    form_tidFasteDagerEllerProsent_timer: string;
    form_prosent_label: (skalEllerHarJobbet: string) => string;
    form_tidFasteDager_label: (skalEllerHarJobbet: string) => string;
}

const arbeidIPeriodeMessages_NB: Messages = {
    arbeidstidPeriodeDialogContentLabel: 'Registrer jobb for en periode',
    redusertArbeidstidPerUke: (timerNormalt, timerRedusert) => `prosent av ${timerNormalt} (${timerRedusert} per dag)`,
    form_tittel: (arbeidsstedNavn) => `Periode med jobb - ${arbeidsstedNavn}`,
    form_submitButtonLabel: 'Ok',
    form_cancelButtonLabel: 'Avbryt',
    form_fraOgMed_label: 'Fra og med',
    form_tilOgMed_label: 'Til og med',
    form_tidFasteDagerEllerProsent_label: (skalEllerHarJobbet) =>
        `Hvordan vil du oppgi hvor mye ${skalEllerHarJobbet}?`,
    form_tidFasteDagerEllerProsent_prosent: 'I prosent',
    form_tidFasteDagerEllerProsent_timer: 'I timer',
    form_prosent_label: (skalEllerHarJobbet) =>
        `Hvor mange prosent av din normale arbeidstid ${skalEllerHarJobbet} du?`,
    form_tidFasteDager_label: (skalEllerHarJobbet) => `Oppgi hvor mye du ${skalEllerHarJobbet}:`,
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
