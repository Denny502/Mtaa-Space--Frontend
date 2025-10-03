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
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    price: '',
    bedrooms: '',
    type: '',
    studio: false,
    bedsitter: false
  });

  // Load properties from localStorage on initial load
  useEffect(() => {
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    } else {
      // Initialize with KENYAN property data including Studios and Bedsitters
      const sampleProperties = [
        {
          id: 1,
          title: "Modern Studio Apartment in Westlands",
          price: 25000,
          rentPeriod: "monthly",
          location: "Westlands, Nairobi",
          bedrooms: 1,
          bathrooms: 1,
          area: 400,
          type: "apartment",
          isStudio: true,
          isBedsitter: false,
          description: "Beautiful modern studio apartment in the heart of Westlands. Perfect for young professionals with open layout, kitchenette, and great amenities.",
          amenities: ["WiFi", "Security", "Water Backup", "Gym", "Swimming Pool", "Parking"],
          agent: {
            id: 1,
            name: "Sarah Kimani",
            email: "sarah@mtaaspace.com",
            phone: "+254 712 345 678",
            image: "https://via.placeholder.com/100/667eea/white?text=SK",
            rating: 4.8,
            reviews: 34
          },
          images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop"
          ],
          featured: true,
          available: true,
          hasBalcony: true,
          hasParking: true,
          hasSecurity: true,
          views: 156,
          saves: 23,
          daysListed: 5,
          leaseTerm: "6-12 months",
          deposit: 25000,
          createdAt: "2024-01-15"
        },
        {
          id: 2,
          title: "Cozy Bedsitter in Kilimani",
          price: 15000,
          rentPeriod: "monthly",
          location: "Kilimani, Nairobi",
          bedrooms: 1,
          bathrooms: 1,
          area: 300,
          type: "apartment",
          isStudio: false,
          isBedsitter: true,
          description: "Affordable and cozy bedsitter in Kilimani area. Self-contained unit with kitchen area and all basic amenities included.",
          amenities: ["WiFi", "Security", "Water Backup", "Furnished", "24/7 Security"],
          agent: {
            id: 2,
            name: "Mike Otieno",
            email: "mike@mtaaspace.com",
            phone: "+254 723 456 789",
            image: "https://via.placeholder.com/100/43e97b/white?text=MO",
            rating: 4.5,
            reviews: 28
          },
          images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=400&fit=crop"
          ],
          featured: true,
          available: true,
          hasBalcony: false,
          hasParking: false,
          hasSecurity: true,
          views: 89,
          saves: 12,
          daysListed: 7,
          leaseTerm: "6-12 months",
          deposit: 15000,
          createdAt: "2024-01-10"
        },
        {
          id: 3,
          title: "Spacious 3-Bedroom Apartment in Kileleshwa",
          price: 85000,
          rentPeriod: "monthly",
          location: "Kileleshwa, Nairobi",
          bedrooms: 3,
          bathrooms: 2,
          area: 1800,
          type: "apartment",
          isStudio: false,
          isBedsitter: false,
          description: "Luxurious 3-bedroom apartment in premium Kileleshwa neighborhood. Perfect for families with spacious rooms and modern amenities.",
          amenities: ["WiFi", "Security", "Water Backup", "Gym", "Swimming Pool", "Parking", "Balcony", "DSL Internet"],
          agent: {
            id: 1,
            name: "Sarah Kimani",
            email: "sarah@mtaaspace.com",
            phone: "+254 712 345 678",
            image: "https://via.placeholder.com/100/667eea/white?text=SK",
            rating: 4.8,
            reviews: 34
          },
          images: [
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=400&fit=crop"
          ],
          featured: true,
          available: true,
          hasBalcony: true,
          hasParking: true,
          hasSecurity: true,
          views: 203,
          saves: 45,
          daysListed: 3,
          leaseTerm: "12-24 months",
          deposit: 85000,
          createdAt: "2024-01-08"
        },
        {
          id: 4,
          title: "Affordable Studio in South B",
          price: 18000,
          rentPeriod: "monthly",
          location: "South B, Nairobi",
          bedrooms: 1,
          bathrooms: 1,
          area: 350,
          type: "apartment",
          isStudio: true,
          isBedsitter: false,
          description: "Budget-friendly studio apartment in South B. Great location with easy access to town and all necessary amenities.",
          amenities: ["WiFi", "Security", "Water Backup", "Furnished"],
          agent: {
            id: 3,
            name: "Emily Wanjiku",
            email: "emily@mtaaspace.com",
            phone: "+254 734 567 890",
            image: "https://via.placeholder.com/100/ff9a9e/white?text=EW",
            rating: 4.6,
            reviews: 22
          },
          images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1540518614846-7eded102d7bf?w=600&h=400&fit=crop"
          ],
          featured: false,
          available: true,
          hasBalcony: false,
          hasParking: false,
          hasSecurity: true,
          views: 67,
          saves: 8,
          daysListed: 10,
          leaseTerm: "6 months",
          deposit: 18000,
          createdAt: "2024-01-05"
        },
        {
          id: 5,
          title: "Modern Bedsitter in Westlands",
          price: 22000,
          rentPeriod: "monthly",
          location: "Westlands, Nairobi",
          bedrooms: 1,
          bathrooms: 1,
          area: 320,
          type: "apartment",
          isStudio: false,
          isBedsitter: true,
          description: "Recently renovated bedsitter in prime Westlands location. Features modern finishes and great security.",
          amenities: ["WiFi", "Security", "Water Backup", "Modern Kitchen", "Furnished"],
          agent: {
            id: 2,
            name: "Mike Otieno",
            email: "mike@mtaaspace.com",
            phone: "+254 723 456 789",
            image: "https://via.placeholder.com/100/43e97b/white?text=MO",
            rating: 4.5,
            reviews: 28
          },
          images: [
            "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600&h=400&fit=crop"
          ],
          featured: false,
          available: true,
          hasBalcony: true,
          hasParking: true,
          hasSecurity: true,
          views: 94,
          saves: 15,
          daysListed: 6,
          leaseTerm: "12 months",
          deposit: 22000,
          createdAt: "2024-01-03"
        },
        {
          id: 6,
          title: "Luxury Studio in Kilimani",
          price: 35000,
          rentPeriod: "monthly",
          location: "Kilimani, Nairobi",
          bedrooms: 1,
          bathrooms: 1,
          area: 450,
          type: "apartment",
          isStudio: true,
          isBedsitter: false,
          description: "High-end studio apartment with premium finishes in Kilimani. Features luxury amenities and great views.",
          amenities: ["WiFi", "Security", "Water Backup", "Gym", "Pool", "Parking", "Balcony", "Concierge"],
          agent: {
            id: 3,
            name: "Emily Wanjiku",
            email: "emily@mtaaspace.com",
            phone: "+254 734 567 890",
            image: "https://via.placeholder.com/100/ff9a9e/white?text=EW",
            rating: 4.6,
            reviews: 22
          },
          images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=400&fit=crop"
          ],
          featured: true,
          available: true,
          hasBalcony: true,
          hasParking: true,
          hasSecurity: true,
          views: 178,
          saves: 32,
          daysListed: 4,
          leaseTerm: "12 months",
          deposit: 35000,
          createdAt: "2024-01-01"
        }
      ];
      setProperties(sampleProperties);
      localStorage.setItem('properties', JSON.stringify(sampleProperties));
    }
  }, []);

  // Save to localStorage whenever properties change
  useEffect(() => {
    if (properties.length > 0) {
      localStorage.setItem('properties', JSON.stringify(properties));
    }
  }, [properties]);

  // Filter properties based on search criteria
  const filteredProperties = properties.filter(property => {
    if (searchFilters.location && !property.location.toLowerCase().includes(searchFilters.location.toLowerCase())) {
      return false;
    }
    if (searchFilters.bedrooms && property.bedrooms < parseInt(searchFilters.bedrooms)) {
      return false;
    }
    if (searchFilters.type && property.type !== searchFilters.type) {
      return false;
    }
    if (searchFilters.studio && !property.isStudio) {
      return false;
    }
    if (searchFilters.bedsitter && !property.isBedsitter) {
      return false;
    }
    return true;
  });

  // CRUD Operations
  const addProperty = (propertyData) => {
    const newProperty = {
      id: Date.now(),
      ...propertyData,
      type: propertyData.type || "apartment",
      isStudio: propertyData.isStudio || false,
      isBedsitter: propertyData.isBedsitter || false,
      featured: false,
      available: true,
      rentPeriod: propertyData.rentPeriod || "monthly",
      views: 0,
      saves: 0,
      daysListed: 0,
      createdAt: new Date().toISOString().split('T')[0],
      images: propertyData.images || ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"],
      amenities: propertyData.amenities || []
    };
    
    const updatedProperties = [...properties, newProperty];
    setProperties(updatedProperties);
    return Promise.resolve({ success: true, data: newProperty });
  };

  const updateProperty = (id, updatedData) => {
    const updatedProperties = properties.map(property =>
      property.id === id ? { ...property, ...updatedData } : property
    );
    setProperties(updatedProperties);
    return Promise.resolve({ success: true, data: updatedProperties.find(p => p.id === id) });
  };

  const deleteProperty = (id) => {
    const updatedProperties = properties.filter(property => property.id !== id);
    setProperties(updatedProperties);
    return Promise.resolve({ success: true, message: 'Property deleted successfully' });
  };

  const getPropertyById = (id) => {
    return properties.find(property => property.id === parseInt(id));
  };

  const getFeaturedProperties = () => {
    return properties.filter(property => property.featured).slice(0, 6);
  };

  const getPropertiesByAgent = (agentId) => {
    return properties.filter(property => property.agent?.id === agentId);
  };

  const value = {
    // Properties
    properties: filteredProperties,
    allProperties: properties,
    featuredProperties: getFeaturedProperties(),
    
    // Search
    searchFilters,
    setSearchFilters,
    
    // CRUD Operations
    addProperty,
    updateProperty,
    deleteProperty,
    getPropertyById,
    getPropertiesByAgent
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};