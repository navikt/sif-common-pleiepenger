import React from 'react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import { ISODateToDate } from '@navikt/sif-common-utils/lib';
import Panel from 'nav-frontend-paneler';
import { OmsorgstilbudPeriode } from '../../../sif-common-pleiepenger';
import PageIntro from '../../components/page-intro/PageIntro';
import { DateRange } from '../../utils/dateUtils';
import { FormValues } from './types';

const initialValues: FormValues = {
    tid: {},
};

const OmsorgstilbudPeriodeExample = () => {
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
        </>
    );
};

export default OmsorgstilbudPeriodeExample;
