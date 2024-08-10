import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FlightContext from '../context/FlightContext';

function SearchResults() {
  const { searchResults, setSelectedFlight } = useContext(FlightContext);
  const navigate = useNavigate();

  const handleContinue = (flight) => {
    setSelectedFlight(flight);
    navigate('/passenger-details');
  };

  return (
    <div className="search-results">
      <h3>Search Results</h3>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((flight) => (
            <li key={flight.id}>
              Flight {flight.flight_number}: {flight.departure_city} to {flight.arrival_city} on {flight.departure_date} - ${flight.price}
              <button onClick={() => handleContinue(flight)}>Continue</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
}

export default SearchResults;
