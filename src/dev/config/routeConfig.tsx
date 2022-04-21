import React from 'react';
import ArbeidstidMånedDoc from '../docs/arbeidstid-måned/ArbeidstidMånedDoc';
import ArbeidstidPeriodeDoc from '../docs/arbeidstid-periode/ArbeidstidPeriodeDoc';
import ArbeidstidUkerInputDoc from '../docs/arbeidstid-uker-input/ArbeidstidUkerInputDoc';
import OmsorgstilbudPeriodeDoc from '../docs/omsorgstilbud-periode/OmsorgstilbudPeriodeDoc';
import OppsummeringDoc from '../docs/oppsummering/OppsummeringDoc';
import TidEnkeltdagDialogDoc from '../docs/tid-enkeltdag/TidEnkeltdagDialogDoc';
import TidsbrukKalenderDoc from '../docs/tidsbruk-kalender/TidsbrukKalenderDoc';
import Intro from '../Intro';

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
        renderContent: () => <ArbeidstidMånedDoc />,
    },
    {
        path: '/tidsbruk-kalender',
        title: 'TidsbrukKalender',
        renderContent: () => <TidsbrukKalenderDoc />,
    },
    {
        path: '/arbeidstid-uker-input',
        title: 'ArbeidstidUkerInput',
        renderContent: () => <ArbeidstidUkerInputDoc />,
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
