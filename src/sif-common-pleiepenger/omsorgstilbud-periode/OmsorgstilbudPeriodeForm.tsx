import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { DateRange, getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import datepickerUtils from '@navikt/sif-common-formik/lib/components/formik-datepicker/datepickerUtils';
import { getDateRangeValidator } from '@navikt/sif-common-formik/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik/lib/validation/types';
import { DurationWeekdays } from '@navikt/sif-common-utils/lib';
import { InputDateString } from 'nav-datovelger/lib/types';
import { Undertittel } from 'nav-frontend-typografi';
import { TidFasteUkedagerInput } from '../';
import { getOmsorgstilbudFastDagValidator, validateOmsorgstilbudIUke } from './omsorgstilbudFormValidation';

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
}

const validationIntlKey = 'omsorgstilbudPeriodeForm.validation';

interface FormValues {
    [FormFields.fom]: InputDateString;
    [FormFields.tom]: InputDateString;
    [FormFields.tidFasteDager]: DurationWeekdays;
}

const initialFormValues: Partial<FormValues> = {};

const FormComponents = getTypedFormComponents<FormFields, FormValues, ValidationError>();

const OmsorgstilbudPeriodeForm: React.FC<Props> = ({ rammePeriode, gjelderFortid, onSubmit, onCancel }) => {
    const intl = useIntl();

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
            <Undertittel tag="h1">
                <FormattedMessage id="omsorgstilbudPeriodeForm.tittel" />
            </Undertittel>
            <FormBlock margin="xl">
                <FormComponents.FormikWrapper
                    initialValues={initialFormValues}
                    onSubmit={onValidSubmit}
                    renderForm={({ values: { fom, tom, tidFasteDager } }) => {
                        const from = datepickerUtils.getDateFromDateString(fom);
                        const to = datepickerUtils.getDateFromDateString(tom);

                        const validator = getDateRangeValidator({
                            required: true,
                            onlyWeekdays: true,
                            toDate: to,
                            fromDate: from,
                            min: rammePeriode.from,
                            max: to || rammePeriode.to,
                        });

                        return (
                            <FormComponents.Form
                                onCancel={onCancel}
                                formErrorHandler={getIntlFormErrorHandler(intl, validationIntlKey)}
                                includeValidationSummary={true}
                                submitButtonLabel={intlHelper(intl, 'omsorgstilbudPeriodeForm.submitButtonLabel')}
                                cancelButtonLabel={intlHelper(intl, 'omsorgstilbudPeriodeForm.cancelButtonLabel')}>
                                <div style={{ maxWidth: '20rem' }}>
                                    <FormBlock>
                                        <FormComponents.DateIntervalPicker
                                            fromDatepickerProps={{
                                                label: intlHelper(intl, 'omsorgstilbudPeriodeForm.fraOgMed.label'),
                                                name: FormFields.fom,
                                                disableWeekend: true,
                                                fullScreenOnMobile: true,
                                                dayPickerProps: {
                                                    initialMonth: rammePeriode.from,
                                                },
                                                minDate: rammePeriode.from,
                                                maxDate: to || rammePeriode.to,
                                                validate: validator.validateFromDate,
                                            }}
                                            toDatepickerProps={{
                                                label: intlHelper(intl, 'omsorgstilbudPeriodeForm.tilOgMed.label'),
                                                name: FormFields.tom,
                                                disableWeekend: true,
                                                fullScreenOnMobile: true,
                                                minDate: from || rammePeriode.from,
                                                maxDate: rammePeriode.to,
                                                dayPickerProps: {
                                                    initialMonth: from || rammePeriode.from,
                                                },
                                                validate: validator.validateToDate,
                                            }}
                                        />
                                    </FormBlock>
                                </div>

                                <FormBlock>
                                    <FormComponents.InputGroup
                                        legend={intlHelper(
                                            intl,
                                            `omsorgstilbudPeriodeForm.tidFasteDager.${
                                                gjelderFortid ? 'historisk' : 'planlagt'
                                            }.label`
                                        )}
                                        validate={() => validateOmsorgstilbudIUke(tidFasteDager)}
                                        name={'fasteDager_gruppe' as any}>
                                        <TidFasteUkedagerInput
                                            name={FormFields.tidFasteDager}
                                            validation={{
                                                validator: getOmsorgstilbudFastDagValidator,
                                                validationIntlKey: `${validationIntlKey}.fastdag.tid`,
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

export default OmsorgstilbudPeriodeForm;
