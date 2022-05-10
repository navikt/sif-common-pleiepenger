import React, { useState } from 'react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import { DateDurationMap, DateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import TidEnkeltdagDialog from '../../../sif-common-pleiepenger/tid/tid-enkeltdag-dialog/TidEnkeltdagDialog';
import { TidEnkeltdagEndring } from '../../../sif-common-pleiepenger/tid/tid-enkeltdag-dialog/TidEnkeltdagForm';
import PageIntro from '../../components/page-intro/PageIntro';

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
    const periode: DateRange = { from: ISODateToDate('2022-02-03'), to: ISODateToDate('2022-02-30') };

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
                                tidOpprinnelig: {
                                    hours: '1',
                                    minutes: '30',
                                },
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
