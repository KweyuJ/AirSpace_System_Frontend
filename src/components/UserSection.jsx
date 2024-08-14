import React, { useState, useEffect } from 'react';
import './UserSection.css';

const UserSection = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('access_token'); // Retrieve token from local storage

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in headers
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.error('Unauthorized: Token might be expired or invalid.');
          } else if (response.status === 403) {
            console.error('Forbidden: Admin access required.');
          } else {
            console.error('Error fetching users:', response.statusText);
          }
          throw new Error('Error fetching users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="user-section">
      <h2>Manage Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserSection;
