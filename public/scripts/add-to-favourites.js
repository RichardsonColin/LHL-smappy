$(() => {

  $( '#favourite-map' ).click(function() {

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

  $(document).on('click', '.remove-favourite', (function() {
    var $id = $(this).parent().data();
    var id = {id: $id.mapid};

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
