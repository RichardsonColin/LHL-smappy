const allInfoWindows = [];
const markers = [];
let uniqueId = 1;


function closeInfoWindows() {
  while (allInfoWindows.length > 0) {
    allInfoWindows[0].close();
    allInfoWindows.shift();
  }
}

function initMap() {
let mapData = {};

  let importData = JSON.parse(map_data);

  // console.log(importData);
  drawMap(importData);

}

function drawMap (data) {
  let markerArr = [];
  let mapData = data.map_data1;
  // console.log('in drawmap', mapData);
  // document.querySelector('#mapTitleInput').value = mapData.title;
  let pointsData = data.markers_input;
  // console.log('indrawmap', pointsData);

  let mapOptions = {
    center: new google.maps.LatLng(mapData.lat, mapData.long),
    zoom: Number(mapData.zoom),
    mapTypeId: google.maps.MapTypeId.ROADMAP,

  };

  const map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

  pointsData.forEach(function (point) {
    // console.log(point);
    let latLng = new google.maps.LatLng(point.lat, point.long);
    let infoBox = `<p>${point.title}</p> <p>${point.description}</p>`;
    let marker = new google.maps.Marker({
      position: latLng,
      map: map,
      databaseId: point.id,
      infoBox: infoBox
    });

    marker.id = uniqueId;
    uniqueId++;
    // console.log('marker', marker.infoBox);
    google.maps.event.addListener(marker, "click", function () {
      closeInfoWindows();
      console.log('clicked a marker');
      console.log(marker.id);
      var content = marker.infoBox;
      var infoWindow = new google.maps.InfoWindow({
        content: content
      });
      allInfoWindows.push(infoWindow);
      // console.log('all infor windows', allInfoWindows);
      infoWindow.open(map, marker);
    });

    markers.push(marker);
  });

  console.log(markers);



  //Attach click event handler to the map.
  google.maps.event.addListener(map, 'click', function (e) {

    //Determine the location where the user has clicked.
    var location = e.latLng;
    console.log('e.fa.x', e.fa.x);
    console.log('e.fa.y', e.fa.y);

    //Create a marker and placed it on the map.
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });

    marker.id = uniqueId;
    uniqueId++;
    $(".marker-info").css('visibility', 'visible');

    markers.push(marker);
    console.log(markers);
  });

}

