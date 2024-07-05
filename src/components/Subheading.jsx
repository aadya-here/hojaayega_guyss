import React from 'react';
import Divider from '@mui/joy/Divider';

const Subheading = ({ text }) => {
    return (
        <div className='w-full py-5'>
            <p className='text-center sm:text-2xl text-1xl font-semi-bold text-gray-800 mt-1 mb-1'>
                {text}
            </p>

        </div>
    );
};

export default Subheading;
