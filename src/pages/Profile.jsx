import { useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Container,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import Input from "@mui/joy/Input";
import EditIcon from "@mui/icons-material/Edit";
import SubmitButton from "../components/PrimaryButton";
import noimg from "../assets/noimg.png";

const FlexContainer = styled("div")({
  display: "flex",
  paddingInline: "10rem",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
  flexDirection: "row",
  gap: "3rem",
  "@media (max-width: 840px)": {
    flexDirection: "column",
    justifyContent: "center",
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
  gap: "1rem",
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
  gap: "16px",
});

const Profile = () => {
  const [profileImg, setProfileImg] = useState(null);
  const fileInputRef = useRef(null);

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

  return (
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
          <Typography variant="h6" component="h2" className="!font-bold">
            Your Information
          </Typography>
          <form>
            <Input placeholder="Name" variant="outlined" />
            <div style={{ marginBottom: "16px" }}></div>
            <Input placeholder="Email" variant="outlined" />
            <div style={{ marginBottom: "16px" }}></div>
            <Input placeholder="Phone Number" variant="outlined" />
            <div style={{ marginBottom: "16px" }}></div>
            <Input placeholder="Password" variant="outlined" type="password" />
            <div style={{ marginBottom: "20px" }}></div>
            <SubmitButton text="Update Profile" />
          </form>
        </FormContainer>
      </FlexContainer>
    </Container>
  );
};

export default Profile;
