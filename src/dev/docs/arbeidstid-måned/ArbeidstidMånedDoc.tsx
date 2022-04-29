import React, { useState } from 'react';
import { DateDurationMap, DateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import ArbeidstidMåned from '../../../sif-common-pleiepenger/arbeidstid/arbeidstid-måned/ArbeidstidMåned';
import PageIntro from '../../components/page-intro/PageIntro';
import { ArbeidsforholdType } from '../../../sif-common-pleiepenger';
import { TidEnkeltdagEndring } from '../../../sif-common-pleiepenger/tid/tid-enkeltdag-dialog/TidEnkeltdagForm';

const ArbeidstidMånedDoc = () => {
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
                <h2>ArbeidstidMåned</h2>
                <ArbeidstidMåned
                    arbeidsforholdType={ArbeidsforholdType.ANSATT}
                    måned={måned}
                    arbeidsstedNavn="Snekkeriet tykk tommel"
                    periode={periode}
                    skjulIngenTidEnkeltdag={true}
                    månedTittelRenderer={() => <div>ahows</div>}
                    tidArbeidstid={tid}
                    onEnkeltdagChange={handleOnEnkeltdagChange}
                />
            </PageIntro>
        </>
    );
};

export default ArbeidstidMånedDoc;
