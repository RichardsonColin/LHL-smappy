$(() => {

  //Retrieves all the saved maps from the database and creates a list of links that redirect to each maps page
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

  //Retrieves all of the current users favorite maps and creates a list of links that redirect to the maps page
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



