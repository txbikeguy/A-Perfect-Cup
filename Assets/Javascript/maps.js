//-----------------------------------------------------
// SEARCH MENU API
//-----------------------------------------------------

   // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyCQBHZo_ekSLeRSliWPTcJcrvyhto8yyk0",
//   authDomain: "findacup.firebaseapp.com",
//   databaseURL: "https://findacup.firebaseio.com",
//   projectId: "findacup",
//   storageBucket: "findacup.appspot.com",
//   messagingSenderId: "849669101282"
// };

// firebase.initializeApp(config);
// var searchData = firebase.database();

// // Global Var
//   var local = "";
//   var dist  = "";
//   var amen  = "";
//   var selectedAmen = [];
//   var childData = "";
// $("#submit").on("click", function(event) {
//   event.preventDefault();
// // Grabs user input
//   local = $("#yourLocation").val().trim();
//   dist  = $("#distance option:selected").val().trim();
  
//   //Grab selected Materials to an array.
//  select = $("#amenities"),
//     ul = select.prev();
    
//     ul.children('li').toArray().forEach(function (li, i) {
//         if ($(li).hasClass('active')) {
//           selectedAmen.push(select.children('option').toArray()[i].value);
//         }
//     });
      
//     select.val(selectedAmen);

// amen = selectedAmen;

// console.log("distance is:", dist);
// console.log("amenities is:", $("#amenities").val());
// console.log("Amen is:", amen);

// // Creates local "temporary" object for holding coffee data. 
//   var newCoffee = {
//     Location: local,
//     Distance: dist,
//     Amenities: amen,
//   };
   
// // Push to the database(firebase)
//    searchData.ref().push(newCoffee); 

// if ( select.value != "closed" ){
// //Need code to set it to the closed selection. 
// console.log("working");
// }

// searchData.ref().on("value", function(snapshot) {

//       // Log everything that's coming out of snapshot
//       console.log(snapshot.val());
//       console.log(snapshot.val().local);
//       console.log(snapshot.val().dist);
//       console.log(snapshot.val().amen);
      
    

//       // Handle the errors
//     }, function(errorObject) {
//       console.log("Errors handled: " + errorObject.code);
//     });

// });


//Google Maps API
$(".showHide").on("click", function() {
       //console.log(showMoreResults);
       showMore(showMoreResults);
     });

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
                zoom: 13
              });

            marker.setPosition(pos);
            infoWindow.open(map);
            map.setCenter(pos);
            var request = {
              placeId: 'placeIds'
            };
            
              var service = new google.maps.places.PlacesService(map);
              service.nearbySearch({
                rankBy: google.maps.places.RankBy.DISTANCE,
                keyword: "coffee shop",
                location: pos,                
              }, callback);

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        };
      

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      };
    };

      function callback(results, status) {
       showMoreResults = results;
       var placeIds = [];
       if (status === google.maps.places.PlacesServiceStatus.OK) {
         for (var i = 0; i < 4; i++) {
           placeIds.push(results[i].id);
           createMarker(results[i]);
           //console.log(placeIds);
         }
       }
     };
     function showMore(results) {
       //console.log('here');
       for (var i=4; i <results.length; i++) {
         createMarker(results[i]);
       }
     }
      function createMarker(place) {
        //console.log(place);
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        if (place.opening_hours.open_now = true) {
          var openNow = "Currently Open";
        } 
        else {
          var openNow = "Currently Closed"
        };

        $("#result").append("<div id='places'><h5 class='placeName'>" + place.name + "</h5><p class='address'><a href='https://www.google.com/maps/dir/?api=1&origin=" + pos.lat + "," + pos.lng + "&destination=coffee&destination_place_id=" + place.place_id + "&dir_action=navigate' target='_blank'>" + place.vicinity + "</a></p>" + "<p class='ratingOpenNow'>Rating: " + place.rating + " Stars&nbsp;&nbsp;|&nbsp;&nbsp;" + openNow + "</p></div>")

        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.setContent(place.name);
          infoWindow.open(map, this);
        });
        google.maps.event.addListener(marker, 'click', function() {

              infoWindow.setContent("<div><h5 class='placeName'>" + place.name + "</h5><p class='address'><a href='https://www.google.com/maps/dir/?api=1&origin=" + pos.lat + "," + pos.lng + "&destination=coffee&destination_place_id=" + place.place_id + "&dir_action=navigate' target='_blank'>" +
                place.vicinity + "</a></p><p class='ratingOpenNow'>" +
                place.rating + " Stars&nbsp;&nbsp;|&nbsp;&nbsp;" + openNow + "</p></div>");

              infoWindow.open(map, this);
            });
      };

      

      
