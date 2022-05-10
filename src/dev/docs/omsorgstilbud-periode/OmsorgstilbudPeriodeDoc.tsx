import React, { useState } from 'react';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import MessagesPreview from '@navikt/sif-common-core/lib/dev-utils/intl/messages-preview/MessagesPreview';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import { DateDurationMap, DateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import flat from 'flat';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { OmsorgstilbudPeriodeDialog } from '../../../sif-common-pleiepenger';
import {
    OmsorgstilbudPeriodeData,
    OmsorgstilbudPeriodeFormErrors,
} from '../../../sif-common-pleiepenger/omsorgstilbud/omsorgstilbud-periode/components/omsorgstilbud-periode-form/OmsorgstilbudPeriodeForm';
import { omsorgstibudPeriodeMessages } from '../../../sif-common-pleiepenger/omsorgstilbud/omsorgstilbud-periode/i18n/omsorgstilbudPeriodeMessages';
import PageIntro from '../../components/page-intro/PageIntro';
import FormValidationErrorMessages from '../../components/validation-error-messages/ValidationErrorMessages';

export enum FormFields {
    'tid' = 'tid',
}

export interface CompletedFormValues {
    [FormFields.tid]: DateDurationMap;
}

export type FormValues = Partial<CompletedFormValues>;

const initialValues: FormValues = {
    tid: {},
};

const OmsorgstilbudPeriodeDoc = () => {
    const periode: DateRange = { from: ISODateToDate('2021-12-01'), to: ISODateToDate('2022-01-05') };

    const [visDialog, setVisDialog] = useState(false);

    const handleFormSubmit = (data: OmsorgstilbudPeriodeData) => {
        setVisDialog(false);
        setTimeout(() => {
            console.log(data);
        });
    };

    return (
        <>
            <PageIntro title="@navikt/sif-common-pleiepenger">
                <h2>OmsorgstilbudPeriode eksempel</h2>
            </PageIntro>
            <TypedFormikWrapper<FormValues>
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log('FormikWrapperSubmit', values);
                }}
                renderForm={() => (
                    <Panel>
                        <Knapp htmlType="button" onClick={() => setVisDialog(true)} mini={true}>
                            Registrer arbeid for en periode
                        </Knapp>

                        <OmsorgstilbudPeriodeDialog
                            isOpen={visDialog}
                            formProps={{
                                periode,
                                onCancel: () => setVisDialog(false),
                                onSubmit: handleFormSubmit,
                            }}
                        />
                    </Panel>
                )}
            />
            <Box margin="xxl" padBottom="l">
                <FormValidationErrorMessages
                    validationErrorIntlKeys={flat(OmsorgstilbudPeriodeFormErrors)}
                    intlMessages={omsorgstibudPeriodeMessages}
                />
            </Box>

            <MessagesPreview title="Alle tekster" messages={omsorgstibudPeriodeMessages} showExplanation={false} />
        </>
    );
};

export default OmsorgstilbudPeriodeDoc;
