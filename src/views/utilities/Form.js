// material-ui
import { Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import DropdownList from 'ui-component/extended/DropdownList';
import { selectedTypes, reportTypes } from 'store/typesData';
import CurrentDatePicker from 'ui-component/extended/CurrentDatePicker';
import NoteButton from 'ui-component/extended/NoteButton';
import FileUpload from 'ui-component/extended/FileUpload';

// ==============================|| FORM SECTION ||============================== //

const FormSection = ({ title, children }) => (
  <Grid item xs={12} md={6}>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    {children}
  </Grid>
);

// ==============================|| FORM ||============================== //

const Form = () => (
  <MainCard title="Upload Reports">
    <Grid container spacing={gridSpacing}>
      {/* Telecom Name */}
      <FormSection title="Telecom Name">
        <DropdownList selectedTypes={selectedTypes} placeholder={'Choose telecom name'} />
      </FormSection>

      <FormSection title="IMI File">
        <FileUpload />
      </FormSection>

      {/* Report Type */}
      <FormSection title="Report Type">
        <DropdownList selectedTypes={reportTypes} placeholder={'Choose report type'} />
      </FormSection>

      {/* Other Files */}
      <FormSection title="Report File">
        <FileUpload />
      </FormSection>

            {/* Date */}
            <FormSection title="Date">
        <CurrentDatePicker />
      </FormSection>

      <FormSection title="Refund File">
        <FileUpload />
      </FormSection>

      {/* Notes */}
      <FormSection title="Notes*">
        <NoteButton />
      </FormSection>
    </Grid>
  </MainCard>
);

export default Form;