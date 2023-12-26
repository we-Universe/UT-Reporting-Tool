import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./AddUser.module.css";
import config from '../../config';
import { toast, ToastContainer } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

// material-ui
import {
  Box,
  InputLabel,
  TextField,
  Alert,
  Typography,
  Button
} from "@mui/material";

// project imports
import MainCard from 'ui-component/cards/MainCard';
import StatusImage from 'assets/images/icons/icons-user.gif';
import DropdownList from 'ui-component/extended/DropdownList';

// ==============================|| SAMPLE PAGE ||============================== //

const AddUserPage = () => {
  const [fName, setFName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roles, setRoles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [checkk, setCheckk] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = config.reportingAPIUrls.url;

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/Authentication/GetAllRoles`);
        setRoles(response.data);
      } catch (error) {
        toast.error("There is an error while getting roles", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/Countries/GetAllCountries`);
        setCountries(response.data);
        setSelectedCountry("Palestine")
      } catch (error) {
        toast.error("There is an error while getting countries", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    };

    fetchCountries();
  }, []);
  
  const handleNameChange = (event) => {
    const newName = event.target.value;
    setNameError('');
    setFName(newName);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmailError('');
    setEmail(newEmail);
  };

  const handlePhoneChange = (value) => {
    setPhoneError('');
    setPhone(value);
  };

  const handleRoleDropdownChange = (value) => {
    setRoleError('');
    setSelectedRole(value);
  };

  const handleCountryDropdownChange = (value) => {
    setCountryError('');
    setSelectedCountry(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const newEmail = event.target.elements.email.value;
    const newPhone = phone;
    const newName = event.target.elements.name.value;
    let hasError = false;

    if (!/^[A-Za-z\s]+$/.test(newName)) {
      setNameError('Only letters are allowed');
      hasError = true;
    } else {
      setNameError('');
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newEmail)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    } else {
      setEmailError('');
    }
    if (newPhone.trim() === "") {
      setPhoneError("");
    } else if (!/^\d{10,12}$/.test(newPhone)) {
      setPhoneError("Please enter a valid phone number");
      hasError = true;
    } else {
      setPhoneError('');
    }
    if (!selectedRole) {
      setRoleError('Please select a role');
      hasError = true;
    } else {
      setRoleError('');
    }
    if (!selectedCountry) {
      setCountryError('Please select a country');
      hasError = true;
    } else {
      setCountryError('');
    }

    if (
      /^\d{10,12}$/.test(newPhone) &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newEmail) &&
      /^[A-Za-z\s]+$/.test(newName) &&
      !selectedRole &&
      !selectedCountry
    ) {
      setTimeout(() => {
        setCheckk(false);
      }, 3000);
      setCheckk(true);
    }

    if (!hasError) {
      setLoading(true);
      /////////////////////////////////////////action to be done////////////////////////////////////
      if (
        /^\d{10,12}$/.test(newPhone) &&
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newEmail) &&
        /^[A-Za-z\s]+$/.test(newName) &&
        selectedRole &&
        selectedCountry
      ) {
        setFName("");
        setEmail("");
        setPhone("");
      }
      var countryId = countries?.find((country) => country.name === selectedCountry).id
      const values = {
        Username: fName,
        Email: email,
        Role: selectedRole,
        PhoneNumber: phone,
        CountryId: countryId,
      };
      try {
        const response = await axios.post(
          `${apiUrl}/api/Authentication/Register`,
          values
        );
  
        if (response.status === 200) {
          toast.success("User added successfully", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        if (error?.response?.data) {
          toast.error(error.response.data, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error("Internal Server Error!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
      finally {
        setLoading(false);
      }
    }
  };

  return (
    <MainCard sx={{ padding: 4, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <img src={StatusImage} alt="User Status" style={{ marginRight: '8px', width: '24px', height: '24px' }} />
        Add User
      </Typography>
      <form onSubmit={onSubmit} action="request-demo" method="POST">
        <Box marginBottom={2}>
          <InputLabel htmlFor="name" sx={{ color: '#0B3782', marginBottom: 1 }}>
            Username
          </InputLabel>
          <TextField
            sx={{ bgcolor: '#F5F5F5', borderRadius: '4px', width: '20rem' }}
            id="name"
            variant="outlined"
            placeholder="Enter a username"
            name="name"
            onChange={handleNameChange}
            value={fName}
          />
          {nameError && (
            <Box
              sx={{
                color: '#d32f2f',
                fontSize: '0.78rem',
                marginTop: '8px'
              }}
            >
              {nameError}
            </Box>
          )}
        </Box>
        <Box marginBottom={2}>
          <InputLabel htmlFor="email" sx={{ color: '#0B3782', marginBottom: 1 }}>
            Email
          </InputLabel>
          <TextField
            sx={{ bgcolor: '#F5F5F5', borderRadius: '4px', width: '20rem' }}
            id="email"
            variant="outlined"
            placeholder="Your Email"
            name="email"
            onChange={handleEmailChange}
            value={email}
            type="email"
          />
          {emailError && (
            <Box
              sx={{
                color: '#d32f2f',
                fontSize: '0.78rem',
                marginTop: '8px'
              }}
            >
              {emailError}
            </Box>
          )}
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
              autoFocus: true
            }}
          />
          {phoneError && (
            <Box
              sx={{
                color: '#d32f2f',
                fontSize: '0.78rem',
                marginTop: '8px'
              }}
            >
              {phoneError}
            </Box>
          )}
        </Box>
        <Box marginBottom={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Box>
              <InputLabel htmlFor="role" sx={{ color: '#0B3782', marginBottom: 1 }}>
                Role
              </InputLabel>
              <DropdownList
                selectedTypes={roles.map((role) => role.name)}
                placeholder={'Choose Role'}
                value={selectedRole}
                onChange={handleRoleDropdownChange}
                sx={{ width: '200px' }}
              />
            </Box>
            {roleError && (
              <Box
                sx={{
                  color: '#d32f2f',
                  fontSize: '0.78rem',
                  marginTop: '-14px'
                }}
              >
                {roleError}
              </Box>
            )}
            <Box>
              <InputLabel htmlFor="country" sx={{ color: '#0B3782', marginBottom: 1 }}>
                Country
              </InputLabel>
              <DropdownList
                selectedTypes={countries.map((country) => country.name)}
                placeholder={'Choose Country'}
                value={selectedCountry}
                onChange={handleCountryDropdownChange}
                sx={{ width: '200px' }}
              />
            </Box>
          </Box>
          {countryError && (
            <Box
              sx={{
                color: '#d32f2f',
                fontSize: '0.78rem',
                marginTop: '8px'
              }}
            >
              {countryError}
            </Box>
          )}
        </Box>
        <Box marginBottom={2}>
          {checkk && <Alert severity="error">Enter Valid User Information</Alert>}
        </Box>
        <Box marginBottom={2}>
          {loading && <CircularProgress />}
        </Box>
        <Button type="submit" variant="contained" color="primary" sx={{ width: '10rem', backgroundColor: '#0B3782', marginTop: '2rem' }}>
          Submit
        </Button>
      </form>
    <ToastContainer />
    </MainCard>
  );
};

export default AddUserPage;
