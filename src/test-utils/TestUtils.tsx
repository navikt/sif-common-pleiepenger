import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import Modal from 'react-modal';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';
import IntlPolyfill from 'intl';
import AppIntlProvider from '../dev/components/app-intl-provider/AppIntlProvider';

// const modalRoot = document.createElement('div');
// modalRoot.setAttribute('id', 'modal-root');
// document.body.appendChild(modalRoot);

Modal.setAppElement(document.createElement('div'));

const setupTests = () => {
    global.Intl = IntlPolyfill;
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
