define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random',

	'shared/nms/screen/shared/bubble'],
       
	function( $, _, Backbone, Raphael, 
		 
		  Random,
	         
		  Bubble ) {

		// BUBBLES ANIMATION VIEW 
		var Bubbles = Backbone.View.extend({

			defaults: {
				floatBoxes: [
						{ type: 'right', width: 50 }, 
						{ type: 'bottom', height: 25 },
						{ type: 'left', width: 50 },
						{ type: 'top', height: 25 }	
				],
				floatSpeed: 2
			},

			initialize: function() {

				$.extend( this.defaults, this.options);

				var bubbleEls = this.$el.find('li'),
				    count = bubbleEls.size(),
				    containerEl = this.$el.parent(),
				    screenEl = this.$el.closest('.screen');

				// IS THE BUBBLES CONTAINER EL APPENDED TO THE SCREEN EL?
				if( containerEl[0] !== screenEl[0]) {

					// IF NOT THEN DO IT ...
					this.$el.appendTo( screenEl);

					// ... AND CHANGE THE BUBBLES STYLES SO THEY CAN MOVE FREELY AROUND THE SCREEN
					bubbleEls.addClass('bubble');
				}

				// KEEP A LIST OF REFERENCES TO ALL BUBBLE VIEWS
				this.bubbles = [];

				// SETUP THE BUBBLE VIEWS
				for( var i=0; i<count; i++) {

					var bubbleEl = bubbleEls[i],
					    boxes = this.options.floatBoxes || this.defaults.floatBoxes,
						boxCount = boxes.length,
						box = this._getBubbleFloatBox( bubbleEl, boxes, i),
						speed = this.options.floatSpeed || this.defaults.floatSpeed,
						b = new Bubble({
							el: bubbleEl,
							layout: this.options.layout,
							//floatBox: boxes[i % boxCount],
							floatBox: box,
							floatSpeed: speed
						});

					this.bubbles.push( b);
				}
			},

			start: function() {

				var bubbles = this.bubbles, 
				    count = bubbles.length;

				for( var i=0; i<count; i++) {

					var b = bubbles[i];

					b.start();
				}

			},

			stop: function() {

				var bubbles = this.bubbles, 
				    count = bubbles.length;

				for( var i=0; i<count; i++) {

					var b = bubbles[i];

					b.stop();
				}
			},

			paint: function() {

				var bubbles = this.bubbles, 
				    count = bubbles.length;

				for( var i=0; i<count; i++) {

					var b = bubbles[i];

					b.paint();
				}
			},

			_getBubbleFloatBox: function( bubbleEl, boxes, i) {

				var classNames = bubbleEl.className,
				    matches = classNames && classNames.match(/float-(\d+)/),
					id = matches && matches[1],
					boxCount = boxes && boxes.length,
					box;

				if( id && boxes) {

					for( var k=0;k<boxCount;k++) {

						var b = boxes[k];
						if( b.id == id) {
							box = b;
							break;
						}
					}
					return box;
				}
		
				if( boxes && boxCount && i) {

					box = boxes[ i%boxCount];
				}

				return box;
			}
		});

		return Bubbles;
});
