import React from 'react';

//mui material
import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const AddEmailDialog = ({ open, handleClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [emailType, setEmailType] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };
  const handleEmailTypeChange = (event) => {
    setEmailType(event.target.value);
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose} fullWidth sx={{ padding: '10px' }}>
        <DialogTitle sx={{ mt: '10px', fontSize: '20px' }} id="customized-dialog-title">
          Add New Email
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <Divider fullWidth />
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField margin="dense" label="Name" type="text" fullWidth variant="standard" value={name} onChange={handleNameChange} />
          <TextField
            margin="dense"
            label="Position"
            type="text"
            fullWidth
            variant="standard"
            value={position}
            onChange={handlePositionChange}
          />
          <FormControl sx={{ marginTop: '20px' }} fullWidth>
            <InputLabel>Select Email Type</InputLabel>
            <Select label="Select Email Type" value={emailType} onChange={handleEmailTypeChange}>
              <MenuItem value="To">To</MenuItem>
              <MenuItem value="CC">CC</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddEmailDialog;
