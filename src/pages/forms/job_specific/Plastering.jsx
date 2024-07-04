import React, { useState } from 'react';
import supabase from '../../../supabase'; // Make sure to set up Supabase client

import InputField from '../../../components/InputField';
import CheckListItem from '../../../components/CheckListItem';
import locationIcon from '../../../assets/location.png'; // Ensure you have these icons in your assets
import SubmitButton from '../../../components/PrimaryButton';
import Title from '../../../components/Title';
import { useVendor } from '../../../context/vendorContext';
import { addFormLog } from '../../../helpers/addFormLog';


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
    const form_num = 5;
    const { vendorId } = useVendor();

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
                        form_num: form_num,
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
                ]).select();

            if (error) {
                alert('Error', error.message);
            } else {

                alert('Plastering QC checklist submitted successfully.');
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
        {
            icon: locationIcon,
            placeholder: 'Mortar mix proportion',
            handleInputChange: setMortarMixProportion,
        },
        {
            icon: locationIcon,
            placeholder: 'Thickness and number of coats',
            handleInputChange: setThicknessAndNumberOfCoats,
        },
        {
            icon: locationIcon,
            placeholder: 'Initial Setting Time',
            handleInputChange: setInitialSettingTime,
        },
        {
            icon: locationIcon,
            placeholder: 'Curing Duration',
            handleInputChange: setCuringDuration,
        },
    ];

    const checkListItems = [
        {
            label: 'Proper mixing of mortar',
            value: properMixingOfMortar,
            setValue: setProperMixingOfMortar,
        },
        {
            label: 'Waterproofing compound',
            value: waterproofingCompound,
            setValue: setWaterproofingCompound,
        },
        {
            label: 'Completion of ceiling plaster',
            value: ceilingPlasterCompletion,
            setValue: setCeilingPlasterCompletion,
        },
        {
            label: 'Plastering sequence',
            value: plasteringSequence,
            setValue: setPlasteringSequence,
        },
        {
            label: 'Wetting of surface before plastering',
            value: wettingSurfaceBeforePlastering,
            setValue: setWettingSurfaceBeforePlastering,
        },
        {
            label: 'True level of surface',
            value: trueLevelSurface,
            setValue: setTrueLevelSurface,
        },
        {
            label: 'Straight edges and sharp corners',
            value: straightEdgesSharpCorners,
            setValue: setStraightEdgesSharpCorners,
        },
        {
            label: 'Architectural features',
            value: architecturalFeatures,
            setValue: setArchitecturalFeatures,
        },
        {
            label: 'Level surface smoothness',
            value: levelSurfaceSmoothness,
            setValue: setLevelSurfaceSmoothness,
        },
        {
            label: 'Straight edges',
            value: straightEdges,
            setValue: setStraightEdges,
        },
        {
            label: 'Right angles and plumb',
            value: rightAnglesPlumb,
            setValue: setRightAnglesPlumb,
        },
        {
            label: 'Removal of dead mortar debris',
            value: removalOfDeadMortarDebris,
            setValue: setRemovalOfDeadMortarDebris,
        },
        {
            label: 'Sealing of openings in masonry',
            value: sealingOpeningsInMasonry,
            setValue: setSealingOpeningsInMasonry,
        },
        {
            label: 'Plastering date marked',
            value: plasteringDateMarked,
            setValue: setPlasteringDateMarked,
        },
    ];


    return (
        <div className='bg-blue-50 pb-20 p-5'>
            <Title text="Plastering QC Checklist" />

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

export default PlasteringQCForm;
