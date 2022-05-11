import React from 'react';
import ResponsivePanel from '@navikt/sif-common-core/lib/components/responsive-panel/ResponsivePanel';
import StoriesIntlProvider from './StoriesIntlProvider';

interface Props {
    // Story: any;
    parameters?: {
        maxWidth?: string;
    };
}
const StoriesWrapper: React.FunctionComponent<Props> = (props) => {
    const { parameters } = props;
    const { maxWidth = '600px' } = parameters || {};
    return (
        <StoriesIntlProvider locale={'nb'}>
            <ResponsivePanel style={{ maxWidth: maxWidth }} border={true}>
                {props.children}
            </ResponsivePanel>
        </StoriesIntlProvider>
    );
};

export default StoriesWrapper;
