import React, { useState } from 'react';
import { useProperty } from '../../context/PropertyContext';
import { useNavigate } from 'react-router-dom';
import './SearchForm.css';

const SearchForm = () => {
  const { setSearchFilters } = useProperty();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: '',
    bedrooms: '',
    price: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchFilters(filters);
    navigate('/rentals'); // Redirect to rentals page after search
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <div className="search-form-grid">
          <div className="form-group">
            <label>Neighborhood / Area</label>
            <input 
              type="text" 
              name="location"
              placeholder="Manhattan, Brooklyn, Queens..."
              className="form-input"
              value={filters.location}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Bedrooms</label>
            <select 
              name="bedrooms"
              className="form-input"
              value={filters.bedrooms}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Max Budget</label>
            <select 
              name="price"
              className="form-input"
              value={filters.price}
              onChange={handleChange}
            >
              <option value="">Any Price</option>
              <option value="1500">Under €1,500</option>
              <option value="2500">Under €2,500</option>
              <option value="4000">Under €4,000</option>
              <option value="6000">Under €6,000</option>
              <option value="10000">€10,000+</option>
            </select>
          </div>
          
          <div className="form-group">
            <button type="submit" className="search-button">
              Find Apartments
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;