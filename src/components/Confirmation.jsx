import React, { useContext } from 'react';
import FlightContext from '../context/FlightContext';

function Confirmation() {
  const { selectedFlight, passengerDetails } = useContext(FlightContext);

  return (
    <div className="confirmation-page">
      <h2>Booking Confirmation</h2>
      {selectedFlight && (
        <div>
          <h3>Flight Details</h3>
          <p>Flight {selectedFlight.flight_number}: {selectedFlight.departure_city} to {selectedFlight.arrival_city} on {selectedFlight.departure_date} - ${selectedFlight.price}</p>
        </div>
      )}
      {passengerDetails && (
        <div>
          <h3>Passenger Details</h3>
          <p>Name: {passengerDetails.title} {passengerDetails.firstName} {passengerDetails.lastName}</p>
          <p>Phone: {passengerDetails.phoneNumber}</p>
          <p>Email: {passengerDetails.email}</p>
        </div>
      )}
    </div>
  );
}

export default Confirmation;
