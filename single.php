<?php define('WP_USE_THEMES', false); get_header(); ?>
<?php get_template_part('branding'); ?>
<?php get_template_part('navigation'); ?>	
<!-- Container and then Content divs are in header.php -->
<div id="posts">  
<!-- **************  SINGLE: THE POST  ************************* -->
	<div id="post-<?php the_ID(); ?>" 
		<?php post_class(); ?>
		<?php the_post(); ?>
		<?php get_template_part('node'); ?>	
	</div>
	</div> <!-- #posts -->
</div><!-- #main -->
<?php get_sidebar(); ?>
<?php get_footer(); ?>