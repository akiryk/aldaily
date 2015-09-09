<?php get_header(); ?>
<!-- Container and then Content divs are in header.php -->
<?php get_template_part('branding'); ?>
<?php get_template_part('navigation'); ?>
<!-- ************************************************** -->
<div id="posts">
<!-- **************  ARCHIVE: THE POST  ************************* -->
<?php 
			global $post; $id = $post->ID; 
			$cat_id =  get_the_category( $id );
			$categories = $cat_id[0];
			$args = array( 'post_type' => 'aldaily_post', 'posts_per_page' => 40, 'cat'=>$categories->cat_ID);
			$loop = new WP_Query( $args );
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
<div id="bottom-navigation">
	<?php next_posts_link('&laquo; Older Entries', $loop->max_num_pages) ?>
	<?php previous_posts_link('Newer Entries &raquo;') ?>
</div>

</div> <!-- #posts -->
</div><!-- #main -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>