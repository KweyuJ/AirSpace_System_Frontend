import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, Box, MenuItem } from "@mui/material";
import signupImage from "../assets/hotelresrvation.png";

const HotelReservationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || {}; 

  const [formData, setFormData] = useState({
    name: user.first_name ? `${user.first_name} ${user.last_name}` : "",
    email: user.email || "",
    roomType: "",
    numberOfGuests: "",
    arrivalDate: "",
    arrivalTime: "",
    departureDate: "",
    freePickup: "",
    specialRequest: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    roomType: false,
    numberOfGuests: false,
    arrivalDate: false,
    arrivalTime: false,
    departureDate: false,
    freePickup: false,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.roomType) newErrors.roomType = true;
    if (!formData.numberOfGuests) newErrors.numberOfGuests = true;
    if (!formData.arrivalDate) newErrors.arrivalDate = true;
    if (!formData.arrivalTime) newErrors.arrivalTime = true;
    if (!formData.departureDate) newErrors.departureDate = true;
    if (!formData.freePickup) newErrors.freePickup = true;

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length) return;

    navigate("/pdf-view", { state: { formData } });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <Grid item xs={12}>
      <img src={signupImage} alt="Hotel Reservation" style={{ width: "100%", maxHeight: "600px", height: "auto", objectFit: "cover", borderRadius: "8px" }} />
      </Grid>
      <Grid item xs={12} sm={8} md={6}>
        <Box sx={{ padding: "30px", maxWidth: "600px", width: "100%", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)", marginTop: "-50px", zIndex: 1, position: "relative" }}>
          <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 700 }}>
            Hotel Reservation Form
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom style={{ fontWeight: 400 }}>
            Please complete the form below.
          </Typography>
          <Typography variant="body2" align="center" gutterBottom style={{ marginBottom: "30px" }}>
            Your registration will be verified prior to your arrival.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={formErrors.name}
                  helperText={formErrors.name ? "Name is required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formErrors.email}
                  helperText={formErrors.email ? "E-mail is required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Room Type"
                  variant="outlined"
                  fullWidth
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  error={formErrors.roomType}
                  helperText={formErrors.roomType ? "Room Type is required" : ""}
                  select
                >
                  <MenuItem value="single">Single Room</MenuItem>
                  <MenuItem value="double">Double Room</MenuItem>
                  <MenuItem value="suite">Suite Room</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Number of Guests"
                  variant="outlined"
                  fullWidth
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleInputChange}
                  error={formErrors.numberOfGuests}
                  helperText={formErrors.numberOfGuests ? "Number of Guests is required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Arrival Date"
                  variant="outlined"
                  fullWidth
                  name="arrivalDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.arrivalDate}
                  onChange={handleInputChange}
                  error={formErrors.arrivalDate}
                  helperText={formErrors.arrivalDate ? "Arrival Date is required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Arrival Time"
                  variant="outlined"
                  fullWidth
                  name="arrivalTime"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  value={formData.arrivalTime}
                  onChange={handleInputChange}
                  error={formErrors.arrivalTime}
                  helperText={formErrors.arrivalTime ? "Arrival Time is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Departure Date"
                  variant="outlined"
                  fullWidth
                  name="departureDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  error={formErrors.departureDate}
                  helperText={formErrors.departureDate ? "Departure Date is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Free Pickup?
                </Typography>
                <RadioGroup
                  name="freePickup"
                  value={formData.freePickup}
                  onChange={handleInputChange}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes Please! - Pick me up on arrival" />
                  <FormControlLabel value="no" control={<Radio />} label="No Thanks - I'll make my own way there" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Special Requests"
                  variant="outlined"
                  fullWidth
                  name="specialRequest"
                  value={formData.specialRequest}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Box textAlign="center">
                  <Button type="submit" variant="contained" color="error" style={{ padding: "10px 50px" }}>
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HotelReservationForm;