import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const LocationMap = () => {
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  // Function to extract location from user input
  const extractLocation = () => {
    // You can implement your logic here to extract location from user input
    // For example, using a regular expression, NLP library, or any other method

    const locationArray = input.split(',');

  // Check if the array has exactly 2 elements
  if (locationArray.length === 2) {
    // Extract the latitude and longitude
    const latitude = parseFloat(locationArray[0]);
    const longitude = parseFloat(locationArray[1]);

    // Check if the extracted values are valid numbers
    if (!isNaN(latitude) && !isNaN(longitude)) {
      // Return an object with latitude and longitude
      return { latitude, longitude };
    }
  }

  // Return null if extraction fails
  return null;
    // For demonstration purposes, let's assume the user input is in the format "latitude,longitude"
    const [lat, long] = location.split(',');
    setLatitude(parseFloat(lat));
    setLongitude(parseFloat(long));
  };

  return (
    <div>
      <h1>Location Map</h1>
      <div>
        <label htmlFor="location-input">Enter location:</label>
        <input
          type="text"
          id="location-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={extractLocation}>Extract Location</button>
      </div>
      <div style={{ height: '400px', width: '100%' }}>
        <LoadScript googleMapsApiKey="AIzaSyC4TQVz0zicFzb_HOg4v_5TgAHRXJ-dLBU">
          <GoogleMap center={{ lat: latitude, lng: longitude }} zoom={15}>
            <Marker position={{ lat: latitude, lng: longitude }} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default LocationMap;
