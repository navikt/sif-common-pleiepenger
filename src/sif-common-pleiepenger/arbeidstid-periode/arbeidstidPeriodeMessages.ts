import { typedIntlHelper } from '@navikt/sif-common-core/lib/utils/intlUtils';
import { IntlShape } from 'react-intl';

const arbeidstidPeriodeFormFormMessages = {
    nb: {
        arbeidstidPeriodeForm_tittel: `Periode med jobb - {arbeidsstedNavn}`,
        arbeidstidPeriodeForm_submitButtonLabel: 'Ok',
        arbeidstidPeriodeForm_cancelButtonLabel: 'Avbryt',
        arbeidstidPeriodeForm_fraOgMed_label: 'Fra og med',
        arbeidstidPeriodeForm_tilOgMed_label: 'Til og med',
        arbeidstidPeriodeForm_tidFasteDagerEllerProsent_label: `Hvordan vil du oppgi hvor mye {skalEllerHarJobbet}?`,
        arbeidstidPeriodeForm_tidFasteDagerEllerProsent_prosent: 'I prosent',
        arbeidstidPeriodeForm_tidFasteDagerEllerProsent_timer: 'I timer',
        arbeidstidPeriodeForm_prosent_label: `Hvor mange prosent av din normale arbeidstid {skalEllerHarJobbet} du?`,
        arbeidstidPeriodeForm_tidFasteDager_label: `Oppgi hvor mye du {skalEllerHarJobbet}:`,
        arbeidstidPeriodeForm_validation_fom_dateHasNoValue: 'Du må fylle ut periodens fra-dato.',
        arbeidstidPeriodeForm_validation_fom_dateHasInvalidFormat:
            'Du må oppgi periodens fra-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        arbeidstidPeriodeForm_validation_fom_fromDateIsAfterToDate:
            'Fra-datoen kan ikke være etter til-datoen. Skriv inn eller velg dato fra kalenderen.',
        arbeidstidPeriodeForm_validation_fom_dateIsBeforeMin: 'Fra-datoen kan ikke være før perioden du har søkt om.',
        arbeidstidPeriodeForm_validation_tom_dateIsBeforeMin: 'Til-datoen kan ikke være før perioden du har søkt om.',
        arbeidstidPeriodeForm_validation_fom_dateIsAfterMax: 'Fra-datoen kan ikke være etter perioden du har søkt for.',
        arbeidstidPeriodeForm_validation_fom_dateIsNotWeekday:
            'Fra-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        arbeidstidPeriodeForm_validation_tom_dateHasNoValue: 'Du må fylle ut periodens til-dato.',
        arbeidstidPeriodeForm_validation_tom_dateHasInvalidFormat:
            'Du må oppgi periodens til-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        arbeidstidPeriodeForm_validation_tom_toDateIsBeforeFromDate:
            'Til-datoen kan ikke være før fra-datoen. Skriv inn eller velg dato fra kalenderen.',
        arbeidstidPeriodeForm_validation_tom_dateIsAfterMax: 'Til-datoen kan ikke være etter perioden du har søkt for.',
        arbeidstidPeriodeForm_validation_tom_dateIsNotWeekday:
            'Til-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        arbeidstidPeriodeForm_validation_tidFasteDagerEllerProsent_noValue:
            'Du må velge hvordan du ønsker å oppgi hvor mye du {skalEllerHarJobbet}',
        arbeidstidPeriodeForm_validation_prosent_måSvareNeiPåJobbIPerioden:
            'Du må velge hvordan du ønsker å oppgi hvor mye du {skalEllerHarJobbet}',
        arbeidstidPeriodeForm_validation_prosent_numberHasNoValue:
            'Du må oppgi hvor mange prosent du {skalEllerHarJobbet} {hvor}.',
        arbeidstidPeriodeForm_validation_prosent_numberHasInvalidFormat:
            'Antall prosent du {skalEllerHarJobbet} {hvor} kan kun bestå av tall.',
        arbeidstidPeriodeForm_validation_prosent_numberIsTooSmall:
            'Antall prosent du {skalEllerHarJobbet} {hvor} kan ikke være mindre enn {min}.',
        arbeidstidPeriodeForm_validation_prosent_numberIsTooLarge:
            'Antall prosent du {skalEllerHarJobbet} {hvor} kan ikke være mer enn {max}.',
        arbeidstidPeriodeForm_validation_fasteDager_gruppe_ingenTidRegistrert:
            'Du må oppgi hvor mange timer du {skalEllerHarJobbet} i uken {hvor} {iPerioden}.',

        arbeidstidPeriodeForm_validation_fastdag_tid_timeHasNoValue: 'Du må fylle ut timer og minutter for {dag}.',
        arbeidstidPeriodeForm_validation_fastdag_tid_hoursAreInvalid: 'Antall timer på {dag} er ikke et gyldig tall.',
        arbeidstidPeriodeForm_validation_fastdag_tid_minutesAreInvalid:
            'Antall minutter på {dag} er ikke et gyldig tall.',
        arbeidstidPeriodeForm_validation_fastdag_tid_tooManyHours: 'Antall timer på {dag} kan ikke overstige 24 timer.',
        arbeidstidPeriodeForm_validation_fastdag_tid_tooManyMinutes:
            'Antall minutter på {dag} kan ikke overstige 59 minutter.',
        arbeidstidPeriodeForm_validation_fastdag_tid_durationIsTooLong:
            'Antall timer og minutter registrert {dag} er for høyt. Tiden kan ikke overstige 24 timer hver ukedag.',
        arbeidstidPeriodeForm_validation_fastdag_tid_durationIsTooShort:
            'Antall timer og minutter {dato} {hvor} kan ikke være mindre enn 0 timer og 0 minutter.',
    },
};

const arbeidIPeriodeIntlValuesMessages = {
    nb: {
        arbeidstidPeriode_arbeidIPeriodeIntlValues_harJobbet: 'har jobbet',
        arbeidstidPeriode_arbeidIPeriodeIntlValues_skalJobbe: 'skal jobbe',
        arbeidstidPeriode_arbeidIPeriodeIntlValues_somAnsatt: `hos {arbeidsstedNavn}`,
        arbeidstidPeriode_arbeidIPeriodeIntlValues_somFrilanser: 'som frilanser',
        arbeidstidPeriode_arbeidIPeriodeIntlValues_somSN: 'som selvstendig næringsdrivende',
        arbeidstidPeriode_arbeidIPeriodeIntlValues_iPerioden: `i perioden {fra} til {til}`,
    },
};

export const arbeidstidPeriodeMessages = {
    nb: {
        ...arbeidstidPeriodeFormFormMessages.nb,
        ...arbeidIPeriodeIntlValuesMessages.nb,
        ['arbeidstidPeriode_redusertArbeidstidPerUke']: 'prosent av {timerNormalt} ({timerRedusert} per dag)',
        arbeidstidPeriodeDialogContentLabel: 'Registrer jobb for en periode',
        arbeidstidPeriode_timer: '{timer, plural, one {# time} other {# timer}}',
        arbeidstidPeriode_timer_ikkeTall: `{timer} timer`,
    },
};

type ArbeidstidPeriodeMessagesType = keyof typeof arbeidstidPeriodeMessages.nb;

export const getArbeidstidPeriodeIntl = (intl: IntlShape) => typedIntlHelper<ArbeidstidPeriodeMessagesType>(intl);

// export const getTypedIntlHelper =
//     <T extends string>() =>
//     (intl: IntlShape, id: T, values?: Record<string, string>) => {
//         return intl.formatMessage({ id }, values);
//     };

// export const useArbeidPeriodeTexts = () => {
//     const intl = useIntl();
//     return typedIntlHelper<ArbeidstidPeriodeMessagesType>(intl);
// };

// export const arbeidPeriodeTexts = getTypedIntlHelper<ArbeidstidPeriodeMessagesType>();
