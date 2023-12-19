import React, { useState } from 'react';

// project imports
import { useTheme } from '@mui/material/styles';

// mui imports
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography } from '@mui/material';
import { TextField, Box, Select, MenuItem, FormControl } from '@mui/material';
import AddEmailDialog from './AddEmailDialog';
import DeleteButton from 'ui-component/DeleteButton/DeleteButton';

const EmailsTable = () => {
  const [emails, setEmails] = useState([
    { email: 'example@gmail.com', name: 'name1 ', position: 'position1', emailType: 'To' },
    { email: 'example@gmail.com', name: 'name2 ', position: 'position2', emailType: 'CC' },
    { email: 'example@gmail.com', name: 'name3 ', position: 'position3', emailType: 'To' },
    { email: 'example@gmail.com', name: 'name4 ', position: 'position4', emailType: 'To' },
    { email: 'example@gmail.com', name: 'name5 ', position: 'position15', emailType: 'CC' }
  ]);
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (index, event) => {
    const updatedRows = [...emails];
    updatedRows[index].name = event.target.value;
    setEmails(updatedRows);
  };

  const handleSelectChange = (index, event) => {
    const updatedRows = [...emails];
    updatedRows[index].calories = event.target.value;
    setEmails(updatedRows);
  };

  return (
    <Box>
      <Box sx={{ width: '100%', backgroundColor: theme.palette.primary.light, borderRadius: '10px', textAlign: 'center' }}>
        <Typography sx={{ padding: '20px' }}> Emails</Typography>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>position</TableCell>
            <TableCell>Email Type</TableCell>
            <TableCell>Delete Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emails.map((email, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <TextField
                  value={email.email}
                  variant="outlined"
                  onChange={(e) => handleEmailChange(index, e)}
                  sx={{ color: '#0B3782', '& fieldset': { border: 'none' } }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={email.name}
                  variant="outlined"
                  onChange={(e) => handleEmailChange(index, e)}
                  sx={{ color: '#0B3782', '& fieldset': { border: 'none' } }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={email.position}
                  variant="outlined"
                  onChange={(e) => handleEmailChange(index, e)}
                  sx={{ color: '#0B3782', '& fieldset': { border: 'none' } }}
                />
              </TableCell>
              <TableCell>
                <FormControl sx={{ width: '100%', color: '#0B3782', '& fieldset': { border: 'none' } }}>
                  <Select value={email.emailType} onChange={(e) => handleSelectChange(index, e)}>
                    <MenuItem value="To">To</MenuItem>
                    <MenuItem value="CC">CC</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <DeleteButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '20px' }}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add New Email
        </Button>
      </Box>
      <AddEmailDialog open={open} handleClose={handleClose} />
    </Box>
  );
};

export default EmailsTable;
