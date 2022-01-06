import { ComponentMessages, Locale } from '../i18n';
import { pluralize } from '../utils';

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
    arbeidIPeriodeIntlValues_skalJobbe: string;
    arbeidIPeriodeIntlValues_harJobbet: string;
    arbeidIPeriodeIntlValues_somAnsatt: (arbeidstedNavn: string) => string;
    arbeidIPeriodeIntlValues_somFrilanser: string;
    arbeidIPeriodeIntlValues_somSN: string;
    arbeidIPeriodeIntlValues_iPerioden: (fra: string, til: string) => string;
    timer: (timer: number) => string;
    timer_ikkeTall: (timer: any) => string;
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
    arbeidIPeriodeIntlValues_harJobbet: 'har jobbet',
    arbeidIPeriodeIntlValues_skalJobbe: 'skal jobbe',
    arbeidIPeriodeIntlValues_somAnsatt: (arbeidstedNavn) => `hos ${arbeidstedNavn}`,
    arbeidIPeriodeIntlValues_somFrilanser: 'som frilanser',
    arbeidIPeriodeIntlValues_somSN: 'som selvstendig næringsdrivende',
    arbeidIPeriodeIntlValues_iPerioden: (fra: string, til: string) => `i perioden ${fra} til ${til}`,
    timer: (timer) => `${timer} ${pluralize(timer, 'time', 'timer')}`,
    timer_ikkeTall: (timer) => `${timer} timer`,
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
