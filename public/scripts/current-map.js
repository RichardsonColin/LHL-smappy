$(() => {

    $.ajax ({
            url: "/api/current-map-markers",
            method: 'POST',
            data: JSON.parse(map_data),
            success: function (markers) {
              for(let map of markers) {
              $("<li>").data({'mapid': `${map.id}`,'title':`${map.title}`, 'description':`${map.description}`, 'picture':`${map.picture}`}).html(`${map.title} <span class="edit-remove-marker">edit</span>`).appendTo($(".map-markers-list"));
              }
          }
    });


    $(document).on('click', '.edit-remove-marker', (function() {

      const $id = $(this).parent().data();
      $(document).find('.update-marker').css('visibility', 'visible');
      $(document).find('input[name="marker-name"]').val(`${$id.title}`).data({'id': `${$id.mapid}`});
      $(document).find('textarea').text(`${$id.description}`);
      $(document).find('input[name="marker-url"]').val(`${$id.picture}`);

    }));


 $(document).on('click', '.update-button', (function(event) {
  const $id = $(document).find('input[name="marker-name"]').data();
    event.preventDefault();
    var title = $('.update-marker-title').val();
    title = title.replace("'", "");
    var description = $('.update-marker-description').val();
    description = description.replace("'", "");
    let updateMarkerData = {
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


 $(document).on('click', '.delete-button', (function(event) {
  event.preventDefault();
    const $id = $(document).find('input[name="marker-name"]').data();
    let id = {id: $id.id};

    $.ajax ({
              url: '/delete-marker',
              method: 'POST',
              data: id,
              success: function() {
                document.location.reload();
              }
    });
}));

$(document).on('click', '.cancel-update-button', (function(event) {
  event.preventDefault();
  $(document).find('.update-marker').css('visibility', '');
}));



});
