import React from 'react';
import './Home.css';
import SearchForm from '../../components/Search/SearchForm';
import PropertyCard from '../../components/Property/PropertyCard';
import { useProperty } from '../../context/PropertyContext';

const Home = () => {
  const { featuredProperties, loading, error } = useProperty();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Find Your Perfect Rental Home in Kenya</h1>
            <p className="hero-subtitle">
              Discover the best apartments, houses, and studios from Nairobi to Mombasa. 
              Find quality accommodation at great prices across all major cities in Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <SearchForm />
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Properties</h2>
          <p className="section-subtitle">
            Explore our newest and most popular properties in the best neighborhoods across Kenya.
          </p>
          
          {loading ? (
            <div className="loading-section">
              <div className="loading-spinner"></div>
              <p>Loading featured properties...</p>
            </div>
          ) : error ? (
            <div className="error-section">
              <h3>Unable to load featured properties</h3>
              <p>{error}</p>
              <button 
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="properties-grid">
                {featuredProperties.length > 0 ? (
                  featuredProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))
                ) : (
                  <div className="no-properties">
                    <div className="no-properties-icon">🏠</div>
                    <h3>No Featured Properties Available</h3>
                    <p>Check back soon for new property listings</p>
                  </div>
                )}
              </div>
              
              {featuredProperties.length > 0 && (
                <div className="featured-actions">
                  <p className="featured-note">
                    💡 <strong>New properties are automatically featured here!</strong>
                  </p>
                  <button 
                    className="btn btn-outline"
                    onClick={() => window.location.href = '/rentals'}
                  >
                    View All Properties
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Why Rent With Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">✅</div>
              <h3>Verified Properties</h3>
              <p>Every property is inspected by our team to ensure quality and accuracy.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🏙️</div>
              <h3>Prime Locations</h3>
              <p>Properties in the best neighborhoods like Westlands, Kilimani, Kileleshwa and Karen.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>Secure Process</h3>
              <p>Safe and transparent rental process with support every step of the way.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💵</div>
              <h3>Kenyan Market Prices</h3>
              <p>Affordable properties priced according to the local Kenyan market.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Find Your New Home?</h2>
          <p className="cta-subtitle">Join thousands of happy tenants who found their perfect home through us.</p>
          <button 
            className="btn btn-primary cta-button"
            onClick={() => window.location.href = '/rentals'}
          >
            Browse All Properties
          </button>
          <div className="contact-info">
            <p>Call us: <strong>0712 345 678</strong> | <strong>info@mtaaspace.co.ke</strong></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;