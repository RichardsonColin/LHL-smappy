$(() => {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Helper function for '/new-map' title input.
  function noInput(inputField) {
    if(!inputField.val()) {
      var errDiv = $('<div>').append($('<p>')).addClass('error');
      errDiv.text('Please fill in all fields');
      $('.error-holder').empty().prepend(errDiv);
      return true;
    }
  }

  var user_id = $('.user-info').attr("data");
  $.ajax({
    method: "GET",
    url: `/api/users/`
  }).done((users) => {
    for(var user of users) {
      $("<h2>").text(user.your_location).prependTo($(".profile-container"));
      $("<h1>").text(user.email).prependTo($(".profile-container"));
      $("<h1>").text(user.name).prependTo($(".profile-container"));

    }
  });

  $.ajax({
    method: "GET",
    url: "/api/favorites"
  }).done((favorites) => {
    for(var map of favorites) {
      $("<div>").text(map.title).appendTo($(".favorite"));
    }
  });

  $.ajax({
    method: "GET",
    url: "/api/contributions"
  }).done((contributions) => {
    for(var map of contributions) {
      $("<li>").html(`<a href="/maps/${map.id}">${map.title}</a>`).appendTo($(".contributions-maps-list"));
    }
  });

  $( '#profile-form' ).on('submit', function(event) {
    event.preventDefault();
    var $form = $(this).parent();
    var $name = $($form).find('input[name="user_name"]').val();
    var $securename = escape($name);
    var $location = $($form).find('input[name="user_location"]').val();
    var $securelocation= escape($location);
    var $description = $($form).find('textarea').val();
    var $securedescription = escape($description);
    var data = {name: $securename, location: $securelocation, description: $securedescription};

    if ((noInput($($form).find('input[name="user_name"]'))) || (noInput($($form).find('input[name="user_location"]'))) || (noInput($($form).find('textarea')))) {
    } else if ($description.length > 200) {
      var errDiv = $('<div>').append($('<p>')).addClass('error');
      errDiv.text('We would love to learn a ton about you, but try to keep it under 200 characters!');
      $('.error-holder').empty().prepend(errDiv);
    } else {
      $.ajax({
              type: 'POST',
              url:  '/profile-update',
              data: data
      }).done(() => {
        location.reload();
      });
    }
  });
});
