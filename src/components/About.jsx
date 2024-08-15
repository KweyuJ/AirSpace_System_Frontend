import React from 'react';
import "./Aboutus.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import MissionImage from '../assets/mission.jpg';
import VisionImage from '../assets/vision.jpg';
import StoryImage from '../assets/story.jpg';
import WhatWeOfferImage from '../assets/what-we-offer.jpg'; 
import JoinUsImage from '../assets/join-us.jpg'; 
import WhyChooseImage from '../assets/why-choose.jpg'; 
import AboutUsHeaderImage from '../assets/about-us-header.jpg'; 

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <div className="about-us-header">
        <img src={AboutUsHeaderImage} alt="AirEscape" className="about-us-header-image" />
        <div className="header-section">
          <h1>About Us</h1>
          <p>Welcome to AirEscape, your go-to platform for seamless and hassle-free travel booking.</p>
        </div>
      </div>

      <div className="middle-section">
        <div className="mission-vision-story-section">
          <div className="mission">
            <img src={MissionImage} alt="Our Mission" className="section-image" />
            <h2>Our Mission</h2>
            <p>At AirEscape, our mission is to revolutionize the way people travel.</p>
          </div>
          <div className="vision">
            <img src={VisionImage} alt="Our Vision" className="section-image" />
            <h2>Our Vision</h2>
            <p>Our vision is to be the leading travel booking platform recognized for innovation.</p>
          </div>
          <div className="story">
            <img src={StoryImage} alt="Our Story" className="section-image" />
            <h2>Our Story</h2>
            <p>Founded in 2024, AirEscape started as a small startup with a vision to change the world.</p>
          </div>
        </div>

        <div className="three-sections-row">
          <div className="what-we-offer">
            <img src={WhatWeOfferImage} alt="What We Offer" className="section-image" />
            <div className="section-content">
              <h2>What We Offer</h2>
              <ul>
                <li>Comprehensive Travel Solutions</li>
                <li>User-Friendly Interface</li>
                <li>Personalized Recommendations</li>
                <li>Real-Time Notifications</li>
                <li>Secure and Reliable</li>
              </ul>
            </div>
          </div>

          <div className="why-choose">
            <img src={WhyChooseImage} alt="Why Choose AirEscape" className="section-image" />
            <div className="section-content">
              <h2>Why Choose AirEscape?</h2>
              <p>Choosing <span className="highlight">AirEscape</span> means choosing convenience, reliability, and exceptional service.</p>
            </div>
          </div>

          <div className="join-us">
            <img src={JoinUsImage} alt="Join Us on Our Journey" className="section-image" />
            <div className="section-content">
              <h2>Join Us on Our Journey</h2>
              <p>We invite you to join us on this exciting journey and be a part of our mission to transform travel.</p>
            </div>
          </div>
        </div>
      </div> {/* Closing middle-section div */}

    </div>
  );
};

export default AboutUs;
