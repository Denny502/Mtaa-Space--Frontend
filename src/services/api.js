// Mock API service - replace with real endpoints later
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ApiService {
  // Properties
  async getProperties(filters = {}) {
    await delay(500);
    
    // Get from localStorage or use mock data
    const savedProperties = localStorage.getItem('properties');
    let properties = savedProperties ? JSON.parse(savedProperties) : [];
    
    // Apply filters
    if (filters.location) {
      properties = properties.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.bedrooms) {
      properties = properties.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
    }
    if (filters.price) {
      properties = properties.filter(p => {
        const priceNum = parseInt(p.price.replace(/[^\d]/g, ''));
        const filterPrice = parseInt(filters.price);
        return priceNum <= filterPrice;
      });
    }
    
    return { success: true, data: properties };
  }

  async getPropertyById(id) {
    await delay(300);
    
    const savedProperties = localStorage.getItem('properties');
    const properties = savedProperties ? JSON.parse(savedProperties) : [];
    const property = properties.find(p => p.id === parseInt(id));
    
    if (!property) {
      return { success: false, error: 'Property not found' };
    }
    
    return { success: true, data: property };
  }

  async createProperty(propertyData) {
    await delay(500);
    
    const savedProperties = localStorage.getItem('properties');
    const properties = savedProperties ? JSON.parse(savedProperties) : [];
    
    const newProperty = {
      id: Date.now(),
      ...propertyData,
      createdAt: new Date().toISOString(),
      featured: false
    };
    
    const updatedProperties = [...properties, newProperty];
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
    
    return { success: true, data: newProperty };
  }

  async updateProperty(id, propertyData) {
    await delay(500);
    
    const savedProperties = localStorage.getItem('properties');
    const properties = savedProperties ? JSON.parse(savedProperties) : [];
    
    const updatedProperties = properties.map(p => 
      p.id === parseInt(id) ? { ...p, ...propertyData } : p
    );
    
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
    const updatedProperty = updatedProperties.find(p => p.id === parseInt(id));
    
    return { success: true, data: updatedProperty };
  }

  async deleteProperty(id) {
    await delay(500);
    
    const savedProperties = localStorage.getItem('properties');
    const properties = savedProperties ? JSON.parse(savedProperties) : [];
    
    const updatedProperties = properties.filter(p => p.id !== parseInt(id));
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
    
    return { success: true, message: 'Property deleted successfully' };
  }

  // Authentication
  async login(credentials) {
    await delay(800);
    
    // Mock authentication - replace with real auth
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      const token = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return { 
        success: true, 
        data: { 
          token, 
          user: userWithoutPassword 
        } 
      };
    }
    
    return { success: false, error: 'Invalid email or password' };
  }

  async signup(userData) {
    await delay(800);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'User already exists with this email' };
    }
    
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const { password, ...userWithoutPassword } = newUser;
    const token = 'mock-jwt-token-' + Date.now();
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    return { 
      success: true, 
      data: { 
        token, 
        user: userWithoutPassword 
      } 
    };
  }

  // Favorites
  async getFavorites() {
    await delay(300);
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return { success: true, data: favorites };
  }

  async addFavorite(propertyId) {
    await delay(300);
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const properties = JSON.parse(localStorage.getItem('properties') || '[]');
    const property = properties.find(p => p.id === propertyId);
    
    if (!property) {
      return { success: false, error: 'Property not found' };
    }
    
    if (!favorites.find(f => f.id === propertyId)) {
      const updatedFavorites = [...favorites, property];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
    
    return { success: true, data: favorites };
  }

  async removeFavorite(propertyId) {
    await delay(300);
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.filter(f => f.id !== propertyId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    return { success: true, data: updatedFavorites };
  }

  // Inquiries
  async sendInquiry(inquiryData) {
    await delay(500);
    
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    const newInquiry = {
      id: Date.now(),
      ...inquiryData,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    
    const updatedInquiries = [...inquiries, newInquiry];
    localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
    
    return { success: true, data: newInquiry };
  }

  async getInquiries() {
    await delay(300);
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    return { success: true, data: inquiries };
  }
}

// Create instance and export
const apiService = new ApiService();
export default apiService;