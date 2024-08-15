import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlane, FaHotel, FaPhone, FaInfoCircle, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'; // Import the CSS file for footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <div className="footer-links">
            <Link to="/" className="footer-link"><FaHome /> Home</Link>
            <Link to="/aboutus" className="footer-link"><FaInfoCircle /> About Us</Link>
            <Link to="/contactus" className="footer-link"><FaPhone /> Contact Us</Link>
            <Link to="/flights" className="footer-link"><FaPlane /> Flights</Link>
            <Link to="/hotels" className="footer-link"><FaHotel /> Hotels</Link>
          </div>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Social Media Links</h4>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
          </div>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Contact Info</h4>
          <div className="footer-info">
            <p>&copy; {new Date().getFullYear()} AirEScape. All rights reserved.</p>
            <p>Ngong road, Nairobi, Kenya</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
