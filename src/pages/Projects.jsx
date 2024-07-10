import React, { useEffect, useState } from 'react';
import { useVendor } from '../context/vendorContext';
import ProjectCard from '../components/info_cards/ProjectCard';
import supabase from '../supabase';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Title from '../components/ui_components/Title';
import Subheading from '../components/ui_components/Subheading';
import { useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SecondaryButton from '../components/ui_components/SecondaryButton';

const ProjectsPage = () => {
    const { vendorId } = useVendor();
    const [projects, setProjects] = useState([]);
    const [index, setIndex] = useState(0);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [vendorName, setVendorName] = useState('');
    const isLargeScreen = useMediaQuery('(min-width:600px)');

    const navigate = useNavigate();

    useEffect(() => {
        if (vendorId) {
            fetchProjects();
            fetchVendorName();
        }
    }, [vendorId]);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('vendor_id', vendorId)
                .eq('sent_to_vendor', true)
                .order('project_id', { ascending: false });

            if (error) {
                throw error;
            }

            setProjects(data);
            filterProjectsByTab(index, data);

        } catch (error) {
            console.error('Error fetching projects:', error.message);
        }
    };

    const filterProjectsByTab = (tab, projects) => {
        const statusMap = ['ongoing', 'upcoming', 'completed'];
        const filtered = projects.filter(project => project.status === statusMap[tab]);
        setFilteredProjects(filtered);
    };

    const handleTabChange = (event, value) => {
        setIndex(value);
        filterProjectsByTab(value, projects);
    };

    const fetchVendorName = async () => {
        try {
            const { data: vendorData, error: vendorError } = await supabase
                .from('vendors')
                .select('vendor_name')
                .eq('vendor_id', vendorId)
                .single();

            if (vendorError) {
                console.error('Error fetching vendor data:', vendorError.message);
            } else {
                setVendorName(vendorData.vendor_name);
            }
        } catch (error) {
            console.error('Error in fetchVendorName:', error.message);
        }
    };

    const handleProjectClick = (projectId) => {
        navigate(`${projectId}`);
        console.log('Project ID:', projectId);
    };


    return (
        <div className="w-full min-h-screen min-w-screen bg-blue-50 p-5 flex flex-col items-center">
            <Box
                sx={{
                    flexGrow: 1,
                    m: -2,
                    overflowX: 'hidden',
                }}
            >
                <Title text="Projects" />
                <Subheading text={`${vendorId} : ${vendorName}`} />
                <Tabs
                    aria-label="Projects"
                    value={index}
                    onChange={handleTabChange}
                    size={isLargeScreen ? "md" : 'sm'}
                    sx={{ bgcolor: "#eff6ff" }}
                >
                    <TabList
                        sx={{
                            pt: 1,
                            justifyContent: 'center',
                            maxWidth: isLargeScreen ? '500px' : '300px',
                            [`&& .${tabClasses.root}`]: {
                                flex: 'initial',
                                bgcolor: '#eff6ff',
                                paddingX: 5,
                                paddingY: 2,
                                '&:hover': {
                                    bgcolor: '#eff6ff',
                                    paddingX: 5,
                                    paddingY: 2,
                                    borderRadius: 10
                                },
                                [`&.${tabClasses.selected}`]: {
                                    color: 'primary.plainColor',
                                    '&::after': {
                                        height: 2,
                                        borderTopLeftRadius: 3,
                                        borderTopRightRadius: 3,
                                        bgcolor: 'primary.700',
                                    },
                                },
                            },
                            '@media (max-width: 600px)': {
                                [`&& .${tabClasses.root}`]: {
                                    paddingX: 2,
                                    paddingY: 1,
                                },
                            },
                        }}
                    >
                        <Tab indicatorInset>
                            Ongoing{' '}
                            <Chip
                                size="sm"
                                variant="soft"
                                color={index === 0 ? 'primary' : 'warning'}
                            >
                                {projects.filter(project => project.status === 'ongoing').length}
                            </Chip>
                        </Tab>
                        <Tab indicatorInset>
                            Upcoming{' '}
                            <Chip
                                size="sm"
                                variant="soft"
                                color={index === 1 ? 'primary' : 'neutral'}
                            >
                                {projects.filter(project => project.status === 'upcoming').length}
                            </Chip>
                        </Tab>
                        <Tab indicatorInset>
                            Completed{' '}
                            <Chip
                                size="sm"
                                variant="soft"
                                color={index === 2 ? 'primary' : 'success'}
                            >
                                {projects.filter(project => project.status === 'completed').length}
                            </Chip>
                        </Tab>
                    </TabList>
                    <Box
                        sx={{
                            background: '#eff6ff',
                            boxShadow: 'none',
                        }}
                    >
                        <TabPanel value={0}>
                            {filteredProjects.map(project => (
                                <ProjectCard
                                    key={project.project_id}
                                    projectName={project.project_title}
                                    projectLocation={project.location}
                                    projectStatus={project.status}
                                    deliveryEndDate={project.delivery_end_date}
                                    projectId={project.project_id}
                                    type={project.type}
                                    onClick={() => handleProjectClick(project.project_id)}
                                />
                            ))}
                        </TabPanel>
                        <TabPanel value={1}>
                            {filteredProjects.map(project => (
                                <ProjectCard
                                    key={project.project_id}
                                    projectName={project.project_title}
                                    projectLocation={project.location}
                                    projectStatus={project.status}
                                    deliveryEndDate={project.delivery_end_date}
                                    projectId={project.project_id}
                                    type={project.type}

                                    onClick={() => handleProjectClick(project.project_id)}
                                />
                            ))}
                        </TabPanel>
                        <TabPanel value={2}>
                            {filteredProjects.map(project => (
                                <ProjectCard
                                    key={project.project_id}
                                    projectName={project.project_title}
                                    projectLocation={project.location}
                                    projectStatus={project.status}
                                    deliveryEndDate={project.delivery_end_date}
                                    projectId={project.project_id}
                                    type={project.type}

                                    onClick={() => handleProjectClick(project.project_id)}
                                />
                            ))}
                        </TabPanel>
                    </Box>
                </Tabs>
            </Box>

        </div >
    );
};

export default ProjectsPage;
