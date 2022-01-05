import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { DateRange, InputTime } from '@navikt/sif-common-formik/lib';
import {
    DateDurationMap,
    dateToISODate,
    getDatesInDateRange,
    getDurationForISOWeekday,
    ISODateToDate,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { Knapp } from 'nav-frontend-knapper';
import OmsorgstilbudPeriodeDialog from './OmsorgstilbudPeriodeDialog';
import { OmsorgstilbudPeriodeData } from './OmsorgstilbudPeriodeForm';

interface Props {
    periode: DateRange;
    gjelderFortid: boolean;
    onPeriodeChange: (tid: DateDurationMap) => void;
}

const oppdaterDagerIPeriode = ({ fom, tom, tidFasteDager }: OmsorgstilbudPeriodeData): DateDurationMap => {
    const datoerIPeriode = getDatesInDateRange({ from: fom, to: tom }, true);
    const dagerSomSkalEndres: DateDurationMap = {};
    const ingenTid: InputTime = { hours: '0', minutes: '0' };
    datoerIPeriode.forEach((dato) => {
        const isoDate = dateToISODate(dato);
        const varighet =
            getDurationForISOWeekday(tidFasteDager, dayjs(ISODateToDate(isoDate)).isoWeekday()) || ingenTid;
        dagerSomSkalEndres[isoDate] = { ...varighet };
    });
    return dagerSomSkalEndres;
};

const RegistrerOmsorgstilbudPeriodeKnapp: React.FC<Props> = ({ periode, gjelderFortid, onPeriodeChange }) => {
    const [visPeriode, setVisPeriode] = useState(false);

    const handleFormSubmit = (data: OmsorgstilbudPeriodeData) => {
        setVisPeriode(false);
        setTimeout(() => {
            onPeriodeChange(oppdaterDagerIPeriode(data));
        });
    };

    return (
        <>
            <Knapp htmlType="button" onClick={() => setVisPeriode(true)} mini={true}>
                <FormattedMessage id="omsorgstilbudPeriodeDialog.contentLabel" />
            </Knapp>
            <OmsorgstilbudPeriodeDialog
                periode={periode}
                gjelderFortid={gjelderFortid}
                isOpen={visPeriode}
                onCancel={() => setVisPeriode(false)}
                onSubmit={handleFormSubmit}
            />
        </>
    );
};

export default RegistrerOmsorgstilbudPeriodeKnapp;
