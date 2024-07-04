import React from 'react';
import Button from '@mui/joy/Button';
import { styled } from '@mui/system';
const SecondaryButton = ({ children, ...props }) => {
    return (
        <Button
            variant="soft"
            sx={{ borderRadius: 0 }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default SecondaryButton;