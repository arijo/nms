define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random',

	'shared/nms/screen/shared/scalable-image',
	'shared/nms/screen/shared/bubbles' ],
       
	function( $, _, Backbone, Raphael, 

		  Random,

		  ScalableImage,
		  Bubbles ) {

			// MUSIC ILLUSTRATION VIEW
			var MusicIllustration = Backbone.View.extend({

				initialize: function() {

					this.layoutDefaults = $.extend( 
						this.options.params.layoutDefaults || {},
						this.layoutDefaults || {}
					);

					this.colorDefaults = $.extend( 
						this.options.params.colorDefaults || {},
						this.colorDefaults || {}
					);

					this.drawingDefaults = $.extend( 
						this.options.params.drawingDefaults || {},
						this.drawingDefaults || {}
					);

					this.image = $.extend( 
						this.options.params.image || {},
						this.image || {}
					);
				},

				transitionIntoBegin: function() {

					this.start();

					this.bubbles.start();
				},

				transitionIntoComplete: function() {

					//this.bubbles.start();

					this._animateTextContent();
				},

				transitionOffBegin: function() {


				},

				transitionOffComplete: function() {

					this.bubbles = null;

					this.stop();
				},

				start: function() {

				        var layout = this.layoutDefaults,
					    colors = this.colorDefaults,
					    drawingDefaults = this.drawingDefaults,
					    image = this.image;

					layout.width = $(window).width();	
					layout.height = $(window).height();

					layout.paper = Raphael(
						$(layout.selector)[0],
						layout.width,
						layout.height
					);

				    // DRAW THE BACKGROUND IMAGE
					this.bgImage = new ScalableImage({
						image: image,
						layout: layout,
						drawingDefaults: drawingDefaults
					});

					// DRAW THE (LI) BUBBLES 
				    var	floatBoxes = [

						{ id: 1, type: 'box', x: 0.22, y: 0.15, width:1, height:1 },
						{ id: 2, type: 'box', x: 0.32, y: 0.11, width:1, height:1 },
						{ id: 3, type: 'box', x: 0.78, y: 0.14, width:1, height:1 },
						{ id: 4, type: 'box', x: 0.72, y: 0.22, width:1, height:1 },
						{ id: 5, type: 'box', x: 0.35, y: 0.7, width:1, height:1 },
						{ id: 6, type: 'box', x: 0.29, y: 0.64, width:1, height:1 },
						{ id: 7, type: 'box', x: 0.092, y: 0.6, width:1, height:1 },
						{ id: 8, type: 'box', x: 0.82, y: 0.2, width:1, height:1 }
					];
					this.bubbles = new Bubbles({
						el: this.$el.find('.bubbles'),
						layout: layout,
						floatBoxes: floatBoxes
					});

					// START THE ANIMATION LOOP
					this.clock = setInterval( 
						$.proxy( this.paint, this),
						layout.loopInterval
					);
				},

				paint: function() {

					//this.bubbles.paint();
				},

				stop: function() {

					var layout = this.layoutDefaults;
					clearInterval( this.clock);
					layout.paper.clear();

					//this.bubbles.stop();
					this.bubbles = null;
				},

				resize: function() {
					this.stop();
					this.start();

					this.bubbles.start();
				},

				getBgColor: function() {
					return this.colorDefaults.background;
				},

				_animateTextContent: function() {
					//console.log('Animating MediaLifeCycle text');
				}
			});

			return MusicIllustration;
});
