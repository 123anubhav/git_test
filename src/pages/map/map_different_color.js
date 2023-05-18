import React, { useEffect } from "react";

const MapPage = () => {
  useEffect(() => {
    let map;
    const markerColors = ["red", "blue", "green","red", "yellow"]; // Define an array of marker colors

    const initMap = () => {
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });
    };


    const showError = (msg) => {
      const errorDiv = document.createElement("div");
      errorDiv.classList.add("error");
      errorDiv.textContent = msg;
      document.body.insertBefore(errorDiv, document.body.firstChild);
    };

    const showLocationOnMap = (location, index) => {
      if (!location) return;

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === "OK") {
          new window.google.maps.Marker({
            position: results[0].geometry.location,
            map,
            title: location,
            icon: {
              url: `http://maps.google.com/mapfiles/ms/icons/${markerColors[index]}.png`, // Assign different color markers based on index
            },
          });
          map.setCenter(results[0].geometry.location);
        } else {
          showError(`Failed to geocode location ${index + 1}: ${status}`);
        }
      });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const location1 = document.getElementById("location1").value.trim();
      const location2 = document.getElementById("location2").value.trim();
      const location3 = document.getElementById("location3").value.trim();
      showLocationOnMap(location1, 0);
      showLocationOnMap(location2, 1);
      showLocationOnMap(location3, 2);

    };

    initMap();
    const form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return (

    <div>
      <h1 style={{ textAlign: "center" }}>Map Multi Location</h1>
      <form>
        <label htmlFor="location1">Location 1:</label>
        <input type="text" id="location1" placeholder="Enter location 1" />
        <label htmlFor="location2">Location 2:</label>
        <input type="text" id="location2" placeholder="Enter location 2" />
        <label htmlFor="location3">Location 3:</label>
        <input type="text" id="location3" placeholder="Enter location 3" />
        <input type="submit" value="Show on Map" />
      </form>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4TQVz0zicFzb_HOg4v_5TgAHRXJ-dLBU&libraries=places"
      ></script>
    </div>
  );
};

export default MapPage;
