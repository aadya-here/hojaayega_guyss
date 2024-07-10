import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabase';
import BottomNavbar from '../components/BottomNavbar';

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [vendorId, setVendorId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const setAuth = (value) => {
        setIsAuth(value);
    };

    const fetchUserAndVendor = async () => {
        setIsLoading(true);
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error getting session:', error);
                setIsLoading(false);
                return;
            }
            if (session) {
                const { access_token, refresh_token } = session;
                await supabase.auth.setSession({ access_token, refresh_token });
            }

            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError) {
                console.error('Error fetching user:', userError);
                setIsLoading(false);
                return;
            }
            const user_id = userData?.user?.id ?? null;
            setUserId(user_id);

            // Set authentication status
            if (user_id) {
                setIsAuth(true);
            }

            // Retrieve vendorId from localStorage
            const storedVendorId = localStorage.getItem('vendorId');
            if (storedVendorId) {
                setVendorId(parseInt(storedVendorId, 10));
            }
        } catch (error) {
            console.error('Unexpected error fetching user and vendor:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserAndVendor();
    }, []);

    return (
        <AuthContext.Provider value={{ userId, vendorId, isLoading, isAuth, setVendorId, setAuth }}>
            {children}
            {isAuth && <BottomNavbar />}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};