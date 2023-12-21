// import React from 'react';

// //mui material
// import {
//   Box,
//   Dialog,
//   DialogTitle,
//   IconButton,
//   DialogContent,
//   TextField,
//   DialogActions,
//   Button,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
//   Divider
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { useState } from 'react';

// const AddEmailDialog = ({ open, setOpen, setEmail, emails }) => {
//   const [newEmail, setNewEmail] = useState({ email: '', name: '', position: '', emailType: '' });

//   const handleSaveNewEmail = () => {
//     const newEmails = [...emails];
//     newEmail.push(newEmail);
//     setEmail(newEmails);
//     setOpen(true);
//   };

//   return (
//     <Box>
//       <Dialog open={open} onClose={handleClose} fullWidth sx={{ padding: '10px' }}>
//         <DialogTitle sx={{ mt: '10px', fontSize: '20px' }} id="customized-dialog-title">
//           Add New Email
//         </DialogTitle>

//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500]
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <Divider fullWidth />
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Email Address"
//             type="email"
//             fullWidth
//             variant="standard"
//             value={newEmail.email}
//             onChange={(event) => setNewEmail({ ...newEmail, email: event.target.value })}
//           />
//           <TextField
//             margin="dense"
//             label="Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={newEmail.name}
//             onChange={(event) => setNewEmail({ ...newEmail, name: event.target.value })}
//           />
//           <TextField
//             margin="dense"
//             label="Position"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={newEmail.position}
//             onChange={(event) => setNewEmail({ ...newEmail, position: event.target.value })}
//           />
//           <FormControl sx={{ marginTop: '20px' }} fullWidth>
//             <InputLabel>Select Email Type</InputLabel>
//             <Select
//               label="Select Email Type"
//               value={newEmail.emailType}
//               onChange={(event) => setNewEmail({ ...newEmail, emailType: event.target.value })}
//             >
//               <MenuItem value="To">To</MenuItem>
//               <MenuItem value="CC">CC</MenuItem>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleSaveNewEmail}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AddEmailDialog;

import React from 'react';
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

const AddEmailDialog = ({ open, setOpen, setEmails, emails }) => {
  const [newEmail, setNewEmail] = useState({ index: '', email: '', name: '', position: '', emailType: '' });

  const handleClose = () => {
    setOpen(false);
    setNewEmail({ email: '', name: '', position: '', emailType: '' });
  };

  const handleSaveNewEmail = () => {
    newEmail.index = emails.length;
    const newEmails = [...emails, newEmail];
    setEmails(newEmails);
    handleClose();
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
            value={newEmail.email}
            onChange={(event) => setNewEmail({ ...newEmail, email: event.target.value })}
          />
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={newEmail.name}
            onChange={(event) => setNewEmail({ ...newEmail, name: event.target.value })}
          />
          <TextField
            margin="dense"
            label="Position"
            type="text"
            fullWidth
            variant="standard"
            value={newEmail.position}
            onChange={(event) => setNewEmail({ ...newEmail, position: event.target.value })}
          />
          <FormControl sx={{ marginTop: '20px' }} fullWidth>
            <InputLabel>Select Email Type</InputLabel>
            <Select
              label="Select Email Type"
              value={newEmail.emailType}
              onChange={(event) => setNewEmail({ ...newEmail, emailType: event.target.value })}
            >
              <MenuItem value="To">To</MenuItem>
              <MenuItem value="CC">CC</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveNewEmail}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddEmailDialog;
