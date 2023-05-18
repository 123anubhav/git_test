
import React, { useEffect } from "react";

const MapPage = () => {
  useEffect(() => {
    let map;

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

    const showLocationsOnMap = () => {
      const location1 = document.getElementById("location1").value.trim();
      const location2 = document.getElementById("location2").value.trim();
      const location3 = document.getElementById("location3").value.trim();

      if (!location1 && !location2 && !location3) {
        showError("Please enter at least one location.");
        return;
      }

      const geocoder = new window.google.maps.Geocoder();

      if (location1) {
        geocoder.geocode({ address: location1 }, (results, status) => {
          if (status === "OK") {
            new window.google.maps.Marker({
              position: results[0].geometry.location,
              map,
              title: location1,
            });
            map.setCenter(results[0].geometry.location);
          } else {
            showError(`Failed to geocode location 1: ${status}`);
          }
        });
      }

      
      if (location2) {
        geocoder.geocode({ address: location2 }, (results, status) => {
          if (status === "OK") {
            new window.google.maps.Marker({
              position: results[0].geometry.location,
              map,
              title: location2,
            });
            map.setCenter(results[0].geometry.location);
          } else {
            showError(`Failed to geocode location 2: ${status}`);
          }
        });
      }

      if (location3) {
        geocoder.geocode({ address: location3 }, (results, status) => {
          if (status === "OK") {
            new window.google.maps.Marker({
              position: results[0].geometry.location,
              map,
              title: location3,
            });
            map.setCenter(results[0].geometry.location);
          } else {
            showError(`Failed to geocode location 3: ${status}`);
          }
        });
      }
    };

    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      showLocationsOnMap();
    });

    initMap();
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
        // src="
        

      ></script>
    </div>
  );
};

export default MapPage;
