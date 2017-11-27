$(() => {

  $('.error').parent().css('display','block');


  $.ajax({
    method: "GET",
    url: `/api/users/`
  }).done((users) => {
    for(user of users) {
      $("<span>").text(user.name).prependTo($(".pop-down-logout"));
      $("<span>").text(user.your_location).prependTo($(".user-local"));
    }
  });
});



