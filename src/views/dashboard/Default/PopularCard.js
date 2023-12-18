import React, { useMemo, useState } from 'react';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useTable } from 'react-table';

// material-ui
import { Grid, Checkbox, TextField, IconButton, Alert, Link, Typography, Box, Select, MenuItem, Button, CardActions, Tooltip, SvgIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import logo from 'assets/images/icons/excel.png';
import DropdownList from '../../../ui-component/extended/DropdownList';
import { reportTypes, merchantName } from '../../../store/typesData';

const monthAbbreviations = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

const extractFileName = (filePath) => {
  const fileName = filePath.split('/').pop();
  return fileName;
};

const ReportFileCell = ({ value, isEditable }) => {
  const fileName = extractFileName(value);
  if (isEditable) {
    return (
      <IconButton disabled>
        <FileCopyIcon />
      </IconButton>
    );
  }

  return (
    <Box sx={{ display: 'flex', paddingLeft: "2rem" }}>
      <Link href={`${value}`} target="_blank" rel="noopener noreferrer">
        <img src={logo} alt="Universe" width="25" />
      </Link>
      <Link href={`${value}`} target="_blank" rel="noopener noreferrer">
        <Typography variant="h3"
          sx={{
            color: '#0B3782',
            padding: '8px',
            fontSize: '15px',
            fontWeight: 500,
            backgroundColor: "#f8fafc",
            borderRadius: "12px"
          }}> {fileName}
        </Typography>
      </Link>
    </Box>
  );
};

const PopularCard = () => {
  const [editableRows, setEditableRows] = useState(new Set());
  const [editedValues, setEditedValues] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedMerchantName, setSelectedMerchantName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [toSelectedDate, setToSelectedDate] = useState(new Date());
  const [viewAll, setViewAll] = useState(false);

  const data = useMemo(() => [
    { id: 1, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1Default Notes 1Default Notes 1', approved: 1, Month: 11, Year: 2023, merchantName: "hello", status: "eeee" },
    { id: 2, type: 'PUSH', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 2', approved: 1, Month: 12, Year: 2023, merchantName: "hello", status: "eeee" },
    { id: 3, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, merchantName: "hello", status: "eeee" },
    { id: 4, type: 'PUSH', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 2, Year: 2023, merchantName: "hi", status: "eeee" },
    { id: 5, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, merchantName: "hi", status: "eeee" },
    { id: 6, type: 'PUSH', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, merchantName: "hi", status: "eeee" },
    { id: 7, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, merchantName: "hi", status: "eeee" },
    { id: 8, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 3, Year: 2023, merchantName: "hi", status: "eeee" },
    { id: 9, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 2, Year: 2023, merchantName: "hi", status: "eeee" },
    { id: 10, type: 'RBT', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, merchantName: "hi", status: "eeee" },
    { id: 11, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, merchantName: "hi", status: "eeee" },
    { id: 12, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 9, Year: 2023, merchantName: "hi", status: "eeee" },
    { id: 13, type: 'PULL', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, merchantName: "hi", status: "eeee" },
    { id: 14, type: 'RBT', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, merchantName: "hi", status: "eeee" },
    { id: 15, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 10, Year: 2023, merchantName: "hello", status: "eeee" },
    { id: 16, type: 'PULL', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, merchantName: "hi", status: "eeee" },
    { id: 17, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, merchantName: "hi", status: "eeee" },
    { id: 18, type: 'PUSH', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, merchantName: "hi", status: "eeee" }
  ], []);

  const filteredData = useMemo(() => {
    let filtered = data;

    if (selectedReportType) {
      filtered = filtered.filter((item) => item.type.toLowerCase() === selectedReportType.toLowerCase());
    }

    if (selectedMerchantName) {
      filtered = filtered.filter((item) => item.merchantName.toLowerCase() === selectedMerchantName.toLowerCase());
    }

    const selectedDateObject = new Date(selectedDate);
    const dateString = selectedDateObject.toDateString();
    const [selectedMonth, number, selectedYear] = dateString.split(' ').slice(1, 4);
    const monthNumber = monthAbbreviations[selectedMonth];

    console.log('kk', monthNumber, selectedYear, number);

    if (selectedYear) {
      filtered = filtered.filter((item) => item.Year === Number(selectedYear));
    }

    if (monthNumber) {
      filtered = filtered.filter((item) => item.Month === monthNumber);
    }

    return viewAll ? filtered : filtered.slice(0, 15);
  }, [data, selectedReportType, selectedMerchantName, selectedDate, toSelectedDate, viewAll]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleToDateChange = (date) => {
    setToSelectedDate(date);
  };

  const handleDropdownChange = (value) => {
    setSelectedReportType(value);
  };

  const handleMerchantDropdownChange = (value) => {
    setSelectedMerchantName(value);
  };

  const handleSaveClick = (rowId) => {
    if (editableRows.has(rowId)) {
      setAlertMessage(`Changes saved successfully for row ${Number(rowId) + 1}`);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3500);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const columns = useMemo(() => [
    {
      Header: 'Merchant Name',
      accessor: 'merchantName',
      Cell: ({ row }) => (
        <Select
          value={editedValues[row.id]?.merchantName ?? row.original.merchantName}
          onChange={(e) => {
            setEditedValues((prev) => ({ ...prev, [row.id]: { ...prev[row.id], merchantName: e.target.value } }));
          }}
          sx={{ color: "#0B3782", "& fieldset": { border: 'none' } }}
          disabled={!editableRows.has(row.id)}
        >
          {merchantName.map((merchantName) => (
            <MenuItem key={merchantName} value={merchantName}>
              {merchantName}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      Header: 'Report File',
      accessor: 'file',
      Cell: ({ row }) => (
        <ReportFileCell value={row.original.file} isEditable={editableRows.has(row.id)} />
      ),
    },
    {
      Header: 'Notes',
      accessor: 'notes',
      Cell: ({ row }) => (
        <TextField
          defaultValue={editedValues[row.id]?.notes ?? row.original.notes}
          onBlur={(e) => {
            setEditedValues((prev) => ({ ...prev, [row.id]: { ...prev[row.id], notes: e.target.value } }));
          }}
          sx={{ color: "#0B3782", "& fieldset": { border: 'none' } }}
          multiline
          InputProps={{
            readOnly: !editableRows.has(row.id),
            inputProps: {
              style: { textAlign: 'center' }
            }
          }}
        />
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row }) => (
        <TextField
          defaultValue={editedValues[row.id]?.status ?? row.original.status}
          onBlur={(e) => {
            setEditedValues((prev) => ({ ...prev, [row.id]: { ...prev[row.id], status: e.target.value } }));
          }}
          sx={{ color: "#0B3782", "& fieldset": { border: 'none' } }}
          multiline
          InputProps={{
            readOnly: !editableRows.has(row.id),
            inputProps: {
              style: { textAlign: 'center' }
            }
          }}
        />
      ),
    },
    {
      Header: 'Approved',
      accessor: 'approved',
      Cell: ({ row }) => (
        <Checkbox
          checked={editedValues[row.id]?.approved ?? row.original.approved}
          onChange={(e) => {
            setEditedValues((prev) => ({ ...prev, [row.id]: { ...prev[row.id], approved: e.target.checked } }));
          }}
          sx={{ color: "#0B3782" }}
          disabled={!editableRows.has(row.id)}
        />
      ),
    },
    {
      Header: 'Edit/Save',
      accessor: 'actions',
      Cell: ({ row }) => (
        <IconButton
          onClick={() => {
            setEditableRows((prevRows) => {
              const newRows = new Set(prevRows);
              newRows.has(row.id) ? newRows.delete(row.id) : newRows.add(row.id);
              return newRows;
            });
          }}
        >
          {editableRows.has(row.id) ?
            <Button
              onClick={() => handleSaveClick(row.id)}
              sx={{
                width: '100px',
                height: '40px',
                borderRadius: '40px',
                border: '1px solid rgba(255, 255, 255, 0.349)',
                backgroundColor: 'rgb(11, 55, 130, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transitionDuration: '.3s',
                overflow: 'hidden',
                '&:hover': {
                  backgroundColor: 'rgba(11, 55, 130, 1)'
                },
                '&:active': {
                  transform: 'scale(0.95)',
                }
              }}
            >
              <Box
                sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  zIndex: 2,
                  transitionDuration: '.3s',
                  backgroundColor: "rgba(11, 55, 130, 1)",
                  '&:hover': {
                    width: '90px',
                    borderRadius: '40px',
                  },
                }}
              >
                <SvgIcon
                  viewBox="0 0 384 512"
                  height="0.9em"
                  sx={{
                    borderRadius: '1px',
                    color: "rgba(255, 255, 255, 1)"
                  }}
                >
                  <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
                </SvgIcon>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  height: '100%',
                  width: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  zIndex: 1,
                  transitionDuration: '.3s',
                  fontSize: '13px',
                  '&:hover': {
                    transform: 'translate(10px)',
                    width: '0',
                    fontSize: '0',
                  },
                }}
              >
                Save
              </Typography>
            </Button> :
            <Tooltip arrow>
              <IconButton
                sx={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  backgroundColor: '#0B3782',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transitionDuration: '0.3s',
                  overflow: 'hidden',
                  position: 'relative',
                  textDecoration: 'none !important',
                  '&:hover': {
                    width: '120px',
                    borderRadius: '50px',
                    transitionDuration: '0.3s',
                    backgroundColor: 'rgba(11, 55, 130, 0.9)',
                    alignItems: 'center',
                  },
                  '&::before': {
                    display: 'none',
                    content: '"Edit"',
                    color: 'white',
                    transitionDuration: '0.3s',
                    fontSize: '2px',
                  },
                  '&:hover::before': {
                    display: 'block',
                    paddingRight: '10px',
                    fontSize: '13px',
                    opacity: 1,
                    transform: 'translateY(0px)',
                    transitionDuration: '0.3s',
                  },
                }}
              >
                <EditIcon sx={{ fill: 'white', transitionDuration: '0.3s' }} />
              </IconButton>
            </Tooltip>}
        </IconButton>
      ),
    },
  ], [editableRows, editedValues]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData });

  return (
    <Box>
      <MainCard title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Reports History</span>
        <DropdownList
          selectedTypes={merchantName}
          placeholder={'Choose merchant name'}
          value={selectedMerchantName}
          onChange={handleMerchantDropdownChange}
          wrapperClassName="w-full"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            views={['year', 'month']}
            label="From Date"
            inputFormat="MM/YYYY"
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <span style={{ borderBottom: '2px solid grey', width: '13px', display: 'inline-block' }}></span>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            views={['year', 'month']}
            label="To Date"
            inputFormat="MM/YYYY"
            onChange={handleToDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <DropdownList
          selectedTypes={reportTypes}
          placeholder={'Choose report type'}
          value={selectedReportType}
          onChange={handleDropdownChange}
          wrapperClassName="w-full"
        />
      </div>}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SubCard>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                          {headerGroup.headers.map((column) => (
                            <th
                              {...column.getHeaderProps()}
                              style={{
                                padding: '8px',
                                borderBottom: '1px solid #ddd',
                                fontSize: '15px',
                              }}
                              key={column.id}
                            >
                              {column.render('Header')}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {rows.map((row) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()} style={{ borderBottom: '1px solid #ddd' }} key={row.id}>
                            {row.cells.map((cell) => (
                              <td {...cell.getCellProps()} style={{ padding: '8px', textAlign: 'center' }} key={cell.column.id}>
                                {cell.render('Cell')}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Grid>
              </Grid>
              <CardActions sx={{ p: 1.25, pt: 2, justifyContent: 'center' }}>
                <Button size="small" disableElevation onClick={() => setViewAll(!viewAll)}>
                  {(viewAll) && (filteredData.length > 15) ? 'View Less' : 'View All'}
                  <ChevronRightOutlinedIcon />
                </Button>
              </CardActions>
            </SubCard>
          </Grid>
        </Grid>
      </MainCard>
      {showAlert && (
        <Box
          position="fixed"
          bottom="0"
          left="50%"
          transform="translateX(-50%)"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          padding="16px"
        >
          {showAlert && (
            <Alert severity="success" onClose={handleCloseAlert} sx={{ width: '100%', maxWidth: '600px' }}>
              {alertMessage}
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PopularCard;