import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { dateToday } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import getTimeValidator from '@navikt/sif-common-formik/lib/validation/getTimeValidator';
import getIntlFormErrorHandler from '@navikt/sif-common-formik/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik/lib/validation/types';
import dayjs from 'dayjs';
import { Undertittel } from 'nav-frontend-typografi';
import { dateFormatter } from '@navikt/sif-common-utils';
import { ensureDuration, Duration } from '@navikt/sif-common-utils';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
interface Props {
    dato: Date;
    tid?: Partial<Duration>;
    onSubmit: (tid: Duration) => void;
    onCancel: () => void;
}

enum FormFields {
    'tid' = 'tid',
}

interface FormValues {
    [FormFields.tid]: Partial<Duration>;
}

const FormComponents = getTypedFormComponents<FormFields, FormValues, ValidationError>();

const bem = bemUtils('omsorgstilbudEnkeltdagEdit');

const OmsorgstilbudEnkeltdagForm: React.FunctionComponent<Props> = ({ dato, tid, onSubmit, onCancel }) => {
    const intl = useIntl();
    const erHistorisk = dayjs(dato).isBefore(dateToday, 'day');

    const onValidSubmit = (value: Partial<FormValues>) => {
        if (value.tid) {
            onSubmit(ensureDuration(value.tid));
        }
    };
    return (
        <div>
            <Undertittel tag="h1" className={bem.element('tittel')}>
                <FormattedMessage id="omsorgstilbudEnkeltdagForm.tittel" values={{ dato: dateFormatter.full(dato) }} />
            </Undertittel>
            <FormBlock margin="l">
                <FormComponents.FormikWrapper
                    initialValues={{
                        tid,
                    }}
                    onSubmit={onValidSubmit}
                    renderForm={() => {
                        return (
                            <FormComponents.Form
                                onCancel={onCancel}
                                formErrorHandler={getIntlFormErrorHandler(
                                    intl,
                                    'omsorgstilbudEnkeltdagForm.validation'
                                )}
                                includeValidationSummary={false}
                                includeButtons={true}
                                submitButtonLabel="Lagre"
                                cancelButtonLabel="Avbryt">
                                <FormComponents.TimeInput
                                    name={FormFields.tid}
                                    label={intlHelper(
                                        intl,
                                        erHistorisk
                                            ? 'omsorgstilbudEnkeltdagForm.tid.spm.historisk'
                                            : 'omsorgstilbudEnkeltdagForm.tid.spm',
                                        {
                                            dato: dateFormatter.extended(dato),
                                        }
                                    )}
                                    validate={getTimeValidator({ max: { hours: 7, minutes: 30 } })}
                                    timeInputLayout={{ justifyContent: 'left', compact: false, direction: 'vertical' }}
                                />
                            </FormComponents.Form>
                        );
                    }}
                />
            </FormBlock>
        </div>
    );
};

export default OmsorgstilbudEnkeltdagForm;
