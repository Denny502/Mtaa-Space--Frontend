import React from 'react';
import './Location.css';

const Location = () => {
  const locations = [
    {
      region: "Kenya",
      cities: ["Nairobi", "Mombasa", "Kisumu", "Malindi"]
    },
  ]
  return (
    <div className="location">
      <div className="container">
        <div className="location-header">
          <h1>Our Locations</h1>
          <p>Find properties in these popular regions and cities</p>
        </div>
        
        <div className="locations-content">
          {locations.map((region, index) => (
            <div key={index} className="region-card">
              <h2>{region.region}</h2>
              <div className="cities-grid">
                {region.cities.map((city, cityIndex) => (
                  <div key={cityIndex} className="city-card">
                    <h3>{city}</h3>
                    <p>Explore properties in {city}</p>
                    <button className="btn btn-primary">View Properties</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Location;