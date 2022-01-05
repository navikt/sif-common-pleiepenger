import getTimeValidator from '@navikt/sif-common-formik/lib/validation/getTimeValidator';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik/lib/validation/types';
import { Duration, DurationWeekdays, summarizeDurationInDurationWeekdays } from '@navikt/sif-common-utils/lib';

export const getOmsorgstilbudFastDagValidator =
    (dag: string) =>
    (time: Duration): ValidationResult<ValidationError> => {
        const error = time
            ? getTimeValidator({ max: { hours: 7, minutes: 30 }, min: { hours: 0, minutes: 0 } })(time)
            : undefined;
        if (error) {
            return {
                key: `validation.omsorgstilbud.fastdag.tid.${error}`,
                values: { dag },
                keepKeyUnaltered: true,
            };
        }
        return undefined;
    };

export const validateOmsorgstilbudIUke = (
    fasteDager: DurationWeekdays | undefined
): ValidationResult<ValidationError> => {
    let error;
    const timer = fasteDager ? summarizeDurationInDurationWeekdays(fasteDager) : 0;
    if (timer === 0) {
        error = 'omsorgstilbud.fasteDager.ingenTidRegistrert';
    }
    if (timer > 37.5) {
        error = 'omsorgstilbud.fasteDager.forMangeTimer';
    }
    return error
        ? {
              key: `validation.${error}`,
              keepKeyUnaltered: true,
          }
        : undefined;
};
