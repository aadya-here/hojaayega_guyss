import React from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { styled } from '@mui/system';
import Card from '@mui/joy/Card';
import { Link } from 'react-router-dom';

const CenteredContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
});

const CardContainer = styled(Card)({
    width: '400px',
    maxWidth: '100%',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '24px',
});

const FormContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

const SignUpPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <CenteredContainer>
            <CardContainer>
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <Input placeholder="Name" variant="soft" />
                        <div style={{ marginBottom: '16px' }}></div>
                        <Input placeholder="Email" variant="soft" />
                        <div style={{ marginBottom: '16px' }}></div>
                        <Input placeholder="Mobile Number" variant="soft" />
                        <div style={{ marginBottom: '16px' }}></div>
                        <Input placeholder="Gatepass Number" variant="soft" />
                        <div style={{ marginBottom: '16px' }}></div>
                        <Input placeholder="Vendor Name" variant="soft" type="dropdown" />
                        <div style={{ marginBottom: '20px' }}></div>
                        <Button variant="solid" type="submit" sx={{ width: '100%' }}>
                            Sign Up
                        </Button>
                        <Link to="/signin">Already have an account? Sign In</Link>
                    </form>
                </FormContainer>
            </CardContainer>
        </CenteredContainer>
    );
};

export default SignUpPage;