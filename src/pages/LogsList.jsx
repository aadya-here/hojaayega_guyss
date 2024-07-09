import React, { useState, useEffect } from 'react';
import { useVendor } from '../context/vendorContext'; // Adjust path as necessary
import supabase from '../supabase'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
import { CircularProgress, IconButton } from '@mui/material'; // Material-UI components
import RefreshIcon from '@mui/icons-material/Refresh'; // Material-UI icon
import Title from '../components/Title'; // Adjust path as necessary
import Subheading from '../components/Subheading';
import LogCard from '../components/LogCard';

const Logs = () => {
    const { vendorId } = useVendor();
    const [logs, setLogs] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (vendorId) {
            fetchLogs();
        }
    }, [vendorId]);

    console.log(vendorId);

    const fetchLogs = async () => {
        setRefreshing(true);
        try {
            const { data: logData, error: logError } = await supabase
                .from('logs')
                .select('*')
                .eq('vendor_id', vendorId)
                .order('created_on', { ascending: false })
                .order('log_id', { ascending: false });

            if (logError) {
                console.error('Error fetching logs:', logError);
                return;
            }

            // console.log(logData)



            const projectIds = [...new Set(logData.map(log => log.project_id))];
            // console.log(projectIds);

            // projectIds.map(project=>(
            const { data: projectData, error: projectError } = await supabase
                .from('projects')
                .select('project_id, project_title')
            // .eq('project_id', project);

            // console.log(projectIds);

            // ))


            if (projectError) {
                console.error('Error fetching project names:', projectError);
                return;
            }

            const projectMap = projectData.reduce((pid, project) => {
                pid[project.project_id] = project.project_title;
                return pid;
            }, {});

            const processedLogs = logData.map(log => {
                const createdOn = new Date(log.created_on);
                const date = createdOn.toLocaleDateString();
                const day = createdOn.toLocaleDateString('en-US', { weekday: 'long' });
                const projectName = projectMap[log.project_id] || 'Unknown Project';

                return {
                    ...log,
                    date,
                    day,
                    project_title: projectName,
                };
            }).sort((a, b) => new Date(b.created_on).getTime() - new Date(a.created_on).getTime());

            setLogs(processedLogs);
        } catch (error) {
            console.error('Error fetching logs:', error.message);
        }
        setRefreshing(false);
    };

    return (
        <div className="bg-blue-50 pb-20 p-5 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <Title text="Logs" />
                <IconButton onClick={fetchLogs}>
                    <RefreshIcon />
                </IconButton>
            </div>
            {refreshing ? (
                <div className="flex justify-center items-center">
                    <CircularProgress />
                </div>
            ) : (
                <div className="items-center justify-center flex flex-col">
                    {logs.length === 0 ? (
                        <Subheading text="No logs Available" />
                    ) : (
                        logs.map(log => (
                            <LogCard key={log.log_id} log={log} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Logs;
