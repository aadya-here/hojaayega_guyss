import React, { useState } from 'react';
import supabase from '../../../supabase'; // Make sure to set up Supabase client

import InputField from '../../../components/ui_components/InputField'; // Assuming you have this component defined
import CheckListItem from '../../../components/ui_components/CheckListItem'; // Assuming you have this component defined
import SubmitButton from '../../../components/ui_components/PrimaryButton'; // Assuming you have this component defined
import Title from '../../../components/ui_components/Title'; // Assuming you have this component defined
import { addFormLog } from '../../../helpers/addFormLog'; // Assuming you have this helper function defined
import { useVendor } from '../../../context/vendorContext'; // Assuming you have vendor context defined

const VibratorMachine = () => {
    const [authorizedOperatorWithPPE, setAuthorizedOperatorWithPPE] = useState(false);
    const [motorCasingWithoutDamage, setMotorCasingWithoutDamage] = useState(false);
    const [sheathed3CorePowerCableWithPlug, setSheathed3CorePowerCableWithPlug] = useState(false);
    const [powerConnectionThrough30maELCB, setPowerConnectionThrough30maELCB] = useState(false);
    const [protectedStarterBox, setProtectedStarterBox] = useState(false);
    const [motorWithProtectedPowerTerminalBox, setMotorWithProtectedPowerTerminalBox] = useState(false);
    const [protectiveGuardOnMovingParts, setProtectiveGuardOnMovingParts] = useState(false);
    const [vibratorCaseCondition, setVibratorCaseCondition] = useState(false);
    const [protectedFuelTank, setProtectedFuelTank] = useState(false);
    const [fuelPipeWithoutDamageLeakage, setFuelPipeWithoutDamageLeakage] = useState(false);
    const [healthyNeedleHoseCoupling, setHealthyNeedleHoseCoupling] = useState(false);
    const [healthyNeedleNoseSpring, setHealthyNeedleNoseSpring] = useState(false);
    const [singlePullStartingMechanism, setSinglePullStartingMechanism] = useState(false);
    const [chokeMechanism, setChokeMechanism] = useState(false);
    const [safeLocationForPositioningVibrator, setSafeLocationForPositioningVibrator] = useState(false);

    const [siteName, setSiteName] = useState('');
    const [identificationNo, setIdentificationNo] = useState('');
    const [projectID, setProjectID] = useState('');
    const [auditedByName, setAuditedByName] = useState('');
    const [auditedByPersonalNo, setAuditedByPersonalNo] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [remarks, setRemarks] = useState('');

    const { vendorId } = useVendor();
    const [logID, setLogID] = useState(null);

    const form_num = 4;

    const handleSubmit = async () => {
        try {
            if (!projectID) {
                alert('Error', 'Project ID is required.');
                return null;
            }

            const { data, error } = await supabase
                .from('form_vibrator_machine')
                .insert([{
                    form_num: form_num,
                    project_id: parseInt(projectID),
                    authorized_operator_with_ppe: authorizedOperatorWithPPE,
                    motor_casing_without_damage: motorCasingWithoutDamage,
                    sheathed_3core_power_cable_with_plug: sheathed3CorePowerCableWithPlug,
                    power_connection_through_30ma_elcb: powerConnectionThrough30maELCB,
                    protected_starter_box: protectedStarterBox,
                    motor_with_protected_power_terminal_box: motorWithProtectedPowerTerminalBox,
                    protective_guard_on_moving_parts: protectiveGuardOnMovingParts,
                    vibrator_case_condition: vibratorCaseCondition,
                    protected_fuel_tank: protectedFuelTank,
                    fuel_pipe_without_damage_leakage: fuelPipeWithoutDamageLeakage,
                    healthy_needle_hose_coupling: healthyNeedleHoseCoupling,
                    healthy_needle_nose_spring: healthyNeedleNoseSpring,
                    single_pull_starting_mechanism: singlePullStartingMechanism,
                    choke_mechanism: chokeMechanism,
                    safe_location_for_positioning_vibrator: safeLocationForPositioningVibrator,
                    site_name: siteName,
                    identification_no: identificationNo,
                    date: new Date().toISOString(),
                    audited_by_name: auditedByName,
                    audited_by_personal_no: auditedByPersonalNo ? parseInt(auditedByPersonalNo) : null,
                    responsibility: responsibility,
                    remarks: remarks,
                }]).select();

            if (error) {
                console.error('Database error:', error);
                alert('Error', 'A database error occurred. Please try again.');
                return null;
            }

            if (!data || !data[0]) {
                console.error('No data returned from database.');
                alert('Error', 'No data returned from database.');
                return null;
            }

            console.log('Form submitted successfully:', data[0].log_id);
            return data[0].log_id;

        } catch (error) {
            console.error('Error creating project:', error);
            alert('Error', 'An unexpected error occurred while creating the project.');
            return null;
        }
    };

    const handleFormLog = async () => {
        const formLogData = await addFormLog(handleSubmit, projectID, vendorId, form_num);

        if (formLogData) {
            alert('Success', 'Form log created successfully.');
            console.log("Form log created successfully:", formLogData);
        }
    };

    const InputFieldParams = [
        {
            placeholder: 'Site Name',
            handleInputChange: setSiteName,
        },
        {
            placeholder: 'Identification No.',
            handleInputChange: setIdentificationNo,
        },
        {
            placeholder: 'Project ID',
            handleInputChange: setProjectID,
        },
        {
            placeholder: 'Audited By Name',
            handleInputChange: setAuditedByName,
        },
        {
            placeholder: 'Audited By Personal No.',
            handleInputChange: setAuditedByPersonalNo,
        },
        {
            placeholder: 'Responsibility',
            handleInputChange: setResponsibility,
        },
        {
            placeholder: 'Remarks',
            handleInputChange: setRemarks,
        },
    ];

    const checkListItems = [
        {
            label: 'Authorized operator with PPE',
            value: authorizedOperatorWithPPE,
            setValue: setAuthorizedOperatorWithPPE,
        },
        {
            label: 'Motor casing without damage',
            value: motorCasingWithoutDamage,
            setValue: setMotorCasingWithoutDamage,
        },
        {
            label: 'Sheathed 3-core power cable with plug',
            value: sheathed3CorePowerCableWithPlug,
            setValue: setSheathed3CorePowerCableWithPlug,
        },
        {
            label: 'Power connection through 30ma ELCB',
            value: powerConnectionThrough30maELCB,
            setValue: setPowerConnectionThrough30maELCB,
        },
        {
            label: 'Protected starter box',
            value: protectedStarterBox,
            setValue: setProtectedStarterBox,
        },
        {
            label: 'Motor with protected power terminal box',
            value: motorWithProtectedPowerTerminalBox,
            setValue: setMotorWithProtectedPowerTerminalBox,
        },
        {
            label: 'Protective guard on moving parts',
            value: protectiveGuardOnMovingParts,
            setValue: setProtectiveGuardOnMovingParts,
        },
        {
            label: 'Vibrator case condition',
            value: vibratorCaseCondition,
            setValue: setVibratorCaseCondition,
        },
        {
            label: 'Protected fuel tank',
            value: protectedFuelTank,
            setValue: setProtectedFuelTank,
        },
        {
            label: 'Fuel pipe without damage leakage',
            value: fuelPipeWithoutDamageLeakage,
            setValue: setFuelPipeWithoutDamageLeakage,
        },
        {
            label: 'Healthy needle hose coupling',
            value: healthyNeedleHoseCoupling,
            setValue: setHealthyNeedleHoseCoupling,
        },
        {
            label: 'Healthy needle nose spring',
            value: healthyNeedleNoseSpring,
            setValue: setHealthyNeedleNoseSpring,
        },
        {
            label: 'Single pull starting mechanism',
            value: singlePullStartingMechanism,
            setValue: setSinglePullStartingMechanism,
        },
        {
            label: 'Choke mechanism',
            value: chokeMechanism,
            setValue: setChokeMechanism,
        },
        {
            label: 'Safe location for positioning vibrator',
            value: safeLocationForPositioningVibrator,
            setValue: setSafeLocationForPositioningVibrator,
        },
    ];

    return (
        <div className='bg-blue-50 pb-20 p-5'>
            <Title text="Vibrator Machine Checklist" />

            <div className='items-center justify-center flex flex-col'>
                {InputFieldParams.map((params, index) => (
                    <InputField
                        key={index}
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

export default VibratorMachine;
