import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, IconButton, Box, Snackbar, InputAdornment } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Visibility, VisibilityOff, Email } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import image from "../assets/login.png"; 

const SignInOptions = ({ handleOpen }) => {
  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>Let's log you in</Typography>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <div
            onClick={() => handleOpen('email')}
            style={{ display: "flex", alignItems: 'center', padding: "15px", width: '250px', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', cursor: "pointer" }}
          >
            <Email fontSize="large" style={{ color: '#032541' }} />
            <Typography style={{ color: '#032541', marginLeft: '10px' }}>Log In with email</Typography>
          </div>
        </Grid>
        <Grid item>
          <Link to='/signup' style={{ textDecoration: 'none' }}>
            <Typography style={{ textAlign: 'center', marginTop: '10px', cursor: 'pointer', color: '#007BFF' }}>Don't have an account? Sign up</Typography>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

const SignInForm = ({ signInWithEmail, handleClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = 'http://127.0.0.1:5000/login/email';
    const body = JSON.stringify({ email: formData.email, password: formData.password });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('access_token', result.token);
        localStorage.setItem('role', result.role);
        localStorage.setItem('id', result.id);
        setSuccessMessage('User signed in successfully!');
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000);
      } else {
        const errorResult = await response.json();
        setError(errorResult.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setErrorMessage('Error: ' + error.message);
    }

    handleClose();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSnackbarClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <Box sx={{ padding: 4, width: '100%', bgcolor: 'background.paper', borderRadius: '8px' }}>
      <IconButton onClick={handleClose} style={{ marginBottom: '1rem' }}>
        <ArrowBackIcon />
      </IconButton>
      <h2>Log In</h2>
      {error && <Typography color="error" style={{ marginBottom: '1rem' }}>{error}</Typography>}
      {signInWithEmail && (
        <form onSubmit={handleSubmit}>
          <TextField label="Email" variant="outlined" fullWidth margin="normal" name="email" value={formData.email} onChange={handleInputChange} />
          <TextField label="Password" type={passwordVisible ? "text" : "password"} variant="outlined" fullWidth margin="normal" name="password" value={formData.password} onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button type="submit" variant="contained" color="error" fullWidth style={{ marginTop: '1rem' }}>
            Log In with Email
          </Button>
        </form>
      )}
      <Snackbar
        open={!!successMessage || !!errorMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={successMessage || errorMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ContentProps={{
          style: {
            backgroundColor: successMessage ? '#4CAF50' : '#D32F2F', // Green for success, Red for error
            color: 'white'
          },
        }}
      />
    </Box>
  );
};

const Login = () => {
  const [signInWithEmail, setSignInWithEmail] = useState(false);

  const handleOpen = (method) => {
    setSignInWithEmail(method === 'email');
  };

  const handleClose = () => {
    setSignInWithEmail(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Grid item xs={12} sm={6}>
        <img src={image} alt="Auth" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
      </Grid>
      <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
        {signInWithEmail ? (
          <SignInForm
            signInWithEmail={signInWithEmail}
            handleClose={handleClose}
          />
        ) : (
          <SignInOptions handleOpen={handleOpen} />
        )}
      </Grid>
    </Grid>
  );
};

export default Login;
