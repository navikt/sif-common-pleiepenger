import React, { useState } from 'react';
import { DateRange } from '@navikt/sif-common-formik/lib';
import { DateDurationMap } from '@navikt/sif-common-utils';
import { Knapp } from 'nav-frontend-knapper';
import { ArbeidIPeriodeIntlValues, ArbeidstidPeriodeData, ArbeidstidPeriodeDialog } from '../';
import { getDagerMedTidFraArbeidstidPeriodeData } from './arbeidstidPeriodeUtils';

interface Props {
    registrerKnappLabel: string;
    intlValues: ArbeidIPeriodeIntlValues;
    jobberNormaltTimer: number;
    arbeidsstedNavn: string;
    periode: DateRange;
    onPeriodeChange: (tid: DateDurationMap, formData: ArbeidstidPeriodeData) => void;
}

const RegistrerArbeidstidPeriode: React.FunctionComponent<Props> = ({
    registrerKnappLabel,
    intlValues,
    arbeidsstedNavn,
    periode,
    jobberNormaltTimer,
    onPeriodeChange,
}) => {
    const [visPeriode, setVisPeriode] = useState(false);

    const handleFormSubmit = (data: ArbeidstidPeriodeData) => {
        setVisPeriode(false);
        setTimeout(() => {
            onPeriodeChange(getDagerMedTidFraArbeidstidPeriodeData(jobberNormaltTimer, data), data);
        });
    };

    return (
        <>
            <Knapp htmlType="button" onClick={() => setVisPeriode(true)} mini={true}>
                {registrerKnappLabel}
            </Knapp>
            <ArbeidstidPeriodeDialog
                intlValues={intlValues}
                periode={periode}
                jobberNormaltTimer={jobberNormaltTimer}
                arbeidsstedNavn={arbeidsstedNavn}
                isOpen={visPeriode}
                onCancel={() => setVisPeriode(false)}
                onSubmit={handleFormSubmit}
            />
        </>
    );
};

export default RegistrerArbeidstidPeriode;
