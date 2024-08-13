import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

const SingleHotelPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        setError("Failed to load hotel data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  if (!hotel) {
    return <div>Hotel not found.</div>;
  }

  return (
    <div className="container">
      <div className="hotel-header">
        <img src={hotel.image_url} alt={hotel.name} className="hotel-image" />
      </div>
      <div className="hotel-details">
        <h1>{hotel.name}</h1>
        <p>{hotel.price}</p>
        <div className="hotel-description">
          <p>{hotel.description}</p>
        </div>
        <div className="deal-container">
          <div className="deal-box">
            <h2>Deal negotiated for you</h2>
            <ul>
              <li>🛏️ Stay in a Standard Room</li>
              <li>🍽️ Breakfast</li>
              <li>✈️ Flights departing from the city of your choice</li>
              <li>
                🚕 Round-trip airport/hotel transfer available for an extra charge
              </li>
            </ul>
          </div>
          <div className="stay-box">
            <h2>Your stay starts here</h2>
            <h3>{hotel.name}</h3>
            <p>🌟 {hotel.reviews}</p>
            <p>{hotel.amenities}</p>
          </div>
        </div>
        <div className="btn-block">
          <Link to="/hotels" className="go-back-button">GO BACK</Link>
          <button
            className="book-now-button"
            onClick={() => navigate(`/hotels/${id}/book`)} >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleHotelPage;
