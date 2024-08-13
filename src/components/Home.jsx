import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaHotel, FaUserShield } from 'react-icons/fa'; // FaUserShield for admin icon
import homeImage from '../assets/landingpage.png';
import '../index.css';

function Home() {
  const isAuthenticated = !!localStorage.getItem('access_token'); // Check for token
  const isAdmin = localStorage.getItem('role') === 'admin'; // Check if user is an admin

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
            {isAdmin && (
              <div className="icon-box">
                <Link to="/dashboard" className="icon-link">
                  <FaUserShield className="home-icon" />
                  <p className="icon-text">Admin Dashboard</p>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;