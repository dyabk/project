let map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: new google.maps.LatLng(25.7574, -80.3733),
        mapTypeId: "terrain",
    });
    
    var foodBanks = {
        "type": "FeatureCollection",
        "name": "Food banks",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": [
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Grove Outreach", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.2543261, 25.7278571 ] } },
        { "type": "Feature", "properties": { "Name": "Glory Temple Ministries", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.2338263, 25.8471552 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Saint Vincent de Paul Mother of Christ", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.4228722, 25.7440922 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Comunidad de Cristo", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.3040089, 25.7568134 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Verbo Community Outreach", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.3148667, 25.7783333 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - True Gospel", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.1932034, 25.8502207 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Glory Temple Ministry", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.2339176, 25.8471509 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Prayer and Praise International Ministry", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.224681, 25.830792 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Refuge Church of Our Lord", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.2245286, 25.8159756 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Food For Life Network", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.189722, 25.8096488 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Miami Rescue Mission", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.197514, 25.797901 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Saint John Baptist Church", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.2001904, 25.7873258 ] } },
        { "type": "Feature", "properties": { "Name": "Hallandale Food Pantry", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.1544771, 25.9818786 ] } },
        { "type": "Feature", "properties": { "Name": "Feeding South Florida", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.1735221, 25.9880838 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Jubilee Center Of South Broward", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.1482585, 26.0297387 ] } },
        { "type": "Feature", "properties": { "Name": "Liberia Economic & Social Development, Inc.", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.1542776, 26.0207617 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - L.E.S.", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.1555384, 26.0416978 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Davie Community Worship Center", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.2187551, 26.0706101 ] } },
        { "type": "Feature", "properties": { "Name": "iglesia Adventista Martes", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.1438214, 26.1075458 ] } },
        { "type": "Feature", "properties": { "Name": "New Hope World Outreach", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.140983, 26.141959 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Salvation Army of Broward", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.160767, 26.122326 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Cooperative Feeding", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.1910403, 26.1215343 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Miami Gardens Food Pantry Inc", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.212524, 25.951202 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - North Miami Church of God", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.1998635, 25.9059224 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - North Miami New Apostolic", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.2131992, 25.9013853 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - North Miami Church of Nazarene", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.2185808, 25.8881908 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Stop Hunger Inc.", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.171296, 25.886861 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - South Florida Urban Ministries", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.2190794, 25.8802158 ] } },
        { "type": "Feature", "properties": { "Name": "Miami Kosher Food Bank", "description": "The JCS Kosher Food Bank is the only food bank in Miami-Dade County to which those who observe kosher (kashrut) dietary laws can turn. JCS’ Kosher Food Bank provides food to more than 380 families and nearly 100 Holocaust survivors." }, "geometry": { "type": "Point", "coordinates": [ -80.1691726, 25.9642648 ] } },
        { "type": "Feature", "properties": { "Name": "Food Distribution Center - Reparando Portillos", "description": null }, "geometry": { "type": "Point", "coordinates": [ -80.3225728, 26.1131056 ] } }
        ]
    }
    
    map.data.addGeoJson(foodBanks);
    
    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "Near Me";
    locationButton.classList.add("custom-map-control-button");

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    
    locationButton.addEventListener("click", () => {
          // Try HTML5 geolocation.
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                infoWindow.open(map);
                map.setCenter(pos);
              },
              () => {
                handleLocationError(true, infoWindow, map.getCenter());
              }
            );
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
        });
    
    // Create a <script> tag and set the USGS URL as the source.
    //const script = document.createElement("script");
    // This example uses a local copy of the GeoJSON stored at

    //http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    //script.src = "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
    //document.getElementsByTagName("head")[0].appendChild(script);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

// Loop through the results array and place a marker for each
// set of coordinates.
const eqfeed_callback = function (results) {
  for (let i = 0; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);
    new google.maps.Marker({
      position: latLng,
      map: map,
    });
  }
};
