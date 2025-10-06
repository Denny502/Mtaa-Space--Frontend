import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // ← FIXED IMPORT PATH
import { useNavigate } from 'react-router-dom';
import './AuthPopup.css';

const SignupPopup = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'renter'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    console.log('🔄 === SIGNUP STARTED ===');
    console.log('📝 Form data:', { ...formData, password: '***' });

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    try {
      console.log('📤 Calling signup function from AuthContext...');
      
      const result = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.userType,
        phone: ''
      });
      
      console.log('📨 Signup result:', result);
      
      if (result.success) {
        console.log('✅ Signup successful!');
        onClose();
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          userType: 'renter'
        });
        
        if (formData.userType === 'agent') {
          navigate('/agent/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        console.error('❌ Signup failed:', result.error);
        setError(result.error || 'Signup failed');
      }
    } catch (error) {
      console.error('💥 Signup error:', error);
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="auth-popup-overlay">
      <div className="auth-popup">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Create Account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>I am a:</label>
            <select name="userType" value={formData.userType} onChange={handleChange}>
              <option value="renter">Renter</option>
              <option value="agent">Real Estate Agent</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <div className="auth-switch">
          <p>Already have an account? <button onClick={onSwitchToLogin}>Login</button></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPopup;