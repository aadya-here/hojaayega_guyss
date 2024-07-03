import { FormControl, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';

const CheckListItem = ({ label, value, setValue }) => {

    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        setValue(selectedValue);
    };

    return (
        <div className="my-5 p-4 bg-white shadow-md rounded-md flex md:flex-row items-center md:items-start mx-5">
            <div className="flex w-full md:w-7/12 pr-4 md:mr-4 mb-4 md:mb-0">
                <Typography variant="body1" className="text-gray-700">
                    {label}
                </Typography>
            </div>
            <div className='flex w-full md:w-5/12 justify-end'>
                <FormControl component="fieldset" className="flex items-end">
                    <RadioGroup row aria-label="options" name="options" value={value} onChange={handleOptionChange}>
                        <FormControlLabel value="YES" control={<Radio />} label="YES" />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                        <FormControlLabel value="NA" control={<Radio />} label="NA" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    );
};

export default CheckListItem;
