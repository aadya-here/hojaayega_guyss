import React, { useState, useEffect } from 'react';
import { Checkbox, Sheet, Modal, Typography, IconButton } from '@mui/joy'; // Assuming these are Material UI components
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip from @mui/material
import RefreshIcon from '@mui/icons-material/Refresh'; // Import RefreshIcon from '@mui/icons-material
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import ArrowBackIcon from @mui/icons-material
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import ArrowForwardIcon from @mui/icons-material
import supabase from '../../../supabase'; // Assuming you have a supabase instance imported
import { useNavigate, useParams } from 'react-router-dom';
import { useVendor } from '../../../context/vendorContext';
import { getUserId } from '../../../helpers/fetchUser';
import InputField from '../../../components/ui_components/InputField';
import SubmitButton from '../../../components/ui_components/PrimaryButton';
import locationIcon from '../../../assets/location.png';
import PPEEntryCard from '../../../components/info_cards/PPECard';
import Subheading from '../../../components/ui_components/Subheading';
import Title from '../../../components/ui_components/Title';
import SecondaryButton from '../../../components/ui_components/SecondaryButton';

const PPEChecklist = () => {
    const { vendorId } = useVendor();
    const { projectId, logId } = useParams();


    const [entriesList, setEntriesList] = useState([]);

    const [vendorList, setVendorList] = useState([]);
    const [selectedPpeItems, setSelectedPpeItems] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [pNo, setPNo] = useState('');
    const [name, setName] = useState('');
    const [remarks, setRemarks] = useState('');
    const [userId, setUserId] = useState('');

    const navigate = useNavigate();

    const ppe_items = [
        { key: 'helmet', value: 'Helmet' },
        { key: 'shoes', value: 'Shoes' },
        { key: 'gloves', value: 'Gloves' },
        { key: 'goggles', value: 'Goggles' },
        { key: 'fluorescent_jacket', value: 'Fluorescent Jacket' },
        { key: 'fire_jacket', value: 'Fire Jacket' },
        { key: 'mask', value: 'Mask' },
        { key: 'ear_plugs', value: 'Ear Plugs' },
        { key: 'shin_guard', value: 'Shin Guard' },
        { key: 'rubber_gloves', value: 'Rubber Gloves' },
        { key: 'gum_boot', value: 'Gum Boot' },
        { key: 'safety_belt', value: 'Safety Belt' },
        { key: 'face_shield', value: 'Face Shield' },
        { key: 'screen_guard', value: 'Screen Guard' },
        { key: 'gas_cutting_goggles', value: 'Gas Cutting Goggles' },
        { key: 'leather_gloves', value: 'Leather Gloves' }
    ];

    useEffect(() => {
        const fetchUser = async () => {
            const id = await getUserId();
            setUserId(id);
        };

        fetchUser();
        fetchEntries();
    }, []);

    const handleCheckBoxChange = (itemKey) => {
        setSelectedPpeItems(prevSelectedItems =>
            prevSelectedItems.includes(itemKey)
                ? prevSelectedItems.filter(i => i !== itemKey)
                : [...prevSelectedItems, itemKey]
        );
    };

    const handleAdd = async () => {
        try {
            const { data, error } = await supabase
                .from('ppe_checklist')
                .insert([
                    {
                        vendor_id: vendorId,
                        log_id: logId,
                        created_on: new Date().toISOString().split('T')[0],
                        project_id: projectId,
                        ppe_items: selectedPpeItems,
                        p_no: pNo,
                        name: name,
                        remarks: remarks,
                        created_by: userId,
                    }
                ]);
            if (error) {
                console.error('Error inserting PPE checklist:', error);
                alert('Error', error.message);
            } else {
                console.log('PPE checklist inserted successfully:', data);
                setVendorList([...vendorList, { p_no: pNo, name: name, ppe_items: selectedPpeItems, remarks: remarks }]);
                setModalVisible(false);
                setPNo('');
                setName('');
                setRemarks('');
            }
        } catch (error) {
            console.error('Error creating PPE checklist:', error);
            alert('Error', 'An unexpected error occurred while creating the PPE checklist.');
        }
    };

    console.log(vendorId);

    const fetchEntries = async () => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const { data, error } = await supabase
                .from('ppe_checklist')
                .select('*')
                .eq('log_id', logId)
                .eq('vendor_id', vendorId)
                .eq('created_on', today);

            if (error) {
                console.error('Error', error);
                return;
            }

            setEntriesList(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    const handleClearSelection = () => {
        setSelectedPpeItems([]);
    };

    const handleDelete = async (entry) => {
        try {
            const { data, error } = await supabase
                .from('ppe_checklist')
                .delete()
                .eq('id', entry.id);

            if (error) {
                console.error('Error deleting PPE checklist entry:', error);
                alert('Error', error.message);
            } else {
                console.log('PPE checklist entry deleted successfully:', data);
                alert('PPE checklist entry deleted successfully. Please Refresh.')
                setVendorList(vendorList.filter(item => item.id !== entry.id));
            }
        } catch (error) {
            console.error('Error deleting PPE checklist entry:', error);
            alert('Error', 'An unexpected error occurred while deleting the PPE checklist entry.');
        }
    };


    return (
        <div className="w-full min-h-screen bg-blue-50 p-8">
            <div className="flex justify-between items-center">
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
                <Title text="PPE Checklist" />
                <IconButton onClick={() => navigate(`/create-log/${projectId}/tool-box-talk/${logId}`)}>
                    <ArrowForwardIcon />
                </IconButton>
            </div>

            <div className="w-full m-auto">
                <Sheet variant="outlined">
                    <div className="flex items-center justify-between m-5">
                        <Typography level="h4">PPE Items</Typography>
                        <button
                            className="bg-red-100 hover:bg-red-200 text-red-500 py-1 px-2 rounded-md"
                            onClick={handleClearSelection}
                        >
                            Clear
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 m-auto">
                        {ppe_items.map(item => (
                            <Checkbox
                                variant='soft'
                                key={item.key}
                                label={item.value}
                                checked={selectedPpeItems.includes(item.key)}
                                onChange={() => handleCheckBoxChange(item.key)}
                            />
                        ))}
                    </div>
                </Sheet>
            </div>

            {/* Modal for adding details */}
            <Modal open={modalVisible} onClose={() => setModalVisible(false)}>
                <div className="p-4 bg-blue-50 shadow-md rounded-md w-80 max-w-md mx-auto my-8 md:my-16">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Add Details</h2>

                        <button
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={() => setModalVisible(false)}
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <InputField
                        icon={locationIcon}
                        placeholder="Gate Pass No."
                        handleInputChange={setPNo}
                        value={pNo}
                    />
                    <InputField
                        icon={locationIcon}
                        placeholder="Name"
                        handleInputChange={setName}
                        value={name}
                    />
                    <InputField
                        icon={locationIcon}
                        placeholder="Remarks"
                        handleInputChange={setRemarks}
                        value={remarks}
                    />
                    <SubmitButton text="Add" handleSubmit={handleAdd} />
                </div>
            </Modal>
            <br></br>
            <SecondaryButton onClick={() => setModalVisible(true)} text="Add Entries" />

            <div className="flex items-center justify-between">
                <Subheading text="PPE Checklist Entries" />
                <Tooltip title="Refresh" placement="top">
                    <IconButton onClick={fetchEntries}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            </div>

            <div className="p-3 flex flex-col items-center lg:items-center lg:justify-center">
                {entriesList.length === 0 ? (
                    <p>No entries found for today.</p>
                ) : (
                    entriesList.map((entry, index) => (
                        <PPEEntryCard
                            key={index}
                            entry={entry}
                            // onEdit={handleEdit}
                            onDelete={() => handleDelete(entry)}
                        />

                    ))
                )}
            </div>
        </div>
    );
};

export default PPEChecklist;
