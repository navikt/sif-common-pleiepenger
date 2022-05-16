import React from 'react';
import ResponsivePanel from '@navikt/sif-common-core/lib/components/responsive-panel/ResponsivePanel';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import Panel from 'nav-frontend-paneler';

const withFormikProvider = (props) => {
    const { Story, parameters } = props;
    const { formik, maxWidth = '600px' } = parameters || {};
    return (
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
    );
};

export default withFormikProvider;
