import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RentalListings.css';
import SearchFilters from '../../components/Search/SearchFilters';
import PropertyList from '../../components/Property/PropertyList';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { useProperty } from '../../context/PropertyContext';

const RentalListings = () => {
  const { properties, loading, error, fetchProperties } = useProperty();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort properties
  useEffect(() => {
    let filtered = properties.filter(property => property.available);
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query) ||
        property.type.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at);
        case 'price-low':
          return parseInt(a.price) - parseInt(b.price);
        case 'price-high':
          return parseInt(b.price) - parseInt(a.price);
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at);
        default:
          return 0;
      }
    });
    
    setFilteredProperties(filtered);
  }, [properties, searchQuery, sortBy]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRefresh = () => {
    fetchProperties();
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="rental-listings">
      <div className="container">
        <div className="listings-header">
          <div className="header-content">
            <h1>Available Rentals</h1>
            <p>Found {filteredProperties.length} properties matching your criteria</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search properties by title, location, or description..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            <button 
              className="btn btn-outline refresh-btn"
              onClick={handleRefresh}
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button onClick={handleRefresh} className="btn btn-sm">
              Retry
            </button>
          </div>
        )}

        <div className="listings-content">
          <aside className="filters-sidebar">
            <SearchFilters />
            <div className="filters-info">
              <h4>Quick Tips</h4>
              <ul>
                <li>💡 New properties are automatically featured</li>
                <li>🏠 All properties are verified for quality</li>
                <li>📍 Search by neighborhood name</li>
                <li>💰 Filter by your budget range</li>
              </ul>
            </div>
          </aside>
          
          <main className="listings-main">
            {loading ? (
              <LoadingSpinner size="large" text="Loading properties..." />
            ) : filteredProperties.length > 0 ? (
              <>
                <div className="properties-header">
                  <h3>All Available Properties ({filteredProperties.length})</h3>
                  <div className="sort-options">
                    <span>Sort by: </span>
                    <select className="sort-select" value={sortBy} onChange={handleSortChange}>
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="featured">Featured First</option>
                    </select>
                  </div>
                </div>
                <PropertyList properties={filteredProperties} />
              </>
            ) : (
              <div className="no-properties">
                <div className="no-properties-content">
                  <div className="no-properties-icon">🔍</div>
                  <h3>No Properties Found</h3>
                  <p>
                    {searchQuery 
                      ? `No properties found for "${searchQuery}". Try adjusting your search terms or filters.`
                      : 'No properties available at the moment. Please check back later.'
                    }
                  </p>
                  {searchQuery && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>

        {/* New Properties Info */}
        <div className="listings-footer">
          <div className="new-properties-info">
            <h4>🎉 New Property Added?</h4>
            <p>New properties are automatically featured and appear in both the Home page and Rentals listings immediately after being added.</p>
          </div>
        </div>

        {/* Floating Action Button */}
        <Link to="/add-property" className="fab">
          <span className="fab-icon">+</span>
          <span className="fab-tooltip">Add Property</span>
        </Link>
      </div>
    </div>
  );
};

export default RentalListings;