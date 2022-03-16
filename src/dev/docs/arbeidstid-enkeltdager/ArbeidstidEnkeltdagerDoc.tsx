import React from 'react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import { InputDateDurationMap, ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import Panel from 'nav-frontend-paneler';
import ArbeidstidEnkeltdager from '../../../sif-common-pleiepenger/arbeidstid-enkeltdager/ArbeidstidEnkeltdager';
import PageIntro from '../../components/page-intro/PageIntro';

interface FormValues {
    arbeidstid: InputDateDurationMap;
    normalarbeidstid: InputDateDurationMap;
}

const initialValues: FormValues = {
    arbeidstid: {},
    normalarbeidstid: {},
};

const ArbeidstidEnkeltdagerDoc: React.FunctionComponent = () => {
    const periode = ISODateRangeToDateRange('2022-01-01/2022-02-15');
    return (
        <>
            <PageIntro title="@navikt/sif-common-pleiepenger">
                <h2>Arbeidstid enkeltdager</h2>
            </PageIntro>
            <TypedFormikWrapper<FormValues>
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log('FormikWrapperSubmit', values);
                }}
                renderForm={(props) => {
                    const {
                        values: { arbeidstid, normalarbeidstid },
                    } = props;
                    return (
                        <Panel>
                            <ArbeidstidEnkeltdager
                                periode={periode}
                                arbeidstid={arbeidstid}
                                normalarbeidstid={normalarbeidstid}
                            />
                        </Panel>
                    );
                }}
            />
        </>
    );
};

export default ArbeidstidEnkeltdagerDoc;
