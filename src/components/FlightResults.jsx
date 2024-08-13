import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlightContext } from '../context/FlightContext';
import '../index.css'; // Import the CSS file

const FlightResults = () => {
    const { flights, searchParams } = useContext(FlightContext);
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/passenger-details'); 
    };

    return (
        <div className="flight-results">
            <h2 className='results'>Flight Results</h2>
            <div className="flight-summary">
                
                <h3>Outbound Date: {searchParams.outboundDate}</h3>
                {searchParams.tripType === 'roundtrip' && (
                    <h3>Return Date: {searchParams.returnDate}</h3>
                )}
                <h3>Passengers: {searchParams.passengers}</h3>
            </div>

            <div className="flight-results-box">
    <h4>Outbound Flights:</h4>
    {flights.outbound_flights.length > 0 ? (
        <ul className="flight-list">
            {flights.outbound_flights.map(flight => (
                <><li key={flight.flight_id} className="flight-card">
                    <div className="flight-info">
                        <p className="outbound-flight">
                             {flight.departure_city} - {flight.arrival_city}
                        
                        </p>
                        <div className="flight-timing">
                            <span className="departure-time">{flight.departure_time}</span>
                            <span className="arrow">→</span>
                            <span className="arrival-time">{flight.arrival_time}</span>
                            <span className="flight-number">{flight.flight_number}</span>
                        </div>
                    </div>
                    <div className="price-and-continue">
                        <button className="price-button">
                            KES {flight.price}
                        </button>

                    </div>

                </li><button onClick={handleContinue} className="continue-button">
                        Continue
                    </button></>
            ))}
        </ul>
    ) : (
        <p>No outbound flights found.</p>
    )}
</div>


            {searchParams.tripType === 'roundtrip' && (
                <div>
                    <h4>Return Flights:</h4>
                    {flights.return_flights.length > 0 ? (
                        <ul className="flight-list">
                            {flights.return_flights.map(flight => (
                                <li key={flight.flight_id} className="flight-card">
                                    <div className="flight-info">
                                        <p className="outbound-flight">
                                             {flight.departure_city} - {flight.arrival_city}
                                            
                                        </p>
                                        <div className="flight-timing">
                                            <span className="departure-time">{flight.departure_time}</span>
                                            <span className="arrow">→</span>
                                            <span className="arrival-time">{flight.arrival_time}</span>
                                            <span className="flight-number">{flight.flight_number}</span>
                                        </div>
                                    </div>
                                    <div >
                                        <button className="price-button">
                                            KES {flight.price}
                                        </button>
                                        
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No return flights found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default FlightResults;
