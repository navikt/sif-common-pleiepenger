import { typedIntlHelper } from '@navikt/sif-common-core/lib/utils/intlUtils';
import { IntlShape } from 'react-intl';

const omsorgstilbudPeriodeFormMessages = {
    nb: {
        omsorgstilbudPeriodeForm_tittel: 'Oppgi periode i omsorgstilbud',
        omsorgstilbudPeriodeForm_submitButtonLabel: 'Ok',
        omsorgstilbudPeriodeForm_cancelButtonLabel: 'Avbryt',
        omsorgstilbudPeriodeForm_fraOgMed_label: 'Fra og med',
        omsorgstilbudPeriodeForm_tilOgMed_label: 'Til og med',
        omsorgstilbudPeriodeForm_tidFasteDager_historisk_label:
            'Legg inn hvor mange timer barnet har vært i et fast og regelmessig omsorgstilbud per dag i uken i perioden',
        omsorgstilbudPeriodeForm_tidFasteDager_planlagt_label:
            'Legg inn hvor mange timer barnet skal være i et fast og regelmessig omsorgstilbud per dag i uken i perioden',
    },
};

const omsorgstilbudPeriodeFormValidationMessages = {
    nb: {
        omsorgstilbudPeriodeForm_validation_fom_dateHasNoValue: 'Du må fylle ut periodens fra-dato.',
        omsorgstilbudPeriodeForm_validation_fom_dateHasInvalidFormat:
            'Du må oppgi periodens fra-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        omsorgstilbudPeriodeForm_validation_fom_fromDateIsAfterToDate:
            'Fra-datoen kan ikke være etter til-datoen. Skriv inn eller velg dato fra kalenderen.',
        omsorgstilbudPeriodeForm_validation_fom_dateIsBeforeMin:
            'Fra-datoen kan ikke være før perioden du har søkt om.',
        omsorgstilbudPeriodeForm_validation_tom_dateIsBeforeMin:
            'Til-datoen kan ikke være før perioden du har søkt om.',
        omsorgstilbudPeriodeForm_validation_fom_dateIsAfterMax:
            'Fra-datoen kan ikke være etter perioden du har søkt for.',
        omsorgstilbudPeriodeForm_validation_fom_dateIsNotWeekday:
            'Fra-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        omsorgstilbudPeriodeForm_validation_tom_dateHasNoValue: 'Du må fylle ut periodens til-dato.',
        omsorgstilbudPeriodeForm_validation_tom_dateHasInvalidFormat:
            'Du må oppgi periodens til-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        omsorgstilbudPeriodeForm_validation_tom_toDateIsBeforeFromDate:
            'Til-datoen kan ikke være før fra-datoen. Skriv inn eller velg dato fra kalenderen.',
        omsorgstilbudPeriodeForm_validation_tom_dateIsAfterMax:
            'Til-datoen kan ikke være etter perioden du har søkt for.',
        omsorgstilbudPeriodeForm_validation_tom_dateIsNotWeekday:
            'Til-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        omsorgstilbudPeriodeForm_validation_fasteDager_gruppe_ingenTidRegistrert:
            'Du må oppgi hvor mange timer barnet {skalEllerHarVært} i omsorgstilbud.',
        omsorgstilbudPeriodeForm_validation_fastdag_tid_timeHasNoValue: 'Du må fylle ut timer og minutter for {dag}.',
        omsorgstilbudPeriodeForm_validation_fastdag_tid_hoursAreInvalid:
            'Antall timer på {dag} er ikke et gyldig tall.',
        omsorgstilbudPeriodeForm_validation_fastdag_tid_minutesAreInvalid:
            'Antall minutter på {dag} er ikke et gyldig tall.',
        omsorgstilbudPeriodeForm_validation_fastdag_tid_tooManyHours:
            'Antall timer på {dag} kan ikke overstige 24 timer.',
        omsorgstilbudPeriodeForm_validation_fastdag_tid_tooManyMinutes:
            'Antall minutter på {dag} kan ikke overstige 59 minutter.',
        omsorgstilbudPeriodeForm_validation_fastdag_tid_durationIsTooLong:
            'Antall timer og minutter registrert {dag} er for høyt. Tiden kan ikke overstige 24 timer hver ukedag.',
        omsorgstilbudPeriodeForm_validation_fastdag_tid_durationIsTooShort:
            'Antall timer og minutter {dato} {hvor} kan ikke være mindre enn 0 timer og 0 minutter.',
    },
};

export const omsorgstibudPeriodeMessages = {
    nb: {
        ...omsorgstilbudPeriodeFormMessages.nb,
        ...omsorgstilbudPeriodeFormValidationMessages.nb,
        omsorgstilbudPeriodeDialog_contentLabel: 'Registrer tid i omsorgstilbud',
        omsorgstilbudPeriode_part_skalVære: 'skal være',
        omsorgstilbudPeriode_part_harVært: 'har vært',
        // 'omsorgstilbudPeriodeForm.validation.fom.dateHasNoValue': 'Du må fylle ut periodens fra-dato.',
        // 'omsorgstilbudPeriodeForm.validation.fom.dateHasInvalidFormat':
        //     'Du må oppgi periodens fra-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        // 'omsorgstilbudPeriodeForm.validation.fom.fromDateIsAfterToDate':
        //     'Fra-datoen kan ikke være etter til-datoen. Skriv inn eller velg dato fra kalenderen.',
        // 'omsorgstilbudPeriodeForm.validation.fom.dateIsBeforeMin':
        //     'Du kan ikke velge en dato som er før perioden du har søkt om.',
        // 'omsorgstilbudPeriodeForm.validation.fom.dateIsNotWeekday':
        //     'Fra-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        // 'omsorgstilbudPeriodeForm.validation.tom.dateHasNoValue': 'Du må fylle ut periodens til-dato.',
        // 'omsorgstilbudPeriodeForm.validation.tom.dateHasInvalidFormat':
        //     'Du må oppgi periodens til-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        // 'omsorgstilbudPeriodeForm.validation.tom.toDateIsBeforeFromDate':
        //     'Til-datoen kan ikke være før fra-datoen. Skriv inn eller velg dato fra kalenderen.',
        // 'omsorgstilbudPeriodeForm.validation.tom.dateIsAfterMax':
        //     'Til-datoen kan ikke være etter perioden du har søkt for.',
        // 'omsorgstilbudPeriodeForm.validation.tom.dateIsNotWeekday':
        //     'Til-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
    },
};

type OmsorgstilbudPeriodeMessagesType = keyof typeof omsorgstibudPeriodeMessages.nb;

export const getOmsorgstilbudPeriodeIntl = (intl: IntlShape) => typedIntlHelper<OmsorgstilbudPeriodeMessagesType>(intl);
