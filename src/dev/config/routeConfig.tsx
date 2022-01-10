import React from 'react';
import ArbeidstidPeriodeEksempel from '../examples/arbeidstid-periode/ArbeidstidPeriodeEksempel';
import OmsorgstilbudPeriodeExample from '../examples/omsorgstilbud-periode/OmsorgstilbudPeriodeExample';
import Intro from '../Intro';

export interface RouteConfig {
    path: string;
    title: string;
    renderContent: () => React.ReactNode;
}

export const routes: RouteConfig[] = [
    {
        path: 'frontpage',
        title: 'Forside',
        renderContent: () => <Intro />,
    },
    {
        path: 'arbeidstid-periode',
        title: 'Arbeidstid periode',
        renderContent: () => <ArbeidstidPeriodeEksempel />,
    },
    {
        path: 'omsorgstilbud-periode',
        title: 'Omsorgstilbud periode',
        renderContent: () => <OmsorgstilbudPeriodeExample />,
    },
];

export const getRouteConfig = (pathname: string): RouteConfig | undefined => {
    return routes.find((f) => isActiveRoute(f.path, pathname));
};

export const isActiveRoute = (path: string, pathname: string): boolean => {
    return pathname.indexOf(path) >= 0;
};
