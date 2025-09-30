import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import './Favorites.css';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  const handleRemoveFavorite = (propertyId, e) => {
    e.stopPropagation();
    removeFromFavorites(propertyId);
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleBrowseProperties = () => {
    navigate('/rentals');
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites">
        <div className="container">
          <div className="no-favorites">
            <div className="no-favorites-illustration">🏠</div>
            <h3>No favorites yet</h3>
            <p>Start browsing properties and add them to your favorites to see them here!</p>
            <button 
              className="btn btn-primary"
              onClick={handleBrowseProperties}
            >
              Browse Properties
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites">
      <div className="container">
        <div className="favorites-header">
          <h1>Your Favorite Properties</h1>
          <p>You have {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved</p>
        </div>
        
        <div className="favorites-grid">
          {favorites.map(property => (
            <div key={property.id} className="favorite-item">
              <div className="favorite-image">
                <img 
                  src={property.images?.[0] || property.image} 
                  alt={property.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/667eea/white?text=Property+Image';
                  }}
                />
                <button 
                  className="remove-favorite"
                  onClick={(e) => handleRemoveFavorite(property.id, e)}
                  title="Remove from favorites"
                >
                  ❌
                </button>
              </div>
              
              <div className="favorite-info">
                <h3>{property.title}</h3>
                <p className="favorite-location">📍 {property.location}</p>
                <p className="favorite-price">{property.price}</p>
                
                <div className="favorite-features">
                  <span>🏠 {property.bedrooms} beds</span>
                  <span>🚿 {property.bathrooms} baths</span>
                  <span>📏 {property.area} sq ft</span>
                </div>
                
                <div className="favorite-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleViewDetails(property.id)}
                  >
                    View Details
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={(e) => handleRemoveFavorite(property.id, e)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;