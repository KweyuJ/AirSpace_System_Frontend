import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import this to use navigation
import { FlightContext } from "../context/FlightContext";
import "../index.css";

const Confirmation = () => {
  const { flights, searchParams, passengerDetails } = useContext(FlightContext);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const outboundTotal = flights.outbound_flights.reduce(
    (total, flight) => total + flight.price,
    0
  );
  const returnTotal =
    searchParams.tripType === "roundtrip"
      ? flights.return_flights.reduce(
          (total, flight) => total + flight.price,
          0
        )
      : 0;
  const totalPrice = outboundTotal + returnTotal;

  const handleConfirmation = async () => {
    let phoneNumber = passengerDetails.phoneNumber;

    // Normalize phone number format
    if (phoneNumber.startsWith("+")) {
      phoneNumber = phoneNumber.substring(1);
    }

    setLoading(true);
    setPaymentStatus("Prompt sent, waiting for payment...");

    try {
      const response = await fetch("http://127.0.0.1:5000/stkpush", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: totalPrice,
        }),
      });

      if (response.ok) {
        const paymentResponse = await response.json();

        if (paymentResponse.success) {
          setPaymentStatus("Payment successful!");

          navigate("/confirmation");
        } else {
          setPaymentStatus("Payment failed. Please try again.");
        }
      } else {
        setPaymentStatus("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      setPaymentStatus(
        "Payment failed due to a network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="confirmation-container">
      <h2>Confirmation</h2>

      <div className="flight-details-2">
        <h3>Flights:</h3>
        {flights.outbound_flights.map((flight, index) => (
          <div key={index} className="flight-box">
            <div className="flight-info-2">
              <div>
                <h4>{flight.departure_time}</h4>
                <p>
                  {searchParams.fromCity} | {searchParams.outboundDate}
                </p>
              </div>
              <div>
                <h4>{flight.arrival_time}</h4>
                <p>non-stop</p>
              </div>
              <div>
                <h4>{flight.flight_number}</h4>
              </div>
              <div className="price-tag">
                <h4>KES {flight.price}</h4>
              </div>
            </div>
          </div>
        ))}
        {searchParams.tripType === "roundtrip" &&
          flights.return_flights.map((flight, index) => (
            <div key={index} className="flight-box">
              <div className="flight-info-2">
                <div>
                  <h4>{flight.departure_time}</h4>
                  <p>
                    {searchParams.toCity} | {searchParams.returnDate}
                  </p>
                </div>
                <div>
                  <h4>{flight.arrival_time}</h4>
                  <p>non-stop</p>
                </div>
                <div>
                  <h4>{flight.flight_number}</h4>
                </div>
                <div className="price-tag">
                  <h4>KES {flight.price}</h4>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="traveler-details">
        <h3>Traveler details:</h3>
        <div className="traveler-box">
          <div className="traveler-info">
            <p>
              Name: {passengerDetails.title} {passengerDetails.firstName}{" "}
              {passengerDetails.lastName}
            </p>
            <p>Phone: {passengerDetails.phoneNumber}</p>
            <p>Email: {passengerDetails.email}</p>
            <p className="total">TOTAL: KES {totalPrice}</p>
          </div>
        </div>
      </div>

      <div className="payment-option">
        <button
          className="mpesa-button"
          onClick={handleConfirmation}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay with MPESA"}
          {!loading && (
            <img src="src/assets/Mpesa Button.png" alt="MPESA Logo" />
          )}
        </button>
        {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
      </div>
    </div>
  );
};

export default Confirmation;
