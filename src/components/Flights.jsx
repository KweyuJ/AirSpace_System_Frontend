import { useState } from 'react';


const Flights = () => {
  const [tripType, setTripType] = useState('roundtrip');

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  return (
    <div className="booking-container">
      {/* <nav className="navbar">
        <div className="navbar-logo">
         <img src="src/assets/logo.png" />
        </div>
        <div className="navbar-title">
          <h2>FLIGHTS</h2>
        </div>
      </nav> */}
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
            <input type="number" placeholder="PASSENGERS" />
          </div>
        </form>
        <div>
        <button type="submit">Find Flights </button>
        </div>
        
      </div>
    </div>
  );
};

export default Flights;