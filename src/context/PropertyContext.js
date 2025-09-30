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
    bathrooms: ''
  });

  // Load properties from localStorage on initial load
  useEffect(() => {
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    } else {
      // Initialize with sample APARTMENT data only
      const sampleProperties = [
        {
          id: 1,
          title: "Luxury Downtown Apartment",
          price: "€2,500/month",
          location: "Manhattan, New York",
          bedrooms: 2,
          bathrooms: 2,
          area: 1200,
          type: "apartment",
          description: "Stunning luxury apartment in the heart of downtown with panoramic city views, modern amenities, and concierge service. Features hardwood floors, stainless steel appliances, and floor-to-ceiling windows.",
          amenities: ["Concierge", "Gym", "Pool", "Security", "Parking", "Balcony", "Air Conditioning", "In-unit Laundry"],
          agent: {
            id: 1,
            name: "Sarah Johnson",
            email: "sarah@apartmentrentals.com",
            phone: "+1 (555) 123-4567",
            image: "https://via.placeholder.com/100/667eea/white?text=SJ"
          },
          images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&h=400&fit=crop"
          ],
          featured: true,
          available: true,
          leaseTerm: "12 months",
          deposit: "€2,500",
          createdAt: "2024-01-15"
        },
        {
          id: 2,
          title: "Modern Studio Apartment",
          price: "€1,200/month",
          location: "Brooklyn, New York",
          bedrooms: 1,
          bathrooms: 1,
          area: 600,
          type: "apartment",
          description: "Cozy and modern studio apartment in trendy Brooklyn neighborhood. Perfect for young professionals with open layout, updated kitchen, and easy access to public transportation.",
          amenities: ["Modern Kitchen", "Hardwood Floors", "Public Transport", "Pet Friendly"],
          agent: {
            id: 2,
            name: "Mike Thompson",
            email: "mike@apartmentrentals.com",
            phone: "+1 (555) 987-6543",
            image: "https://via.placeholder.com/100/43e97b/white?text=MT"
          },
          images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=400&fit=crop"
          ],
          featured: true,
          available: true,
          leaseTerm: "6-12 months",
          deposit: "€1,200",
          createdAt: "2024-01-10"
        },
        {
          id: 3,
          title: "Spacious 3-Bedroom Apartment",
          price: "€3,800/month",
          location: "Queens, New York",
          bedrooms: 3,
          bathrooms: 2,
          area: 1800,
          type: "apartment",
          description: "Large family-friendly apartment with spacious rooms, updated kitchen, and plenty of storage. Located in a quiet neighborhood with excellent schools and parks nearby.",
          amenities: ["Family Friendly", "Park View", "Storage", "Dishwasher", "Central AC"],
          agent: {
            id: 1,
            name: "Sarah Johnson",
            email: "sarah@apartmentrentals.com",
            phone: "+1 (555) 123-4567",
            image: "https://via.placeholder.com/100/667eea/white?text=SJ"
          },
          images: [
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=400&fit=crop"
          ],
          featured: true,
          available: true,
          leaseTerm: "12-24 months",
          deposit: "€3,800",
          createdAt: "2024-01-08"
        },
        {
          id: 4,
          title: "Penthouse with City Views",
          price: "€5,500/month",
          location: "Manhattan, New York",
          bedrooms: 2,
          bathrooms: 2,
          area: 1600,
          type: "apartment",
          description: "Luxurious penthouse apartment with breathtaking city views, private terrace, and high-end finishes. Features gourmet kitchen, spa-like bathrooms, and smart home technology.",
          amenities: ["Penthouse", "Terrace", "City View", "Smart Home", "Gourmet Kitchen", "Concierge"],
          agent: {
            id: 3,
            name: "Emily Davis",
            email: "emily@apartmentrentals.com",
            phone: "+1 (555) 456-7890",
            image: "https://via.placeholder.com/100/ff9a9e/white?text=ED"
          },
          images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1540518614846-7eded102d7bf?w=600&h=400&fit=crop"
          ],
          featured: false,
          available: true,
          leaseTerm: "12 months",
          deposit: "€5,500",
          createdAt: "2024-01-05"
        },
        {
          id: 5,
          title: "Cozy 1-Bedroom Apartment",
          price: "€1,800/month",
          location: "Williamsburg, Brooklyn",
          bedrooms: 1,
          bathrooms: 1,
          area: 700,
          type: "apartment",
          description: "Charming one-bedroom apartment in the heart of Williamsburg. Features exposed brick walls, modern appliances, and close proximity to cafes, restaurants, and nightlife.",
          amenities: ["Exposed Brick", "Modern Appliances", "Trendy Location", "Bike Storage"],
          agent: {
            id: 2,
            name: "Mike Thompson",
            email: "mike@apartmentrentals.com",
            phone: "+1 (555) 987-6543",
            image: "https://via.placeholder.com/100/43e97b/white?text=MT"
          },
          images: [
            "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600&h=400&fit=crop"
          ],
          featured: false,
          available: true,
          leaseTerm: "12 months",
          deposit: "€1,800",
          createdAt: "2024-01-03"
        },
        {
          id: 6,
          title: "Modern High-Rise Apartment",
          price: "€4,200/month",
          location: "Financial District, Manhattan",
          bedrooms: 2,
          bathrooms: 2,
          area: 1400,
          type: "apartment",
          description: "Contemporary high-rise apartment with stunning river views, floor-to-ceiling windows, and premium amenities. Building features rooftop terrace, fitness center, and 24/7 security.",
          amenities: ["High-Rise", "River View", "Rooftop", "Fitness Center", "24/7 Security", "Floor-to-Ceiling Windows"],
          agent: {
            id: 3,
            name: "Emily Davis",
            email: "emily@apartmentrentals.com",
            phone: "+1 (555) 456-7890",
            image: "https://via.placeholder.com/100/ff9a9e/white?text=ED"
          },
          images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=400&fit=crop"
          ],
          featured: true,
          available: true,
          leaseTerm: "12-18 months",
          deposit: "€4,200",
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
    if (searchFilters.bathrooms && property.bathrooms < parseInt(searchFilters.bathrooms)) {
      return false;
    }
    return true;
  });

  // CRUD Operations
  const addProperty = (propertyData) => {
    const newProperty = {
      id: Date.now(),
      ...propertyData,
      type: "apartment", // Force apartment type
      featured: false,
      available: true,
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