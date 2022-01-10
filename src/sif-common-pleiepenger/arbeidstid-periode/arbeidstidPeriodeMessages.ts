import { typedIntlHelper } from '@navikt/sif-common-core/lib/utils/intlUtils';
import { IntlShape } from 'react-intl';

const arbeidstidPeriodeFormFormMessages = {
    nb: {
        'arbeidstidPeriodeForm.tittel': `Periode med jobb - {arbeidsstedNavn}`,
        'arbeidstidPeriodeForm.submitButtonLabel': 'Ok',
        'arbeidstidPeriodeForm.cancelButtonLabel': 'Avbryt',
        'arbeidstidPeriodeForm.fraOgMed.label': 'Fra og med',
        'arbeidstidPeriodeForm.tilOgMed.label': 'Til og med',
        'arbeidstidPeriodeForm.tidFasteDagerEllerProsent.label': `Hvordan vil du oppgi hvor mye {skalEllerHarJobbet}?`,
        'arbeidstidPeriodeForm.tidFasteDagerEllerProsent.prosent': 'I prosent',
        'arbeidstidPeriodeForm.tidFasteDagerEllerProsent.timer': 'I timer',
        'arbeidstidPeriodeForm.prosent.label': `Hvor mange prosent av din normale arbeidstid {skalEllerHarJobbet} du?`,
        'arbeidstidPeriodeForm.tidFasteDager.label': `Oppgi hvor mye du {skalEllerHarJobbet}:`,
        'arbeidstidPeriodeForm.validation.fom.dateHasNoValue': 'Du må fylle ut periodens fra-dato.',
        'arbeidstidPeriodeForm.validation.fom.dateHasInvalidFormat':
            'Du må oppgi periodens fra-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        'arbeidstidPeriodeForm.validation.fom.fromDateIsAfterToDate':
            'Fra-datoen kan ikke være etter til-datoen. Skriv inn eller velg dato fra kalenderen.',
        'arbeidstidPeriodeForm.validation.fom.dateIsBeforeMin': 'Fra-datoen kan ikke være før perioden du har søkt om.',
        'arbeidstidPeriodeForm.validation.tom.dateIsBeforeMin': 'Til-datoen kan ikke være før perioden du har søkt om.',
        'arbeidstidPeriodeForm.validation.fom.dateIsAfterMax':
            'Fra-datoen kan ikke være etter perioden du har søkt for.',
        'arbeidstidPeriodeForm.validation.fom.dateIsNotWeekday':
            'Fra-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        'arbeidstidPeriodeForm.validation.tom.dateHasNoValue': 'Du må fylle ut periodens til-dato.',
        'arbeidstidPeriodeForm.validation.tom.dateHasInvalidFormat':
            'Du må oppgi periodens til-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        'arbeidstidPeriodeForm.validation.tom.toDateIsBeforeFromDate':
            'Til-datoen kan ikke være før fra-datoen. Skriv inn eller velg dato fra kalenderen.',
        'arbeidstidPeriodeForm.validation.tom.dateIsAfterMax':
            'Til-datoen kan ikke være etter perioden du har søkt for.',
        'arbeidstidPeriodeForm.validation.tom.dateIsNotWeekday':
            'Til-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        'arbeidstidPeriodeForm.validation.tidFasteDagerEllerProsent.noValue':
            'Du må velge hvordan du ønsker å oppgi hvor mye du {skalEllerHarJobbet}',
        'arbeidstidPeriodeForm.validation.prosent.måSvareNeiPåJobbIPerioden':
            'Du må velge hvordan du ønsker å oppgi hvor mye du {skalEllerHarJobbet}',
        'arbeidstidPeriodeForm.validation.prosent.numberHasNoValue':
            'Du må oppgi hvor mange prosent du {skalEllerHarJobbet} {hvor}.',
        'arbeidstidPeriodeForm.validation.prosent.numberHasInvalidFormat':
            'Antall prosent du {skalEllerHarJobbet} {hvor} kan kun bestå av tall.',
        'arbeidstidPeriodeForm.validation.prosent.numberIsTooSmall':
            'Antall prosent du {skalEllerHarJobbet} {hvor} kan ikke være mindre enn {min}.',
        'arbeidstidPeriodeForm.validation.prosent.numberIsTooLarge':
            'Antall prosent du {skalEllerHarJobbet} {hvor} kan ikke være mer enn {max}.',
        'arbeidstidPeriodeForm.validation.fasteDager.gruppe.ingenTidRegistrert':
            'Du må oppgi hvor mange timer du {skalEllerHarJobbet} i uken {hvor} {iPerioden}.',

        'arbeidstidPeriodeForm.validation.fastdag.tid.timeHasNoValue': 'Du må fylle ut timer og minutter for {dag}.',
        'arbeidstidPeriodeForm.validation.fastdag.tid.hoursAreInvalid': 'Antall timer på {dag} er ikke et gyldig tall.',
        'arbeidstidPeriodeForm.validation.fastdag.tid.minutesAreInvalid':
            'Antall minutter på {dag} er ikke et gyldig tall.',
        'arbeidstidPeriodeForm.validation.fastdag.tid.tooManyHours':
            'Antall timer på {dag} kan ikke overstige 24 timer.',
        'arbeidstidPeriodeForm.validation.fastdag.tid.tooManyMinutes':
            'Antall minutter på {dag} kan ikke overstige 59 minutter.',
        'arbeidstidPeriodeForm.validation.fastdag.tid.durationIsTooLong':
            'Antall timer og minutter registrert {dag} er for høyt. Tiden kan ikke overstige 24 timer hver ukedag.',
        'arbeidstidPeriodeForm.validation.fastdag.tid.durationIsTooShort':
            'Antall timer og minutter {dato} {hvor} kan ikke være mindre enn 0 timer og 0 minutter.',
    },
};

const arbeidIPeriodeIntlValuesMessages = {
    nb: {
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.harJobbet': 'har jobbet',
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.skalJobbe': 'skal jobbe',
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.somAnsatt': `hos {arbeidsstedNavn}`,
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.somFrilanser': 'som frilanser',
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.somSN': 'som selvstendig næringsdrivende',
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.iPerioden': `i perioden {fra} til {til}`,
    },
};

export const arbeidstidPeriodeMessages = {
    nb: {
        ...arbeidstidPeriodeFormFormMessages.nb,
        ...arbeidIPeriodeIntlValuesMessages.nb,
        'arbeidstidPeriode.redusertArbeidstidPerUke': 'prosent av {timerNormalt} ({timerRedusert} per dag)',
        'arbeidstidPeriodeDialog.contentLabel': 'Registrer jobb for en periode',
        'arbeidstidPeriode.timer': '{timer, plural, one {# time} other {# timer}}',
        'arbeidstidPeriode.timer.ikkeTall': `{timer} timer`,
    },
};

type ArbeidstidPeriodeMessagesType = keyof typeof arbeidstidPeriodeMessages.nb;

export const getArbeidstidPeriodeIntl = (intl: IntlShape) => typedIntlHelper<ArbeidstidPeriodeMessagesType>(intl);

// export const getTypedIntlHelper =
//     <T extends string>() =>
//     ('intl': IntlShape, 'id': T, 'values?': Record<string, string>) => {
//         return intl.formatMessage({ id }, values);
//     };

// export const useArbeidPeriodeTexts = () => {
//     const intl = useIntl();
//     return typedIntlHelper<ArbeidstidPeriodeMessagesType>(intl);
// };

// export const arbeidPeriodeTexts = getTypedIntlHelper<ArbeidstidPeriodeMessagesType>();
