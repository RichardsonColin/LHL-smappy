var map;

// Helper function for '/new-map' title input.
function noTitle(inputField) {
  if(!inputField.val()) {
    var errDiv = $('<div>').append($('<p>')).addClass('error');
    errDiv.text('Please enter a title');
    $('.create-map').prepend(errDiv);
    return true;
  }
}

// Google map API code.
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

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

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
  $('#pac-input').on('focusout', function() {
    $('.create-map').slideDown('slow');
  });

  $('#create-map-form').on('submit', function(event) {
    event.preventDefault();
    var data = map.getCenter();
    var mapTitle;
    var mapData;

    // If no title is given no post will happen.
    if(noTitle($('#map-name'))) {
      return;
    } else {
      mapTitle = $('#map-name').val();
    }

    // user_id will be replaced with cookie.
    mapData = {
      'title': mapTitle,
      'user_id': 1,
      'lat': data.lat(),
      'long': data.lng(),
      'zoom': map.getZoom()
    };

    $.ajax ({
              url: '/new-map',
              method: 'POST',
              data: mapData,
              success: function (result) {
              location.href = `/maps/${result}`;
            }
    });
  });

  $('#pac-input').on('keypress', function(event){
    if(event.which === 13){
      $(this).focusout();
    }
  });
});
