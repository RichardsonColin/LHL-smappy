$(() => {
  console.log('going to make an ajax request');
  $.ajax({
    method: "GET",
    url: "/api/favorites"
  }).done((favorites) => {
    for(map of favorites) {
      $("<div>").text(map.title).appendTo($("favorite"));
    }
  });

  $.ajax({
    method: "GET",
    url: "/api/contributions"
  }).done((contributions) => {
    for(map of contributions) {
      $("<div>").text(map.title).appendTo($("contributions"));
    }
  });
});
