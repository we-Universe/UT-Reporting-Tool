import React, { useState } from 'react';
import axios from 'axios';

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
    telecomName: 0,
    billingDate: null,
    status: 0,
    invoiceYear: 0,
    invoiceMonth: 0,
    totalAmount: 0,
    paymentDate: null,
    invoiceFile: [],
    swiftFile: [],
    receiptFile: [],
    notes: []
  });

  //const apiUrl = config.reportingAPIUrls.url;

  // const handleInvoiceSubmit = async () => {
  //   try {
  //     const response = await axios.post(`https://localhost:7071/api/Invoice/AddInvoiceReport`, invoiceReportInfo);
  //     console.log('Post created:', response.data);
  //   } catch (error) {
  //     console.error('Error creating post:', error);
  //     console.log('Server response:', error.response);
  //     console.log('Request payload:', error.config.data); // Log the exact payload sent to the server
  //   }
  //   console.log(invoiceReportInfo);
  // };

  const handleInvoiceSubmit = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7071/api/Invoice/AddInvoiceReport`,
        { invoiceModel: invoiceReportInfo },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log('Post created:', response.data);
    } catch (error) {
      console.error('Error creating post:', error);
      console.log('Server response:', error.response);
      console.log('Request payload:', JSON.stringify(invoiceReportInfo));
    }
    console.log(invoiceReportInfo);
  };

  const fileToArrayBytes = (file) => {
    return new Promise((resolve) => {
      if (!file) {
        resolve(null);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          const fileData = new Uint8Array(reader.result);
          resolve(fileData);
        };
        reader.readAsArrayBuffer(file);
      }
    });
  };

  const handleInvoiceFileUpload = async (file) => {
    const invoiceFileData = await fileToArrayBytes(file);
    //setInvoiceReportInfo({ ...invoiceReportInfo, invoiceFile: invoiceFileData });
    setInvoiceReportInfo({ ...invoiceReportInfo, invoiceFile: Array.from(invoiceFileData) });
  };

  const handleSwiftFileUpload = async (file) => {
    const swiftFileData = await fileToArrayBytes(file);
    setInvoiceReportInfo({ ...invoiceReportInfo, swiftFile: swiftFileData });
  };

  const handleReceiptFileUpload = async (file) => {
    const receiptFileData = await fileToArrayBytes(file);
    setInvoiceReportInfo({ ...invoiceReportInfo, receiptFile: receiptFileData });
  };

  const handleNoteChange = (updatedNotes) => {
    setInvoiceReportInfo({ ...invoiceReportInfo, notes: updatedNotes });
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
                <MenuItem value="1">Jawwal</MenuItem>
                <MenuItem value="2">Ooredoo</MenuItem>
              </Select>
            </FormControl>
          </FormSection>
          <FormSection title="Select Invoice Status">
            <FormControl sx={{ width: '100%', marginBottom: '20px' }}>
              <Select
                value={invoiceReportInfo.status}
                onChange={(event) => setInvoiceReportInfo({ ...invoiceReportInfo, status: event.target.value })}
              >
                <MenuItem value="1">Billed</MenuItem>
                <MenuItem value="2">unbilled</MenuItem>
              </Select>
            </FormControl>
          </FormSection>
          <FormSection title="Select Invoice Date">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={invoiceReportInfo.invoiceDate ? dayjs(invoiceReportInfo.invoiceDate) : null}
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
              <FileUpload image={uploadInvoiceIcon} allowedExtensions={['pdf']} onUpload={handleInvoiceFileUpload} />
            </UploadFileContainer>
          </FormSection>
          <FormSection title="Upload Swift File">
            <UploadFileContainer>
              <FileUpload image={uploadInvoiceIcon} allowedExtensions={['pdf']} onUpload={handleSwiftFileUpload} />
            </UploadFileContainer>
          </FormSection>
          <FormSection title="Upload Receipt File">
            <UploadFileContainer>
              <FileUpload image={uploadInvoiceIcon} allowedExtensions={['pdf']} onUpload={handleReceiptFileUpload} />
            </UploadFileContainer>
          </FormSection>

          <FormSection title="Notes">
            <NoteButton notes={invoiceReportInfo.notes} onChange={handleNoteChange} />
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
