import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import AppIntlProvider from './dev/components/app-intl-provider/AppIntlProvider';
import DevPage from './dev/DevPage';
import './dev/styles/globalStyles.less';

const App: React.FC = () => {
    return (
        <Normaltekst tag="div">
            <AppIntlProvider locale={'nb'}>
                <DevPage />
            </AppIntlProvider>
        </Normaltekst>
    );
};

export default App;
