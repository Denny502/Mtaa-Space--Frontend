import React from 'react';
import './SearchFilters.css';

const SearchFilters = () => {
  return (
    <div className="search-filters">
      <h3>Filters</h3>
      <div className="filter-group">
        <label>Bedrooms</label>
        <select>
          <option>Any</option>
          <option>1+</option>
          <option>2+</option>
          <option>3+</option>
          <option>4+</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Bathrooms</label>
        <select>
          <option>Any</option>
          <option>1+</option>
          <option>2+</option>
          <option>3+</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Amenities</label>
        <div className="amenities-list">
          <label><input type="checkbox" /> Pool</label>
          <label><input type="checkbox" /> parking</label>
          <label><input type="checkbox" /> Garden</label>
          <label><input type="checkbox" /> Security</label>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;