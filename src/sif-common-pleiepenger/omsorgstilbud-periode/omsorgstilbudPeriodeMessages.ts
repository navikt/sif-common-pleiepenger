import { typedIntlHelper } from '@navikt/sif-common-core/lib/utils/intlUtils';
import { IntlShape } from 'react-intl';

const omsorgstilbudPeriodeFormMessages = {
    nb: {
        'omsorgstilbudPeriodeForm.tittel': 'Oppgi periode i omsorgstilbud',
        'omsorgstilbudPeriodeForm.submitButtonLabel': 'Ok',
        'omsorgstilbudPeriodeForm.cancelButtonLabel': 'Avbryt',
        'omsorgstilbudPeriodeForm.fraOgMed.label': 'Fra og med',
        'omsorgstilbudPeriodeForm.tilOgMed.label': 'Til og med',
        'omsorgstilbudPeriodeForm.tidFasteDager.historisk.label':
            'Legg inn hvor mange timer barnet har vært i et fast og regelmessig omsorgstilbud per dag i uken i perioden',
        'omsorgstilbudPeriodeForm.tidFasteDager.planlagt.label':
            'Legg inn hvor mange timer barnet skal være i et fast og regelmessig omsorgstilbud per dag i uken i perioden',
    },
};

const omsorgstilbudPeriodeFormValidationMessages = {
    nb: {
        'omsorgstilbudPeriodeForm.validation.fom.dateHasNoValue': 'Du må fylle ut periodens fra-dato.',
        'omsorgstilbudPeriodeForm.validation.fom.dateHasInvalidFormat':
            'Du må oppgi periodens fra-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        'omsorgstilbudPeriodeForm.validation.fom.fromDateIsAfterToDate':
            'Fra-datoen kan ikke være etter til-datoen. Skriv inn eller velg dato fra kalenderen.',
        'omsorgstilbudPeriodeForm.validation.fom.dateIsBeforeMin':
            'Fra-datoen kan ikke være før perioden du har søkt om.',
        'omsorgstilbudPeriodeForm.validation.tom.dateIsBeforeMin':
            'Til-datoen kan ikke være før perioden du har søkt om.',
        'omsorgstilbudPeriodeForm.validation.fom.dateIsAfterMax':
            'Fra-datoen kan ikke være etter perioden du har søkt for.',
        'omsorgstilbudPeriodeForm.validation.fom.dateIsNotWeekday':
            'Fra-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        'omsorgstilbudPeriodeForm.validation.tom.dateHasNoValue': 'Du må fylle ut periodens til-dato.',
        'omsorgstilbudPeriodeForm.validation.tom.dateHasInvalidFormat':
            'Du må oppgi periodens til-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        'omsorgstilbudPeriodeForm.validation.tom.toDateIsBeforeFromDate':
            'Til-datoen kan ikke være før fra-datoen. Skriv inn eller velg dato fra kalenderen.',
        'omsorgstilbudPeriodeForm.validation.tom.dateIsAfterMax':
            'Til-datoen kan ikke være etter perioden du har søkt for.',
        'omsorgstilbudPeriodeForm.validation.tom.dateIsNotWeekday':
            'Til-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        'omsorgstilbudPeriodeForm.validation.fasteDager.gruppe.ingenTidRegistrert':
            'Du må oppgi hvor mange timer barnet {skalEllerHarVært} i omsorgstilbud.',
        'omsorgstilbudPeriodeForm.validation.fastdag.tid.timeHasNoValue': 'Du må fylle ut timer og minutter for {dag}.',
        'omsorgstilbudPeriodeForm.validation.fastdag.tid.hoursAreInvalid':
            'Antall timer på {dag} er ikke et gyldig tall.',
        'omsorgstilbudPeriodeForm.validation.fastdag.tid.minutesAreInvalid':
            'Antall minutter på {dag} er ikke et gyldig tall.',
        'omsorgstilbudPeriodeForm.validation.fastdag.tid.tooManyHours':
            'Antall timer på {dag} kan ikke overstige 24 timer.',
        'omsorgstilbudPeriodeForm.validation.fastdag.tid.tooManyMinutes':
            'Antall minutter på {dag} kan ikke overstige 59 minutter.',
        'omsorgstilbudPeriodeForm.validation.fastdag.tid.durationIsTooLong':
            'Antall timer og minutter registrert {dag} er for høyt. Tiden kan ikke overstige 24 timer hver ukedag.',
        'omsorgstilbudPeriodeForm.validation.fastdag.tid.durationIsTooShort':
            'Antall timer og minutter {dato} {hvor} kan ikke være mindre enn 0 timer og 0 minutter.',
    },
};

export const omsorgstibudPeriodeMessages = {
    nb: {
        ...omsorgstilbudPeriodeFormMessages.nb,
        ...omsorgstilbudPeriodeFormValidationMessages.nb,
        'omsorgstilbudPeriodeDialog.contentLabel': 'Registrer tid i omsorgstilbud',
        'omsorgstilbudPeriode.part.skalVære': 'skal være',
        'omsorgstilbudPeriode.part.harVært': 'har vært',
        // 'omsorgstilbudPeriodeForm.validation.fom.dateHasNoValue'': 'Du må fylle ut periodens fra-dato.',
        // 'omsorgstilbudPeriodeForm.validation.fom.dateHasInvalidFormat'':
        //     'Du må oppgi periodens fra-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        // 'omsorgstilbudPeriodeForm.validation.fom.fromDateIsAfterToDate'':
        //     'Fra-datoen kan ikke være etter til-datoen. Skriv inn eller velg dato fra kalenderen.',
        // 'omsorgstilbudPeriodeForm.validation.fom.dateIsBeforeMin'':
        //     'Du kan ikke velge en dato som er før perioden du har søkt om.',
        // 'omsorgstilbudPeriodeForm.validation.fom.dateIsNotWeekday'':
        //     'Fra-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        // 'omsorgstilbudPeriodeForm.validation.tom.dateHasNoValue'': 'Du må fylle ut periodens til-dato.',
        // 'omsorgstilbudPeriodeForm.validation.tom.dateHasInvalidFormat'':
        //     'Du må oppgi periodens til-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        // 'omsorgstilbudPeriodeForm.validation.tom.toDateIsBeforeFromDate'':
        //     'Til-datoen kan ikke være før fra-datoen. Skriv inn eller velg dato fra kalenderen.',
        // 'omsorgstilbudPeriodeForm.validation.tom.dateIsAfterMax'':
        //     'Til-datoen kan ikke være etter perioden du har søkt for.',
        // 'omsorgstilbudPeriodeForm.validation.tom.dateIsNotWeekday'':
        //     'Til-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
    },
};

type OmsorgstilbudPeriodeMessagesType = keyof typeof omsorgstibudPeriodeMessages.nb;

export const getOmsorgstilbudPeriodeIntl = (intl: IntlShape) => typedIntlHelper<OmsorgstilbudPeriodeMessagesType>(intl);
