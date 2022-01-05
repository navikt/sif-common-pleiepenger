import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik/lib';
import { getNumberValidator } from '@navikt/sif-common-formik/lib/validation';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik/lib/validation/types';
import { DurationWeekdays, summarizeDurationInDurationWeekdays } from '@navikt/sif-common-utils/lib';
import { ArbeidIPeriodeIntlValues } from '../types';

export const getArbeidstidFastProsentValidator =
    (intlValues: ArbeidIPeriodeIntlValues, minMax?: { min: number; max: number }) => (value: any) => {
        const minMaxOptions = minMax || {
            min: 1,
            max: 100,
        };

        const intlKey = 'validation.arbeidstimerFast.prosent';
        if (getNumberFromNumberInputValue(value) === 0) {
            return {
                key: `${intlKey}.måSvareNeiPåJobbIPerioden`,
                values: { ...intlValues },
                keepKeyUnaltered: true,
            };
        }
        const error = getNumberValidator({ required: true, ...minMaxOptions })(value);
        if (error) {
            return {
                key: `${intlKey}.${error}`,
                values: { ...intlValues, ...minMaxOptions },
                keepKeyUnaltered: true,
            };
        }
        return undefined;
    };

export const validateFasteArbeidstimerIUke = (
    fasteDager: DurationWeekdays | undefined,
    intlValues: ArbeidIPeriodeIntlValues
): ValidationResult<ValidationError> => {
    let error;
    const timer = fasteDager ? summarizeDurationInDurationWeekdays(fasteDager) : 0;
    if (timer === 0) {
        error = 'arbeidIPeriode.fasteDager.ingenTidRegistrert';
    }
    if (timer > 37.5) {
        error = 'arbeidIPeriode.fasteDager.forMangeTimer';
    }
    return error
        ? {
              key: `validation.${error}`,
              values: intlValues,
              keepKeyUnaltered: true,
          }
        : undefined;
};
