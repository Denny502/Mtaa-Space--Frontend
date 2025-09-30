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
  const { getPropertyById } = useProperty();
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
    const foundProperty = getPropertyById(id);
    if (foundProperty) {
      setProperty(foundProperty);
      setContactFormData(prev => ({
        ...prev,
        message: `I'm interested in ${foundProperty.title} at ${foundProperty.location}`
      }));
    }
    setLoading(false);
  }, [id, getPropertyById]);

  useEffect(() => {
    if (user && property) {
      setContactFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user, property]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    
    try {
      await sendInquiry({
        ...contactFormData,
        propertyId: property.id,
        propertyTitle: property.title,
        agentId: property.agent?.id,
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
      return;
    }

    if (isFavorite(property.id)) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };

  const handleScheduleTour = () => {
    if (!isAuthenticated) {
      alert('Please sign in to schedule a tour');
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
          <div className="loading">Loading property details...</div>
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
                  e.target.src = 'https://via.placeholder.com/600x400/667eea/white?text=Property+Image';
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
                    <img src={image} alt={`${property.title} ${index + 1}`} />
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
              <p className="property-price">{property.price}</p>
              {property.featured && <span className="featured-badge">Featured</span>}
            </div>

            {/* Property Features */}
            <div className="property-features-grid">
              <div className="feature-card">
                <span className="feature-icon">🏠</span>
                <div className="feature-info">
                  <strong>{property.bedrooms}</strong>
                  <span>Bedrooms</span>
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🚿</span>
                <div className="feature-info">
                  <strong>{property.bathrooms}</strong>
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
              <div className="feature-card">
                <span className="feature-icon">🏡</span>
                <div className="feature-info">
                  <strong>{property.type}</strong>
                  <span>Type</span>
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
                <h3>Amenities</h3>
                <div className="amenities-list">
                  {property.amenities.map((amenity, index) => (
                    <span key={index} className="amenity-tag">{amenity}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Agent Information */}
            {property.agent && (
              <div className="agent-info">
                <h3>Listing Agent</h3>
                <div className="agent-card">
                  <img src={property.agent.image} alt={property.agent.name} />
                  <div className="agent-details">
                    <h4>{property.agent.name}</h4>
                    <p>📧 {property.agent.email}</p>
                    <p>📞 {property.agent.phone}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="property-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setShowContactForm(true)}
              >
                Contact Agent
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleScheduleTour}
              >
                Schedule Tour
              </button>
              <button 
                className={`btn btn-outline ${favorite ? 'favorited' : ''}`}
                onClick={handleFavoriteToggle}
              >
                {favorite ? 'Remove Favorite' : 'Save Property'}
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
              >
                ×
              </button>
            </div>
            
            {contactSuccess ? (
              <div className="success-message">
                <h4>✅ Message Sent Successfully!</h4>
                <p>The agent will contact you shortly.</p>
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
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={contactFormData.phone}
                    onChange={(e) => setContactFormData({...contactFormData, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                    rows="5"
                    required
                  />
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => setShowContactForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={contactLoading}
                  >
                    {contactLoading ? 'Sending...' : 'Send Message'}
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