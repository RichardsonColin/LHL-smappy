$(() => {

    $.ajax ({
            url: "/api/current-map-markers",
            method: 'POST',
            data: JSON.parse(map_data),
            success: function (markers) {
              for(let map of markers) {
              $("<li>").text(`${map.title}`).appendTo($(".map-markers-list"));
              }

          }
    });

});



 // $( '#favourite-map' ).click(function() {
 //    // console.log('HEYO');


 //  });
