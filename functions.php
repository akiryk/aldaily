<?php

// Get the page number
function get_page_number() {
    if ( get_query_var('paged') ) {
        print ' | ' . __( 'Page ' , 'your-theme') . get_query_var('paged');
    }
} // end get_page_number


/**
 * Tell WordPress to run twentyeleven_setup() when the 'after_setup_theme' hook is run.
 */
add_action( 'after_setup_theme', 'aldaily_setup' );

if ( ! function_exists( 'aldaily_setup' ) ):
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 */
function aldaily_setup() {

		/* Make AL DAILY available for translation.
	 * Translations can be added to the /languages/ directory.
	 */
	load_theme_textdomain( 'aldaily', TEMPLATEPATH . '/languages' );

	$locale = get_locale();
	$locale_file = TEMPLATEPATH . "/languages/$locale.php";
	if ( is_readable( $locale_file ) )
		require_once( $locale_file );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menu( 'primary', __( 'Primary Menu', 'aldaily' ) );
	
}
endif; // aldaily_setup


// ************************************************
// Search for custom post types
// ************************************************

add_filter( 'pre_get_posts', 'tgm_cpt_search' );
/**
 * tgm_cpt_search function.
 *
 * This function modifies the main WordPress query to include an array of post types instead of the default 'post' post type.
 *
 * @param mixed $query The original query
 * @return $query The amended query
 *
 */
function tgm_cpt_search( $query ) {
    if ( $query->is_search )
        $query->set( 'post_type', array( 'post', 'aldaily_post' ) );
    return $query;
};


// ************************************************
// Widgetize sidebar
// ************************************************
register_sidebar( array(
		'name' => __( 'Main Sidebar', 'aldaily' ),
		'id' => 'sidebar-1',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => "</aside>",
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );


// ************************************************
// Custom Functions
// ************************************************
/**
 * If more than one page exists, return TRUE.
 */
function show_posts_nav() {
	global $wp_query;
	return ($wp_query->max_num_pages > 1);
}


function aldaily_admin_bar_render() {
    global $wp_admin_bar;
    // we can remove a menu item, like the Comments link, just by knowing the right $id
    $wp_admin_bar->remove_menu('comments');
    // or we can remove a submenu, like New Link.
    $wp_admin_bar->remove_menu('new-user', 'new-content');
     $wp_admin_bar->remove_menu('new-media', 'new-content');
      $wp_admin_bar->remove_menu('new-post', 'new-content');
       $wp_admin_bar->remove_menu('new-page', 'new-content');
    // we can add a submenu item too
   /*
 $wp_admin_bar->add_menu( array(
        'parent' => 'new-content',
        'id' => 'new_media',
        'title' => __('Media'),
        'href' => admin_url( 'media-new.php')
    ) );
*/
}
// and we hook our function via
add_action( 'wp_before_admin_bar_render', 'aldaily_admin_bar_render' );



?>
