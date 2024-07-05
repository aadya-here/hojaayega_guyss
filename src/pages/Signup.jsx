import React from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { Link } from "react-router-dom";
import CommonAuth from "../components/CommonAuth";
import { Typography } from "@mui/material";

const SignUpPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <CommonAuth>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Name" variant="soft" />
        <div style={{ marginBottom: "16px" }}></div>
        <Input placeholder="Email" variant="soft" />
        <div style={{ marginBottom: "16px" }}></div>
        <Input placeholder="Mobile Number" variant="soft" />
        <div style={{ marginBottom: "16px" }}></div>
        <Input placeholder="Gatepass Number" variant="soft" />
        <div style={{ marginBottom: "16px" }}></div>
        <Input placeholder="Vendor Name" variant="soft" type="dropdown" />
        <div style={{ marginBottom: "20px" }}></div>
        <Input placeholder="Vendor Code" variant="soft" />
        <div style={{ marginBottom: "16px" }}></div>
        <Button variant="solid" type="submit" sx={{ width: "100%" }}>
          Sign Up
        </Button>
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
