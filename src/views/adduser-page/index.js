import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./AddUser.module.css";

// material-ui
import {
  Box,
  InputLabel,
  TextField,
  Alert,
  Typography,
  Button,
  Checkbox
} from "@mui/material";

// project imports
import MainCard from 'ui-component/cards/MainCard';
import StatusImage from 'assets/images/icons/icons-user.gif';
import DropdownList from 'ui-component/extended/DropdownList';
import { roles } from 'store/typesData';

// ==============================|| SAMPLE PAGE ||============================== //

const AddUserPage = () => {
  const [fName, setFName] = useState("");
  const [nameError, setNameError] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [checkk, setCheckk] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setNameError("");
    setFName(newName);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmailError("");
    setEmail(newEmail);
  };

  const handlePhoneChange = (value) => {
    setPhoneError("");
    setPhone(value);
  };

  const handleRoleDropdownChange = (value) => {
    setSelectedRole(value);
  };

  const handleCountryDropdownChange = (value) => {
    setSelectedCountry(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const newEmail = event.target.elements.email.value;
    const newPhone = phone;
    const newName = event.target.elements.name.value;
    let hasError = false;

    if (!/^[A-Za-z\s]+$/.test(newName)) {
      setNameError("Only letters are allowed");
      hasError = true;
    } else {
      setNameError("");
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newEmail)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    } else {
      setEmailError("");
    }
    if (!/^\d{10,12}$/.test(newPhone)) {
      setPhoneError("Please enter a valid phone number");
      hasError = true;
    } else {
      setPhoneError("");
    }
    if (
      !isChecked &&
      /^\d{10,12}$/.test(newPhone) &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newEmail) &&
      /^[A-Za-z\s]+$/.test(newName)
    ) {
      setTimeout(() => {
        setCheckk(false);
      }, 3000);
      setCheckk(true);
    }

    if (!hasError) {
      /////////////////////////////////////////action to be done////////////////////////////////////
      if (
        isChecked &&
        /^\d{10,12}$/.test(newPhone) &&
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newEmail) &&
        /^[A-Za-z\s]+$/.test(newName)
      ) {
        setFName("");
        setEmail("");
        setPhone("");
        setIsChecked(false);
        setSubscribe(true);
        setTimeout(() => {
          setSubscribe(false);
        }, 5000);
      }
    }
  };

  return (
    <MainCard sx={{ padding: 4, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <img
          src={StatusImage}
          alt="User Status"
          style={{ marginRight: '8px', width: '24px', height: '24px' }}
        />
        Add User
      </Typography>
      <form onSubmit={onSubmit} action="request-demo" method="POST">
        <Box marginBottom={2}>
          <InputLabel htmlFor="name" sx={{ color: '#0B3782', marginBottom: 1 }}>
            User Name
          </InputLabel>
          <TextField
            sx={{ bgcolor: '#F5F5F5', borderRadius: '4px', width: "20rem" }}
            id="name"
            variant="outlined"
            placeholder="Enter name"
            name="name"
            error={Boolean(nameError)}
            helperText={nameError}
            onChange={handleNameChange}
            value={fName}
          />
        </Box>
        <Box marginBottom={2}>
          <InputLabel htmlFor="email" sx={{ color: '#0B3782', marginBottom: 1 }}>
            Email
          </InputLabel>
          <TextField
            sx={{ bgcolor: '#F5F5F5', borderRadius: '4px', width: "20rem" }}
            id="email"
            variant="outlined"
            placeholder="Your Email"
            name="email"
            error={Boolean(emailError)}
            helperText={emailError}
            onChange={handleEmailChange}
            value={email}
            type="email"
          />
        </Box>
        <Box marginBottom={2}>
          <InputLabel htmlFor="phone" sx={{ color: '#0B3782', marginBottom: 1 }}>
            Phone Number
          </InputLabel>
          <PhoneInput
            inputClass={styles.customPhoneInput}
            id="phone"
            variant="outlined"
            value={phone}
            placeholder="Enter phone number"
            onChange={handlePhoneChange}
            inputProps={{
              name: 'phone',
              // required: true,
              autoFocus: true,
            }}
          />
          {phoneError && (
            <Box
              sx={{
                color: '#d32f2f',
                fontSize: '0.78rem',
                marginTop: '8px',
                marginLeft: '16px',
              }}
            >
              {phoneError}
            </Box>
          )}
        </Box>
        <Box marginBottom={2}>
          <Box sx={{ display: "flex", gap: "150px" }}>
            <InputLabel htmlFor="role" sx={{ color: '#0B3782', marginBottom: 1 }}>
              Role
            </InputLabel>
            <InputLabel htmlFor="country" sx={{ color: '#0B3782', marginBottom: 1 }}>
              Country
            </InputLabel>
          </Box>
          <Box sx={{ display: "flex", gap: "50px" }}>
            <DropdownList
              selectedTypes={roles}
              placeholder={'Choose Role'}
              value={selectedRole}
              onChange={handleRoleDropdownChange}
            />
            <DropdownList
              selectedTypes={roles}
              placeholder={'Choose Country'}
              value={selectedCountry}
              onChange={handleCountryDropdownChange}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "5px", marginTop: "2rem" }}>
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              style={{
                color: "#0B3782",
              }}
            />
            <InputLabel sx={{ color: '#0B3782', marginTop: "0.7rem" }}>
              Active
            </InputLabel>
          </Box>
        </Box>
        <Box marginBottom={2}>
          {checkk && <Alert severity="error">Enter Valid User Information</Alert>}
          {subscribe && <Alert severity="info">A new user is added successfully</Alert>}
        </Box>
        <Button type="submit" variant="contained" color="primary" sx={{ width: "10rem", backgroundColor: '#0B3782', marginTop: "2rem" }}>
          Submit
        </Button>
      </form>
    </MainCard>
  );
};

export default AddUserPage;