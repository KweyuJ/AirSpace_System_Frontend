import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlightContext } from '../context/FlightContext'; // Correct import

const FlightResults = () => {
    const { flights, searchParams } = useContext(FlightContext);
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/passenger-details'); 
    };

    return (
        <div>
            <h2>Flight Results</h2>
            <h3>From: {searchParams.fromCity}</h3>
            <h3>To: {searchParams.toCity}</h3>
            <h3>Outbound Date: {searchParams.outboundDate}</h3>
            {searchParams.tripType === 'roundtrip' && (
                <h3>Return Date: {searchParams.returnDate}</h3>
            )}
            <h3>Passengers: {searchParams.passengers}</h3>

            <div>
                <h4>Outbound Flights</h4>
                {flights.outbound_flights.length > 0 ? (
                    <ul>
                        {flights.outbound_flights.map(flight => (
                            <li key={flight.flight_id}>
                                Flight Number: {flight.flight_number} - Departure Time: {flight.departure_time} - Arrival Time: {flight.arrival_time} - Price: {flight.price} KSH
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No outbound flights found.</p>
                )}
            </div>

            {searchParams.tripType === 'roundtrip' && (
                <div>
                    <h4>Return Flights</h4>
                    {flights.return_flights.length > 0 ? (
                        <ul>
                            {flights.return_flights.map(flight => (
                                <li key={flight.flight_id}>
                                    Flight Number: {flight.flight_number} - Departure Time: {flight.departure_time} - Arrival Time: {flight.arrival_time} - Price: {flight.price} KSH
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No return flights found.</p>
                    )}
                </div>
            )}
            <button onClick={handleContinue}>Continue</button>
        </div>
    );
};

export default FlightResults;
