<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package understrap
 */

$the_theme = wp_get_theme();
$container = get_theme_mod( 'understrap_container_type' );
?>

<footer class="site-footer">

<?php get_sidebar( 'footerfull' ); ?>

<div id="footer-primary">

	<div class="<?php echo esc_attr( $container ); ?>">

		<div class="row footer-widgets">

			<div class="col-lg-6 footer-widget">

			</div><!-- .col .footer-widget -->

			<div class="col-lg-6 footer-widget">

			</div>

		</div><!-- .col .footer-widget -->

	</div><!-- container end -->

</div><!-- #footer-primary -->

<div id="footer-copyright">
	<div class="<?php echo esc_attr( $container ); ?>">

		<div class="row">

			<div class="col-sm-12">

				<p><small>&copy;<?php echo date( "Y" ); ?> <?php echo bloginfo( 'name' ); ?>. All Rights Reserved. </small></p>

			</div>

		</div>

	</div>

</div><!-- #footer-copyright -->

</footer><!-- .site-footer-->

</div><!-- #page we need this extra closing tag here -->

<?php wp_footer(); ?>

</body>

</html>

