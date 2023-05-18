import React, { useRef, useState } from 'react';

const MapPage = () => {
  const mapRef = useRef(null); // Reference to the map element
  const [location, setLocation] = useState(''); // State to store user input location

  // Function to extract location from user input
  const extractLocation = (userInput) => {
    const regex = /\b[A-Z][a-zA-Z]+\b(?:\s+\b[A-Z][a-zA-Z]+\b)*/g;
    const matches = userInput.match(regex);
    if (matches) {
      return matches[0];
    } else {
      return null;
    }
  };

  // Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const extractedLocation = extractLocation(location);
    if (extractedLocation) {
      // Call Google Maps API to get coordinates for extracted location
      // and update the map with the location coordinates
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: extractedLocation }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          const { lat, lng } = results[0].geometry.location;
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: 12,
          });
          new window.google.maps.Marker({
            position: { lat, lng },
            map,
            title: extractedLocation,
          });
        } else {
          console.error('Error geocoding location:', status);
        }
      });
    } else {
      console.error('No location found in input:', location);
    }
  };

  return (
    <div>
      <h1>Google Map</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a location..."
        />
        <button type="submit">Submit</button>
      </form>
      <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export default MapPage;
