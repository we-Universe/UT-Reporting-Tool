import React, { useMemo, useState, useEffect } from 'react';
import { Grid, Typography, Button, Checkbox, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import DropdownList from 'ui-component/extended/DropdownList';
import { selectedTypes, reportTypes } from 'store/typesData';
import CurrentDatePicker from 'ui-component/extended/CurrentDatePicker';
import Note from 'ui-component/extended/Note';
import FileUpload from 'ui-component/extended/FileUpload';
import UploadFile from 'assets/images/icons/report.png';
import ImiFile from 'assets/images/icons/imi.svg';
import RefundFile from 'assets/images/icons/refundfile.png';
import DifferenciesFile from 'assets/images/icons/testing.png';
import MWFile from 'assets/images/icons/media-world.png';
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
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await fetch(`https://localhost:7071/api/Reports/GetReportsByOperatorReport`);

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

  useEffect(() => {
    fetchReports();
  }, []);

  let rowData;

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

  rowData = data.find((item) => item.id === Number(id)) || {};

  const [approved, setApproved] = useState(rowData ? (rowData.approved == 1) ? true : false : false);
  const [selectedTelecom, setSelectedTelecom] = useState(rowData ? rowData.telecomName : '');
  const [selectedReport, setSelectedReport] = useState(rowData ? rowData.type : '');
  const [telecomError, setTelecomError] = useState("");
  const [reportError, setReportError] = useState("");
  const [reportFile, setReportFile] = useState(rowData ? rowData.file : null);
  const [imiReportFile, setImiReportFile] = useState(rowData ? rowData.file : null);
  const [diffrenciesReportFile, setDiffrenciesReportFile] = useState(rowData ? rowData.file : null);
  const [mwReportFile, setMwReportFile] = useState(rowData ? rowData.file : null);
  const [refundReportFile, setRefundReportFile] = useState(rowData ? rowData.file : null);
  const [reportFileError, setReportFileError] = useState("");
  const [selectedDateState, setSelectedDateState] = useState(new Date());
  const [flag, setFlag] = useState(false);
  const [imiFlag, setImiFlag] = useState(false);
  const [refundFlag, setRefundFlag] = useState(false);
  const [differenciesFlag, setDifferenciesFlag] = useState(false);
  const [mwFlag, setMwFlag] = useState(false);

  const handleDateChange = (dateInfo) => {
    setSelectedDateState(dateInfo);
  };

  const handleCheckboxChange = (event) => {
    setApproved(event.target.checked);
  };

  const handleFileUpload = (file) => {
    setReportFileError("");
    setReportFile(file);
  };

  const handleImiFileUpload = (file) => {
    setImiReportFile(file);
  };

  const handleMwFileUpload = (file) => {
    setMwReportFile(file);
  };

  const handleRefundFileUpload = (file) => {
    setRefundReportFile(file);
  };

  const handleDiffrenciesFileUpload = (file) => {
    setDiffrenciesReportFile(file);
  };

  const handleTelecomDropdownChange = (value) => {
    setTelecomError("");
    setSelectedTelecom(value);
  };

  const handleReportDropdownChange = (value) => {
    setReportError("");
    setSelectedReport(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;
    const dateString = selectedDateState.toISOString().split('T')[0];
    const [year, month] = dateString.split('-').map(Number);
    console.log('jjjj', reportFile, selectedReport, approved, selectedTelecom, year, month, imiReportFile, diffrenciesReportFile, mwReportFile, refundReportFile);

    if (!selectedTelecom) {
      setTelecomError("Please select a telecom name");
      hasError = true;
    } else {
      setTelecomError("");
    }

    if (!selectedReport) {
      setReportError("Please select a report type");
      hasError = true;
    } else {
      setReportError("");
    }

    if (reportFile == null) {
      setReportFileError("Please select a report file");
      hasError = true;
    } else {
      setReportFileError("");
    }

    if (!hasError) {
      setSelectedTelecom('');
      setSelectedReport('');
      setReportFile(null);
      setApproved(false);
      setFlag(true);
      setImiFlag(true);
      setRefundFlag(true);
      setMwFlag(true);
      setDifferenciesFlag(true);
      setTimeout(() => {
        setFlag(false);
        setImiFlag(false);
        setRefundFlag(false);
        setMwFlag(false);
        setDifferenciesFlag(false);
      }, 200);
    }
  };

  return (
    <MainCard title="Upload Reports">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard>
            <Grid container spacing={gridSpacing}>

              {/* Telecom Name */}
              <FormSection title="Telecom Name">
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {telecomError && (
                    <Box
                      sx={{
                        color: '#d32f2f',
                        fontSize: '0.78rem',
                        marginBottom: '8px'
                      }}
                    >
                      {telecomError}
                    </Box>
                  )}
                  <Box sx={{ width: "fit-content" }}>
                    <DropdownList
                      selectedTypes={selectedTypes}
                      placeholder={'Choose telecom name'}
                      value={(rowData.length>0) ? rowData.telecomName : selectedTelecom}
                      onChange={handleTelecomDropdownChange}
                    />
                  </Box>
                </Box>
              </FormSection>

              {/* Report File */}
              <FormSection title="Report File">
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {reportFileError && (
                    <Box
                      sx={{
                        color: '#d32f2f',
                        fontSize: '0.78rem',
                        marginBottom: '8px'
                      }}
                    >
                      {reportFileError}
                    </Box>
                  )}
                  <Box sx={{ width: "fit-content" }}>
                    <FileUpload image={UploadFile} allowedExtensions={['xlsx']} onUpload={handleFileUpload} flag={flag} />
                  </Box>
                </Box>
              </FormSection>

              {/* Report Type */}
              <FormSection title="Report Type">
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {reportError && (
                    <Box
                      sx={{
                        color: '#d32f2f',
                        fontSize: '0.78rem',
                        marginBottom: '8px'
                      }}
                    >
                      {reportError}
                    </Box>
                  )}
                  <Box sx={{ width: "fit-content" }}>
                    <DropdownList
                      selectedTypes={reportTypes}
                      placeholder={'Choose report type'}
                      value={(rowData.length>0) ? rowData.type : selectedReport}
                      onChange={handleReportDropdownChange}
                    />
                  </Box>
                </Box>
              </FormSection>

              {/* IMI File */}
              <FormSection title="IMI File">
                <FileUpload image={ImiFile} allowedExtensions={['xlsx']} onUpload={handleImiFileUpload} flag={imiFlag} />
              </FormSection>

              {/* Date */}
              {id == ":id" &&
                <FormSection title="Date">
                  <CurrentDatePicker onDateChange={handleDateChange} />
                </FormSection>
              }

              {/* Refund File */}
              <FormSection title="Refund File">
                <FileUpload image={RefundFile} allowedExtensions={['xlsx']} onUpload={handleRefundFileUpload} flag={refundFlag} />
              </FormSection>

              {/* Differencies File */}
              <FormSection title="Differencies File">
                <FileUpload image={DifferenciesFile} allowedExtensions={['xlsx']} onUpload={handleDiffrenciesFileUpload} flag={differenciesFlag} />
              </FormSection>

              {/* MW File */}
              <FormSection title="MW File">
                <FileUpload image={MWFile} allowedExtensions={['xlsx']} onUpload={handleMwFileUpload} flag={mwFlag} />
              </FormSection>

              {/* Approved */}
              <FormSection title="Approved">
                <Checkbox
                  style={{ color: "#008b78", paddingLeft: "0" }}
                  checked={approved}
                  onChange={handleCheckboxChange}
                />
              </FormSection>

              {/* Notes */}
              <FormSection title="Notes*">
                <Note value={rowData ? rowData.notes : ''} />
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
                  onClick={onSubmit}
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