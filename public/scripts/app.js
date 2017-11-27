$(() => {
  $.ajax({
    method: "GET",
    url: "/api/all_maps"
    }).done((maps) => {
    for(var map of maps) {
      $('<li>')
      .html(`<a href="/maps/${map.id}">${map.title}</a>`)
      .appendTo($('.all-maps-list'));
    }
  });


  $.ajax({
    method: "GET",
    url: "/api/favorites"
    }).done((favorites) => {
      for(var map of favorites) {
      $("<li>")
      .data({'mapid': `${map.id}`})
      .html(`<a href="/maps/${map.id}">${map.title}</a> <span class="remove-favourite">remove</span>`)
      .appendTo($(".favourite-maps-list"));
    }
  });
});



