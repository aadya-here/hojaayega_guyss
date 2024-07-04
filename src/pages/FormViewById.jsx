import { useParams } from 'react-router-dom';

const FormViewById = () => {
    const { formLogId } = useParams();
    console.log(formLogId); // This should log the formLogId when the component is rendered

    return (
        <div>
            {/* Render your form view based on the formLogId */}
            <p>Form Log ID: {formLogId}</p>
        </div>
    );
};

export default FormViewById;
