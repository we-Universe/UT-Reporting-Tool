import React, { useState } from 'react';

// material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Autocomplete,
  TableContainer,
  Select,
  FormControl,
  MenuItem,
  Box
} from '@mui/material';
import styled from '@emotion/styled';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';

//import dayjs from 'dayjs';
import 'react-datepicker/dist/react-datepicker.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import EditButton from 'ui-component/EditButton/EditButton';
import SaveButton from 'ui-component/SaveButton/SaveButton';

// ============================|| UTILITIES SERVICES INFO ||============================ //

const rows = [
  { index: 0, name: 'Frozen yoghurt', operatorShare: 159, mtitFile: 'File1', status: 'To', launchedDate: '01/01/2022' },
  { index: 1, name: 'Ice cream sandwich', operatorShare: 237, mtitFile: 'File2', status: 'CC', launchedDate: '02/02/2022' },
  { index: 2, name: 'Eclair', operatorShare: 262, mtitFile: 'File3', status: 'To', launchedDate: '03/03/2022' },
  { index: 3, name: 'Cupcake', operatorShare: 305, mtitFile: 'File4', status: 'CC', launchedDate: '04/04/2022' },
  { index: 4, name: 'Gingerbread', operatorShare: 356, mtitFile: 'File5', status: 'To', launchedDate: '05/05/2022' }
];

const StyledTableContainer = styled(TableContainer)({
  border: '1px solid #ccc',
  fontWeight: 'bold',
  fontSize: '24px',
  borderRadius: '8px'
});

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];

const UtilitiesServicesInfo = () => {
  //const [value] = React.useState(new Date('2022-04-17'));
  const theme = useTheme();
  const [editingRowId, setEditingRowId] = useState(-1);
  //const [editedRows, setEditedRows] = useState([...rows]);

  const handleEditClick = (index) => {
    setEditingRowId(index);
  };

  return (
    <MainCard title="Services Info">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: '30%', marginBottom: '20px' }}
        renderInput={(params) => <TextField {...params} label="Merchant Name" />}
      />
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
              <TableCell>Service Name</TableCell>
              <TableCell> Operator Share</TableCell>
              <TableCell>MTIT File </TableCell>
              <TableCell>Status</TableCell>
              <TableCell> Launched Date</TableCell>
              <TableCell>Edit/Save</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <TextField
                    variant="outlined"
                    sx={{ color: '#0B3782', '& fieldset': { border: 'none' } }}
                    value={row.name}
                    InputProps={{ readOnly: editingRowId !== index }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    variant="outlined"
                    sx={{ color: '#0B3782', '& fieldset': { border: 'none' } }}
                    defaultValue={row.operatorShare}
                    InputProps={{ readOnly: editingRowId !== index }}
                  />
                </TableCell>
                <TableCell component="th" scope="row"></TableCell>

                <TableCell component="th" scope="row">
                  {editingRowId !== index ? (
                    <Box sx={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px' }}>{row.status}</Box>
                  ) : (
                    <FormControl sx={{ width: '100%', color: '#0B3782', '& fieldset': { border: 'none' } }}>
                      <Select disabled={editingRowId !== index} value={row.status}>
                        <MenuItem value="To">status 1</MenuItem>
                        <MenuItem value="CC">status 2</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </TableCell>
                <TableCell>
                  {editingRowId !== index ? (
                    <Box sx={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px' }}> {row.launchedDate}</Box>
                  ) : (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Launched Date"
                        inputFormat="MM/DD/YYYY"
                        renderInput={(params) => <TextField {...params} />}
                        value={new Date(row.launchedDate)}
                      />
                    </LocalizationProvider>
                  )}
                </TableCell>
                <TableCell sx={{ minWidth: '130px' }}>
                  {editingRowId === index ? <SaveButton /> : <EditButton handleEditClick={() => handleEditClick(index)} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </MainCard>
  );
};

export default UtilitiesServicesInfo;
