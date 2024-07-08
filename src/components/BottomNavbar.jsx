import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentTextIcon, DocumentCheckIcon, UserIcon, ListBulletIcon, RectangleGroupIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

export default function BottomNavbar() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    const addDoc = () => {
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
    }




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
                    // showLabels = false;
                }}
                sx={{ justifyContent: 'space-evenly' }}
            >
                <BottomNavigationAction
                    label="Projects"
                    icon={<RectangleGroupIcon className="size-5" />}
                    sx={{ justifyContent: 'center' }}
                    onClick={() => { navigate("/projects") }}
                />
                <BottomNavigationAction
                    label="Logs"
                    icon={<ListBulletIcon className="size-5" />}
                    sx={{ justifyContent: 'center' }}
                    onClick={() => { navigate("/test") }}
                />
                <BottomNavigationAction
                    label="Forms"
                    icon={<ClipboardDocumentListIcon className="size-5" />}
                    sx={{ justifyContent: 'center' }}
                    onClick={() => { navigate("/forms") }}
                />
                <BottomNavigationAction
                    label="Filled Docs"
                    icon={<DocumentCheckIcon className="size-5" />}
                    sx={{ justifyContent: 'center' }}
                    onClick={() => { navigate("/forms-view") }}
                />
                <BottomNavigationAction
                    label="Profile"
                    icon={<UserIcon className="size-5" />}
                    sx={{ justifyContent: 'center' }}
                    onClick={() => { navigate("/profile") }}
                />


            </BottomNavigation>
        </Box>
    );
}
