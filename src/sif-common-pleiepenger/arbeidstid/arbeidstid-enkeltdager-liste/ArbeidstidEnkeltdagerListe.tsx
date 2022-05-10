import React from 'react';
import { FormattedMessage } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import { ISODateToDate, ISODurationToDuration } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import groupBy from 'lodash.groupby';
import EkspanderbartPanel from 'nav-frontend-ekspanderbartpanel';
import DagerMedTidListe from '../../common/dager-med-tid-liste/DagerMedTidListe';
import { ArbeidstidEnkeltdagApiData, DagMedTid } from '../../types';

interface Props {
    dager: ArbeidstidEnkeltdagApiData[];
    visNormaltid?: boolean;
}

const ArbeidstidEnkeltdagerListe: React.FunctionComponent<Props> = ({ dager, visNormaltid }) => {
    const arbeidsdager: DagMedTid[] = [];
    dager.forEach((dag) => {
        const dato = ISODateToDate(dag.dato);
        const tid = ISODurationToDuration(dag.arbeidstimer.faktiskTimer);
        const normaltid = ISODurationToDuration(dag.arbeidstimer.normalTimer);
        if (dato !== undefined && tid !== undefined) {
            arbeidsdager.push({ dato, tid, normaltid });
        }
    });

    const ingenDagerRegistrertMelding = <FormattedMessage id="dagerMedTid.ingenDagerRegistrert" />;
    if (dager.length === 0) {
        return ingenDagerRegistrertMelding;
    }

    const months = groupBy(arbeidsdager, ({ dato }) => `${dato.getFullYear()}.${dato.getMonth()}`);
    return (
        <div>
            {Object.keys(months).map((key) => {
                const dagerMedTid = months[key];
                if (dagerMedTid.length === 0) {
                    return ingenDagerRegistrertMelding;
                }
                return (
                    <Box margin="m" key={key}>
                        <EkspanderbartPanel
                            tittel={
                                <span style={{ textTransform: 'capitalize', fontSize: '1rem' }}>
                                    {dayjs(dagerMedTid[0].dato).format('MMMM YYYY')}
                                </span>
                            }>
                            <DagerMedTidListe dagerMedTid={dagerMedTid} viseUke={true} visNormaltid={visNormaltid} />
                        </EkspanderbartPanel>
                    </Box>
                );
            })}
        </div>
    );
};

export default ArbeidstidEnkeltdagerListe;
