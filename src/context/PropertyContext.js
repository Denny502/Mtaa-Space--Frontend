import React, { createContext, useContext, useState, useEffect } from 'react';

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all properties
  const fetchProperties = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 Fetching properties with filters:', filters);
      
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/api/properties?${queryParams}`;
      console.log('🌐 Fetch URL:', url);
      
      const response = await fetch(url);
      console.log('📡 Fetch response status:', response.status);
      
      const responseText = await response.text();
      console.log('📄 Fetch response preview:', responseText.substring(0, 200));
      
      if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.status}`);
      }
      
      const data = JSON.parse(responseText);
      console.log('✅ Fetched properties:', data.length);
      
      setProperties(data.data || data);
      return { success: true, data: data.data || data };
    } catch (err) {
      console.error('❌ Fetch properties error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Fetch featured properties
  const fetchFeaturedProperties = async () => {
    try {
      console.log('🔄 Fetching featured properties');
      
      const response = await fetch('/api/properties/featured');
      console.log('📡 Featured response status:', response.status);
      
      const responseText = await response.text();
      console.log('📄 Featured response preview:', responseText.substring(0, 200));
      
      if (!response.ok) {
        throw new Error('Failed to fetch featured properties');
      }
      
      const data = JSON.parse(responseText);
      setFeaturedProperties(data.data || data);
      return { success: true, data: data.data || data };
    } catch (err) {
      console.error('❌ Fetch featured properties error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Add new property
  const addProperty = async (propertyData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 PropertyContext: Starting addProperty');
      console.log('📦 Property data received:', propertyData);
      
      const token = localStorage.getItem('token');
      console.log('🔑 Token exists:', !!token);
      console.log('🔑 Token preview:', token ? `${token.substring(0, 20)}...` : 'No token');
      
      const apiUrl = '/api/properties';
      console.log('🌐 Making POST request to:', apiUrl);
      
      const requestBody = JSON.stringify(propertyData);
      console.log('📦 Request body:', requestBody);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: requestBody
      });
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      console.log('📡 Response URL:', response.url);
      
      // Get the response as text first to check if it's HTML
      const responseText = await response.text();
      console.log('📄 Response length:', responseText.length);
      console.log('📄 Response type:', responseText.trim().startsWith('<!') ? 'HTML' : 'JSON');
      console.log('📄 Response preview (first 500 chars):', responseText.substring(0, 500));
      
      let result;
      
      // Check if response is HTML (starts with <!DOCTYPE or <html)
      if (responseText.trim().startsWith('<!')) {
        console.error('❌ SERVER RETURNED HTML INSTEAD OF JSON!');
        console.error('📄 Full HTML response (first 1000 chars):', responseText.substring(0, 1000));
        
        if (response.status === 404) {
          throw new Error('Backend endpoint not found (404). The server is returning an HTML error page. Check if: 1) Backend is running, 2) Routes are properly configured, 3) URL is correct.');
        } else if (response.status === 500) {
          throw new Error('Server error (500). Backend has an internal error.');
        } else {
          throw new Error(`Server returned HTML instead of JSON. Status: ${response.status}. This usually means the endpoint does not exist.`);
        }
      }
      
      // Try to parse as JSON
      try {
        result = JSON.parse(responseText);
        console.log('✅ Successfully parsed JSON response:', result);
      } catch (parseError) {
        console.error('❌ Failed to parse response as JSON:', parseError);
        console.error('❌ Response that failed to parse:', responseText);
        throw new Error('Server returned invalid JSON format. Response: ' + responseText.substring(0, 200));
      }
      
      if (!response.ok) {
        console.error('❌ Response not OK:', result);
        throw new Error(result.message || `Server returned error status: ${response.status}`);
      }
      
      if (!result.success) {
        console.error('❌ Backend reported failure:', result);
        throw new Error(result.message || 'Backend failed to add property');
      }
      
      const newProperty = result.data || result;
      console.log('🎉 Property created successfully:', newProperty);
      
      // Update local state
      setProperties(prev => [newProperty, ...prev]);
      console.log('✅ Property added to local state');
      
      return { 
        success: true, 
        data: newProperty,
        message: result.message || 'Property added successfully!'
      };
      
    } catch (err) {
      console.error('❌ PropertyContext addProperty error:', err);
      console.error('❌ Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      
      const errorMessage = err.message || 'Unknown error occurred while adding property';
      setError(errorMessage);
      
      return { 
        success: false, 
        error: errorMessage,
        details: err.toString()
      };
    } finally {
      setLoading(false);
      console.log('🏁 addProperty completed - loading set to false');
    }
  };

  // Update property
  const updateProperty = async (propertyId, propertyData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 PropertyContext: Starting updateProperty for ID:', propertyId);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(propertyData)
      });
      
      console.log('📡 Update response status:', response.status);
      
      const responseText = await response.text();
      console.log('📄 Update response preview:', responseText.substring(0, 200));
      
      const result = JSON.parse(responseText);
      console.log('✅ Update response:', result);
      
      if (!response.ok) throw new Error(result.message || 'Failed to update property');
      
      setProperties(prev => prev.map(p => p.id === propertyId ? result.data : p));
      return { success: true, data: result.data };
      
    } catch (err) {
      console.error('❌ Update property error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Delete property
  const deleteProperty = async (propertyId) => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 PropertyContext: Starting deleteProperty for ID:', propertyId);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('📡 Delete response status:', response.status);
      
      if (!response.ok) throw new Error('Failed to delete property');
      
      setProperties(prev => prev.filter(p => p.id !== propertyId));
      return { success: true };
    } catch (err) {
      console.error('❌ Delete property error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get agent's properties
  const getAgentProperties = async (agentId) => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 Fetching agent properties for:', agentId);
      
      const response = await fetch(`/api/properties/agent/${agentId}`);
      console.log('📡 Agent properties response status:', response.status);
      
      const responseText = await response.text();
      console.log('📄 Agent properties response preview:', responseText.substring(0, 200));
      
      if (!response.ok) throw new Error('Failed to fetch agent properties');
      
      const data = JSON.parse(responseText);
      return { success: true, data: data.data || data };
    } catch (err) {
      console.error('❌ Fetch agent properties error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => {
    console.log('🧹 Clearing property error');
    setError(null);
  };

  // Initialize
  useEffect(() => {
    console.log('🔄 PropertyProvider initialized');
    console.log('📡 Fetching initial properties and featured properties...');
    fetchProperties();
    fetchFeaturedProperties();
  }, []);

  const value = {
    // State
    properties,
    featuredProperties,
    loading,
    error,
    
    // Methods
    fetchProperties,
    fetchFeaturedProperties,
    addProperty,
    updateProperty,
    deleteProperty,
    getAgentProperties,
    clearError,
    
    // Debug info
    debugInfo: {
      lastUpdate: new Date().toISOString(),
      propertiesCount: properties.length,
      featuredCount: featuredProperties.length
    }
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};