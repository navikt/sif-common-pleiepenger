import React from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import { FormikTimeInput } from '@navikt/sif-common-formik/lib';
import { ValidationError, ValidationFunction } from '@navikt/sif-common-formik/lib/validation/types';
import { Weekday } from '@navikt/sif-common-utils/lib';
import { getTidFasteUkerdagerInputMessages } from './tidFasteUkerdagerInputMessages';
import './tidFasteUkedagerInput.less';

interface Props {
    name: string;
    validation?: {
        validator: (dagnavn: string, errorsIntlKey?: string) => ValidationFunction<ValidationError>;
        validationIntlKey?: string;
    };
}

const TidFasteUkedagerInput = ({ name, validation }: Props) => {
    const txt = getTidFasteUkerdagerInputMessages(useIntl().locale);
    return (
        <Box margin="l">
            <div className="tidFasteUkedagerInput">
                <FormikTimeInput
                    label={txt.Mandager}
                    name={`${name}_${Weekday.monday}`}
                    timeInputLayout={{
                        direction: 'vertical',
                        compact: true,
                    }}
                    validate={validation ? validation.validator(txt.mandag, validation.validationIntlKey) : undefined}
                />
                <FormikTimeInput
                    label={txt.Tirsdager}
                    name={`${name}_${Weekday.tuesday}`}
                    timeInputLayout={{
                        direction: 'vertical',
                        compact: true,
                    }}
                    validate={validation ? validation.validator(txt.tirsdag, validation.validationIntlKey) : undefined}
                />
                <FormikTimeInput
                    label={txt.Onsdager}
                    name={`${name}_${Weekday.wednesday}`}
                    timeInputLayout={{
                        direction: 'vertical',
                        compact: true,
                    }}
                    validate={validation ? validation.validator(txt.onsdag, validation.validationIntlKey) : undefined}
                />
                <FormikTimeInput
                    label={txt.Torsdager}
                    name={`${name}_${Weekday.thursday}`}
                    timeInputLayout={{
                        direction: 'vertical',
                        compact: true,
                    }}
                    validate={validation ? validation.validator(txt.torsdag, validation.validationIntlKey) : undefined}
                />
                <FormikTimeInput
                    label={txt.Fredager}
                    name={`${name}_${Weekday.friday}`}
                    timeInputLayout={{
                        direction: 'vertical',
                        compact: true,
                    }}
                    validate={validation ? validation.validator(txt.mandag, validation.validationIntlKey) : undefined}
                />
            </div>
        </Box>
    );
};

export default TidFasteUkedagerInput;
