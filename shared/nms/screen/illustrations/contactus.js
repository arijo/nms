define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random',

	'shared/nms/screen/shared/marker',
	'shared/nms/screen/shared/scalable-image',
	'shared/nms/screen/shared/bubbles' ],
       
	function( $, _, Backbone, Raphael, 

		  Random,

		  Marker,
		  ScalableImage,
		  Bubbles ) {

			// CONTACT US ILLUSTRATION VIEW
			var ContactusIllustrations = Backbone.View.extend({

				events: {
					'markerselected': 'cityselected'
				},

				cities: [{
						id: 1,
						name: 'Los Angeles',
						x: 91,
						y: 164,
						r: 6,
						bubbleOffsetX: -8,
						bubbleOffsetY: -225
					},{
						id: 2,
						name: 'Mexico City',
						x: 131,
						y: 197,
						r: 6,
						bubbleOffsetX: -5,
						bubbleOffsetY: -197
					},{
						id: 3,
						name: 'Costa Rica',
						x: 174,
						y: 241,
						r: 6,
						bubbleOffsetX: -4,
						bubbleOffsetY: -152
					},{
						id: 4,
						name: 'Brazil',
						x: 292,
						y: 332,
						r: 6,
						bubbleOffsetX: -8,
						bubbleOffsetY: -172
					},{
						id: 5,
						name: 'Illinois',
						x: 191,
						y: 140,
						r: 6,
						bubbleOffsetX: -5,
						bubbleOffsetY: -163
					},{
						id: 6,
						name: 'Indiana',
						x: 202,
						y: 150,
						r: 6,
						bubbleOffsetX: -5,
						bubbleOffsetY: -163
					},{
						id: 7,
						name: 'Toronto',
						x: 218,
						y: 125,
						r: 6,
						bubbleOffsetX: -7,
						bubbleOffsetY: -177
					},{
						id: 8,
						name: 'New York',
						x: 224,
						y: 141,
						r: 6,
						bubbleOffsetX: -7,
						bubbleOffsetY: -178
					},{
						id: 9,
						name: 'London',
						x: 430,
						y: 106,
						r: 6,
						bubbleOffsetX: -5,
						bubbleOffsetY: -200
					},{
						id: 10,
						name: 'Madrid',
						x: 437,
						y: 151,
						r: 6,
						bubbleOffsetX: -5,
						bubbleOffsetY: -167
					},{
						id: 11,
						name: 'Paris',
						x: 452,
						y: 126,
						r: 6,
						bubbleOffsetX: -7,
						bubbleOffsetY: -195
					},{
						id: 12,
						name: 'Frankfurt',
						x: 464,
						y: 115,
						r: 6,
						fill: '#fff',
						bubbleOffsetX: -7,
						bubbleOffsetY: -168
					},{
						id: 13,
						name: 'Salzburg',
						x: 478,
						y: 120,
						r: 6,
						fill: '#fff',
						bubbleOffsetX: -8,
						bubbleOffsetY: -148
					},{
						id: 14,
						name: 'Czech Republic',
						x: 492,
						y: 113,
						r: 6,
						fill: '#fff',
						bubbleOffsetX: -3,
						bubbleOffsetY: -152
					},{
						id: 15,
						name: 'Nordic',
						x: 479,
						y: 79,
						r: 6,
						fill: '#fff',
						bubbleOffsetX: -30,
						bubbleOffsetY: -118
					},{
						id: 16,
						name: 'Moscow',
						x: 526,
						y: 90,
						r: 6,
						fill: '#fff',
						bubbleOffsetX: -12,
						bubbleOffsetY: -155
					},{
						id: 17,
						name: 'Mumbai',
						x: 685,
						y: 217,
						r: 6,
						fill: '#fff',
						bubbleOffsetX: -262,
						bubbleOffsetY: -95
					},{
						id: 18,
						name: 'Hong Kong',
						x: 804,
						y: 207,
						r: 6,
						fill: '#fff',
						bubbleOffsetX: -258,
						bubbleOffsetY: -97
					},{
						id: 19,
						name: 'Shanghai',
						x: 820,
						y: 185,
						r: 6,
						fill: '#fff',
						bubbleOffsetX: -255,
						bubbleOffsetY: -88
					},{
						id: 20,
						name: 'Tokyo',
						x: 870,
						y: 171,
						r: 6,
						fill: '#fff',
						bubbleOffsetX: -446,
						bubbleOffsetY: -232
					},{
						id: 21,
						name: 'Sydney',
						x: 906,
						y: 404,
						r: 6,
						fill: '#fff',
						bubbleOffsetX: -225,
						bubbleOffsetY: -186
					},{
						id: 22,
						name: 'Auckland',
						x: 971,
						y: 438,
						r: 6,
						fill: '#fff',
						bubbleOffsetX: -220,
						bubbleOffsetY: -180
					}],

				initialize: function() {

					var self = this;

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

					// HIDE ALL CITY BUBBLE BY DEFAULT
					this.$el.find('li').hide();

					// DID THE USER CLICK THE SCREEN?
					this.$el.click( function( ev) {

						var target = ev.target,
						    className = typeof target.className === 'string' && target.className,
						    nodeName = target && target.nodeName,
					            isBubble = className && className.indexOf('city') > -1,
						    isDot = nodeName && $.inArray( nodeName, ['circle', 'shape']) > -1;

						// DID HE CLICK THE BACKGROUND /*(AND NOT ONE OF THE CITY BUBBLES)*/?
						// ... OR ONE OF THE DOTS?
						if( target /*&& !isBubble*/ && !isDot) { 

							// THEN HIDE ANY VISIBLE BUBBLE
							self.$el.find('li').stop(true, true).fadeOut();

							// ... AND UNFILL ANY FILLED DOT
							$.each( self.markers, function( i, m) {
								m._unfillDot();
							});
						}
					});
				},

				transitionIntoBegin: function() {

					this.start();

					//this.bubbles.start();
				},

				transitionIntoComplete: function() {

					//this.bubbles.start();

					this._animateTextContent();
				},

				transitionOffBegin: function() {


				},

				transitionOffComplete: function() {

					this.stop();
				},

				cityselected: function( ev, marker, city) {

					//console.log( city.name);

					this.showCity( marker, city);
				},

				start: function() {

				    var layout = this.layoutDefaults,
					overlay = this.options.params.overlay,
					    colors = this.colorDefaults,
					    drawingDefaults = this.drawingDefaults,
					    image = this.image,
						overlay = this.options.params.overlay,
						cities = this.cities,
						len = cities.length;

					layout.width = $(window).width();	
					layout.height = $(window).height();

					// CREATE ILLUSTRATIONS CANVAS
					layout.paper = Raphael(
						$(layout.selector)[0],
						layout.width,
						layout.height
					);

					// CREATE OVERLAY CANVAS
					overlay.paper = Raphael(
						$(overlay.selector)[0],
						layout.width,
						layout.height
					);

					// DRAW THE BACKGROUND IMAGE
					/*this.bgImage = new ScalableImage({
						image: image,
						layout: layout,
						drawingDefaults: drawingDefaults
					});

					// SETUP THE CITY MARKERS		
					this.markers = [];
					for( var i=0; i < len; i++) {
					   
						var c = cities[i];
						var m = new Marker({
							el: this.$el.find('.city-' + c.id),
							marker: c,
							offset: this.bgImage.position(),
							layout: overlay,
							listenerEl: this.$el,
							scale: this.bgImage.scale(),
							scaleFactor: this.bgImage.scaleFactor(),
							colors: colors
						});

						this.markers.push( m);


						// IS THE CITY BUBBLE VISIBLE?
						var cityEl = this.$el.find( '.city-' + c.id + ':visible');
						if( cityEl.size()) {
							
							// THEN REPOSITION IT
							this.showCity(m, c);
						}
					};*/

					// DRAW THE BG IMAGE ( VERTICALLY ALIGNED)
					var wRef = 1340, 
					    hRef = 740,
					    sf = 1.35,
					    s = layout.width/wRef,
					    w = image.width * sf * s,
					    h = w*(image.height/image.width),
					    x = ( layout.width - w)/2,
					    y = (layout.height - h)/2;

				       	layout.paper.image(
						image.url, x, y, w, h
					);	

					this.bgImage = {
						position: function() { return { x: x, y: y } },
						scale: function() { return s },
						scaleFactor: function() { return sf}
					};

					// DRAW THE CITY DOTS
					this.markers = [];
					for( var i=0; i < len; i++) {
					   
						var c = cities[i];
						var m = new Marker({
							el: this.$el.find('.city-' + c.id),
							marker: c,
							layout: overlay,
							listenerEl: this.$el,
							offset: this.bgImage.position(),
							scale: this.bgImage.scale(),
							scaleFactor: this.bgImage.scaleFactor(),
							colors: colors
						});
						this.markers.push( m);

						// IS THE CITY BUBBLE VISIBLE?
						var cityEl = this.$el.find( '.city-' + c.id + ':visible');
						if( cityEl.size()) {
							
							// THEN REPOSITION IT
							this.showCity(m, c);
						}
					};

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
					//this.bubbles = null;
				},

				resize: function() {
					this.stop();
					this.start();

					//this.bubbles.start();
				},

				getBgColor: function() {

					return this.colorDefaults.background;
				},

				_animateTextContent: function() {

				},

				showCity: function( marker, city) {

					var layout = this.layoutDefaults,
					    cityEl = this.$el.find( '.city-' + city.id),
					    o = this.bgImage.position(),
					    s = this.bgImage.scale(),
					    sf = this.bgImage.scaleFactor(),
					    x = city.x * s * sf + city.bubbleOffsetX + o.x,
					    y = city.y * s * sf + city.bubbleOffsetY + o.y ;

					this.$el.find('.city .close').click();
					//this.$el.find('.city').hide();

					//cityEl.show();
					cityEl.stop( true, true).fadeIn();

					cityEl.css({
						left: x,
						top: y
					});

					marker._fillDot();
				}
			});

			return ContactusIllustrations;
});
