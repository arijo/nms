define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random',

	'shared/nmsui/popup/popup',

	'shared/nms/screen/shared/scalable-image',
	'shared/nms/screen/shared/bubble',
	'shared/nms/screen/shared/bubbles' ],
       
	function( $, _, Backbone, Raphael, 

		  Random,

		  Popup,

		  ScalableImage,
		  Bubble,
		  Bubbles ) {

			// SUPPLY CHAIN SOLUTIONS ILLUSTRATION VIEW
			var MarketplaceservicesIllustrations = Backbone.View.extend({

				events: {
					'click .listtrigger': 'popupopen',
					'popupclose': 'popupclose'
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
				    var	floatBoxes = [
						{ id: 1, type: 'box', x: 0.1, y: 0.1, width: 1, height: 1 },
						{ id: 2, type: 'box', x: 0.55, y: 0.05, width: 1, height: 1 },
						{ id: 3, type: 'box', x: 0.3, y: 0.65, width: 1, height: 1 }
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
						floatBox: { id: 4, type: 'box', x: 0.45, y: 0.4, width: 1, height: 1 },
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
				},

				getBgColor: function() {
					return this.colorDefaults.background;
				},

				_animateTextContent: function() {
					//console.log('Animating MediaLifeCycle text');
				}
			});

			return MarketplaceservicesIllustrations;
});
