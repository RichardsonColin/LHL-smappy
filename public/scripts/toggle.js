$(() => {

function toggleLeftNav() {
    $(".left-nav").click(function () {
    tp = $(this).css('left') == '0px' ? '-350px' : '0px';
    $(this).animate( {left: tp }, 1000);

toggleLeftNavArrow();

  });
}
toggleLeftNav();

let rotated = false;

function toggleLeftNavArrow(){

  console.log(rotated);
  if (!rotated) {
    $(".left-nav").find('.fa').css({"transform": "rotate(180deg)"});
    rotated = true;
    console.log(rotated);
    console.log("rotate 180");
  } else {
    $(".left-nav").find('.fa').css({"transform": "rotate(0deg)"});
    rotated = false;
    console.log("after");
  }
}

  // console.log($(".left-nav").find('.fa'));



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
