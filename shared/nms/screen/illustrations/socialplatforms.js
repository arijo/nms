define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random',

	'shared/nmsui/video-player/video-player',

	'shared/nms/screen/shared/scalable-image',
	'shared/nms/screen/shared/bubble',
	'shared/nms/screen/shared/bubbles' ],
       
	function( $, _, Backbone, Raphael, 

		  Random,
		  Player,

		  ScalableImage,
		  Bubble,
		  Bubbles ) {

			// SOCIAL PLATFORMS ILLUSTRATION VIEW
			var SocialplatformsIllustrations = Backbone.View.extend({

				events: {
					//'click .videotrigger': 'play',
					'click .videotrigger': 'lootbugclicked',
					'click .indabamusicbug': 'indabamusicbugclicked'
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

					// SETUP THE VIDEO WIDGET
					this.player = new Player({
						listenerEl: this.$el,
						sources: [{
							src: this.options.settings.baseUrl + 'video/gaming.m4v',
							type: 'video/mp4'
						},{
							src: this.options.settings.baseUrl + 'video/gaming.ogv',
							type: 'video/ogg'
						}],
						settings: this.options.settings
					});
				},

				play: function( ev) {
				
					this.player.play();	
				},

				indabamusicbugclicked: function( ev) {
				
				 	this.indabaSite = window.open('http://www.youtube.com/user/IndabaMusic');	
				},

				lootbugclicked: function( ev) {
				
				 	this.lootSite = window.open('http://www.lootentertainment.com');	
				},

				transitionIntoBegin: function() {

					this.start();

					this.bubbles.start();

					this.videotrigger.start();

					this.indabamusicbug.start();
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
					/*this.bgImage = new SvgImage({
						image: image,
						layout: layout,
						drawingDefaults: drawingDefaults
					});*/
			
					// DRAW THE (LI) BUBBLES 
				    var	floatBoxes = [
						//{ id: 1, type: 'box', x: 0.001, y: 0.4, width:1, height:1 },
						{ id: 2, type: 'box', x: 0.25, y: 0.7, width:1, height:1 }
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
					   	floatBox: { id: 3, type: 'box', x: 0.5, y:0.4, width:1, height:1 },
						floatSpeed: 3
					});

					// DRAW THE INDABAMUSIC BUBBLE
					this.indabamusicbug = new Bubble({
						el: this.$el.find('.indabamusicbug'),
						layout: layout,
						floatBox: { id: 1, type: 'box', x: 0.005, y:0.15, width:1, height:1 },
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

					this.indabamusicbug.start();

					this.player.resize();
				},

				getBgColor: function() {
					return this.colorDefaults.background;
				},

				_animateTextContent: function() {
					//console.log('Animating MediaLifeCycle text');
				}
			});

			return SocialplatformsIllustrations;
});
