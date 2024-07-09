import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const DatePickerComponent = ({ selectedDate, onChangeDate, label }) => {
    const handleDateChange = (date) => {
        onChangeDate(date);
    };

    const customDateFormat = (date) => {
        return format(date, 'dd/MM/yyyy');
    };

    return (
        <div className="my-2 p-2 bg-slate-50 shadow-md rounded-md flex flex-col items-start space-y-2 w-full" style={{ maxWidth: '600px' }}>
            <strong>{label}</strong>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="p-2 mt-2 w-full"
            />
        </div>
    );
};

export default DatePickerComponent;
