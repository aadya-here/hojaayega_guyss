import React from 'react';

const AuthField = ({ icon, placeholder, handleInputChange, type }) => {
    return (
        <div className="w-full flex justify-center">
            <div className="my-2 bg-whiterounded-md flex items-center space-x-4 w-full sm:w-4/5 md:w-4/5 lg:w-full   " style={{ maxWidth: '600px' }}>
                {/* <img src={icon} alt="icon" className="w-6 h-6" /> */}
                <input
                    type={type}
                    placeholder={placeholder}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="border rounded w-full p-2 h-10"
                    color='bg-blue-50'
                />
            </div>
        </div>
    );
};

export default AuthField;
