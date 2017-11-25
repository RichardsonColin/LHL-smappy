$(() => {
  function toggleLeftNav() {
    var arrowButton = $('.arrow-button');

    arrowButton.click(function() {
      $('.left-nav').toggle('slide', function() {
        $('.fa-arrow-circle-left').toggleClass('fa-rotate-180');
      });
    });
  }
  toggleLeftNav();



function toggleLogin() {
    var loginButton = $('.login-button');

    loginButton.click(function() {
      $('.pop-down-login').toggle('slide', function() {

      });
    });
  }
  toggleLogin();

});
