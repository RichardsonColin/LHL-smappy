$(() => {

  $( '#favourite-map' ).click(function() {
    // console.log('HEYO');

    $.ajax ({
            url: "/api/new-favourite",
            method: 'POST',
            data: JSON.parse(map_data),
            success: function () {
            $.ajax ( {
              method: "GET",
              url: "/api/favorites"
              }).done((favorites) => {
                location.reload();
            });
          }
    });
  });
});
