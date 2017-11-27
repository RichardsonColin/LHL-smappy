$(() => {

//allows for the column beside the left nav bar to toggle the left nav bars visibility when clicked
function toggleLeftNav() {
    $(".toggle-button").click(function () {
    tp = $('.left-nav').css('left') == '0px' ? '-350px' : '0px';
    $('.left-nav').animate( {left: tp }, 1000);
    toggleLeftNavArrow();
  });
}
toggleLeftNav();

var rotated = false;

//when the left nav bar is toggled the arrow icon changes to show what direction the left nav bar will move
function toggleLeftNavArrow(){

  if (!rotated) {
    $(".left-nav").find('.fa').css({"transform": "rotate(180deg)"});
    rotated = true;
  } else {
    $(".left-nav").find('.fa').css({"transform": "rotate(0deg)"});
    rotated = false;
  }
}

//When the login/register button is clicked makes the login/register form appear
function toggleLogin() {
    var loginButton = $('.login-button');

    loginButton.click(function() {
      $('.pop-down-login').toggle('slide', function() {

      });
    });
  }
  toggleLogin();


function togglelogout() {
    var logout = $('.profile-icon');

    logout.click(function() {
      $('.pop-down-logout').toggle('slide', function() {

      });
    });
  }

togglelogout();

});
