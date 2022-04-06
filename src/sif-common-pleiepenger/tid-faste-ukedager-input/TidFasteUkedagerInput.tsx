import React from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import { FormikTimeInput } from '@navikt/sif-common-formik/lib';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik/lib/validation/types';
import { Weekday } from '@navikt/sif-common-utils/lib';
import { getTidFasteUkerdagerInputMessages } from './tidFasteUkerdagerInputMessages';
import './tidFasteUkedagerInput.less';
import bemUtils from '../../dev/utils/bemUtils';

interface Props {
    name: string;
    disabledDays?: Weekday[];
    hideDisabledDays?: boolean;
    validateDag?: (dagNavn: string, value: any) => ValidationResult<ValidationError>;
}

const bem = bemUtils('tidFasteUkedagerInput');

const isWeekdayDisabled = (disabledDays: Weekday[] | undefined, dag: Weekday): boolean =>
    disabledDays ? disabledDays.some((d) => d === dag) : false;

const TidFasteUkedagerInput = ({ name, validateDag, disabledDays, hideDisabledDays }: Props) => {
    const txt = getTidFasteUkerdagerInputMessages(useIntl().locale);

    const renderWeekdayTimeInput = (weekday: Weekday, weekdayLabel: string, validationDayName: string) => {
        const disabled = isWeekdayDisabled(disabledDays, weekday);
        return disabled && hideDisabledDays ? null : (
            <FormikTimeInput
                label={weekdayLabel}
                name={`${name}.${weekday}`}
                disabled={disabled}
                timeInputLayout={{
                    direction: 'vertical',
                    compact: true,
                }}
                validate={validateDag ? (value) => validateDag(validationDayName, value) : undefined}
            />
        );
    };
    const hasHiddenDays = disabledDays !== undefined && disabledDays.length > 0 && hideDisabledDays;
    return (
        <Box margin="l">
            <div className={bem.classNames(bem.block, bem.modifierConditional('withHiddenDays', hasHiddenDays))}>
                {renderWeekdayTimeInput(Weekday.monday, txt.Mandager, txt.mandag)}
                {renderWeekdayTimeInput(Weekday.tuesday, txt.Tirsdager, txt.tirsdag)}
                {renderWeekdayTimeInput(Weekday.wednesday, txt.Onsdager, txt.onsdag)}
                {renderWeekdayTimeInput(Weekday.thursday, txt.Torsdager, txt.torsdag)}
                {renderWeekdayTimeInput(Weekday.friday, txt.Fredager, txt.fredag)}
            </div>
        </Box>
    );
};

export default TidFasteUkedagerInput;
