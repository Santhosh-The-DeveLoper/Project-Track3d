import React from 'react';
import './DashBoard.css';
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="page">
      <div className="nav">
        <div className="right">
          <ul>
            <li><Link to="/fetchusers">Manage Users</Link></li>
            <li><Link to="/fetchmaterials">Manage Materials</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </div>
      </div>
      <div className="middle">
        <h3>Welcome Admin</h3>
        <br />
        <br />
        <h1>Construction Material Recommendation System</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;

