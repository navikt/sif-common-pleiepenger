import React from 'react';
import ResponsivePanel from '@navikt/sif-common-core/lib/components/responsive-panel/ResponsivePanel';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import Panel from 'nav-frontend-paneler';
import StoriesIntlProvider from './StoriesIntlProvider';

interface Props {
    Story: any;
    parameters?: {
        formik?: {
            initialValues?: any;
        };
        maxWidth?: string;
    };
}
const StoriesFormikWrapper: React.FunctionComponent<Props> = (props) => {
    const { Story, parameters } = props;
    const { formik, maxWidth = '600px' } = parameters || {};
    return (
        <StoriesIntlProvider locale={'nb'}>
            <ResponsivePanel style={{ maxWidth: maxWidth }} border={true}>
                <TypedFormikWrapper
                    initialValues={formik?.initialValues}
                    onSubmit={(values) => {
                        console.log('FormikWrapperSubmit', values);
                    }}
                    renderForm={() => (
                        <Panel>
                            <Story />
                        </Panel>
                    )}
                />
            </ResponsivePanel>
        </StoriesIntlProvider>
    );
};

export default StoriesFormikWrapper;
