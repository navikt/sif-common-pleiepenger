import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import MessagesPreview from '@navikt/sif-common-core/lib/dev-utils/intl/messages-preview/MessagesPreview';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import { DateDurationMap, DateRange, ISODateToDate, Weekday } from '@navikt/sif-common-utils/lib';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { ArbeidsforholdType, ArbeidstidPeriodeData, ArbeidstidPeriodeDialog } from '../../../sif-common-pleiepenger';
import { arbeidstidPeriodeMessages } from '../../../sif-common-pleiepenger/arbeidstid/arbeidstid-periode-dialog/i18n/arbeidstidPeriodeMessages';
import { getArbeidstidIPeriodeIntlValues } from '../../../sif-common-pleiepenger/arbeidstid/arbeidstid-periode-dialog/utils/arbeidstidPeriodeIntlValuesUtils';
import PageIntro from '../../components/page-intro/PageIntro';

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

const ArbeidstidPeriodeDialogDoc = () => {
    const intl = useIntl();

    const periode: DateRange = { from: ISODateToDate('2021-12-10'), to: ISODateToDate('2022-01-05') };
    const jobberNormaltTimer = 30;
    const arbeidsstedNavn = 'NAV';

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
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
                                periode,
                                arbeidsstedNavn,
                                utilgjengeligeUkedager: [Weekday.monday],
                                intlValues,
                                onCancel: () => setVisPeriode(false),
                                onSubmit: handleFormSubmit,
                            }}
                            isOpen={visPeriode}
                        />
                    </Panel>
                )}
            />
            <MessagesPreview title="Alle tekster" messages={arbeidstidPeriodeMessages} showExplanation={false} />
        </>
    );
};

export default ArbeidstidPeriodeDialogDoc;
