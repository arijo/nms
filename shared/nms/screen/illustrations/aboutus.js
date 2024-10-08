define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random' ],
       
	function( $, _, Backbone, 
		  
		  Raphael, 

		  Random ) {

			// MEDIA LIFE CYCLE ILLUSTRATION VIEW
			var AboutusIllustration = Backbone.View.extend({

				// LAYOUT DEFAULTS
				layoutDefaults: {
					selector:     '#grid .screen.aboutus .illustrations',
					paper:        null,
					width:        null,
					height:       null,
					loopInterval: 500,
					intervalID:   null
				},

				// COLOR DEFAULTS
				colorDefaults: {
					background:  '#dc4f85',
					foreground1: '#5281f4',
					foreground2: '#4eb6dc',
					foreground3: '#62f9de',
					type1:       '#ffffff',
					type2:       '#ffffff',
					dots:        ['#5281f4', '#ffffff']
				},
			
				// KEEP TRACK OF THE DOTS
				dots: {
					set:        null,
					count:      60,
					minSize:    4,
					maxSize:    15,
					minOpacity: 30,
					maxOpacity: 70
				},

				// BANNER
				banner: {
					set:         null,
					url:         'images/aboutus/profiles.png',
					width:       1893,
					height:      280,
					altitude:    100,
					tiles:       2,
					speed: 	     30
				},

				transitionIntoBegin: function() {

					this.start();
				},

				transitionIntoComplete: function() {

					this._animateTextContent();
				},

				transitionOffBegin: function() {


				},

				transitionOffComplete: function() {

					this.stop();
				},

				start: function() {

					var dots = this.dots, 
					    banner = this.banner,
					    layout = this.layoutDefaults,
					    colors = this.colorDefaults;

					layout.width = $(window).width();	
					layout.height = $(window).height();

					// Determine how many times we need to repeat the banner to fill the screen width
					banner.tiles = Math.ceil(layout.width/banner.width) + 1;
					//console.log(banner.tiles);

					layout.paper = Raphael(
						$(layout.selector)[0],
						layout.width,
						layout.height
					);

					dots.set = layout.paper.set();
					banner.set = layout.paper.set();

					for (i=0; i<banner.tiles; i++){

						var tile = layout.paper.image(
							banner.url, 
							(i * banner.width), 
							banner.altitude, 
							banner.width, 
							banner.height
						);

						tile.speed = banner.speed;

						banner.set.push( tile);	
					}
					
					// START THE ANIMATION LOOP
					this.clock = setInterval( 
						$.proxy( this.paint, this),
						layout.loopInterval
					);
				},

				// CALLED ONCE IN EACH ANIMATION LOOP
				paint: function() {

					var layout = this.layoutDefaults,
				            paper = layout.paper,	

					    // CALCULATE THE NEXT POSITION FOR THE LAST TILE
					    banner = this.banner, 
					    tiles = banner.set, 
					    len = tiles.length,
					    lastTile = tiles[len-1],

					    tileLeft = lastTile.attr('x'),
					    screenWidth = $(window).width();

					    // IS THE LAST TILE LEFT BORDER PAST THE SCREEN ALREADY?
					    if( tileLeft < screenWidth) {

						// IF YES THEN APPEND ONE MORE TILE TO THE END OF THE BANNER
						lastTile = paper.image(
							banner.url,
							lastTile.attr('x') + banner.width,
							banner.altitude,
							banner.width,
							banner.height
						);

						lastTile.speed = banner.speed;

						banner.set.push( lastTile);	
					    }

					// MOVE ALL TILES ONE STEP TO THE LEFT
					banner.set.forEach( function( el) {

						el.animate({
							x: el.attr('x') - (el.speed),
							easing: 'linear'
						}, layout.loopInterval);
					});
				},	

				stop: function() {
					var layout = this.layoutDefaults;
					clearInterval( this.clock);
					layout.paper.clear();
				},

				resize: function() {

					this.stop();
					this.start();
				},

				getBgColor: function() {
					return this.colorDefaults.background;
				},

				_animateTextContent: function() {
					//console.log('Animating MediaLifeCycle text');

				}
			});

			return AboutusIllustration;
});
