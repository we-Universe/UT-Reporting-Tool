import React, { useState } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

const DropdownList = ({ selectedTypes, placeholder, onChange }) => {
  const [dropdownSelectedValue, setDropdownSelectedValue] = useState('');

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setDropdownSelectedValue(selectedValue);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  return (
    <FormControl>
      <Select
        value={dropdownSelectedValue}
        onChange={handleChange}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
        displayEmpty
      >
        <MenuItem disabled value="">
          <em style={{ opacity: 0.5 }}>{placeholder}</em>
        </MenuItem>
        {selectedTypes.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownList;