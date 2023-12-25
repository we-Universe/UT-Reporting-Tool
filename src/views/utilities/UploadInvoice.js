import React, { useState } from 'react';

//project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import FileUpload from 'ui-component/extended/FileUpload';
import uploadInvoiceIcon from 'assets/images/icons/invoiceIcon.png';
import NoteButton from 'ui-component/extended/NoteButton';

//mui imports
import { FormControl, Box, Typography, MenuItem, Select, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import styled from '@emotion/styled';

const FormSection = ({ title, children }) => (
  <Box sx={{ width: '30%' }}>
    <Typography sx={{ fontSize: '15px', margin: '10px' }}>{title}</Typography>
    {children}
  </Box>
);

const UploadFileContainer = styled(Box)({
  width: '100%',
  padding: '30px 0px',
  borderRadius: '20px',
  backgroundColor: '#f8fafc',
  border: '1px solid #ccc',
  ':hover': {
    border: '1px solid #0B3782'
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '15px'
});
// ============================|| Upload Invoice Report ||============================ //

const UploadInvoice = () => {
  const [invoiceReportInfo, setInvoiceReportInfo] = useState({
    telecomName: '',
    billingDate: '',
    status: '',
    invoiceYear: '',
    invoiceMonth: '',
    totalAmount: '',
    paymentDate: '',
    invoiceFile: '',
    swiftFile: '',
    receiptFile: ''
  });

  const handleInvoiceSubmit = () => {
    console.log(invoiceReportInfo);
  };

  return (
    <MainCard title="Upload Invoice Report">
      <SubCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '20px' }}>
          <FormSection title="Enter Total Amount">
            <TextField
              variant="outlined"
              sx={{ width: '100%', marginBottom: '20px' }}
              value={invoiceReportInfo.totalAmount}
              onChange={(event) => setInvoiceReportInfo({ ...invoiceReportInfo, totalAmount: event.target.value })}
            />
          </FormSection>
          <FormSection title="Select Telecom Name">
            <FormControl sx={{ width: '100%', marginBottom: '20px' }}>
              <Select
                value={invoiceReportInfo.telecomName}
                onChange={(event) => setInvoiceReportInfo({ ...invoiceReportInfo, telecomName: event.target.value })}
              >
                <MenuItem value="Jawwal">Jawwal</MenuItem>
                <MenuItem value="Ooredoo">Ooredoo</MenuItem>
              </Select>
            </FormControl>
          </FormSection>

          <FormSection title="Select Invoice Status">
            <FormControl sx={{ width: '100%', marginBottom: '20px' }}>
              <Select
                value={invoiceReportInfo.status}
                onChange={(event) => setInvoiceReportInfo({ ...invoiceReportInfo, status: event.target.value })}
              >
                <MenuItem value="Billed">Billed</MenuItem>
                <MenuItem value="unbilled">unbilled</MenuItem>
              </Select>
            </FormControl>
          </FormSection>

          <FormSection title="Select Invoice Date">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={invoiceReportInfo.invoiceDate ? dayjs(invoiceReportInfo.invoiceDate) : null}
                // onChange={(date) => setInvoiceReportInfo({ ...invoiceReportInfo, invoiceDate: date.format() })}
                onChange={(date) => {
                  if (date) {
                    const selectedMonth = date.month() + 1; // months are zero-indexed
                    const selectedYear = date.year();

                    setInvoiceReportInfo({
                      ...invoiceReportInfo,
                      invoiceMonth: selectedMonth,
                      invoiceYear: selectedYear
                    });
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
                sx={{ width: '100%', marginBottom: '20px' }}
              />
            </LocalizationProvider>
          </FormSection>

          <FormSection title="Select Billing Date">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={invoiceReportInfo.billingDate ? dayjs(invoiceReportInfo.billingDate) : null}
                onChange={(date) => setInvoiceReportInfo({ ...invoiceReportInfo, billingDate: date.format() })}
                renderInput={(params) => <TextField {...params} />}
                sx={{ width: '100%', marginBottom: '20px' }}
              />
            </LocalizationProvider>
          </FormSection>

          <FormSection title="Select payment Date">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={invoiceReportInfo.paymentDate ? dayjs(invoiceReportInfo.paymentDate) : null}
                onChange={(date) => setInvoiceReportInfo({ ...invoiceReportInfo, paymentDate: date.format() })}
                renderInput={(params) => <TextField {...params} />}
                sx={{ width: '100%', marginBottom: '20px' }}
              />
            </LocalizationProvider>
          </FormSection>

          <FormSection title="Upload Invoice Report">
            <UploadFileContainer>
              <FileUpload image={uploadInvoiceIcon} allowedExtensions={['pdf']} />
            </UploadFileContainer>
          </FormSection>

          <FormSection title="Upload Swift File">
            <UploadFileContainer>
              <FileUpload image={uploadInvoiceIcon} allowedExtensions={['pdf']} />
            </UploadFileContainer>
          </FormSection>

          <FormSection title="Upload Receipt File">
            <UploadFileContainer>
              <FileUpload image={uploadInvoiceIcon} allowedExtensions={['pdf']} />
            </UploadFileContainer>
          </FormSection>

          <FormSection title="Notes">
            <NoteButton />
          </FormSection>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '20px' }}>
          <Button variant="outlined" color="primary" onClick={handleInvoiceSubmit}>
            Submit Invoice Report
          </Button>
        </Box>
      </SubCard>
    </MainCard>
  );
};

export default UploadInvoice;
