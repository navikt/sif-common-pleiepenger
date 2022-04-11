import React from 'react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import { InputDateDurationMap, ISODateRangeToDateRange, Weekday } from '@navikt/sif-common-utils/lib';
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
                renderForm={({ values }) => {
                    return (
                        <Panel>
                            <ArbeidstidUkerInput
                                periode={periode}
                                arbeidstid={values.arbeidstid}
                                fieldName="arbeidstid"
                                utilgjengeligeUkedager={[Weekday.monday, Weekday.thursday]}
                                normalarbeidstidUkedager={{
                                    tuesday: { hours: '8', minutes: '0' },
                                    wednesday: { hours: '4', minutes: '0' },
                                    friday: { hours: '8', minutes: '0' },
                                }}
                                tekster={{
                                    dag: 'Dag',
                                    jobber: 'Timer med jobb',
                                    fravær: 'Borte fra jobb',
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
