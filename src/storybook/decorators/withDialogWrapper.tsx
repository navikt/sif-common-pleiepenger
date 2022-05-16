import React from 'react';
import '../styles/navFrontendOverride.css';

export const withDialogWrapperSmall = (Story) => {
    return (
        <DialogWrapper>
            <Story />
        </DialogWrapper>
    );
};

export const withDialogWrapperMedium = (Story) => {
    return (
        <DialogWrapper width="640px">
            <Story />
        </DialogWrapper>
    );
};

export const withDialogWrapperWide = (Story) => {
    return (
        <DialogWrapper width="800px">
            <Story />
        </DialogWrapper>
    );
};

interface Props {
    width?: string;
}

const DialogWrapper: React.FunctionComponent<Props> = ({ children, width }) => (
    <div
        style={{
            maxWidth: width || '480px',
            border: '2px solid #ccc',
            borderRadius: '.25rem',
            padding: '1.5rem',
            boxShadow: '0 0 10px rgba(0,0,0,.2)',
        }}>
        {children}
    </div>
);

export default DialogWrapper;
