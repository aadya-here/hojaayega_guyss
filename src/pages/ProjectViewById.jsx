import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVendor } from '../context/vendorContext';
import supabase from '../supabase';
import Title from '../components/ui_components/Title';
import Subheading from '../components/ui_components/Subheading';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { Button } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';

const ProjectView = () => {
    const { projectId } = useParams();
    const [projects, setProjects] = useState([]);
    const { vendorId } = useVendor();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async (vendorId) => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('vendor_id', vendorId)
                    .eq('sent_to_vendor', true)
                    .eq('project_id', projectId);

                if (error) {
                    throw error;
                }
                return data;
            } catch (error) {
                console.error('Error fetching projects:', error.message);
                return [];
            }
        };

        fetchProjects(vendorId).then(data => {
            setProjects(data);
        });
    }, [projectId, vendorId]);

    if (!projects.length) {
        return <div className='bg-white pb-20 p-5 min-w-screen'><Subheading text="Loading" /></div>;
    }

    const ProjectParams = [
        { field: 'type', fieldName: 'Type' },
        { field: 'status', fieldName: 'Status' },
        { field: 'location', fieldName: 'Location' },
        { field: 'vendor_id', fieldName: 'Vendor ID' },
        { field: 'project_goal', fieldName: 'Project Goal' },
        { field: 'planned_start_date', fieldName: 'Planned Start Date', isDate: true },
        { field: 'actual_start_date', fieldName: 'Actual Start Date', isDate: true },
        { field: 'planned_end_date', fieldName: 'Planned End Date', isDate: true },
        { field: 'actual_end_date', fieldName: 'Actual End Date', isDate: true },
        { field: 'delivery_end_date', fieldName: 'Delivery End Date', isDate: true },
        { field: 'validity_end_date', fieldName: 'Validity End Date', isDate: true },
        { field: 'work_order_num', fieldName: 'Work Order Number' }
    ];

    const formatValue = (field, value) => {
        if (field.isDate) {
            return new Date(value).toLocaleDateString('en-GB');
        }
        return value;
    };

    return (
        <div className='bg-white pb-20 p-5 min-w-screen'>
            <div className="py-5 pb-1 mx-auto w-full sm:w-4/5 lg:w-70">
                {projects.map(project => (
                    <div key={project.project_id} className="py-5">
                        <Title text={project.project_title} />
                        <div className="w-full overflow-x-auto">
                            <Table className="w-full sm:w-90 lg:w-75">
                                <TableBody>
                                    {ProjectParams.map(param => (
                                        <TableRow key={param.field}>
                                            <TableCell>{param.fieldName}</TableCell>
                                            <TableCell>{formatValue(param, project[param.field])}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-20 right-5">
                <Button
                    sx={{ borderRadius: 100 }}
                    variant="solid"
                    color="primary"
                    className="w-12 h-12 flex items-center justify-center p-0"
                    onClick={() => { navigate(`/create-log/${projectId}`) }}
                >
                    <AddIcon />
                    {/* <PlusCircleIcon className="text-blue-50" /> */}
                </Button>
            </div>
        </div>
    );
};

export default ProjectView;
