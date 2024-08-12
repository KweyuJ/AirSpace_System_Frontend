import React, { useContext } from 'react';
import { FlightContext } from '../context/FlightContext';
import "../index.css";

const Confirmation = () => {
    const { flights, searchParams, passengerDetails } = useContext(FlightContext);

    return (
        <div className="confirmation-container">
            <h2>Confirmation</h2>

            <div className="flight-details-2">
                <h3>Flights:</h3>
                {flights.outbound_flights.map((flight, index) => (
                    <div key={index} className="flight-box">
                        <div className="flight-info-2">
                            <div>
                                <h4>{flight.departure_time}</h4>
                                <p>{searchParams.fromCity} | {searchParams.outboundDate}</p>
                            </div>
                            <div>
                                <h4>{flight.arrival_time}</h4>
                                <p>non-stop</p>
                            </div>
                            <div>
                                <h4>{flight.flight_number}</h4>
                            </div>
                            <div className="price-tag">
                                <h4>KES {flight.price}</h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="traveler-details">
                <h3>Traveler details:</h3>
                <div className="traveler-box">
                    <div className="traveler-info">
                        <p>Name: {passengerDetails.title} {passengerDetails.firstName} {passengerDetails.lastName}</p>
                        <p>Phone: {passengerDetails.phoneNumber}</p>
                        <p>Email: {passengerDetails.email}</p>
                        <p className="total">TOTAL: 22,340</p>
                    </div>
                </div>
            </div>

            <div className="payment-option">
                <button className="mpesa-button">Pay with MPESA</button>
            </div>
        </div>
    );
};

export default Confirmation;

