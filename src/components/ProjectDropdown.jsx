import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import supabase from '../supabase'; // Adjust the import based on your project structure

const ProjectDropdown = ({ vendorId, onProjectChange }) => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');

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

                setProjects(data);
                if (data.length > 0) {
                    setSelectedProject(data.project_id); // Set the first project as the default selection
                    if (onProjectChange) {
                        onProjectChange(data.project_id); // Notify parent component
                    }
                }
                console.log(projects);
            } catch (error) {
                console.error('Error fetching projects:', error.message);
            }
        };

        fetchProjects();
    }, [vendorId, onProjectChange]);

    const handleProjectChange = (event) => {
        const projectId = event.target.value;
        setSelectedProject(projectId);
        if (onProjectChange) {
            onProjectChange(projectId); // Notify parent component
        }
    };

    return (
        <div className="w-full flex justify-center">
            <FormControl className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5" style={{ maxWidth: '600px' }}>
                <InputLabel id="project-select-label">Select Project</InputLabel>
                <Select
                    labelId="project-select-label"
                    id="project-select"
                    value={selectedProject}
                    onChange={handleProjectChange}
                    className="bg-white shadow-md rounded-md p-3"
                >
                    {projects.map((project) => (
                        <MenuItem key={project.id} value={project.id}>
                            {project.project_title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default ProjectDropdown;
