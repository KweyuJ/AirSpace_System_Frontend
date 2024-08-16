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
  const [editingFlightId, setEditingFlightId] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('https://airspace-system-backend-4.onrender.com/flights');
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
    const token = localStorage.getItem('access_token');
    if (!token) {
      setAlertMessage('No token found. Please log in.');
      setAlertType('error');
      return;
    }

    // Convert dates to the correct format
    const departureDate = new Date(newFlight.departure_date).toISOString();
    const arrivalDate = new Date(newFlight.arrival_date).toISOString();

    const flightData = {
      flight_number: newFlight.flight_number,
      departure_city: newFlight.departure_city,
      arrival_city: newFlight.arrival_city,
      departure_date: departureDate.split('T')[0],
      arrival_date: arrivalDate.split('T')[0],
      departure_time: newFlight.departure_date.split('T')[1] + ":00",
      arrival_time: newFlight.arrival_date.split('T')[1] + ":00",
      price: newFlight.price,
      seats_available: newFlight.seats_available,
      trip_type: 'oneway' // Optional
    };

    try {
      const response = await axios.post('https://airspace-system-backend-4.onrender.com/flights', flightData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
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
        setAlertMessage('Flight added successfully!');
        setAlertType('success');
      } else {
        console.error('Failed to add flight:', response.data);
        setAlertMessage('Failed to add flight.');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error adding flight:', error);
      if (error.response && error.response.status === 403) {
        setAlertMessage('Admin access required to add flight.');
      } else {
        setAlertMessage('Error adding flight.');
      }
      setAlertType('error');
    }
  };

  const handleUpdateFlight = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setAlertMessage('No token found. Please log in.');
      setAlertType('error');
      return;
    }

    try {
      const response = await axios.patch(`https://airspace-system-backend-4.onrender.com/flights/${editingFlightId}`, newFlight, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        fetchFlights(); // Refresh the list of flights
        setAlertMessage('Flight updated successfully!');
        setAlertType('success');
        setEditingFlightId(null); // Exit editing mode
        setNewFlight({
          flight_number: '',
          departure_city: '',
          arrival_city: '',
          departure_date: '',
          arrival_date: '',
          price: '',
          seats_available: ''
        });
      } else {
        console.error('Failed to update flight:', response.data);
        setAlertMessage('Failed to update flight.');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error updating flight:', error);
      if (error.response && error.response.status === 403) {
        setAlertMessage('Admin access required to update flight.');
      } else {
        setAlertMessage('Error updating flight.');
      }
      setAlertType('error');
    }
  };

  const handleDeleteFlight = async (flightId) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setAlertMessage('No token found. Please log in.');
      setAlertType('error');
      return;
    }

    try {
      const response = await axios.delete(`https://airspace-system-backend-4.onrender.com/flights/${flightId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setFlights(flights.filter(flight => flight.flight_id !== flightId));
        setAlertMessage('Flight deleted successfully!');
        setAlertType('success');
      } else {
        console.error('Failed to delete flight:', response.data);
        setAlertMessage('Failed to delete flight.');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error deleting flight:', error);
      if (error.response && error.response.status === 403) {
        setAlertMessage('Admin access required to delete flight.');
      } else {
        setAlertMessage('Error deleting flight.');
      }
      setAlertType('error');
    }
  };

  const handleEditClick = (flight) => {
    setEditingFlightId(flight.flight_id);
    setNewFlight({
      flight_number: flight.flight_number,
      departure_city: flight.departure_city,
      arrival_city: flight.arrival_city,
      departure_date: flight.departure_date,
      arrival_date: flight.arrival_date,
      price: flight.price,
      seats_available: flight.seats_available
    });
  };

  return (
    <div className="flight-section-container">
      <h1 className="flight-section-title">Manage Flights</h1>

      {alertMessage && (
        <div className={`alert ${alertType}`}>
          {alertMessage}
        </div>
      )}

      <div className="flight-form-container">
        <h2 className="flight-form-title">{editingFlightId ? 'Update Flight' : 'Add New Flight'}</h2>
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
        <button className="flight-form-button" onClick={editingFlightId ? handleUpdateFlight : handleAddFlight}>
          {editingFlightId ? 'Update Flight' : 'Add Flight'}
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
              <button className="flight-card-update-button" onClick={() => handleEditClick(flight)}>Update</button>
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
