<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <base href="/">
    <title><?php bloginfo('name'); ?> | <?php bloginfo('description'); ?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="fragment" content="!">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="<?php bloginfo( 'name' ); ?> - <?php bloginfo( 'description' ); ?>">
    <link rel="shortcut icon" href="">
    <link rel="alternate" type="application/atom+xml" title="Atom 0.3" href="<?php bloginfo('atom_url'); ?>">
    <link rel="alternate" type="application/rss+xml" title="Kanał RSS <?php bloginfo('name'); ?>" href="<?php bloginfo('rss2_url'); ?>">
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <script type="text/javascript">
      var ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
    </script>
    <?php wp_head(); ?>
  </head>
  <body>
    <header class="header">
      <div class="header__container">
        <a class="header__logo" href="<?php echo home_url(); ?>">
          <h1 class="header__title">
            <?php echo get_bloginfo( 'name' ); ?>
          </h1>
        </a>
      </div>
      <nav class="nav__container">
        <input class="nav__burger" id="burger" name="burger" type="checkbox">
        <label class="nav__label" for="burger"></label>

<?php
$defaults = array(
  'theme_location' => 'Header Menu',
  'menu'           => 'Header Menu',
  'depth'          => 2,
  'container'      => false,
  'menu_class' 	   => 'nav__menu',
);
wp_nav_menu( $defaults );
?>

        </nav>
      </div>
    </header>
