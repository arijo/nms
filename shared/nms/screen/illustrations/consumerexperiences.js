define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random',

	'shared/nms/screen/shared/scalable-image',
	'shared/nms/screen/shared/bubble',
	'shared/nms/screen/shared/bubbles' ],
       
	function( $, _, Backbone, Raphael, 

		  Random,

		  ScalableImage,
		  Bubble,
		  Bubbles ) {

			// CONSUMER EXPERIENCES ILLUSTRATION VIEW
			var ConsumerexperiencesIllustrations = Backbone.View.extend({

				layoutDefaults: {

				},

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

					this.videotrigger.start();
				},

				transitionIntoComplete: function() {

					//this.bubbles.start();

					//this.videotrigger.start();

					this._animateTextContent();
				},

				transitionOffBegin: function() {


				},

				transitionOffComplete: function() {

					this.stop();
				},

				start: function() {

				        var layout = this.layoutDefaults,
					    bullets = this.options.params.bullets,
					    colors = this.colorDefaults,
					    drawingDefaults = this.drawingDefaults,
					    image = this.image,
					    foreground = this.options.params.foreground;

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
						{ id: 1, type: 'box', x:0.1, y:0.1, width:1, height:1 },
						{ id: 2, type: 'box', x:0.75, y:0.2, width:1, height:1 },
						{ id: 3, type: 'box', x:-0.05, y:0.4, width:1, height:1 },
						{ id: 4, type: 'box', x:0.7, y:0.6, width:1, height:1 },
						{ id: 5, type: 'box', x:0, y:0, width:1, height:1 },
						{ id: 6, type: 'box', x:0, y:0, width:1, height:1 },
						{ id: 7, type: 'box', x:0, y:0, width:1, height:1 },
						{ id: 8, type: 'box', x:0, y:0, width:1, height:1 }

					];
					this.bubbles = new Bubbles({
						el: this.$el.find('.bubbles'),
						layout: layout,
						floatBoxes: floatBoxes
					});

					// DRAW THE VIDEOTRIGGER BUBBLE
					this.videotrigger = new Bubble({
						el: this.$el.find('.videotrigger'),
						layout: layout,
					   	floatBox: { id: 9, type: 'box', x: 0.65, y:0.45, width:1, height:1 },
						floatSpeed: 3
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

					this.videotrigger.start();
				},

				getBgColor: function() {

					return this.colorDefaults.background;
				},

				_animateTextContent: function() {

				}
			});

			return ConsumerexperiencesIllustrations;
});
