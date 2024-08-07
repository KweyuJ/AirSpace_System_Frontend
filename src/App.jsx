import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaPlane, FaHotel, FaPhone, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import Home from './components/Home';
import Flights from './components/Flights';
import Hotels from './components/Hotels';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import SignUp from './components/SignUp';
import logo from './assets/logo.png';
import './index.css';

function App() {
  return (
    <div>
      <div className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <ul>
          <li>
            <Link to="/"><FaHome /> Home</Link>
          </li>
          <li>
            <Link to="/flights"><FaPlane /> Flights</Link>
          </li>
          <li>
            <Link to="/hotels"><FaHotel /> Hotels</Link>
          </li>
          <li className="contactUs">
            <Link to="/contactus"><FaPhone /> Contact us</Link>
          </li>
          <li>
            <Link to="/login"><FaSignInAlt /> Log in</Link>
          </li>
          <li>
            <Link to="/signup"><FaUserPlus /> Sign up</Link>
          </li>
        </ul>
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
