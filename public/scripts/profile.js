$(() => {

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<h1>").text(user.name).appendTo($(".user-info"));
      $("<h2>").text(user.your_location).appendTo($(".user-info"));
    }
  });

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
