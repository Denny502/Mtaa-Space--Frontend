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
  const [propertiesLoaded, setPropertiesLoaded] = useState(false);

  // Fetch all properties from API
  const fetchProperties = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 Fetching properties from API...');
      
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/properties?${queryParams}`);
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.status}`);
      }
      
      const data = await response.json();
      const propertiesData = data.data || data || [];
      
      console.log('✅ Properties loaded from API:', propertiesData.length);
      console.log('📝 Property IDs:', propertiesData.map(p => p.id || p._id));
      
      // Debug property IDs
      propertiesData.forEach((property, index) => {
        console.log(`Property ${index + 1}:`, {
          title: property.title,
          id: property.id,
          _id: property._id,
          idType: typeof property.id,
          _idType: typeof property._id
        });
      });
      
      setProperties(propertiesData);
      setPropertiesLoaded(true);
      
      // Additional debugging
      console.log('🔍 DEBUG: Properties set in state:', propertiesData.length);
      propertiesData.forEach((prop, index) => {
        console.log(`Property ${index + 1} in state:`, {
          title: prop.title,
          id: prop.id,
          _id: prop._id,
          hasId: !!prop.id,
          has_id: !!prop._id
        });
      });
      
      // Update featured properties - newest available properties first
      const featured = propertiesData
        .filter(property => property.available !== false)
        .sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at))
        .slice(0, 6);
      
      setFeaturedProperties(featured);
      console.log('⭐ Featured properties updated:', featured.length);
      
      return { success: true, data: propertiesData };
    } catch (err) {
      console.error('❌ Fetch properties error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get property by ID - ENHANCED VERSION
  const getPropertyById = (propertyId) => {
    console.log('🔍 getPropertyById searching for:', propertyId);
    console.log('📊 Properties loaded:', propertiesLoaded);
    console.log('📦 Total properties in state:', properties.length);
    
    if (!propertyId) {
      console.log('❌ No property ID provided');
      return null;
    }
    
    // Convert to string for consistent comparison
    const searchId = propertyId.toString().trim();
    console.log('🔍 Searching for ID (string):', searchId);
    
    // Find property by checking multiple ID fields and formats
    const foundProperty = properties.find(property => {
      const id1 = property.id?.toString().trim();
      const id2 = property._id?.toString().trim();
      
      console.log(`🔍 Checking property: "${property.title}"`);
      console.log(`   - property.id: ${id1}`);
      console.log(`   - property._id: ${id2}`);
      console.log(`   - Looking for: ${searchId}`);
      
      // Check for exact matches
      const match = id1 === searchId || id2 === searchId;
      if (match) {
        console.log('🎯 MATCH FOUND!');
      }
      return match;
    });
    
    if (foundProperty) {
      console.log('✅ Property FOUND:', foundProperty.title);
      return foundProperty;
    }
    
    console.log('❌ Property NOT FOUND in local state');
    console.log('🔍 All available property IDs:', properties.map(p => ({
      id: p.id,
      _id: p._id,
      title: p.title
    })));
    
    return null;
  };

  // Add new property - AUTO FEATURE
  const addProperty = async (propertyData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('➕ Adding new property...');
      
      const token = localStorage.getItem('token');
      const enhancedPropertyData = {
        ...propertyData,
        featured: true, // Auto-feature new properties
        available: true,
        createdAt: new Date().toISOString()
      };
      
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(enhancedPropertyData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to add property: ${response.status}`);
      }
      
      const result = await response.json();
      const newProperty = result.data || result;
      
      console.log('🎉 Property added successfully:', newProperty);
      
      // Update local state immediately
      setProperties(prev => {
        const updatedProperties = [newProperty, ...prev];
        
        // Update featured properties with new property included
        const featured = updatedProperties
          .filter(property => property.available !== false)
          .sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at))
          .slice(0, 6);
        
        setFeaturedProperties(featured);
        return updatedProperties;
      });
      
      return { 
        success: true, 
        data: newProperty,
        message: 'Property added successfully! It will appear in Featured Properties and Rentals.'
      };
      
    } catch (err) {
      console.error('❌ Add property error:', err);
      const errorMessage = err.message || 'Failed to add property';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Update property
  const updateProperty = async (propertyId, propertyData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('✏️ Updating property:', propertyId);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(propertyData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update property');
      }
      
      const result = await response.json();
      const updatedProperty = result.data || result;
      
      // Update local state
      setProperties(prev => {
        const updatedProperties = prev.map(p => 
          (p.id === propertyId || p._id === propertyId) ? updatedProperty : p
        );
        
        // Update featured properties
        const featured = updatedProperties
          .filter(property => property.available !== false)
          .sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at))
          .slice(0, 6);
        
        setFeaturedProperties(featured);
        return updatedProperties;
      });
      
      return { success: true, data: updatedProperty };
      
    } catch (err) {
      console.error('❌ Update property error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Add property to local state (fallback when API fails)
  const addPropertyToLocalState = (propertyData) => {
    console.log('💾 Adding property to local state (fallback)...');
    
    const newProperty = {
      ...propertyData,
      id: Date.now().toString(), // Generate a unique ID
      _id: Date.now().toString(), // Also set _id for compatibility
      featured: true,
      available: true,
      createdAt: new Date().toISOString()
    };
    
    console.log('🆔 Generated property ID:', newProperty.id);
    
    // Update local state
    setProperties(prev => {
      const updatedProperties = [newProperty, ...prev];
      
      // Update featured properties
      const featured = updatedProperties
        .filter(property => property.available !== false)
        .sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at))
        .slice(0, 6);
      
      setFeaturedProperties(featured);
      return updatedProperties;
    });
    
    return { 
      success: true, 
      data: newProperty,
      message: 'Property added to local state! It will appear in Featured Properties and Rentals.'
    };
  };

  // Debug function to test property lookup
  const debugPropertyLookup = (testId) => {
    console.log('🧪 DEBUG: Testing property lookup for ID:', testId);
    console.log('📊 Current properties count:', properties.length);
    console.log('📊 Properties loaded:', propertiesLoaded);
    
    const foundProperty = getPropertyById(testId);
    
    if (foundProperty) {
      console.log('✅ SUCCESS: Property found:', foundProperty.title);
    } else {
      console.log('❌ FAILED: Property not found');
      console.log('🔍 Available property IDs:', properties.map(p => ({
        id: p.id,
        _id: p._id,
        title: p.title
      })));
    }
    
    return foundProperty;
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Load properties on component mount
  useEffect(() => {
    console.log('🏠 PropertyProvider initialized - loading properties...');
    fetchProperties();
  }, []);

  const value = {
    // State
    properties,
    featuredProperties,
    loading,
    error,
    propertiesLoaded, // Add this to track loading state
    
    // Methods
    fetchProperties,
    addProperty,
    addPropertyToLocalState,
    updateProperty,
    getPropertyById,
    debugPropertyLookup,
    clearError
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};