import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import MessagesPreview from '@navikt/sif-common-core/lib/dev-utils/intl/messages-preview/MessagesPreview';
import { FormikCheckbox, TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import { DateDurationMap, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import {
    ArbeidsforholdType,
    ArbeidstidPeriodeData,
    ArbeidstidPeriodeDialog,
    getArbeidstidIPeriodeIntlValues,
} from '../../../sif-common-pleiepenger';
import { arbeidstidPeriodeMessages } from '../../../sif-common-pleiepenger/arbeidstid-periode/arbeidstidPeriodeMessages';
import PageIntro from '../../components/page-intro/PageIntro';
import { DateRange } from '../../utils/dateUtils';

enum FormFields {
    'tid' = 'tid',
}

interface CompletedFormValues {
    [FormFields.tid]: DateDurationMap;
}

type FormValues = Partial<CompletedFormValues>;

const initialValues: FormValues = {
    tid: {},
};

const ArbeidstidPeriodeDoc = () => {
    const intl = useIntl();

    const [spørOmBrukerSkalJobbeIPerioden, setSpørOmBrukerSkalJobbeIPerioden] = useState<boolean>(false);

    const periode: DateRange = { from: ISODateToDate('2021-12-01'), to: ISODateToDate('2022-01-05') };
    const jobberNormaltTimer = 30;
    const arbeidsstedNavn = 'NAV';

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
        erHistorisk: true,
        periode,
        arbeidsforhold: {
            jobberNormaltTimer,
            type: ArbeidsforholdType.ANSATT,
            arbeidsstedNavn: arbeidsstedNavn,
        },
    });

    const [visPeriode, setVisPeriode] = useState(false);

    const handleFormSubmit = (data: ArbeidstidPeriodeData) => {
        setVisPeriode(false);
        setTimeout(() => {
            console.log(data);
        });
    };

    return (
        <>
            <PageIntro title="@navikt/sif-common-pleiepenger">
                <h2>ArbeidstidPeriodeDialog</h2>
            </PageIntro>
            <TypedFormikWrapper<FormValues>
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log('FormikWrapperSubmit', values);
                }}
                renderForm={() => (
                    <Panel>
                        <Knapp htmlType="button" onClick={() => setVisPeriode(true)} mini={true}>
                            Registrer arbeid for en periode
                        </Knapp>
                        <ArbeidstidPeriodeDialog
                            formProps={{
                                jobberNormaltTimer,
                                periode,
                                arbeidsstedNavn,
                                spørOmBrukerSkalJobbeIPerioden,
                                intlValues,
                                onCancel: () => setVisPeriode(false),
                                onSubmit: handleFormSubmit,
                            }}
                            isOpen={visPeriode}
                        />

                        <Box margin="l">
                            <FormikCheckbox
                                name="spørOmBrukerSkalJobbeIPerioden"
                                label="Skal spørre om en arbeider i perioden"
                                checked={spørOmBrukerSkalJobbeIPerioden}
                                useFastField={false}
                                afterOnChange={(checked) => {
                                    setSpørOmBrukerSkalJobbeIPerioden(checked);
                                }}
                            />
                        </Box>
                    </Panel>
                )}
            />
            <MessagesPreview title="Alle tekster" messages={arbeidstidPeriodeMessages} showExplanation={false} />
        </>
    );
};

export default ArbeidstidPeriodeDoc;
