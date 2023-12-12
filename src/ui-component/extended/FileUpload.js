import React, { useRef, useState } from 'react';

// material-ui
import { Box, Typography } from '@mui/material';

// project imports
import UploadFile from 'assets/images/icons/doc.png';

const FileUpload = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <button
        type="button"
        onClick={handleImageClick}
        style={{ cursor: 'pointer', width: '40px', height: '40px', border: 'none', padding: 0, background: 'none' }}
      >
        <img src={UploadFile} alt="Upload File" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </button>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      {selectedFile && (
        <Typography variant="body2" style={{ marginTop: '8px', marginLeft: '8px' }}>
          {selectedFile.name}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;