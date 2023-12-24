import React from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';

const CurrentDatePicker = ({ onDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        onChange={onDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default CurrentDatePicker;