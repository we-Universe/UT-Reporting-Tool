// material-ui
import logo from 'assets/images/UniverseLogo.svg';
// ==============================|| LOGO SVG ||============================== //

import {
  Box
} from '@mui/material';

const Logo = () => {
  return (
    <>
      <Box sx={{display: "block"}}>
        <img src={logo} alt="Universe" width="140" />
      </Box>
    </>
  );
};

export default Logo;