import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li><Link to="/hotels-section">Manage Hotels</Link></li>
            <li><Link to="/admin/flights">Manage Flights</Link></li> 
            <li><Link to="/admin/users">Manage Users</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-main">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-content">
          <div className="dashboard-graphs">
            <h2>Statistics Overview</h2>
            {/* Line Chart */}
            <div className="graph-placeholder">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#b71c1c" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="uv" stroke="#3b92e4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Bar Chart */}
            <div className="graph-placeholder">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#b71c1c" />
                  <Bar dataKey="uv" fill="#3b92e4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
