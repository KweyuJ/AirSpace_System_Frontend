// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaHotel } from 'react-icons/fa';
import homeImage from '../assets/landingpage.png';
import '../index.css'; // Ensure your CSS is imported

function Home() {
  const isAuthenticated = !!localStorage.getItem('access_token'); // Check for token in local storage

  return (
    <div className="home">
      <img src={homeImage} alt="Home" className="full-screen-image" />
      <div className="icon-container">
        {isAuthenticated && (
          <>
            <div className="icon-box">
              <Link to="/flights" className="icon-link">
                <FaPlane className="home-icon" />
                <p className="icon-text">AirEscape Flights</p>
              </Link>
            </div>
            <div className="icon-box">
              <Link to="/hotels" className="icon-link">
                <FaHotel className="home-icon" />
                <p className="icon-text">AirEscape Hotels</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
