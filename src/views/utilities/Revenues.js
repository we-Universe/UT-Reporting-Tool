import React, { useState, useRef } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Grid, TextField, Box, Button, CardActions, Alert, LinearProgress, Typography } from '@mui/material';
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import FileUpload from 'ui-component/extended/FileUpload';
import UploadFile from 'assets/images/icons/financial-reporting.png';
import StatusImage from 'assets/images/icons/icon_revenue.gif';
import RevenuesImage from 'assets/images/icons/revenues.gif';
import axios from 'axios';

const Revenues = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reportFile, setReportFile] = useState(null);
    const [reportFileName, setReportFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef(null);
    const [reportFileError, setReportFileError] = useState("");
    const [flag, setFlag] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleFileUpload = (file) => {
        setReportFileError("");
        setReportFile(file);
        setReportFileName("");
    };

    const simulateProgress = () => {
        timerRef.current = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 90) {
                    return prevProgress + 2;
                } else {
                    return Math.min(prevProgress + 1, 100);
                }
            });
        }, 1050);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        let hasError = false;
        if (reportFile == null) {
            setReportFileError("Please select a report file");
            hasError = true;
        }
        else {
            setReportFileError("");
        }
        if (!hasError) {
            try {
                setLoading(true);
                simulateProgress();

                const dateString = selectedDate.toISOString().split('T')[0];
                const [year, month] = dateString.split('-').map(Number);
                const formData = new FormData();
                formData.append('month', month);
                formData.append('year', year);
                formData.append('revenueFile', reportFile);

                const response = await axios.post('https://localhost:7071/api/Revenue/AddRevenue', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('API Response:', response.data);
                clearInterval(timerRef.current);
                setProgress(100);
                setSuccess(true);
                setReportFile(null);
                setTimeout(() => {
                    setSuccess(false);
                }, 2000);
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                clearInterval(timerRef.current);
                setLoading(false);
                setFlag(true);
                setTimeout(() => {
                    setFlag(false);
                }, 2000);
                setProgress(0);
            }
        }
    };

    const processingMessage = progress === 100
        ? 'Processing file is done. Please wait a few more seconds...'
        : `${progress}%`

    return (
        <Box>
            <MainCard>
                <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <img src={StatusImage} alt="User Status" style={{ marginRight: '8px', width: '34px', height: '34px' }} />
                    Calculate Revenues
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <SubCard>
                            <Grid container spacing={2} mt={1}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        sx={{ width: "100%", color: "#0B3782" }}
                                        views={['year', 'month']}
                                        label="Date"
                                        inputFormat="MM/YYYY"
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={6}>
                        <SubCard>
                            <Grid container spacing={2} mt={1}>
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
                                <Box sx={{ width: "100%" }}>
                                    <FileUpload
                                        image={UploadFile}
                                        allowedExtensions={['xlsx']}
                                        onUpload={handleFileUpload}
                                        reportFileName={reportFileName}
                                        flag={flag}
                                    />
                                </Box>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        {loading &&
                            <>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <img src={RevenuesImage} alt="User Status" style={{ marginRight: '0px', width: '24px', height: '24px' }} />
                                    <Typography variant="body2" ml={1}>{processingMessage}</Typography>
                                </Box>
                                <LinearProgress color="primary" value={progress} />
                            </>
                        }
                        {success && <Alert severity="success">Revenues calculated successfully!</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <CardActions sx={{ p: 1.25, pt: 2, justifyContent: 'center' }}>
                            <Button
                                size="small"
                                disableElevation
                                onClick={onSubmit}
                                sx={{
                                    border: '1px solid',
                                    borderRadius: '4px',
                                    color: (theme) => theme.palette.primary.main,
                                }}
                            >
                                Submit Report
                            </Button>
                        </CardActions>
                    </Grid>
                </Grid>
            </MainCard>
        </Box>
    );
};

export default Revenues;