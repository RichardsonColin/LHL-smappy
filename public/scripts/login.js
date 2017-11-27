$(() => {

  $('.error').parent().css('display','block');

  //When the user icon in the top right corner is clicked this pulls the users name and location to create a personalized message
  $.ajax({
    method: "GET",
    url: `/api/users/`
  }).done((users) => {
    for(user of users) {
      $("<span>").text(user.email).prependTo($(".pop-down-logout"));
      $("<span>").text(user.your_location).prependTo($(".user-local"));
    }
  });
});



