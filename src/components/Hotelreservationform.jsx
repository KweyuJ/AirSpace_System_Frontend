import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  MenuItem,
} from "@mui/material";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import signupImage from "../assets/hotelresrvation.png";
import "./App.css";

const styles = {
  container: { minHeight: "100vh", backgroundColor: "white" },
  formContainer: {
    padding: "30px",
    width: "100%",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: "0px 3px 6px #00000029",
  },
  signUpImage: { width: "100%", height: "auto", borderRadius: "8px" },
  formWrapper: { marginTop: "20px", textAlign: "center" },
  submitButton: {
    marginTop: "1rem",
    backgroundColor: "#d32f2f",
    color: "white",
  },
  pdfContainer: {
    padding: "20px",
    backgroundColor: "white",
    fontSize: "12px",
  },
};

const HotelReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

  const handleSubmit = async (e) => {
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

    // Generate PDF from the formatted content
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      window.open(pdf.output("bloburl"), "_blank");
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="hotel-reservation-form"
    >
      <Grid item xs={12}>
        <img src={signupImage} alt="Header" className="header-image" />
      </Grid>
      <Grid item xs={12}>
        <Box className="hotel-reservation-header">Hotel Reservation Form</Box>
        <Typography className="hotel-reservation-subtitle">
          Please complete the form below.
        </Typography>
      </Grid>
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        <Box sx={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={formErrors.name}
              helperText={formErrors.name ? "Name is required" : ""}
            />
            <TextField
              label="E-mail"
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
              label="Room Type"
              variant="outlined"
              fullWidth
              margin="normal"
              name="roomType"
              value={formData.roomType}
              onChange={handleInputChange}
              error={formErrors.roomType}
              helperText={formErrors.roomType ? "Room type is required" : ""}
              select
            >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="double">Double</MenuItem>
              <MenuItem value="suite">Suite</MenuItem>
            </TextField>
            <TextField
              label="Number of Guests"
              variant="outlined"
              fullWidth
              margin="normal"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleInputChange}
              error={formErrors.numberOfGuests}
              helperText={formErrors.numberOfGuests ? "Number of guests is required" : ""}
            />
            <TextField
              label="Arrival Date"
              variant="outlined"
              fullWidth
              margin="normal"
              name="arrivalDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.arrivalDate}
              onChange={handleInputChange}
              error={formErrors.arrivalDate}
              helperText={formErrors.arrivalDate ? "Arrival date is required" : ""}
            />
            <TextField
              label="Arrival Time"
              variant="outlined"
              fullWidth
              margin="normal"
              name="arrivalTime"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={formData.arrivalTime}
              onChange={handleInputChange}
              error={formErrors.arrivalTime}
              helperText={formErrors.arrivalTime ? "Arrival time is required" : ""}
            />
            <TextField
              label="Departure Date"
              variant="outlined"
              fullWidth
              margin="normal"
              name="departureDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.departureDate}
              onChange={handleInputChange}
              error={formErrors.departureDate}
              helperText={formErrors.departureDate ? "Departure date is required" : ""}
            />
            <RadioGroup
              aria-label="freePickup"
              name="freePickup"
              value={formData.freePickup}
              onChange={handleInputChange}
              row
              className="custom-radio-group"
            >
              <FormControlLabel
                value="yes"
                control={<Radio className="custom-radio" />}
                label="Yes Please! - Pick me up on arrival"
                className="custom-label"
              />
              <FormControlLabel
                value="no"
                control={<Radio className="custom-radio" />}
                label="No Thanks - I'll make my own way there"
                className="custom-label"
              />
            </RadioGroup>
            {formErrors.freePickup && (
              <Typography color="error" variant="body2">
                Please select a pickup option.
              </Typography>
            )}
            <TextField
              label="Special Request"
              variant="outlined"
              fullWidth
              margin="normal"
              name="specialRequest"
              value={formData.specialRequest}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="submit-button"
                sx={styles.submitButton}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
      {/* PDF Content */}
      <div id="pdf-content" style={styles.pdfContainer}>
        <div style={{ textAlign: "center" }}>
          <img src={signupImage} alt="Header" style={{ width: "100%", borderRadius: "8px" }} />
          <Typography variant="h5">Successful Hotel Booking</Typography>
          <Typography variant="h6">AIRECSCAPE</Typography>
          <Typography>1234 Main St, Westlands</Typography>
          <Typography>0704268396 | Joykwevy@gmail.com | www.airecscape.com</Typography>
        </div>
        <Typography variant="body1" style={{ marginTop: "20px" }}>
          <strong>Booking Details</strong><br />
          Check-in: {formData.arrivalDate}<br />
          Check-out: {formData.departureDate}<br />
          Guests: {formData.numberOfGuests}<br />
          Unit: {formData.roomType}<br />
        </Typography>
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          <strong>Booked By</strong><br />
          {formData.name}<br />
          {formData.email}<br />
          0704268396<br />
        </Typography>
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          <strong>Additional Information</strong><br />
          Check-in time is 1:00pm<br />
          Check-out time is 10:00am<br />
          Welcome!
        </Typography>
      </div>
    </Grid>
  );
};

export default HotelReservationForm;
