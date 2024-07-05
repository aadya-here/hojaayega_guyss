import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import CommonAuth from "../components/CommonAuth";
import SubmitButton from "../components/PrimaryButton";
import InputField from "../components/InputField";
import supabase from "../supabase";
import moment from "moment";
import AuthField from "../components/AuthInput";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gpNo, setGpNo] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const [vendorList, setVendorList] = useState([]);

  const signUpWithSupabase = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Error signing up with Supabase:', error.message);
      throw error;
    }

    const { data: user, error: getUserError } = await supabase.auth.getUser();
    if (getUserError) {
      console.error('Error retrieving user after signup:', getUserError.message);
      throw getUserError;
    }
    return user;
  };

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

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const user = await signUpWithSupabase(email, password);

      const { data, error: insertError } = await supabase
        .from('vendor_user')
        .insert([
          {
            email,
            created_at: moment().format(),
            vendor_id: selectedVendor,
            name,
            gatepass: parseInt(gpNo),
            mobile: parseInt(mobile),
            user_id: user.id,
            role,
          }
        ])
        .select();

      if (insertError) {
        console.error('Error inserting into vendor_user:', insertError.message);
        throw insertError;
      }

      console.log('Insert successful:', data);
      navigate('/signin');
    } catch (error) {
      alert('Error signing up: ' + error.message);
    }
  };

  // const InputMUI = ({ handleInputChange = () => { }, placeholder = '', value = '', type = 'text' }) => (
  //   <div className="my-3">
  //     <Input
  //       placeholder={placeholder}
  //       variant="soft"
  //       color="primary"
  //       onChange={(e) => handleInputChange(e.target.value)}
  //       value={value}
  //       type={type}
  //     />
  //   </div>
  // );

  const inputFields = [
    {
      placeholder: 'Name',
      value: name,
      handleInputChange: setName,
    },
    {
      placeholder: 'Email',
      value: email,
      handleInputChange: setEmail,
      type: "email"
    },
    {
      placeholder: 'Mobile Number',
      value: mobile,
      handleInputChange: setMobile,
      type: "number"
    },
    {
      placeholder: 'Gate Pass Number',
      value: gpNo,
      handleInputChange: setGpNo,
      type: "number"
    },
    {
      placeholder: 'Password',
      value: password,
      handleInputChange: setPassword,
      type: 'password'
    }
  ];

  return (
    <CommonAuth>
      <form onSubmit={handleSignup}>
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

        {inputFields.map((field, index) => (
          <AuthField
            key={index}
            placeholder={field.placeholder}
            handleInputChange={field.handleInputChange}
            value={field.value}
            type={field.type || 'text'}
          />
        ))}

        <SubmitButton handleSubmit={handleSignup} text="Sign Up" />

        <span>
          Already have an account?
          <Link to="/signin" className="font-bold ml-1">
            Sign In
          </Link>
        </span>
      </form>
    </CommonAuth>
  );
};

export default SignUpPage;
