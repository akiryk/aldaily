<?php
/*
	template for the post inside the loop
*/
?>
<!-- 	Get custom fields -->
	<?php 
		$custom_fields = get_post_custom(); 
		$url = $custom_fields['al_url'][0];
		$source = $custom_fields['al_source'][0];
	?>

<!-- ******************  INDEX: THE POST  ************************ -->
	<div class="post-container">
		<?php /* Microformatted category and tag links along with a comments link */ ?>
		<div class="entry-utility">
			<?php if (get_the_category_list()) { ?>
			  <span class="cat-links"><span class="entry-utility-prep entry-utility-prep-cat-links"><?php _e( '', 'your-theme' ); ?></span><?php echo get_the_category_list(', '); ?></span>
			<?php } ?>
		</div><!-- #entry-utility -->

<!-- ************************************************** -->
<!-- Does this post link to one place or several? -->
	<?php if (!empty($url)) { ?>
			<div class="post linkpost">
	<?php } else { ?>
			<div class="post">
	<?php }; ?>
	
<!-- ************************************************** -->
		<?php /* The entry content */ ?>
		
		<?php if (!empty($url)) { ?>
			<a href=<?php echo $url; ?> target="_blank">
		<?php } ?>

		<div class="entry-content">
				<?php the_content( __( 'Continue reading <span class="meta-nav">&raquo;</span>', 'your-theme' )  ); ?>
			
			<?php wp_link_pages('before=<div class="page-link">' . __( 'Pages:', 'your-theme' ) . '&after=</div>') ?>
		</div><!-- .entry-content -->
		
		<?php if (!empty($url)): ?>
				</a>
		<?php endif; ?>
		
<!-- ************************************************** -->		
		<?php /* Source and Date */ ?>
		
		<div class="entry-meta clearfix">
		
		<?php if (!empty($source)): ?>
			<?php if (!empty($url)) { ?>
				<a href=<?php echo $url; ?>>
			<?php } ?>
			<div class="source">
			
				<?php print "<span class='label'>Source: </span>" . "<span class='url'>" . $source . "</span>"; ?>
			</div>
			<?php if (!empty($url)): ?>
				</a>
			<?php endif; ?>
		<?php endif; ?>


		<?php /* Microformatted, translatable post meta */ ?>
			<span class="entry-date"><abbr class="published" title="<?php the_time('d.m.Y\TH:i:sO') ?>">
				<?php the_time( 'd.m.Y' ); ?></abbr>
			</span>
		</div><!-- .entry-meta -->
		
	<div class="post-divider"></div>
<!-- **************  CLOSE THE POST  ************************* -->	
	</div><!-- .post -->
</div><!-- .post-container -->