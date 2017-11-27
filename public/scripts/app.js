$(() => {

  $.ajax({
    method: "GET",
    url: "/api/all_maps"
  }).done((maps) => {
    for(let map of maps) {
      $('<li>').html(`<a href="/maps/${map.id}">${map.title}</a>`).appendTo($('.all-maps-list'));
    }
  });


  $.ajax({
    method: "GET",
    url: "/api/favorites"
    }).done((favorites) => {
      for(let map of favorites) {
      $("<li>").html(`<a href="/maps/${map.id}">${map.title}</a>`).appendTo($(".favourite-maps-list"));
      }
    });

});


