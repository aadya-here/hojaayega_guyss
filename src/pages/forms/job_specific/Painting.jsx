import React, { useState } from 'react';
import supabase from '../../../supabase'; // Make sure to set up Supabase client

import InputField from '../../../components/InputField';
import CheckListItem from '../../../components/CheckListItem';
import locationIcon from '../../../assets/location.png'; // Ensure you have these icons in your assets
import SubmitButton from '../../../components/PrimaryButton';
import Title from '../../../components/Title';
import { useVendor } from '../../../context/vendorContext';
import { addFormLog } from '../../../helpers/addFormLog';



const PaintingQCForm = () => {
    const [projectID, setProjectID] = useState(null);
    const [structure, setStructure] = useState('');
    const [quantity, setQuantity] = useState(null);
    const [refDrgNo, setRefDrgNo] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const [cleaningSurface, setCleaningSurface] = useState('');
    const [specsAvailable, setSpecsAvailable] = useState('');
    const [fillingPits, setFillingPits] = useState('');
    const [safetyScaffolding, setSafetyScaffolding] = useState('');
    const [scaffoldingClearance, setScaffoldingClearance] = useState('');
    const [chemicalPaint, setChemicalPaint] = useState('');
    const [paintingGangs, setPaintingGangs] = useState('');
    const [bondingAgent, setBondingAgent] = useState('');
    const [consistencyPaint, setConsistencyPaint] = useState('');
    const [applicationUniform, setApplicationUniform] = useState('');
    const [numberCoats, setNumberCoats] = useState('');
    const [timeBetweenCoats, setTimeBetweenCoats] = useState('');
    const [removalScaffoldsCleaning, setRemovalScaffoldsCleaning] = useState('');

    const [supervisorName, setSupervisorName] = useState('');
    const [supervisorPno, setSupervisorPno] = useState(null);

    const form_num = 2;
    const { vendorId } = useVendor();



    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_painting_qc')
                .insert([
                    {
                        project_id: parseInt(projectID),
                        structure: structure,
                        date: new Date(),
                        quantity: parseInt(quantity),
                        ref_drg_no: refDrgNo,
                        location: location,
                        form_num: 2,
                        description: description,
                        cleaning_surface: cleaningSurface,
                        specs_available: specsAvailable,
                        filling_pits: fillingPits,
                        safety_scaffolding: safetyScaffolding,
                        scaffolding_clearance: scaffoldingClearance,
                        chemical_paint: chemicalPaint,
                        painting_gangs: paintingGangs,
                        bonding_agent: bondingAgent,
                        consistency_paint: consistencyPaint,
                        application_uniform: applicationUniform,
                        number_coats: numberCoats,
                        time_between_coats: timeBetweenCoats,
                        removal_scaffolds_cleaning: removalScaffoldsCleaning,
                        supervisor_name: supervisorName,
                        supervisor_pno: supervisorPno,
                    }
                ]).select();

            if (error) {
                alert('Error', error.message);
            } else {

                alert('Painting QC checklist submitted successfully.');
                // console.log('added log:', data[0].log_id);
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
            placeholder: 'Supervisor Pno',
            handleInputChange: setSupervisorPno,
        },
    ];

    const checkListItems = [
        // {
        //     label: 'Availability of bricks as per daily requirements',
        //     value: availabilityOfBricks,
        //     setValue: setAvailabilityOfBricks,
        // },
        {
            label: 'Cleaning of surface',
            value: cleaningSurface,
            setValue: setCleaningSurface,
        },
        {
            label: 'Availability of specifications',
            value: specsAvailable,
            setValue: setSpecsAvailable,
        },
        {
            label: 'Filling of pits and imperfections',
            value: fillingPits,
            setValue: setFillingPits,
        },
        {
            label: 'Safety of scaffolding',
            value: safetyScaffolding,
            setValue: setSafetyScaffolding,
        },
        {
            label: 'Scaffolding clearance',
            value: scaffoldingClearance,
            setValue: setScaffoldingClearance,
        },
        {
            label: 'Use of chemical paint',
            value: chemicalPaint,
            setValue: setChemicalPaint,
        },
        {
            label: 'Painting gangs employed',
            value: paintingGangs,
            setValue: setPaintingGangs,
        },
        {
            label: 'Application of bonding agent',
            value: bondingAgent,
            setValue: setBondingAgent,
        },
        {
            label: 'Consistency of paint',
            value: consistencyPaint,
            setValue: setConsistencyPaint,
        },
        {
            label: 'Uniform application',
            value: applicationUniform,
            setValue: setApplicationUniform,
        },
        {
            label: 'Removal of scaffolds and cleaning',
            value: removalScaffoldsCleaning,
            setValue: setRemovalScaffoldsCleaning,
        },
    ];


    return (
        <div className='bg-blue-50 pb-20 p-5'>
            <Title text="Painting QC Checklist" />

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


                <InputField icon={locationIcon} placeholder="Number of coats" handleInputChange={setNumberCoats} />
                <InputField icon={locationIcon} placeholder="Time between coats" handleInputChange={setTimeBetweenCoats} />
            </div>


            <SubmitButton handleSubmit={handleFormLog} text="Submit" />

        </div>
    );
};

export default PaintingQCForm;
