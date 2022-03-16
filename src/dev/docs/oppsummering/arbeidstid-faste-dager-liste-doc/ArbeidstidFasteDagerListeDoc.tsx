import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import ArbeidstidFasteDagerListe from '../../../../sif-common-pleiepenger/dager-med-tid/ArbeidstidFasteDagerListe';
import Box from '../../../components/box/Box';

const ArbeidstidFasteDagerListeDoc = () => (
    <Panel>
        <Undertittel>Arbeidstid faste dager</Undertittel>
        <Box margin="l">
            <ArbeidstidFasteDagerListe
                visNormaltid={true}
                fasteDager={{
                    mandag: {
                        faktiskTimer: 'PT0H0M',
                        normalTimer: 'PT5H0M',
                    },
                    tirsdag: {
                        faktiskTimer: 'PT0H0M',
                        normalTimer: 'PT5H0M',
                    },
                    onsdag: {
                        faktiskTimer: 'PT2H30M',
                        normalTimer: 'PT5H0M',
                    },
                    torsdag: {
                        faktiskTimer: 'PT0H0M',
                        normalTimer: 'PT5H0M',
                    },
                    fredag: {
                        faktiskTimer: 'PT5H0M',
                        normalTimer: 'PT5H0M',
                    },
                }}
            />
        </Box>
    </Panel>
);

export default ArbeidstidFasteDagerListeDoc;
