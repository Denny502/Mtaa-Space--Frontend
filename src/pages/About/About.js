import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-header">
          <h1>About KenyaRent Homes</h1>
          <p>Your trusted partner for finding the perfect rental home across Kenya</p>
        </div>
        
        <div className="about-content">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              At KenyaRent Homes, we specialize in connecting renters with their ideal homes across 
              major cities and towns in Kenya. Our mission is to simplify the house hunting process by providing 
              verified listings, transparent information, and personalized support throughout your rental journey.
              We understand the Kenyan rental market and are committed to making your search stress-free.
            </p>
          </div>
          
          <div className="about-section">
            <h2>What We Offer</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>🏠 Kenya Wide</h3>
                <p>Comprehensive coverage of rental properties across all major Kenyan cities and towns</p>
              </div>
              <div className="feature-card">
                <h3>✅ Verified Properties</h3>
                <p>Every property is personally verified by our team for accuracy, safety, and quality</p>
              </div>
              <div className="feature-card">
                <h3>💰 Transparent Pricing</h3>
                <p>Clear information about rent, deposits, and any additional costs in Kenyan Shillings</p>
              </div>
              <div className="feature-card">
                <h3>🔍 Smart Search</h3>
                <p>Advanced filters to find homes that match your budget, location, and amenity needs</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Why Choose KenyaRent Homes?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>🌍 Local Expertise</h3>
                <p>Deep understanding of Kenyan neighborhoods, market trends, and rental processes</p>
              </div>
              <div className="feature-card">
                <h3>🔒 Secure Process</h3>
                <p>Safe viewing arrangements and secure transaction processes for your peace of mind</p>
              </div>
              <div className="feature-card">
                <h3>📞 Local Support</h3>
                <p>Dedicated Kenyan-based support team available to assist you in Swahili or English</p>
              </div>
              <div className="feature-card">
                <h3>🏙️ Neighborhood Guides</h3>
                <p>Detailed information about amenities, transport, schools, and security in each area</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Cities We Cover</h2>
            <div className="neighborhoods-grid">
              <div className="neighborhood-card">
                <h4>Nairobi</h4>
                <p>Westlands, Kilimani, Kileleshwa, Lavington, Karen, South B, South C, and more</p>
              </div>
              <div className="neighborhood-card">
                <h4>Mombasa</h4>
                <p>Nyali, Bamburi, Kizingo, Mtwapa, Likoni, Mikindani, and surrounding areas</p>
              </div>
              <div className="neighborhood-card">
                <h4>Kisumu</h4>
                <p>Milimani, Riat Hills, Tom Mboya, Nyalenda, Kondele, and lakeside areas</p>
              </div>
              <div className="neighborhood-card">
                <h4>Nakuru</h4>
                <p>Milimani, Lanet, Section 58, Pangani, Freehold, and developing suburbs</p>
              </div>
              <div className="neighborhood-card">
                <h4>Eldoret</h4>
                <p>West Indies, Elgon View, Jerusalem, Pioneer, and university areas</p>
              </div>
              <div className="neighborhood-card">
                <h4>Thika</h4>
                <p>Makongeni, Section 9, Thika Greens, Gatuanyaga, and industrial areas</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Our Commitment to Kenya</h2>
            <p>
              We are proud to be a Kenyan company serving Kenyans. We understand the unique challenges 
              of finding quality rental accommodation in our growing cities and are committed to providing 
              solutions that work for the Kenyan market. From student hostels to family homes and executive 
              apartments, we've got you covered.
            </p>
            <div className="commitment-points">
              <div className="commitment-item">
                <strong>Local Knowledge:</strong> Our team lives and works in the communities we serve
              </div>
              <div className="commitment-item">
                <strong>Fair Pricing:</strong> We promote transparent and fair rental practices
              </div>
              <div className="commitment-item">
                <strong>Community Focus:</strong> We support local property owners and agents
              </div>
              <div className="commitment-item">
                <strong>Customer Care:</strong> Kenyan-style hospitality in all our interactions
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;