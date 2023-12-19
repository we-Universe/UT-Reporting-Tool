import React from 'react';

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Autocomplete } from '@mui/material';
//import styled from '@emotion/styled';

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
//import SaveButton from 'ui-component/SaveButton/SaveButton';

// ============================|| UTILITIES SERVICES INFO ||============================ //

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

// const StyledTableContainer = styled(TableContainer)({
//   border: '1px solid #ccc',
//   fontWeight: 'bold',
//   fontSize: '24px'
// });

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

  return (
    <MainCard title="Services Info">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: '30%', marginBottom: '20px' }}
        renderInput={(params) => <TextField {...params} label="Merchant Name" />}
      />

      <Table>
        <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
          <TableRow>
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
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker label=" Launched Date" inputFormat="MM/DD/YYYY" renderInput={(params) => <TextField {...params} />} />
                </LocalizationProvider>
              </TableCell>
              <TableCell>
                <EditButton />
                <SaveButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MainCard>
  );
};

export default UtilitiesServicesInfo;
