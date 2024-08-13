import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPlane,
  FaHotel,
  FaPhone,
  FaSignInAlt,
  FaUserPlus,
  FaInfoCircle,
} from "react-icons/fa";
import Home from "./components/Home";
import Flights from "./components/Flights";
import Hotels from "./components/Hotels";
import SingleHotelPage from "./components/SingleHotel";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AboutUs from "./components/About";
import PassengerDetails from "./components/PassengerDetails";
import Confirmation from "./components/Confirmation";
import HotelReservationForm from "./components/Hotelreservationform";
import logo from "./assets/logo.png";
import "./index.css";
import { FlightProvider } from "./context/FlightContext";
import FlightResults from "./components/FlightResults";
import Dashboard from "./components/Dashboard";
import HotelsSection from "./components/HotelsSection";
import FlightSection from "./components/FlightSection";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";  // Import the new AdminRoute component
import Generateformpdf from './components/Generateformpdf'; 

function App() {
  const navigate = useNavigate();

  function handleSignOut() {
    console.log("Signing out...");
    localStorage.removeItem("access_token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    console.log("Redirecting to home page...");
    navigate("/");
  }

  return (
    <FlightProvider>
      <div>
        <nav className="navbar">
          <img src={logo} alt="Logo" className="logo" />
          <ul>
            <li>
              <Link to="/">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/aboutus">
                <FaInfoCircle /> About Us
              </Link>
            </li>
            <li className="contactUs">
              <Link to="/contactus">
                <FaPhone /> Contact Us
              </Link>
            </li>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Log In
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <FaUserPlus /> Sign Up
              </Link>
            </li>
            <li>
              <a href="#sign-out" onClick={handleSignOut}>
                <FaSignInAlt /> Sign Out
              </a>
            </li>
            {/* <li>
              <Link to="/dashboard">
                <FaUserPlus /> Admin Dashboard
              </Link>
            </li> */}
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/results" element={<FlightResults />} />
            <Route path="/passenger-details" element={<PassengerDetails />} />
            <Route path="/confirmation" element={<Confirmation />} />

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/hotels-section" element={<HotelsSection />} />
              <Route path="/admin/flights" element={<FlightSection />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/flights" element={<Flights />} />
              <Route path="/hotels" element={<Hotels />} />
            </Route>

            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/hotels/:id" element={<SingleHotelPage />} />
            <Route path="/hotels/:id/book" element={<HotelReservationForm />} />
            <Route path="/pdf-view" element={<Generateformpdf />} /> 
          </Routes>
        </main>
      </div>
    </FlightProvider>
  );
}

export default App;
