$(() => {
 $.ajax({
    method: "GET",
    url: "/api/all_maps"
    }).done((maps) => {
    for(let map of maps) {
      $('<li>')
      .html(`<a href="/maps/${map.id}">${map.title}</a>`)
      .appendTo($('.all-maps-list'));
    }
  });


  $.ajax({
    method: "GET",
    url: "/api/favorites"
    }).done((favorites) => {
      for(let map of favorites) {
      console.log('IM THE FAVORITES',favorites);
      $("<li>")
      .data({'mapid': `${map.id}`})
      .html(`<a href="/maps/${map.id}">${map.title}</a> <span class="remove-favourite">remove</span>`)
      .appendTo($(".favourite-maps-list"));
    }
  });

});



