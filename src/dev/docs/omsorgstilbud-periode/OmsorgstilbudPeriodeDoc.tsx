import React from 'react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import { ISODateToDate } from '@navikt/sif-common-utils/lib';
import Panel from 'nav-frontend-paneler';
import { OmsorgstilbudPeriode } from '../../../sif-common-pleiepenger';
import PageIntro from '../../components/page-intro/PageIntro';
import { DateRange } from '../../utils/dateUtils';
import { FormValues } from './types';
import MessagesPreview from '@navikt/sif-common-core/lib/dev-utils/intl/messages-preview/MessagesPreview';
import { omsorgstibudPeriodeMessages } from '../../../sif-common-pleiepenger/omsorgstilbud-periode/omsorgstilbudPeriodeMessages';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import FormValidationErrorMessages from '../../components/validation-error-messages/ValidationErrorMessages';
import flat from 'flat';
import { OmsorgstilbudPeriodeFormErrors } from '../../../sif-common-pleiepenger/omsorgstilbud-periode/omsorgstilbud-periode-form/OmsorgstilbudPeriodeForm';

const initialValues: FormValues = {
    tid: {},
};

const OmsorgstilbudPeriodeDoc = () => {
    const periode: DateRange = { from: ISODateToDate('2021-12-01'), to: ISODateToDate('2022-01-05') };
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
                        <OmsorgstilbudPeriode
                            registrerKnappLabel="Registrer tid i omsorgstilbud"
                            periode={periode}
                            gjelderFortid={true}
                            onPeriodeChange={(data) => {
                                console.log(data);
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
