<?php
/**
 * The template for displaying the footer.
 */

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
				<?php if( get_field('google_plus_url', 'option') ): ?>
					<li class="list-inline-item"><a href="<?php the_field('google_plus_url', 'option'); ?>" target="_blank" rel="noopener nofollow"><i class="fab fa-linkedin" aria-hidden="true"></i></a></li>
				<?php endif ?>
				<?php if( get_field('yelp_url', 'option') ): ?>
					<li class="list-inline-item"><a href="<?php the_field('yelp_url', 'option'); ?>" target="_blank" rel="noopener nofollow"><i class="fab fa-linkedin" aria-hidden="true"></i></a></li>
				<?php endif ?>
				</ul>

			</div><!-- .footer-widget social -->

		</div><!-- .footer-widgets -->

	</div><!-- container end -->

</div><!-- #footer-primary -->

<div id="footer-copyright">
	<div class="<?php echo esc_attr( $container ); ?>">

		<div class="row">

			<div class="col-12 small d-inline">
				&copy; <?php echo date( "Y" ); ?>
				<span class="ml-3" itemprop="name"><?php the_field('business_name', 'option'); ?></span>
				<address class="d-inline ml-3" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
					<span itemprop="streetAddress"><?php the_field('primary_location_street_address', 'option'); ?></span>
					<span class="ml-2" itemprop="addressLocality"><?php the_field('primary_location_city', 'option'); ?></span>, 
					<span itemprop="addressRegion"><?php the_field('primary_location_state', 'option'); ?></span> 
					<span itemprop="postalCode"><?php the_field('primary_location_zip', 'option'); ?></span>
				</address>
				<span class="ml-3" itemprop="telephone"><a href="tel:1<?php echo str_replace( array('+','-', '(',")",' '), '',get_field('primary_location_phone', 'options')); ?>"><?php the_field('primary_location_phone', 'option'); ?></a></span>
			</div>

		</div>

	</div>

</div><!-- #footer-copyright -->

</footer><!-- .site-footer-->

</div><!-- #page we need this extra closing tag here -->

<?php wp_footer(); ?>

</body>

</html>