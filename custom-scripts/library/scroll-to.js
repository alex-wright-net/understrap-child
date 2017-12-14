//get the URL hash
var getHash = window.location.hash;
//Call changeHash
changeHash(getHash,1500, 60)

$(document).ready(function() {
  //when click on goUp it will take the user to the top of the page
  $('#goUp').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
  })

  //When the hash changes on the page it will call changeHash
  window.onhashchange = function(e) {
    e.preventDefault();
    changeHash(window.location.hash,1500, 60)
  }


  $(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });

});

//When the hash changes it calls this function
function changeHash(hash, speed, upOrDown) {
  return function(){
    if (hash) {
      $('html, body').animate({
        scrollTop: $(hash).offset().top - upOrDown
      }, speed);
      remove_hash_from_url()
    }
  }()


};

//Function that removes the hash from the URL
function remove_hash_from_url() {
  var uri = window.location.toString();
  if (uri.indexOf("#") > 0) {
    var clean_uri = uri.substring(0, uri.indexOf("#"));
    window.history.replaceState({}, document.title, clean_uri);
  }
}
