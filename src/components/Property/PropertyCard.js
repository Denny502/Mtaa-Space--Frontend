import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  
  const favorite = isFavorite(property.id);

  const handleViewDetails = () => {
    navigate(`/property/${property.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      alert('Please sign in to save favorites');
      return;
    }

    if (favorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };

  return (
    <div className="property-card">
      <div className="property-image">
        <img 
          src={property.images[0]} 
          alt={property.title}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop';
          }}
        />
        {property.featured && <div className="property-badge">Featured</div>}
        <button 
          className={`favorite-btn ${favorite ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
          title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
        {!property.available && <div className="sold-badge">Rented</div>}
      </div>
      <div className="property-info">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-location">📍 {property.location}</p>
        <p className="property-price">{property.price}</p>
        <div className="property-features">
          <span>🛏️ {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
          <span>🚿 {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
          <span>📏 {property.area} sq ft</span>
        </div>
        <div className="property-type">
          <span className="type-badge">Apartment</span>
        </div>
        <button className="btn btn-primary view-details-btn" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;