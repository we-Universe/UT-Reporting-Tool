import React, { useState } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

// material-ui
import { TextField, Autocomplete, Box, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import EmailsTable from 'ui-component/EmailsTable/EmailsTable';

// ============================|| UTILITIES Merchant INFO ||============================ //
const options = ['Option 1', 'Option 2'];
const UtilitiesMerchantInfo = () => {
  const [merchantName, setMerchantName] = useState('');
  const [merchantNameInput, setMerchantNameInput] = useState('');

  const [merchantInfo, setMerchantInfo] = useState({
    billingPeriod: '',
    clientRef: '',
    industryType: '',
    employeeName: '',
    consultantName: ''
  });

  const handleUpdateInfo = () => {
    console.log(merchantInfo);
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
              label=" Billing Period"
              variant="outlined"
              sx={{ width: '48%', marginBottom: '20px' }}
              value={merchantInfo.billingPeriod}
              onChange={(event) => setMerchantInfo({ ...merchantInfo, billingPeriod: event.target.value })}
            />
            <TextField
              label=" Client Ref"
              variant="outlined"
              sx={{ width: '48%', marginBottom: '20px' }}
              value={merchantInfo.clientRef}
              onChange={(event) => setMerchantInfo({ ...merchantInfo, clientRef: event.target.value })}
            />
            <FormControl sx={{ width: '48%', marginBottom: '20px' }}>
              <InputLabel> Industry Type</InputLabel>
              <Select
                value={merchantInfo.industryType}
                onChange={(event) => setMerchantInfo({ ...merchantInfo, industryType: event.target.value })}
                label=" Industry Type"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: '48%', marginBottom: '20px' }}>
              <InputLabel> Employee Name</InputLabel>
              <Select
                value={merchantInfo.employeeName}
                onChange={(event) => setMerchantInfo({ ...merchantInfo, employeeName: event.target.value })}
                label=" Employee Name"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: '48%', marginBottom: '20px' }}>
              <InputLabel> Consultant Name</InputLabel>
              <Select
                value={merchantInfo.consultantName}
                onChange={(event) => setMerchantInfo({ ...merchantInfo, consultantName: event.target.value })}
                label=" Consultant Name"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '20px' }}>
              <Button variant="outlined" color="primary" onClick={handleUpdateInfo}>
                Update Basic Info
              </Button>
            </Box>
          </Box>
        </form>

        <EmailsTable />
      </SubCard>
    </MainCard>
  );
};

export default UtilitiesMerchantInfo;
