import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Grid, Typography, TextField, Button, IconButton, Box, InputAdornment, Snackbar } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Visibility, VisibilityOff } from '@mui/icons-material';

import image from '../assets/logo.png';

const styles = {
  signUpOption: { display: "flex", alignItems: 'center', padding: "15px", width: '250px', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', cursor: "pointer" },
  signUpImage: { width: '100%', height: 'auto', borderRadius: '8px' },
  container: { minHeight: '100vh', backgroundColor: 'white' },
  backButton: { marginBottom: '1rem' },
  formContainer: { padding: 4, width: '100%', bgcolor: 'background.paper', borderRadius: '8px' },
  signUpWrapper: { marginTop: '20px', textAlign: 'center' },
};

const SignUp = () => {
  const navigate = useNavigate(); 
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    repeatPassword: '',
    showPassword: false,
    showRepeatPassword: false,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({
    title: false,
    first_name: false,
    last_name: false,
    email: false,
    phone_number: false,
    password: false,
    repeatPassword: false,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: false });
    }
  };

  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleShowRepeatPassword = () => {
    setFormData({ ...formData, showRepeatPassword: !formData.showRepeatPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.repeatPassword) {
      setErrorMessage("Passwords do not match!");
      setFormErrors({ ...formErrors, password: true, repeatPassword: true });
      return;
    }
  
    const requiredFields = ['first_name', 'last_name', 'email', 'phone_number', 'password', 'repeatPassword'];
    let hasError = false;
    const newFormErrors = { ...formErrors };
  
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newFormErrors[field] = true;
        hasError = true;
      } else {
        newFormErrors[field] = false;
      }
    });
  
    setFormErrors(newFormErrors);
  
    if (hasError) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }
  
    const user = {
      title: formData.title,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password
    };
  
    try {
      const response = await fetch('http://127.0.0.1:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
    
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('access_token', result.access_token);
        setSuccessMessage('User signed up successfully!');
        handleClose(); 
        navigate('/login', { replace: true });
      } else if (response.status === 409) {
        setErrorMessage('Email already exists. Please use a different email.');
      } else {
        throw new Error(`Sign up failed: ${response.statusText}`);
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    }    
  };

  const handleSnackbarClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleOpen = () => {
    setShowSignInForm(true);
  };

  const handleClose = () => {
    setShowSignInForm(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={styles.container}>
      <Grid item xs={12} sm={6}>
        <img src={image} alt="Auth" style={styles.signUpImage} />
      </Grid>
      <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
        <div style={styles.signUpWrapper}>
          <Typography variant="h5" style={{ marginBottom: '20px' }}>Let's sign you up</Typography>
          {showSignInForm ? (
            <Box sx={styles.formContainer}>
              <IconButton onClick={handleClose} style={styles.backButton}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h4">Sign Up</Typography>
              <form onSubmit={handleSubmit}>
                <TextField label="Title" variant="outlined" fullWidth margin="normal" name="title" value={formData.title} onChange={handleInputChange} error={formErrors.title} />
                <TextField label="First Name" variant="outlined" fullWidth margin="normal" name="first_name" value={formData.first_name} onChange={handleInputChange} required error={formErrors.first_name}/>
                <TextField label="Last Name" variant="outlined" fullWidth margin="normal" name="last_name" value={formData.last_name} onChange={handleInputChange} required error={formErrors.last_name}/>
                <TextField label="Email" variant="outlined" fullWidth margin="normal" name="email" value={formData.email} onChange={handleInputChange} required error={formErrors.email}/>
                <TextField label="Phone Number" variant="outlined" fullWidth margin="normal" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required error={formErrors.phone_number}/>
                <TextField label="Password" variant="outlined" fullWidth margin="normal" type={formData.showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} required error={formErrors.password} InputProps={{ endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ), }}/>
                <TextField label="Repeat Password" variant="outlined" fullWidth margin="normal" type={formData.showRepeatPassword ? 'text' : 'password'} name="repeatPassword" value={formData.repeatPassword} onChange={handleInputChange} required error={formErrors.repeatPassword} InputProps={{ endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowRepeatPassword} edge="end">
                      {formData.showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ), }}/>
                <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
              </form>
              <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleSnackbarClose} message={successMessage} />
              <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleSnackbarClose} message={errorMessage} />
            </Box>
          ) : (
            <div onClick={handleOpen} style={styles.signUpOption}>
              <Typography variant="body1" style={{ flex: 1, textAlign: 'left' }}>Sign up with your email</Typography>
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default SignUp;
