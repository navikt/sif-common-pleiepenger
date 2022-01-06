import React from 'react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import Panel from 'nav-frontend-paneler';
import PageIntro from '../../components/page-intro/PageIntro';
import { FormValues } from './types';

const initialValues: FormValues = {
    tid: {},
};

const ArbeidstidPeriode = () => {
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
                renderForm={() => <Panel></Panel>}
            />
        </>
    );
};

export default ArbeidstidPeriode;
