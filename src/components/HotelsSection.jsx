import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HotelsSection.css'; // Import the CSS file

const HotelsSection = () => {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({
    name: '',
    location: '',
    price_per_night: '',
    image_url: '',
    amenities: ''
  });
  const [editingHotel, setEditingHotel] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/hotels');
      if (Array.isArray(response.data)) {
        setHotels(response.data);
      } else {
        console.error('Invalid data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleAddHotel = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/hotels', newHotel);
      setHotels([...hotels, response.data]);
      setNewHotel({
        name: '',
        location: '',
        price_per_night: '',
        image_url: '',
        amenities: ''
      });
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  };

  const handleDeleteHotel = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/hotels/${id}`);
      setHotels(hotels.filter(hotel => hotel.id !== id));
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  const handleUpdateHotel = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/hotels/${editingHotel.id}`, editingHotel);
      setHotels(hotels.map(hotel => hotel.id === editingHotel.id ? response.data : hotel));
      setEditingHotel(null);
    } catch (error) {
      console.error('Error updating hotel:', error);
    }
  };

  const startEditing = (hotel) => {
    setEditingHotel(hotel);
  };

  const cancelEditing = () => {
    setEditingHotel(null);
  };

  return (
    <div className="hotels-container">
      <h2>Manage Hotels</h2>
      <div className="form-container">
        <h3>Add a New Hotel</h3>
        <input
          type="text"
          placeholder="Name"
          value={newHotel.name}
          onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newHotel.location}
          onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price per night"
          value={newHotel.price_per_night}
          onChange={(e) => setNewHotel({ ...newHotel, price_per_night: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newHotel.image_url}
          onChange={(e) => setNewHotel({ ...newHotel, image_url: e.target.value })}
        />
        <input
          type="text"
          placeholder="Amenities (comma-separated)"
          value={newHotel.amenities}
          onChange={(e) => setNewHotel({ ...newHotel, amenities: e.target.value })}
        />
        <button onClick={handleAddHotel}>Add Hotel</button>
      </div>
      <div className="hotels-list">
        {Array.isArray(hotels) && hotels.map(hotel => (
          <div className="hotel-card" key={hotel.id}>
            {editingHotel && editingHotel.id === hotel.id ? (
              <>
                <input
                  type="text"
                  value={editingHotel.name}
                  onChange={(e) => setEditingHotel({ ...editingHotel, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editingHotel.location}
                  onChange={(e) => setEditingHotel({ ...editingHotel, location: e.target.value })}
                />
                <input
                  type="number"
                  value={editingHotel.price_per_night}
                  onChange={(e) => setEditingHotel({ ...editingHotel, price_per_night: e.target.value })}
                />
                <input
                  type="text"
                  value={editingHotel.image_url}
                  onChange={(e) => setEditingHotel({ ...editingHotel, image_url: e.target.value })}
                />
                <input
                  type="text"
                  value={editingHotel.amenities}
                  onChange={(e) => setEditingHotel({ ...editingHotel, amenities: e.target.value })}
                />
                <button onClick={handleUpdateHotel}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                <img src={hotel.image_url} alt={hotel.name} className="hotel-image" />
                <div className="hotel-info">
                  <h4>{hotel.name}</h4>
                  <p>{hotel.location}</p>
                  <p>KSH{hotel.price_per_night} per night</p>
                  <p><strong>Amenities:</strong> {hotel.amenities}</p>
                </div>
                <div className="hotel-actions">
                  <button onClick={() => startEditing(hotel)}>Edit</button>
                  <button onClick={() => handleDeleteHotel(hotel.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelsSection;
