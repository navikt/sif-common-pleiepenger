import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import Panel from 'nav-frontend-paneler';
import React from 'react';
import AppIntlProvider from '../dev/components/app-intl-provider/AppIntlProvider';

interface Props {
    Story: any;
    parameters?: {
        formik?: {
            initialValues?: any;
        };
    };
}
const StoriesFormikWrapper: React.FunctionComponent<Props> = (props) => {
    const { Story, parameters } = props;
    return (
        <AppIntlProvider locale={'nb'}>
            <TypedFormikWrapper
                initialValues={parameters?.formik?.initialValues}
                onSubmit={(values) => {
                    console.log('FormikWrapperSubmit', values);
                }}
                renderForm={() => (
                    <Panel>
                        <Story />
                    </Panel>
                )}
            />
        </AppIntlProvider>
    );
};

export default StoriesFormikWrapper;
