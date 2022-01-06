import { IntlShape } from 'react-intl';
import { getNumberFromNumberInputValue, InputTime } from '@navikt/sif-common-formik/lib';
import { decimalDurationToDuration, Duration, durationToISODuration, ISODuration } from '@navikt/sif-common-utils/lib';
import { formatTimerOgMinutter } from '../timer-og-minutter/TimerOgMinutter';
import { getArbeidIPeriodeMessages } from './arbeidPeriodeMessages';

const getRedusertArbeidstidPerUke = (
    jobberNormaltTimer: string | number | undefined,
    skalJobbeProsent: string | undefined
): { normalTimer: number; varighet: Duration } | undefined => {
    const normalTimer =
        typeof jobberNormaltTimer === 'number' ? jobberNormaltTimer : getNumberFromNumberInputValue(jobberNormaltTimer);
    const prosent = getNumberFromNumberInputValue(skalJobbeProsent);
    if (normalTimer !== undefined && prosent !== undefined) {
        const varighet = getRedusertArbeidstidSomDuration(normalTimer / 5, prosent);
        if (varighet) {
            return {
                normalTimer,
                varighet,
            };
        }
    }
    return undefined;
};

export const getRedusertArbeidstidPerUkeInfo = (
    intl: IntlShape,
    jobberNormaltTimerPerUke: string | number | undefined,
    skalJobbeProsent: string | undefined
): string => {
    const txt = getArbeidIPeriodeMessages(intl.locale);
    const redusertArbeidstid = getRedusertArbeidstidPerUke(jobberNormaltTimerPerUke, skalJobbeProsent);
    if (redusertArbeidstid) {
        const timerNormalt = formatTimerOgMinutter(intl, decimalDurationToDuration(redusertArbeidstid.normalTimer));
        const timerRedusert = formatTimerOgMinutter(intl, {
            hours: `${redusertArbeidstid.varighet.hours}` || '',
            minutes: `${redusertArbeidstid.varighet.minutes}`,
        });
        return txt.redusertArbeidstidPerUke(timerNormalt, timerRedusert);
    }
    return '';
};

export const getRedusertArbeidstidSomISODuration = (
    jobberNormaltTimerPerDagNumber: number,
    skalJobbeProsent: number
): ISODuration => {
    return durationToISODuration(getRedusertArbeidstidSomDuration(jobberNormaltTimerPerDagNumber, skalJobbeProsent));
};

export const getRedusertArbeidstidSomDuration = (
    jobberNormaltTimerPerDagNumber: number,
    skalJobbeProsent: number
): InputTime => {
    const redusertTidPerDag = (jobberNormaltTimerPerDagNumber / 100) * skalJobbeProsent;
    return decimalDurationToDuration(redusertTidPerDag);
};
