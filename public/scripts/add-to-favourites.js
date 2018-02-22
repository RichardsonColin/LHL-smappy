$(() => {

  //saves current map to the users favorites and updates the DB
  $( '#favourite-map' ).click(function() {

    $.ajax ({
            url: "/api/new-favourite",
            method: 'POST',
            data: {id: map_num},
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

  //Removes the current map from the users favourites list
  $(document).on('click', '.remove-favourite', (function() {
    const $id = $(this).parent().data();
    let id = {id: $id.mapid};

    $.ajax ({
            url: '/remove-favourite',
            method: 'POST',
            data: id,
            success: function() {
              document.location.reload();
            }
    });
  }));
});
