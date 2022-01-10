import React from 'react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import Panel from 'nav-frontend-paneler';
import PageIntro from '../../components/page-intro/PageIntro';
import { FormValues } from './types';
import {
    ArbeidsforholdType,
    getArbeidstidIPeriodeIntlValues,
    ArbeidstidPeriode,
} from '../../../sif-common-pleiepenger';
import { useIntl } from 'react-intl';
import { ISODateToDate } from '@navikt/sif-common-utils/lib';
import { DateRange } from '../../utils/dateUtils';
import MessagesPreview from '@navikt/sif-common-core/lib/dev-utils/intl/messages-preview/MessagesPreview';
import { arbeidstidPeriodeMessages } from '../../../sif-common-pleiepenger/arbeidstid-periode/arbeidstidPeriodeMessages';

const initialValues: FormValues = {
    tid: {},
};

const ArbeidstidPeriodeDoc = () => {
    const intl = useIntl();

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
                        <ArbeidstidPeriode
                            registrerKnappLabel="Legg til arbeid i periode"
                            jobberNormaltTimer={jobberNormaltTimer}
                            periode={periode}
                            arbeidsstedNavn={arbeidsstedNavn}
                            onPeriodeChange={(data) => {
                                console.log(data);
                            }}
                            intlValues={intlValues}
                        />
                    </Panel>
                )}
            />
            <MessagesPreview title="Alle tekster" messages={arbeidstidPeriodeMessages} showExplanation={false} />
        </>
    );
};

export default ArbeidstidPeriodeDoc;
