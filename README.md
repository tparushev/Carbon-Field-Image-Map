# Image Map - Carbon Field

## Introduction

This field type can be used for getting a rectangular selection ( 4 points on image ). The field is using the post featured image. So the best scenario is to use it at separate post type. The image must be uploaded and after refresh you'll be able to draw the rectanle.

## Usage

The field type is `image_map`. You can use the carbon fields as usual:

`Field::make( 'image_map', 'coordinates', __( 'Image Map', 'crb' ) )`

The return value will be the 4 points of the selection: left,top,right,top,right,bottom,left,bottom.
