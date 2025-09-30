import React from 'react';
import './RentalListings.css';
import SearchFilters from '../../components/Search/SearchFilters';
import PropertyList from '../../components/Property/PropertyList';
import { useProperty } from '../../context/PropertyContext';

const RentalListings = () => {
  const { properties } = useProperty();

  return (
    <div className="rental-listings">
      <div className="container">
        <div className="listings-header">
          <h1>Available Rentals</h1>
          <p>Found {properties.length} properties matching your criteria</p>
        </div>
        <div className="listings-content">
          <aside className="filters-sidebar">
            <SearchFilters />
          </aside>
          <main className="listings-main">
            {properties.length > 0 ? (
              <PropertyList properties={properties} />
            ) : (
              <div className="no-properties">
                <h3>No properties found</h3>
                <p>Try adjusting your search filters</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default RentalListings;