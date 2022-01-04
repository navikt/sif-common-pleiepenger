import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { getNumberFromNumberInputValue, InputTime } from '@navikt/sif-common-formik/lib';
import {
    decimalDurationToDuration,
    durationToISODuration,
    ISODuration,
    ISODurationToDuration,
} from '@navikt/sif-common-utils/lib';
import { IntlShape } from 'react-intl';
import { formatTimerOgMinutter } from '../timer-og-minutter/TimerOgMinutter';

export const getRedusertArbeidstidPerUkeInfo = (
    intl: IntlShape,
    jobberNormaltTimer: string | number | undefined,
    skalJobbeProsent: string | undefined
): string => {
    const normalTimer =
        typeof jobberNormaltTimer === 'number' ? jobberNormaltTimer : getNumberFromNumberInputValue(jobberNormaltTimer);
    const prosent = getNumberFromNumberInputValue(skalJobbeProsent);
    if (normalTimer !== undefined && prosent !== undefined) {
        const varighet = ISODurationToDuration(getRedusertArbeidstidSomISODuration(normalTimer / 5, prosent));
        if (varighet) {
            return intlHelper(intl, 'arbeidIPeriode.prosent.utledet.medTimer', {
                timerNormalt: formatTimerOgMinutter(intl, decimalDurationToDuration(normalTimer)),
                timerRedusert: formatTimerOgMinutter(intl, {
                    hours: `${varighet.hours}` || '',
                    minutes: `${varighet.minutes}`,
                }),
            });
        }
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
