import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useTable } from 'react-table';

// material-ui
import { Grid, Checkbox, TextField, Box, Button, CardActions, Select, MenuItem } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

// project imports
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import DropdownList from '../../ui-component/extended/DropdownList';
import { selectedTypes } from '../../store/typesData';
import EditButton from '../../ui-component/EditButton/EditButton';
import TelecomImage from '../../assets/images/icons/telecommunication.png';
import NoteImage from '../../assets/images/icons/pencil.png';
import StatusImage from '../../assets/images/icons/check-list.png';

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
  Dec: 12
};

const Operator = () => {
  const [editedValues, setEditedValues] = useState({});
  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [toSelectedDate, setToSelectedDate] = useState(new Date());
  const [viewAll, setViewAll] = useState(false);
  const [selectedTelecomName, setSelectedTelecomName] = useState('');
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [reportTypes, setReportTypes] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await fetch(`https://localhost:7071/api/Reports/GetReportByOperatorReport`);

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

  useEffect(() => {
    fetchReports();
    fetchReportTypes();
  }, []);

  const handleEditClick = (rowId) => {
    navigate(`/utils/util-UploadReports/${rowId}`);
  };

  const data = useMemo(() => reports.map((report) => ({
    id: report.id,
    type: report.type,
    file: report.file,
    notes: report.notes.map(note => note.content).join('\n'),
    approved: report.approved,
    Month: report.month,
    Year: report.year,
    telecomName: report.telecomName,
    status: report.status,
  })), [reports]);

  const filteredData = useMemo(() => {
    let filtered = data;

    if (selectedReportType) {
      filtered = filtered.filter((item) => item.type.toLowerCase() === selectedReportType.toLowerCase());
    }

    if (selectedTelecomName) {
      filtered = filtered.filter((item) => item.telecomName.toLowerCase() === selectedTelecomName.toLowerCase());
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
  }, [data, selectedReportType, selectedTelecomName, selectedDate, toSelectedDate, viewAll]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleToDateChange = (date) => {
    setToSelectedDate(date);
  };

  const handleDropdownChange = (value) => {
    setSelectedReportType(value);
  };

  const handleTelecomDropdownChange = (value) => {
    setSelectedTelecomName(value);
  };

  const generateDefaultReportFileName = (telecomName, reportType, month, year) => {
    return `${telecomName}_${reportType}_${month}_${year}`;
  };

  const columns = useMemo(() => [
    {
      Header: () => (
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={TelecomImage}
            alt="Telecom Logo"
            style={{ marginRight: '0.5rem', width: '24px', height: '24px' }}
          />
          <span>Telecom Name</span>
        </Box>
      ),
      accessor: 'telecomName',
      Cell: ({ row }) => (
        <Select
          value={row.original.telecomName}
          sx={{ color: "#0B3782", "& fieldset": { border: 'none' } }}
          disabled
        >
          {selectedTypes.map((telecomName) => (
            <MenuItem key={telecomName} value={telecomName}>
              {telecomName}
            </MenuItem>
          ))}
        </Select>
      )
    },
    {
      Header: 'Report File Name',
      accessor: 'reportfilename',
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            defaultValue={generateDefaultReportFileName(row.original.telecomName, row.original.type, row.original.Month, row.original.Year)}
            sx={{ color: "#0B3782", "& fieldset": { border: 'none' } }}
            multiline
            InputProps={{
              readOnly: true,
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
            defaultValue={row.original.notes}
            sx={{ color: "#0B3782", "& fieldset": { border: 'none' } }}
            multiline
            InputProps={{
              readOnly: true,
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
            readOnly: true,
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
          style={{
            color: "#008b78"
          }}
          disabled
        />
      )
    },
    {
      Header: 'Edit',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div
          style={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <EditButton onClick={() => {
            handleEditClick(row.original.id);
          }} />
        </div>
      )
    }
  ], [editedValues]);

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
          selectedTypes={selectedTypes}
          placeholder={'Choose telecom name'}
          value={selectedTelecomName}
          onChange={handleTelecomDropdownChange}
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
    </Box>
  );
};

export default Operator;