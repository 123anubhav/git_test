// Import the required libraries
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

// Define the GoogleMap component
const GoogleMap = ({ location }) => {
  // Define the API key for Google Map
  const apiKey = 'AIzaSyC4TQVz0zicFzb_HOg4v_5TgAHRXJ-dLBU';

  // Define the center coordinates and zoom level for the map
  const center = {
    lat: location.lat,
    lng: location.lng
  };
  const zoom = 14;

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {/* Mark the location on the map */}
        <Marker lat={location.lat} lng={location.lng} text={location.name} />
      </GoogleMapReact>
    </div>
  );
};

// Define the Marker component to mark the location on the map
const Marker = ({ text }) => <div>{text}</div>;

// Define the main component
const LocationMap = () => {
  // Define the state to store user input and location data
  const [userInput, setUserInput] = useState('');
  const [location, setLocation] = useState(null);

  // Handle user input change
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the extractLocation function to extract location from user input
    const extractedLocation = extractLocation(userInput);
    if (extractedLocation) {
      // If location is extracted, update the state with location data
      setLocation({
        name: extractedLocation,
        lat: 0, // set the initial latitude value
        lng: 0 // set the initial longitude value
      });
    } else {
      // If no location is extracted, reset the state
      setLocation(null);
    }
  };

  return (
    <div>
      <h1>Location Map</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a location"
          value={userInput}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {location && (
        <GoogleMap location={location} />
      )}
    </div>
  );
};

export default LocationMap;
