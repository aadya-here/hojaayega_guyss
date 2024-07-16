import React, { useEffect, useState } from 'react';
import FormCard from '../components/info_cards/FormCard';
import Title from '../components/ui_components/Title';
import supabase from '../supabase';
import { useVendor } from '../context/vendorContext';
import { Button, Divider } from '@mui/joy';

const FormsList = () => {
    const [forms, setForms] = useState([]);
    const [projects, setProjects] = useState({});
    const [formsList, setFormsList] = useState({});
    const { vendorId } = useVendor();

    useEffect(() => {
        const fetchFormsLogs = async () => {
            try {
                const { data, error } = await supabase
                    .from('forms_logs')
                    .select('project_id, created_on, approval_status, form_num, form_id, form_log_id, vendor_id')
                    .eq('vendor_id', vendorId)
                    .order('created_on', { ascending: false });

                if (error) {
                    console.error('Error fetching forms_logs data:', error);
                } else {
                    setForms(data);
                    console.log('Fetched forms_logs data:', data);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            }
        };

        const fetchProjects = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('id, project_title');

                if (error) {
                    console.error('Error fetching projects data:', error);
                } else {
                    const projectsMap = data.reduce((acc, project) => {
                        acc[project.id] = project.project_title;
                        return acc;
                    }, {});
                    setProjects(projectsMap);
                    console.log('Fetched projects data:', data);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            }
        };

        const fetchFormsList = async () => {
            try {
                const { data, error } = await supabase
                    .from('forms_list')
                    .select('id, form_name');

                if (error) {
                    console.error('Error fetching forms_list data:', error);
                } else {
                    const formsListMap = data.reduce((acc, form) => {
                        acc[form.id] = form.form_name;
                        return acc;
                    }, {});
                    setFormsList(formsListMap);
                    console.log('Fetched forms_list data:', data);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            }
        };

        fetchFormsLogs();
        fetchProjects();
        fetchFormsList();
    }, [vendorId]);

    useEffect(() => {
        console.log('Forms state updated:', forms);
        console.log('Projects state updated:', projects);
        console.log('FormsList state updated:', formsList);
    }, [forms, projects, formsList]);

    return (
        <div className="w-full min-h-screen bg-blue-50 p-5 flex flex-col items-center pb-25">
            <Title text="Filled Forms" />
            <div className="my-0 p-0 flex flex-col space-y-3 w-full sm:w-4/5 md:w-4/5 lg:w-full">
                {forms.map((form) => (
                    <FormCard
                        key={form.form_log_id}
                        projectName={projects[form.project_id]}
                        date={new Date(form.created_on).toLocaleDateString()}
                        formStatus={form.approval_status}
                        formName={formsList[form.form_id]}
                        formLogId={form.form_log_id}
                        formId={form.form_id}
                    />
                ))}
            </div>
        </div>
    );
};

export default FormsList;
