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

		<div class="row footer-widgets justify-contents-center">

			<div class="col footer-widget social">

				<ul class="list-inline">
				<?php if( get_field('facebook_url', 'option') ): ?>
					<li class="list-inline-item"><a href="<?php the_field('facebook_url', 'option'); ?>" target="_blank" rel="noopener nofollow"><i class="fab fa-facebook-square" aria-hidden="true"></i></a></li>
				<?php endif ?>
				<?php if( get_field('twitter_url', 'option') ): ?>
					<li class="list-inline-item"><a href="<?php the_field('twitter_url', 'option'); ?>" target="_blank" rel="noopener nofollow"><i class="fab fa-twitter-square" aria-hidden="true"></i></a></li>
				<?php endif ?>
				<?php if( get_field('youtube_url', 'option') ): ?>
					<li class="list-inline-item"><a href="<?php the_field('youtube_url', 'option'); ?>" target="_blank" rel="noopener nofollow"><i class="fab fa-youtube" aria-hidden="true"></i></a></li>
				<?php endif ?>
				<?php if( get_field('instagram_url', 'option') ): ?>
					<li class="list-inline-item"><a href="<?php the_field('instagram_url', 'option'); ?>" target="_blank" rel="noopener nofollow"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
				<?php endif ?>
				<?php if( get_field('linkedin_url', 'option') ): ?>
					<li class="list-inline-item"><a href="<?php the_field('linkedin_url', 'option'); ?>" target="_blank" rel="noopener nofollow"><i class="fab fa-linkedin" aria-hidden="true"></i></a></li>
				<?php endif ?>
				<?php if( get_field('yelp_url', 'option') ): ?>
					<li class="list-inline-item"><a href="<?php the_field('yelp_url', 'option'); ?>" target="_blank" rel="noopener nofollow"><i class="fab fa-yelp" aria-hidden="true"></i></a></li>
				<?php endif ?>
				<?php if( get_field('google_plus_url', 'option') ): ?>
					<li class="list-inline-item"><a href="<?php the_field('google_plus_url', 'option'); ?>" target="_blank" rel="noopener nofollow"><i class="fab fa-google-plus-square" aria-hidden="true"></i></a></li>
				<?php endif ?>
				</ul>

			</div><!-- .footer-widget social -->

		</div><!-- .footer-widgets -->

	</div><!-- container end -->

</div><!-- #footer-primary -->

<div id="footer-copyright">
	<div class="<?php echo esc_attr( $container ); ?>">

		<div class="row">

			<div class="col-sm-12">

				<p><small>&copy;<?php echo date( "Y" ); ?> <?php if( get_field('business_name', 'option') ): ?><?php the_field('business_name', 'option'); endif ?> <span class="ml-3">All Rights Reserved.</span></small></p>

			</div>

		</div>

	</div>

</div><!-- #footer-copyright -->

</footer><!-- .site-footer-->

</div><!-- #page we need this extra closing tag here -->

<?php wp_footer(); ?>

</body>

</html>