<?php
require get_template_directory() . '/assets/inc/enqueue.php';

// dashicons
function load_dashicons_front_end() {
  wp_enqueue_style('dashicons');
}
add_action('wp_enqueue_scripts', 'load_dashicons_front_end');

// acf options page
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();
}

// responsive imgs
function grangler_responsive_image( $image_id, $image_size, $max_width ) {
	if($image_id != '') {
		$image_src = wp_get_attachment_image_url( $image_id, $image_size );
		$image_srcset = wp_get_attachment_image_srcset( $image_id, $image_size );
		echo 'src="'.$image_src.'" srcset="'.$image_srcset.'" sizes="(max-width: '.$max_width.') 100vw, '.$max_width.'"';
   }
}

// thumbnails
if ( function_exists( 'add_theme_support' )) {
  add_theme_support( 'post-thumbnails' );
  set_post_thumbnail_size( 1920, 9999 );
}
if ( function_exists( 'add_image_size' )) {
  add_image_size( 'index', '300', '300', true );
  add_image_size( 'slider', '320', '240', true );
	add_image_size( 'full-hd', 1920);
}

// svg support
function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

// lead
function first_paragraph($content) {
  $page = get_query_var('page');
  if ($page < 2) {
    return preg_replace('/<p([^>]+)?>/', '<p$1 class="lead">', $content, 1);
  }
  else {
    return $content;
  }
}
add_filter('the_content', 'first_paragraph');

// navwalker
require_once('wp_bootstrap_navwalker.php');

// menu
function register_ba_navigation() {
  $locations = array(
    'header-menu' => __('Header Menu', 'Demo'),
  );
  register_nav_menus( $locations );
}
add_action('init', 'register_ba_navigation');

// add class to menu item link
function add_specific_menu_location_atts( $atts, $item, $args ) {
  // check if the item is in the primary menu
  if( $args->theme_location == 'main_menu' ) {
    // add the desired attributes:
    $atts['class'] = 'navItem__link';
  }
  return $atts;
}
add_filter( 'nav_menu_link_attributes', 'add_specific_menu_location_atts', 10, 3 );

// widget
if (function_exists('register_sidebar'))
register_sidebar(array(
  'before_widget' => '<ul><li>',
  'after_widget' => '</li></ul>',
  'before_title' => '<h3>',
  'after_title' => '</h3>',
));

// admin
show_admin_bar( false );
