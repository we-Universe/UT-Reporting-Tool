import React, { useMemo, useState } from 'react';
import { Grid, Typography, Button, Checkbox } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import DropdownList from 'ui-component/extended/DropdownList';
import { selectedTypes, reportTypes } from 'store/typesData';
import CurrentDatePicker from 'ui-component/extended/CurrentDatePicker';
import NoteButton from 'ui-component/extended/NoteButton';
import FileUpload from 'ui-component/extended/FileUpload';
import UploadFile from 'assets/images/icons/doc.png';
import ImiFile from 'assets/images/icons/imi.svg';
import RefundFile from 'assets/images/icons/refundfile.png';
import SubCard from 'ui-component/cards/SubCard';
import { useParams } from 'react-router-dom';

const FormSection = ({ title, children }) => (
  <Grid item xs={12} md={6}>
    <Typography sx={{ fontSize: "15px" }} gutterBottom>
      {title}
    </Typography>
    {children}
  </Grid>
);

const Form = () => {
  const { id } = useParams();

  let rowData;
  const data = useMemo(() => [
    { id: 1, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1Default Notes 1Default Notes 1', approved: 1, Month: 12, Year: 2023, telecomName: "Jawwal", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 2, type: 'PUSH', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 2\nDefault Notes\nDefault Notes', approved: 1, Month: 12, Year: 2023, telecomName: "Jawwal", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 3, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, telecomName: "Jawwal", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 4, type: 'PUSH', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 2, Year: 2023, telecomName: "Ooredoo", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 5, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, telecomName: "Ooredoo", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 6, type: 'PUSH', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, telecomName: "Jawwal", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 7, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, telecomName: "Ooredoo", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 8, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, telecomName: "Ooredoo", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 9, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, telecomName: "Jawwal", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 10, type: 'RBT', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, telecomName: "Ooredoo", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 11, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, telecomName: "Ooredoo", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 12, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 9, Year: 2023, telecomName: "Jawwal", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 13, type: 'PULL', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, telecomName: "Ooredoo", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 14, type: 'RBT', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, telecomName: "Ooredoo", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 15, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 10, Year: 2023, telecomName: "Jawwal", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 16, type: 'PULL', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, telecomName: "Jawwal", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 17, type: 'DCB', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, telecomName: "Ooredoo", status: "eeee", lastModified: "2023-12-1T5:30:00" },
    { id: 18, type: 'PUSH', file: '/Users/mayar/desktop/SimpleSpreadsheet.xlsx', notes: 'Default Notes 1', approved: 1, Month: 12, Year: 2023, telecomName: "Ooredoo", status: "eeee", lastModified: "2023-12-1T5:30:00" }
  ], []);

  rowData = data.find((item) => item.id === Number(id)) || {};
  const [approved, setApproved] = useState(rowData ? rowData.approved : false);

  //let date = rowData.lastModified;

  return (
    <MainCard title="Upload Reports">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard>
            <Grid container spacing={gridSpacing}>

              {/* Telecom Name */}
              <FormSection title="Telecom Name">
                <DropdownList
                  selectedTypes={selectedTypes}
                  placeholder={'Choose telecom name'}
                  value={rowData ? rowData.telecomName : ''}
                />
              </FormSection>

              {/* Report File */}
              <FormSection title="Report File">
                <FileUpload image={UploadFile} allowedExtensions={['xlsx']} />
              </FormSection>

              {/* Report Type */}
              <FormSection title="Report Type">
                <DropdownList selectedTypes={reportTypes} placeholder={'Choose report type'} value={rowData ? rowData.type : ''} />
              </FormSection>

              {/* IMI File */}
              <FormSection title="IMI File">
                <FileUpload image={ImiFile} allowedExtensions={['xlsx']} />
              </FormSection>

              {/* Date */}
              <FormSection title="Date">
                <CurrentDatePicker />
              </FormSection>

              {/* Refund File */}
              <FormSection title="Refund File">
                <FileUpload image={RefundFile} allowedExtensions={['xlsx']} />
              </FormSection>

              {/* Notes */}
              <FormSection title="Notes*">
                <NoteButton value={rowData ? rowData.notes : ''} />
              </FormSection>

              {/* Approved */}
              <FormSection title="Approved">
                <Checkbox
                  style={{ color: "#008b78", paddingLeft: "0" }}
                  checked={approved}
                  onChange={(e) => setApproved(e.target.checked)}
                />
              </FormSection>

              {/* Save Button */}
              <FormSection>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0B3782",
                    color: (theme) => theme.palette.secondary.light,
                    borderRadius: '8px',
                    height: '40px',
                    width: '150px',
                    '&:hover': {
                      backgroundColor: "#0B3782",
                    },
                  }}
                >
                  {id !== ":id" ? "Edit Report" : "Save Report"}
                </Button>
              </FormSection>
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Form;