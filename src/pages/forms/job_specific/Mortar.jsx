import React, { useState } from 'react';
import supabase from '../../../supabase'; // Make sure to set up Supabase client

import InputField from '../../../components/InputField';
import CheckListItem from '../../../components/CheckListItem';
import locationIcon from '../../../assets/location.png'; // Ensure you have these icons in your assets
import SubmitButton from '../../../components/PrimaryButton';
import Title from '../../../components/Title';
import { addFormLog } from '../../../helpers/addFormLog';
import { useVendor } from '../../../context/vendorContext';



const MortarPlasteringQCForm = () => {
    const [projectID, setProjectID] = useState(null);
    const [structure, setStructure] = useState('');
    const [quantity, setQuantity] = useState(null);
    const [refDrgNo, setRefDrgNo] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const [properMixingMortar, setProperMixingMortar] = useState('');
    const [cleaningSurface, setCleaningSurface] = useState('');
    const [chippingSurface, setChippingSurface] = useState('');
    const [anticorrosivePaint, setAnticorrosivePaint] = useState('');
    const [corrosionInhibitor, setCorrosionInhibitor] = useState('');
    const [bondingAgent, setBondingAgent] = useState('');
    const [fiberMortar, setFiberMortar] = useState('');
    const [completionOverheadPlaster, setCompletionOverheadPlaster] = useState('');
    const [startTopWorkDownwards, setStartTopWorkDownwards] = useState('');
    const [thicknessNumberCoats, setThicknessNumberCoats] = useState('');
    const [initialSettingTime, setInitialSettingTime] = useState('');
    const [architecturalFeatures, setArchitecturalFeatures] = useState('');
    const [trueLevelSmoothness, setTrueLevelSmoothness] = useState('');
    const [removalDeadMortarDebris, setRemovalDeadMortarDebris] = useState('');
    const [curingSpecifiedDuration, setCuringSpecifiedDuration] = useState('');

    const [supervisorName, setSupervisorName] = useState('');
    const [supervisorPno, setSupervisorPno] = useState(null);
    const form_num = 3;

    const { vendorId } = useVendor();

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_mortar_plastering_qc')
                .insert([
                    {
                        project_id: parseInt(projectID),
                        structure: structure,
                        date: new Date(),
                        quantity: parseInt(quantity),
                        ref_drg_no: refDrgNo,
                        location: location,
                        form_num: form_num,
                        description: description,
                        proper_mixing_mortar: properMixingMortar,
                        cleaning_surface: cleaningSurface,
                        chipping_surface: chippingSurface,
                        anticorrosive_paint: anticorrosivePaint,
                        corrosion_inhibitor: corrosionInhibitor,
                        bonding_agent: bondingAgent,
                        fiber_mortar: fiberMortar,
                        completion_overhead_plaster: completionOverheadPlaster,
                        start_top_work_downwards: startTopWorkDownwards,
                        thickness_number_coats: thicknessNumberCoats,
                        initial_setting_time: initialSettingTime,
                        architectural_features: architecturalFeatures,
                        true_level_smoothness: trueLevelSmoothness,
                        removal_dead_mortar_debris: removalDeadMortarDebris,
                        curing_specified_duration: curingSpecifiedDuration,
                        supervisor_name: supervisorName,
                        supervisor_pno: supervisorPno,

                    }
                ]).select();

            if (error) {
                alert('Error', error.message);
            } else {

                alert('Mortar and Plastering QC checklist submitted successfully.');
                console.log('added log:', data[0].log_id);
                return (data[0].log_id);

            }
        } catch (error) {
            console.error('Error submitting checklist:', error);
            alert('Error', error.message);
        }
    };

    const handleFormLog = async () => {
        try {
            const formID = await handleSubmit();
            await addFormLog(formID, projectID, vendorId, form_num);
            console.log('form:', formID);
        } catch (error) {
            console.error('Error creating form log:', error);
            alert('Error', error.message);
        }
    };

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
        {
            icon: locationIcon,
            placeholder: 'Ref Drg No.',
            handleInputChange: setRefDrgNo,
        },
        {
            icon: locationIcon,
            placeholder: 'Location',
            handleInputChange: setLocation,
        },
        {
            icon: locationIcon,
            placeholder: 'Description',
            handleInputChange: setDescription,
        },
        {
            icon: locationIcon,
            placeholder: 'Supervisor Name',
            handleInputChange: setSupervisorName,
        },
        {
            icon: locationIcon,
            placeholder: 'Supervisor GatePass No.',
            handleInputChange: setSupervisorPno,
        },
    ]

    const checkListItems = [
        {
            label: 'Proper mixing of mortar',
            value: properMixingMortar,
            setValue: setProperMixingMortar,
        },
        {
            label: 'Cleaning of surface',
            value: cleaningSurface,
            setValue: setCleaningSurface,
        },
        {
            label: 'Chipping of surface',
            value: chippingSurface,
            setValue: setChippingSurface,
        },
        {
            label: 'Application of anticorrosive paint',
            value: anticorrosivePaint,
            setValue: setAnticorrosivePaint,
        },
        {
            label: 'Use of corrosion inhibitor',
            value: corrosionInhibitor,
            setValue: setCorrosionInhibitor,
        },
        {
            label: 'Application of bonding agent',
            value: bondingAgent,
            setValue: setBondingAgent,
        },
        {
            label: 'Use of fiber mortar',
            value: fiberMortar,
            setValue: setFiberMortar,
        },
        {
            label: 'Completion of overhead plaster',
            value: completionOverheadPlaster,
            setValue: setCompletionOverheadPlaster,
        },
        {
            label: 'Start work from top downwards',
            value: startTopWorkDownwards,
            setValue: setStartTopWorkDownwards,
        },
        {
            label: 'Thickness and number of coats',
            value: thicknessNumberCoats,
            setValue: setThicknessNumberCoats,
        },
        {
            label: 'Initial setting time',
            value: initialSettingTime,
            setValue: setInitialSettingTime,
        },
        {
            label: 'Architectural features',
            value: architecturalFeatures,
            setValue: setArchitecturalFeatures,
        },
        {
            label: 'True level and smoothness',
            value: trueLevelSmoothness,
            setValue: setTrueLevelSmoothness,
        },
        {
            label: 'Removal of dead mortar and debris',
            value: removalDeadMortarDebris,
            setValue: setRemovalDeadMortarDebris,
        },
        {
            label: 'Curing for specified duration',
            value: curingSpecifiedDuration,
            setValue: setCuringSpecifiedDuration,
        },
    ];


    return (
        <div className='bg-blue-50 pb-20 p-5'>
            <Title text="Mortar Plastering QC Checklist" />

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

export default MortarPlasteringQCForm;
