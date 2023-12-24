import React, { useState } from 'react';
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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditButton from 'ui-component/EditButton/EditButton';
import SaveButton from 'ui-component/SaveButton/SaveButton';
import dayjs from 'dayjs';

// ============================|| UTILITIES SERVICES INFO ||============================ //

const roows = [
  { index: 0, name: 'Frozen yoghurt', operatorShare: 159, mtitFile: 'File1', status: 'status 1', launchedDate: '01/01/2022' },
  { index: 1, name: 'Ice cream sandwich', operatorShare: 237, mtitFile: 'File2', status: 'status 2', launchedDate: '02/02/2022' },
  { index: 2, name: 'Eclair', operatorShare: 262, mtitFile: 'File3', status: 'status 1', launchedDate: '03/03/2022' },
  { index: 3, name: 'Cupcake', operatorShare: 305, mtitFile: 'File4', status: 'status 2', launchedDate: '04/04/2022' },
  { index: 4, name: 'Gingerbread', operatorShare: 356, mtitFile: 'File5', status: 'status  1', launchedDate: '05/05/2022' }
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
  const theme = useTheme();
  const [rows, setRows] = useState([...roows]);
  const [editingRows, setEditingRows] = useState({});
  const [editedRow, setEditedRow] = useState({});

  const handleEditClick = (index) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [index]: true
    }));
  };

  const handleSaveClick = (index) => {
    // Save changes made to the currently edited row
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      // Update the values of the currently edited row in the copy
      updatedRows[index] = {
        ...updatedRows[index],
        ...editedRow
      };
      return updatedRows;
    });

    // Stop editing for the specific row
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [index]: false
    }));
    setEditedRow({});
  };

  const handleFieldChange = (field, value) => {
    setEditedRow((prevEditedRow) => ({
      ...prevEditedRow,
      [field]: value
    }));
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
                    sx={{
                      color: '#0B3782',
                      '& fieldset': {
                        border: editingRows[index] ? '1px solid #ccc' : 'none'
                      }
                    }}
                    defaultValue={editedRow.name ?? row.name}
                    InputProps={{ readOnly: !editingRows[index] }}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    variant="outlined"
                    sx={{
                      color: '#0B3782',
                      '& fieldset': {
                        border: editingRows[index] ? '1px solid #ccc' : 'none'
                      }
                    }}
                    defaultValue={editedRow.operatorShare ?? row.operatorShare}
                    InputProps={{ readOnly: !editingRows[index] }}
                    onChange={(e) => handleFieldChange('operatorShare', e.target.value)}
                  />
                </TableCell>
                <TableCell component="th" scope="row"></TableCell>
                <TableCell component="th" scope="row">
                  {editingRows[index] ? (
                    <FormControl
                      sx={{
                        width: '100%',
                        color: '#0B3782',
                        '& fieldset': {
                          border: editingRows[index] ? '1px solid #ccc' : 'none'
                        }
                      }}
                    >
                      <Select value={editedRow.status || row.status} onChange={(e) => handleFieldChange('status', e.target.value)}>
                        <MenuItem value="status 1">status 1</MenuItem>
                        <MenuItem value="status 2">status 2</MenuItem>
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
                      {row.status}
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  {editingRows[index] ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Launched Date"
                        inputFormat="MM/DD/YYYY"
                        renderInput={(params) => <TextField {...params} />}
                        value={dayjs(editedRow.launchedDate)}
                        onChange={(date) => {
                          const formattedDate = dayjs(date).format('MM/DD/YYYY');
                          handleFieldChange('launchedDate', formattedDate);
                        }}
                      />
                    </LocalizationProvider>
                  ) : (
                    <Box sx={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', color: '#0B3782', fontWeight: '500' }}>
                      {row.launchedDate}
                    </Box>
                  )}
                </TableCell>
                <TableCell sx={{ minWidth: '130px' }}>
                  {editingRows[index] ? (
                    <SaveButton onClick={() => handleSaveClick(index)} />
                  ) : (
                    <EditButton onClick={() => handleEditClick(index)} />
                  )}
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
