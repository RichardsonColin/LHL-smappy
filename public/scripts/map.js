const allInfoWindows = [];

function closeInfoWindows() {
  while (allInfoWindows.length > 0) {
    allInfoWindows[0].close();
    allInfoWindows.shift();
  }
}

function initMap() {
let mapData = {};

if (!map_data) {
  mapData = {
    lat: 49.28,
    long: -123.11,
    zoom: 14
  };
} else {
  let importData = JSON.parse(map_data);

  console.log(importData);
  drawMap(importData);

}

  // var map = new google.maps.Map(document.getElementById("googleMap"), {

  //   center: new google.maps.LatLng(mapData.lat, mapData.long),
  //   zoom: mapData.zoom,
  //   noClear: true

  //   }),



  //   // this may be the stored data
    data = {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": []
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


  // for (var id in fx) {
  //   var o = ctrl.querySelector('input[id=' + id + ']');
  //   google.maps.event.addDomListener(o, 'click', fx[id].click);
  //   if (fx[id].init) {
  //     google.maps.event.trigger(o, 'click');
  //   }
  // }


// console.log('map', map);

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

function drawMap (data) {
  let markerArr = [];
  let mapData = data.map_data1;
  console.log('in drawmap', mapData);
  // document.querySelector('#mapTitleInput').value = mapData.title;
  let pointsData = data.markers_input;
  console.log('indrawmap', pointsData);

  let mapOptions = {
    center: new google.maps.LatLng(mapData.lat, mapData.long),
    zoom: Number(mapData.zoom),
    // mapTypeId: google.maps.MapTypeId.ROADMAP,

  };

  map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

  pointsData.forEach(function (point) {
    console.log(point);
    let latLng = new google.maps.LatLng(point.lat, point.long);
    let infoBox = `<p>${point.title}</p> <p>${point.description}</p>`;

    // {
    //   title: point.title,
    //   description: point.description
    // }
    let marker = new google.maps.Marker({
      position: latLng,
      map: map,
      infoBox: infoBox
    });
    console.log('marker', marker.infoBox);
    google.maps.event.addListener(marker, "click", function () {
      closeInfoWindows();
      var content = marker.infoBox;
      var infoWindow = new google.maps.InfoWindow({
        content: content
      });
      allInfoWindows.push(infoWindow);
      console.log('all infor windows', allInfoWindows);
      infoWindow.open(map, marker);
    });
  });




  //   let thisMarker = marker(point.lat, point.lng, map, point.name, point.description, point.img_url);
  //   thisMarker['infoBox'] = {
  //     title: point.name,
  //     description: point.description,
  //     url: point.img_url
  //   };
    // markerArr.push(thisMarker);
  // });

  // return map;

}


     // window.eqfeed_callback = function(results) {
     //    for (var i = 0; i < results.features.length; i++) {
     //      var coords = results.features[i].geometry.coordinates;
     //      var latLng = new google.maps.LatLng(coords[1],coords[0]);
     //      var marker = new google.maps.Marker({
     //        position: latLng,
     //        map: map
     //      });
     //    }
     //  }