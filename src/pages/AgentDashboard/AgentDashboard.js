import React from 'react';
import './AgentDashboard.css';
import AgentHeader from '../../components/Header/AgentHeader';
import PropertyManagement from '../../components/Property/PropertyManagement';
import PropertyForm from '../../components/Property/PropertyForm';

const AgentDashboard = () => {
  return (
    <div className="agent-dashboard">
      <AgentHeader />
      <div className="container">
        <div className="dashboard-content">
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Properties</h3>
              <p className="stat-number">12</p>
            </div>
            <div className="stat-card">
              <h3>Active Listings</h3>
              <p className="stat-number">8</p>
            </div>
            <div className="stat-card">
              <h3>Total Views</h3>
              <p className="stat-number">1,245</p>
            </div>
            <div className="stat-card">
              <h3>Messages</h3>
              <p className="stat-number">23</p>
            </div>
          </div>
          
          <div className="dashboard-sections">
            <section className="dashboard-section">
              <PropertyManagement />
            </section>
            
            <section className="dashboard-section">
              <PropertyForm />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;