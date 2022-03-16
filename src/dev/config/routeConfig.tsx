import React from 'react';
import ArbeidstidPeriodeDoc from '../docs/arbeidstid-periode/ArbeidstidPeriodeDoc';
import TidsbrukKalenderDoc from '../docs/tidsbruk-kalender/TidsbrukKalenderDoc';
import OmsorgstilbudPeriodeDoc from '../docs/omsorgstilbud-periode/OmsorgstilbudPeriodeDoc';
import TidEnkeltdagDialogDoc from '../docs/tid-enkeltdag/TidEnkeltdagDialogDoc';
import Intro from '../Intro';
import ArbeidstidMånedInfoDoc from '../docs/arbeidstid-måned-info/ArbeidstidMånedInfoDoc';
import ArbeidstidEnkeltdagerDoc from '../docs/arbeidstid-enkeltdager/ArbeidstidEnkeltdagerDoc';
import OppsummeringDoc from '../docs/oppsummering/OppsummeringDoc';

export interface RouteConfig {
    path: string;
    title: string;
    renderContent: () => React.ReactNode;
}

export const routes: RouteConfig[] = [
    {
        path: '/frontpage',
        title: 'Forside',
        renderContent: () => <Intro />,
    },
    {
        path: '/arbeidstid-periode',
        title: 'Arbeidstid periode',
        renderContent: () => <ArbeidstidPeriodeDoc />,
    },
    {
        path: '/omsorgstilbud-periode',
        title: 'Omsorgstilbud periode',
        renderContent: () => <OmsorgstilbudPeriodeDoc />,
    },
    {
        path: '/tid-enkeltdag',
        title: 'Tid enkeltdag',
        renderContent: () => <TidEnkeltdagDialogDoc />,
    },
    {
        path: '/arbeidstid-måned-info',
        title: 'Arbeidstid i en måned',
        renderContent: () => <ArbeidstidMånedInfoDoc />,
    },
    {
        path: '/tidsbruk-kalender',
        title: 'TidsbrukKalender',
        renderContent: () => <TidsbrukKalenderDoc />,
    },
    {
        path: '/arbeidstid-enkeltdager',
        title: 'ArbeidstidEnkeltdager',
        renderContent: () => <ArbeidstidEnkeltdagerDoc />,
    },
    {
        path: '/oppsummering',
        title: 'Oppsummering',
        renderContent: () => <OppsummeringDoc />,
    },
];

export const getRouteConfig = (pathname: string): RouteConfig | undefined => {
    return routes.find((f) => isActiveRoute(f.path, pathname));
};

export const isActiveRoute = (path: string, pathname: string): boolean => {
    return pathname.indexOf(path) === 0;
};
