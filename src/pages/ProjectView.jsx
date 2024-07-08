import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProjectView = () => {
    const { projectId } = useParams();

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
