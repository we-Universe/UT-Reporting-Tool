// material-ui
import logo from 'assets/images/UniverseLogo.svg';
// ==============================|| LOGO SVG ||============================== //

// import DropdownList from 'ui-component/extended/DropdownList';
// import FileUpload from 'ui-component/extended/FileUpload';
// import NoteButton from 'ui-component/extended/NoteButton';
// import { selectedTypes, reportTypes } from 'store/typesData';

import {
  Box
} from '@mui/material';

const Logo = () => {
  return (
    <>
      <Box sx={{display: "block"}}>
        <img src={logo} alt="Universe" width="140" />
        {/* <NoteButton /> */}
        {/* <FileUpload  /> */}
        {/* <FileUpload allowedFileTypes={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']} /> */}
        {/* <DropdownList selectedTypes={selectedTypes} placeholder={'Choose telecom name'} /> */}
        {/* <DropdownList selectedTypes={reportTypes} placeholder={'Choose report type'} /> */}
      </Box>
    </>
  );
};

export default Logo;