import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { DateRange, getTypedFormComponents } from '@navikt/sif-common-formik';
import datepickerUtils from '@navikt/sif-common-formik/lib/components/formik-datepicker/datepickerUtils';
import { getDateRangeValidator, getRequiredFieldValidator } from '@navikt/sif-common-formik/lib/validation';
import { isIntlErrorObject, ValidationError } from '@navikt/sif-common-formik/lib/validation/types';
import { DurationWeekdays } from '@navikt/sif-common-utils';
import { InputDateString } from 'nav-datovelger/lib/types';
import { Undertittel } from 'nav-frontend-typografi';
import { getArbeidstimerFastDagValidator } from '../';
import TidFasteUkedagerInput from '../tid-faste-ukedager-input/TidFasteUkedagerInput';
import { ArbeidIPeriodeIntlValues, ArbeidstidPeriodeData } from '../types';
import { getArbeidIPeriodeMessages } from './arbeidPeriodeMessages';
import { getArbeidstidFastProsentValidator, validateFasteArbeidstimerIUke } from './arbeidstidFormValidation';
import { getRedusertArbeidstidPerUkeInfo } from './arbeidstidPeriodeUtils';

interface Props {
    arbeidsstedNavn: string;
    rammePeriode: DateRange;
    intlValues: ArbeidIPeriodeIntlValues;
    jobberNormaltTimer: number;
    onSubmit: (data: ArbeidstidPeriodeData) => void;
    onCancel: () => void;
}

enum TidFasteDagerEllerProsent {
    prosent = 'prosent',
    tidFasteDager = 'tidFasteDager',
}

enum FormFields {
    'fom' = 'fom',
    'tom' = 'tom',
    'tidFasteDagerEllerProsent' = 'tidFasteDagerEllerProsent',
    'tidFasteDager' = 'tidFasteDager',
    'prosent' = 'prosent',
}

interface FormValues {
    [FormFields.fom]: InputDateString;
    [FormFields.tom]: InputDateString;
    [FormFields.tidFasteDagerEllerProsent]: TidFasteDagerEllerProsent;
    [FormFields.prosent]: string;
    [FormFields.tidFasteDager]?: DurationWeekdays;
}

const initialFormValues: Partial<FormValues> = {};

const FormComponents = getTypedFormComponents<FormFields, FormValues, ValidationError>();
const validationIntlKey = 'arbeidstidPeriodeForm.validation';

const bem = bemUtils('arbeidstidEnkeltdagForm');

const ArbeidstidPeriodeForm: React.FunctionComponent<Props> = ({
    arbeidsstedNavn,
    rammePeriode,
    intlValues,
    jobberNormaltTimer,
    onSubmit,
    onCancel,
}) => {
    const intl = useIntl();
    const txt = getArbeidIPeriodeMessages(intl.locale);

    const onValidSubmit = (values: Partial<FormValues>) => {
        const fom = datepickerUtils.getDateFromDateString(values.fom);
        const tom = datepickerUtils.getDateFromDateString(values.tom);

        if (!fom || !tom) {
            throw new Error('ArbeidstidPeriodeForm. Ugyldig fom/tom ');
        }

        onSubmit({
            fom,
            tom,
            prosent:
                values.tidFasteDagerEllerProsent === TidFasteDagerEllerProsent.prosent ? values.prosent : undefined,
            tidFasteDager:
                values.tidFasteDagerEllerProsent === TidFasteDagerEllerProsent.tidFasteDager
                    ? values.tidFasteDager
                    : undefined,
        });
    };

    return (
        <div>
            <Undertittel tag="h1" className={bem.element('tittel')}>
                {txt.form_tittel(arbeidsstedNavn)}
            </Undertittel>
            <FormBlock margin="xl">
                <FormComponents.FormikWrapper
                    initialValues={initialFormValues}
                    onSubmit={onValidSubmit}
                    renderForm={({ values: { fom, tom, tidFasteDagerEllerProsent, tidFasteDager, prosent } }) => {
                        const from = datepickerUtils.getDateFromDateString(fom);
                        const to = datepickerUtils.getDateFromDateString(tom);

                        return (
                            <FormComponents.Form
                                onCancel={onCancel}
                                formErrorHandler={{
                                    fieldErrorHandler: (error, fieldName) =>
                                        isIntlErrorObject(error)
                                            ? `${fieldName}.${error.key}`
                                            : `${fieldName}.${error}`,
                                }}
                                includeValidationSummary={true}
                                includeButtons={true}
                                submitButtonLabel={txt.form_submitButtonLabel}
                                cancelButtonLabel={txt.form_cancelButtonLabel}>
                                <div style={{ maxWidth: '20rem' }}>
                                    <FormBlock>
                                        <FormComponents.DateIntervalPicker
                                            fromDatepickerProps={{
                                                label: txt.form_fraOgMed_label,
                                                name: FormFields.fom,
                                                disableWeekend: true,
                                                fullScreenOnMobile: true,
                                                fullscreenOverlay: true,
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
                                                label: txt.form_tilOgMed_label,
                                                name: FormFields.tom,
                                                disableWeekend: true,
                                                fullScreenOnMobile: true,
                                                fullscreenOverlay: true,
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
                                    <FormComponents.RadioPanelGroup
                                        name={FormFields.tidFasteDagerEllerProsent}
                                        legend={txt.form_tidFasteDagerEllerProsent_label(intlValues.skalEllerHarJobbet)}
                                        useTwoColumns={true}
                                        radios={[
                                            {
                                                label: txt.form_tidFasteDagerEllerProsent_prosent,
                                                value: TidFasteDagerEllerProsent.prosent,
                                            },
                                            {
                                                label: txt.form_tidFasteDagerEllerProsent_timer,
                                                value: TidFasteDagerEllerProsent.tidFasteDager,
                                            },
                                        ]}
                                        validate={(value) => {
                                            const error = getRequiredFieldValidator()(value);
                                            if (error) {
                                                return {
                                                    key: error,
                                                    values: intlValues,
                                                };
                                            }
                                            return undefined;
                                        }}
                                    />
                                </FormBlock>

                                {tidFasteDagerEllerProsent === TidFasteDagerEllerProsent.prosent && (
                                    <FormBlock>
                                        <FormComponents.NumberInput
                                            name={FormFields.prosent}
                                            bredde="XS"
                                            maxLength={4}
                                            label={txt.form_prosent_label(intlValues.skalEllerHarJobbet)}
                                            validate={(value) => {
                                                const error = getArbeidstidFastProsentValidator({
                                                    min: 0,
                                                    max: 100,
                                                })(value);
                                                return error
                                                    ? {
                                                          key: error.key,
                                                          values: { ...intlValues, ...error.values },
                                                      }
                                                    : undefined;
                                            }}
                                            suffix={getRedusertArbeidstidPerUkeInfo(intl, jobberNormaltTimer, prosent)}
                                            suffixStyle="text"
                                        />
                                    </FormBlock>
                                )}
                                {tidFasteDagerEllerProsent === TidFasteDagerEllerProsent.tidFasteDager && (
                                    <FormBlock>
                                        <FormComponents.InputGroup
                                            legend={txt.form_tidFasteDager_label(intlValues.skalEllerHarJobbet)}
                                            validate={() => {
                                                const error = validateFasteArbeidstimerIUke(tidFasteDager);
                                                return error
                                                    ? {
                                                          key: error.key,
                                                          values: intlValues,
                                                      }
                                                    : undefined;
                                            }}
                                            name={'fasteDager_gruppe' as any}>
                                            <TidFasteUkedagerInput
                                                name={FormFields.tidFasteDager}
                                                validation={{
                                                    validationIntlKey: `${validationIntlKey}.fastdag.tid`,
                                                    validator: getArbeidstimerFastDagValidator,
                                                }}
                                            />
                                        </FormComponents.InputGroup>
                                    </FormBlock>
                                )}
                            </FormComponents.Form>
                        );
                    }}
                />
            </FormBlock>
        </div>
    );
};

export const ArbeidstidValideringFormMessages = {
    nb: {
        '': '',
    },
};

export default ArbeidstidPeriodeForm;
