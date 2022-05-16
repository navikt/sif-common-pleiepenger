import React from 'react';
import ResponsivePanel from '@navikt/sif-common-core/lib/components/responsive-panel/ResponsivePanel';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik/lib';

interface Props {
    parameters?: {
        formik: any;
        includeButtons?: boolean;
        maxWidth?: string;
    };
}
export const StoryFormikWrapper: React.FunctionComponent<Props> = (props) => {
    const { children, parameters } = props;
    const { formik, maxWidth = '800px', includeButtons = false } = parameters || {};
    return (
        <ResponsivePanel style={{ maxWidth: maxWidth }} border={true}>
            <TypedFormikWrapper
                initialValues={formik?.initialValues || {}}
                onSubmit={(values) => {
                    console.log('StoryFormikProvider', values);
                }}
                renderForm={() => <TypedFormikForm includeButtons={includeButtons}>{children}</TypedFormikForm>}
            />
        </ResponsivePanel>
    );
};
