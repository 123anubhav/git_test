
import React, { useState } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';


const Map = () => {
  const [location, setLocation] = useState(null); // state to store the extracted location
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 }); // state to store the map center coordinates

  const handleUserInput = async (userInput) => {
    const extractedLocation = extractLocation(userInput); // extract location from user input
    if (extractedLocation) {
      try {
        // Make API request to get coordinates of the extracted location
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${extractedLocation}&key=AIzaSyC4TQVz0zicFzb_HOg4v_5TgAHRXJ-dLBU`
          // `https://maps.googleapis.com/maps/api/geocode/json?address=${extractedLocation}&key=YOUR_API_KEY`
        );
        const { results } = response.data;
        if (results.length > 0) {
          // Set the extracted location and map center coordinates
          setLocation(extractedLocation);
          setMapCenter(results[0].geometry.location);
        } else {
          setLocation(null);
          setMapCenter({ lat: 0, lng: 0 });
        }
      } catch (error) {
        console.error('Error getting location coordinates:', error);
        setLocation(null);
        setMapCenter({ lat: 0, lng: 0 });
      }
    } else {
      setLocation(null);
      setMapCenter({ lat: 0, lng: 0 });
    }
  };

  return (
    <div>
      <h1>Google Maps Example</h1>
      <input type="text" onChange={(e) => handleUserInput(e.target.value)} placeholder="Enter location" />
      {location && (
        <LoadScript googleMapsApiKey="YOUR_API_KEY">
          <GoogleMap center={mapCenter} zoom={12} mapContainerStyle={{ height: '500px', width: '100%' }}>
            <Marker position={mapCenter} />
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default Map;
