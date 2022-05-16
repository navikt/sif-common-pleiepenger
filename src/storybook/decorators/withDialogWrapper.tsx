import React from 'react';
import '../styles/navFrontendOverride.css';

export const withDialogWrapper = (Story) => {
    return (
        <DialogWrapper>
            <Story />
        </DialogWrapper>
    );
};

const DialogWrapper: React.FunctionComponent = ({ children }) => (
    <div
        style={{
            maxWidth: '480px',
            border: '2px solid #ccc',
            borderRadius: '.25rem',
            padding: '1.5rem',
            boxShadow: '0 0 10px rgba(0,0,0,.2)',
        }}>
        {children}
    </div>
);

export default DialogWrapper;
