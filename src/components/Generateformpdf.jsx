import React, { useRef } from "react";
import { Grid, Typography, Button, Divider, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import signupImage from "../assets/hotelresrvation.png";
import "./App.css";

const Generateformpdf = () => {
  const location = useLocation();
  const { formData } = location.state || {};
  const pdfRef = useRef();

  if (!formData) {
    return <Typography variant="h6">No booking data available.</Typography>;
  }

  const handleGeneratePDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("booking-confirmation.pdf");
    });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ padding: "20px", backgroundColor: "white" }}>
      <Grid item xs={12} sm={10} md={8}>
        <div ref={pdfRef} style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff" }}>
          <img src={signupImage} alt="Header" style={{ width: "100%", borderRadius: "8px" }} />
          <Typography variant="h5" style={{ marginTop: "10px" }}>
            Successful Hotel Booking
          </Typography>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            AIRECSCAPE
          </Typography>
          <Typography>1234 Main St, Westlands</Typography>
          <Typography>0704268396 | Joykwevy@gmail.com | www.airecscape.com</Typography>

          <Divider style={{ margin: "20px 0" }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                Booking Details
              </Typography>
              <Typography variant="body1"><strong>Check-in:</strong> {formData.arrivalDate}</Typography>
              <Typography variant="body1"><strong>Check-out:</strong> {formData.departureDate}</Typography>
              <Typography variant="body1"><strong>Guests:</strong> {formData.numberOfGuests}</Typography>
              <Typography variant="body1"><strong>Unit:</strong> {formData.roomType}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                Booked By
              </Typography>
              <Typography variant="body1">{formData.name}</Typography>
              <Typography variant="body1">{formData.email}</Typography>
              <Typography variant="body1">{formData.phoneNumber}</Typography>
            </Grid>
          </Grid>

          <Divider style={{ margin: "20px 0" }} />

          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Booking #:</strong> 0000001</Typography>
              <Typography variant="body1"><strong>Booking Date:</strong> 15-08-2024</Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Typography variant="body1"><strong>Status:</strong> Confirmed</Typography>
            </Grid>
          </Grid>

          <Divider style={{ margin: "20px 0" }} />

          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            Additional Information
          </Typography>
          <Typography variant="body1">Check-in time is 1:00pm</Typography>
          <Typography variant="body1">Check-out time is 10:00am</Typography>
          <Typography variant="body1">Welcome!</Typography>
        </div>

        <Box textAlign="center" style={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGeneratePDF}
            style={{ backgroundColor: "#d32f2f", color: "white" }}
            fullWidth
          >
            Generate PDF
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Generateformpdf;