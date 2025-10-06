import React from 'react';
import './PropertyManagement.css';

const PropertyManagement = () => {
  const agentProperties = [
    {
      id: 1,
      title: "2-Bedroom Apartment in Westlands",
      price: "KSh 85,000/month",
      status: "Active",
      views: 245,
      location: "Westlands, Nairobi"
    },
    {
      id: 2,
      title: "3-Bedroom Maisonette in Kilimani",
      price: "KSh 120,000/month",
      status: "Pending",
      views: 189,
      location: "Kilimani, Nairobi"
    },
    {
      id: 3,
      title: "Studio Apartment in Kileleshwa",
      price: "KSh 45,000/month",
      status: "Active",
      views: 312,
      location: "Kileleshwa, Nairobi"
    },
    {
      id: 4,
      title: "1-Bedroom in Nyali",
      price: "KSh 65,000/month",
      status: "Rented",
      views: 178,
      location: "Nyali, Mombasa"
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'available';
      case 'pending':
        return 'pending';
      case 'rented':
        return 'rented';
      default:
        return 'available';
    }
  };

  return (
    <div className="property-management">
      <div className="management-header">
        <h2>My Property Listings</h2>
        <button className="btn btn-primary">Add New Property</button>
      </div>
      
      <div className="properties-stats">
        <div className="stat-card">
          <h3>{agentProperties.length}</h3>
          <p>Total Properties</p>
        </div>
        <div className="stat-card">
          <h3>{agentProperties.filter(p => p.status === 'Active').length}</h3>
          <p>Available</p>
        </div>
        <div className="stat-card">
          <h3>{agentProperties.filter(p => p.status === 'Rented').length}</h3>
          <p>Rented</p>
        </div>
        <div className="stat-card">
          <h3>{agentProperties.reduce((sum, prop) => sum + prop.views, 0)}</h3>
          <p>Total Views</p>
        </div>
      </div>

      <div className="properties-table">
        <table>
          <thead>
            <tr>
              <th>Property Details</th>
              <th>Location</th>
              <th>Monthly Rent</th>
              <th>Status</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agentProperties.map(property => (
              <tr key={property.id}>
                <td>
                  <div className="property-info">
                    <div className="property-title">{property.title}</div>
                    <div className="property-id">ID: {property.id}</div>
                  </div>
                </td>
                <td>{property.location}</td>
                <td className="price">{property.price}</td>
                <td>
                  <span className={`status ${getStatusColor(property.status)}`}>
                    {property.status}
                  </span>
                </td>
                <td>
                  <div className="views-count">
                    {property.views}
                    <span className="views-label"> views</span>
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-action edit">Edit</button>
                    <button className="btn-action view">View</button>
                    <button className="btn-action delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="management-notes">
        <h4>Quick Tips</h4>
        <ul>
          <li>Keep your property details updated regularly</li>
          <li>Respond to inquiries within 24 hours</li>
          <li>Upload clear photos of your property</li>
          <li>Update status promptly when property is rented</li>
        </ul>
      </div>
    </div>
  );
};

export default PropertyManagement;