import React from 'react';

const Title = ({ text }) => {
    return (
        <div className='w-full py-5'>
            <p className='text-center sm:text-3xl text-2xl font-bold text-gray-800 mt-6 mb-5'>
                {text}
            </p>
        </div>
    );
};

export default Title;
