import React from "react";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import Card from "@mui/joy/Card";
import { Stack, Typography } from "@mui/material";
import bg from "../assets/bg.png";

const Wrapper = styled("div")({
  backgroundImage: `url(${bg})`,
  backgroundColor: "#041643",
  backgroundPosition: "left center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100vh",
  display: "flex",
  alignItems: "center",
});

const CenteredContainer = styled("div")({
  display: "flex",
  maxWidth: "65%",
  width: "800px",
  marginInline: "auto",
  marginBottom: "2rem",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "2rem",
  "@media (max-width: 840px)": {
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "90%",
  },
});

const Text = styled(Typography)({
  color: "white",
  fontWeight: "500",
  fontSize: "2.4rem",
});

const CardContainer = styled(Card)({
  width: "400px",
  maxWidth: "100%",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  padding: "24px",
});

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const CommonAuth = ({ children }) => {
  const location = useLocation();

  const isSignUp = location.pathname === "/signup";

  return (
    <Wrapper>
      <CenteredContainer>
        <Stack>
          <Text variant="h3" component="h1">
            {isSignUp ? (
              <>
                Create a <br /> new account
              </>
            ) : (
              <>
                Login into <br /> your account
              </>
            )}
          </Text>
          <Typography variant="subtitle1" className="text-[#AFAFAF]">
            Let us make the circle bigger!
          </Typography>
        </Stack>
        <CardContainer>
          <FormContainer>{children}</FormContainer>
        </CardContainer>
      </CenteredContainer>
    </Wrapper>
  );
};

export default CommonAuth;
