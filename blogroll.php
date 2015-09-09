<?php
/*
Template Name: Blogroll
*/
?>
<?php define('WP_USE_THEMES', false); get_header(); ?>
<div id="wrapper">
<div id="page">
	<div id="main">

		<div id="blogroll">
			<?php get_template_part('branding'); ?>	
			<?php get_template_part('navigation'); ?>	
		</div>
	</div><!-- main -->
	<?php get_sidebar(); ?>

<?php get_footer(); ?>
</div><!-- page -->
</div><!-- wrapper -->