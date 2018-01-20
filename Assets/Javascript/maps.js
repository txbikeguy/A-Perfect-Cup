

var pos;
var map, infoWindow;

      function initMap() {

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow = new google.maps.InfoWindow();
            marker = new google.maps.Marker({
              map: map
            })

            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 44.9778, lng: -93.2650},
                zoom: 15
              });

            marker.setPosition(pos);
            infoWindow.open(map);
            map.setCenter(pos);
            
              var service = new google.maps.places.PlacesService(map);
              service.nearbySearch({
                keyword: "coffee shop",
                location: pos,
                radius: 2500,
                
              }, callback);

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        };
      };

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      };
      function createMarker(place) {
        console.log(place);
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.setContent(place.name);
          infoWindow.open(map, this);
        });
        google.maps.event.addListener(marker, 'click', function() {
              infoWindow.setContent('<div><br><strong>' + place.name + '</strong><br>' +
                place.vicinity + '<br>' +
                place.rating + ' Stars' + '</div>');
              infoWindow.open(map, this);
            });
      };

      

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      };
