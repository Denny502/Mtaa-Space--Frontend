import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome to Your Dashboard</h1>
          <p>Hello, {user?.name || 'Renter'}! Manage your rental journey here.</p>
        </div>
        
        <div className="dashboard-content">
          <div className="welcome-section">
            <h2>Hello, {user?.role === 'agent' ? 'Agent' : 'Renter'}!</h2>
            <p>Welcome to your personal dashboard. Here you can manage your properties, favorites, and inquiries.</p>
          </div>
          
          <div className="dashboard-actions">
            <div className="action-card">
              <h3>Your Favorites</h3>
              <p>View and manage your favorite properties</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/favorites')}
              >
                View Favorites
              </button>
            </div>
            
            <div className="action-card">
              <h3>Browse Rentals</h3>
              <p>Find your next home</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/rentals')}
              >
                Browse Properties
              </button>
            </div>
            
            <div className="action-card">
              <h3>Your Inquiries</h3>
              <p>Check your messages with agents</p>
              <button className="btn btn-outline">View Messages</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;