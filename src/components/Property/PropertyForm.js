import React, { useState } from 'react';
import { useProperty } from '../../context/PropertyContext';
import { useAuth } from '../../context/AuthContext';
import ImageUpload from './ImageUpload';
import './PropertyForm.css';

const PropertyForm = ({ property = null, onSuccess }) => {
  const { addProperty, updateProperty } = useProperty();
  const { user } = useAuth();
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
    amenities: property?.amenities || [],
    propertyType: property?.propertyType || 'apartment'
  });
  const [images, setImages] = useState(property?.images || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔄 PropertyForm: Starting form submission');
    console.log('👤 Current user:', user);

    try {
      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: formData.price.toString(), // Ensure it's a string
        location: formData.location,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseFloat(formData.bathrooms),
        area: parseInt(formData.area),
        type: formData.propertyType,
        leaseTerm: formData.leaseTerm,
        deposit: formData.deposit || undefined,
        amenities: Array.isArray(formData.amenities) ? formData.amenities : [],
        images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"],
        available: true
      };

      console.log('📦 Final property data being sent:', propertyData);

      let result;
      if (property) {
        console.log('✏️ Updating existing property');
        result = await updateProperty(property.id, propertyData);
      } else {
        console.log('➕ Adding new property');
        result = await addProperty(propertyData);
      }

      console.log('📨 Result from context:', result);

      if (result.success) {
        console.log('🎉 Property saved successfully!');
        onSuccess?.(result.data);
        if (!property) {
          resetForm();
        }
      } else {
        console.error('❌ Save failed:', result.error);
        setError(result.error || 'Failed to save property');
      }
    } catch (err) {
      console.error('❌ Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
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
      amenities: [],
      propertyType: 'apartment'
    });
    setImages([]);
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

  const kenyanApartmentAmenities = [
    "24/7 Security", "Gated Community", "Parking Space", "Balcony", 
    "Air Conditioning", "Water Backup", "DSL Internet", "Fitness Center",
    "Swimming Pool", "Elevator", "Concierge", "Pet Friendly",
    "Serviced", "Furnished", "Near Public Transport", "Power Backup"
  ];

  const kenyanPropertyTypes = [
    'apartment', 'house', 'studio', 'bedsitter', 'maisonette', 'townhouse'
  ];

  const popularNeighborhoods = [
    "Westlands, Nairobi", "Kilimani, Nairobi", "Kileleshwa, Nairobi", 
    "Lavington, Nairobi", "Karen, Nairobi", "Nyali, Mombasa",
    "Bamburi, Mombasa", "Milimani, Nakuru", "Riat Hills, Kisumu"
  ];

  return (
    <div className="property-form">
      <h2>{property ? 'Edit Property Listing' : 'List New Property for Rent'}</h2>
      
      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <ImageUpload 
          onImagesChange={setImages}
          existingImages={images}
        />

        <div className="form-row">
          <div className="form-group">
            <label>Property Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Spacious 2-Bedroom Apartment in Westlands"
              required
            />
          </div>
          <div className="form-group">
            <label>Monthly Rent (KSh) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="45000"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Property Type *</label>
            <select name="propertyType" value={formData.propertyType} onChange={handleChange} required>
              {kenyanPropertyTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
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
        
        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the property, nearby amenities like shopping malls, schools, hospitals, and public transport access..."
            required
          ></textarea>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Location & Neighborhood *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Westlands, Nairobi"
              list="neighborhoods"
              required
            />
            <datalist id="neighborhoods">
              {popularNeighborhoods.map(area => (
                <option key={area} value={area} />
              ))}
            </datalist>
          </div>
          <div className="form-group">
            <label>Area (sq ft) *</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="800"
              required
            />
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
        </div>

        <div className="form-group">
          <label>Security Deposit (KSh)</label>
          <input
            type="number"
            name="deposit"
            value={formData.deposit}
            onChange={handleChange}
            placeholder="45000"
          />
        </div>

        <div className="form-group">
          <label>Property Amenities</label>
          <div className="amenities-checkboxes">
            {kenyanApartmentAmenities.map(amenity => (
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
          {loading ? 'Saving...' : (property ? 'Update Property' : 'List Property for Rent')}
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;