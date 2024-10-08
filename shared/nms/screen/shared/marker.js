define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random'],
       
	function( $, _, Backbone, Raphael, Random ) {

		// CITY MARKER VIEW 
		var Marker = Backbone.View.extend({
	
			events: {
				'click .close': 'close'
			},

			initialize: function() {
				
				var layout = this.options.layout, 
					paper = layout.paper, 
					scale = this.options.scale,
					scaleFactor = this.options.scaleFactor,
					aspectRatio = this.options.aspectRatio,

					marker = this.options.marker,

					offset = this.options.offset,
					x = marker.x * scale * scaleFactor,
					y = marker.y * scale * scaleFactor, /// aspectRatio,
					r = marker.r;

				this.circle = paper.circle( offset.x + x, offset.y + y, r );  	

				this.circle.attr({
					stroke: this.options.colors.foreground1,
					fill: this.options.colors.foreground1,
					'fill-opacity': 0.5,
					'stroke-width': 2
				});

				this.circle.data('metadata', marker); 

				this.circle.click(
					$.proxy( this.click, this)
				);

				$(this.circle[0]).bind('mouseenter',
					 $.proxy( this.mouseenter, this));
				$(this.circle[0]).bind('mouseleave', 
					$.proxy( this.mouseleave, this));
			},

			click: function( ev, x, y) {

				var metadata = this.circle.data('metadata');

				/*$('.' + this.options.className).hide();

				this.$el.show();*/				

				this.options.listenerEl.trigger('markerselected', [this, metadata]);

				this._fillDot();

				this._selected = true;
			},

			mouseenter: function( ev, x, y) {
				this.circle.attr({
					'cursor': 'pointer'
				});
				if( !this._selected) {

					this._fillDot();
				}
			},

			mouseleave: function( ev, x, y) {
				this.circle.attr({
					'cursor': 'default'
				});
				if( !this._selected) {
		
					this._unfillDot();
				}
			},

			close: function(ev) {

				ev.stopPropagation();

				this.$el.hide();

				this._unfillDot();

				this._selected = false;
			},

			_fillDot: function() {
			
				this.circle.attr({
					'fill-opacity': 1
				});
			},

			_unfillDot: function() {
			
				this.circle.attr({
					'fill-opacity': 0.5
				});
			}


			
		});

		return Marker;
});
