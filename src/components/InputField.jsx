import React from 'react'

export const InputField = ({ icon, placeholder, handleInputChange }) => {
    return (
        <>
            <div className="my-2 p-4 bg-white shadow-md rounded-md flex items-center space-x-4 sm:w-1/3 w-4/5">
                <img src={icon} alt="icon" className="w-6 h-6" />
                <input
                    type="text"
                    placeholder={placeholder}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="border rounded w-full p-2 h-10"
                />
            </div>
        </>
    )
}
