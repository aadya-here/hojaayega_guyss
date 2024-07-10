import React, { useState } from 'react';
import supabase from '../../../supabase'; // Make sure to set up Supabase client

import InputField from '../../../components/ui_components/InputField';
import CheckListItem from '../../../components/ui_components/CheckListItem';
import locationIcon from '../../../assets/location.png'; // Ensure you have these icons in your assets
import SubmitButton from '../../../components/ui_components/PrimaryButton';
import Title from '../../../components/ui_components/Title';
import { addFormLog } from '../../../helpers/addFormLog';
import { useVendor } from '../../../context/vendorContext';



const MicroConcreteForm = () => {
    const [projectID, setProjectID] = useState(null);
    const [structure, setStructure] = useState('');
    const [quantity, setQuantity] = useState(null);
    const [refDrgNo, setRefDrgNo] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const [properMixing, setProperMixing] = useState('');
    const [cleaningSurface, setCleaningSurface] = useState('');
    const [chippingSurface, setChippingSurface] = useState('');
    const [anticorrosivePaint, setAnticorrosivePaint] = useState('');
    const [corrosionInhibitor, setCorrosionInhibitor] = useState('');
    const [bondingAgent, setBondingAgent] = useState('');
    const [microConcrete, setMicroConcrete] = useState('');
    const [shutteringCheck, setShutteringCheck] = useState('');
    const [thicknessCheck, setThicknessCheck] = useState(null);
    const [consumptionWithinSettingTime, setConsumptionWithinSettingTime] = useState('');
    const [architecturalFeaturesCheck, setArchitecturalFeaturesCheck] = useState('');
    const [surfaceSmoothness, setSurfaceSmoothness] = useState('');
    const [removalDebris, setRemovalDebris] = useState('');
    const [sealingOpenings, setSealingOpenings] = useState('');
    const [curing, setCuring] = useState('');

    const [supervisor_name, setSupervisorName] = useState('');
    const [supervisor_pno, setSupervisorPno] = useState(null);

    const [thickness, setThickness] = useState('');
    const form_num = 8;

    const { vendorId } = useVendor();

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_micro_concrete_qc')
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
                        proper_mixing: properMixing,
                        cleaning_surface: cleaningSurface,
                        chipping_surface: chippingSurface,
                        anticorrosive_paint: anticorrosivePaint,
                        corrosion_inhibitor: corrosionInhibitor,
                        bonding_agent: bondingAgent,
                        micro_concrete: microConcrete,
                        shuttering_check: shutteringCheck,
                        thickness_check: thicknessCheck,
                        thickness: thickness,
                        consumption_within_setting_time: consumptionWithinSettingTime,
                        architectural_features_check: architecturalFeaturesCheck,
                        surface_smoothness: surfaceSmoothness,
                        removal_debris: removalDebris,
                        sealing_openings: sealingOpenings,
                        curing: curing,
                        supervisor_name: supervisor_name,
                        supervisor_pno: supervisor_pno
                    }
                ]).select();
            if (error) {
                console.error('Error submitting checklist:', error.message);
                alert('Error', error.message);
            } else {
                alert('Micro Concrete checklist submitted successfully.');
                console.log(data[0].log_id);
                return (data[0].log_id);
            }
        } catch (error) {
            console.error('Error submitting checklist:', error.message);
            alert(error.message);
        }
    };

    const handleFormLog = async () => {
        try {
            const formID = await handleSubmit();
            await addFormLog(formID, projectID, vendorId, form_num);
            // alert('Success')
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
        {
            icon: locationIcon,
            placeholder: 'Thickness',
            handleInputChange: setThickness,
        },
    ];

    const checkListItems = [
        {
            label: 'Proper mixing of micro concrete',
            value: properMixing,
            setValue: setProperMixing,
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
            label: 'Placing of micro concrete',
            value: microConcrete,
            setValue: setMicroConcrete,
        },
        {
            label: 'Shuttering check',
            value: shutteringCheck,
            setValue: setShutteringCheck,
        },
        {
            label: 'Thickness check',
            value: thicknessCheck,
            setValue: setThicknessCheck,
        },
        {
            label: 'Consumption within setting time',
            value: consumptionWithinSettingTime,
            setValue: setConsumptionWithinSettingTime,
        },
        {
            label: 'Architectural features check',
            value: architecturalFeaturesCheck,
            setValue: setArchitecturalFeaturesCheck,
        },
        {
            label: 'Surface smoothness',
            value: surfaceSmoothness,
            setValue: setSurfaceSmoothness,
        },
        {
            label: 'Removal of debris',
            value: removalDebris,
            setValue: setRemovalDebris,
        },
        {
            label: 'Sealing of openings',
            value: sealingOpenings,
            setValue: setSealingOpenings,
        },
        {
            label: 'Curing of micro concrete',
            value: curing,
            setValue: setCuring,
        },
    ];




    return (
        <div className='bg-blue-50 pb-20 p-5'>
            <Title text="Micro Concrete QC Checklist" />

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

export default MicroConcreteForm;
