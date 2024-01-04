import React, { useState } from 'react';
import axios from 'axios';

// project import
import MainCard from 'ui-component/cards/MainCard';
import FileUpload from 'ui-component/extended/FileUpload';
import uploadInvoiceIcon from 'assets/images/icons/invoiceIcon.png';

// mui import
import { Box, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';

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

const FormSection = ({ title, children }) => (
  <Box sx={{ width: '48%' }}>
    <Typography sx={{ fontSize: '15px', margin: '10px' }}>{title}</Typography>
    {children}
  </Box>
);

// ============================|| Upload Invoice Report ||============================ //

const ConvertFileFormat = () => {
  const [pullFile, setPullFile] = useState(null);
  const [pushFile, setPushFile] = useState(null);
  const [DCBFile, setDCBFile] = useState(null);
  const [mergedFile, setMergedFile] = useState(null);

  const handlePullFileChange = (file) => setPullFile(file);
  const handlePushFileChange = (file) => setPushFile(file);
  const handleDCBFileChange = (file) => setDCBFile(file);

  const values = {
    pullFile,
    pushFile,
    DCBFile
  };

  const handleUpload = async () => {
    console.log('Uploading files:', values);

    try {
      const response = await axios.post('https://localhost:44352/api/MergeExcel/merge', values, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response:', response);

      if (response.status === 200) {
        const result = response.data;
        setMergedFile(result);
      } else {
        console.error('File upload failed. Status:', response.status);
      }
    } catch (error) {
      console.error('Error uploading files:', error.message);
      console.error('Error details:', error.response); // Log the response for more information
    }
  };

  const downloadMergedFile = async () => {
    try {
      const base64String = mergedFile.result.mergedFileBytes;

      // Decode base64 string
      const byteArray = new Uint8Array(
        atob(base64String)
          .split('')
          .map((char) => char.charCodeAt(0))
      );

      const blob = new Blob([byteArray], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'merged_file.xlsx'); // Set a default name for the file

      // Append the link to the body, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading merged file:', error);
    }
  };

  return (
    <MainCard>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <FormSection title="Upload Pull Report">
          <UploadFileContainer>
            <FileUpload image={uploadInvoiceIcon} allowedExtensions={['xlsx']} onUpload={handlePullFileChange} />
          </UploadFileContainer>
        </FormSection>

        <FormSection title="Upload Push Report">
          <UploadFileContainer>
            <FileUpload image={uploadInvoiceIcon} allowedExtensions={['xlsx']} onUpload={handlePushFileChange} />
          </UploadFileContainer>
        </FormSection>

        <FormSection title="Upload DCB Report">
          <UploadFileContainer>
            <FileUpload image={uploadInvoiceIcon} allowedExtensions={['xlsx']} onUpload={handleDCBFileChange} />
          </UploadFileContainer>
        </FormSection>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '20px' }}>
        <Button variant="outlined" color="primary" onClick={handleUpload}>
          Merge Reports
        </Button>
      </Box>

      {mergedFile && (
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="h6">Merged File:</Typography>
          <a href={mergedFile.MergedFileBytes} download={mergedFile.MergedFileName} onClick={downloadMergedFile}>
            Download Merged File
          </a>
        </Box>
      )}
    </MainCard>
  );
};

export default ConvertFileFormat;
