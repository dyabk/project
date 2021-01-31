//Based on https://github.com/googlecodelabs/google-maps-nearby-search-js/edit/master/step4/index.html, but the code was modified.
    
    let pos;
    let map;
    let bounds;
    let infoWindow;
    let currentInfoWindow;
    let service;
    let infoPane;
    function initMap() {
      // Initialize variables
      bounds = new google.maps.LatLngBounds();
      infoWindow = new google.maps.InfoWindow();
      currentInfoWindow = infoWindow;
      /* TODO: Step 4A3: Add a generic sidebar */
      infoPane = document.getElementById('panel');

      // Try HTML5 geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 15
          });
          bounds.extend(pos);

          infoWindow.setPosition(pos);
          infoWindow.setContent('Your current location.');
          infoWindow.open(map);
          map.setCenter(pos);

          // Call Places Nearby Search on user's location
          getNearbyPlaces(pos);
        }, () => {
          // Browser supports geolocation, but user has denied permission
          handleLocationError(true, infoWindow);
        });
      } else {
        // Browser doesn't support geolocation
        handleLocationError(false, infoWindow);
      }
      const centerControlDiv = document.createElement("div");
      const control = new CenterControl(centerControlDiv, map, pos);
      centerControlDiv.index = 1;
      centerControlDiv.style.paddingTop = "10px";
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    }

    // Handle a geolocation error
    function handleLocationError(browserHasGeolocation, infoWindow) {
      // Set default location to Miami, Florida
      pos = { lat: 25.7617, lng: -80.1918 };
      map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
      });

      // Display an InfoWindow at the map center
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
      currentInfoWindow = infoWindow;

      // Call Places Nearby Search on the default location
      getNearbyPlaces(pos);
    }

    // Perform a Places Nearby Search Request
    function getNearbyPlaces(position) {
      let request = {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE,
        keyword: "(restaurants) AND (food pantry)"
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, nearbyCallback);
    }
    
    // Handle the results (up to 20) of the Nearby Search
    function nearbyCallback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results);
      }
    }
    
    // Set markers at the location of each place result
    function createMarkers(places) {
      places.forEach(place => {
        let marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name
        });

        /* TODO: Step 4B: Add click listeners to the markers */
        // Add click listener to each marker
        google.maps.event.addListener(marker, 'click', () => {
          let request = {
            placeId: place.place_id,
            fields: ['name', 'formatted_address', 'geometry', 'rating',
              'website', 'photos']
          };

          /* Only fetch the details of a place when the user clicks on a marker.
           * If we fetch the details for all place results as soon as we get
           * the search response, we will hit API rate limits. */
          service.getDetails(request, (placeResult, status) => {
            showDetails(placeResult, marker, status)
          });
        });

        // Adjust the map bounds to include the location of this marker
        bounds.extend(place.geometry.location);
      });
      /* Once all the markers have been placed, adjust the bounds of the map to
       * show all the markers within the visible area. */
      map.fitBounds(bounds);
    }

    /* TODO: Step 4C: Show place details in an info window */
    // Builds an InfoWindow to display details above the marker
    function showDetails(placeResult, marker, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        let placeInfowindow = new google.maps.InfoWindow();
        let rating = "None";
        if (placeResult.rating) rating = placeResult.rating;
        placeInfowindow.setContent('<div><strong>' + placeResult.name +
          '</strong><br>' + 'Rating: ' + rating + '</div>');
        placeInfowindow.open(marker.map, marker);
        currentInfoWindow.close();
        currentInfoWindow = placeInfowindow;
        showPanel(placeResult);
      } else {
        console.log('showDetails failed: ' + status);
      }
    }

    /* TODO: Step 4D: Load place details in a sidebar */
    // Displays place details in a sidebar
    function showPanel(placeResult) {
      // If infoPane is already open, close it
      if (infoPane.classList.contains("open")) {
        infoPane.classList.remove("open");
      }

      // Clear the previous details
      while (infoPane.lastChild) {
        infoPane.removeChild(infoPane.lastChild);
      }

      /* TODO: Step 4E: Display a Place Photo with the Place Details */
      // Add the primary photo, if there is one
      if (placeResult.photos) {
        let firstPhoto = placeResult.photos[0];
        let photo = document.createElement('img');
        photo.classList.add('hero');
        photo.src = firstPhoto.getUrl();
        infoPane.appendChild(photo);
      }

      // Add place details with text formatting
      let name = document.createElement('h1');
      name.classList.add('place');
      name.textContent = placeResult.name;
      /*infoPane.appendChild(name);*/
      if (placeResult.rating) {
        let rating = document.createElement('p');
        rating.classList.add('details');
        rating.textContent = `Rating: ${placeResult.rating} \u272e`;
        infoPane.appendChild(rating);
      }
      let address = document.createElement('p');
      address.classList.add('details');
      address.textContent = placeResult.formatted_address;
      infoPane.appendChild(address);
      if (placeResult.website) {
        let websitePara = document.createElement('p');
        let websiteLink = document.createElement('a');
        let websiteUrl = document.createTextNode(placeResult.website);
        websiteLink.appendChild(websiteUrl);
        websiteLink.title = placeResult.website;
        websiteLink.href = placeResult.website;
        websitePara.appendChild(websiteLink);
        infoPane.appendChild(websitePara);
      }

      // Open the infoPane
      infoPane.classList.add("open");
    }


class CenterControl {
  constructor(controlDiv, map, center) {
    this.map_ = map;
    // Set the center property upon construction
    this.center_ = new google.maps.LatLng(center);
    controlDiv.style.clear = "both";
    // Set CSS for the control border
    const goCenterUI = document.createElement("div");
    goCenterUI.id = "goCenterUI";
    goCenterUI.title = "Click to recenter the map";
    controlDiv.appendChild(goCenterUI);
    // Set CSS for the control interior
    const goCenterText = document.createElement("div");
    goCenterText.id = "goCenterText";
    goCenterText.innerHTML = "Center Map";
    goCenterUI.appendChild(goCenterText);
    // Set CSS for the setCenter control border
    const setCenterUI = document.createElement("div");
    setCenterUI.id = "setCenterUI";
    setCenterUI.title = "Click to change the center of the map";
    controlDiv.appendChild(setCenterUI);
    // Set CSS for the control interior
    const setCenterText = document.createElement("div");
    setCenterText.id = "setCenterText";
    setCenterText.innerHTML = "Set Center";
    setCenterUI.appendChild(setCenterText);
    // Set up the click event listener for 'Center Map': Set the center of
    // the map
    // to the current center of the control.
    goCenterUI.addEventListener("click", () => {
      const currentCenter = this.center_;
      this.map_.setCenter(currentCenter);
    });
    // Set up the click event listener for 'Set Center': Set the center of
    // the control to the current center of the map.
    setCenterUI.addEventListener("click", () => {
      const newCenter = this.map_.getCenter();
      this.center_ = newCenter;
    });
  }
}



