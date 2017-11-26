$(() => {

  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });

  $.ajax({
    method: "GET",
    url: "/api/all_maps"
  }).done((maps) => {
    for(let map of maps) {
      $('<li>').html(`<a href="/maps/${map.id}">${map.title}</a>`).appendTo($('.all-maps-list'));
    }
  });

function getFavourites(){
  $.ajax({
    method: "GET",
    url: "/api/favorites"
    }).done((favorites) => {
      for(let map of favorites) {
      $("<li>").html(`<a href="/maps/${map.id}">${map.title}</a>`).appendTo($(".favourite-maps-list"));
      }
    });
  }

});
