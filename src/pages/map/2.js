import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useForm } from 'react-hook-form';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const MapPage = () => {
  const [locations, setLocations] = useState([]);
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (data) => {
    // Add the submitted location data to the locations array
    setLocations([...locations, data]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <input
          type="text"
          placeholder="Latitude"
          {...register('lat', { required: true })}
        />
        <input
          type="text"
          placeholder="Longitude"
          {...register('lng', { required: true })}
        />
        <input
          type="text"
          placeholder="Location name"
          {...register('locationName', { required: true })}
        />
        <input
          type="color"
          {...register('color', { required: true })}
        />
        <button type="submit">Submit</button>
      </form>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{
              lat: Number(location.lat),
              lng: Number(location.lng),
            }}
            options={{
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: location.color,
                fillOpacity: 1.0,
                strokeWeight: 0,
                scale: 10,
              },
            }}
          />
        ))}
      </GoogleMap>
      <script
        // src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4TQVz0zicFzb_HOg4v_5TgAHRXJ-dLBU&libraries=places"
         src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4TQVz0zicFzb_HOg4v_5TgAHRXJ-dLBU&libraries=places"

      ></script>
    </div>
  );
};

export default MapPage;
