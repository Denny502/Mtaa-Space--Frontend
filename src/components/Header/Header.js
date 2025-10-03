import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // 👈 KEEP THIS
import './Header.css';
import Navbar from './Navbar';
import LoginPopup from '../Auth/LoginPopup';
import SignupPopup from '../Auth/SignupPopup';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate(); // 👈 KEEP THIS - IT'S BEING USED BELOW
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/'); // 👈 USING navigate HERE
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleShowSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  // 👇 ADD THESE NAVIGATION HANDLERS
  const handleFavoritesClick = () => {
    navigate('/favorites'); // 👈 USING navigate HERE
    setShowUserMenu(false);
  };

  const handleDashboardClick = () => {
    if (user.role === 'agent') {
      navigate('/agent/dashboard'); // 👈 USING navigate HERE
    } else {
      navigate('/dashboard'); // 👈 USING navigate HERE
    }
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>Mtaa Space</h1>
            </div>
            <Navbar />
            <div className="header-actions">
              {isAuthenticated ? (
                <div className="user-menu">
                  <button 
                    className="user-btn"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    👤 {user.name}
                  </button>
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <div className="user-info">
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                        <span>Role: {user.role}</span>
                      </div>
                      <div className="dropdown-actions">
                        {/* 👇 USING THE NAVIGATION HANDLERS */}
                        <button onClick={handleFavoritesClick}>
                          My Favorites
                        </button>
                        <button onClick={handleDashboardClick}>
                          {user.role === 'agent' ? 'Agent Dashboard' : 'My Dashboard'}
                        </button>
                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="auth-buttons">
                  <button className="btn btn-outline" onClick={handleShowLogin}>
                    Login
                  </button>
                  <button className="btn btn-primary" onClick={handleShowSignup}>
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginPopup 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={switchToSignup}
      />

      <SignupPopup 
        isOpen={showSignup} 
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
};

export default Header;