// Commented out code relates to markers on the map that at this moment is not needed.
// var lat = 0;
// var lon = 0;
// var zoom = 0;

var map;


function initAutocomplete() {

          map = new google.maps.Map(document.getElementById('googleMap'), {
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
          searchBox.setBounds(map.getBounds());
        });
        //var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          //Clear out the old markers.
          // markers.forEach(function(marker) {
          //   marker.setMap(null);
          // });
          // markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            // var icon = {
            //   url: place.icon,
            //   size: new google.maps.Size(71, 71),
            //   origin: new google.maps.Point(0, 0),
            //   anchor: new google.maps.Point(17, 34),
            //   scaledSize: new google.maps.Size(25, 25)
            // };

            // Create a marker for each place.
            // markers.push(new google.maps.Marker({
            //   map: map,
            //   icon: icon,
            //   title: place.name,
            //   position: place.geometry.location
            // }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }

$(() => {
  $('.create-map').hide();


  $('#create-map-form').on('submit', function(event) {
    event.preventDefault();
    $('#pac-input').focusout();

    var data = map.getCenter();
    var mapTitle = $('#map-name').val();

    // user_id will be replaced with cookie.
    mapData = {
      'title': mapTitle,
      'user_id': 1,
      'lat': data.lat(),
      'long': data.lng(),
      'zoom': map.getZoom()
    };

    // $.post('/new-map', mapData);

    $.ajax ({
              url: '/new-map',
              method: 'POST',
              data: mapData,
              success: function (result) {
              // var obj = JSON.parse(data);
              console.log('IM THE RETURNED DATA', result);
              // var id = obj._id;
              location.href = `/maps/${result}`;
            }
    });



  });

  $('#pac-input').on('keypress', function(event){
    if(event.which === 13){
      $(this).focusout();
    }
  });

  $('#pac-input').on('focusout', function() {
    $('.create-map').slideDown('slow');
  });
});





