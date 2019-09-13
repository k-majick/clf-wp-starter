<?php
if (!function_exists('theme_scripts')) {
	function theme_scripts() {
		$the_theme = wp_get_theme();

		// core
    wp_deregister_script('jquery');
		wp_enqueue_script('theme-js', get_template_directory_uri() . '/assets/main.min.js', array(), $the_theme->get('Version'), true);
		// wp_enqueue_script('maps-api', 'https://maps.googleapis.com/maps/api/js?key=[key]?sensor=true', array(), false, true);

		// styles
		wp_enqueue_style('theme-css', get_stylesheet_directory_uri() . '/assets/main.min.css', array(), $the_theme->get('Version'));
	}
}
add_action( 'wp_enqueue_scripts', 'theme_scripts' );
