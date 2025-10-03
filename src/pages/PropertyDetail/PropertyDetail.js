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
    const fetchProperty = async () => {
      try {
        const foundProperty = getPropertyById(id);
        if (foundProperty) {
          setProperty(foundProperty);
          setContactFormData(prev => ({
            ...prev,
            message: `I'm interested in ${foundProperty.title} at ${foundProperty.location}`
          }));
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, getPropertyById]);

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
      navigate('/login');
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
      navigate('/login');
      return;
    }
    setShowContactForm(true);
    setContactFormData(prev => ({
      ...prev,
      message: `I would like to schedule a tour for ${property.title} at ${property.location}. Please let me know available times.`
    }));
  };

  const getPropertyTypeDisplay = () => {
    if (property.isStudio) return 'Studio';
    if (property.isBedsitter) return 'Bedsitter';
    return property.type;
  };

  const getBedroomDisplay = () => {
    if (property.isStudio || property.isBedsitter) return 'Self-contained';
    return `${property.bedrooms} ${property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}`;
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
              {(property.isStudio || property.isBedsitter) && (
                <div className="property-type-badge">
                  {property.isStudio ? 'STUDIO' : 'BEDSITTER'}
                </div>
              )}
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
              <p className="property-price">KSh {property.price.toLocaleString()}{property.rentPeriod === 'daily' ? '/day' : '/month'}</p>
              <div className="property-badges">
                {property.featured && <span className="featured-badge">Featured</span>}
                {property.isStudio && <span className="studio-badge">Studio</span>}
                {property.isBedsitter && <span className="bedsitter-badge">Bedsitter</span>}
              </div>
            </div>

            {/* Property Features */}
            <div className="property-features-grid">
              <div className="feature-card">
                <span className="feature-icon">🏠</span>
                <div className="feature-info">
                  <strong>{getPropertyTypeDisplay()}</strong>
                  <span>Property Type</span>
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🛏️</span>
                <div className="feature-info">
                  <strong>{getBedroomDisplay()}</strong>
                  <span>Accommodation</span>
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
                <span className="feature-icon">📍</span>
                <div className="feature-info">
                  <strong>{property.neighborhood || property.location.split(',')[0]}</strong>
                  <span>Neighborhood</span>
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

            {/* Additional Features for Studios and Bedsitters */}
            {(property.isStudio || property.isBedsitter) && (
              <div className="special-features">
                <h3>Included Features</h3>
                <div className="features-list">
                  <div className="feature-item">✅ Self-contained unit</div>
                  <div className="feature-item">✅ Kitchen area</div>
                  <div className="feature-item">✅ Sleeping area</div>
                  <div className="feature-item">✅ Private bathroom</div>
                  {property.hasBalcony && <div className="feature-item">✅ Balcony</div>}
                  {property.hasParking && <div className="feature-item">✅ Parking space</div>}
                  {property.hasSecurity && <div className="feature-item">✅ 24/7 Security</div>}
                </div>
              </div>
            )}

            {/* Agent Information */}
            {property.agent && (
              <div className="agent-info">
                <h3>Listing Agent</h3>
                <div className="agent-card">
                  <img 
                    src={property.agent.image} 
                    alt={property.agent.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80/667eea/white?text=Agent';
                    }}
                  />
                  <div className="agent-details">
                    <h4>{property.agent.name}</h4>
                    <p>📧 {property.agent.email}</p>
                    <p>📞 {property.agent.phone}</p>
                    <p className="agent-rating">⭐ {property.agent.rating || '4.5'} ({(property.agent.reviews || 12)} reviews)</p>
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

            {/* Property Stats */}
            <div className="property-stats">
              <div className="stat-item">
                <strong>{property.views || 156}</strong>
                <span>Views</span>
              </div>
              <div className="stat-item">
                <strong>{property.saves || 23}</strong>
                <span>Saves</span>
              </div>
              <div className="stat-item">
                <strong>{property.daysListed || 5}</strong>
                <span>Days Listed</span>
              </div>
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