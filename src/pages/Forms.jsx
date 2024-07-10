import React, { useState } from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import BrickMasonryQCForm from './forms/job_specific/BrickMasonry';
import MicroConcreteForm from './forms/job_specific/MicroConcrete';
import MortarPlasteringQCForm from './forms/job_specific/Mortar';
import PaintingQCForm from './forms/job_specific/Painting';
import PlasteringQCForm from './forms/job_specific/Plastering';
import SecondaryButton from '../components/ui_components/SecondaryButton'; // Ensure the correct path
import Title from '../components/ui_components/Title';

const Forms = () => {
    const [activeForm, setActiveForm] = useState(null);



    const renderForm = () => {
        switch (activeForm) {
            case 'BrickMasonry':
                return <BrickMasonryQCForm />;
            case 'MicroConcrete':
                return <MicroConcreteForm />;
            case 'Mortar':
                return <MortarPlasteringQCForm />;
            case 'Painting':
                return <PaintingQCForm />;
            case 'Plastering':
                return <PlasteringQCForm />;
            default:
                return <div className="font-semibold text-center m-10">
                    Select a checklist item to view the form.
                </div>;
        }
    };

    return (
        <div className='bg-blue-50 pb-20 p-5 min-h-screen'>
            <Title text="Quality & Job Forms" />
            <div className="px-4 flex space-x-4 mx-auto sm:w-4/5 md:w-3/5 lg:w-3/5">
                <AccordionGroup className=" w-full max-w-full mb-5 flex">
                    <Accordion>
                        <AccordionSummary className="bg-blue-100 p-2 rounded-lg shadow-md text-blue-50">
                            Job Specific Checklist
                        </AccordionSummary>
                        <AccordionDetails>
                            <SecondaryButton onClick={() => setActiveForm('BrickMasonry')} text=" Brick Masonry QC Form" />
                            <SecondaryButton onClick={() => setActiveForm('MicroConcrete')} text="  Micro Concrete QC Form" />


                            <SecondaryButton onClick={() => setActiveForm('Mortar')} text="Mortar Plastering QC Form" />


                            <SecondaryButton onClick={() => setActiveForm('Painting')} text=" Painting QC Form" />

                            <SecondaryButton onClick={() => setActiveForm('Plastering')} text="Plastering QC Form" />

                        </AccordionDetails>
                    </Accordion>
                </AccordionGroup>
            </div>
            <div className="mx-0 p-0 w-full" style={{}}>
                {renderForm()}
            </div>
        </div>
    );
}

export default Forms;
