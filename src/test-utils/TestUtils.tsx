import { MatcherFunction, render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import Modal from 'react-modal';
import IntlPolyfill from 'intl';
import AppIntlProvider from '../dev/components/app-intl-provider/AppIntlProvider';

Modal.setAppElement(document.createElement('div'));

const setupTests = () => {
    if (global.Intl) {
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    } else {
        global.Intl = IntlPolyfill;
    }
};

setupTests();

const Providers = ({ children }) => {
    return <AppIntlProvider locale={'nb'}>{children}</AppIntlProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };

type Query = (f: MatcherFunction) => HTMLElement;

export const withMarkup =
    (query: Query) =>
    (text: string): HTMLElement =>
        query((content: string, node: any) => {
            const hasText = (node: HTMLElement) => node.textContent === text;
            const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child as HTMLElement));
            return hasText(node) && childrenDontHaveText;
        });
