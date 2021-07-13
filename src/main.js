/**
 * External dependencies.
 */
import { Component } from '@wordpress/element';

class ImageMapField extends Component {
	handleImageLoaded() {
		let _this = this;
	    const {
			id,
			name,
			value,
			field
		} = this.props;

	    let $image = jQuery('#' + id + " > img");
		let widthRation = $image[0].naturalWidth / $image[0].clientWidth;
	    let heightRation =  $image[0].naturalHeight / $image[0].clientHeight;
		let args = {
			instance: true,
			parent: jQuery('#' + id),
			zIndex: 1,
	        onSelectEnd: function (img, selection) {
	        	let value = selection.x1 * widthRation + "," + selection.y1 * heightRation + "," + selection.x2 * widthRation + "," + selection.y1 * heightRation + "," + selection.x2 * widthRation + "," + selection.y2 * heightRation + "," + selection.x1 * widthRation + "," + selection.y2 * heightRation;

	        	_this.handleChange( value );
	        }
	    };

	    let coordinates = value;

	    if ( coordinates ) {
	    	coordinates = coordinates.split(',');
			args.x1 = coordinates[0] / widthRation;
			args.y1 = coordinates[1] / heightRation;
			args.x2 = coordinates[2] / widthRation;
			args.y2 = coordinates[7] / heightRation;
	    };

		let area = $image.imgAreaSelect(args);

	    $image.closest('.cf-complex').on('click', '.cf-complex__tabs-item, .cf-complex__group-action-icon, .carbon-group-actions a.carbon-btn-remove', function(event){
			setTimeout(function() {
				widthRation = $image[0].naturalWidth / $image[0].clientWidth;
	    		heightRation =  $image[0].naturalHeight / $image[0].clientHeight;

	    		if ( coordinates ) {
		    		area.setSelection(
		    			coordinates[0] / widthRation,
		    			coordinates[1] / heightRation,
		    			coordinates[2] / widthRation,
		    			coordinates[7] / heightRation
		    		);
	    		}

				area.update();
			}, 50);
		});


		setTimeout(function() {
			area.update();
		}, 1);
	}

	handleChange = ( value ) => {
		const { id, onChange } = this.props;

		onChange( id, value );
	}

	/**
	 * Renders the component.
	 *
	 * @return {Object}
	 */
	render() {
		const {
			id,
			name,
			value,
			field
		} = this.props;

		if ( !field.image ) {
			return (
				<span>{field.error_message}</span>
			);
		}

		return (
			<div
				id={id}
				className="cf-image-map__wrapper"
			>
				<img
					className="cf-image-map__image"
					src={field.image} alt=""
					onLoad={this.handleImageLoaded.bind(this)}
				/>

				<input
					type="hidden"
					name={name}
					value={value}
					className="cf-number__input"
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}

export default ImageMapField;
