import React, { useState } from 'react';
import supabase from '../../../supabase'; // Ensure Supabase client is set up correctly

import InputField from '../../../components/ui_components/InputField';
import CheckListItem from '../../../components/ui_components/CheckListItem';
import SubmitButton from '../../../components/ui_components/PrimaryButton';
import Title from '../../../components/ui_components/Title';
import { addFormLog } from '../../../helpers/addFormLog';
import { useVendor } from '../../../context/vendorContext';
import locationIcon from '../../../assets/location.png'; // Ensure you have these icons in your assets

const FullBodyHarness = () => {
    const [parachuteBuckle, setParachuteBuckle] = useState(false);
    const [strap44mmChest, setStrap44mmChest] = useState(false);
    const [chestSlidingPlate, setChestSlidingPlate] = useState(false);
    const [shoulderStraps, setShoulderStraps] = useState(false);
    const [loops, setLoops] = useState(false);
    const [webHolder, setWebHolder] = useState(false);
    const [dRing, setDRing] = useState(false);
    const [idPlate, setIdPlate] = useState(false);
    const [fallIndicator, setFallIndicator] = useState(false);
    const [legStrap, setLegStrap] = useState(false);
    const [sitStrap, setSitStrap] = useState(false);
    const [lanyardRope, setLanyardRope] = useState(false);
    const [snapHook, setSnapHook] = useState(false);

    const [siteName, setSiteName] = useState('');
    const [identificationNo, setIdentificationNo] = useState('');
    const [auditedByName, setAuditedByName] = useState('');
    const [auditedByPersonalNo, setAuditedByPersonalNo] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [remarks, setRemarks] = useState('');
    const [projectID, setProjectID] = useState('');

    const { vendorId } = useVendor();
    const form_num = 5;

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_full_body_harness')
                .insert([
                    {
                        form_num: form_num,
                        project_id: parseInt(projectID),
                        parachute_buckle: parachuteBuckle,
                        strap_44mm_chest: strap44mmChest,
                        chest_sliding_plate: chestSlidingPlate,
                        shoulder_straps: shoulderStraps,
                        loops: loops,
                        web_holder: webHolder,
                        d_ring: dRing,
                        id_plate: idPlate,
                        fall_indicator: fallIndicator,
                        leg_strap: legStrap,
                        sit_strap: sitStrap,
                        lanyard_rope: lanyardRope,
                        snap_hook: snapHook,
                        site_name: siteName,
                        identification_no: identificationNo,
                        date: new Date(),
                        audited_by_name: auditedByName,
                        audited_by_personal_no: parseInt(auditedByPersonalNo),
                        responsibility: responsibility,
                        remarks: remarks,
                    }
                ]).select();
            if (error) {
                alert('Error', error.message);
            } else {
                alert('Full body harness checklist submitted successfully.');
                console.log('Form submitted successfully:', data[0].log_id);
                return data[0].log_id;
            }
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Error', 'An unexpected error occurred while creating the project.');
        }
    };

    const handleFormLog = async () => {
        try {
            const formID = await handleSubmit();
            await addFormLog(formID, projectID, vendorId, form_num);
            alert('Form log created successfully.');
            console.log('Form log created successfully:', formID);
        } catch (error) {
            console.error('Error creating form log:', error);
            alert('Error', error.message);
        }
    };

    const InputFieldParams = [
        {
            icon: locationIcon,
            placeholder: 'Site Name',
            handleInputChange: setSiteName,
        },
        {
            icon: locationIcon,
            placeholder: 'Identification No.',
            handleInputChange: setIdentificationNo,
        },
        {
            icon: locationIcon,
            placeholder: 'Audited By Name',
            handleInputChange: setAuditedByName,
        },
        {
            icon: locationIcon,
            placeholder: 'Audited By Personal No.',
            handleInputChange: setAuditedByPersonalNo,
        },
        {
            icon: locationIcon,
            placeholder: 'Responsibility',
            handleInputChange: setResponsibility,
        },
        {
            icon: locationIcon,
            placeholder: 'Remarks',
            handleInputChange: setRemarks,
        },
        {
            icon: locationIcon,
            placeholder: 'Project ID',
            handleInputChange: setProjectID,
        },
    ];

    const checkListItems = [
        {
            label: 'Parachute Buckle',
            value: parachuteBuckle,
            setValue: setParachuteBuckle,
        },
        {
            label: '44mm Chest Strap',
            value: strap44mmChest,
            setValue: setStrap44mmChest,
        },
        {
            label: 'Chest Sliding Plate',
            value: chestSlidingPlate,
            setValue: setChestSlidingPlate,
        },
        {
            label: 'Shoulder Straps',
            value: shoulderStraps,
            setValue: setShoulderStraps,
        },
        {
            label: 'Loops',
            value: loops,
            setValue: setLoops,
        },
        {
            label: 'Web Holder',
            value: webHolder,
            setValue: setWebHolder,
        },
        {
            label: 'D-Ring',
            value: dRing,
            setValue: setDRing,
        },
        {
            label: 'ID Plate',
            value: idPlate,
            setValue: setIdPlate,
        },
        {
            label: 'Fall Indicator',
            value: fallIndicator,
            setValue: setFallIndicator,
        },
        {
            label: 'Leg Strap',
            value: legStrap,
            setValue: setLegStrap,
        },
        {
            label: 'Sit Strap',
            value: sitStrap,
            setValue: setSitStrap,
        },
        {
            label: 'Lanyard Rope',
            value: lanyardRope,
            setValue: setLanyardRope,
        },
        {
            label: 'Snap Hook',
            value: snapHook,
            setValue: setSnapHook,
        },
    ];

    return (
        <div className='bg-blue-50 pb-20 p-5'>
            <Title text="Full Body Harness Checklist" />

            <div className='items-center justify-center flex flex-col'>
                {InputFieldParams.map((params, index) => (
                    <InputField
                        key={index}
                        icon={params.icon}
                        placeholder={params.placeholder}
                        handleInputChange={params.handleInputChange}
                    />
                ))}

                {checkListItems.map((item, index) => (
                    <CheckListItem
                        key={index}
                        label={item.label}
                        value={item.value}
                        setValue={item.setValue}
                    />
                ))}
            </div>

            <SubmitButton handleSubmit={handleFormLog} text="Submit" />
        </div>
    );
};

export default FullBodyHarness;
