import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Container,
  IconButton,
  styled,
  Typography,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import noimg from "../assets/noimg.png";
import { getUserId } from "../helpers/fetchUser";
import supabase from "../supabase";
import SubmitButton from "../components/ui_components/PrimaryButton";
import { Input } from "@mui/joy";
import { useAuth } from "../context/authContext";
import SecondaryButton from "../components/ui_components/SecondaryButton";
import { useNavigate } from "react-router-dom";

const FlexContainer = styled("div")({
  display: "flex",
  paddingInline: "3rem",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
  flexDirection: "row",
  gap: "3rem",
  "@media (max-width: 840px)": {
    flexDirection: "column",
    justifyContent: "center",
    paddingInline: "1rem",
  },
});

const EditButton = styled(IconButton)({
  position: "absolute",
  bottom: "0px",
  right: "0px",
  backgroundColor: "white",
  borderRadius: "50%",
  boxShadow: "0 0 5px #000",
  "&:hover": {
    backgroundColor: "white",
  },
});

const ImageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0",
  position: "relative",
});

const ProfileImg = styled(Avatar)({
  height: "10rem",
  width: "10rem",
  boxShadow: "0 0 5px #000",
});

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "70%",
  "@media (max-width: 840px)": {
    width: "100%",
  },
});

const Profile = () => {
  const [profileImg, setProfileImg] = useState(null);
  const fileInputRef = useRef(null);
  const [isEditable, setIsEditable] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    gatepass: "",
    role: "",
    vendor_id: "",
  });

  const { userId, vendorId, isAuth, setAuth } = useAuth();
  const navigate = useNavigate();
  console.log(userId, vendorId, isAuth);

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchUserDetails = async () => {
    try {
      // const userId = await getUserId(); // Wait for userId promise to resolve

      if (userId) {
        const { data, error } = await supabase
          .from("vendor_user")
          .select("*")
          .eq("user_id", userId);

        if (error) {
          throw new Error(error.message);
        }

        if (data && data.length > 0) {
          const userData = data[0];
          setUserDetails({
            name: userData.name || "",
            email: userData.email || "",
            mobile: userData.mobile || "",
            gatepass: userData.gatepass || "",
            role: userData.role || "",
            vendor_id: userData.vendor_id || "",
          });
        }
      } else {
        console.log("userId is undefined or null");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleInputChange = (field, value) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };
  const handleUpdate = async () => {
    try {
      // const userId = await getUserId();
      if (userId) {
        console.log("Updating user details:", userDetails);
        const { data, error } = await supabase
          .from("vendor_user")
          .update(userDetails)
          .eq("user_id", userId);

        if (error) {
          throw new Error(error.message);
        }
        alert("Profile updated successfully!");
        setIsEditable(false);
        console.log("Update response:", data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handlesignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      // Clear local storage or any other state management values if necessary
      localStorage.removeItem('vendorId');
      setAuth(false); // Update isAuth state to false
      navigate('/home');
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const InputField = ({ placeholder, value, disabled, onChange }) => {
    return (



      <div style={{ marginBottom: "16px" }}>

        <Input
          placeholder={placeholder}
          variant="outlined"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  };

  return (
    <div className="bg-blue-50 h-screen w-screen">
      <Container maxWidth="md" className="h-screen">

        <FlexContainer>
          <ImageContainer>
            <ProfileImg src={profileImg || noimg} />
            <EditButton onClick={handleEditClick}>
              <EditIcon />
            </EditButton>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
            />
          </ImageContainer>
          <FormContainer>
            <Typography variant="h5" component="h2" className="!font-bold">
              Hello {userDetails.name}
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" component="h2" className="!font-bold">
                Your Information
              </Typography>
              <IconButton onClick={() => {
                if (isEditable) {
                  handleUpdate();
                } else {
                  setIsEditable(true);
                }
              }}>
                {isEditable ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </div>
            <form className="w-full">

              <InputField
                placeholder="Name"
                value={userDetails.name}
                disabled={!isEditable}
                onChange={(value) => handleInputChange("name", value)}
              />
              <InputField
                placeholder="Email"
                value={userDetails.email}
                disabled={!isEditable}
                onChange={(value) => handleInputChange("email", value)}
              />
              <InputField
                placeholder="Phone Number"
                value={userDetails.mobile}
                disabled={!isEditable}
                onChange={(value) => handleInputChange("mobile", value)}
              />
              <InputField
                placeholder="Vendor ID"
                value={userDetails.vendor_id}
                disabled={!isEditable}
                onChange={(value) => handleInputChange("vendor_id", value)}
              />
              <InputField
                placeholder="Gate Pass No"
                value={userDetails.gatepass}
                disabled={!isEditable}
                onChange={(value) => handleInputChange("gatepass", value)}
              />
              {/* {isEditable && <SubmitButton text="Update Profile" onClick={handleUpdate} />} */}
            </form>

            <SecondaryButton text="Sign Out" onClick={handlesignOut} />

          </FormContainer>
        </FlexContainer>

      </Container>
    </div>
  );
};

export default Profile;
