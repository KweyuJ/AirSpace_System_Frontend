import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FaHome, FaPlane, FaHotel, FaPhone, FaSignInAlt, FaUserPlus, FaInfoCircle } from 'react-icons/fa';
import Home from './components/Home';
import Flights from './components/Flights';
import Hotels from './components/Hotels';
import SingleHotelPage from "./components/SingleHotel"
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AboutUs from './components/About';
import HotelReservationForm from './components/Hotelreservationform'; 
import logo from './assets/logo.png';
import './index.css';

function App() {
  const navigate = useNavigate();

  function handleSignOut() {
    console.log('Signing out...');
    localStorage.removeItem('access_token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    console.log('Redirecting to home page...');
    navigate('/');
  }

  return (
    <div>
      <nav>
        <img src={logo} alt="Logo" className="logo" />
        <ul>
          <li>
            <Link to="/"><FaHome /> Home</Link>
          </li>
          <li>
            <Link to="/aboutus"><FaInfoCircle /> About Us</Link> 
          </li>
          <li>
            <Link to="/flights"><FaPlane /> Flights</Link>
          </li>
          <li>
            <Link to="/hotels"><FaHotel /> Hotels</Link>
          </li>
          <li className="contactUs">
            <Link to="/contactus"><FaPhone /> Contact Us</Link>
          </li>
          <li>
            <Link to="/login"><FaSignInAlt /> Log In</Link>
          </li>
          <li>
            <Link to="/signup"><FaUserPlus /> Sign Up</Link>
          </li>
          <li>
            <a href="#sign-out" onClick={handleSignOut}><FaSignInAlt /> Sign Out</a>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<SingleHotelPage />} />
          <Route path="/hotels/:id/book" element={<HotelReservationForm />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
