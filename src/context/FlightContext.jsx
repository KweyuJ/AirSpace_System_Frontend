import React, { createContext, useState } from 'react';

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState({});

  return (
    <FlightContext.Provider value={{ searchResults, setSearchResults, selectedFlight, setSelectedFlight, passengerDetails, setPassengerDetails }}>
      {children}
    </FlightContext.Provider>
  );
};

export default FlightContext;
