import React, { useState } from 'react';

// material-ui
import { FormControl, Select, MenuItem } from '@mui/material';

const DropdownList = ({ selectedTypes, placeholder }) => {
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
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
        value={personName}
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