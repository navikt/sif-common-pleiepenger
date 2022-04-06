import React from 'react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import { InputDateDurationMap, ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import Panel from 'nav-frontend-paneler';
import ArbeidstidUkerInput from '../../../sif-common-pleiepenger/arbeidstid-uker-input/ArbeidstidUkerInput';
import PageIntro from '../../components/page-intro/PageIntro';

interface FormValues {
    arbeidstid: InputDateDurationMap;
    normalarbeidstid: InputDateDurationMap;
}

const initialValues: FormValues = {
    arbeidstid: {},
    normalarbeidstid: {},
};

const ArbeidstidUkerInputDoc: React.FunctionComponent = () => {
    const periode = ISODateRangeToDateRange('2022-01-01/2022-02-15');
    return (
        <>
            <PageIntro title="@navikt/sif-common-pleiepenger">
                <h2>ArbeidstidUkerInput</h2>
            </PageIntro>
            <TypedFormikWrapper<FormValues>
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log('FormikWrapperSubmit', values);
                }}
                renderForm={() => {
                    return (
                        <Panel>
                            <ArbeidstidUkerInput
                                periode={periode}
                                fieldName="arbeidstid"
                                tekster={{
                                    dag: 'Dag',
                                    jobber: 'Jobber',
                                    ariaLabelTidInput: (dato) => `Hvor mye jobber du ${dato}`,
                                }}
                            />
                        </Panel>
                    );
                }}
            />
        </>
    );
};

export default ArbeidstidUkerInputDoc;
