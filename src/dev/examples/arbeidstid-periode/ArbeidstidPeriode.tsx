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
            <PageIntro title="@navikt/sif-common-formik">
                <h2>Arbeidstid periode</h2>
            </PageIntro>

            <TypedFormikWrapper<FormValues>
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log('FormikWrapperSubmit', values);
                }}
                renderForm={() => <Panel>whoa</Panel>}
            />
        </>
    );
};

export default ArbeidstidPeriode;
