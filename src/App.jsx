import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Flights from './components/Flights';
import Hotels from './components/Hotels';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import logo from './assets/logo.png';

function App() {
  return (
    <div>
      <nav>
        <img src={logo} alt="Logo" className="logo" />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/flights">Flights</Link>
          </li>
          <li>
            <Link to="/hotels">Hotels</Link>
          </li>
          <li>
            <Link to="/contactus">Contact us</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
