import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik/lib';
import { getNumberValidator } from '@navikt/sif-common-formik/lib/validation';
import getTimeValidator from '@navikt/sif-common-formik/lib/validation/getTimeValidator';
import { IntlErrorObject } from '@navikt/sif-common-formik/lib/validation/types';
import {
    Duration,
    durationToDecimalDuration,
    DurationWeekdays,
    summarizeDurationInDurationWeekdays,
} from '@navikt/sif-common-utils/lib';

export const getArbeidstidFastProsentValidator =
    (minMax?: { min: number; max: number }) =>
    (value: any): IntlErrorObject | undefined => {
        const minMaxOptions = minMax || {
            min: 1,
            max: 100,
        };
        if (getNumberFromNumberInputValue(value) === 0) {
            return { key: 'måSvareNeiPåJobbIPerioden' };
        }
        const error = getNumberValidator({ required: true, ...minMaxOptions })(value);
        return error
            ? {
                  key: error,
                  values: { ...minMaxOptions },
              }
            : undefined;
    };

export const validateFasteArbeidstimerIUke = (
    fasteDager: DurationWeekdays | undefined
): IntlErrorObject | undefined => {
    const timer = fasteDager ? durationToDecimalDuration(summarizeDurationInDurationWeekdays(fasteDager)) : 0;
    if (timer === 0) {
        return {
            key: `ingenTidRegistrert`,
        };
    }
    if (timer > 37.5) {
        return {
            key: `forMangeTimer`,
        };
    }
    return undefined;
};

export const getArbeidstimerFastDagValidator =
    (dag: string, errorsIntlKey?: string) =>
    (time: Duration): IntlErrorObject | undefined => {
        const error = time
            ? getTimeValidator({ max: { hours: 24, minutes: 0 }, min: { hours: 0, minutes: 0 } })(time)
            : undefined;
        if (error) {
            return {
                key: errorsIntlKey ? `${errorsIntlKey}_${error}` : error,
                values: { dag },
                keepKeyUnaltered: true,
            };
        }
        return undefined;
    };
