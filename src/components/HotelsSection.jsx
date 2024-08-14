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
  const [alert, setAlert] = useState(null); // State for alert messages

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
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No token found. Please log in.');
      setAlert({ type: 'error', message: 'No token found. Please log in.' });
      setTimeout(() => setAlert(null), 3000);
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/hotels', {
        name: newHotel.name,
        location: newHotel.location,
        price_per_night: parseFloat(newHotel.price_per_night),
        image_url: newHotel.image_url,
        amenities: newHotel.amenities
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setHotels([...hotels, response.data]);
      setNewHotel({
        name: '',
        location: '',
        price_per_night: '',
        image_url: '',
        amenities: ''
      });
      setAlert({ type: 'success', message: 'Hotel added successfully!' });
      setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
    } catch (error) {
      console.error('Error adding hotel:', error);
      if (error.response && error.response.status === 403) {
        setAlert({ type: 'error', message: 'Admin access required to add hotel.' });
      } else {
        setAlert({ type: 'error', message: 'Error adding hotel.' });
      }
      setTimeout(() => setAlert(null), 3000);
    }
  };
  

  const handleDeleteHotel = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('No token found. Please log in.');
        setAlert({ type: 'error', message: 'No token found. Please log in.' });
        setTimeout(() => setAlert(null), 3000);
        return;
      }
      const response = await axios.delete(`http://127.0.0.1:5000/hotels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        setHotels(hotels.filter(hotel => hotel.hotel_id !== id));
        setAlert({ type: 'success', message: 'Hotel deleted successfully!' });
      } else {
        console.error('Failed to delete hotel:', response.data);
        setAlert({ type: 'error', message: 'Failed to delete hotel.' });
      }
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Error deleting hotel:', error);
      if (error.response && error.response.status === 403) {
        setAlert({ type: 'error', message: 'Admin access required to delete hotel.' });
      } else {
        setAlert({ type: 'error', message: 'Error deleting hotel.' });
      }
      setTimeout(() => setAlert(null), 3000);
    }
  };
  
  
  
  


  const handleUpdateHotel = async () => {
    if (!editingHotel || !editingHotel.hotel_id) {
      console.error('No hotel selected for editing or invalid hotel ID.');
      return;
    }

    try {
      const response = await axios.patch(`http://127.0.0.1:5000/hotels/${editingHotel.hotel_id}`, {
        name: editingHotel.name,
        location: editingHotel.location,
        price_per_night: parseFloat(editingHotel.price_per_night),
        image_url: editingHotel.image_url,
        amenities: editingHotel.amenities
      });
      setHotels(hotels.map(hotel => (hotel.hotel_id === editingHotel.hotel_id ? response.data : hotel)));
      setEditingHotel(null);
      setAlert({ type: 'success', message: 'Hotel updated successfully!' });
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Error updating hotel:', error);
      setAlert({ type: 'error', message: 'Error updating hotel.' });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const startEditing = (hotel) => {
    if (hotel && hotel.hotel_id) {
      setEditingHotel({ ...hotel });
    } else {
      console.error('Invalid hotel object for editing:', hotel);
    }
  };

  const cancelEditing = () => {
    setEditingHotel(null);
  };

  return (
    <div className="hotels-container">
      <h2>Manage Hotels</h2>
      {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}
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
          <div className="hotel-card" key={hotel.hotel_id}>
            {editingHotel && editingHotel.hotel_id === hotel.hotel_id ? (
              <div className="edit-form-container">
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
                <button className="cancel-button" onClick={cancelEditing}>Cancel</button>
              </div>
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
                  <button onClick={() => startEditing(hotel)}>UPDATE</button>
                  <button onClick={() => handleDeleteHotel(hotel.hotel_id)}>DELETE</button>
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
