import React, { useContext } from 'react';
import { FlightContext } from '../context/FlightContext';

const Confirmation = () => {
    const { flights, searchParams, passengerDetails } = useContext(FlightContext);

    return (
        <div>
            <h2>Confirmation</h2>
            <div>
                <h3>Flight Details</h3>
                <h4>From: {searchParams.fromCity}</h4>
                <h4>To: {searchParams.toCity}</h4>
                <h4>Outbound Date: {searchParams.outboundDate}</h4>
                {searchParams.tripType === 'roundtrip' && (
                    <h4>Return Date: {searchParams.returnDate}</h4>
                )}
                <h4>Passengers: {searchParams.passengers}</h4>

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
            </div>

            <div>
                <h3>Passenger Details</h3>
                <p>Title: {passengerDetails.title}</p>
                <p>First Name: {passengerDetails.firstName}</p>
                <p>Last Name: {passengerDetails.lastName}</p>
                <p>Phone Number: {passengerDetails.phoneNumber}</p>
                <p>Email: {passengerDetails.email}</p>
                <p>More Details: {passengerDetails.moreDetails ? 'Yes' : 'No'}</p>
                <p>Subscribe: {passengerDetails.subscribe ? 'Yes' : 'No'}</p>
            </div>
        </div>
    );
};

export default Confirmation;
