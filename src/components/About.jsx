import React from 'react';
// import './About.css'

import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const teamMembers = [
  { name: 'Joy Kweyu', position: 'Team Lead'},
  { name: 'Ian Njau'},
  { name: 'Charles Mumo'},
  { name: 'Stacy Kimilu'},
  { name: 'Erick Ndirangu'},
  { name: 'Wyclife Munyes'}
];

const AboutUs = () => {
  return (
    <div className="about-container">
  <div className="header-section">
    <h1>About Us</h1>
    <p>Welcome to AirEscape, your go-to platform for seamless and hassle-free travel booking.</p>
  </div>
  
  <div className="mission-vision-section">
    <div className="mission">
      <h2>Our Mission</h2>
      <p>At AirEscape, our mission is to revolutionize the way people travel.</p>
    </div>
    <div className="vision">
      <h2>Our Vision</h2>
      <p>Our vision is to be the leading travel booking platform recognized for innovation.</p>
    </div>
  </div>
  
  <div className="history-section">
    <h2>Our Story</h2>
    <p>Founded in 2024, AirEscape started as a small startup with a vision to change the world.</p>
    <ul className="timeline">
      <li><span>2024</span> - Our inception year: <p>Founded in 2024, AirEscape was born from the desire.</p></li>
    </ul>
  </div>
  
  <div className="offer-section">
    <h2>What We Offer</h2>
    <ul>
      <li>Comprehensive Travel Solutions</li>
      <li>User-Friendly Interface</li>
      <li>Personalized Recommendations</li>
      <li>Real-Time Notifications</li>
      <li>Secure and Reliable</li>
    </ul>
  </div>
  
  <div className="why-section">
    <h2>Why Choose AirEscape?</h2>
    <p>Choosing <span className="highlight">AirEscape</span> means choosing convenience, reliability...</p>
  </div>
  
  <div className="join-section">
    <h2>Join Us on Our Journey</h2>
    <p>We invite you to join us on this exciting journey...</p>
  </div>
  
  <div className="contact-section">
    <h2>Contact Us</h2>
    <div className="contact-info">
      <div className="contact-item">
        <FaPhone className="contact-icon" />
        <p>+254 712 345 678</p>
      </div>
      <div className="contact-item">
        <FaEnvelope className="contact-icon" />
        <p>info@AirEscape.com</p>
      </div>
      <div className="contact-item">
        <FaMapMarkerAlt className="contact-icon" />
        <p>AirEscape Airlines Headquarters, Nairobi, Kenya</p>
      </div>
    </div>
    <div className="social-media">
      <a href="https://facebook.com/AirEscape.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a href="https://twitter.com/AirEscape.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
      <a href="https://instagram.com/AirEscape.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a href="https://linkedin.com/company/AirEscape.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </a>
    </div>
  </div>
</div>

  );
};

export default AboutUs;