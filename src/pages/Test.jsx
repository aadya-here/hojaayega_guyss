import React, { useState } from 'react'
import InputField from '../components/InputField';
import locationIcon from "../assets/location.png";
import CheckListItem from '../components/CheckListItem';

export const Test = () => {
    const [projectID, setProjectID] = useState('');
    const [structure, setStructure] = useState('');
    const [quantity, setQuantity] = useState('');
    const [refDrgNo, setRefDrgNo] = useState('');
    const [location, setLocation] = useState('');

    const [availabilityOfBricks, setAvailabilityOfBricks] = useState('');

    const InputFieldParams = [
        {
            icon: locationIcon,
            placeholder: 'Project ID',
            handleInputChange: setProjectID,
        },
        {
            icon: locationIcon,
            placeholder: 'Structure',
            handleInputChange: setStructure,
        },
        {
            icon: locationIcon,
            placeholder: 'Quantity',
            handleInputChange: setQuantity,
        },
    ];

    const checkListItems = [
        {
            label: 'Availability of bricks as per daily requirements',
            value: availabilityOfBricks,
            setValue: setAvailabilityOfBricks,
        },
        {
            label: 'Availability of bricks as per daily requirements',
            value: availabilityOfBricks,
            setValue: setAvailabilityOfBricks,
        }, {
            label: 'Availability of bricks as per daily requirements',
            value: availabilityOfBricks,
            setValue: setAvailabilityOfBricks,
        },
    ]

    return (
        <div className='bg-gray-100'>
            <div className='w-full py-10'>
                <p className='text-center sm:text-3xl text-2xl font-bold text-gray-800 mt-6 mb-5'>Brick Masonry QC Checklist</p>
            </div>

            <div className='items-center justify-center flex flex-col'>
                {InputFieldParams.map((params, index) => (
                    <InputField
                        key={index}
                        icon={params.icon}
                        placeholder={params.placeholder}
                        handleInputChange={params.handleInputChange}
                    />
                ))}
            </div>

            {checkListItems.map((item, index) => (
                <CheckListItem
                    key={index}
                    label={item.label}
                    value={item.value}
                    setValue={item.setValue}
                />
            ))}
        </div>
    )
}
