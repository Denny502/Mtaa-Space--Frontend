import React from 'react';
import './PropertyManagement.css';

const PropertyManagement = () => {
  const agentProperties = [
    {
      id: 1,
      title: "Ocean Breeze Villa",
      price: "€910,000,00",
      status: "Active",
      views: 245
    },
    {
      id: 2,
      title: "Jakson House",
      price: "€750,000,00",
      status: "Pending",
      views: 189
    },
    {
      id: 3,
      title: "Lakeside Cottage",
      price: "€540,000,00",
      status: "Active",
      views: 312
    }
  ];

  return (
    <div className="property-management">
      <h2>My Properties</h2>
      <div className="properties-table">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Price</th>
              <th>Status</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agentProperties.map(property => (
              <tr key={property.id}>
                <td>{property.title}</td>
                <td>{property.price}</td>
                <td>
                  <span className={`status ${property.status.toLowerCase()}`}>
                    {property.status}
                  </span>
                </td>
                <td>{property.views}</td>
                <td>
                  <button className="btn-action edit">Edit</button>
                  <button className="btn-action delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyManagement;