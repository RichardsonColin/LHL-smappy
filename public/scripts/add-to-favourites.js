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
  const $id = $(this).parent().data();
  let id = {id: $id.mapid};
  console.log($id.mapid);

  $.ajax ({
            url: '/remove-favourite',
            method: 'POST',
            //markerid
            data: id,
            success: function() {
              document.location.reload();
            }
  });
  }));

});
