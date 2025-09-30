import React, { useState } from 'react';
import { useProperty } from '../../context/PropertyContext';
import ImageUpload from './ImageUpload';
import './PropertyForm.css';

const PropertyForm = ({ property = null, onSuccess }) => {
  const { addProperty, updateProperty } = useProperty();
  const [formData, setFormData] = useState({
    title: property?.title || '',
    description: property?.description || '',
    price: property?.price || '',
    location: property?.location || '',
    bedrooms: property?.bedrooms || '',
    bathrooms: property?.bathrooms || '',
    area: property?.area || '',
    leaseTerm: property?.leaseTerm || '12 months',
    deposit: property?.deposit || '',
    amenities: property?.amenities || []
  });
  const [images, setImages] = useState(property?.images || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const propertyData = {
        ...formData,
        type: "apartment", // Always apartment
        images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"],
        amenities: Array.isArray(formData.amenities) ? formData.amenities : [],
        available: true
      };

      let result;
      if (property) {
        result = await updateProperty(property.id, propertyData);
      } else {
        result = await addProperty(propertyData);
      }

      if (result.success) {
        onSuccess?.(result.data);
        // Reset form if it's a new property
        if (!property) {
          setFormData({
            title: '',
            description: '',
            price: '',
            location: '',
            bedrooms: '',
            bathrooms: '',
            area: '',
            leaseTerm: '12 months',
            deposit: '',
            amenities: []
          });
          setImages([]);
        }
      } else {
        setError(result.error || 'Failed to save property');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => {
      const amenities = Array.isArray(prev.amenities) ? prev.amenities : [];
      const updatedAmenities = amenities.includes(amenity)
        ? amenities.filter(a => a !== amenity)
        : [...amenities, amenity];
      
      return { ...prev, amenities: updatedAmenities };
    });
  };

  const apartmentAmenities = [
    "Concierge", "Gym", "Pool", "Security", "Parking", "Balcony", 
    "Air Conditioning", "In-unit Laundry", "Dishwasher", "Pet Friendly",
    "Fitness Center", "Rooftop", "Storage", "Central AC", "Modern Kitchen"
  ];

  return (
    <div className="property-form">
      <h2>{property ? 'Edit Apartment Listing' : 'List New Apartment'}</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <ImageUpload 
          onImagesChange={setImages}
          existingImages={images}
        />

        <div className="form-row">
          <div className="form-group">
            <label>Apartment Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Luxury 2-Bedroom Downtown Apartment"
              required
            />
          </div>
          <div className="form-group">
            <label>Monthly Rent *</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="€2,500/month"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the apartment, features, neighborhood, and what makes it special..."
            required
          ></textarea>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Neighborhood & Address *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Manhattan, New York"
              required
            />
          </div>
          <div className="form-group">
            <label>Lease Term</label>
            <select name="leaseTerm" value={formData.leaseTerm} onChange={handleChange}>
              <option value="6 months">6 Months</option>
              <option value="12 months">12 Months</option>
              <option value="18 months">18 Months</option>
              <option value="24 months">24 Months</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Bedrooms *</label>
            <select name="bedrooms" value={formData.bedrooms} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </select>
          </div>
          <div className="form-group">
            <label>Bathrooms *</label>
            <select name="bathrooms" value={formData.bathrooms} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="1">1 Bathroom</option>
              <option value="1.5">1.5 Bathrooms</option>
              <option value="2">2 Bathrooms</option>
              <option value="3">3+ Bathrooms</option>
            </select>
          </div>
          <div className="form-group">
            <label>Area (sq ft) *</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="1200"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Security Deposit</label>
          <input
            type="text"
            name="deposit"
            value={formData.deposit}
            onChange={handleChange}
            placeholder="€2,500"
          />
        </div>

        <div className="form-group">
          <label>Apartment Amenities</label>
          <div className="amenities-checkboxes">
            {apartmentAmenities.map(amenity => (
              <label key={amenity} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.amenities?.includes(amenity) || false}
                  onChange={() => handleAmenityChange(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (property ? 'Update Apartment' : 'List Apartment')}
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;