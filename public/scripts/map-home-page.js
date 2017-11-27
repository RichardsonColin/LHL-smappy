function initMap () {

  var mapOptions = {
    center: {lat: 52.596678, lng: -134.757003},
    zoom: 3,
    mapTypeId: 'roadmap'
  };

  var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

}

