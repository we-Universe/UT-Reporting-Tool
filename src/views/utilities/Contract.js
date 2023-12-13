import PropTypes from 'prop-types';

// material-ui
import { Box, Card, Grid, Typography, TextField } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import FileUpload from 'ui-component/extended/FileUpload';
import ContractFile from 'assets/images/icons/contractfile.png';
import NoteButton from 'ui-component/extended/NoteButton';
import CurrentDatePicker from 'ui-component/extended/CurrentDatePicker';

// ===============================|| COLOR BOX ||=============================== //

const ColorBox = ({ bgcolor, title, data, dark }) => (
  <>
    <Card sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4.5,
          bgcolor,
          color: dark ? 'grey.800' : '#ffffff'
        }}
      >
        {title && (
          <Typography variant="subtitle1" color="inherit">
            {title}
          </Typography>
        )}
        {!title && <Box sx={{ p: 1.15 }} />}
      </Box>
    </Card>
    {data && (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2">{data.label}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
            {data.color}
          </Typography>
        </Grid>
      </Grid>
    )}
  </>
);

ColorBox.propTypes = {
  bgcolor: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
  dark: PropTypes.bool
};

// ==============================|| FORM SECTION ||============================== //
const FormSection = ({ title, children }) => (
  <Grid item xs={12} md={6}>
    <Typography sx={{ fontSize: "15px" }} gutterBottom>
      {title}
    </Typography>
    {children}
  </Grid>
);

// ===============================|| UI COLOR ||=============================== //

const UIColor = () => (
  <MainCard title="Upload Contracts">
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <FormSection title="Merchant Name">
                <TextField
                  id="standard-search"
                  type="search"
                  variant="standard"
                />
              </FormSection>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <FormSection title="Contract File">
                <FileUpload image={ContractFile} allowedExtensions={['pdf']} />
              </FormSection>            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <FormSection title="Client Share">
                <TextField id="standard-basic" variant="standard" />
              </FormSection>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <FormSection title="Date">
                <CurrentDatePicker />
              </FormSection>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={11}>
              <FormSection title="Notes*">
                <NoteButton />
              </FormSection>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  </MainCard>
);

export default UIColor;
