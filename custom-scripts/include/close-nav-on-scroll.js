// Useful on any website to close menu on scroll when past a certain offset point

jQuery(window).on('scroll', function() {

    if (jQuery(".navbar").offset().top > 50) {
        jQuery('.navbar-collapse').collapse('hide');
        jQuery('#wrapper-navbar .navbar .navbar-toggler').removeClass('expanded');
    }     

});