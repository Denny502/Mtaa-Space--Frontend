import React from 'react';
import './Home.css';
import SearchForm from '../../components/Search/SearchForm';
import PropertyCard from '../../components/Property/PropertyCard';
import { useProperty } from '../../context/PropertyContext';

const Home = () => {
  const { featuredProperties } = useProperty();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Find Your Perfect Rental Apartment</h1>
            <p className="hero-subtitle">
              Discover the best apartment rentals across New York City. From cozy studios to luxury penthouses, 
              find your ideal home with our extensive collection of verified listings.
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
          <h2 className="section-title">Featured Apartments</h2>
          <p className="section-subtitle">
            Explore our hand-picked selection of premium rental apartments in prime locations across NYC.
          </p>
          <div className="properties-grid">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Why Rent With Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🏢</div>
              <h3>Verified Listings</h3>
              <p>Every apartment is personally verified by our team to ensure quality and accuracy.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📍</div>
              <h3>Prime Locations</h3>
              <p>Apartments in the most desirable neighborhoods across New York City.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔒</div>
              <h3>Secure Process</h3>
              <p>Safe and transparent rental process with dedicated support every step of the way.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>No Broker Fees</h3>
              <p>Many listings with no broker fees - saving you thousands on your new home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Find Your New Apartment?</h2>
          <p className="cta-subtitle">Join thousands of happy renters who found their perfect home through us.</p>
          <button className="btn btn-primary cta-button">Browse All Apartments</button>
        </div>
      </section>
    </div>
  );
};

export default Home;