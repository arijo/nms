define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random'],
       
	function( $, _, Backbone, Raphael, Random ) {

		// SCALABLE IMAGE VIEW 
		var ScalableImage = Backbone.View.extend({

			initialize: function() {

					var image = this.options.image, 
						layout = this.options.layout,
						drawingDefaults = this.options.drawingDefaults,

						scaleFactor = image.scaleFactor,
						scale = ( layout.width / image.width),
						aspectRatio = image.width / image.height,

						x = image.x * ( scale * scaleFactor),
						y = image.y * ( scale * scaleFactor / aspectRatio),
						w = image.width * scale * scaleFactor,
						h = image.width * ( scale * scaleFactor / aspectRatio);

					// KEEP THE IMAGE ATTACHED TO THE BOTTOM?
					if( image.keep && image.keep.at === 'bottom') {
						
						var gapHeight = layout.height - y - h;

						if( gapHeight > 0) {
							y = y + gapHeight;
						}
					}

					// DRAW THE IMAGE
					this.sImage = layout.paper.image(
						image.url, x, y, w, h
					);

					// KEEP A REFERENCE TO THE SCALE
					this.s = scale;

					// KEEP A REFERENCE TO THE SCALE FACTOR
					this.sf = scaleFactor;

					// KEEP A REFERENCE TO THE ASPECT RATIO
					this.ar = aspectRatio;

					// KEEP A REFERENCE TO THE IMAGE POSITION
					this.pos = {
						x: x,
						y: y
					};

					// KEEP A REFERENCE TO THE IMAGE WIDTH
					this.w = w;

					// KEEP A REFERENCE TO THE IMAGE HEIGHT
					this.h = h;
			},

			scale: function() {

				return this.s;
			},

			scaleFactor: function() {

				return this.sf;
			},
			
			aspectRatio: function() {

				return this.ar;
			},

			position: function() {

				return this.pos;
			},

			width: function() {

				return this.w;
			},

			height: function() {

				return this.h;
			}
		});

		return ScalableImage;
});
