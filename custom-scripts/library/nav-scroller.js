
// Adds a class to navbar after scrolling a given number of pixels

jQuery(window).on('scroll', function() {
    var newClass = "navbar-scroll";
    var addedTo = "#wrapper-navbar .navbar.navbar-dark";
    var pixelsScrolled = 130;
    var scrollPosition = jQuery(this).scrollTop();
    if ((scrollPosition >= pixelsScrolled) || ($("#navbarNavDropdown").hasClass("show") )) {
        jQuery( addedTo ).addClass( newClass );
    }
    if (scrollPosition < pixelsScrolled && !$("#navbarNavDropdown").hasClass("show")) {
        jQuery( addedTo ).removeClass( newClass );
    }
});
