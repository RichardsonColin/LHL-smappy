function initMap() {
let mapData ={};

if (!map_data) {
  mapData = {
    lat: 48.4245,
    long: -123.3630,
    zoom: 14
  };
} else {
  let importData = JSON.parse(map_data);

  mapData = {
    lat: importData.map_data1.lat,
    long: importData.map_data1.long,
    zoom: Number(importData.map_data1.zoom)
  };
}

  var map = new google.maps.Map(document.getElementById("googleMap"), {

    center: new google.maps.LatLng(mapData.lat, mapData.long),
    zoom: mapData.zoom,
    noClear: true

    }),
    //this may be the stored data
    data = {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-0.120850, 51.508742]
        },
        "properties": {}
      }]
    },
    win = new google.maps.InfoWindow,


    //some buttons for interaction
    ctrl = document.getElementById('datactrl'),


    fx = {
      'data-save': {
        click: function() {
          //use this method to store the data somewhere,
          //e.g. send it to a server
          console.log('map.data', map.data);
          console.log('data', data);
          map.data.toGeoJson(function(json) {
            data = json;
          });

        }
      },
      'data-show': {
        click: function() {
          alert('you may send this JSON-string to a server and store it there:\n\n' +
            JSON.stringify(data))
          console.log(data);
        }
      },
      'data-load': {
        click: function() {
          //use this method to load the data from somwhere
          //e.g. from a server via loadGeoJson

          map.data.forEach(function(f) {
            map.data.remove(f);
          });
          map.data.addGeoJson(data)
        },
        init: true
      },
      'data-clear': {
        click: function() {
          //use this method to clear the data
          //when you also want to remove the data on the server
          //send a geoJSON with empty features-array to the server

          map.data.forEach(function(f) {
            map.data.remove(f);
          });
          data = {
            type: "FeatureCollection",
            features: []
          };


        }
      }
    };


  for (var id in fx) {
    var o = ctrl.querySelector('input[id=' + id + ']');
    google.maps.event.addDomListener(o, 'click', fx[id].click);
    if (fx[id].init) {
      google.maps.event.trigger(o, 'click');
    }
  }




  map.controls[google.maps.ControlPosition.TOP_CENTER].push(ctrl);




  function placeMarker(location) {
    var feature = new google.maps.Data.Feature({
      geometry: location
    });
    map.data.add(feature);
  }
  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });


  google.maps.event.addListener(map.data, 'click', function(e) {
    if (e.feature.getGeometry().getType() === 'Point') {

      win.setOptions({
        content: 'Latitude: ' + e.feature.getGeometry().get().lat() +
          '<br>Longitude: ' + e.feature.getGeometry().get().lng(),
        pixelOffset: new google.maps.Size(0, -40),
        map: map,
        position: e.feature.getGeometry().get()
      });
    }
  });


  // });
}