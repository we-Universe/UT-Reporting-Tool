// material-ui
import { Grid, Typography, Button } from '@mui/material';

// project imports
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

// ==============================|| FORM SECTION ||============================== //
const FormSection = ({ title, children }) => (
  <Grid item xs={12} md={6}>
    <Typography sx={{ fontSize: "15px" }} gutterBottom>
      {title}
    </Typography>
    {children}
  </Grid>
);

// ==============================|| FORM ||============================== //

const Form = () => (
  <MainCard title="Upload Reports">
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard>
          <Grid container spacing={gridSpacing}>

            {/* Telecom Name */}
            <FormSection title="Telecom Name">
              <DropdownList selectedTypes={selectedTypes} placeholder={'Choose telecom name'} />
            </FormSection>
            <FormSection title="Report File">
              {/* <FileUpload image={UploadFile} /> */}
              <FileUpload image={UploadFile} allowedExtensions={['xlsx']} />
            </FormSection>


            {/* Report Type */}
            <FormSection title="Report Type">
              <DropdownList selectedTypes={reportTypes} placeholder={'Choose report type'} />
            </FormSection>

            {/* Other Files */}
            <FormSection title="IMI File">
              {/* <FileUpload image={ImiFile} /> */}
              <FileUpload image={ImiFile} allowedExtensions={['pdf']} />
            </FormSection>

            {/* Date */}
            <FormSection title="Date">
              <CurrentDatePicker />
            </FormSection>

            <FormSection title="Refund File">
              {/* <FileUpload image={RefundFile} /> */}
              <FileUpload image={RefundFile} allowedExtensions={['pdf']} />
            </FormSection>

            {/* Notes */}
            <FormSection title="Notes*">
              <NoteButton />
            </FormSection>

            <Grid item xs={12} sm={6} md={4} lg={12}>
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
                  Save Report
                </Button>
              </FormSection>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  </MainCard>
);

export default Form;