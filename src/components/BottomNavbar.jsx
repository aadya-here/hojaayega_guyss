import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BottomNavbar() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{ justifyContent: 'space-evenly' }}
            >
                <BottomNavigationAction
                    label="Sign Up"
                    icon={<RestoreIcon />}
                    sx={{ justifyContent: 'center' }}
                    onClick={() => { navigate("/signup") }}
                />
                <BottomNavigationAction
                    label="Test"
                    icon={<FavoriteIcon />}
                    sx={{ justifyContent: 'center' }}
                    onClick={() => { navigate("/test") }}
                />
                <BottomNavigationAction
                    label="Sign In"
                    icon={<LocationOnIcon />}
                    sx={{ justifyContent: 'center' }}
                    onClick={() => { navigate("/signin") }}
                />

                {/* You can add more here */}

            </BottomNavigation>
        </Box>
    );
}
