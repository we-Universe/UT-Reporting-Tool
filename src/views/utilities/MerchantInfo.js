import React, { useState } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

// material-ui
import { TextField, Autocomplete, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EmailsTable from 'ui-component/EmailsTable/EmailsTable';

// ============================|| UTILITIES Merchant INFO ||============================ //
const options = ['Option 1', 'Option 2'];
const UtilitiesMerchantInfo = () => {
  const [merchantName, setMerchantName] = useState('');
  const [merchantNameInput, setMerchantNameInput] = useState('');

  const [billingPeriod, setBillingPeriod] = useState('');
  const [clientRef, setClientRef] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [consultantName, setConsultantName] = useState('');

  const handleBillingPeriodChange = (event) => {
    setBillingPeriod(event.target.value);
  };

  const handleClientRefChange = (event) => {
    setClientRef(event.target.value);
  };

  const handleIndustryTypeChange = (event) => {
    setIndustryType(event.target.value);
  };
  const handleEmployeeNameChange = (event) => {
    setEmployeeName(event.target.value);
  };
  const handleConsultantNameChange = (event) => {
    setConsultantName(event.target.value);
  };

  return (
    <MainCard title="Merchant Info">
      <Autocomplete
        value={merchantName}
        onChange={(event, newValue) => {
          setMerchantName(newValue);
        }}
        inputValue={merchantNameInput}
        onInputChange={(event, newInputValue) => {
          setMerchantNameInput(newInputValue);
        }}
        options={options}
        sx={{ width: '30%', marginBottom: '20px' }}
        renderInput={(params) => <TextField {...params} label="Merchant Name" />}
      />

      <SubCard sx={{ boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)' }}>
        <form>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '20px' }}>
            <TextField
              label="Enter Billing Period"
              variant="outlined"
              sx={{ width: '48%', marginBottom: '20px' }}
              value={billingPeriod}
              onChange={handleBillingPeriodChange}
            />
            <TextField
              label="Enter Client Ref"
              variant="outlined"
              sx={{ width: '48%', marginBottom: '20px' }}
              value={clientRef}
              onChange={handleClientRefChange}
            />
            <FormControl sx={{ width: '48%', marginBottom: '20px' }}>
              <InputLabel>Select Industry Type</InputLabel>
              <Select value={industryType} onChange={handleIndustryTypeChange} label="Select Industry Type">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: '48%', marginBottom: '20px' }}>
              <InputLabel>Select Employee Name</InputLabel>
              <Select value={employeeName} onChange={handleEmployeeNameChange} label="Select Employee Name">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: '48%', marginBottom: '20px' }}>
              <InputLabel>Select Consultant Name</InputLabel>
              <Select value={consultantName} onChange={handleConsultantNameChange} label="Select Consultant Name">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <EmailsTable />
        </form>
      </SubCard>
    </MainCard>
  );
};

export default UtilitiesMerchantInfo;
