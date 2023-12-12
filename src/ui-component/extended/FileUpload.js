import React, { useRef } from 'react';

// material-ui
import { Box } from '@mui/material';

// project imports
import UploadFile from 'assets/images/icons/doc.png';


const FileUpload = () => {
    const fileInputRef = useRef(null);
  
    const handleImageClick = () => {
      fileInputRef.current.click();
      console.log('Selected file:');
    };
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      console.log('Selected file:', selectedFile);
    };
  
    return (
      <Box>
        <button
          type="button"
          onClick={handleImageClick}
          style={{ cursor: 'pointer', width: "100px", height: "100px", border: 'none', padding: 0, background: 'none', marginTop: "1rem" }}
        >
          <img
            src={UploadFile}
            alt="Upload File"
            style={{ width: "100%", height: "100%", objectFit: 'cover' }}
          />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Box>
    );
  };
  
export default FileUpload;