import React, { useState } from 'react';
import supabase from '../../../supabase'; // Make sure to set up Supabase client

import InputField from '../../../components/InputField';
import CheckListItem from '../../../components/CheckListItem';
import locationIcon from '../../../assets/location.png'; // Ensure you have these icons in your assets
import SubmitButton from '../../../components/PrimaryButton';
import Title from '../../../components/Title';


const PlasteringQCForm = () => {
    const [projectID, setProjectID] = useState(null);
    const [structure, setStructure] = useState('');
    const [quantity, setQuantity] = useState(null);
    const [refDrgNo, setRefDrgNo] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const [properMixingOfMortar, setProperMixingOfMortar] = useState('');
    const [mortarMixProportion, setMortarMixProportion] = useState('');
    const [waterproofingCompound, setWaterproofingCompound] = useState('');
    const [ceilingPlasterCompletion, setCeilingPlasterCompletion] = useState('');
    const [plasteringSequence, setPlasteringSequence] = useState('');
    const [wettingSurfaceBeforePlastering, setWettingSurfaceBeforePlastering] = useState('');
    const [thicknessAndNumberOfCoats, setThicknessAndNumberOfCoats] = useState('');
    const [trueLevelSurface, setTrueLevelSurface] = useState('');
    const [initialSettingTime, setInitialSettingTime] = useState('');
    const [straightEdgesSharpCorners, setStraightEdgesSharpCorners] = useState('');
    const [architecturalFeatures, setArchitecturalFeatures] = useState('');

    const [levelSurfaceSmoothness, setLevelSurfaceSmoothness] = useState('');
    const [straightEdges, setStraightEdges] = useState('');
    const [rightAnglesPlumb, setRightAnglesPlumb] = useState('');
    const [removalOfDeadMortarDebris, setRemovalOfDeadMortarDebris] = useState('');
    const [sealingOpeningsInMasonry, setSealingOpeningsInMasonry] = useState('');
    const [plasteringDateMarked, setPlasteringDateMarked] = useState('');
    const [curingDuration, setCuringDuration] = useState('');

    const [supervisorName, setSupervisorName] = useState('');
    const [supervisorPno, setSupervisorPno] = useState(null);

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_plastering_qc')
                .insert([
                    {
                        project_id: parseInt(projectID),
                        structure: structure,
                        date: new Date(),
                        quantity: parseInt(quantity),
                        ref_drg_no: refDrgNo,
                        location: location,
                        form_num: 5,
                        description: description,
                        proper_mixing_of_mortar: properMixingOfMortar,
                        mortar_mix_proportion: mortarMixProportion,
                        waterproofing_compound: waterproofingCompound,
                        ceiling_plaster_completion: ceilingPlasterCompletion,
                        plastering_sequence: plasteringSequence,
                        wetting_surface_before_plastering: wettingSurfaceBeforePlastering,
                        thickness_and_number_of_coats: thicknessAndNumberOfCoats,
                        true_level_surface: trueLevelSurface,
                        initial_setting_time: initialSettingTime,
                        straight_edges_sharp_corners: straightEdgesSharpCorners,
                        architectural_features: architecturalFeatures,
                        level_surface_smoothness: levelSurfaceSmoothness,
                        straight_edges: straightEdges,
                        right_angles_plumb: rightAnglesPlumb,
                        removal_of_dead_mortar_debris: removalOfDeadMortarDebris,
                        sealing_openings_in_masonry: sealingOpeningsInMasonry,
                        plastering_date_marked: plasteringDateMarked,
                        curing_duration: curingDuration,
                        supervisor_name: supervisorName,
                        supervisor_pno: supervisorPno,
                    }
                ]);
            if (error) {
                alert('Error', error.message);
            } else {
                alert('Success', 'Plastering QC checklist submitted successfully.');
            }
        } catch (error) {
            console.error('Error submitting checklist:', error);
            alert('Error', 'An unexpected error occurred while submitting the checklist.');
        }
    };

    return (
        <div className='bg-blue-50 pb-20 p-5'>
            <Title text="Plastering QC Checklist" />

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

            <CheckListItem label="Proper mixing of mortar" value={properMixingOfMortar} setValue={setProperMixingOfMortar} />
            <InputField icon={locationIcon} placeholder="Mortar mix proportion" handleInputChange={setMortarMixProportion} />

            <CheckListItem label="Waterproofing compound" value={waterproofingCompound} setValue={setWaterproofingCompound} />
            <CheckListItem label="Completion of ceiling plaster" value={ceilingPlasterCompletion} setValue={setCeilingPlasterCompletion} />
            <CheckListItem label="Plastering sequence" value={plasteringSequence} setValue={setPlasteringSequence} />
            <CheckListItem label="Wetting of surface before plastering" value={wettingSurfaceBeforePlastering} setValue={setWettingSurfaceBeforePlastering} />

            <InputField icon={locationIcon} placeholder="Thickness and number of coats" handleInputChange={setThicknessAndNumberOfCoats} />

            <CheckListItem label="True level of surface" value={trueLevelSurface} setValue={setTrueLevelSurface} />
            <InputField icon={locationIcon} placeholder="Initial Setting Time" handleInputChange={setInitialSettingTime} />

            <CheckListItem label="Straight edges and sharp corners" value={straightEdgesSharpCorners} setValue={setStraightEdgesSharpCorners} />
            <CheckListItem label="Architectural features" value={architecturalFeatures} setValue={setArchitecturalFeatures} />
            <CheckListItem label="Level surface smoothness" value={levelSurfaceSmoothness} setValue={setLevelSurfaceSmoothness} />
            <CheckListItem label="Straight edges" value={straightEdges} setValue={setStraightEdges} />
            <CheckListItem label="Right angles and plumb" value={rightAnglesPlumb} setValue={setRightAnglesPlumb} />
            <CheckListItem label="Removal of dead mortar debris" value={removalOfDeadMortarDebris} setValue={setRemovalOfDeadMortarDebris} />
            <CheckListItem label="Sealing of openings in masonry" value={sealingOpeningsInMasonry} setValue={setSealingOpeningsInMasonry} />
            <CheckListItem label="Plastering date marked" value={plasteringDateMarked} setValue={setPlasteringDateMarked} />
            <InputField icon={locationIcon} placeholder="Curing Duration" handleInputChange={setCuringDuration} />



            <SubmitButton handleSubmit={handleSubmit} text="Submit" />
        </div>
    );
};

export default PlasteringQCForm;
