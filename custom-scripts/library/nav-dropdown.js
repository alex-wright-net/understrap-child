
// Adds a class to navbar after the navbar is dropped down
// If using alone (not with navscroller.js), 
// comment out lines 12-16
// If using with navscroller.js
// comment out lines 20-22 and make sure pixel number in line 12
// matches up with scroll position in navscroller.js

jQuery(".navbar-toggler").click(function() {
    var newClass = "navbar-scroll";
    var addedTo = "#wrapper-navbar .navbar.navbar-dark";
    var pixelsScrolled = 130;
    var scrollPosition = jQuery(window).scrollTop();
    if ((jQuery("#navbarNavDropdown").hasClass("show") ) && (scrollPosition < pixelsScrolled)) {
        jQuery( addedTo ).removeClass( newClass );    
    }
    if (!jQuery("#navbarNavDropdown").hasClass("show")) {
        jQuery( addedTo ).addClass( newClass );
    }
    // if (jQuery("#navbarNavDropdown").hasClass("show")) {
    //     jQuery( addedTo ).removeClass( newClass );
    // }
});
