import React, { useState } from 'react';
import supabase from '../../../supabase'; // Ensure Supabase client is set up correctly

import InputField from '../../../components/ui_components/InputField';
import CheckListItem from '../../../components/ui_components/CheckListItem';
import SubmitButton from '../../../components/ui_components/PrimaryButton';
import Title from '../../../components/ui_components/Title';
import { addFormLog } from '../../../helpers/addFormLog';
import { useVendor } from '../../../context/vendorContext';
import locationIcon from '../../../assets/location.png'; // Ensure you have these icons in your assets

const RodCutterMachine = () => {
    const [onOffKnobCondition, setOnOffKnobCondition] = useState(false);
    const [powerSupplyCableInsulation, setPowerSupplyCableInsulation] = useState(false);
    const [cuttingWheelCondition, setCuttingWheelCondition] = useState(false);
    const [cuttingWheelGuardProvided, setCuttingWheelGuardProvided] = useState(false);
    const [cuttingWheelGuardLocking, setCuttingWheelGuardLocking] = useState(false);
    const [jobHoldingClampCondition, setJobHoldingClampCondition] = useState(false);
    const [machineHandleCondition, setMachineHandleCondition] = useState(false);
    const [baseCondition, setBaseCondition] = useState(false);
    const [ppesUsed, setPpesUsed] = useState(false);
    const [specificCuttingBladeUsed, setSpecificCuttingBladeUsed] = useState(false);

    const [siteName, setSiteName] = useState('');
    const [identificationNo, setIdentificationNo] = useState('');
    const [projectID, setProjectID] = useState('');
    const [auditedByName, setAuditedByName] = useState('');
    const [auditedByPersonalNo, setAuditedByPersonalNo] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [remarks, setRemarks] = useState('');

    const { vendorId } = useVendor();
    const form_num = 7;

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_rod_cutting_machine')
                .insert([
                    {
                        form_num: form_num,
                        project_id: parseInt(projectID),
                        on_off_knob_condition: onOffKnobCondition,
                        power_supply_cable_insulation: powerSupplyCableInsulation,
                        cutting_wheel_condition: cuttingWheelCondition,
                        cutting_wheel_guard_provided: cuttingWheelGuardProvided,
                        cutting_wheel_guard_locking: cuttingWheelGuardLocking,
                        job_holding_clamp_condition: jobHoldingClampCondition,
                        machine_handle_condition: machineHandleCondition,
                        base_condition: baseCondition,
                        ppes_used: ppesUsed,
                        specific_cutting_blade_used: specificCuttingBladeUsed,
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
                alert('Rod cutting machine checklist submitted successfully.');
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
            label: 'On/Off Knob Condition',
            value: onOffKnobCondition,
            setValue: setOnOffKnobCondition,
        },
        {
            label: 'Power Supply Cable Insulation',
            value: powerSupplyCableInsulation,
            setValue: setPowerSupplyCableInsulation,
        },
        {
            label: 'Cutting Wheel Condition',
            value: cuttingWheelCondition,
            setValue: setCuttingWheelCondition,
        },
        {
            label: 'Cutting Wheel Guard Provided',
            value: cuttingWheelGuardProvided,
            setValue: setCuttingWheelGuardProvided,
        },
        {
            label: 'Cutting Wheel Guard Locking',
            value: cuttingWheelGuardLocking,
            setValue: setCuttingWheelGuardLocking,
        },
        {
            label: 'Job Holding Clamp Condition',
            value: jobHoldingClampCondition,
            setValue: setJobHoldingClampCondition,
        },
        {
            label: 'Machine Handle Condition',
            value: machineHandleCondition,
            setValue: setMachineHandleCondition,
        },
        {
            label: 'Base Condition',
            value: baseCondition,
            setValue: setBaseCondition,
        },
        {
            label: 'PPEs Used',
            value: ppesUsed,
            setValue: setPpesUsed,
        },
        {
            label: 'Specific Cutting Blade Used',
            value: specificCuttingBladeUsed,
            setValue: setSpecificCuttingBladeUsed,
        },
    ];

    return (
        <div className='bg-blue-50 pb-20 p-5'>
            <Title text="Rod Cutting Machine Checklist" />

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

export default RodCutterMachine;
