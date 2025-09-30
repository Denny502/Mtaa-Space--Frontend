import React from 'react';
import './PropertyList.css';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties }) => {
  return (
    <div className="property-list">
      <div className="properties-grid">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;