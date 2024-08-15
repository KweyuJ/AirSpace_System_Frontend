import React, { createContext, useState } from 'react';

// Create the context
export const FlightContext = createContext();

// Create a provider component
export const FlightProvider = ({ children }) => {
    const [flights, setFlights] = useState({ outbound_flights: [], return_flights: [] });
    const [searchParams, setSearchParams] = useState({});
    const [passengerDetails, setPassengerDetails] = useState({});

    return (
        <FlightContext.Provider value={{ flights, setFlights, searchParams, setSearchParams, passengerDetails, setPassengerDetails }}>
            {children}
        </FlightContext.Provider>
    );
};
