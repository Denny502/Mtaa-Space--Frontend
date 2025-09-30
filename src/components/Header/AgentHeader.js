import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';
import Navbar from './Navbar';

const Header = ({ onSignupClick }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>Rent Homes</h1>
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
                    </div>
                    <div className="dropdown-actions">
                      <button>Profile</button>
                      <button>Favorites</button>
                      {user.type === 'agent' && (
                        <button onClick={() => window.location.href = '/agent'}>
                          Dashboard
                        </button>
                      )}
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn btn-primary" onClick={onSignupClick}>
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;