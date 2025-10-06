import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext';
import { useAuth } from '../../context/AuthContext';
import { useContact } from '../../context/ContactContext';
import { useFavorites } from '../../context/FavoritesContext';
import './PropertyDetail.css';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById, properties, propertiesLoaded } = useProperty(); // Removed unused fetchProperties
  const { user, isAuthenticated } = useAuth();
  const { sendInquiry } = useContact();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  useEffect(() => {
    const loadProperty = () => {
      console.log('🔄 PropertyDetail: Starting to load property ID:', id);
      console.log('📊 Properties loaded in context:', propertiesLoaded);
      console.log('📦 Properties count:', properties.length);
      
      if (!propertiesLoaded) {
        console.log('⏳ Properties not loaded yet, waiting...');
        // If properties aren't loaded, wait and try again
        setTimeout(loadProperty, 100);
        return;
      }
      
      const foundProperty = getPropertyById(id);
      
      if (foundProperty) {
        console.log('✅ Property FOUND in context:', foundProperty.title);
        setProperty(foundProperty);
        setContactFormData(prev => ({
          ...prev,
          message: `I'm interested in ${foundProperty.title} at ${foundProperty.location}`
        }));
        setLoading(false);
      } else {
        console.log('❌ Property NOT FOUND in context, trying API...');
        // Try to fetch from API directly as fallback
        fetch(`/api/properties/${id}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Property not found');
          })
          .then(data => {
            const apiProperty = data.data || data;
            if (apiProperty) {
              console.log('✅ Property loaded from API:', apiProperty.title);
              setProperty(apiProperty);
              setContactFormData(prev => ({
                ...prev,
                message: `I'm interested in ${apiProperty.title} at ${apiProperty.location}`
              }));
            } else {
              console.log('❌ Property not found in API either');
              setProperty(null);
            }
          })
          .catch(error => {
            console.error('❌ API fetch failed:', error);
            setProperty(null);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    };

    if (id) {
      loadProperty();
    } else {
      setLoading(false);
      setProperty(null);
    }
  }, [id, getPropertyById, propertiesLoaded, properties.length]);

  useEffect(() => {
    if (user && property) {
      setContactFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone || ''
      }));
    }
  }, [user, property]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    
    try {
      await sendInquiry({
        ...contactFormData,
        propertyId: property._id || property.id,
        propertyTitle: property.title,
        agentId: property.agent?._id || property.agent?.id,
        agentName: property.agent?.name
      });
      
      setContactSuccess(true);
      setTimeout(() => {
        setShowContactForm(false);
        setContactSuccess(false);
      }, 2000);
    } catch (error) {
      alert('Failed to send inquiry. Please try again.');
    } finally {
      setContactLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      alert('Please sign in to save favorites');
      navigate('/login');
      return;
    }

    const propertyId = property._id || property.id;
    if (isFavorite(propertyId)) {
      removeFromFavorites(propertyId);
    } else {
      addToFavorites(property);
    }
  };

  const handleScheduleTour = () => {
    if (!isAuthenticated) {
      alert('Please sign in to schedule a tour');
      navigate('/login');
      return;
    }
    setShowContactForm(true);
    setContactFormData(prev => ({
      ...prev,
      message: `I would like to schedule a tour for ${property.title} at ${property.location}. Please let me know available times.`
    }));
  };

  if (loading) {
    return (
      <div className="property-detail">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="property-detail">
        <div className="container">
          <div className="property-not-found">
            <h2>Property not found</h2>
            <p>The property you're looking for doesn't exist or has been removed.</p>
            <button onClick={() => navigate('/rentals')} className="btn btn-primary">
              Back to Rentals
            </button>
          </div>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(property.id);

  return (
    <div className="property-detail">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link> &gt; 
          <Link to="/rentals">Rentals</Link> &gt; 
          <span>{property.title}</span>
        </nav>
        
        <div className="property-detail-content">
          {/* Property Images */}
          <div className="property-images-section">
            <div className="main-image">
              <img 
                src={property.images[activeImageIndex]} 
                alt={property.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x500/667eea/white?text=Property+Image';
                }}
              />
              <button 
                className={`favorite-btn ${favorite ? 'favorited' : ''}`}
                onClick={handleFavoriteToggle}
                title={favorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {favorite ? '❤️' : '🤍'}
              </button>
            </div>
            
            {property.images.length > 1 && (
              <div className="image-thumbnails">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${property.title} ${index + 1}`}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x80/667eea/white?text=Image';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Information */}
          <div className="property-info-section">
            <div className="property-header">
              <h1>{property.title}</h1>
              <p className="property-location">📍 {property.location}</p>
              <p className="property-price">KSh {typeof property.price === 'number' ? property.price.toLocaleString() : property.price}/month</p>
              <div className="property-badges">
                {property.featured && <span className="featured-badge">Featured</span>}
                <span className="type-badge">{property.type}</span>
              </div>
            </div>

            {/* Property Features */}
            <div className="property-features-grid">
              <div className="feature-card">
                <span className="feature-icon">🏠</span>
                <div className="feature-info">
                  <strong>{property.type}</strong>
                  <span>Property Type</span>
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🛏️</span>
                <div className="feature-info">
                  <strong>{property.bedrooms} {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}</strong>
                  <span>Bedrooms</span>
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🚿</span>
                <div className="feature-info">
                  <strong>{property.bathrooms} {property.bathrooms === 1 ? 'bathroom' : 'bathrooms'}</strong>
                  <span>Bathrooms</span>
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">📏</span>
                <div className="feature-info">
                  <strong>{property.area} sq ft</strong>
                  <span>Area</span>
                </div>
              </div>
            </div>

            {/* Property Description */}
            <div className="property-description">
              <h3>Property Description</h3>
              <p>{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="property-amenities">
                <h3>Amenities & Features</h3>
                <div className="amenities-list">
                  {property.amenities.map((amenity, index) => (
                    <span key={index} className="amenity-tag">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="property-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setShowContactForm(true)}
              >
                📞 Contact Agent
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleScheduleTour}
              >
                🗓️ Schedule Tour
              </button>
              <button 
                className={`btn btn-outline ${favorite ? 'favorited' : ''}`}
                onClick={handleFavoriteToggle}
              >
                {favorite ? '❤️ Remove Favorite' : '💾 Save Property'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Contact Agent</h3>
              <button 
                className="close-btn"
                onClick={() => setShowContactForm(false)}
                disabled={contactLoading}
              >
                ×
              </button>
            </div>
            
            {contactSuccess ? (
              <div className="success-message">
                <h4>✅ Message Sent Successfully!</h4>
                <p>The agent will contact you shortly.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowContactForm(false)}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="contact-form">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={contactFormData.name}
                    onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})}
                    required
                    disabled={!!user}
                  />
                </div>
                
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={contactFormData.email}
                    onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                    required
                    disabled={!!user}
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    value={contactFormData.phone}
                    onChange={(e) => setContactFormData({...contactFormData, phone: e.target.value})}
                    placeholder="+254 7XX XXX XXX"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                    rows="5"
                    required
                    placeholder="Tell the agent about your interest in this property..."
                  />
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => setShowContactForm(false)}
                    disabled={contactLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={contactLoading}
                  >
                    {contactLoading ? '📤 Sending...' : '📨 Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;