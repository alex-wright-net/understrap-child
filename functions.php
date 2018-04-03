<?php
function understrap_remove_scripts() {
    wp_dequeue_style( 'understrap-styles' );
    wp_deregister_style( 'understrap-styles' );

    wp_dequeue_script( 'understrap-scripts' );
    wp_deregister_script( 'understrap-scripts' );

    // Removes the parent themes stylesheet and scripts from inc/enqueue.php
}
add_action( 'wp_enqueue_scripts', 'understrap_remove_scripts', 20 );

add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {

    // Get the theme data
    $the_theme = wp_get_theme();
    wp_enqueue_style( 'custom-styles', get_stylesheet_directory_uri() . '/css/style.min.css', array(), $the_theme->get( 'Version' ) );
    wp_enqueue_script( 'jquery');
    wp_enqueue_script( 'popper-scripts', get_template_directory_uri() . '/js/popper.min.js', array(), false);
    wp_enqueue_script( 'custom-scripts', get_stylesheet_directory_uri() . '/js/app.min.js', array(), $the_theme->get( 'Version' ), true );
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}

/* ADD ADVANCED CUSTOM FIELDS OPTIONS PAGE
================================================== */
if( function_exists('acf_add_options_page') ) {
    acf_add_options_page();
        
}

/* REDUCE PRIORITY OF YOAST METABOXES
================================================== */

add_filter( 'wpseo_metabox_prio', function() { return 'low';});


/* ADD FAVICON CONTENT
================================================== */
// add_action( 'wp_head', 'add_favicons');
// function add_favicons() { 
//     include_once('loop-templates/favicon.php');
// }


/* ADD GOOGLE ANALYTICS TRACKER CODE
================================================== */
// add_action( 'wp_head', 'add_googleanalytics');
// function add_googleanalytics() { 
//     include_once('loop-templates/analyticstracking.php');
// }


/* ADD CUSTOM STYLES TO LOGIN PAGE
================================================== */
function aw_custom_login() {
    echo '<link rel="stylesheet" type="text/css" href="' . get_bloginfo('stylesheet_directory') . '/login/login-styles.css" />';
}
add_action('login_head', 'aw_custom_login');


/* CHANGE LOGO LINK DESTINATION ON LOGIN PAGE
================================================== */
function aw_login_logo_url() {
return get_bloginfo( 'url' );
}
add_filter( 'login_headerurl', 'aw_login_logo_url' );
function aw_login_logo_url_title() {
return get_bloginfo( 'title' );
}
add_filter( 'login_headertitle', 'aw_login_logo_url_title' );
