

function initMap () {

  let mapOptions = {
    center: {lat: 52.596678, lng: -134.757003},
    zoom: 3,
    mapTypeId: 'roadmap'

  };

  const map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

}

