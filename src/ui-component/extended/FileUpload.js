import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const FileUpload = ({ image, allowedExtensions, onUpload, flag, reportFileName }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (flag) {
      const clearInput = () => clearFileInput();
      clearInput();
    }
  }, [flag]);

  useEffect(() => {
    if (reportFileName) {
      setName(reportFileName);
    }
  }, [reportFileName]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        alert(`Invalid file type. Please select a file with .${allowedExtensions.join(', ')} extension.`);
        return;
      }
      
      if (onUpload) {
        setSelectedFile(file);
        setName(file.name);
        onUpload(file);
      }
    }
  };

  const clearFileInput = () => {
    fileInputRef.current.value = '';
    setSelectedFile(null);
    setName(""); 
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <button
        type="button"
        onClick={handleImageClick}
        style={{ cursor: 'pointer', width: '40px', height: '40px', border: 'none', padding: 0, background: 'none' }}
      >
        <img src={image} alt="Upload File" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </button>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      {name !== "" ? (
        <Typography variant="body2" style={{ marginTop: '8px', marginLeft: '8px' }}>
          {name}
        </Typography>
      ) : (
        selectedFile && (
          <Typography variant="body2" style={{ marginTop: '8px', marginLeft: '8px' }}>
            {selectedFile.name}
          </Typography>
        )
      )}
    </Box>
  );
};

FileUpload.propTypes = {
  image: PropTypes.string.isRequired,
  allowedExtensions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpload: PropTypes.func
};

export default FileUpload;