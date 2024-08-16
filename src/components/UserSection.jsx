import React, { useState, useEffect } from 'react';
import './UserSection.css';

const UserSection = () => {
  const [users, setUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://airspace-system-backend-4.onrender.com/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          console.error('Error fetching users:', response.statusText);
          throw new Error('Error fetching users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setAlertMessage('No token found. Please log in.');
      setAlertType('error');
      return;
    }

    try {
      const response = await fetch(`https://airspace-system-backend-4.onrender.com/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setUsers(users.filter(user => user.user_id !== userId));
        setAlertMessage('User deleted successfully!');
        setAlertType('success');
      } else {
        console.error('Failed to delete user:', response.statusText);
        setAlertMessage('Failed to delete user.');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setAlertMessage('Error deleting user.');
      setAlertType('error');
    }
  };

  return (
    <div className="user-section">
      <h2>Manage Users</h2>
      {alertMessage && (
        <div className={`alert ${alertType}`}>
          {alertMessage}
        </div>
      )}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button 
                    className="user-delete-button" 
                    onClick={() => handleDeleteUser(user.user_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserSection;
