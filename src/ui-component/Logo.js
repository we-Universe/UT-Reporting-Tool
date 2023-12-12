// material-ui
import logo from 'assets/images/UniverseLogo.svg';
// ==============================|| LOGO SVG ||============================== //

import DropdownList from 'ui-component/extended/DropdownList';

const selectedTypes = [
  'Telecom',
  'Software Solutions',
  'Technologies',
  'E-Marketing',
];

const Logo = () => {
  return (
    <>
      <img src={logo} alt="Universe" width="140" />
      <DropdownList selectedTypes={selectedTypes} placeholder={'Choose telecom name'}/>
    </>
  );
};

export default Logo;