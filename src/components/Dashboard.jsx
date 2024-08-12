// Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li><Link to="/hotels-section">Manage Hotels</Link></li>
            <li><Link to="/admin/flights">Manage Flights</Link></li> {/* Updated Link */}
            <li><Link to="/admin/users">Manage Users</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-main">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-content">
          {/* Placeholder for graphs */}
          <div className="dashboard-graphs">
            <h2>Statistics Overview</h2>
            <div className="graph-placeholder">Graph 1</div>
            <div className="graph-placeholder">Graph 2</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
