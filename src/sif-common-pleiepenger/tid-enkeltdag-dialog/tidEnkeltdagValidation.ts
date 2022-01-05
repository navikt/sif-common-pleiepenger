import { InputTime } from '@navikt/sif-common-formik/lib';
import getTimeValidator from '@navikt/sif-common-formik/lib/validation/getTimeValidator';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik/lib/validation/types';
import { NumberDuration } from '@navikt/sif-common-utils/lib';

export const getTidEnkeltdagFormTidValidator =
    (maksTid?: NumberDuration, minTid?: NumberDuration) =>
    (time: InputTime): ValidationResult<ValidationError> => {
        const error = time ? getTimeValidator({ required: true, max: maksTid, min: minTid })(time) : undefined;
        if (error) {
            return {
                key: `tidEnkeltdagForm.validation.tid.${error}`,
                keepKeyUnaltered: true,
            };
        }
        return undefined;
    };
