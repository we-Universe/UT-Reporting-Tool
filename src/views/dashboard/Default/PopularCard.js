import React, { useMemo, useState, useEffect } from 'react';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useTable } from 'react-table';

// material-ui
import { Grid, Checkbox, TextField, IconButton, Alert, Link, Typography, Box, Select, MenuItem, Button, CardActions } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import logo from 'assets/images/icons/excel.png';
import DropdownList from '../../../ui-component/extended/DropdownList';
import EditButton from '../../../ui-component/EditButton/EditButton';
import SaveButton from '../../../ui-component/SaveButton/SaveButton';
import MerchantImage from '../../../assets/images/icons/seller.png';
import NoteImage from '../../../assets/images/icons/pencil.png';
import StatusImage from '../../../assets/images/icons/check-list.png';

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

const ReportFileCell = ({ value, row, isEditable }) => {
  const fileName = useMemo(() => {
    const { merchantName, type, Month, Year } = row.original;
    return `${merchantName}_${type}_${Month}_${Year}`;
  }, [value, row]);

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
  const [reports, setReports] = useState([]);
  const [reportTypes, setReportTypes] = useState([]);
  const [merchant, setMerchant] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await fetch(`https://localhost:7071/api/Reports/GetReportByMerchantReport`);
      if (!response.ok) {
        console.error('Failed to fetch reports. HTTP Status:', response.status);
        return;
      }

      const data = await response.json();
      console.log('Fetched reports:', data);
      setReports(data);

    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const fetchReportTypes = async () => {
    try {
      const response = await fetch(`https://localhost:7071/api/ReportsTypes/GetAllReportTypeNames`);

      if (!response.ok) {
        console.error('Failed to fetch reports. HTTP Status:', response.status);
        return;
      }

      const data = await response.json();
      console.log('Fetched reports:', data);
      setReportTypes(data);

    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const fetchMerchantNames = async () => {
    try {
      const response = await fetch(`https://localhost:7071/api/Merchant/GetAllMerchantNames`);

      if (!response.ok) {
        console.error('Failed to fetch reports. HTTP Status:', response.status);
        return;
      }

      const data = await response.json();
      console.log('Fetched merchant names:', data);
      setMerchant(data);

    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    fetchReports();
    fetchReportTypes();
    fetchMerchantNames();
  }, []);

  const data = useMemo(() => reports.map((report) => ({
    id: report.id,
    type: report.type,
    file: report.file,
    notes: report.notes.map(note => note.content).join('\n'),
    approved: report.approved,
    Month: report.month,
    Year: report.year,
    merchantName: report.merchantName,
    status: report.status,
  })), [reports]);

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
    const [selectedMonth, , selectedYear] = dateString.split(' ').slice(1, 4);
    const monthNumber = monthAbbreviations[selectedMonth];
    const toSelectedDateObject = new Date(toSelectedDate);
    const toDateString = toSelectedDateObject.toDateString();
    const [toSelectedMonth, , toSelectedYear] = toDateString.split(' ').slice(1, 4);
    const toMonthNumber = monthAbbreviations[toSelectedMonth];

    if (selectedYear && toSelectedYear) {
      filtered = filtered.filter((item) => ((item.Year >= Number(selectedYear)) && (item.Year <= Number(toSelectedYear))));
    }

    if (monthNumber) {
      filtered = filtered.filter((item) => ((item.Month >= Number(monthNumber)) && (item.Month <= Number(toMonthNumber))));
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
      Header: () => (
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={MerchantImage}
            alt="Merchant Logo"
            style={{ marginRight: '0.5rem', width: '24px', height: '24px' }}
          />
          <span>Merchant Name</span>
        </Box>
      ),
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
          {merchant.map((merchantName) => (
            <MenuItem key={merchantName} value={merchantName}>
              {merchantName}
            </MenuItem>
          ))}
        </Select>
      )
    },
    {
      Header: 'Report File',
      accessor: 'file',
      Cell: ({ row }) => (
        <ReportFileCell value={row.original.file} row={row} isEditable={editableRows.has(row.id)} />
      )
    },
    {
      Header: () => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={NoteImage}
            alt="Note Logo"
            style={{ marginRight: '0.5rem', width: '24px', height: '24px' }}
          />
          <span>Notes</span>
        </div>
      ),
      accessor: 'notes',
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
        </Box>
      )
    },
    {
      Header: () => (
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={StatusImage}
            alt="Status Logo"
            style={{ marginRight: '0.5rem', width: '24px', height: '24px' }}
          />
          <span>Status</span>
        </Box>
      ),
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
      )
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
          style={{
            color: "#008b78",
          }}
          disabled={!editableRows.has(row.id)}
        />
      )
    },
    {
      Header: 'Edit/Save',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            setEditableRows((prevRows) => {
              const newRows = new Set(prevRows);
              newRows.has(row.id) ? newRows.delete(row.id) : newRows.add(row.id);
              return newRows;
            });
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setEditableRows((prevRows) => {
                const newRows = new Set(prevRows);
                newRows.has(row.id) ? newRows.delete(row.id) : newRows.add(row.id);
                return newRows;
              });
            }
          }}
          style={{
            cursor: 'pointer',
            marginLeft: '1.15rem'
          }}
        >
          {editableRows.has(row.id) ? (
            <SaveButton onClick={() => handleSaveClick(row.id)} />
          ) : (
            <EditButton />
          )}
        </div>
      )
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
          selectedTypes={merchant}
          placeholder={'Choose merchant name'}
          value={selectedMerchantName}
          onChange={handleMerchantDropdownChange}
          wrapperClassName="w-full"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            sx={{ width: "21%", color: "#0B3782" }}
            views={['year', 'month']}
            label="From Date"
            inputFormat="MM/YYYY"
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <span style={{ borderBottom: '2px solid grey', width: '11px', display: 'inline-block' }}></span>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            sx={{ width: "21%", color: "#0B3782" }}
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
            <Alert severity="success" onClose={handleCloseAlert} sx={{ width: '100%', maxWidth: '600px', backgroundColor: "#fff" }}>
              {alertMessage}
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PopularCard;