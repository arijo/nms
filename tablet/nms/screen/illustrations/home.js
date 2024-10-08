define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random',

	'shared/nmsui/video-player/video-player',

	'shared/nms/screen/shared/scalable-image',
		
	'tablet/nms/screen/shared/bubble'/*,
	'shared/nms/screen/shared/bubbles'*/ ],
       
	function( $, _, Backbone, 
		  
		  Raphael, 

		  Random,
		  
		  VideoPlayer,

		  ScalableImage,
		  
		  Bubble/*, Bubbles*/) {

		// HOME ILLUSTRATION VIEW
		var HomeIllustration = Backbone.View.extend({

			// LAYOUT DEFAULTS
			layoutDefaults: {
				selector:        '#grid .screen.home .illustrations',
				backgroundVideo: null,
				paper:           null,
				width:           null,
				height:          null,
				loopInterval:    50,
				intervalID:      null,
				textTransition:  1000,
				textPause:       3500,
				bgVideo: {
					el: $('#grid .screen.home .illustrations video'),
					width: 720,
					height: 480,
					scaleFactor: 2.6 
				}
			},

			// COLOR DEFAULTS
			colorDefaults: {
				background:  '#5bdef1',
				foreground1: '#83dd19',
				type1:       '#ffffff',
				type2:       '#c6ff6d',
				dots:        ['#83dd19', '#83dd19', '#ffffff', '#83dd19']
			},
		
			events: {
				'click .socialplatformsbug': 'gotoSocialplatforms',
				'click .consumerexperiencebug': 'gotoConsumerexperience',
				'click .supplychainbug': 'gotoSupplychain'
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

				// REMOVE LOADING STYLES
				this.$el.removeClass('loading');
			},

			gotoConsumerexperience: function() {
			
				this.$el.trigger('screenId', 'seeusinaction_consumerexperiences');	
			},
			
			gotoSocialplatforms: function() {
			
				this.$el.trigger('screenId', 'seeusinaction_socialplatforms');	
			},

			gotoSupplychain: function() {
			
				this.$el.trigger('screenId', 'medialifecycle_supplychainsolutions');	
			},

			transitionIntoBegin: function() {

				this.start();
			},

			transitionIntoComplete: function() {
				

			},

			transitionOffBegin: function() {


			},

			transitionOffComplete: function() {

				this.stop();
			},

			start: function() {

				var layout = this.layoutDefaults,
					settings = this.options.settings,
					colors = this.colorDefaults,
					drawingDefaults = this.drawingDefaults,
					image = this.image;

				layout.width = $(window).width();	
				layout.height = $(window).height();

				// DRAW THE CONSUMEREXPERIENCE BUBBLE
				this.consumerexperiencebug = new Bubble({
					el: this.$el.find('.consumerexperiencebug'),
					layout: layout,
					//floatBox: { id: 1, type: 'box', x: 0.51, y:-0.15, width:1, height:1 },
					floatBox: { id: 1, type: 'box', x: 0.61, y:0.10, width:1, height:1 },
					floatSpeed: 3,
					stay: true
				});

				// DRAW THE SOCIALPLATFORMS BUBBLE
				this.socialplatformsbug = new Bubble({
					el: this.$el.find('.socialplatformsbug'),
					layout: layout,
					floatBox: { id: 2, type: 'box', x: 0.61, y:0.51, width:1, height:1 },
					//floatBox: { id: 2, type: 'box', x: 0.51, y:0.31, width:1, height:1 },
					floatSpeed: 3,
					stay: true
				});

				// DRAW THE SUPPLYCHAIN BUBBLE
				this.supplychainbug = new Bubble({
					el: this.$el.find('.supplychainbug'),
					layout: layout,
					//floatBox: { id: 3, type: 'box', x: 0.62, y:0.10, width:1, height:1 },
					floatBox: { id: 3, type: 'box', x: 0.72, y:0.30, width:1, height:1 },
					floatSpeed: 3,
					stay: true
				});

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
				
				// INITAL IMAGE ROTATING STATE
				this.phi = 0;
				this.delta = 0.02;

				this._animateTextContent();
				
			        // START THE ANIMATION LOOP
			        this.clock = setInterval( 
					$.proxy( this.paint, this),
					layout.loopInterval
			        );
			},

			// CALLED ONCE IN EACH ANIMATION LOOP
			paint: function() {

				// UPDATE THE ANGLE
				this.phi = this.phi + this.delta;
				if( this.phi > 360) {

					this.phi = 0;
				}

				//this.bgImage.sImage.transform('r0.02...');
				this.bgImage.sImage.transform('r' + this.phi);

				/*var dots = this.dots,
				    devices = this.devices,
				    layout = this.layoutDefaults;

				// ANIMATE THE DOTS
				dots.set.forEach( function(e){

					if (e.attr('cy') < 0){
						// An item has moved above the paper edge, so reset its attributes
						e.attr({
							'cy': layout.height + dots.maxSize,
							'cx': Random.between(0, layout.width),
							'r' : Random.between( dots.minSize, dots.maxSize)/2
						});
					}

					e.animate({
						cy: e.attr('cy') - ( e.speed * 2),
						easing: 'linear'
					}, layout.loopInterval);
				});

				devices.set.forEach(function(e){

					if ((e.attr('y') + e.attr('height')) < 0){

						// An item has moved above the paper edge, so reset its attributes
						e.attr({
							'y':   layout.height + e.attr('height'),
							'x':   Random.between(0, layout.width),
							'url': devices.urls[Random.between(0, devices.urls.length-1)]
						});
					}

					e.animate({
						y: e.attr('y') - (e.speed * 2),
						easing: 'linear'
					}, layout.loopInterval);
				});*/

			       //console.log('paint');
			},	

			stop: function() {

				var layout = this.layoutDefaults;

				clearInterval( this.clock);

				clearInterval( this.flashTimer);

				layout.paper.clear();

			       //console.log('stopped the animation loop');
			},

			resize: function() {

				var layout = this.layoutDefaults;

				// STOP THE ILLUSTRATION'S ANIMATIONS
				this.stop();

				// START ILLUSTRATION'S ANIMATIONS ( AND RESIZE)
				this.start();

				//this.videotrigger.start();

				this.socialplatformsbug.start();

				this.consumerexperiencebug.start();

				this.supplychainbug.start();
			},

			getBgColor: function() {
			
				return this.colorDefaults.background;
			},

			_makeDot: function( paper, size) {

				var layout = this.layoutDefaults,
				    colors = this.colorDefaults,
				    dots = this.dots,

				    radius = size/2,

				    thisDot = paper.circle(
					    Random.between(0, layout.width), 
					    Random.between(0, layout.height), 
					    radius
				    ).attr({
					    fill: colors.dots[Random.between(0, colors.dots.length-1)],
					    opacity: Random.between(dots.minOpacity, dots.maxOpacity) / 100,
					    stroke: "none"
				    });

				thisDot.speed = radius;  // we want smaller items to move slower, to give impression of being further away from the user

				return thisDot;
			},

			_makeDevice: function( paper, size) {

				var layout = this.layoutDefaults,
				    devices = this.devices,

				    thisDevice = paper.image(
			 	            devices.urls[Random.between( 0, devices.urls.length-1)],
					    Random.between(0, layout.width), 
					    Random.between(0, layout.height), 
					    10 * size,
					    10 * size
				    );

				thisDevice.speed = size;  // we want smaller items to move slower, to give impression of being further away from the user

				return thisDevice;
			},

			_animateTextContent: function() {

				var dots = this.dots, 
				    devices =   this.devices,
				    layout = this.layoutDefaults,
				    colors = this.colorDefaults,
				    flashEls = this.$el.find('.flash'),
				    flashCounter = 0;

				flashEls.removeClass('hidden').hide();

				this.flashTimer = setInterval( function() {
					
					$(flashEls.get( flashCounter)).hide()

					flashCounter = flashCounter + 1;

					if( flashCounter > 2) flashCounter = 0;

					$(flashEls.get( flashCounter)).fadeIn();
					
				}, layout.textPause);

				/*var titles = $('.home .flash');
				setTimeout(function(){
					cycleText(titles, layout.textPause, layout.textDuration);
					}, layout.textPause + 500);

				function cycleText(list, pause, duration){
					if (list.length > 1){ 
						// Fade out current span
						$(list[0]).fadeOut(duration, function(){
							// Fade in new span
							$(list[1]).removeClass('hidden').fadeIn(duration, function(){
								// Move on to the next line
								list.splice(0, 1);
								setTimeout(function(){cycleText(list, pause, duration);}, layout.textPause);
							});
						});
					}
				}*/
			}

		});

		return HomeIllustration;
});
