import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { DateRange, getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik';
import datepickerUtils from '@navikt/sif-common-formik/lib/components/formik-datepicker/datepickerUtils';
import { getDateRangeValidator, getRequiredFieldValidator } from '@navikt/sif-common-formik/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik/lib/validation/types';
import { DurationWeekdays } from '@navikt/sif-common-utils';
import { InputDateString } from 'nav-datovelger/lib/types';
import { Undertittel } from 'nav-frontend-typografi';
import { getArbeidstimerFastDagValidator } from '../..';
import TidFasteUkedagerInput from '../../tid-faste-ukedager-input/TidFasteUkedagerInput';
import { ArbeidIPeriodeIntlValues, ArbeidstidPeriodeData } from '../../types';
import { getArbeidstidPeriodeIntl } from '../arbeidstidPeriodeMessages';
import { getRedusertArbeidstidPerUkeInfo } from '../arbeidstidPeriodeUtils';
import { getArbeidstidFastProsentValidator, validateFasteArbeidstimerIUke } from './arbeidstidPeriodeFormValidation';

export interface ArbeidstidPeriodeFormProps {
    arbeidsstedNavn: string;
    periode: DateRange;
    jobberNormaltTimer: number;
    intlValues: ArbeidIPeriodeIntlValues;
    spørOmBrukerSkalJobbeIPerioden?: boolean;
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
    'skalJobbeIPerioden' = 'skalJobbeIPerioden',
    'tidFasteDagerEllerProsent' = 'tidFasteDagerEllerProsent',
    'tidFasteDager' = 'tidFasteDager',
    'prosent' = 'prosent',
}

interface FormValues {
    [FormFields.fom]: InputDateString;
    [FormFields.tom]: InputDateString;
    [FormFields.skalJobbeIPerioden]?: YesOrNo;
    [FormFields.tidFasteDagerEllerProsent]: TidFasteDagerEllerProsent;
    [FormFields.prosent]: string;
    [FormFields.tidFasteDager]?: DurationWeekdays;
}

const initialFormValues: Partial<FormValues> = {};
const bem = bemUtils('arbeidstidEnkeltdagForm');

const FormComponents = getTypedFormComponents<FormFields, FormValues, ValidationError>();

const ArbeidstidPeriodeForm: React.FunctionComponent<ArbeidstidPeriodeFormProps> = ({
    arbeidsstedNavn,
    periode,
    intlValues,
    jobberNormaltTimer,
    spørOmBrukerSkalJobbeIPerioden,
    onSubmit,
    onCancel,
}) => {
    const intl = useIntl();
    const arbIntl = getArbeidstidPeriodeIntl(intl);

    console.log(spørOmBrukerSkalJobbeIPerioden);

    const onValidSubmit = (values: Partial<FormValues>) => {
        const fom = datepickerUtils.getDateFromDateString(values.fom);
        const tom = datepickerUtils.getDateFromDateString(values.tom);

        if (!fom || !tom) {
            throw new Error('ArbeidstidPeriodeForm. Ugyldig fom/tom ');
        }

        const getProsentDataToSubmit = (): string | undefined => {
            if (spørOmBrukerSkalJobbeIPerioden && values.skalJobbeIPerioden === YesOrNo.NO) {
                return '0';
            }
            return values.tidFasteDagerEllerProsent === TidFasteDagerEllerProsent.prosent ? values.prosent : undefined;
        };

        onSubmit({
            fom,
            tom,
            prosent: getProsentDataToSubmit(),
            tidFasteDager:
                values.tidFasteDagerEllerProsent === TidFasteDagerEllerProsent.tidFasteDager
                    ? values.tidFasteDager
                    : undefined,
        });
    };

    return (
        <div>
            <Undertittel tag="h1" className={bem.element('tittel')}>
                {arbIntl.intlText('arbeidstidPeriodeForm.tittel', { arbeidsstedNavn })}
            </Undertittel>
            <FormBlock margin="xl">
                <FormComponents.FormikWrapper
                    initialValues={initialFormValues}
                    onSubmit={onValidSubmit}
                    renderForm={({
                        values: { fom, tom, tidFasteDagerEllerProsent, tidFasteDager, prosent, skalJobbeIPerioden },
                    }) => {
                        const from = datepickerUtils.getDateFromDateString(fom);
                        const to = datepickerUtils.getDateFromDateString(tom);
                        return (
                            <FormComponents.Form
                                onCancel={onCancel}
                                formErrorHandler={getIntlFormErrorHandler(intl, 'arbeidstidPeriodeForm.validation')}
                                includeValidationSummary={true}
                                includeButtons={true}
                                submitButtonLabel={arbIntl.intlText('arbeidstidPeriodeForm.submitButtonLabel')}
                                cancelButtonLabel={arbIntl.intlText('arbeidstidPeriodeForm.cancelButtonLabel')}>
                                <div style={{ maxWidth: '20rem' }}>
                                    <FormBlock>
                                        <FormComponents.DateIntervalPicker
                                            fromDatepickerProps={{
                                                label: arbIntl.intlText('arbeidstidPeriodeForm.fraOgMed.label'),
                                                name: FormFields.fom,
                                                disableWeekend: true,
                                                fullScreenOnMobile: true,
                                                fullscreenOverlay: true,
                                                dayPickerProps: {
                                                    initialMonth: periode.from,
                                                },
                                                minDate: periode.from,
                                                maxDate: to || periode.to,
                                                validate: getDateRangeValidator({
                                                    required: true,
                                                    onlyWeekdays: true,
                                                    toDate: to,
                                                    fromDate: from,
                                                    min: periode.from,
                                                    max: to || periode.to,
                                                }).validateFromDate,
                                            }}
                                            toDatepickerProps={{
                                                label: arbIntl.intlText('arbeidstidPeriodeForm.tilOgMed.label'),
                                                name: FormFields.tom,
                                                disableWeekend: true,
                                                fullScreenOnMobile: true,
                                                fullscreenOverlay: true,
                                                minDate: from || periode.from,
                                                maxDate: periode.to,
                                                dayPickerProps: {
                                                    initialMonth: from || periode.from,
                                                },
                                                validate: getDateRangeValidator({
                                                    required: true,
                                                    onlyWeekdays: true,
                                                    toDate: to,
                                                    fromDate: from,
                                                    min: from || periode.from,
                                                    max: periode.to,
                                                }).validateToDate,
                                            }}
                                        />
                                    </FormBlock>
                                </div>

                                {spørOmBrukerSkalJobbeIPerioden && (
                                    <FormBlock>
                                        <FormComponents.YesOrNoQuestion
                                            name={FormFields.skalJobbeIPerioden}
                                            legend={arbIntl.intlText(
                                                'arbeidstidPeriodeForm.skalJobbeIPerioden.label',
                                                intlValues
                                            )}
                                            validate={getRequiredFieldValidator()}
                                        />
                                    </FormBlock>
                                )}

                                {(spørOmBrukerSkalJobbeIPerioden !== true || skalJobbeIPerioden === YesOrNo.YES) && (
                                    <>
                                        <FormBlock>
                                            <FormComponents.RadioPanelGroup
                                                name={FormFields.tidFasteDagerEllerProsent}
                                                legend={arbIntl.intlText(
                                                    'arbeidstidPeriodeForm.tidFasteDagerEllerProsent.label',
                                                    intlValues
                                                )}
                                                useTwoColumns={true}
                                                radios={[
                                                    {
                                                        label: arbIntl.intlText(
                                                            'arbeidstidPeriodeForm.tidFasteDagerEllerProsent.prosent'
                                                        ),
                                                        value: TidFasteDagerEllerProsent.prosent,
                                                    },
                                                    {
                                                        label: arbIntl.intlText(
                                                            'arbeidstidPeriodeForm.tidFasteDagerEllerProsent.timer'
                                                        ),
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
                                                    label={arbIntl.intlText(
                                                        'arbeidstidPeriodeForm.prosent.label',
                                                        intlValues
                                                    )}
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
                                                    suffix={getRedusertArbeidstidPerUkeInfo(
                                                        intl,
                                                        jobberNormaltTimer,
                                                        prosent
                                                    )}
                                                    suffixStyle="text"
                                                />
                                            </FormBlock>
                                        )}
                                        {tidFasteDagerEllerProsent === TidFasteDagerEllerProsent.tidFasteDager && (
                                            <FormBlock>
                                                <FormComponents.InputGroup
                                                    legend={arbIntl.intlText(
                                                        'arbeidstidPeriodeForm.tidFasteDager.label',
                                                        intlValues
                                                    )}
                                                    validate={() => {
                                                        const error = validateFasteArbeidstimerIUke(tidFasteDager);
                                                        return error
                                                            ? {
                                                                  key: error.key,
                                                                  values: intlValues,
                                                              }
                                                            : undefined;
                                                    }}
                                                    name={'fasteDager.gruppe' as any}>
                                                    <TidFasteUkedagerInput
                                                        name={FormFields.tidFasteDager}
                                                        validateDag={(dag, value) => {
                                                            const error = getArbeidstimerFastDagValidator()(value);
                                                            return error
                                                                ? {
                                                                      key: `arbeidstidPeriodeForm.validation.tidFasteDager.tid.${error}`,
                                                                      keepKeyUnaltered: true,
                                                                      values: { ...intlValues, dag },
                                                                  }
                                                                : undefined;
                                                        }}
                                                    />
                                                </FormComponents.InputGroup>
                                            </FormBlock>
                                        )}
                                    </>
                                )}
                            </FormComponents.Form>
                        );
                    }}
                />
            </FormBlock>
        </div>
    );
};

export default ArbeidstidPeriodeForm;