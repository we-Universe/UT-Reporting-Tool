import React, { useState } from 'react';

// project imports
import { useTheme } from '@mui/material/styles';
import SaveButton from '../SaveButton/SaveButton';
import EditButton from '../EditButton/EditButton';

// mui imports
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Accordion, AccordionSummary } from '@mui/material';
import { TextField, Box, Select, MenuItem, FormControl } from '@mui/material';
import AddEmailDialog from './AddEmailDialog';
import DeleteButton from 'ui-component/DeleteButton/DeleteButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EmailsTable = () => {
  const [emails, setEmails] = useState([
    { index: 0, email: 'example@gmail.com', name: 'name1 ', position: 'position1', emailType: 'To' },
    { index: 1, email: 'example@gmail.com', name: 'name2 ', position: 'position2', emailType: 'CC' },
    { index: 2, email: 'example@gmail.com', name: 'name3 ', position: 'position3', emailType: 'To' },
    { index: 3, email: 'example@gmail.com', name: 'name4 ', position: 'position4', emailType: 'To' },
    { index: 4, email: 'example@gmail.com', name: 'name5 ', position: 'position15', emailType: 'CC' }
  ]);
  const [editingEmails, setEditingEmails] = useState({});
  const [editedEmail, setEditedEmail] = useState({});

  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteEmailClick = (index) => {
    const updatedEmails = emails.filter((email) => email.index !== index);
    setEmails(updatedEmails);
  };

  const handleEditClick = (index) => {
    setEditingEmails((prevEditingEmails) => ({
      ...prevEditingEmails,
      [index]: true
    }));
  };

  const handleSaveClick = (index) => {
    // Save changes made to the currently edited row
    setEmails((prevEmails) => {
      const updatedEmails = [...prevEmails];
      // Update the values of the currently edited row in the copy
      updatedEmails[index] = {
        ...updatedEmails[index],
        ...editedEmail
      };
      return updatedEmails; // Fix the variable name here (updatedRows to updatedEmails)
    });

    // Stop editing for the specific row
    setEditingEmails((prevEditingRows) => ({
      ...prevEditingRows,
      [index]: false
    }));
    setEditedEmail({});
  };
  const handleFieldChange = (field, value) => {
    setEditedEmail((prevEditedEmail) => ({
      ...prevEditedEmail,
      [field]: value
    }));
  };

  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: theme.palette.primary.light, borderRadius: '10px' }}>
          <Typography sx={{ color: '#0B3782', fontWeight: '500', fontSize: '15px' }}> Emails</Typography>
        </AccordionSummary>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>position</TableCell>
              <TableCell>Email Type</TableCell>
              <TableCell>Delete Email</TableCell>
              <TableCell>Edit/Save</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emails.map((email, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <TextField
                    defaultValue={editedEmail.email ?? email.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    variant="outlined"
                    sx={{
                      color: '#0B3782',
                      '& fieldset': {
                        border: editingEmails[index] ? '1px solid #ccc' : 'none'
                      }
                    }}
                    InputProps={{ readOnly: !editingEmails[index] }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    defaultValue={editedEmail.name ?? email.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    variant="outlined"
                    sx={{
                      color: '#0B3782',
                      '& fieldset': {
                        border: editingEmails[index] ? '1px solid #ccc' : 'none'
                      }
                    }}
                    InputProps={{ readOnly: !editingEmails[index] }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    defaultValue={editedEmail.position ?? email.position}
                    onChange={(e) => handleFieldChange('position', e.target.value)}
                    variant="outlined"
                    sx={{
                      color: '#0B3782',
                      '& fieldset': {
                        border: editingEmails[index] ? '1px solid #ccc' : 'none'
                      }
                    }}
                    InputProps={{ readOnly: !editingEmails[index] }}
                  />
                </TableCell>

                <TableCell component="th" scope="row">
                  {editingEmails[index] ? (
                    <FormControl
                      sx={{
                        width: '100%',
                        color: '#0B3782',
                        '& fieldset': {
                          border: editingEmails[index] ? '1px solid #ccc' : 'none'
                        }
                      }}
                    >
                      <Select
                        value={editedEmail.emailType ?? email.emailType}
                        onChange={(e) => handleFieldChange('emailType', e.target.value)}
                      >
                        <MenuItem value="To">To</MenuItem>
                        <MenuItem value="CC">CC</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: '#f8fafc',
                        padding: '15px',
                        borderRadius: '8px',
                        color: '#0B3782',
                        fontWeight: '500'
                      }}
                    >
                      {email.emailType}
                    </Box>
                  )}
                </TableCell>
                <TableCell sx={{ minWidth: '110px', textAlign: 'center' }}>
                  <DeleteButton onClick={() => handleDeleteEmailClick(email.index)} />
                </TableCell>
                <TableCell sx={{ minWidth: '130px', textAlign: 'center' }}>
                  {editingEmails[index] ? (
                    <SaveButton onClick={() => handleSaveClick(index)} />
                  ) : (
                    <EditButton handleEditClick={() => handleEditClick(index)} />
                  )}
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
        <AddEmailDialog open={open} setOpen={setOpen} setEmails={setEmails} emails={emails} />
      </Accordion>
    </Box>
  );
};

export default EmailsTable;
