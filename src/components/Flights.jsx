// src/components/Flights.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FlightContext from '../context/FlightContext';

function Flights() {
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const { setSearchResults } = useContext(FlightContext);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    const url = `http://127.0.0.1:5000/flights?from=${departureCity}&to=${arrivalCity}&depart_date=${departDate}&return_date=${returnDate}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }
      const data = await response.json();
      setSearchResults(data);
      navigate('/search-results');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flights-page">
      <div className="booking-container">
        <h2>Search Flights</h2>
        <form className="booking-form-container" onSubmit={handleSearch}>
          <label>
            Departure City:
            <input
              type="text"
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              required
            />
          </label>
          <label>
            Arrival City:
            <input
              type="text"
              value={arrivalCity}
              onChange={(e) => setArrivalCity(e.target.value)}
              required
            />
          </label>
          <label>
            Departure Date:
            <input
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
            />
          </label>
          <label>
            Return Date:
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </label>
          <button className="find-flights-button" type="submit">Search Flights</button>
        </form>
      </div>
    </div>
  );
}

export default Flights;
