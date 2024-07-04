import React, { useState, useEffect } from 'react';
import { extendTheme, CssVarsProvider } from '@mui/joy/styles';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import supabase from '../supabase'; // Adjust import path as necessary
import { useVendor } from '../context/vendorContext';

const theme = extendTheme({
    components: {
        JoySelect: {
            defaultProps: {
                indicator: <KeyboardArrowDown />,
            },
        },
    },
});

const ProjectSelectionMenu = ({ handleProjectChange }) => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');

    const { vendorId } = useVendor();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('vendor_id', vendorId)
                    .eq('status', 'ongoing')
                    .eq('sent_to_vendor', true);

                if (error) {
                    throw error;
                }

                console.log(data); // Log fetched data
                setProjects(data);
                if (data.length > 0) {
                    setSelectedProject(data[0].project_id); // Set the first project as the default selection
                    if (handleProjectChange) {
                        handleProjectChange(data[0].project_id); // Notify parent component
                    }
                }
            } catch (error) {
                console.error('Error fetching projects:', error.message);
            }
        };

        fetchProjects();
    }, [vendorId, handleProjectChange]);

    const handleChange = (event) => {
        const projectId = event.target.value;
        setSelectedProject(projectId);
        console.log('PROJECT', projectId)
        if (handleProjectChange) {
            handleProjectChange(projectId); // Notify parent component
        }
    };

    return (
        <CssVarsProvider theme={theme}>
            <div className="w-full flex justify-center">
                <div className='my-2 p-2  bg-white shadow-md rounded-md flex items-center space-x-4 w-full' style={{ maxWidth: '600px' }}>
                    <h3 className="text-md font-semibold text-gray-800">Select Project</h3>

                    <Select
                        placeholder="Select Project"
                        value={selectedProject}
                        onChange={handleChange} // Use handleChange for select change
                        indicator={<KeyboardArrowDown />}
                        sx={{
                            width: '100%',
                            [`& .${selectClasses.indicator}`]: {
                                transition: '0.2s',
                                [`&.${selectClasses.expanded}`]: {
                                    transform: 'rotate(-180deg)',
                                },
                            },
                        }}
                    >
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <Option key={project.project_id} value={project.project_id}>
                                    {project.project_title}
                                </Option>
                            ))
                        ) : (
                            <Option value="" disabled>
                                No projects available
                            </Option>
                        )}
                    </Select>
                </div>
            </div>
        </CssVarsProvider>
    );
};

export default ProjectSelectionMenu;
