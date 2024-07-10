import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVendor } from '../context/vendorContext'; // Assuming this is the correct import path
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import supabase from '../supabase';
import CommonAuth from '../components/CommonAuth';
import SubmitButton from '../components/PrimaryButton';
import { Input } from '@mui/joy';
import { useAuth } from '../context/authContext';

const VendorLoginPage = () => {
    const { setVendorId } = useVendor();
    const { setAuth } = useAuth();
    const [vendorList, setVendorList] = useState([]);
    const [vendorCode, setVendorCode] = useState('');
    const [selectedVendor, setSelectedVendor] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const { data, error } = await supabase
                    .from('vendors')
                    .select('vendor_id, vendor_name');

                if (error) {
                    console.error('Error fetching vendors:', error);
                    return;
                }

                const formattedVendors = data.map(vendor => ({
                    value: vendor.vendor_id,
                    label: vendor.vendor_name
                }));

                setVendorList(formattedVendors);
            } catch (error) {
                console.error('Unexpected error fetching vendors:', error.message);
            }
        };

        fetchVendors();
    }, []);

    const handleVendorSelect = (event) => {
        setSelectedVendor(event.target.value);
    };
    const handleVendorLogin = async (e) => {
        e.preventDefault();
        if (!selectedVendor || !vendorCode) {
            alert('Please select a vendor and enter the vendor code.');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('vendors')
                .select('*')
                .eq('vendor_id', selectedVendor)
                .single();

            if (error) {
                console.error('Error fetching vendor:', error);
                alert('Unable to fetch vendor details.');
                return;
            }

            if (data && data.vendor_code === parseInt(vendorCode)) {
                console.log(data)
                setVendorId(selectedVendor);
                setAuth(true); // Use setAuth instead of setIsAuth
                navigate('/projects');
            } else {
                alert('Invalid vendor code.');
                console.log(vendorCode);
            }
        } catch (error) {
            console.error('Error during vendor login:', error);
            alert('An unexpected error occurred during vendor login.');
        }
    };



    return (
        <CommonAuth>
            <form onSubmit={handleVendorLogin}>
                <FormControl fullWidth>
                    <InputLabel id="vendor-select-label">Vendor</InputLabel>
                    <Select
                        labelId="vendor-select-label"
                        id="vendor-select"
                        value={selectedVendor}
                        label="Vendor"
                        onChange={handleVendorSelect}
                    >
                        {vendorList.map((vendor) => (
                            <MenuItem key={vendor.value} value={vendor.value}>
                                {vendor.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <br />

                <Input
                    placeholder="Vendor Code"
                    variant="outlined"
                    type="password"
                    sx={{ marginY: '10px' }}
                    value={vendorCode}
                    onChange={(e) => setVendorCode(e.target.value)}
                />
                <SubmitButton handleSubmit={handleVendorLogin} text="Signin" />

            </form>
        </CommonAuth>
    );
};

export default VendorLoginPage;
