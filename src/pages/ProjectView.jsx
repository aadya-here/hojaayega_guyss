import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const ProjectView = () => {
    const { projectId } = useSearchParams();

    useEffect(() => {
        console.log('Project ID:', projectId);
    }, [projectId]);

    return (
        <div>
            <h1>hello</h1>
            <h1>Project ID : {projectId}</h1>
        </div>
    );
};

export default ProjectView;
