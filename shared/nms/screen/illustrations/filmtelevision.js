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

			// CONTENT CREATION ILLUSTRATION VIEW
			var FilmtelevisionIllustration = Backbone.View.extend({

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

					//this.bubbles.stop();
				},

				transitionOffComplete: function() {

					this.stop();

					this.bubbles = null;
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

					// DRAW FIRST TV SLIDE
					var slides = this.options.params.slides,
					    counter = 0,
					    len = slides.length,
					    slide = slides[counter],
					    scale = this.bgImage.scale(),
					    scaleFactor = this.bgImage.scaleFactor(),
					    //adjustment = 0.985,
					    adjustment = 0.94,
					    x = slide.x * scale * scaleFactor,
					    y = slide.y * scale * scaleFactor,
					    w = slide.width * scale * scaleFactor,
					    h = slide.height * (scale * scaleFactor * adjustment);

					this.img = layout.paper.image( 
						slide.url,
						x,
						y,
						w, 
						h
					).attr({
						opacity: 0
					});

					this.img.animate({
						opacity: 1
					}, 1500);

					this.slides = slides;
					this.slideCounter = counter;

					// DRAW THE (LI) BUBBLES 
				    	var floatBoxes = [
						{ id: 1, type: 'box', x: 0.35, y: 0.62, width:1, height:1 },
						{ id: 2, type: 'box', x: 0.65, y: 0.75, width:1, height:1 },
 						{ id: 3, type: 'box', x: 0.07, y: 0.7, width:1, height:1 }
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

					// FADEOUT PREVIOUS TV SLIDE
					this.img.animate({
						opacity: 0
					}, 1500);

					// DRAW NEXT TV SLIDE
					this.slideCounter = this.slideCounter + 1;

					//this.bubbles.paint();
					if( this.slideCounter > this.slides.length - 1) {

						this.slideCounter = 0;
					}

				        var layout = this.layoutDefaults,
					    counter = this.slideCounter,
					    slides = this.slides,
					    len = slides.length,
					    slide = slides[counter],
					    scale = this.bgImage.scale(),
					    scaleFactor = this.bgImage.scaleFactor(),
					    //adjustment = 0.985,
					    adjustment = 0.94,
					    x = slide.x * scale * scaleFactor,
					    y = slide.y * scale * scaleFactor,
					    w = slide.width * scale * scaleFactor,
					    h = slide.height * (scale * scaleFactor * adjustment);

					this.img = layout.paper.image( 
						slide.url,
						x,
						y,
						w, 
						h
					).attr({
						opacity: 0
					});

					// FADEIN NEW TV SLIDE
					this.img.animate({
						opacity: 1
					}, 1500);
				},

				stop: function() {

					var layout = this.layoutDefaults;
					clearInterval( this.clock);
					layout.paper.clear();
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

			return FilmtelevisionIllustration;
});
