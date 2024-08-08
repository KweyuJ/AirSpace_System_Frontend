import { useState, useEffect } from 'react';
import bookingImage from '../assets/booking.png'; 

const Flights = () => {
  const [tripType, setTripType] = useState('roundtrip');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/flights');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading flights: {error.message}</p>;

  return (
    <div className="flights-page" style={{ backgroundImage: `url(${bookingImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="booking-container">
        <div className="booking-form-container">
          <form className="booking-form">
            <div className="trip-type">
              <label>
                <input
                  type="radio"
                  name="trip"
                  value="roundtrip"
                  checked={tripType === 'roundtrip'}
                  onChange={handleTripTypeChange}
                />
                Roundtrip
              </label>
              <label>
                <input
                  type="radio"
                  name="trip"
                  value="oneway"
                  checked={tripType === 'oneway'}
                  onChange={handleTripTypeChange}
                />
                One-way
              </label>
            </div>
            <div className="form-group">
              <input type="text" placeholder="From" />
              <input type="text" placeholder="To" />
            </div>
            <div className="form-group">
              <input type="date" placeholder="DEPART" />
              {tripType === 'roundtrip' && <input type="date" placeholder="RETURN" />}
            </div>
            <div className="form-group">
              <input type="number" placeholder="PASSENGERS" min="1" />
            </div>
            <button type="submit" className="find-flights-button">Find Flights</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Flights;
