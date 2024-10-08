import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  InputAdornment,
  Snackbar,
  MenuItem,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import signupImage from "../assets/signup.png"; // Import the signup image

const styles = {
  signUpOption: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    width: "250px",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    cursor: "pointer",
  },
  signUpImage: { width: "100%", height: "auto", borderRadius: "8px" },
  container: { minHeight: "100vh", backgroundColor: "white" },
  backButton: { marginBottom: "1rem" },
  formContainer: {
    padding: 4,
    width: "100%",
    bgcolor: "background.paper",
    borderRadius: "8px",
  },
  signUpWrapper: { marginTop: "20px", textAlign: "center" },
};

const SignUp = () => {
  const navigate = useNavigate();
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    repeatPassword: "",
    showPassword: false,
    showRepeatPassword: false,
    role: "", // Add role field
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({
    title: false,
    first_name: false,
    last_name: false,
    email: false,
    phone_number: false,
    password: false,
    repeatPassword: false,
    role: false, // Add role field
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title) newErrors.title = true;
    if (!formData.first_name) newErrors.first_name = true;
    if (!formData.last_name) newErrors.last_name = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.phone_number) newErrors.phone_number = true;
    if (!formData.password) newErrors.password = true;
    if (formData.password !== formData.repeatPassword)
      newErrors.repeatPassword = true;
    if (!formData.role) newErrors.role = true; // Add role validation

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length) return;

    const endpoint = "https://airspace-system-backend-4.onrender.com/users";
    const body = JSON.stringify({
      title: formData.title,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
      role: formData.role, // Include role in the payload
    });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage("User signed up successfully!");
        setTimeout(() => {
          navigate("/login", { replace: true }); // Redirect to login page after signup
        }, 3000);
      } else {
        const errorResult = await response.json();
        setErrorMessage(errorResult.error || "Signup failed.");
      }
    } catch (error) {
      setErrorMessage("Error: " + error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const toggleRepeatPasswordVisibility = () => {
    setFormData({
      ...formData,
      showRepeatPassword: !formData.showRepeatPassword,
    });
  };

  const handleSnackbarClose = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={styles.container}
    >
      <Grid item xs={12} sm={6}>
        <img src={signupImage} alt="Auth" style={styles.signUpImage} />{" "}
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={styles.formContainer}>
          <IconButton
            onClick={() => setShowSignInForm(!showSignInForm)}
            style={styles.backButton}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5">Sign Up</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              error={formErrors.title}
              helperText={formErrors.title ? "Title is required" : ""}
            />
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              error={formErrors.first_name}
              helperText={formErrors.first_name ? "First name is required" : ""}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              error={formErrors.last_name}
              helperText={formErrors.last_name ? "Last name is required" : ""}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={formErrors.email}
              helperText={formErrors.email ? "Email is required" : ""}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              error={formErrors.phone_number}
              helperText={
                formErrors.phone_number ? "Phone number is required" : ""
              }
            />
            <TextField
              label="Role"
              variant="outlined"
              fullWidth
              margin="normal"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              error={formErrors.role}
              helperText={formErrors.role ? "Role is required" : ""}
              select
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="traveler">Traveler</MenuItem>
            </TextField>
            <TextField
              label="Password"
              type={formData.showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={formErrors.password}
              helperText={formErrors.password ? "Password is required" : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {formData.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Repeat Password"
              type={formData.showRepeatPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleInputChange}
              error={formErrors.repeatPassword}
              helperText={
                formErrors.repeatPassword ? "Passwords do not match" : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleRepeatPasswordVisibility}>
                      {formData.showRepeatPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#d32f2f",
                  color: "white",
                }}
              >
                Sign Up
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
      <Snackbar
        open={!!successMessage || !!errorMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={successMessage || errorMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          style: {
            backgroundColor: successMessage ? "#4CAF50" : "#D32F2F", // Green for success, Red for error
            color: "white",
          },
        }}
      />
    </Grid>
  );
};

export default SignUp;