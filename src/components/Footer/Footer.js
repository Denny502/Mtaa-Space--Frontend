import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Mtaa Space</h3>
            <p>Finding your perfect rental home across Kenya.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/rentals">Rentals</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@mtaaspace.com</p>
            <p>Phone: +2547 03 726 130</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Mtaa Space. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;