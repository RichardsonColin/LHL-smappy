$(() => {

  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<h1>").text(user.name).appendTo($(".user-info"));
  //     $("<h2>").text(user.your_location).appendTo($(".user-info"));
  //   }
  // });


  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  let user_id = $('.user-info').attr("data");
  console.log(user_id);
  $.ajax({
    method: "GET",
    url: `/api/users/`
  }).done((users) => {
    for(let user of users) {
      $("<h1>").text(user.email).prependTo($(".profile-container"));
      $("<h2>").text(user.your_location).prependTo($(".profile-container"));
    }
  });

  $.ajax({
    method: "GET",
    url: "/api/favorites"
  }).done((favorites) => {
    for(let map of favorites) {
    console.log(map.title);
      $("<div>").text(map.title).appendTo($(".favorite"));
    }
  });

  $.ajax({
    method: "GET",
    url: "/api/contributions"
  }).done((contributions) => {
    console.log(contributions);
    for(let map of contributions) {
      $("<div>").text(map.title).appendTo($(".contributions"));
    }
  });

  $( '#profile-form' ).on('submit', function(event) {
    event.preventDefault();
    const $form = $(this).parent();
    let $name = $($form).find('input[name="user_name"]').val();
    let $securename = escape($name);
    let $location = $($form).find('input[name="user_location"]').val();
    let $securelocation= escape($location);
    let $description = $($form).find('textarea').val();
    let $securedescription = escape($description);
    let data = {name: $securename, location: $securelocation, description: $securedescription};

    if ($name.length === 0 || $location.length === 0 || $description.length === 0) {
      $.flash("All profile information must be filled out to complete your profile");
    } else if ($description.length > 200) {
      $.flash("We know you have a lot to say about yourself but try to keep it under 200 chars!");
    } else {
      $.ajax({
              type: 'POST',
              url:  '/profile-update',
              data: data
      }).done(() => {
        location.reload();
      });
    console.log($name, $location, $description);
    }
  });


});

