// Commented out code relates to markers on the map that at this moment is not needed.
var lat = 0;
var lon = 0;
var zoom = 0;


function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('googleMap'), {
          center: {lat: 53.1233, lng: -4.6582},
          zoom: 3,
          mapTypeId: 'roadmap'
        });



        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          //console.log(map.zoom);
          searchBox.setBounds(map.getBounds());
          lat = (map.getBounds().f.b + map.getBounds().f.f) / 2;
          lon = (map.getBounds().b.b + map.getBounds().b.f) / 2;
          zoom = map.zoom;
        });
        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          //Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            // console.log('place', place.geometry.viewport.b.f);
            // console.log('place', place.geometry.viewport.b.b);
            // console.log('place', place.geometry.viewport.f.b);
            // console.log('place', place.geometry.viewport.f.f);

            // latA = place.geometry.viewport.b.f;
            // latB = place.geometry.viewport.b.b;
            // lonA = place.geometry.viewport.f.b;
            // lonB = place.geometry.viewport.f.f;

            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          //console.log(markers[0].map.mapUrl);
          map.fitBounds(bounds);
        });
      }

$(() => {
  $('.create-map').hide();

  $('body').on('click', function() {
    $('#hidden-field').val([lat, lon, zoom]);
  });

  $('#create-map-submit').on('click', function() {
    console.log(lat, lon, zoom);
    $('#pac-input').focusout();
    $('#hidden-form').submit();
  });

  $('#pac-input').on('keypress', function(event){
    if(event.which === 13){
      $(this).focusout();
    }
  });

  $('#pac-input').on('focusout', function() {
    $('.create-map').slideDown('slow');
  });

// function mySubmit() {
//      document.getElementById('hiddenField').value = [lat, lon, zoom];
//      document.getElementById('create-map-form').submit();
//    }

});





