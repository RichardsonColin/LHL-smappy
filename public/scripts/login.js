/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  $('.error').parent().css('display','block');


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



