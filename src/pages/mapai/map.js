import React, { useEffect } from 'react';

const GoogleMap = () => {
  // Use useEffect to load the Google Maps JavaScript API and create the map
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC4TQVz0zicFzb_HOg4v_5TgAHRXJ-dLBU&libraries=places`;
    

    script .onload = () => {
        // Create a new map object
        const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 }, // Default center coordinates
        zoom: 12 // Default zoom level
        });

        
          // Add a marker on the map
  new window.google.maps.Marker({
    position: { lat: 37.7749, lng: -122.4194 }, // Default marker coordinates
    map: map
  });
};

// Append the script to the DOM
document.head.appendChild(script);

// Clean up the script when the component unmounts
return () => {
  document.head.removeChild(script);
};

}, []);

return (
<div>
{/* Render a div with an id for the map */}
<div id="map" style={{ height: '300px', width: '100%' }}></div>
</div>
);
};

export default GoogleMap;
