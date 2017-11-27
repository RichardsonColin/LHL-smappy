var allInfoWindows = [];
var markers = [];
var uniqueId = 1;
var newMarkerLat = 0;
var newMarkerLong = 0;
var mapid = 0;
var currentMarker = 0;

//Closes the windows of other markers
function closeInfoWindows() {
  while (allInfoWindows.length > 0) {
    allInfoWindows[0].close();
    allInfoWindows.shift();
  }
}

function cancelMarker(id) {
  //Find and remove the marker from the Array
  //Doesn't always work, not sure what breaks it
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].id === id) {
      //Remove the marker from Map
      markers[i].setMap(null);

      //Remove the marker from array.
      markers.splice(i, 1);
      return;
    }

  }

};


//won't work for some reason
function activateUpdateForm() {
  console.log('in activate update form function');
  $(".update-marker").css('visibility', 'visibile');
  var $openUpdate = $('.open-update');
  $openUpdate.click(function() {
    event.preventDefault();
    console.log('clicked the update button');
    $(".update-marker").css('visibility', 'visibile');
  });
}

// upon clicking the save button will write to DB and reload page
function saveMarkerInfo(mapid) {
  var $saveButton = $('.save-button');
  $saveButton.click(function() {
    event.preventDefault();
    var newMarkerData = {
      map_id: mapid,
      lat: newMarkerLat,
      long: newMarkerLong,
      title: $('.marker-title').val(),
      description: $('.marker-description').val(),
      picture: $('.picture-url').val()
    };

    $.ajax ({
              url: '/new-marker',
              method: 'POST',
              data: newMarkerData,
              success: function (result) {
              console.log('IM THE RETURNED DATA', result);
              document.location.reload();
            }
    });

    $(".marker-info").css('visibility', 'hidden');
    console.log('data object', newMarkerData);
  });
}

// upon clicking the update button will write to DB and reload page
// functionality not tested yet
function updateMarkerInfo(mapid) {
  var $updateButton = $('.update-button');
  $updateButton.click(function() {
    event.preventDefault();
    console.log('update button clicked');
    var updateMarkerData = {
      map_id: mapid,
      //where to define/update markerid?
      id: markerid,
      title: $('.marker-title').val(),
      description: $('.marker-description').val(),
      picture: $('.picture-url').val()
    };

    $.ajax ({
              url: '/update-marker',
              method: 'POST',
              data: updateMarkerData,
              success: function (result) {
              console.log('IM THE RETURNED DATA', result);
              document.location.reload();
            }
    });

    // $(".marker-info").css('visibility', 'hidden');
  });
}

// upon clicking the delete button will write to DB and reload page
function deleteMarkerInfo() {
  var $deleteButton = $('.delete-button');
  $deleteButton.click(function() {
    event.preventDefault();
    console.log('delete button clicked');

    $.ajax ({
              url: '/delete-marker',
              method: 'POST',
              //markerid
              data: 'markerid',
              success: function() {
                document.location.reload();
              }
    });

    // $(".marker-info").css('visibility', 'hidden');
  });
}

// upon clicking the cancel button will remove the marker from the
function removeMarker() {
  var $cancelButton = $('.cancel-button');
  $cancelButton.on('click', function() {
    event.preventDefault();
    cancelMarker(markers.length);
    $(".marker-info").css('visibility', 'hidden');
  });
}

// populates the map with markers from the database and creates the infoboxes
function drawMarkers(data, map) {
  data.forEach(function (point) {
    var latLng = new google.maps.LatLng(point.lat, point.long);
    var infoBox = `<p>${point.title}</p>`;
    if(point.description) {
      infoBox += `<p>${point.description}</p>`;
    }
    if(point.picture) {
      infoBox += `<img class="marker-image" src="${point.picture}" height="100" width="100">`;
    }

    infoBox += "<input type='button' value='update' onclick='activateUpdateForm();' class='markerbutton' value = 'update' />  <input type='button' value='delete' onclick='DeleteMarker();' class='deletemarkerbutton' />";

    // infoBox += "<input type = 'button' value = 'update' onclick = 'activateUpdateForm();' value = 'update' />";
    // infoBox += `<button class="open-update">update</button>`;
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      databaseId: point.id,
      infoBox: infoBox
    });




    $("<p>").text(point.title).prependTo($(".markers-list"));

    marker.id = uniqueId;
    uniqueId++;
    google.maps.event.addListener(marker, "click", function () {
      closeInfoWindows();
      var content = marker.infoBox;
      var infoWindow = new google.maps.InfoWindow({
        content: content
      });
      currentMarker = marker.databaseId;
      allInfoWindows.push(infoWindow);
      $(".update-marker").css('visibility', 'visibile');
      console.log('clicked a marker');
      infoWindow.open(map, marker);

    });

    markers.push(marker);
  });

}


//creates the map
function drawMap (data) {
  var mapData = data.map_data1;
  var pointsData = data.markers_input;
  var mapOptions = {
    center: new google.maps.LatLng(mapData.lat, mapData.long),
    zoom: Number(mapData.zoom),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

  drawMarkers(pointsData, map);

  //Attach click event handler to the map.
  google.maps.event.addListener(map, 'click', function (e) {

    //Determine the location where the user has clicked.
    var location = e.latLng;

    //Create a marker and placed it on the map.
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });

    var markerLocation = marker.getPosition();
    newMarkerLat = markerLocation.lat();
    newMarkerLong = markerLocation.lng();

    marker.id = uniqueId;
    uniqueId++;
    //make the window to add information to the marker appear
    $(".marker-info").css('visibility', 'visible');

    //adds marker to array so it can be removed later
    markers.push(marker);
  });


saveMarkerInfo(mapid);
removeMarker();
activateUpdateForm();
}


//This function is called by the page
function initMap() {
var mapData = {};

  var importData = JSON.parse(map_data);

  mapid = importData.map_data1.id;
  drawMap(importData);

}