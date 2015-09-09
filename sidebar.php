<?php
/**
 * The Sidebar containing the main widget area.
 */
?>

<div id="sidebar">
	<div id="search">
			<div class="only-search<"><?php get_search_form(); ?></div>
	</div>	
	<div id="widgets">
<?php if ( !function_exists('dynamic_sidebar')  || !dynamic_sidebar() ) : ?>
	
  <div class="title">About</div>
  <p>This is my blog.</p>
  <div class="title">Links</div>
  <ul>
   <li><a href="http://example.com">Example</a></li>
 </ul>

 <?php endif; ?>
  </div>
</div>