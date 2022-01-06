import React from 'react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import Panel from 'nav-frontend-paneler';
import PageIntro from '../../components/page-intro/PageIntro';
import { FormValues } from './types';
import {
    ArbeidsforholdType,
    getArbeidstidIPeriodeIntlValues,
    RegistrerArbeidstidPeriode,
} from '../../../sif-common-pleiepenger';
import { useIntl } from 'react-intl';
import { ISODateToDate } from '@navikt/sif-common-utils/lib';
import { DateRange } from '../../utils/dateUtils';

const initialValues: FormValues = {
    tid: {},
};

const ArbeidstidPeriodeEksempel = () => {
    const intl = useIntl();

    const periode: DateRange = { from: ISODateToDate('2021-01-01'), to: ISODateToDate('2021-01-31') };
    const jobberNormaltTimer = 30;
    const arbeidsstedNavn = 'NAV';

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
        erHistorisk: true,
        periode,
        arbeidsforhold: {
            jobberNormaltTimer,
            type: ArbeidsforholdType.ANSATT,
            arbeidsstedNavn,
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
                        <RegistrerArbeidstidPeriode
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
        </>
    );
};

export default ArbeidstidPeriodeEksempel;
