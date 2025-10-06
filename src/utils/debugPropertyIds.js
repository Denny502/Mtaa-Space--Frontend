// Debug utility to help identify property ID issues
export const debugPropertyIds = (properties) => {
  console.log('🔍 DEBUG: Property ID Analysis');
  console.log('📊 Total properties:', properties.length);
  
  properties.forEach((property, index) => {
    console.log(`Property ${index + 1}:`, {
      title: property.title,
      id: property.id,
      _id: property._id,
      idType: typeof property.id,
      _idType: typeof property._id,
      hasId: !!property.id,
      has_id: !!property._id
    });
  });
  
  // Check for duplicate IDs
  const ids = properties.map(p => p.id || p._id).filter(Boolean);
  const uniqueIds = new Set(ids);
  
  if (ids.length !== uniqueIds.size) {
    console.warn('⚠️ WARNING: Duplicate property IDs found!');
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    console.log('Duplicate IDs:', duplicates);
  } else {
    console.log('✅ All property IDs are unique');
  }
  
  // Check for missing IDs
  const missingIds = properties.filter(p => !p.id && !p._id);
  if (missingIds.length > 0) {
    console.warn('⚠️ WARNING: Properties without IDs found!');
    console.log('Properties without IDs:', missingIds.map(p => p.title));
  } else {
    console.log('✅ All properties have IDs');
  }
};

export const testGetPropertyById = (getPropertyById, properties) => {
  console.log('🧪 Testing getPropertyById function...');
  
  properties.forEach(property => {
    const testId = property.id || property._id;
    if (testId) {
      const result = getPropertyById(testId);
      if (result) {
        console.log(`✅ Found property with ID ${testId}: ${result.title}`);
      } else {
        console.error(`❌ Failed to find property with ID ${testId}: ${property.title}`);
      }
    }
  });
};
