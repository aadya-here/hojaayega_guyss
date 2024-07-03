import React, { useEffect, useState } from 'react';
import { useVendor } from '../context/vendorContext';
import ProjectCard from '../components/ProjectCard';
import supabase from '../supabase';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';


const ProjectsPage = () => {
    const { vendorId } = useVendor();
    const [projects, setProjects] = useState([]);
    const [vendorName, setVendorName] = useState('');
    const [value, setValue] = useState('ongoing');
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        if (vendorId) {
            fetchProjects();
        }
    }, [vendorId]);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('vendor_id', vendorId)
                .eq('sent_to_vendor', true);

            if (error) {
                throw error;
            }

            setProjects(data);
            filterProjectsByTab(value, data);
        } catch (error) {
            console.error('Error fetching projects:', error.message);
            // Handle error (e.g., show a message to the user)
        }
    };

    const filterProjectsByTab = (tab, projects) => {
        const filtered = projects.filter(project => project.status === tab);
        setFilteredProjects(filtered);
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        filterProjectsByTab(newValue, projects);
    };

    return (
        <Box
            sx={{
                width: '60%',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <h2>Vendor Projects</h2>
            <p>Vendor ID: {vendorId}</p>
            {vendorName && <p>Vendor Name: {vendorName}</p>}

            <TabContext value={value}>
                <Tabs value={value} onChange={handleTabChange} aria-label="Project tabs">
                    <Tab label="Ongoing" value="ongoing" />
                    <Tab label="Upcoming" value="upcoming" />
                    <Tab label="Completed" value="completed" />
                </Tabs>
                <TabPanel value="ongoing">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </TabPanel>
                <TabPanel value="upcoming">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </TabPanel>
                <TabPanel value="completed">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default ProjectsPage;
