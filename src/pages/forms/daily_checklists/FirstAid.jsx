import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../../../supabase';
import InputField from '../../../components/InputField';
import SubmitButton from '../../../components/PrimaryButton';
import Title from '../../../components/Title';
import { useVendor } from '../../../context/vendorContext';
import { Checkbox, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DatePickerComponent from '../../../components/Datepicker';

const FirstAidForm = () => {
    const navigate = useNavigate();
    const { logId, projectId } = useParams();
    const { vendorId } = useVendor();

    const [firstAidItems, setFirstAidItems] = useState({
        stretcher: false,
        oxypack: false,
        first_aid_box: false,
        gas_detector: false,
    });
    const [gasDetectorCalibration, setGasDetectorCalibration] = useState(new Date());
    const [gasDetectorExpiry, setGasDetectorExpiry] = useState(new Date());
    const [remarks, setRemarks] = useState('');

    const handleCheckBoxChange = (key) => {
        setFirstAidItems(prevState => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const addFirstAid = async () => {
        try {
            const { data, error } = await supabase.from('first_aid').insert([
                {
                    log_id: logId,
                    first_aid_box: firstAidItems.first_aid_box,
                    stretcher: firstAidItems.stretcher,
                    oxy_pack: firstAidItems.oxypack,
                    gas_detector: firstAidItems.gas_detector,
                    gas_detector_calibration: gasDetectorCalibration,
                    gas_detector_expiry: gasDetectorExpiry,
                    remarks: remarks,
                }
            ]).select();

            if (error) {
                console.error('Error adding first aid record:', error.message);
                return;
            }

            const currentDate = new Date();
            const threeDaysBeforeExpiry = new Date(gasDetectorExpiry);
            threeDaysBeforeExpiry.setDate(threeDaysBeforeExpiry.getDate() - 3);

            if (currentDate >= threeDaysBeforeExpiry) {
                alert('Gas Detector Needs Calibration\nGas Detector needs to be recalibrated, proceed with caution');
            }

            console.log('First aid record added:', data);
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    return (
        <div className="bg-blue-50 pb-20 p-5 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                <div className="flex justify-between items-center mb-4">
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Title text="First Aid Form" />
                    <IconButton onClick={() => navigate(`/create-log/${projectId}/tool-box-talk/${logId}`)}>
                        <ArrowForwardIcon />
                    </IconButton>
                </div>

                <div className="w-full flex flex-col items-center">
                    <div className="my-2 p-2 bg-white shadow-md rounded-md flex flex-col items-start w-full sm:w-4/5 md:w-4/5 lg:w-full" style={{ maxWidth: '600px' }}>
                        <strong className="block mb-2">First Aid Items</strong>
                        <div className="grid grid-cols-2 gap-4 w-full">
                            {Object.entries(firstAidItems).map(([key, value]) => (
                                <div key={key} className="flex items-center space-x-2">
                                    <Checkbox
                                        color="primary"
                                        checked={value}
                                        onChange={() => handleCheckBoxChange(key)}
                                    />
                                    <span>{key.replace(/_/g, ' ')}</span>
                                </div>
                            ))}
                        </div>
                    </div>


                    <DatePickerComponent
                        selectedDate={gasDetectorCalibration}
                        onChangeDate={setGasDetectorCalibration}
                        label="Gas Detector Calibration"
                    />
                    <DatePickerComponent
                        selectedDate={gasDetectorExpiry}
                        onChangeDate={setGasDetectorExpiry}
                        label="Gas Detector Expiry"
                    />


                    <InputField
                        placeholder="Remarks"
                        handleInputChange={setRemarks}
                    />



                </div>
                <SubmitButton handleSubmit={addFirstAid} text="Submit" />

            </div>
        </div>
    );
};

export default FirstAidForm;
