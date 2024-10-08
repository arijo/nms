define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random',

	'shared/nmsui/popup/popup',
	'shared/nmsui/video-player/video-player',

	'shared/nms/screen/shared/scalable-image',
	'shared/nms/screen/shared/bubble',
	'shared/nms/screen/shared/bubbles' ],
       
	function( $, _, Backbone, Raphael, 

		  Random,

		  Popup,
		  Player,
	
		  ScalableImage,
		  Bubble,
		  Bubbles ) {

			// CONTENT CREATION ILLUSTRATION VIEW
			var ContentcreationIllustrations = Backbone.View.extend({

				events: {
					'click .listtrigger': 'popupopen',
					'popupclose': 'popupclose',
					'click .bug-bubble': 'play'
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

					// SETUP POPUP WIDGET
					this.popup = new Popup({
						//html: $('#popups').find('.medialifecycle.popup').clone(),
						src: this.options.settings.baseUrl + 'pages/medialifecycle/popups/popup.html',
						listenerEl: this.$el,
						settings: this.options.settings			    
					});	

					// SETUP THE VIDEO WIDGET
					this.player = new Player({
						listenerEl: this.$el,
						sources: [{
							src: this.options.settings.baseUrl + 'video/demoreel.m4v',
							type: 'video/mp4'
						},{
							src: this.options.settings.baseUrl + 'video/demoreel.ogv',
							type: 'video/ogg'
						}],
						settings: this.options.settings
					});
				},

				play: function( ev) {
				
					this.player.play();	
				},

				popupopen: function( ev) {

					this.stop();

					this.popup.show();
				},

				popupclose: function( ev) {

					this.start();
				},

				transitionIntoBegin: function() {

					this.start();

					this.bubbles.start();

					this.listtrigger.start();


				},

				transitionIntoComplete: function() {

					//this.bubbles.start();

					//this.listtrigger.start();

					this._animateTextContent();
				},

				transitionOffBegin: function() {

					this.popup.hide();
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

					layout.layoutClass = settings.layoutClass;

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
				    	var floatBoxes = [
						{ id: 1, type: 'box', x: 0.7, y: 0.55, width: 1, height: 1 },
						{ id: 2, type: 'box', x: 0.4, y: 0.08, width:1, height:1 },
						{ id: 3, type: 'box', x: 0.1, y: 0.6, width:1, height:1 },
						{ id: 4, type: 'box', x: 0.2, y: 0.08, width:1, height:1 }
					];
					this.bubbles = new Bubbles({
						el: this.$el.find('.bubbles'),
						layout: layout,
						floatBoxes: floatBoxes
					});

					// DRAW THE LISTTRIGGER BUBBLE
					this.listtrigger = new Bubble({
						el: this.$el.find('.listtrigger'),
						layout: layout,
					   	floatBox: { id: 3, type: 'box', x: 0.12, y:0.4, width:1, height:1 },
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
					//this.bubbles = null;
				},

				resize: function() {

					this.stop();
					this.start();

					this.bubbles.start();

					this.listtrigger.start();

					this.popup.resize();

					this.player.resize();
				},

				getBgColor: function() {
					return this.colorDefaults.background;
				},

				_animateTextContent: function() {
					//console.log('Animating MediaLifeCycle text');
				}
			});

			return ContentcreationIllustrations;
});
