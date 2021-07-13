/**
 * External dependencies.
 */
import { registerFieldType } from '@carbon-fields/core';

/**
 * Internal dependencies.
 */
import './style.scss';
import ImageMapField from './main';

registerFieldType( 'image_map', ImageMapField );
