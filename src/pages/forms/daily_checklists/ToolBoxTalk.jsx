import React, { useState } from 'react';
import supabase from '../../../supabase';
import InputField from '../../../components/InputField';
import SubmitButton from '../../../components/PrimaryButton';
import Title from '../../../components/Title';
import locationIcon from '../../../assets/location.png';
import { useVendor } from '../../../context/vendorContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Checkbox, IconButton } from '@mui/joy';
import moment from 'moment';


import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import ArrowBackIcon from @mui/icons-material
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import ArrowForwardIcon from @mui/icons-material

const ToolBoxTalk = () => {
    const { vendorId, user_id } = useVendor();
    const { projectId, logId } = useParams();
    const navigate = useNavigate();

    console.log(projectId, logId);


    const [sopNumber, setSopNumber] = useState('');
    const [workPermit, setWorkPermit] = useState('');
    const [location, setLocation] = useState('');
    const [department, setDepartment] = useState('');
    const [supervisor, setSupervisor] = useState('');
    const [safetyRep, setSafetyRep] = useState('');
    const [contractorRep, setContractorRep] = useState('');
    const [safetyContact, setSafetyContact] = useState('');
    const [actionItems, setActionItems] = useState('');
    const [prevIncidents, setPrevIncidents] = useState('');
    const [safetyMessage, setSafetyMessage] = useState('');
    const [numWorkers, setNumWorkers] = useState('');
    const [numSupervisors, setNumSupervisors] = useState('');
    const [hazard, setHazard] = useState('');
    const [checkedStripes, setCheckedStripes] = useState([]);
    const [reminders, setReminders] = useState([]);

    const stripesList = ['Red', 'Orange', 'Green'];

    const remindersList = [
        "PPE", "Housekeeping", "Tools and Tackles", "Electrical Equipment Condition",
        "Six Directional Hazards", "Work Permits", "No Alcohol regulations",
        "Safe Behaviour and Its Importance", "Gas Hazards", "First Aid",
        "Other Hazardous Material", "Team Work Approach"
    ];

    const handleStripesChange = (label) => {
        setCheckedStripes((prev) =>
            prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
        );
    };

    const handleReminders = (label) => {
        setReminders((prev) =>
            prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
        );
    };

    const addEntry = async () => {
        try {
            const { data, error } = await supabase.from('tool_box_talk').insert([
                {
                    created_on: moment().format(),
                    department: department,
                    safety_rep: safetyRep,
                    contractor_rep: contractorRep,
                    num_workers: parseInt(numWorkers),
                    num_supervisors: parseInt(numSupervisors),
                    supervisor_or_manager: supervisor,
                    SOP_no: sopNumber,
                    action_items: actionItems,
                    prev_incident: prevIncidents,
                    reminders: reminders,
                    safety_msg: safetyMessage,
                    hazards: hazard,
                    location: location,
                    safety_contact: parseInt(safetyContact),
                    stripes: checkedStripes,
                    vendor_id: vendorId,
                    project_id: projectId,
                    created_by: user_id,
                    log_id: logId,
                },
            ]);

            if (error) {
                alert('Error: ' + error.message);
            } else {
                alert('Success: Entry added successfully');
                // navigate(-1);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const InputFieldParams = [
        { icon: locationIcon, placeholder: 'SOP Number', handleInputChange: setSopNumber },
        { icon: locationIcon, placeholder: 'Work Permit', handleInputChange: setWorkPermit },
        { icon: locationIcon, placeholder: 'Location', handleInputChange: setLocation },
        { icon: locationIcon, placeholder: 'Department', handleInputChange: setDepartment },
        { icon: locationIcon, placeholder: 'Supervisor or Manager', handleInputChange: setSupervisor },
        { icon: locationIcon, placeholder: 'Safety Representative', handleInputChange: setSafetyRep },
        { icon: locationIcon, placeholder: 'Contractor Representative', handleInputChange: setContractorRep },
        { icon: locationIcon, placeholder: 'Safety Contact', handleInputChange: setSafetyContact },
        { icon: locationIcon, placeholder: 'Action Items', handleInputChange: setActionItems },
        { icon: locationIcon, placeholder: 'Previous Incidents', handleInputChange: setPrevIncidents },
        { icon: locationIcon, placeholder: 'Safety Message', handleInputChange: setSafetyMessage },
        { icon: locationIcon, placeholder: 'Number of Workers', handleInputChange: setNumWorkers },
        { icon: locationIcon, placeholder: 'Number of Supervisors', handleInputChange: setNumSupervisors },
        { icon: locationIcon, placeholder: 'Hazard', handleInputChange: setHazard }
    ];

    return (
        <div className="bg-blue-50 pb-20 p-5">
            <div className="flex justify-between items-center">
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
                <Title text="Tool Box Talk" />
                <IconButton onClick={() => navigate(`/create-log/${projectId}/tool-box-talk/${logId}`)}>
                    <ArrowForwardIcon />
                </IconButton>
            </div>
            <div className="items-center justify-center flex flex-col">
                {InputFieldParams.map((params, index) => (
                    <InputField
                        key={index}
                        icon={params.icon}
                        placeholder={params.placeholder}
                        handleInputChange={params.handleInputChange}
                        name={params.name}
                    />
                ))}
            </div>

            <div className="items-center justify-center flex flex-col">
                <strong>Reminders</strong>
                <div
                    className="my-2 p-4 bg-white shadow-md rounded-md flex items-center space-x-4 w-full sm:w-4/5 md:w-4/5 lg:w-full"
                    style={{ maxWidth: '600px' }}
                >


                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 m-auto">
                        {remindersList.map((label, index) => (
                            <div key={index} className="flex items-center space-x-2"> {/* Added space-x-2 */}
                                <Checkbox
                                    color="primary"
                                    variant="soft"
                                    checked={reminders.includes(label)}
                                    onChange={() => handleReminders(label)}
                                />
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="my-2 p-4 bg-white shadow-md rounded-md flex items-center space-x-4 w-full sm:w-4/5 md:w-4/5 lg:w-full"
                    style={{ maxWidth: '600px' }}
                >
                    <strong>Stripes</strong>
                    <div className="flex items-center space-x-2"> {/* Added space-x-2 */}
                        {stripesList.map((label, index) => (
                            <div key={index} className="flex items-center space-x-2"> {/* Added space-x-2 */}
                                <Checkbox
                                    color="primary"
                                    variant="soft"
                                    checked={checkedStripes.includes(label)}
                                    onChange={() => handleStripesChange(label)}
                                />
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <SubmitButton handleSubmit={addEntry} text="Submit" />
        </div>
    );
};

export default ToolBoxTalk;