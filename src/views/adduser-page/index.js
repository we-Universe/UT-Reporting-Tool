import React, { useState } from 'react';
import validator from 'validator';

// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import StatusImage from 'assets/images/icons/icons-user.gif';
import DropdownList from 'ui-component/extended/DropdownList';
import { roles } from 'store/typesData';

// ==============================|| SAMPLE PAGE ||============================== //

const AddUserPage = () => {
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const validateEmail = (e) => {
    const email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError('Valid Email :)');
    } else {
      setEmailError('Enter valid Email!');
    }
  };

  const validatePhone = (e) => {
    const phone = e.target.value;

    const isValidPhone = validator.isMobilePhone(phone, 'any', { strictMode: false });

    if (isValidPhone) {
      setPhoneError('Valid Phone Number :)');
    } else {
      setPhoneError('Enter valid Phone Number!');
    }
  };

  const handleRoleDropdownChange = (value) => {
    setSelectedRole(value);
  };

  return (
    <MainCard>
      <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={StatusImage}
          alt="User Status"
          style={{ marginRight: '8px', width: '24px', height: '24px' }}
        />
        Add User
      </Typography>
      <pre>
        <h4>Name</h4>
        <input
          type="text"
          id="userPhone"
          onChange={(e) => validatePhone(e)}
        />
        <br />
        <span style={{ fontWeight: 'bold', color: 'red' }}>{phoneError}</span>
      </pre>

      <pre>
        <h4>Email</h4>
        <input
          type="text"
          id="userEmail"
          onChange={(e) => validateEmail(e)}
        />
        <br />
        <span style={{ fontWeight: 'bold', color: 'red' }}>{emailError}</span>
      </pre>

      <pre>
        <h4>Phone Number</h4>
        <input
          type="text"
          id="userPhone"
          onChange={(e) => validatePhone(e)}
        />
        <br />
        <span style={{ fontWeight: 'bold', color: 'red' }}>{phoneError}</span>
      </pre>

      <pre>
        <h4>Role</h4>
        <DropdownList
          selectedTypes={roles}
          placeholder={'Choose role'}
          value={selectedRole}
          onChange={handleRoleDropdownChange}
        />
        <br />
        <span style={{ fontWeight: 'bold', color: 'red' }}>{phoneError}</span>
      </pre>

      <pre>
        <h4>Active User</h4>
       
        <span style={{ fontWeight: 'bold', color: 'red' }}>{phoneError}</span>
      </pre>
    </MainCard>
  );
};

export default AddUserPage;