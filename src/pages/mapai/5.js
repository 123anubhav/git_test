import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const [markers, setMarkers] = useState([]);

  const handleMapClick = (event) => {
    const { latLng } = event;
    const newMarker = {
      id: Date.now(),
      position: {
        lat: latLng.lat(),
        lng: latLng.lng(),
      },
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };

  return (
    <LoadScript googleMapsApiKey="GOOGLE_MAPS_API_KEY='AIzaSyC4TQVz0zicFzb_HOg4v_5TgAHRXJ-dLBU'
    ">
      <GoogleMap
        zoom={12}
        center={{ lat: 0, lng: 0 }}
        onClick={handleMapClick}
        mapContainerStyle={{ height: '100vh', width: '100%' }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={{
              url: '/marker.png', // Path to your marker icon
              scaledSize: new window.google.maps.Size(32, 32), // Adjust the size of the marker icon
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
