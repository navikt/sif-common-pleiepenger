const tidEnkeltdagFormMessages = {
    nb: {
        'tidEnkeltdagForm.endretFra': 'Endret fra',
        'tidEnkeltdagForm.gjelderFlereDager.label': 'Gjelder flere dager',
        'tidEnkeltdagForm.gjentagelse.helUke': 'Alle hverdager i uke {ukeNavn}.',
        'tidEnkeltdagForm.gjentagelse.delAvUke': 'Hverdager i uke {ukeNavn}.',
        'tidEnkeltdagForm.gjentagelse.helMåned': 'Alle hverdager i {månedNavn}.',
        'tidEnkeltdagForm.gjentagelse.delAvMåned': 'Hverdager i {månedNavn}.',
        'tidEnkeltdagForm.gjentagelse.dagerFremover': 'Hver {dagNavn} fra og med {fra}.',
        'tidEnkeltdagForm.gjentagelse.periode': '({fra} - {til})',
        'tidEnkeltdagForm.stoppGjentagelse.label': 'Velg en annen til og med dato',
        'tidEnkeltdagForm.stopDato.label': 'Velg til og med dato',
        'tidEnkeltdagForm.validation.gjentagelse.noValue':
            'Du må velge hvilke flere dager tiden skal gjelde, eller velge bort valget om at det gjelder flere dager.',
        'tidEnkeltdagForm.validation.stopDato.dateHasNoValue': 'Du må fylle ut til og med dato.',
        'tidEnkeltdagForm.validation.stopDato.dateHasInvalidFormat':
            'Du må oppgi til og med dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        'tidEnkeltdagForm.validation.stopDato.dateIsBeforeMin': 'Du kan ikke sette til og med dato til før fra-datoen.',
        'tidEnkeltdagForm.validation.stopDato.dateIsNotWeekday':
            'Til og med datoen må være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        'tidEnkeltdagForm.validation.stopDato.dateIsAfterMax':
            'Til og med dato kan ikke være etter perioden du søker for.',
        'tidEnkeltdagForm.validation.tid.timeHasNoValue': 'Du må fylle ut timer og minutter.',
        'tidEnkeltdagForm.validation.tid.hoursAreInvalid': 'Antall timer er ikke et gyldig tall.',
        'tidEnkeltdagForm.validation.tid.hoursAreNegative': 'Antall timer kan ikke være et negativt tall.',
        'tidEnkeltdagForm.validation.tid.minutesAreInvalid': 'Antall minutter er ikke et gyldig tall.',
        'tidEnkeltdagForm.validation.tid.minutesAreNegative': 'Antall minutter kan ikke være et negativt tall.',
        'tidEnkeltdagForm.validation.tid.tooManyHours': 'Antall timer kan ikke overstige {maksTimer} timer.',
        'tidEnkeltdagForm.validation.tid.tooManyMinutes': 'Antall minutter kan ikke overstige {maksMinutter} minutter.',
        'tidEnkeltdagForm.validation.tid.durationIsTooLong':
            'Antall timer og minutter registrert er for høyt. Tiden kan ikke overstige {maksTimer} timer.',
        'tidEnkeltdagForm.validation.tid.durationIsTooShort':
            'Antall timer og minutter kan ikke være mindre enn {minTimer} timer og {minMinutter} minutter.',
    },
};

export default tidEnkeltdagFormMessages;
