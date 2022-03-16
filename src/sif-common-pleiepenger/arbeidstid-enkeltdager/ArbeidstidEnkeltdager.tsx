import { DateRange } from '@navikt/sif-common-formik/lib';
import { InputDateDurationMap } from '@navikt/sif-common-utils/lib';
import React from 'react';
import ArbeidstidUkerInput from './arbeidstid-uke-input/ArbeidstidUkerInput';

interface Props {
    periode: DateRange;
    arbeidstid: InputDateDurationMap;
    normalarbeidstid: InputDateDurationMap;
}

const ArbeidstidEnkeltdager: React.FunctionComponent<Props> = ({ periode }) => {
    return (
        <>
            <ArbeidstidUkerInput periode={periode} fieldName="arbeidstid" fieldNameNormaltid="normalarbeidstid" />
        </>
    );
};

export default ArbeidstidEnkeltdager;