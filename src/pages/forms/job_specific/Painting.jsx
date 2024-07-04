import React, { useState } from 'react';
import supabase from '../../../supabase'; // Make sure to set up Supabase client

import InputField from '../../../components/InputField';
import CheckListItem from '../../../components/CheckListItem';
import locationIcon from '../../../assets/location.png'; // Ensure you have these icons in your assets
import SubmitButton from '../../../components/PrimaryButton';
import Title from '../../../components/Title';



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
                ]);
            if (error) {
                console.error('Error submitting checklist:', error.message);
                alert('Error', error.message);
            } else {
                alert('Success', 'Painting QC checklist submitted successfully.');
            }
        } catch (error) {
            console.error('Error submitting checklist:', error.message);
            alert('Error', 'An unexpected error occurred while submitting the checklist.');
        }
    };

    return (
        <div className='bg-blue-50 pb-20 p-5'>
            <Title text="Painting QC Checklist" />

            <div className='items-center justify-center flex flex-col'>
                <InputField icon={locationIcon} placeholder="Project ID" handleInputChange={setProjectID} />
                <InputField icon={locationIcon} placeholder="Structure" handleInputChange={setStructure} />
                <InputField icon={locationIcon} placeholder="Quantity" handleInputChange={setQuantity} />
                <InputField icon={locationIcon} placeholder="Ref Drg No." handleInputChange={setRefDrgNo} />
                <InputField icon={locationIcon} placeholder="Location" handleInputChange={setLocation} />
                <InputField icon={locationIcon} placeholder="Description" handleInputChange={setDescription} />
                <InputField icon={locationIcon} placeholder="Supervisor Name" handleInputChange={setSupervisorName} />
                <InputField icon={locationIcon} placeholder="Supervisor Pno" handleInputChange={setSupervisorPno} />

            </div>

            <CheckListItem label="Cleaning of surface" value={cleaningSurface} setValue={setCleaningSurface} />
            <CheckListItem label="Availability of specifications" value={specsAvailable} setValue={setSpecsAvailable} />
            <CheckListItem label="Filling of pits and imperfections" value={fillingPits} setValue={setFillingPits} />
            <CheckListItem label="Safety of scaffolding" value={safetyScaffolding} setValue={setSafetyScaffolding} />
            <CheckListItem label="Scaffolding clearance" value={scaffoldingClearance} setValue={setScaffoldingClearance} />
            <CheckListItem label="Use of chemical paint" value={chemicalPaint} setValue={setChemicalPaint} />
            <CheckListItem label="Painting gangs employed" value={paintingGangs} setValue={setPaintingGangs} />
            <CheckListItem label="Application of bonding agent" value={bondingAgent} setValue={setBondingAgent} />
            <CheckListItem label="Consistency of paint" value={consistencyPaint} setValue={setConsistencyPaint} />
            <CheckListItem label="Uniform application" value={applicationUniform} setValue={setApplicationUniform} />
            <InputField icon={locationIcon} placeholder="Number of coats" handleInputChange={setNumberCoats} />
            <InputField icon={locationIcon} placeholder="Time between coats" handleInputChange={setTimeBetweenCoats} />


            <CheckListItem label="Removal of scaffolds and cleaning" value={removalScaffoldsCleaning} setValue={setRemovalScaffoldsCleaning} />

            <SubmitButton handleSubmit={handleSubmit} text="Submit" />
        </div>
    );
};

export default PaintingQCForm;
