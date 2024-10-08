define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'nms/utils/random'],
       
	function( $, _, Backbone, Raphael, Random ) {

		// DOT VIEW
		var Dot = Backbone.View.extend({

			defaults: {
				minRadius: 4,
				maxRadius: 15,
				minOpacity: 30,
				maxOpacity: 70,
				colors: [ '#83dd19', '#ffffff' ]
			},

			initialize: function() {

				var paper = this.options.paper,

				    colors = this.defaults.colors,
				    fill = colors[ Random.between( 0, colors.length)], 

				    minOpacity = this.defaults.minOpacity,
				    maxOpacity = this.defaults.maxOpacity,
				    opacity = Random.between( minOpacity, maxOpacity) / 100,

				    radius = this.options.radius,
				    cx = this.options.cx,
				    cy = this.options.cy;

				this.$el = paper.circle( cx, cy, radius);

				// DOT DEFAULT LOOK
				this.$el.attr({
					fill: fill,
					opacity: opacity,
					stroke: 'none'
				});
			}
		});

		return Dot;
});
