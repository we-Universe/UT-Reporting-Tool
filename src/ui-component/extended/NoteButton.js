import React, { useState } from 'react';

// material-ui
import { Button, Modal, Box, TextareaAutosize, Typography } from '@mui/material';

import { styled } from '@mui/system';

const CustomButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    fontSize: '1.2em',
    padding: '0.7em 1.4em',
    backgroundColor: theme.palette.grey[900],
    textDecoration: 'none',
    border: 'none',
    borderRadius: '0.5em',
    color: '#DEDEDE',
    '&::before': {
        position: 'absolute',
        content: '""',
        height: 0,
        width: 0,
        top: 0,
        left: 0,
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.light} 60%)`,
        borderRadius: '0 0 0.5em 0',
        transition: '0.3s',
    },
    '&:hover': {
        backgroundColor: theme.palette.grey[900],
    },
    '&:hover::before': {
        width: '1em',
        height: '1em',
    },
    '&:active': {
        boxShadow: `${theme.palette.grey[900]}`,
        transform: 'translate(0.1em, 0.1em)',
    },
}));

const StyledTextarea = styled(TextareaAutosize)({
  width: '100%',
  padding: '1em',
  borderRadius: '0.5em',
  border: '1px solid #ccc',
  marginTop: '1em',
  fontSize: '1em',
});

const NoteButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  const [savedNote, setSavedNote] = useState(null); 

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleSave = () => {
    setSavedNote(textareaValue); 
    handleModalClose();
  };

  const handleEdit = () => {
    setModalOpen(true); 
  };

  return (
    <>
      {savedNote ? (
        <>
          <Typography variant="body1" gutterBottom>
            {savedNote}
          </Typography>
          <CustomButton onClick={handleEdit}>Edit note</CustomButton>
        </>
      ) : (
        <CustomButton onClick={handleButtonClick}>Add note</CustomButton>
      )}

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="div">
            {savedNote ? 'Edit Note' : 'Add Note'}
          </Typography>
          <StyledTextarea rowsMin={3} placeholder="Type your note here..." value={textareaValue} onChange={handleTextareaChange} />
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button variant="contained" onClick={handleModalClose} sx={{ marginTop: '1em', backgroundColor: "#0B3782" }}>
              Close
            </Button>
            <Button variant="contained" onClick={handleSave} sx={{ marginTop: '1em', backgroundColor: "#0B3782" }}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NoteButton;