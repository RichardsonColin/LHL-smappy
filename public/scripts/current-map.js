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
      // console.log($(this).parent().data());
      $(document).find('input[name="marker-name"]').val(`${$id.title}`).data({'id': `${$id.mapid}`});
      $(document).find('textarea').text(`${$id.description}`);
      $(document).find('input[name="marker-url"]').val(`${$id.picture}`);

      console.log($(document).find('input[name="marker-name"]').data());
    }));


 $(document).on('click', '.update-button', (function(event) {
  const $id = $(document).find('input[name="marker-name"]').data();
   console.log($('.update-marker-title').val());
    event.preventDefault();
    let updateMarkerData = {
      map_id: mapid,
      //where to define/update markerid?
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
              // var obj = JSON.parse(data);
              console.log('IM THE RETURNED DATA', result);
              // var id = obj._id;
              document.location.reload();
              // location.href = `/maps/${result}`;
            }
    });

 }));


 $(document).on('click', '.delete-button', (function(event) {
  event.preventDefault();
    const $id = $(document).find('input[name="marker-name"]').data();
    let id = {id: $id.id};
    console.log('delete button clicked');

    $.ajax ({
              url: '/delete-marker',
              method: 'POST',
              //markerid
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
