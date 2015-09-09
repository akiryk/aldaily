<?php
/*
	template for navigation including branding
*/
?>
		<?php 

			 if(is_home() || is_front_page()) {
			 	 $navtitle = "All Categories";
			 } else if (is_category()){
			 	$navtitle = single_cat_title( '', false );
			 } else {
			 	$navtitle = "Menu";
			 }
		?>
		<div id="menus">
			<div id="dropdown">
				<div id="dropdown-title" class="hide menu">
					<a href="#"><?php print $navtitle; ?></a>
				</div>
				<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
			</div><!-- #dropdown -->
			<div id="links-menu">
				<a href="<?php bloginfo( 'url' ) ?>/blogroll" title="Blogroll">Links</a>
			</div>
			<div id="search-menu">
				<a href="#"></a>		
			</div>
		</div><!-- #menus -->