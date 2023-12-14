import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';

import { Grid, Checkbox, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save'; // Import SaveIcon

import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';

const PopularCard = () => {
  const [editableRows, setEditableRows] = useState(new Set());

  const data = useMemo(
    () => [
      { id: 1, type: 'Default Text Default Text Default Text Default Text Default Text Default Text', file: 'Default File 1', notes: 'Default Notes 1', approved: true },
      { id: 2, type: 'Default Text 2', file: 'Default File 2', notes: 'Default Notes 2', approved: false },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Report Type',
        accessor: 'type',
        Cell: ({ row }) => (
          <TextField
            defaultValue={row.original.type}
            sx={{ color: "#0B3782", "& fieldset": { border: editableRows.has(row.id) ? '1px solid #ddd' : 'none' } }}
            multiline
            InputProps={{
              readOnly: !editableRows.has(row.id),
            }}
          />
        ),
      },
      {
        Header: 'Report File',
        accessor: 'file',
        Cell: ({ row }) => (
          <TextField
            defaultValue={row.original.file}
            sx={{ color: "#0B3782", "& fieldset": { border: editableRows.has(row.id) ? '1px solid #ddd' : 'none' } }}
            InputProps={{
              readOnly: !editableRows.has(row.id),
            }}
          />
        ),
      },
      {
        Header: 'Notes',
        accessor: 'notes',
        Cell: ({ row }) => (
          <TextField
            defaultValue={row.original.notes}
            sx={{ color: "#0B3782", "& fieldset": { border: editableRows.has(row.id) ? '1px solid #ddd' : 'none' } }}
            multiline
            InputProps={{
              readOnly: !editableRows.has(row.id),
            }}
          />
        ),
      },
      {
        Header: 'Approved',
        accessor: 'approved',
        Cell: ({ row }) => (
          <Checkbox
            defaultChecked={row.original.approved}
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
            {editableRows.has(row.id) ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        ),
      }
    ],
    [editableRows]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <MainCard title="Reports History">
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
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default PopularCard;