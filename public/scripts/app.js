$(() => {

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });

  $.ajax({
    method: "GET",
    url: "/api/maps"
  }).done((maps) => {
    for(map of maps) {
      $('<li>').text(map.title).appendTo($('.all-maps-list'));
    }
  });
});
