import React from 'react';
import Button from '@mui/joy/Button';

const SecondaryButton = ({ onClick, text }) => {
    return (
        <div className="flex justify-center mt-4 mb-8">
            <Button
                variant="outlined"
                className="py-2 px-4 rounded w-full sm:w-full md:w-4/5 lg:w-full"
                // Use outlined variant
                sx={{
                    borderRadius: 5,
                    backgroundColor: '#e3effb', // Add soft background color
                    borderColor: '#c7dff7' // Soft border color
                }}
                onClick={onClick}
            >
                {text}
            </Button>
        </div>
    );
};

export default SecondaryButton;
