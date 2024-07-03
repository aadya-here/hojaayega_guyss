import React, { useEffect, useState } from 'react';
import { useVendor } from '../context/vendorContext';
import ProjectCard from '../components/ProjectCard';
import supabase from '../supabase';
import Box from '@mui/joy/Box';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/lab/TabPanel';
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
                height: '100vh',
                display: 'flex',
                // justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <h2>Vendor Projects</h2>
            <p>Vendor ID: {vendorId}</p>
            {vendorName && <p>Vendor Name: {vendorName}</p>}

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '80%',
                        maxWidth: '600px',
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 2,
                    }}
                >
                    <TabContext value={value}>
                        <Tabs
                            aria-label="Soft tabs"
                            value={value}
                            onChange={handleTabChange}
                        >
                            <TabList variant="soft">
                                <Tab
                                    variant={value === 'ongoing' ? 'solid' : 'plain'}
                                    color={value === 'ongoing' ? 'primary' : 'neutral'}
                                    value="ongoing"
                                >
                                    Ongoing
                                </Tab>
                                <Tab
                                    variant={value === 'upcoming' ? 'solid' : 'plain'}
                                    color={value === 'upcoming' ? 'primary' : 'neutral'}
                                    value="upcoming"
                                >
                                    Upcoming
                                </Tab>
                                <Tab
                                    variant={value === 'completed' ? 'solid' : 'plain'}
                                    color={value === 'completed' ? 'primary' : 'neutral'}
                                    value="completed"
                                >
                                    Completed
                                </Tab>
                            </TabList>
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
            </Box>
        </Box>
    );
};

export default ProjectsPage;
