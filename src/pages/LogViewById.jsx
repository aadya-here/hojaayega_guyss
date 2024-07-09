import React from "react";
import { useParams } from "react-router-dom";

const LogView = () => {

    const { logId } = useParams();

    return (
        <h2>{logId}</h2>
    )

};

export default LogView;