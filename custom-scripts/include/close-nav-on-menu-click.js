// Useful for single page scrolling websites to close menu on click to anchor link on same page,
// which otherwise wouldn't close

jQuery('.navbar-nav>li>a').on('click', function(){
    jQuery('.navbar-collapse').collapse('hide');
});