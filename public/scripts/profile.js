$(() => {
  $.ajax({
    method: "GET",
    url: "/api/favorites"
  }).done((favorites) => {
    for(map of favorites) {
    console.log(map.title);
      $("<div>").text(map.title).appendTo($(".favorite"));
    }
  });

  $.ajax({
    method: "GET",
    url: "/api/contributions"
  }).done((contributions) => {
    console.log(contributions);
    for(map of contributions) {
      $("<div>").text(map.title).appendTo($(".contributions"));
    }
  });
});
