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
      $('<li>').text(map.title).appendTo($('.all-maps-list'));
    }
  });

  $.ajax({
    method: "GET",
    url: "/api/favorites"
  }).done((favorites) => {
    for(map of favorites) {
      $("<li>").text(map.title).appendTo($(".favourite-maps-list"));
    }
  });
});
