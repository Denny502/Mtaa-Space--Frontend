import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-header">
          <h1>About NYC Apartments</h1>
          <p>Your trusted partner for finding the perfect rental apartment in New York City</p>
        </div>
        
        <div className="about-content">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              At NYC Apartments, we specialize in connecting renters with their ideal apartments across 
              the five boroughs. Our mission is to simplify the apartment hunting process by providing 
              verified listings, transparent information, and personalized support throughout your rental journey.
            </p>
          </div>
          
          <div className="about-section">
            <h2>What We Offer</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>🏙️ NYC Focused</h3>
                <p>Exclusive focus on New York City apartment rentals across all boroughs</p>
              </div>
              <div className="feature-card">
                <h3>✅ Verified Listings</h3>
                <p>Every apartment is personally verified by our team for accuracy and quality</p>
              </div>
              <div className="feature-card">
                <h3>💰 Fee Transparency</h3>
                <p>Clear information about broker fees, deposits, and monthly costs</p>
              </div>
              <div className="feature-card">
                <h3>🔍 Smart Search</h3>
                <p>Advanced filters to find apartments that match your exact needs and budget</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Neighborhoods We Cover</h2>
            <div className="neighborhoods-grid">
              <div className="neighborhood-card">
                <h4>Manhattan</h4>
                <p>Upper East Side, West Village, Financial District, Harlem, and more</p>
              </div>
              <div className="neighborhood-card">
                <h4>Brooklyn</h4>
                <p>Williamsburg, Park Slope, DUMBO, Bushwick, Brooklyn Heights</p>
              </div>
              <div className="neighborhood-card">
                <h4>Queens</h4>
                <p>Astoria, Long Island City, Forest Hills, Jackson Heights</p>
              </div>
              <div className="neighborhood-card">
                <h4>Bronx</h4>
                <p>Riverdale, Fordham, Morris Park, City Island</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;