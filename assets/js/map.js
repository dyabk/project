//Based on https://github.com/googlecodelabs/google-maps-nearby-search-js/edit/master/step4/index.html, but the code was modified.

let map;  
let defaultPosition;
let pos;
let bounds;
let infoWindow;
let currentInfoWindow;
let service;
let infoPane;
let defaultLocation;
let userLocation;
let userMarker;
    
function initMap() {
    //Initialize constants
    const userLocationMarker = {
        url: "https://citi-hack.com/markers/userMarker.png",
    };
    
    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    const styledMapType = new google.maps.StyledMapType(
        [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8ec3b9"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1a3646"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#64779e"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#334e87"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6f9ba5"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#7cd94a"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3C7680"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#cfd94a"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#255763"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#b0d5ce"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3a4762"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#669dc7"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#4e6d70"
          }
        ]
      }
    ],
        { name: "Styled Map" }
    );
    
    // Initialize variables
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow();
    currentInfoWindow = infoWindow;
    infoPane = document.getElementById('panel');
    
    //HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map = new google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 15,
                mapTypeControlOptions: {
                    mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
                },
            });
            //Associate the styled map with the MapTypeId and set it to display.
            map.mapTypes.set("styled_map", styledMapType);
            map.setMapTypeId("styled_map");
            createButtons(map, pos);
            bounds.extend(pos);
            
            userMarker = new google.maps.Marker({
                draggable: true,
                icon: userLocationMarker,
                map: map,
                position: pos,
            });
            
            google.maps.event.addListener(userMarker, 'dragend', function () {
                newPosition = this.getPosition();
                map.setCenter(newPosition); // Set map center to marker position
                updatePosition(newPosition.lat(), newPosition.lng()); // update position display
                localContextMapView.search();
                localContextMapView.maxPlaceCount = 10;
                localContextMapView.placeTypePreferences ['food pantries'];
            });
            
            /*google.maps.event.addListener(map, 'bounds_changed', function() {
                bounds = map.getBounds();
                ne = bounds.getNorthEast();
                sw = bounds.getSouthWest();
                document.getElementById('mapBounds').innerHTML = bounds.toUrlValue(6);
                getNearbyPlaces(pos);
            });*/
    
            infoWindow.setPosition(pos);
            infoWindow.setContent('Your location.');
    
            }, () => {
            // Browser supports geolocation, but user has denied permission
            handleLocationError(true, infoWindow, styledMapType, userLocationMarker);
        });
    } else {
        // Browser doesn't support geolocation
        handleLocationError(false, infoWindow, styledMapType, userLocationMarker);
    }
          
}
      
// Handle a geolocation error
function handleLocationError(browserHasGeolocation, infoWindow, styledMapType, userLocationMarker) {
    // Set default location to Miami, Florida
    pos = { lat: 25.7617, lng: -80.1918 };
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15,
        mapTypeControlOptions: {
            mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
        },
    });
    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set("styled_map", styledMapType);
    map.setMapTypeId("styled_map");
    createButtons(map, pos);
    userMarker = new google.maps.Marker({
        draggable: true,
        icon: userLocationMarker,
        map: map,
        position: pos,
    });
    
    google.maps.event.addListener(userMarker, 'dragend', function () {
        newPosition = this.getPosition();
        map.setCenter(newPosition); // Set map center to marker position
        updatePosition(newPosition.lat(), newPosition.lng()); // update position display
    });

    // Display an InfoWindow at the map center
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
    'Geolocation permissions denied. Using default location.' :
    'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
    currentInfoWindow = infoWindow;

    // Call Places Nearby Search on the default location
    // getNearbyPlaces(pos);
}

// Perform a Places Nearby Search Request
function getNearbyPlaces(position) {
    let request = {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE,
        keyword: "food pantries",
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
    
function eventDropOffButton() {
    var newDropOffPoint = prompt(" Enter Location For New Drop Off");
}

function eventPickUpButton(position) {
    getNearbyPlaces(position);
}
    
// Set markers at the location of each place result
function createMarkers(places) {
    const defaultMarker = {
        url: "https://citi-hack.com/markers/defaultMarker.png",
    };
    
    places.forEach(place => {
    let marker = new google.maps.Marker({
        position: place.geometry.location,
        icon: defaultMarker,
        map: map,
        title: place.name
    });
    

     //TODO: Step 4B: Add click listeners to the markers 
        //Add click listener to each marker
        google.maps.event.addListener(marker, 'click', () => {
          let request = {
            placeId: place.place_id,
            fields: ['name', 'formatted_address', 'geometry', 'rating',
              'website', 'photos']
          };

          //Only fetch the details of a place when the user clicks on a marker.
           //If we fetch the details for all place results as soon as we get
          //the search response, we will hit API rate limits. 
          service.getDetails(request, (placeResult, status) => {
            showDetails(placeResult, marker, status)
            
          });
        });

        //Adjust the map bounds to include the location of this marker
        bounds.extend(place.geometry.location);
      });
      // Once all the markers have been placed, adjust the bounds of the map to
       // show all the markers within the visible area. 
      map.fitBounds(bounds);
}
     
    //Locate the new position of a draggable marker (user or any other location)
    function geocodePosition(pos) 
    {
       geocoder = new google.maps.Geocoder();
       geocoder.geocode
        ({
            latLng: pos
        }, 
            function(results, status) 
            {
                if (status == google.maps.GeocoderStatus.OK) 
                {
                    $("#mapSearchInput").val(results[0].formatted_address);
                    $("#mapErrorMsg").hide(100);
                } 
                else 
                {
                    $("#mapErrorMsg").html('Cannot determine address at this location.'+status).show(100);
                }
            }
        );
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
    
    function createButtons(map, position) {
        var myPickUpControl = document.createElement('div');
        myPickUpControl.id = "btnPickUp";
        myPickUpControl.innerHTML = 'Picking Up';
        map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(myPickUpControl);
        myPickUpControl.addEventListener("click", getNearbyPlaces(position));
    
        var myDropOffControl = document.createElement('div');
        myDropOffControl.id = "btnDropOff";
        myDropOffControl.innerHTML ='Set Drop Off Point';
        map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(myDropOffControl);
        myDropOffControl.addEventListener("click", eventDropOffButton);
    }
    
    function updatePosition(lat, lng) {
        document.getElementById('dragStatus').innerHTML = '<p> Current Lat: ' + lat.toFixed(4) + ' Current Lng: ' + lng.toFixed(4) + '</p>';
    }







