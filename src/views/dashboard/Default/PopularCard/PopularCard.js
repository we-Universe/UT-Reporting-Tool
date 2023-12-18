import React, { useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTable } from 'react-table';
import styles from "./PopularCard.module.css";

// material-ui
import { Grid, Checkbox, TextField, IconButton, Alert, AlertTitle, Link, Typography, Box, Select, MenuItem, Button, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import SubCard from '../../../../ui-component/cards/SubCard';
import MainCard from '../../../../ui-component/cards/MainCard';
import logo from 'assets/images/icons/excel.png';
import DropdownList from '../../../../ui-component/extended/DropdownList';
import { reportTypes } from '../../../../store/typesData';

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
    <Box sx={{ display: 'flex', gap: '-10px' }}>
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewAll, setViewAll] = useState(false);

  const data = useMemo(() => [
    { id: 1, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1Default Notes 1Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 2, type: 'PUSH', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 2', approved: 1, Month: 12, Year: 2023 },
    { id: 3, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 4, type: 'PUSH', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 5, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 6, type: 'PUSH', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 7, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 8, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 9, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 10, type: 'RBT', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 11, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 12, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 13, type: 'PULL', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 14, type: 'RBT', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 15, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 16, type: 'PULL', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 17, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
    { id: 18, type: 'PUSH', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023 },
  ], []);

  const filteredData = useMemo(() => {
    let filtered = data;

    if (selectedReportType) {
      filtered = filtered.filter((item) => item.type.toLowerCase() === selectedReportType.toLowerCase());
    }

    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedYear = selectedDate.getFullYear();
    if (selectedYear) {
      filtered = filtered.filter((item) => item.Year === selectedYear);
    }

    if (selectedMonth) {
      filtered = filtered.filter((item) => item.Month === selectedMonth);
    }

    return viewAll ? filtered : filtered.slice(0, 15);
  }, [data, selectedReportType, selectedDate, viewAll]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDropdownChange = (value) => {
    setSelectedReportType(value);
  };

  const handleSaveClick = (rowId) => {
    if (editableRows.has(rowId)) {
      setAlertMessage(`Changes saved successfully for row ${Number(rowId) + 1}`);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const columns = useMemo(() => [
    {
      Header: 'Report Type',
      accessor: 'type',
      Cell: ({ row }) => (
        <Select
          value={editedValues[row.id]?.type ?? row.original.type}
          onChange={(e) => {
            setEditedValues((prev) => ({ ...prev, [row.id]: { ...prev[row.id], type: e.target.value } }));
          }}
          sx={{ color: "#0B3782", "& fieldset": { border: 'none' } }}
          disabled={!editableRows.has(row.id)}
        >
          {reportTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
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
          {editableRows.has(row.id) ? <SaveIcon onClick={() => handleSaveClick(row.id)} /> : <EditIcon />}
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
    <div>
      {showAlert && (
        <Alert severity="success" onClose={handleCloseAlert}>
          <AlertTitle>Success</AlertTitle>
          {alertMessage}
        </Alert>
      )}
      <MainCard title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Reports History</span>
        <DatePicker
          className={styles.datePickerWrapper}
          dateFormat="MM yyyy"
          showMonthYearPicker
          onChange={handleDateChange}
          placeholderText="Choose a date"
          showIcon
        />
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
                  {viewAll ? 'Show Less' : 'View All'}
                  <ChevronRightOutlinedIcon />
                </Button>
              </CardActions>
            </SubCard>
          </Grid>
        </Grid>
      </MainCard>
    </div>
  );
};

export default PopularCard;