//Contains the functionality for loading a saved map and all its saved markers. Allows for saving, updating, and deleting markers

var allInfoWindows = [];
var markers = [];
var uniqueId = 1;
var newMarkerLat = 0;
var newMarkerLong = 0;
var mapid = 0;
var currentMarker = 0;
// var loggedIn = false;

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
}

// upon clicking the save button will write to DB and reload page
function saveMarkerInfo(mapid) {
  var $saveButton = $('.save-button');
  $saveButton.click(function() {
    event.preventDefault();
    var title = $('.marker-title').val();
    var description = $('.marker-description').val();
    var newMarkerData = {
      map_id: mapid,
      lat: newMarkerLat,
      long: newMarkerLong,
      title: title,
      description: description,
      picture: $('.picture-url').val()
    };

    $.ajax ({
              url: '/new-marker',
              method: 'POST',
              data: newMarkerData,
              success: function (result) {
              document.location.reload();
            }
    });

    $(".marker-info").css('visibility', 'hidden');
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
    var infoBox = `<p class="marker-title">${point.title}</p>`;
    if(point.description) {
      infoBox += `<p class="marker-description">${point.description}</p>`;
    }
    if(point.picture) {
      infoBox += `<img class="marker-image" src="${point.picture}" >`;
    }


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
      infoWindow.open(map, marker);
    });
    markers.push(marker);
  });
}


//creates the map
function drawMap (mapid) {

  var importData = {};
  $.ajax ({
          url: "/api/getMap",
          method: 'POST',
          data: {id: mapid}
  }).done(function(mapData) {
          importData.map_data1 = mapData;
          $('.current-map-title').append(`<h4>${importData.map_data1.title}</h4>`)

          var mapData = importData.map_data1;
          var mapOptions = {
            center: new google.maps.LatLng(mapData.lat, mapData.long),
            zoom: Number(mapData.zoom),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
          };

          var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

  // makes a list of the current markers
    $.ajax ({
          url: "/api/current-map-markers",
          method: 'POST',
          data: {id: mapid}
    }).done(function (markers) {
          importData.markers_input = markers;
          for(var entry of importData.markers_input) {
            if (loggedIn) {
              $("<li>").data({'mapid': `${entry.id}`,'title':`${entry.title}`, 'description':`${entry.description}`, 'picture':`${entry.picture}`}).html(`${entry.title} <span class="edit-remove-marker">edit</span>`).appendTo($(".map-markers-list"));
            } else {
              $("<li>").data({'mapid': `${entry.id}`,'title':`${entry.title}`, 'description':`${entry.description}`, 'picture':`${entry.picture}`}).html(`${entry.title}`).appendTo($(".map-markers-list"));
            }
          }

          drawMarkers(markers, map);

          if (loggedIn) {

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
          }



    });
  });

}

//This function is called by the page
function initMap() {
  mapid = map_num;
  drawMap(mapid);
}

// TODO refactor code so all button activation code is implemented the same way
$(() => {



  // opens the edit marker window and populates it will the markers current information
  $(document).on('click', '.edit-remove-marker', (function() {
    var $id = $(this).parent().data();
    $(document).find('.update-marker').css('visibility', 'visible');
    $(document).find('input[name="marker-name"]').val(`${$id.title}`).data({'id': `${$id.mapid}`});
    $(document).find('textarea').text(`${$id.description}`);
    $(document).find('input[name="marker-url"]').val(`${$id.picture}`);
  }));

  // activates the update button so that it writes new information to the database
  $(document).on('click', '.update-button', (function(event) {
    var $id = $(document).find('input[name="marker-name"]').data();
      event.preventDefault();
      var title = $('.update-marker-title').val();
      var description = $('.update-marker-description').val();
      var updateMarkerData = {
        map_id: mapid,
        id: $id.id,
        title: $('.update-marker-title').val(),
        description: $('.update-marker-description').val(),
        picture: $('.update-picture-url').val()
      };

      $.ajax ({
              url: '/update-marker',
              method: 'POST',
              data: updateMarkerData,
              success: function (result) {
              document.location.reload();
            }
      });

  }));

  // activates the delete button so that when clicked it deletes the current marker from the database
  $(document).on('click', '.delete-button', (function(event) {
  event.preventDefault();
    var $id = $(document).find('input[name="marker-name"]').data();
    var id = {id: $id.id};

    $.ajax ({
              url: '/delete-marker',
              method: 'POST',
              data: id,
              success: function() {
                document.location.reload();
              }
    });
  }));

  // activates the cancel button in the updata window so that when clicked it closes the update window
  $(document).on('click', '.cancel-update-button', (function(event) {
    event.preventDefault();
    $(document).find('.update-marker').css('visibility', '');
  }));

});
