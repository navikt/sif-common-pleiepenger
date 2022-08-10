import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import ArbeidstidEnkeltdagerOppsummering from '../../../../sif-common-pleiepenger/arbeidstid/arbeidstid-enkeltdager-oppsummering-liste/ArbeidstidEnkeltdagerOppsummeringListe';
import Box from '../../../components/box/Box';

const ArbeidstidEnkeltdagerListeDoc = () => (
    <Panel>
        <Undertittel>ArbeidstidEnkeltdagerListe</Undertittel>
        <Box margin="l">
            <ArbeidstidEnkeltdagerOppsummering
                dager={[{ dato: '2022-01-03', arbeidstimer: { faktiskTimer: 'PT5H30M', normalTimer: 'PT7H30M' } }]}
                visNormaltid={true}
            />
        </Box>
    </Panel>
);

export default ArbeidstidEnkeltdagerListeDoc;
