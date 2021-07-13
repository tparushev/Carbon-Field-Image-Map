<?php

use Carbon_Fields\Carbon_Fields;
use Carbon_Field_Image_Map\Image_Map_Field;

define( 'Carbon_Field_Image_Map\\DIR', __DIR__ );

Carbon_Fields::extend( Image_Map_Field::class, function( $container ) {
	return new Image_Map_Field(
		$container['arguments']['type'],
		$container['arguments']['name'],
		$container['arguments']['label']
	);
} );
