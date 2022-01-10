import React from 'react';
import ArbeidstidPeriodeDoc from '../docs/arbeidstid-periode/ArbeidstidPeriodeDoc';
import OmsorgstilbudPeriodeDoc from '../docs/omsorgstilbud-periode/OmsorgstilbudPeriodeDoc';
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
        renderContent: () => <ArbeidstidPeriodeDoc />,
    },
    {
        path: 'omsorgstilbud-periode',
        title: 'Omsorgstilbud periode',
        renderContent: () => <OmsorgstilbudPeriodeDoc />,
    },
];

export const getRouteConfig = (pathname: string): RouteConfig | undefined => {
    return routes.find((f) => isActiveRoute(f.path, pathname));
};

export const isActiveRoute = (path: string, pathname: string): boolean => {
    return pathname.indexOf(path) >= 0;
};
