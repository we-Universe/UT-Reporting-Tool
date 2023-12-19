import React, { useState } from 'react';

// project imports
import style from './Emails.module.css';
import { useTheme } from '@mui/material/styles';

// mui imports
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography } from '@mui/material';
import { TextField, Box, Select, MenuItem, FormControl } from '@mui/material';
import AddEmailDialog from './AddEmailDialog';

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

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>position</TableCell>
            <TableCell>Email Type</TableCell>
            <TableCell align="right">Delete Email</TableCell>
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
              <TableCell align="right">
                <button className={style.deleteButton}>
                  <svg className={style.deleteSvgIcon} viewBox="0 0 448 512">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
                </button>
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
