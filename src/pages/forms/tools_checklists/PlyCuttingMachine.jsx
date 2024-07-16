import React, { useState } from 'react';
import supabase from '../../../supabase'; // Ensure Supabase client is set up correctly

import InputField from '../../../components/ui_components/InputField';
import CheckListItem from '../../../components/ui_components/CheckListItem';
import SubmitButton from '../../../components/ui_components/PrimaryButton';
import Title from '../../../components/ui_components/Title';
import { addFormLog } from '../../../helpers/addFormLog';
import { useVendor } from '../../../context/vendorContext';
import locationIcon from '../../../assets/location.png'; // Ensure you have these icons in your assets

const PlyCutterMachine = () => {
    const [doubleInsulated, setDoubleInsulated] = useState(false);
    const [freeFromDamage, setFreeFromDamage] = useState(false);
    const [wireCondition, setWireCondition] = useState(false);
    const [machinePlugCondition, setMachinePlugCondition] = useState(false);
    const [cuttingBladeGuardCondition, setCuttingBladeGuardCondition] = useState(false);
    const [cuttingWheelCondition, setCuttingWheelCondition] = useState(false);
    const [specificCuttingBladeUsed, setSpecificCuttingBladeUsed] = useState(false);
    const [onOffSwitchCondition, setOnOffSwitchCondition] = useState(false);

    const [siteName, setSiteName] = useState('');
    const [identificationNo, setIdentificationNo] = useState('');
    const [projectID, setProjectID] = useState('');
    const [auditedByName, setAuditedByName] = useState('');
    const [auditedByPersonalNo, setAuditedByPersonalNo] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [remarks, setRemarks] = useState('');

    const form_num = 3;
    const { vendorId } = useVendor();

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_ply_cutter_machine')
                .insert([
                    {
                        form_num: form_num,
                        project_id: parseInt(projectID),
                        tool_name: 'Ply Cutter Machine',
                        double_insulated: doubleInsulated,
                        free_from_damage: freeFromDamage,
                        wire_condition: wireCondition,
                        machine_plug_condition: machinePlugCondition,
                        cutting_blade_guard_condition: cuttingBladeGuardCondition,
                        cutting_wheel_condition: cuttingWheelCondition,
                        specific_cutting_blade_used: specificCuttingBladeUsed,
                        on_off_switch_condition: onOffSwitchCondition,
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
                alert('Ply cutter machine checklist submitted successfully.');
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
            label: 'Double Insulated',
            value: doubleInsulated,
            setValue: setDoubleInsulated,
        },
        {
            label: 'Free From Damage',
            value: freeFromDamage,
            setValue: setFreeFromDamage,
        },
        {
            label: 'Wire Condition',
            value: wireCondition,
            setValue: setWireCondition,
        },
        {
            label: 'Machine Plug Condition',
            value: machinePlugCondition,
            setValue: setMachinePlugCondition,
        },
        {
            label: 'Cutting Blade Guard Condition',
            value: cuttingBladeGuardCondition,
            setValue: setCuttingBladeGuardCondition,
        },
        {
            label: 'Cutting Wheel Condition',
            value: cuttingWheelCondition,
            setValue: setCuttingWheelCondition,
        },
        {
            label: 'Specific Cutting Blade Used',
            value: specificCuttingBladeUsed,
            setValue: setSpecificCuttingBladeUsed,
        },
        {
            label: 'On/Off Switch Condition',
            value: onOffSwitchCondition,
            setValue: setOnOffSwitchCondition,
        },
    ];

    return (
        <div className='bg-blue-50 pb-20 p-5'>
            <Title text="Ply Cutter Machine Checklist" />

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

export default PlyCutterMachine;
