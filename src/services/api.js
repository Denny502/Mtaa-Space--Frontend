const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  // Auth endpoints
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    signup: `${API_BASE_URL}/auth/signup`,
    me: `${API_BASE_URL}/auth/me`,
  },
  
  // Property endpoints
  properties: {
    base: `${API_BASE_URL}/properties`,
    featured: `${API_BASE_URL}/properties/featured`,
    agent: (agentId) => `${API_BASE_URL}/properties/agent/${agentId}`,
    search: `${API_BASE_URL}/properties/search`,
  },
  
  // Favorites endpoints
  favorites: {
    base: `${API_BASE_URL}/favorites`,
    user: (userId) => `${API_BASE_URL}/favorites/user/${userId}`,
  }
};

// Helper function for authenticated requests
export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  };

  const response = await fetch(url, config);
  
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Authentication required');
  }
  
  return response;
};