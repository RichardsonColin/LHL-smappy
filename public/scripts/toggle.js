$(() => {

  $(".left-nav").click(function () {
    tp = $(this).css('left') == '0px' ? '-350px' : '0px';
    $(this).animate( {left: tp }, 1000);
});


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
