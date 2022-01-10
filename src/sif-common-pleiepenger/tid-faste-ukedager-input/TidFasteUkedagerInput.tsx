import React from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import { FormikTimeInput } from '@navikt/sif-common-formik/lib';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik/lib/validation/types';
import { Weekday } from '@navikt/sif-common-utils/lib';
import { getTidFasteUkerdagerInputMessages } from './tidFasteUkerdagerInputMessages';
import './tidFasteUkedagerInput.less';

interface Props {
    name: string;
    validateDag?: (dagNavn: string, value: any) => ValidationResult<ValidationError>;
}

const TidFasteUkedagerInput = ({ name, validateDag }: Props) => {
    const txt = getTidFasteUkerdagerInputMessages(useIntl().locale);
    return (
        <Box margin="l">
            <div className="tidFasteUkedagerInput">
                <FormikTimeInput
                    label={txt.Mandager}
                    name={`${name}.${Weekday.monday}`}
                    timeInputLayout={{
                        direction: 'vertical',
                        compact: true,
                    }}
                    validate={validateDag ? (value) => validateDag(txt.mandag, value) : undefined}
                />
                <FormikTimeInput
                    label={txt.Tirsdager}
                    name={`${name}.${Weekday.tuesday}`}
                    timeInputLayout={{
                        direction: 'vertical',
                        compact: true,
                    }}
                    validate={validateDag ? (value) => validateDag(txt.tirsdag, value) : undefined}
                />
                <FormikTimeInput
                    label={txt.Onsdager}
                    name={`${name}.${Weekday.wednesday}`}
                    timeInputLayout={{
                        direction: 'vertical',
                        compact: true,
                    }}
                    validate={validateDag ? (value) => validateDag(txt.onsdag, value) : undefined}
                />
                <FormikTimeInput
                    label={txt.Torsdager}
                    name={`${name}.${Weekday.thursday}`}
                    timeInputLayout={{
                        direction: 'vertical',
                        compact: true,
                    }}
                    validate={validateDag ? (value) => validateDag(txt.torsdag, value) : undefined}
                />
                <FormikTimeInput
                    label={txt.Fredager}
                    name={`${name}.${Weekday.friday}`}
                    timeInputLayout={{
                        direction: 'vertical',
                        compact: true,
                    }}
                    validate={validateDag ? (value) => validateDag(txt.mandag, value) : undefined}
                />
            </div>
        </Box>
    );
};

export default TidFasteUkedagerInput;
