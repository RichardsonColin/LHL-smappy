//This is called by the / page when it loads, it calls a default map location.

function initMap () {

  var mapOptions = {
    center: {lat: 52.596678, lng: -134.757003},
    zoom: 3,
    mapTypeId: 'roadmap'
  };

  var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

}

