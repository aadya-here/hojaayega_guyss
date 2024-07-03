import React from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { styled } from '@mui/system';

const CenteredContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
});

const FormContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '300px',
});

const SignInPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <CenteredContainer>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <Input placeholder="Email" variant="soft" />
                    <Input placeholder="Password" variant="soft" type="password" />
                    <Button variant="solid" type="submit">
                        Sign In
                    </Button>
                </form>
            </FormContainer>
        </CenteredContainer>
    );
};

export default SignInPage;