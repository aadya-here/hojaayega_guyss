import React, { useState } from 'react';
import supabase from '../../../supabase'; // Ensure Supabase client is set up correctly

import InputField from '../../../components/ui_components/InputField';
import CheckListItem from '../../../components/ui_components/CheckListItem';
import SubmitButton from '../../../components/ui_components/PrimaryButton';
import Title from '../../../components/ui_components/Title';
import { addFormLog } from '../../../helpers/addFormLog';
import { useVendor } from '../../../context/vendorContext';
import locationIcon from '../../../assets/location.png'; // Ensure you have these icons in your assets

const ChipperMachine = () => {
    const [chiselCondition, setChiselCondition] = useState(false);
    const [tightnessOfChiselLock, setTightnessOfChiselLock] = useState(false);
    const [handleWithoutDamage, setHandleWithoutDamage] = useState(false);
    const [bodyCondition, setBodyCondition] = useState(false);
    const [triggerSwitchWithoutDamage, setTriggerSwitchWithoutDamage] = useState(false);
    const [electricWireWithoutCutsAndJoints, setElectricWireWithoutCutsAndJoints] = useState(false);
    const [protectiveGuardOnMovingParts, setProtectiveGuardOnMovingParts] = useState(false);
    const [isElcbAvailableWithin2m, setIsElcbAvailableWithin2m] = useState(false);
    const [isElcbTrippingChecked, setIsElcbTrippingChecked] = useState(false);
    const [bodyEarthingIncaseOfMetalBody, setBodyEarthingIncaseOfMetalBody] = useState(false);
    const [powerCableProperlyTerminatedWithGland, setPowerCableProperlyTerminatedWithGland] = useState(false);

    const [siteName, setSiteName] = useState('');
    const [identificationNo, setIdentificationNo] = useState('');
    const [projectID, setProjectID] = useState('');
    const [auditedByName, setAuditedByName] = useState('');
    const [auditedByPersonalNo, setAuditedByPersonalNo] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [remarks, setRemarks] = useState('');

    const { vendorId } = useVendor();
    const form_num = 1;

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_chipper_machine')
                .insert([
                    {
                        form_num: form_num,
                        project_id: parseInt(projectID),
                        site_name: siteName,
                        date: new Date(),
                        identification_no: identificationNo,
                        chisel_condition: chiselCondition,
                        tightness_of_chisel_lock: tightnessOfChiselLock,
                        handle_without_damage: handleWithoutDamage,
                        body_condition: bodyCondition,
                        trigger_switch_without_damage: triggerSwitchWithoutDamage,
                        electric_wire_without_cuts_and_joints: electricWireWithoutCutsAndJoints,
                        protective_guard_on_moving_parts: protectiveGuardOnMovingParts,
                        is_elcb_available_within_2m: isElcbAvailableWithin2m,
                        is_elcb_tripping_checked: isElcbTrippingChecked,
                        body_earthing_incase_of_metal_body: bodyEarthingIncaseOfMetalBody,
                        power_cable_properly_terminated_with_gland: powerCableProperlyTerminatedWithGland,
                        audited_by_name: auditedByName,
                        audited_by_personal_no: parseInt(auditedByPersonalNo),
                        responsibility: responsibility,
                        remarks: remarks,
                    }
                ]).select();
            if (error) {
                alert('Error', error.message);
            } else {
                alert('Chipper machine checklist submitted successfully.');
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
            placeholder: 'Project ID',
            handleInputChange: setProjectID,
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
    ];

    const checkListItems = [
        {
            label: 'Chisel Condition',
            value: chiselCondition,
            setValue: setChiselCondition,
        },
        {
            label: 'Tightness of Chisel Lock',
            value: tightnessOfChiselLock,
            setValue: setTightnessOfChiselLock,
        },
        {
            label: 'Handle Without Damage',
            value: handleWithoutDamage,
            setValue: setHandleWithoutDamage,
        },
        {
            label: 'Body Condition',
            value: bodyCondition,
            setValue: setBodyCondition,
        },
        {
            label: 'Trigger Switch Without Damage',
            value: triggerSwitchWithoutDamage,
            setValue: setTriggerSwitchWithoutDamage,
        },
        {
            label: 'Electric Wire Without Cuts and Joints',
            value: electricWireWithoutCutsAndJoints,
            setValue: setElectricWireWithoutCutsAndJoints,
        },
        {
            label: 'Protective Guard on Moving Parts',
            value: protectiveGuardOnMovingParts,
            setValue: setProtectiveGuardOnMovingParts,
        },
        {
            label: 'Is ELCB Available Within 2m',
            value: isElcbAvailableWithin2m,
            setValue: setIsElcbAvailableWithin2m,
        },
        {
            label: 'Is ELCB Tripping Checked',
            value: isElcbTrippingChecked,
            setValue: setIsElcbTrippingChecked,
        },
        {
            label: 'Body Earthing Incase of Metal Body',
            value: bodyEarthingIncaseOfMetalBody,
            setValue: setBodyEarthingIncaseOfMetalBody,
        },
        {
            label: 'Power Cable Properly Terminated With Gland',
            value: powerCableProperlyTerminatedWithGland,
            setValue: setPowerCableProperlyTerminatedWithGland,
        },
    ];

    return (
        <div className='bg-blue-50 pb-20 p-5'>
            <Title text="Chipper Machine Checklist" />

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

export default ChipperMachine;
