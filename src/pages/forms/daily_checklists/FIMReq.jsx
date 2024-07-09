import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../../../supabase';
import InputField from '../../../components/InputField';
import SubmitButton from '../../../components/PrimaryButton';
import Title from '../../../components/Title';
import { useVendor } from '../../../context/vendorContext';
import { IconButton, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add'

const FIMForm = () => {
    const navigate = useNavigate();
    const { logId, projectId } = useParams();
    const { vendorId } = useVendor();

    const [cement, setCement] = useState('');
    const [reinforcement, setReinforcement] = useState('');
    const [foundationBolts, setFoundationBolts] = useState('');
    const [barDiaInfo, setBarDiaInfo] = useState([{ dia: '', amount: '' }]);
    const [boltsRemarks, setBoltsRemarks] = useState('');

    const addBarDiaInfo = () => {
        setBarDiaInfo([...barDiaInfo, { dia: '', amount: '' }]);
    };

    const handleBarDiaChange = (index, field, value) => {
        const newBarDiaInfo = [...barDiaInfo];
        newBarDiaInfo[index][field] = value;
        setBarDiaInfo(newBarDiaInfo);
    };

    const removeBarDiaInfo = (index) => {
        const newBarDiaInfo = barDiaInfo.filter((_, i) => i !== index);
        setBarDiaInfo(newBarDiaInfo);
    };

    const addFIM = async () => {
        try {
            const { data, error } = await supabase.from('FIM_use').insert([
                {
                    log_id: logId,
                    cement: parseFloat(cement),
                    reinforcement: parseFloat(reinforcement),
                    foundation_bolts: parseFloat(foundationBolts),
                    bar_dia_info: JSON.stringify(barDiaInfo.map(item => ({
                        dia: parseFloat(item.dia),
                        amount: parseFloat(item.amount)
                    }))),
                    bolts_remarks: boltsRemarks,
                    // vendor_id: vendorId
                }
            ]).select();

            if (error) {
                console.error('Error adding FIM record:', error.message);
                return;
            }

            console.log('FIM record added:', data);
            alert('FIM record added');

        } catch (error) {
            console.error('Unexpected error:', error);
            alert(error.message);
        }
    };

    return (
        <div className="bg-blue-50 pb-20 p-5 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                <div className="flex justify-between items-center mb-4">
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Title text="FIM Form" />
                    <IconButton onClick={() => navigate(`/create-log/${projectId}/fim-form/${logId}`)}>
                        <ArrowForwardIcon />
                    </IconButton>
                </div>

                <div className="w-full flex flex-col items-center">
                    <InputField
                        placeholder="Cement"
                        handleInputChange={setCement}
                        value={cement}
                    />
                    <InputField
                        placeholder="Reinforcement"
                        handleInputChange={setReinforcement}
                        value={reinforcement}
                    />
                    <InputField
                        placeholder="Foundation Bolts"
                        handleInputChange={setFoundationBolts}
                        value={foundationBolts}
                    />
                    <div className="my-2 p-2 bg-white shadow-md rounded-md flex flex-col items-start w-full sm:w-4/5 md:w-4/5 lg:w-full" style={{ maxWidth: '600px' }}>
                        <div className='flex flex-row justify-between'>
                            <strong className="block m-2">Bar Diameter Information</strong>
                            <IconButton color="success" variant="soft" onClick={addBarDiaInfo}>
                                <AddIcon />
                            </IconButton>
                        </div>
                        {barDiaInfo.map((info, index) => (
                            <div key={index} className="flex flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 my-2 w-4/5 sm:w-4/5 lg:w-full">
                                <div className="flex flex-col sm:flex-row w-full flex-1 space-y-2 sm:space-y-0 sm:space-x-2">
                                    <Input
                                        className="w-full sm:w-auto flex-1"
                                        placeholder="Diameter"
                                        variant="outlined"
                                        value={info.dia}
                                        onChange={(e) => handleBarDiaChange(index, 'dia', e.target.value)}
                                    />
                                    <Input
                                        className="w-full sm:w-auto flex-1"
                                        placeholder="Amount"
                                        variant="outlined"
                                        value={info.amount}
                                        onChange={(e) => handleBarDiaChange(index, 'amount', e.target.value)}
                                    />
                                </div>
                                <IconButton color="warning" variant="soft" onClick={() => removeBarDiaInfo(index)}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        ))}

                    </div>
                    <InputField
                        placeholder="Bolts Remarks"
                        handleInputChange={setBoltsRemarks}
                        value={boltsRemarks}
                    />
                </div>
                <SubmitButton handleSubmit={addFIM} text="Submit" />
            </div>
        </div>
    );
};

export default FIMForm;
