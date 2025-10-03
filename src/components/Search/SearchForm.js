// src/components/Search/SearchForm.js
import React, { useState } from "react";
import { useProperty } from "../../context/PropertyContext";
import { useNavigate } from "react-router-dom";
import "./SearchForm.css";

const SearchForm = () => {
  const { setSearchFilters } = useProperty();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    type: "",      // Apartment / Studio / Bedsitter
    location: "",
    bedrooms: "",
    price: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchFilters(filters);
    navigate("/rentals"); // Redirect to rentals page
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <div className="search-form-grid">
          {/* Property Type */}
          <div className="form-group">
            <label>Property Type</label>
            <select
              name="type"
              className="form-input"
              value={filters.type}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="Apartment">Apartment</option>
              <option value="Studio">Studio</option>
              <option value="Bedsitter">Bedsitter</option>
            </select>
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Neighborhood / Area</label>
            <input
              type="text"
              name="location"
              placeholder="Westlands, Kilimani, South B..."
              className="form-input"
              value={filters.location}
              onChange={handleChange}
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label>Max Budget</label>
            <select
              name="price"
              className="form-input"
              value={filters.price}
              onChange={handleChange}
            >
              <option value="">Any Price</option>
              <option value="15000">Under KSh 15,000</option>
              <option value="25000">Under KSh 25,000</option>
              <option value="40000">Under KSh 40,000</option>
              <option value="60000">Under KSh 60,000</option>
              <option value="100000">KSh 100,000+</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <button type="submit" className="search-button">
              Find Rentals
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
