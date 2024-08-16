import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

// Header Component
const Header = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  return (
    <header className="App-header">
      <p>Where Air Meets Escape</p>
      <form className="search-form" onSubmit={onSearchSubmit}>
        <input
          type="text"
          placeholder="Destination"
          value={searchQuery}
          onChange={onSearchChange}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

// MiddleSection Component
const MiddleSection = () => {
  return (
    <section className="middle-section">
      <h2>AirEscape with us and enjoy</h2>
      <div className="features">
        <div className="feature">
          <img
            src="/src/assets/feature1.png"
            alt="Quick And Easy Booking"
            className="feature-image"
          />
          <div className="feature-text">
            <h3>Quick And Easy Booking</h3>
            <p>
              Flight, hotel, activities, transfers: plan and book your whole
              trip in one place
            </p>
          </div>
        </div>
        <div className="feature">
        <img
            src="/src/assets/feature2.png"
            alt="Best Price Payments"
            className="feature-image"
          />
          <div className="feature-text">
            <h3>Best Price Payments</h3>
            <p>
              We'll refund you 2x the difference if you find our offers cheaper
              elsewhere
            </p>
          </div>
        </div>
        <div className="feature">
          <img
            src="/src/assets/feature3.png"
            alt="Vacation Guarantee"
            className="feature-image"
          />
          <div className="feature-text">
            <h3>Vacation Guarantee</h3>
            <p>
              Benefit from a replacement solution if there are any unforeseen
              events (health crisis, flight cancellations)
            </p>
          </div>
        </div>
        <div className="feature">
          <img
            src="/src/assets/feature4.png"
            alt="Payments Installments"
            className="feature-image"
          />
          <div className="feature-text">
            <h3>Payments Installments</h3>
            <p>
              Take advantage of our payment services and pay at your own pace
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// HotelSection Component
const HotelSection = ({ hotels }) => {
  return (
    <section className="hotel-section">
      <h2>Discover and book Hotels in Top Kenyan Destinations</h2>
      <div className="hotels-grid">
        {hotels.map((hotel) => (
          <div className="hotel-card" key={hotel.hotel_id}>
            <img src={hotel.image_url} alt={hotel.name} />
            <h3>{hotel.name}</h3>
            <p>{hotel.location}</p>
            <p>{hotel.amenities}</p>
            <p>Price per night: KES {hotel.price_per_night}</p>
            
            <Link to={`/hotels/${hotel.hotel_id}`}>
              <button type="button" className="view-button">
                View
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

const App = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("https://airspace-system-backend-4.onrender.com/hotels");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setHotels(data);
        setFilteredHotels(data); 
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = hotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredHotels(filtered);
  };

  return (
    <div className="App">
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <MiddleSection />
      <HotelSection hotels={filteredHotels} />
    </div>
  );
};

export default App;