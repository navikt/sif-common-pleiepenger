import React, { useState } from 'react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import { DateDurationMap, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import PageIntro from '../../components/page-intro/PageIntro';
import { DateRange } from '../../utils/dateUtils';
import TidEnkeltdagDialog from '../../../sif-common-pleiepenger/tid-enkeltdag-dialog/TidEnkeltdagDialog';
import { TidEnkeltdagEndring } from '../../../sif-common-pleiepenger/tid-enkeltdag-dialog/TidEnkeltdagForm';

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

const TidEnkeltdagDialogDoc = () => {
    const periode: DateRange = { from: ISODateToDate('2021-12-01'), to: ISODateToDate('2022-01-05') };

    const [visDialog, setVisDialog] = useState(false);

    const handleFormSubmit = (dagerMedTid: TidEnkeltdagEndring) => {
        setVisDialog(false);
        setTimeout(() => {
            console.log(dagerMedTid);
        });
    };

    return (
        <>
            <PageIntro title="@navikt/sif-common-pleiepenger">
                <h2>Tid enkeltdag eksempel</h2>
            </PageIntro>
            <TypedFormikWrapper<FormValues>
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log('FormikWrapperSubmit', values);
                }}
                renderForm={() => (
                    <Panel>
                        <Knapp htmlType="button" onClick={() => setVisDialog(true)} mini={true}>
                            Registrer arbeid for en dag
                        </Knapp>

                        <TidEnkeltdagDialog
                            isOpen={visDialog}
                            dialogTitle="Tid enkeltdag"
                            formProps={{
                                periode,
                                dato: periode.from,
                                maksTid: { hours: 7, minutes: 30 },
                                hvorMyeSpørsmålRenderer: () => 'Hvor mye tid',
                                onCancel: () => setVisDialog(false),
                                onSubmit: handleFormSubmit,
                            }}
                        />
                    </Panel>
                )}
            />
            {/* <Box margin="xxl" padBottom="l">
                <FormValidationErrorMessages
                    validationErrorIntlKeys={flat(OmsorgstilbudPeriodeFormErrors)}
                    intlMessages={omsorgstibudPeriodeMessages}
                />
            </Box>

            <MessagesPreview title="Alle tekster" messages={omsorgstibudPeriodeMessages} showExplanation={false} /> */}
        </>
    );
};

export default TidEnkeltdagDialogDoc;