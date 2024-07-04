import React, { useState } from 'react';
import supabase from '../../../supabase'; // Make sure to set up Supabase client

import { InputField } from '../../../components/InputField';
import CheckListItem from '../../../components/CheckListItem';
import locationIcon from '../../../assets/location.png'; // Ensure you have these icons in your assets
import SubmitButton from '../../../components/PrimaryButton';

const BrickMasonryQCForm = () => {
    const [projectID, setProjectID] = useState('');
    const [structure, setStructure] = useState('');
    const [quantity, setQuantity] = useState('');
    const [refDrgNo, setRefDrgNo] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const [availabilityOfBricks, setAvailabilityOfBricks] = useState('');
    const [cleaningWorkArea, setCleaningWorkArea] = useState('');
    const [alignmentLocationMasonry, setAlignmentLocationMasonry] = useState('');
    const [suitabilitySafetyScaffolding, setSuitabilitySafetyScaffolding] = useState('');
    const [wettingBricksBeforePlacing, setWettingBricksBeforePlacing] = useState('');
    const [mortarMixProportionJointThickness, setMortarMixProportionJointThickness] = useState('');
    const [bricksLaidWithFrogsUp, setBricksLaidWithFrogsUp] = useState('');
    const [dimensionsPlumbLevelsAngles, setDimensionsPlumbLevelsAngles] = useState('');
    const [bondBetweenOldNewMasonry, setBondBetweenOldNewMasonry] = useState('');
    const [staggeringVerticalJoints, setStaggeringVerticalJoints] = useState('');
    const [sizesOpeningsDoorsWindows, setSizesOpeningsDoorsWindows] = useState('');
    const [cleaningRakingJoints, setCleaningRakingJoints] = useState('');
    const [curingOldMasonry, setCuringOldMasonry] = useState('');
    const [removalOfDebris, setRemovalOfDebris] = useState('');
    const [noOfCoursesRestricted, setNoOfCoursesRestricted] = useState('');
    const [mixProportion, setMixProportion] = useState('');

    const [contractor, setContractor] = useState('');
    const [tslSiteEngg, setTslSiteEngg] = useState('');
    const [tslQA, setTslQA] = useState('');

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_brick_masonry_qc')
                .insert([
                    {
                        project_id: parseInt(projectID),
                        structure,
                        date: new Date(),
                        quantity: parseInt(quantity),
                        ref_drg_no: refDrgNo,
                        location,
                        checklist_id: 4,
                        description,
                        availability_of_bricks: availabilityOfBricks,
                        cleaning_work_area: cleaningWorkArea,
                        alignment_location_masonry: alignmentLocationMasonry,
                        suitability_safety_scaffolding: suitabilitySafetyScaffolding,
                        wetting_bricks_before_placing: wettingBricksBeforePlacing,
                        mortar_mix_proportion_joint_thickness: mortarMixProportionJointThickness,
                        bricks_laid_with_frogs_up: bricksLaidWithFrogsUp,
                        dimensions_plumb_levels_angles: dimensionsPlumbLevelsAngles,
                        bond_between_old_new_masonry: bondBetweenOldNewMasonry,
                        staggering_vertical_joints: staggeringVerticalJoints,
                        sizes_openings_doors_windows: sizesOpeningsDoorsWindows,
                        cleaning_raking_joints: cleaningRakingJoints,
                        curing_old_masonry: curingOldMasonry,
                        removal_of_debris: removalOfDebris,
                        no_of_courses_restricted: noOfCoursesRestricted,
                        contractor,
                        tsl_site_engg: tslSiteEngg,
                        tsl_qa: tslQA,
                        mix_proportion: mixProportion,
                    }
                ]);

            if (error) {
                alert('Error', error.message);
            } else {
                alert('Success', 'Brick Masonry QC checklist submitted successfully.');
            }
        } catch (error) {
            console.error('Error submitting checklist:', error);
            alert('Error', error.message);
        }
    };

    return (
        <div className='bg-blue-50 pb-20 p-5'>
            <div className='w-full py-5'>
                <p className='text-center sm:text-3xl text-2xl font-bold text-gray-800 mt-6 mb-5'>Brick Masonry QC Checklist</p>
            </div>

            <div className='items-center justify-center flex flex-col'>
                <InputField icon={locationIcon} placeholder="Project ID" handleInputChange={setProjectID} />
                <InputField icon={locationIcon} placeholder="Structure" handleInputChange={setStructure} />
                <InputField icon={locationIcon} placeholder="Quantity" handleInputChange={setQuantity} />
                <InputField icon={locationIcon} placeholder="Ref Drg No." handleInputChange={setRefDrgNo} />
                <InputField icon={locationIcon} placeholder="Location" handleInputChange={setLocation} />
                <InputField icon={locationIcon} placeholder="Description" handleInputChange={setDescription} />
                <InputField icon={locationIcon} placeholder="Contractor" handleInputChange={setContractor} />
                <InputField icon={locationIcon} placeholder="TSL Site Engg" handleInputChange={setTslSiteEngg} />
                <InputField icon={locationIcon} placeholder="TSL QA" handleInputChange={setTslQA} />
            </div>

            <CheckListItem label="Availability of bricks as per daily requirements" value={availabilityOfBricks} setValue={setAvailabilityOfBricks} />
            <CheckListItem label="Cleaning of work area" value={cleaningWorkArea} setValue={setCleaningWorkArea} />
            <CheckListItem label="Alignment and location of masonry" value={alignmentLocationMasonry} setValue={setAlignmentLocationMasonry} />
            <CheckListItem label="Suitability and safety of scaffolding" value={suitabilitySafetyScaffolding} setValue={setSuitabilitySafetyScaffolding} />
            <CheckListItem label="Wetting of bricks before placing" value={wettingBricksBeforePlacing} setValue={setWettingBricksBeforePlacing} />
            <CheckListItem label="Mortar mix proportion and joint thickness" value={mortarMixProportionJointThickness} setValue={setMortarMixProportionJointThickness} />
            <CheckListItem label="Bricks laid with frogs up" value={bricksLaidWithFrogsUp} setValue={setBricksLaidWithFrogsUp} />
            <CheckListItem label="Dimensions, plumb levels, and angles" value={dimensionsPlumbLevelsAngles} setValue={setDimensionsPlumbLevelsAngles} />
            <CheckListItem label="Bond between old and new masonry" value={bondBetweenOldNewMasonry} setValue={setBondBetweenOldNewMasonry} />
            <CheckListItem label="Staggering of vertical joints" value={staggeringVerticalJoints} setValue={setStaggeringVerticalJoints} />
            <CheckListItem label="Sizes of openings for doors and windows" value={sizesOpeningsDoorsWindows} setValue={setSizesOpeningsDoorsWindows} />
            <CheckListItem label="Cleaning and raking of joints" value={cleaningRakingJoints} setValue={setCleaningRakingJoints} />
            <CheckListItem label="Curing of old masonry" value={curingOldMasonry} setValue={setCuringOldMasonry} />
            <CheckListItem label="Removal of debris" value={removalOfDebris} setValue={setRemovalOfDebris} />
            <CheckListItem label="Number of courses restricted per day" value={noOfCoursesRestricted} setValue={setNoOfCoursesRestricted} />
            <CheckListItem label="Mix proportion" value={mixProportion} setValue={setMixProportion} />

            <SubmitButton handleSubmit={handleSubmit} text="Submit" />
        </div>
    );
};

export default BrickMasonryQCForm;
