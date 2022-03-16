import React from 'react';
import Box from '../../components/box/Box';
import PageIntro from '../../components/page-intro/PageIntro';
import ArbeidstidEnkeltdagerListeDoc from './arbeidstid-enkeltdager-liste-doc/ArbeidstidEnkeltdagerListeDoc';
import ArbeidstidFasteDagerListeDoc from './arbeidstid-faste-dager-liste-doc/ArbeidstidFasteDagerListeDoc';

const OppsummeringDoc: React.FunctionComponent = () => {
    return (
        <>
            <PageIntro title="@navikt/sif-common-pleiepenger">
                <h2>Oppsummeringskomponenter</h2>
            </PageIntro>
            <Box margin="l">
                <ArbeidstidFasteDagerListeDoc />
            </Box>
            <Box margin="l">
                <ArbeidstidEnkeltdagerListeDoc />
            </Box>
        </>
    );
};

export default OppsummeringDoc;
