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
        <p>Welcome to AirEscape, your go-to platform for seamless and hassle-free travel booking.
           We simplify your travel experience by offering an integrated solution for booking flights, hotels, and holiday packages all in one place. 
           With AirEscape, say goodbye to fragmented platforms and hello to a streamlined travel experience.
        </p>
      </div>

      <div className="mission-vision-section">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
          At AirEscape, our mission is to revolutionize the way people travel. 
          We are committed to providing an intuitive and comprehensive platform that empowers travelers to book flights and accommodations effortlessly, ensuring that every journey begins and ends with satisfaction and peace of mind.
          We aim to make travel accessible, enjoyable, and memorable for everyone.


          </p>
        </div>
        <div className="vision">
          <h2>Our Vision</h2>
          <p>
          Our vision is to be the leading travel booking platform recognized for innovation, reliability, and user satisfaction.
          We strive to transform the travel industry by offering state-of-the-art technology and personalized services that cater to each traveler's unique needs. 
          Our goal is to create a future where travel is not just a necessity but a delightful experience that enriches lives and connects the world.
          </p>
        </div>
      </div>

      

      <div className="history-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2024, AirEscape started as a small startup with a vision to change the world.
          Over the year, we have grown into a global company with a reputation for excellence and innovation.
        </p>
        <ul className="timeline">
          <li>
            <span>2024</span> - Our inception year: <p>Founded in 2024, AirEscape was born from the desire to eliminate the frustrations travelers face when booking flights and accommodations. What started as a small startup has quickly evolved into a global platform dedicated to enhancing the travel experience.

</p>
          </li>
          <li>
            <span>2024</span> - Expanded globally: <p>In the same year, our innovative approach and user-friendly interface allowed us to expand our services globally, reaching millions of travelers and establishing a reputation for excellence and trustworthiness.

</p>
          </li>
        </ul>
      </div>
      <div>
      <section className="offer-section">
        <h2>What We Offer</h2>
        <ul>
          <li>Comprehensive Travel Solutions: Book flights, hotels, and holiday packages all from a single platform.</li>
          <li>User-Friendly Interface: Experience a seamless and intuitive booking process designed with the user in mind.</li>
          <li>Personalized Recommendations: Receive tailored suggestions based on your preferences and travel history.</li>
          <li>Real-Time Notifications: Stay updated with real-time alerts and notifications for all your bookings and travel plans.</li>
          <li>Secure and Reliable: Our platform ensures the highest security standards to protect your data and provide a trustworthy experience.</li>
        </ul>
      </section>

      <section className="why-section">
        <h2>Why Choose AirEscape?</h2>
        <p>
          Choosing <span className="highlight">AirEscape</span> means choosing convenience, reliability, and exceptional service. Our dedicated team of experts is always here to assist you, ensuring that your travel plans are executed flawlessly. With AirEscape, every booking is a step towards a perfect journey.
        </p>
      </section>

      <section className="join-section">
        <h2>Join Us on Our Journey</h2>
        <p>
          We invite you to join us on this exciting journey as we continue to innovate and redefine the travel experience. Discover a new world of travel possibilities with AirEscape, where every trip is a new adventure.
        </p>
      </section>
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