define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random'],
       
	function( $, _, Backbone, Raphael, Random ) {

		// PATH ILLUSTRATION VIEW 
		var Path = Backbone.View.extend({

			initialize: function() {

				var layout = this.options.layout,
				    drawingDefaults = this.options.drawingDefaults,
				    image = this.options.image,

				    scale = layout.width/image.width * image.scaleFactor,

				    // DRAW THE RAW PATH
				    path = layout.paper.path( image.path);

				// SET THE STROKE, FILL AND OPACITY
				path.attr({
					'stroke': drawingDefaults.stroke,
					'stroke-width': drawingDefaults.strokeWidth,
					'fill': drawingDefaults.fill,
					'fill-opacity': drawingDefaults.fillOpacity
				});

				// SCALE THE IMAGE WHILE KEEPING THE ASPECT RATIO
				var x = Math.floor( layout.width/2 - image.width/2),
				    y = Math.floor( layout.height/2 - image.height/2);

				path.transform(
					't' + x + ',' + y + 
					's' + scale + ',' + scale
				);
			}
		});

		return Path;
});
