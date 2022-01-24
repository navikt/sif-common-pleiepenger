import React, { useState } from 'react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import { DateDurationMap, DateRange, ISODateRangeToDateRange, isValidDuration } from '@navikt/sif-common-utils/lib';
import ArbeidstidMånedInfo from '../../../sif-common-pleiepenger/arbeidstid-måned-info/ArbeidstidMånedInfo';
import PageIntro from '../../components/page-intro/PageIntro';
import { ArbeidsforholdType } from '../../../sif-common-pleiepenger';
import { TidEnkeltdagEndring } from '../../../sif-common-pleiepenger/tid-enkeltdag-dialog/TidEnkeltdagForm';

export enum FormFields {
    'tid' = 'tid',
}

export interface CompletedFormValues {
    [FormFields.tid]: DateDurationMap;
}

export type FormValues = Partial<CompletedFormValues>;

const initialValues: FormValues = {
    tid: {},
};

const ArbeidstidMånedInfoDoc = () => {
    const måned: DateRange = ISODateRangeToDateRange('2021-01-01/2021-01-31');
    const periode: DateRange = ISODateRangeToDateRange('2020-11-01/2021-05-01');

    const [tid, setTid] = useState<DateDurationMap>({});

    const handleOnEnkeltdagChange = ({ dagerMedTid }: TidEnkeltdagEndring) => {
        const nyTid: DateDurationMap = { ...tid };
        Object.keys(dagerMedTid).forEach((key) => {
            nyTid[key] = dagerMedTid[key];
        });
        setTid(nyTid);
    };
    return (
        <>
            <PageIntro title="@navikt/sif-common-pleiepenger">
                <h2>ArbeidstidMånedInfo</h2>
                <ArbeidstidMånedInfo
                    arbeidsforholdType={ArbeidsforholdType.ANSATT}
                    måned={måned}
                    arbeidsstedNavn="Snekkeriet tykk tommel"
                    periode={periode}
                    tidArbeidstid={tid}
                    onEnkeltdagChange={handleOnEnkeltdagChange}
                />
            </PageIntro>
        </>
    );
};

export default ArbeidstidMånedInfoDoc;
