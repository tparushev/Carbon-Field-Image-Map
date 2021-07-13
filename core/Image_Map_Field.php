<?php

namespace Carbon_Field_Image_Map;

use Carbon_Fields\Field\Field;

class Image_Map_Field extends Field {
	/**
	 * Prepare the field type for use.
	 * Called once per field type when activated.
	 *
	 * @static
	 * @access public
	 *
	 * @return void
	 */
	public static function field_type_activated() {
		$dir = \Carbon_Field_Image_Map\DIR . '/languages/';
		$locale = get_locale();
		$path = $dir . $locale . '.mo';
		load_textdomain( 'carbon-field-image-map', $path );
	}

	/**
	 * Enqueue scripts and styles in admin.
	 * Called once per field type.
	 *
	 * @static
	 * @access public
	 *
	 * @return void
	 */
	public static function admin_enqueue_scripts() {
		$root_uri = \Carbon_Fields\Carbon_Fields::directory_to_url( \Carbon_Field_Image_Map\DIR );

		// Enqueue field styles.
		wp_enqueue_style( 'carbon-field-image-map', $root_uri . '/build/bundle' . ( ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min' ) . '.css' );

		// Enqueue field scripts.
		wp_enqueue_script( 'imgareaselect' );
		wp_enqueue_script( 'carbon-field-image-map', $root_uri . '/build/bundle' . ( ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min' ) . '.js', array( 'carbon-fields-core' ) );
	}

	public function to_json( $load ) {
		$field_data = parent::to_json( $load );

		$field_data = array_merge( $field_data, array(
			'image' => get_the_post_thumbnail_url( absint( $_GET['post'] ), 'full' ),
			'error_message' => __( 'Please set the post thumbnail and refresh the page.', 'crb' ),
		) );

		return $field_data;
	}
}
