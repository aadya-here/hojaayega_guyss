import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';

const TableComponent = ({ title, data }) => {
    if (!data || Object.keys(data).length === 0) {
        return <Typography>No data available</Typography>;
    }

    const formatFieldName = (fieldName) => {
        return fieldName
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const rows = Object.entries(data).map(([key, value]) => ({
        name: key,
        value: typeof value === 'object' ? JSON.stringify(value, null, 2) : value
    }));

    return (
        <div className="w-full overflow-x-auto">
            {title && (
                <Typography variant="h6" className="mb-2">{title}</Typography>
            )}
            <Table className="w-full sm:w-4/5 lg:w-3/5">
                <TableHead>
                    {/* <TableRow>
                        <TableCell>Field</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow> */}
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{formatFieldName(row.name)}</TableCell>
                            <TableCell>{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TableComponent;