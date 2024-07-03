import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { styled } from '@mui/system';
import Card from '@mui/joy/Card';
import { Link } from 'react-router-dom';
import supabase from '../supabase'; // Make sure to import your supabase client

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

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert('Error logging in: ' + error.message);
        } else {
            navigate('/vendor-login');
        }
    };

    return (
        <CenteredContainer>
            <CardContainer>
                <FormContainer>
                    <form onSubmit={handleLogin}>
                        <Input
                            placeholder="Email"
                            variant="soft"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div style={{ marginBottom: '16px' }}></div>
                        <Input
                            placeholder="Password"
                            variant="soft"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div style={{ marginBottom: '20px' }}></div>
                        <Button variant="solid" type="submit" sx={{ width: '100%' }}>
                            Sign In
                        </Button>
                        <div style={{ margin: '16px 0' }}></div>
                        <Link to="/signup">Don't have an account? Sign Up</Link>
                    </form>
                </FormContainer>
            </CardContainer>
        </CenteredContainer>
    );
};

export default SignInPage;
