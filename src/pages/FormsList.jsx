import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import FormCard from '../components/FormCard';
import Title from '../components/Title';
import supabase from '../supabase';
import { useVendor } from '../context/vendorContext';

const FormsList = () => {
    const [forms, setForms] = useState([]);
    const { vendorId } = useVendor();

    useEffect(() => {
        const fetchForms = async () => {
            const { data, error } = await supabase
                .from('forms_logs')
                .select(
                    `
                project_id,
                created_on,
                approval_status,
                form_num,
                form_id,
                projects!inner(
                    project_title
                ),
                forms_list!inner(
                    form_name
                )
            `,
                ).eq('vendor_id', vendorId)
                .order('created_on', { ascending: false });

            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setForms(data);
            }
        };

        fetchForms();
    }, [vendorId]);

    return (
        <div className="w-full min-h-screen bg-blue-50 p-5 flex flex-col items-center">
            <Title text="Filled Forms" />
            <div className="my-0 p-0  flex flex-col space-y-3 w-full sm:w-4/5 md:w-4/5 lg:w-full">

                {forms.map((form) => (
                    <FormCard
                        key={form.form_id}
                        projectName={form.projects?.project_title}
                        date={new Date(form.created_on).toLocaleDateString()}
                        formStatus={form.approval_status}
                        formName={form.forms_list?.form_name}
                    />
                ))}
            </div>
        </div>
    );
};

export default FormsList;
