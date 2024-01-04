import React, { useMemo, useState, useEffect } from 'react';
import { Grid, Typography, Button, Checkbox, Box, Alert } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import DropdownList from 'ui-component/extended/DropdownList';
import { selectedTypes } from 'store/typesData';
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
import axios from 'axios';
import StatusImage from 'assets/images/icons/filedownload.gif';

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
  const [reportTypes, setReportTypes] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await fetch(`https://localhost:7071/api/Reports/GetReportsByOperatorReport`);

      if (!response.ok) {
        console.error('Failed to fetch reports. HTTP Status:', response.status);
        return;
      }

      const data = await response.json();
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

  let rowData;

  const data = useMemo(() => reports.map((report) => ({
    id: report.id,
    type: report.type,
    file: report.file,
    mwFile: report.mwFile,
    refundFile: report.refundFile,
    differenciesFile: report.differenciesFile,
    imiFile: report.imiFile,
    notes: report.notes,
    approved: report.approved,
    Month: report.month,
    Year: report.year,
    telecomName: report.telecomName,
    status: report.status,
  })), [reports]);

  rowData = data.find((item) => item.id === Number(id)) || {};
  const [approved, setApproved] = useState(false);
  const [selectedTelecom, setSelectedTelecom] = useState('');
  const [selectedReport, setSelectedReport] = useState('');
  const [telecomError, setTelecomError] = useState("");
  const [reportError, setReportError] = useState("");
  const [reportFile, setReportFile] = useState(null);
  const [imiReportFile, setImiReportFile] = useState(null);
  const [diffrenciesReportFile, setDiffrenciesReportFile] = useState(null);
  const [mwReportFile, setMwReportFile] = useState(null);
  const [refundReportFile, setRefundReportFile] = useState(null);
  const [reportFileError, setReportFileError] = useState("");
  const [selectedDateState, setSelectedDateState] = useState(new Date());
  const [flag, setFlag] = useState(false);
  const [imiFlag, setImiFlag] = useState(false);
  const [refundFlag, setRefundFlag] = useState(false);
  const [differenciesFlag, setDifferenciesFlag] = useState(false);
  const [mwFlag, setMwFlag] = useState(false);
  let year = '', month = '';
  const [fileName, setFileName] = useState("");
  const [imiFileName, setImiFileName] = useState("");
  const [diffrenciesFileName, setDiffrenciesFileName] = useState("");
  const [refundFileName, setRefundFileName] = useState("");
  const [mwFileName, setMwFileName] = useState("");
  const [notes, setNotes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showAddAlert, setShowAddAlert] = useState(false);

  const handleNoteChange = (newNotes) => {
    setNotes(newNotes);
  };

  const handleDateChange = (dateInfo) => {
    setSelectedDateState(dateInfo);
  };

  const handleCheckboxChange = (event) => {
    setApproved(event.target.checked);
  };

  const handleFileUpload = (file) => {
    setReportFileError("");
    setFileName("");
    setReportFile(file);
    console.log('gggg', file)
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


  useEffect(() => {
    if (Object.keys(rowData).length > 0) {
      setSelectedTelecom(rowData.telecomName);
      setSelectedReport(rowData.type);
      setNotes(rowData.notes);
      handleFileUpload(rowData.file);
      handleImiFileUpload(rowData.imiFile);
      handleDiffrenciesFileUpload(rowData.differenciesFile);
      handleMwFileUpload(rowData.mwFile);
      handleRefundFileUpload(rowData.refundFile);
      if (rowData.approved >= 6) {
        setApproved(true);
      }
      if (id != ":id") {
        setImiFileName(`ImiFile_${rowData.telecomName}_${rowData.type}_${rowData.Month}_${rowData.Year}.xlsx`);
        setDiffrenciesFileName(`DiffrenciesFile_${rowData.telecomName}_${rowData.type}_${rowData.Month}_${rowData.Year}.xlsx`);
        setRefundFileName(`RefundFile_${rowData.telecomName}_${rowData.type}_${rowData.Month}_${rowData.Year}.xlsx`);
        setMwFileName(`MwFile_${rowData.telecomName}_${rowData.type}_${rowData.Month}_${rowData.Year}.xlsx`);
        setFileName(`ReportFile_${rowData.telecomName}_${rowData.type}_${rowData.Month}_${rowData.Year}.xlsx`);
      }
    }
  }, [rowData]);

  const getReportTypeId = async (reportTypeName) => {
    try {
      const response = await axios.get(`https://localhost:7071/api/ReportsTypes/GetReportTypeIdFromName?name=${reportTypeName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching report type ID:', error);
      throw error;
    }
  };

  const getOperatorId = async (operatorName) => {
    try {
      const response = await axios.get(`https://localhost:7071/api/Operator/GetOperatorIdByCompanyName?name=${operatorName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Operator ID:', error);
      throw error;
    }
  };

  const fileToArrayBytes = async (file) => {
    return new Promise((resolve) => {
      if (!file) {
        resolve(null);
      } else {
        const reader = new FileReader();
  
        reader.onload = () => {
          const base64String = btoa(
            String.fromCharCode.apply(null, new Uint8Array(reader.result))
          );
          resolve(base64String);
        };
  
        reader.readAsArrayBuffer(file);
      }
    });
  };  

  const onSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;
    const dateString = selectedDateState.toISOString().split('T')[0];
    [year, month] = dateString.split('-').map(Number);

    if (!selectedTelecom && (id == ":id")) {
      setTelecomError("Please select a telecom name");
      hasError = true;
    } else {
      setTelecomError("");
    }

    if (!selectedReport && (id == ":id")) {
      setReportError("Please select a report type");
      hasError = true;
    } else {
      setReportError("");
    }

    if (reportFile == null && (id == ":id")) {
      setReportFileError("Please select a report file");
      hasError = true;
    }
    else {
      setReportFileError("");
    }

    if (!hasError) {
      if (id == ":id") {
        try {
          const reportTypeId = await getReportTypeId(selectedReport);
          const operatorId = await getOperatorId(selectedTelecom);
          const reportFileBase64 = await fileToArrayBytes(reportFile);
          const differencesFileBase64 = await fileToArrayBytes(diffrenciesReportFile);
          const imiFileBase64 = await fileToArrayBytes(imiReportFile);
          const mwFileBase64 = await fileToArrayBytes(mwReportFile);
          const refundFileBase64 = await fileToArrayBytes(refundReportFile);
          const response = await axios.post('https://localhost:7071/api/Reports/AddReport', {
            "reportTypeId": reportTypeId,
            "lastModified": new Date().toISOString(),
            "approvalStatusID": 1,
            "month": month,
            "year": year,
            "reportFile": reportFileBase64,
            "operatorId": operatorId,
            "imiFile": imiFileBase64,
            "differencesFile": differencesFileBase64,
            "mwFile": mwFileBase64,
            "refundFile": refundFileBase64,
            "Notes": notes
          });

          console.log('API Response:', response.data);
        } catch (error) {
          console.error('Error submitting report:', error);
        }
        setSelectedTelecom('');
        setSelectedReport('');
        setReportFile(null);
        setApproved(false);
        setFlag(true);
        setNotes([]);
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
        setShowAddAlert(true);
        setTimeout(() => {
          setShowAddAlert(false);
        }, 2000);
      }
      else {
        try {
          const reportTypeId = await getReportTypeId(selectedReport);
          const operatorId = await getOperatorId(selectedTelecom);
          let reportFileBase64 = await fileToArrayBytes(reportFile);
          let imiFileBase64 = await fileToArrayBytes(imiReportFile);
          let differencesFileBase64 = await fileToArrayBytes(diffrenciesReportFile);
          let mwFileBase64 = await fileToArrayBytes(mwReportFile);
          let refundFileBase64 = await fileToArrayBytes(refundReportFile);
          let newNotes = notes;
          const existingNotes = notes.map((note) => note.content);
          newNotes = notes.filter((note) => !existingNotes.includes(note.content));
          const apiUrl = `https://localhost:7071/api/Reports/EditReport?id=${id}`;
          const response = await axios.put(apiUrl, {
            "id": id,
            "reportTypeId": reportTypeId,
            "lastModified": new Date().toISOString(),
            "approvalStatusID": approved ? 5 : 4,
            "month": month,
            "year": year,
            "reportFile": reportFileBase64,
            "operatorId": operatorId,
            "imiFile": imiFileBase64,
            "differencesFile": differencesFileBase64,
            "mwFile": mwFileBase64,
            "refundFile": refundFileBase64,
            "Notes": newNotes
          });
          console.log('API Response:', response.data);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
        } catch (error) {
          console.error('Error submitting report:', error);
        }
      }
    }
  };

  const handleDownload = (reportFile) => {
    const blob = new Blob([reportFile], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'file.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
                      value={(Object.keys(rowData).length > 0) ? rowData.telecomName : selectedTelecom}
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
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <FileUpload
                      image={UploadFile}
                      allowedExtensions={['xlsx']}
                      onUpload={handleFileUpload}
                      flag={flag}
                      reportFileName={fileName}
                    />
                    {id !== ":id" && (
                      <button onClick={() => handleDownload(reportFile)} style={{ border: 'none', padding: 0, margin: 0, background: 'none' }}>
                        <img src={StatusImage} alt="Download File" style={{ width: 'auto', height: 'auto' }} />
                      </button>
                    )}
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
                      value={(Object.keys(rowData).length > 0) ? rowData.type : selectedReport}
                      onChange={handleReportDropdownChange}
                    />
                  </Box>
                </Box>
              </FormSection>

              {/* IMI File */}
              <FormSection title="IMI File">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FileUpload image={ImiFile} allowedExtensions={['xlsx']} onUpload={handleImiFileUpload} flag={imiFlag} reportFileName={imiFileName} />
                  {id !== ":id" && (
                    <button onClick={() => handleDownload(imiReportFile)} style={{ border: 'none', padding: 0, margin: 0, background: 'none' }}>
                      <img src={StatusImage} alt="Download File" style={{ width: 'auto', height: 'auto' }} />
                    </button>
                  )}
                </Box>
              </FormSection>

              {/* Date */}
              {id == ":id" &&
                <FormSection title="Date">
                  <CurrentDatePicker onDateChange={handleDateChange} />
                </FormSection>
              }

              {/* Refund File */}
              <FormSection title="Refund File">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FileUpload image={RefundFile} allowedExtensions={['xlsx']} onUpload={handleRefundFileUpload} flag={refundFlag} reportFileName={refundFileName} />
                  {id !== ":id" && (
                    <button onClick={() => handleDownload(refundReportFile)} style={{ border: 'none', padding: 0, margin: 0, background: 'none' }}>
                      <img src={StatusImage} alt="Download File" style={{ width: 'auto', height: 'auto' }} />
                    </button>
                  )}
                </Box>
              </FormSection>

              {/* Differencies File */}
              <FormSection title="Differencies File">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FileUpload image={DifferenciesFile} allowedExtensions={['xlsx']} onUpload={handleDiffrenciesFileUpload} flag={differenciesFlag} reportFileName={diffrenciesFileName} />
                  {id !== ":id" && (
                    <button onClick={() => handleDownload(differenciesReportFile)} style={{ border: 'none', padding: 0, margin: 0, background: 'none' }}>
                      <img src={StatusImage} alt="Download File" style={{ width: 'auto', height: 'auto' }} />
                    </button>
                  )}
                </Box>
              </FormSection>

              {/* MW File */}
              <FormSection title="MW File">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FileUpload image={MWFile} allowedExtensions={['xlsx']} onUpload={handleMwFileUpload} flag={mwFlag} reportFileName={mwFileName} />
                  {id !== ":id" && (
                    <button onClick={() => handleDownload(mwReportFile)} style={{ border: 'none', padding: 0, margin: 0, background: 'none' }}>
                      <img src={StatusImage} alt="Download File" style={{ width: 'auto', height: 'auto' }} />
                    </button>
                  )}
                </Box>
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
                <Note notes={notes} onChange={handleNoteChange} />
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
            {showAlert && (
            <Alert severity="success" sx={{ width: '100%', maxWidth: '600px', backgroundColor: "#fff" }}>
              Data is updated successfully
            </Alert>
          )}
           {showAddAlert && (
            <Alert severity="success" sx={{ width: '100%', maxWidth: '600px', backgroundColor: "#fff" }}>
              Data is added successfully
            </Alert>
          )}
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Form;