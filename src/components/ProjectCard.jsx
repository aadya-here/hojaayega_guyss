import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ProjectCard = ({ project }) => {
    return (
        <Card sx={{ minWidth: 275, marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {project.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {project.status}
                </Typography>
                <Typography variant="body2">
                    {project.description}
                </Typography>
            </CardContent>
            <CardActions>

            </CardActions>
        </Card>
    );
};

export default ProjectCard;
