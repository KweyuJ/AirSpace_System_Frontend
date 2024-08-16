import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaHotel, FaUserShield } from 'react-icons/fa';
import homeImage from '../assets/plane.png';
import feature1 from '../assets/feature1.png';
import feature2 from '../assets/feature2.png';
import feature3 from '../assets/feature3.png';
import feature4 from '../assets/feature4.png';
import diani from '../assets/diani2.jpeg';
import lamu from '../assets/lamu.jpeg';
import kilifi from '../assets/kilifi2.jpeg';
import kakamega from '../assets/kakamega2.jpeg';
import malindi from '../assets/malindi2.jpeg';
import naivasha from '../assets/naivasha2.jpeg';
import '../index.css';


function Home() {
  const isAuthenticated = !!localStorage.getItem('access_token');
  const isAdmin = localStorage.getItem('role') === 'admin';

  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="home-header-section">
        <img src={homeImage} alt="Home" className="home-full-screen-image" />
        <div className="home-welcome-text">
          AirEscape, your gateway to the great
        </div>
        <div className="home-icon-container">
          {isAuthenticated && isAdmin && (
            <div className="home-icon-box">
              <Link to="/dashboard" className="home-icon-link">
                {/* <FaUserShield className="home-icon" /> */}
                {/* <p className="home-icon-text">Admin Dashboard</p> */}
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Middle Section */}
      <section className="home-middle-section">
        <h2>Your dream vacation starts here</h2>
        <div className="home-features">
          <div className="home-feature">
            <img
              src={feature1}
              alt="Quick And Easy Booking"
              className="home-feature-image"
            />
            <div className="home-feature-text">
              <h3>Quick And Easy Booking</h3>
              <p>
                Flight, hotel, activities, transfers: plan and book your whole trip in one place.
              </p>
            </div>
          </div>
          <div className="home-feature">
            <img
              src={feature2}
              alt="Best Price Payments"
              className="home-feature-image"
            />
            <div className="home-feature-text">
              <h3>Best Price Payments</h3>
              <p>
                We'll refund you 2x the difference if you find our offers cheaper elsewhere.
              </p>
            </div>
          </div>
          <div className="home-feature">
            <img
              src={feature3}
              alt="Vacation Guarantee"
              className="home-feature-image"
            />
            <div className="home-feature-text">
              <h3>Vacation Guarantee</h3>
              <p>
                Benefit from a replacement solution if there are any unforeseen events (health crisis, flight cancellations).
              </p>
            </div>
          </div>
          <div className="home-feature">
            <img
              src={feature4}
              alt="Payments Installments"
              className="home-feature-image"
            />
            <div className="home-feature-text">
              <h3>Payments Installments</h3>
              <p>
                Take advantage of our payment services and pay at your own pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="home-bottom-section">
        <h3>Top Flight Destinations</h3>
        <div className="home-destination-images">
          <div className="destination-card">
            <img src={diani} alt="Diani" />
            <div className="destination-card-content">
              <h4>Diani</h4>
              <p>Beautiful beaches and vibrant marine life.</p>
            </div>
          </div>
          <div className="destination-card">
            <img src={lamu} alt="Lamu" />
            <div className="destination-card-content">
              <h4>Lamu</h4>
              <p>Historic town with stunning Swahili architecture.</p>
            </div>
          </div>
          <div className="destination-card">
            <img src={kilifi} alt="Kilifi" />
            <div className="destination-card-content">
              <h4>Kilifi</h4>
              <p>Perfect spot for relaxation and water sports.</p>
            </div>
          </div>
          <div className="destination-card">
            <img src={kakamega} alt="Kakamega" />
            <div className="destination-card-content">
              <h4>Kakamega</h4>
              <p>Explore the lush Kakamega Forest and rich wildlife.</p>
            </div>
          </div>
          <div className="destination-card">
            <img src={malindi} alt="Malindi" />
            <div className="destination-card-content">
              <h4>Malindi</h4>
              <p>Beautiful coral reefs and historic sites.</p>
            </div>
          </div>
          <div className="destination-card">
            <img src={naivasha} alt="Naivasha" />
            <div className="destination-card-content">
              <h4>Naivasha</h4>
              <p>Scenic lake and rich birdlife.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
