import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useVendor } from '../context/vendorContext'; // Assuming this custom hook exists
import AccordionGroup from '@mui/joy/AccordionGroup';
import Typography from '@mui/joy/Typography';
import supabase from '../supabase'; // Assuming supabase is configured
import { Card, CardContent } from '@mui/material';
import CustomAccordion from '../components/CustomAccordian';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'; // Adjust import based on your Material-UI version
import TableComponent from '../components/TableComponent';


const LogView = () => {
    const { logId } = useParams();
    const { vendorId } = useVendor(); // Assuming useVendor is a custom hook that returns vendorId and userId
    const [logInfo, setLogInfo] = useState(null);
    const [toolboxTalk, setToolboxTalk] = useState([]);
    const [isTBExpanded, setIsTBExpanded] = useState(false);
    const [loading, setLoading] = useState(true);

    const [firstAidForms, setFirstAidForms] = useState([]);
    const [fimForms, setFimForms] = useState([]);
    const [isFirstAidExpanded, setIsFirstAidExpanded] = useState(false);
    const [isFIMExpanded, setIsFIMExpanded] = useState(false);



    useEffect(() => {
        fetchLogInfo();
    }, [logId]);

    const fetchLogInfo = async () => {
        try {
            const { data, error } = await supabase
                .from('logs')
                .select('*')
                .eq('log_id', logId)
                .eq('vendor_id', vendorId)
                .single();

            if (error) throw error;
            setLogInfo(data);
        } catch (error) {
            console.error('Error fetching log info:', error);
        } finally {
            setLoading(false);
        }
    };



    const fetchToolboxTalk = async () => {
        try {
            const { data, error } = await supabase
                .from('tool_box_talk')
                .select('*')
                .eq('log_id', logId)
                .single();

            // const parsedData = data.map(form => ({
            //     ...form,
            //     reminders: JSON.parse(form.reminders),
            // }));


            if (error) throw error;
            setToolboxTalk(data);
            console.log(toolboxTalk)
        } catch (error) {
            console.error('Error fetching Toolbox Talk:', error);
        }
    };

    const fetchFirstAidForms = async () => {
        try {
            const { data, error } = await supabase
                .from('first_aid')
                .select('*')
                .eq('log_id', logId);

            if (error) throw error;
            setFirstAidForms(data);
        } catch (error) {
            console.error('Error fetching First Aid Forms:', error);
        }
    };

    const fetchFIMForms = async () => {
        try {
            const { data, error } = await supabase
                .from('FIM_use')
                .select('*')
                .eq('log_id', logId);

            if (error) throw error;

            const parsedData = data.map(form => ({
                ...form,
                bar_dia_info: JSON.parse(form.bar_dia_info),
            }));

            setFimForms(parsedData);
        } catch (error) {
            console.error('Error fetching FIM Forms:', error);
        }
    };



    const handleAccordionToggle = (isExpanded, setIsExpanded, fetchFunction) => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            fetchFunction();
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4">{logInfo?.project_title}</Typography>
                    <Typography variant="body1">Log ID: {logId}</Typography>
                    <Typography variant="body1">Created On: {new Date(logInfo?.created_on).toLocaleDateString('en-GB')}</Typography>
                    <Typography variant="body1">Vendor ID: {vendorId}</Typography>
                </CardContent>
            </Card>
            <div className='flex flex-col items-center p-4'>

                <AccordionGroup color="primary" size="md" variant="plain" disableDivider sx={{ maxWidth: 800 }}>
                    <CustomAccordion
                        title="Toolbox Talk"
                        isExpanded={isTBExpanded}
                        onToggle={() => handleAccordionToggle(isTBExpanded, setIsTBExpanded, fetchToolboxTalk)}
                        content={
                            toolboxTalk ? (
                                <TableComponent data={toolboxTalk} />
                            ) : (
                                <Typography>No Toolbox Talk available</Typography>
                            )
                        }
                    />

                    <CustomAccordion
                        title="First Aid Forms"
                        isExpanded={isFirstAidExpanded}
                        onToggle={() => handleAccordionToggle(isFirstAidExpanded, setIsFirstAidExpanded, fetchFirstAidForms)}
                        content={
                            firstAidForms.length > 0 ? (
                                firstAidForms.map((form, index) => (
                                    <TableComponent key={index} data={form} />
                                ))
                            ) : (
                                <Typography>No First Aid Forms available</Typography>
                            )
                        }
                    />

                    <CustomAccordion
                        title="FIM Forms"
                        isExpanded={isFIMExpanded}
                        onToggle={() => handleAccordionToggle(isFIMExpanded, setIsFIMExpanded, fetchFIMForms)}
                        content={
                            fimForms.length > 0 ? (
                                fimForms.map((form, index) => (
                                    <TableComponent key={index} data={form} />
                                ))
                            ) : (
                                <Typography>No FIM Forms available</Typography>
                            )
                        }
                    />
                </AccordionGroup>
            </div>



        </div>
    );
};

export default LogView;
