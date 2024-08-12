import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FlightContext } from '../context/FlightContext';
import bookingImage from '../assets/booking.png'; // Import the image

const Flights = () => {
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [outboundDate, setOutboundDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [tripType, setTripType] = useState('oneway');
    const [passengers, setPassengers] = useState(1);

    const { setFlights, setSearchParams } = useContext(FlightContext);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://127.0.0.1:5000/flights', {
                params: {
                    from: fromCity,
                    to: toCity,
                    outboundDate,
                    returnDate: tripType === 'roundtrip' ? returnDate : '',
                    tripType,
                    passengers
                }
            });

            setFlights(response.data);
            setSearchParams({ fromCity, toCity, outboundDate, returnDate, tripType, passengers });
            navigate('/results');
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    // Inline style for the full-page background image
    const containerStyle = {
        backgroundImage: `url(${bookingImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
    };

    return (
        <div style={containerStyle}>
            <h2 className="flights-title">Search Flights</h2>
            <form onSubmit={handleSearch} className="flights-form">
                <div className="flights-form-group">
                    <label className="flights-label">Departure City:</label>
                    <input type="text" value={fromCity} onChange={(e) => setFromCity(e.target.value)} required className="flights-input" />
                </div>
                <div className="flights-form-group">
                    <label className="flights-label">Arrival City:</label>
                    <input type="text" value={toCity} onChange={(e) => setToCity(e.target.value)} required className="flights-input" />
                </div>
                <div className="flights-form-group">
                    <label className="flights-label">Departure Date:</label>
                    <input type="date" value={outboundDate} onChange={(e) => setOutboundDate(e.target.value)} required className="flights-input" />
                </div>
                {tripType === 'roundtrip' && (
                    <div className="flights-form-group">
                        <label className="flights-label">Return Date:</label>
                        <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required className="flights-input" />
                    </div>
                )}
                <div className="flights-form-group">
                    <label className="flights-label">Trip Type:</label>
                    <select value={tripType} onChange={(e) => setTripType(e.target.value)} className="flights-select">
                        <option value="oneway">One Way</option>
                        <option value="roundtrip">Round Trip</option>
                    </select>
                </div>
                <div className="flights-form-group">
                    <label className="flights-label">Passengers:</label>
                    <input type="number" value={passengers} onChange={(e) => setPassengers(e.target.value)} min="1" required className="flights-input" />
                </div>
                <button type="submit" className="flights-button">Find flights</button>
            </form>
        </div>
    );
};

export default Flights;
