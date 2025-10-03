// src/components/Search/SearchFilters.js
import React, { useState } from "react";
import { useProperty } from "../../context/PropertyContext";
import "./SearchFilters.css";

const SearchFilters = () => {
  const { setSearchFilters } = useProperty();

  const [filters, setFilters] = useState({
    type: "",
    location: "",
    bedrooms: "",
    price: "",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    setSearchFilters(filters);
  };

  return (
    <div className="search-filters">
      <h3>Filters</h3>

      {/* Property Type */}
      <div className="filter-group">
        <label>Property Type</label>
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">Any</option>
          <option value="Apartment">Apartment</option>
          <option value="Studio">Studio</option>
          <option value="Bedsitter">Bedsitter</option>
        </select>
      </div>

      {/* Location */}
      <div className="filter-group">
        <label>Location</label>
        <input
          type="text"
          name="location"
          placeholder="Westlands, Kilimani..."
          value={filters.location}
          onChange={handleChange}
        />
      </div>

      {/* Bedrooms */}
      <div className="filter-group">
        <label>Bedrooms</label>
        <select
          name="bedrooms"
          value={filters.bedrooms}
          onChange={handleChange}
        >
          <option value="">Any</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3+ Bedrooms</option>
        </select>
      </div>

      {/* Max Price */}
      <div className="filter-group">
        <label>Max Budget</label>
        <select name="price" value={filters.price} onChange={handleChange}>
          <option value="">Any Price</option>
          <option value="15000">Under KSh 15,000</option>
          <option value="25000">Under KSh 25,000</option>
          <option value="40000">Under KSh 40,000</option>
          <option value="60000">Under KSh 60,000</option>
          <option value="100000">KSh 100,000+</option>
        </select>
      </div>

      {/* Apply Button */}
      <div className="filter-actions">
        <button onClick={applyFilters} className="apply-button">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
