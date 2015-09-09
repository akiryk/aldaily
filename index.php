<?php define('WP_USE_THEMES', false); get_header(); ?>
<?php get_template_part('branding'); ?>
<?php get_template_part('navigation'); ?>	
<!-- ************************************************** -->
<div id="posts">
	<?php /* The Loop — with comments! */ ?>
	<?php 
			$args = array( 'post_type' => 'aldaily_post','posts_per_page' => 25, 'paged' => get_query_var('paged'));
			$loop = new WP_Query( $args );

			if ($loop->have_posts()) :
				while ( $loop->have_posts() ) : $loop->the_post();
		?>

<!-- ************************************************** -->
<!-- *************** The Post Content ***************** -->
<!-- ************************************************** -->
		<?php get_template_part('node'); ?>	
		
	<?php /* Close up the post div and then end the loop with endwhile */ ?>      
<?php endwhile; ?>

<!-- ************************************************** -->

<!-- NEXT/PREVIOUS NAVIGATION -->
<div id="paged-navigation">
	<div class="next">
	<?php next_posts_link('&laquo; Older Entries', $loop->max_num_pages) ?>
	</div>
	<?php previous_posts_link('Newer Entries &raquo;') ?>
</div>

<?php endif; ?>

</div> <!-- #posts -->
</div><!-- #main -->
<!-- ************************************************** -->
<?php get_sidebar(); ?>
<?php get_footer(); ?>