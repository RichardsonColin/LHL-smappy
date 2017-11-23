$(() => {
  function toggleLeftNav() {
    var arrowButton = $('.arrow-button');

    arrowButton.click(function() {
      $('.left-nav').toggle('slide');
      //event.preventDefault;
    //   $(textForm).slideToggle( "slow", function() {
    //     $('.tweet-text').focus();
    //   });
    // });
    });
  }
  toggleLeftNav();


});
