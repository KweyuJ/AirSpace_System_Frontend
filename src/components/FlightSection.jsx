import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FlightSection.css';

const FlightSection = () => {
  const [flights, setFlights] = useState([]);
  const [newFlight, setNewFlight] = useState({
    flight_number: '',
    departure_city: '',
    arrival_city: '',
    departure_date: '',
    arrival_date: '',
    price: '',
    seats_available: ''
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/flights');
      if (Array.isArray(response.data)) {
        setFlights(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setFlights([]);
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
      setFlights([]);
    }
  };

  const handleInputChange = (e) => {
    setNewFlight({ ...newFlight, [e.target.name]: e.target.value });
  };

  const handleAddFlight = async () => {
    // Convert dates to the correct format
    const departureDate = new Date(newFlight.departure_date).toISOString();
    const arrivalDate = new Date(newFlight.arrival_date).toISOString();
  
    const flightData = {
      flight_number: newFlight.flight_number,
      departure_city: newFlight.departure_city,
      arrival_city: newFlight.arrival_city,
      departure_date: departureDate.split('T')[0], // Only date part
      arrival_date: arrivalDate.split('T')[0], // Only date part
      departure_time: newFlight.departure_date.split('T')[1] + ":00", // Time part
      arrival_time: newFlight.arrival_date.split('T')[1] + ":00", // Time part
      price: newFlight.price,
      seats_available: newFlight.seats_available,
      trip_type: 'oneway' // Optional, add this only if applicable
    };
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/flights', flightData);
      console.log('Flight added:', response.data);
  
      // Reset form fields
      setNewFlight({
        flight_number: '',
        departure_city: '',
        arrival_city: '',
        departure_date: '',
        arrival_date: '',
        price: '',
        seats_available: ''
      });
  
      fetchFlights(); // Refresh the list of flights
    } catch (error) {
      console.error('Error adding flight:', error);
    }
  };
  

  const handleDeleteFlight = async (flightId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/flights/${flightId}`);
      fetchFlights();
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  return (
    <div className="flight-section-container">
      <h1 className="flight-section-title">Manage Flights</h1>

      <div className="flight-form-container">
        <h2 className="flight-form-title">Add New Flight</h2>
        <input
          className="flight-form-input"
          type="text"
          name="flight_number"
          placeholder="Flight Number"
          value={newFlight.flight_number}
          onChange={handleInputChange}
        />
        <input
          className="flight-form-input"
          type="text"
          name="departure_city"
          placeholder="Departure City"
          value={newFlight.departure_city}
          onChange={handleInputChange}
        />
        <input
          className="flight-form-input"
          type="text"
          name="arrival_city"
          placeholder="Arrival City"
          value={newFlight.arrival_city}
          onChange={handleInputChange}
        />
        <input
          className="flight-form-input"
          type="datetime-local"
          name="departure_date"
          placeholder="Departure Date"
          value={newFlight.departure_date}
          onChange={handleInputChange}
        />
        <input
          className="flight-form-input"
          type="datetime-local"
          name="arrival_date"
          placeholder="Arrival Date"
          value={newFlight.arrival_date}
          onChange={handleInputChange}
        />
        <input
          className="flight-form-input"
          type="number"
          name="price"
          placeholder="Price"
          value={newFlight.price}
          onChange={handleInputChange}
        />
        <input
          className="flight-form-input"
          type="number"
          name="seats_available"
          placeholder="Seats Available"
          value={newFlight.seats_available}
          onChange={handleInputChange}
        />
        <button className="flight-form-button" onClick={handleAddFlight}>
          Add Flight
        </button>
      </div>

      <div className="flight-card-list">
        {flights.length > 0 ? (
          flights.map(flight => (
            <div key={flight.flight_id} className="flight-card-item">
              <h3 className="flight-card-title">{flight.flight_number}</h3>
              <p className="flight-card-detail">From: {flight.departure_city} - To: {flight.arrival_city}</p>
              <p className="flight-card-detail">Departure: {flight.departure_date}</p>
              <p className="flight-card-detail">Arrival: {flight.arrival_date}</p>
              <p className="flight-card-detail">Price: KSH{flight.price}</p>
              <p className="flight-card-detail">Seats Available: {flight.seats_available}</p>
              <button className="flight-card-action-button" onClick={() => handleDeleteFlight(flight.flight_id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No flights available.</p>
        )}
      </div>
    </div>
  );
};

export default FlightSection;
