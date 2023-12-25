import React, { useState } from 'react';

import PropTypes from 'prop-types';

// material-ui
import { Box, Card, Grid, Typography, TextField, Button } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import FileUpload from 'ui-component/extended/FileUpload';
import ContractFile from 'assets/images/icons/contractfile.png';
import NoteButton from 'ui-component/extended/NoteButton';
import CurrentDatePicker from 'ui-component/extended/CurrentDatePicker';

// ===============================|| COLOR BOX ||=============================== //

const ColorBox = ({ bgcolor, title, data, dark }) => (
  <>
    <Card sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4.5,
          bgcolor,
          color: dark ? 'grey.800' : '#ffffff'
        }}
      >
        {title && (
          <Typography variant="subtitle1" color="inherit">
            {title}
          </Typography>
        )}
        {!title && <Box sx={{ p: 1.15 }} />}
      </Box>
    </Card>
    {data && (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2">{data.label}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
            {data.color}
          </Typography>
        </Grid>
      </Grid>
    )}
  </>
);

ColorBox.propTypes = {
  bgcolor: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
  dark: PropTypes.bool
};

// ==============================|| FORM SECTION ||============================== //
const FormSection = ({ title, children }) => (
  <Grid item xs={12} md={6}>
    <Typography sx={{ fontSize: "15px" }} gutterBottom>
      {title}
    </Typography>
    {children}
  </Grid>
);

// ===============================|| UI COLOR ||=============================== //

const UIColor = () => {
  const [selectedDateState, setSelectedDateState] = useState(new Date());
  const [merchantValue, setMerchantValue] = useState('');
  const [merchantError, setMerchantError] = useState('');
  const [clientShareValue, setClientShareValue] = useState('');
  const [clientShareError, setClientShareError] = useState('');
  const [reportFile, setReportFile] = useState(null);
  const [reportFileError, setReportFileError] = useState("");

  const handleFileUpload = (file) => {
    setReportFile(file);
  };

  const handleMerchantChange = (event) => {
    setMerchantError("");
    setMerchantValue(event.target.value);
  };

  const handleClientShareChange = (event) => {
    setClientShareError("");
    setClientShareValue(event.target.value);
  };

  const handleDateChange = (dateInfo) => {
    setSelectedDateState(dateInfo);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;
    const dateString = selectedDateState.toISOString().split('T')[0];
    const [year, month] = dateString.split('-').map(Number);
    console.log('jjjj', reportFile, year, month, merchantValue);

    if (!merchantValue) {
      setMerchantError("Please type a merchant name");
      hasError = true;
    } else {
      setMerchantError("");
    }

    if (!clientShareValue) {
      setClientShareError("Please type a client share");
      hasError = true;
    } else {
      setClientShareError("");
    }

    if (reportFile == null) {
      setReportFileError("Please select a report file");
      hasError = true;
    } else {
      setReportFileError("");
    }

    if (!hasError) {
      setMerchantValue('');
      setReportFile(null);
    }
  };
  return (
    <MainCard title="Upload Contracts">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6} md={4} lg={6}>
                <FormSection title="Merchant Name">
                  {merchantError && (
                    <Box
                      sx={{
                        color: '#d32f2f',
                        fontSize: '0.78rem',
                        marginBottom: '8px'
                      }}
                    >
                      {merchantError}
                    </Box>
                  )}
                  <TextField
                    id="standard-search"
                    type="search"
                    variant="standard"
                    value={merchantValue}
                    onChange={handleMerchantChange}
                  />
                </FormSection>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={6}>
                <FormSection title="Contract File">
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {reportFileError && (
                      <Box
                        sx={{
                          color: '#d32f2f',
                          fontSize: '0.78rem',
                          marginBottom: '8px'
                        }}
                      >
                        {reportFileError}
                      </Box>
                    )}
                    <FileUpload image={ContractFile} allowedExtensions={['pdf']} onUpload={handleFileUpload} />
                  </Box>
                </FormSection>            </Grid>
              <Grid item xs={12} sm={6} md={4} lg={6}>
                <FormSection title="Client Share">
                  {clientShareError && (
                    <Box
                      sx={{
                        color: '#d32f2f',
                        fontSize: '0.78rem',
                        marginBottom: '8px'
                      }}
                    >
                      {clientShareError}
                    </Box>
                  )}
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    value={clientShareValue}
                    onChange={handleClientShareChange}
                  />
                </FormSection>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={6}>
                <FormSection title="Date">
                  <CurrentDatePicker onDateChange={handleDateChange} />
                </FormSection>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={11}>
                <FormSection title="Notes*">
                  <NoteButton />
                </FormSection>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={12}>
                <FormSection>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#0B3782",
                      color: (theme) => theme.palette.secondary.light,
                      borderRadius: '8px',
                      height: '40px',
                      width: '150px',
                      '&:hover': {
                        backgroundColor: "#0B3782",
                      },
                    }}
                    onClick={onSubmit}
                  >
                    Save Contract
                  </Button>
                </FormSection>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default UIColor;
