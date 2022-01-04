import { InputTime } from '@navikt/sif-common-formik/lib';
import getTimeValidator from '@navikt/sif-common-formik/lib/validation/getTimeValidator';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik/lib/validation/types';

export const getArbeidstidEnkeltdagFormTidValidator = (time: InputTime): ValidationResult<ValidationError> => {
    const error = time
        ? getTimeValidator({ max: { hours: 24, minutes: 0 }, min: { hours: 0, minutes: 0 } })(time)
        : undefined;
    if (error) {
        return {
            key: `arbeidstidEnkeltdagForm.validation.tid.${error}`,
            keepKeyUnaltered: true,
        };
    }
    return undefined;
};
