import React, { useState } from "react";
import Title from "../../../components/Title";
import InputField from "../../../components/InputField"; // Ensure this component exists
import { useVendor } from '../../../context/vendorContext'; // Adjust the import based on your hook location
import supabase from '../../../supabase'; // Adjust the import based on your Supabase setup
import locationIcon from '../../../assets/location.png'; // Adjust the import based on your assets location
import { useNavigate, useParams } from "react-router-dom";
import SubmitButton from "../../../components/PrimaryButton";
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PPEChecklist from "./PPEChecklist";
import Subheading from "../../../components/Subheading";
import ToolBoxTalk from "./ToolBoxTalk";
import SecondaryButton from "../../../components/SecondaryButton";

const CreateLog = () => {
    const { vendorId, user_id } = useVendor();
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [workPermit, setWorkPermit] = useState('');
    const [sopNumber, setSopNumber] = useState('');
    const [numberOfWorkers, setNumberOfWorkers] = useState('');
    const [validFrom, setValidFrom] = useState(new Date());
    const [validTill, setValidTill] = useState(new Date());
    const [logId, setLogId] = useState(null);

    const addLog = async () => {
        try {
            const { data, error } = await supabase.from('logs').insert([
                {
                    vendor_id: vendorId,
                    project_id: projectId,
                    work_permit: workPermit,
                    valid_from: validFrom.toISOString(),
                    valid_till: validTill.toISOString(),
                    num_workers: parseInt(numberOfWorkers),
                    created_by: user_id,
                    created_on: new Date()
                }
            ]).select();

            if (error) {
                console.error('Error adding log:', error);
                return;
            }

            const logID = data[0].log_id;
            setLogId(logID);
            alert('Log added successfully');
            console.log('Log added with ID:', logID);
        } catch (error) {
            alert('Unexpected error:', error.message);
            console.error('Unexpected error:', error);
        }
    };

    return (
        <div className="w-full min-h-screen bg-blue-50 p-8">
            <div className='items-center justify-center flex flex-col'>
                <Title text="Create Log" />
                <InputField icon={locationIcon} placeholder="Work Permit" handleInputChange={setWorkPermit} />
                <InputField icon={locationIcon} placeholder="SOP Number" handleInputChange={setSopNumber} />
                <InputField icon={locationIcon} placeholder="Number of Workers" handleInputChange={setNumberOfWorkers} />
                <InputField icon={locationIcon} placeholder="Valid From" handleInputChange={setValidFrom} type="date" />
                <InputField icon={locationIcon} placeholder="Valid Till" handleInputChange={setValidTill} type="date" />
            </div>
            <SubmitButton text="Add Log" handleSubmit={addLog} />

            <Subheading text="Daily Checklists" />
            <SecondaryButton text="PPE Checklist" onClick={() => navigate(`ppe-checklist/${logId}`)} />
            <br></br>
            <SecondaryButton text="Tool Box Talk" onClick={() => navigate(`tool-box-talk/${logId}`)} />

            <br></br>
            <br></br>

        </div>
    );
};

export default CreateLog;
