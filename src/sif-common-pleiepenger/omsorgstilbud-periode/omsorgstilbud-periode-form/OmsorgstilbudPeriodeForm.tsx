import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { DateRange, getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import datepickerUtils from '@navikt/sif-common-formik/lib/components/formik-datepicker/datepickerUtils';
import {
    getDateRangeValidator,
    ValidateDateError,
    ValidateDateRangeError,
} from '@navikt/sif-common-formik/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik/lib/validation/types';
import { DurationWeekdays } from '@navikt/sif-common-utils/lib';
import { InputDateString } from 'nav-datovelger/lib/types';
import { Undertittel } from 'nav-frontend-typografi';
import { TidFasteUkedagerInput } from '../..';
import { getOmsorgstilbudPeriodeIntl } from '../omsorgstilbudPeriodeMessages';
import { getOmsorgstilbudFastDagValidator, validateOmsorgstilbudFasteDager } from './omsorgstilbudFormValidation';

interface Props {
    rammePeriode: DateRange;
    gjelderFortid: boolean;
    onSubmit: (data: OmsorgstilbudPeriodeData) => void;
    onCancel: () => void;
}

export type OmsorgstilbudPeriodeData = {
    fom: Date;
    tom: Date;
    tidFasteDager: DurationWeekdays;
};

enum FormFields {
    'fom' = 'fom',
    'tom' = 'tom',
    'tidFasteDager' = 'tidFasteDager',
    'tidFasteDager.gruppe' = 'tidFasteDager.gruppe',
}

interface FormValues {
    [FormFields.fom]: InputDateString;
    [FormFields.tom]: InputDateString;
    [FormFields.tidFasteDager]: DurationWeekdays;
}

const initialFormValues: Partial<FormValues> = {};

const FormComponents = getTypedFormComponents<FormFields, FormValues, ValidationError>();

const OmsorgstilbudPeriodeForm: React.FC<Props> = ({ rammePeriode, gjelderFortid, onSubmit, onCancel }) => {
    const intl = useIntl();
    const { intlText } = getOmsorgstilbudPeriodeIntl(intl);

    const intlValues = {
        skalEllerHarVært: gjelderFortid
            ? intlText('omsorgstilbudPeriode.part.harVært')
            : intlText('omsorgstilbudPeriode.part.skalVære'),
    };

    const onValidSubmit = (values: Partial<FormValues>) => {
        const fom = datepickerUtils.getDateFromDateString(values.fom);
        const tom = datepickerUtils.getDateFromDateString(values.tom);

        if (!fom || !tom || !values.tidFasteDager) {
            throw new Error('OmsorgstilbudPeriodeForm. Ugyldig fom/tom eller tidFasteDager ');
        }

        onSubmit({
            fom,
            tom,
            tidFasteDager: values.tidFasteDager,
        });
    };

    return (
        <div>
            <Undertittel tag="h1">{intlText('omsorgstilbudPeriodeForm.tittel')}</Undertittel>
            <FormBlock margin="xl">
                <FormComponents.FormikWrapper
                    initialValues={initialFormValues}
                    onSubmit={onValidSubmit}
                    renderForm={({ values: { fom, tom, tidFasteDager } }) => {
                        const from = datepickerUtils.getDateFromDateString(fom);
                        const to = datepickerUtils.getDateFromDateString(tom);

                        return (
                            <FormComponents.Form
                                onCancel={onCancel}
                                formErrorHandler={getIntlFormErrorHandler(intl, 'omsorgstilbudPeriodeForm.validation')}
                                includeValidationSummary={true}
                                submitButtonLabel={intlText('omsorgstilbudPeriodeForm.submitButtonLabel')}
                                cancelButtonLabel={intlText('omsorgstilbudPeriodeForm.cancelButtonLabel')}>
                                <div style={{ maxWidth: '20rem' }}>
                                    <FormBlock>
                                        <FormComponents.DateIntervalPicker
                                            fromDatepickerProps={{
                                                label: intlText('omsorgstilbudPeriodeForm.fraOgMed.label'),
                                                name: FormFields.fom,
                                                disableWeekend: true,
                                                fullScreenOnMobile: true,
                                                dayPickerProps: {
                                                    initialMonth: rammePeriode.from,
                                                },
                                                minDate: rammePeriode.from,
                                                maxDate: to || rammePeriode.to,
                                                validate: getDateRangeValidator({
                                                    required: true,
                                                    onlyWeekdays: true,
                                                    toDate: to,
                                                    fromDate: from,
                                                    min: rammePeriode.from,
                                                    max: to || rammePeriode.to,
                                                }).validateFromDate,
                                            }}
                                            toDatepickerProps={{
                                                label: intlText('omsorgstilbudPeriodeForm.tilOgMed.label'),
                                                name: FormFields.tom,
                                                disableWeekend: true,
                                                fullScreenOnMobile: true,
                                                minDate: from || rammePeriode.from,
                                                maxDate: rammePeriode.to,
                                                dayPickerProps: {
                                                    initialMonth: from || rammePeriode.from,
                                                },
                                                validate: getDateRangeValidator({
                                                    required: true,
                                                    onlyWeekdays: true,
                                                    toDate: to,
                                                    fromDate: from,
                                                    min: from || rammePeriode.from,
                                                    max: rammePeriode.to,
                                                }).validateToDate,
                                            }}
                                        />
                                    </FormBlock>
                                </div>

                                <FormBlock>
                                    <FormComponents.InputGroup
                                        legend={intlText(
                                            gjelderFortid
                                                ? 'omsorgstilbudPeriodeForm.tidFasteDager.historisk.label'
                                                : 'omsorgstilbudPeriodeForm.tidFasteDager.planlagt.label'
                                        )}
                                        validate={() => {
                                            const error = validateOmsorgstilbudFasteDager(tidFasteDager);
                                            return error
                                                ? {
                                                      key: `${error}`,
                                                      values: intlValues,
                                                  }
                                                : undefined;
                                        }}
                                        name={FormFields['tidFasteDager.gruppe']}>
                                        <TidFasteUkedagerInput
                                            name={FormFields.tidFasteDager}
                                            validation={{
                                                validator: getOmsorgstilbudFastDagValidator,
                                                validationIntlKey: `omsorgstilbudPeriodeForm.validation.tidFasteDager.tid`,
                                            }}
                                        />
                                    </FormComponents.InputGroup>
                                </FormBlock>
                            </FormComponents.Form>
                        );
                    }}
                />
            </FormBlock>
        </div>
    );
};

export const OmsorgstilbudPeriodeFormErrors = {
    [FormFields.fom]: {
        [ValidateDateError.dateHasNoValue]: 'omsorgstilbudPeriodeForm.validation.fom.dateHasNoValue',
        [ValidateDateError.dateIsAfterMax]: 'omsorgstilbudPeriodeForm.validation.fom.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: 'omsorgstilbudPeriodeForm.validation.fom.dateIsBeforeMin',
        [ValidateDateError.dateHasInvalidFormat]: 'omsorgstilbudPeriodeForm.validation.fom.dateHasInvalidFormat',
        [ValidateDateRangeError.fromDateIsAfterToDate]: 'omsorgstilbudPeriodeForm.validation.fom.fromDateIsAfterToDate',
    },
    [FormFields.tom]: {
        [ValidateDateError.dateHasNoValue]: 'omsorgstilbudPeriodeForm.validation.tom.dateHasNoValue',
        [ValidateDateError.dateIsAfterMax]: 'omsorgstilbudPeriodeForm.validation.tom.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: 'omsorgstilbudPeriodeForm.validation.tom.dateIsBeforeMin',
        [ValidateDateError.dateHasInvalidFormat]: 'omsorgstilbudPeriodeForm.validation.tom.dateHasInvalidFormat',
        [ValidateDateRangeError.toDateIsBeforeFromDate]:
            'omsorgstilbudPeriodeForm.validation.tom.toDateIsBeforeFromDate',
    },
    [FormFields['tidFasteDager.gruppe']]: {
        ['ingenTidRegistrert']: 'omsorgstilbudPeriodeForm.validation.tidFasteDager.gruppe.ingenTidRegistrert',
        ['forMangeTimer']: 'omsorgstilbudPeriodeForm.validation.tidFasteDager.gruppe.forMangeTimer',
    },
};

export default OmsorgstilbudPeriodeForm;
