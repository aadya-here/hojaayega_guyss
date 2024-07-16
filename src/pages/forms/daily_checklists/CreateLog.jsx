import React, { useState } from "react";
import Title from "../../../components/ui_components/Title";
import InputField from "../../../components/ui_components/InputField";
import { useVendor } from '../../../context/vendorContext';
import supabase from '../../../supabase';
import locationIcon from '../../../assets/location.png';
import { useNavigate, useParams } from "react-router-dom";
import SubmitButton from "../../../components/ui_components/PrimaryButton";
import SecondaryButton from "../../../components/ui_components/SecondaryButton";
import AddPhoto from "../../../components/AddPhoto";
import { Divider } from "@mui/material";
import { useAuth } from "../../../context/authContext";
// import { newDate } from "react-datepicker/dist/date_utils";

const CreateLog = () => {
    const { vendorId } = useVendor();
    const { userId } = useAuth();
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [workPermit, setWorkPermit] = useState('');
    const [sopNumber, setSopNumber] = useState('');
    const [numberOfWorkers, setNumberOfWorkers] = useState('');
    const [validFrom, setValidFrom] = useState(new Date());
    const [validTill, setValidTill] = useState(new Date());
    const [logId, setLogId] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [showAddPhoto, setShowAddPhoto] = useState(false);
    const [jobDescription, setJobDescription] = useState('');
    const [remarks, setRemarks] = useState('');

    const addLog = async () => {
        try {
            const { data, error } = await supabase.from('logs').insert([
                {
                    vendor_id: vendorId,
                    project_id: projectId,
                    work_permit: workPermit,
                    valid_from: new Date(),
                    valid_till: new Date(),
                    num_workers: parseInt(numberOfWorkers),
                    created_by: userId,
                    created_on: new Date(),
                    job_desc: jobDescription,
                    remarks: remarks,
                }
            ]).select();

            if (error) {
                console.error('Error adding log:', error);
                return null;
            }

            const logID = data[0].log_id;
            setLogId(logID);
            alert('Log added successfully');
            console.log('Log added with ID:', logID);
            return logID;
        } catch (error) {
            alert('Unexpected error:', error.message);
            console.error('Unexpected error:', error);
            return null;
        }
    };

    const handleSubmit = async () => {
        try {
            const logID = await addLog();
            if (logID) {
                setShowAddPhoto(true);  // Show AddPhoto component after log is created
            }
        } catch (error) {
            alert('Unexpected error:', error.message);
        }
    };

    const handlePhotoAdded = (url) => {
        setPhotoUrl(url);
    };

    const handleAddPhotoClick = () => {
        setShowAddPhoto(!showAddPhoto);
    };

    const handleContinue = () => {
        navigate(`ppe-checklist/${logId}`);
    };

    return (
        <div className="w-full min-h-screen bg-blue-50 p-8">
            <div className='items-center justify-center flex flex-col'>
                <Title text="Create Log" />
                <InputField icon={locationIcon} placeholder="Job Description" handleInputChange={setJobDescription} />
                <InputField icon={locationIcon} placeholder="Work Permit" handleInputChange={setWorkPermit} />
                {/* <InputField icon={locationIcon} placeholder="SOP Number" handleInputChange={setSopNumber} /> */}
                <InputField icon={locationIcon} placeholder="Number of Workers" handleInputChange={setNumberOfWorkers} />
                <InputField icon={locationIcon} placeholder="Remarks" handleInputChange={setRemarks} />

                {/* <InputField icon={locationIcon} placeholder="Valid From" handleInputChange={setValidFrom} type="date" />
                <InputField icon={locationIcon} placeholder="Valid Till" handleInputChange={setValidTill} type="date" /> */}
            </div>
            <SubmitButton text="Add Log" handleSubmit={handleSubmit} />



            {logId && (
                <div className="flex items-center justify-center">
                    <div className='w-4/5 max-w-md flex flex-col justify-center'>
                        {showAddPhoto && (
                            <AddPhoto
                                logId={logId}
                                userId={userId}
                                folderPath={`logs`}
                                onPhotoAdded={handlePhotoAdded}
                                tag={`log`}
                            />
                        )}
                        <SecondaryButton text="Continue to PPE Checklist" onClick={handleContinue} />
                    </div>
                </div>
            )}
            <br />
            <br />
        </div>
    );
};

export default CreateLog;