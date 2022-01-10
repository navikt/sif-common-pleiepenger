import getTimeValidator from '@navikt/sif-common-formik/lib/validation/getTimeValidator';
import { IntlErrorObject, ValidationError, ValidationResult } from '@navikt/sif-common-formik/lib/validation/types';
import { Duration, DurationWeekdays, summarizeDurationInDurationWeekdays } from '@navikt/sif-common-utils/lib';

export const getOmsorgstilbudFastDagValidator =
    (dag: string, errorsIntlKey?: string) =>
    (time: Duration): IntlErrorObject | undefined => {
        const error = time
            ? getTimeValidator({ max: { hours: 7, minutes: 30 }, min: { hours: 0, minutes: 0 } })(time)
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

export const validateOmsorgstilbudFasteDager = (
    fasteDager: DurationWeekdays | undefined
): ValidationResult<ValidationError> => {
    let error;
    const timer = fasteDager ? summarizeDurationInDurationWeekdays(fasteDager) : 0;
    if (timer === 0) {
        error = 'ingenTidRegistrert';
    }
    if (timer > 37.5) {
        error = 'forMangeTimer';
    }
    return error;
};
