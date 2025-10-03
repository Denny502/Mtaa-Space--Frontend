// Real API service - connects to your backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  // Helper method for API calls
  async apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add body if provided
    if (options.body) {
      config.body = options.body;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Properties
  async getProperties(filters = {}) {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) queryParams.append(key, filters[key]);
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/properties${queryString ? `?${queryString}` : ''}`;
    
    return this.apiCall(endpoint);
  }

  async getPropertyById(id) {
    return this.apiCall(`/properties/${id}`);
  }

  async createProperty(propertyData) {
    return this.apiCall('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
  }

  async updateProperty(id, propertyData) {
    return this.apiCall(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    });
  }

  async deleteProperty(id) {
    return this.apiCall(`/properties/${id}`, {
      method: 'DELETE',
    });
  }

  // Authentication - FIXED
  async login(credentials) {
    const result = await this.apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Handle backend response format
    if (result.success) {
      const token = result.token;
      const user = result.user;
      
      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Also return in the expected frontend format
        return {
          success: true,
          data: {
            token,
            user
          }
        };
      }
    }

    return result;
  }

  async signup(userData) {
    const result = await this.apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    // Handle backend response format
    if (result.success) {
      const token = result.token;
      const user = result.user;
      
      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Also return in the expected frontend format
        return {
          success: true,
          data: {
            token,
            user
          }
        };
      }
    }

    return result;
  }

  async getCurrentUser() {
    return this.apiCall('/auth/me');
  }

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true, message: 'Logged out successfully' };
  }

  // Favorites
  async getFavorites() {
    return this.apiCall('/favorites');
  }

  async addFavorite(propertyId) {
    return this.apiCall(`/favorites/${propertyId}`, {
      method: 'POST',
    });
  }

  async removeFavorite(propertyId) {
    return this.apiCall(`/favorites/${propertyId}`, {
      method: 'DELETE',
    });
  }

  // Inquiries
  async sendInquiry(inquiryData) {
    return this.apiCall('/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });
  }

  async getInquiries() {
    return this.apiCall('/inquiries');
  }
}

// Create instance and export
const apiService = new ApiService();
export default apiService;