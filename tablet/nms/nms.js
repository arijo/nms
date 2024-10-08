define([
	'jquery',
	'underscore',
	'backbonejs',

	'shared/nms/router/router',

	'shared/nms/grid/grid',
	'tablet/nms/viewport/viewport',
	'shared/nms/footer/footer',

	//'shared/nms/screen/illustrations',
	'tablet/nms/screen/illustrations',

	'libs/jquery.easing.1.3',
	'libs/jquery.color',
	'libs/jquery.backstretch' ],
       
	function( $, _, Backbone,

		  // NAVIGATION FRAMEWORK
		  Router,
		  Grid,
		  Viewport,
		  Footer,
	       
		  // SCREEN ILLUSTRATIONS
		  illustrations/*,

		  Easing, Color, Backstretch*/ ) {

			// NMS APPLICATION
			var NmsApp = Backbone.View.extend({

				defaults: {
					backgroundParallaxPerScreen: 20
				},

				events: {

					// HIGH-LEVEL EVENTS
					'screen .viewport': 'screenSelected',
					'screenId .screen': 'screenSelectedById',
					'move #grid': 'gridMoved',

					'touchmove': 'touchmove',
					'orientationchange': 'orientationchange'
				},

				initialize: function() {

					var self = this;

					// KEEP A GLOBAL REFERENCE TO THE MAIN APP IN SETTINGS
					this.options.settings.app = this;

					this.options.settings.layoutClass = this._addLayoutClass( $(window).width());

					// SETUP THE VIEWPORT VIEW
					this.viewport = new Viewport({
						el: $('#container'),
						settings: this.options.settings
					});

					// GET THE NAVIGATION MENU SCREEN METADATA
					this.screens = this.viewport.getMetadata();	

					// SETUP THE GRID VIEW
					this.grid = new Grid({
						el: $('#grid'),
						screens: this.screens,
						settings: this.options.settings
					});

					// SETUP THE SCREN ILLUSTRATIONS
					for( var id in this.screens) {

						var s = this.screens[id],
					            config = illustrations[id],
						    Illustrations = config && config.view,
						    params = config && config.params;

						// IS THERE AN ILUSTRATION FOR THIS SCREEN?
						if( !Illustrations) {

							// IF NOT THEN DO NOTHING
							continue;
						}

						// KEEP A REFERENCE TO THE ILLUSTRATION VIEW ON THE SCREEN METADATA
						s.illustrations = new Illustrations({
							el: s.$screenEl,
							params: params,
							settings: this.options.settings
						});
					}

					// SETUP THE FOOTER VIEW
					this.footer = new Footer({
						el: $('footer'),
						settings: this.options.settings
					});

					// RESIZE ALL VIEWS ON WINDOW RESIZE
					$(window).resize( $.proxy( this.resize, this));

					// KEEP TRACK OF THE BACKGROUND EL
					this.$bgEl = $('#background-container');

					// EXPAND BACKGROUND 
					var gw = this.grid.$el.width(),
					    gh = this.grid.$el.width();
					this.$bgEl.width( 10 * gw );
					this.$bgEl.height( 10 * gh );
					this.$bgEl.css({
						left: -(5 * gw) + 'px',
						top: -(5 * gw) + 'px'
					});

					// MAKE THE BUBBLE BACKGROUND FIT THE SCREEN
					this.$bgEl.find('div').offset({
						left: 0,
						top: 0
					}).width( $(window).width() ).height( $(window).height());

					// APPLY BACKSTRETCH FOR VIGNETTE PNG
					$.backstretch( this.options.settings.baseUrl +  'images/background-gradient.png');

					// ENABLE ROUTES/HISTORY 
					this.router = new Router({
						nmsApp: this
					});

					// USE pushState IF THIS BROWSER SUPPORTS IT ...
					var pushState = !!(window.history && window.history.pushState),
					    // .. IF NOT THEN DEFAULT TO hashchange 
					    hashChange = !pushState;

					// ENABLE HISTORY
					Backbone.history.start({ 
						pushState: pushState,
				       		hashChange: hashChange,
						root: this.options.settings.baseUrl
					});

					// DEBOUNCE RESIZE
					this._debouncedResize = _.debounce(
						$.proxy( this._resize, this),
						500
					);

					this._resize();
				},

				screenRouted: function( toScreenId) {

					// IS THIS THE PRIVACY AND TERMS URL?
					if( toScreenId === 'privacyandterms') {

						// THEN DEFAULT TO THE HOME SCREEN ...
						toScreenId = 'home';

						// ... AND SHOW THE PRIVACY AND TERMS OVERLAY
						this.footer.$el.find('.privacyandterms').click();
					}

					var toScreen = this.screens[toScreenId];

					// SIMULATE A MENU CLICK TO GET THE SAME ANIMATION
					// EFFECTS AS IF THE USER HAD CLICKED THE MENU W/THE MOUSE
					//this.viewport.navMenu.click( toScreen.$menuEl);
					toScreen.menu.select( toScreen, {
						effects: false,
						trigger: false
					});

					// MAKE THE GRID MOVE TO THE NEW SCREEN 
					this.navigate( toScreen);
				},	

				screenSelected: function(ev, toScreen, evSource) {

					if( !toScreen) return;

					// UPDATE THE BROWSER'S URL TO MATCH THE NEW SCREEN
					this.router.navigate( toScreen.fragment, {
						trigger: false
					});

					// DID THE USER HIT A KEYBOARD NAVIGATION KEY?
					if( evSource === 'keyNav') {

						// IF SO THEN SIMULATE A MENU CLICK TO GET THE SAME ANIMATION
						// EFFECTS AS IF THE USER HAD CLICKED THE MENU W/THE MOUSE
						//this.viewport.navMenu.click( toScreen.$menuEl);
						toScreen.menu.select( toScreen, {
							effects: false,
							trigger: false
						});
					}

					// MAKE THE GRID MOVE TO THE NEW SCREEN 
					this.navigate( toScreen);
				},

				screenSelectedById: function( ev, toScreenId) {

					var toScreen = this.screens[toScreenId];
			
					this.screenSelected( ev, toScreen, 'keyNav');
				},

				touchmove: function( ev) {

					// DISABLE TOUCH SCROLLING
					ev.preventDefault();
					ev.stopImmediatePropagation();
				},

				navigate: function( toScreen) {

					if( toScreen.illustrations) { 

						var bgColor = toScreen.illustrations.getBgColor();
						
						// CHANGE BACKGROUND
						this._changeBackground( bgColor); 
						
						// TELL THE NEW SCREEN A TRANSITION IS ABOUT TO BEGIN
						toScreen.illustrations.transitionIntoBegin();
					}

					// TELL THE PREVIOUS SCREEN A TRANSITION IS ABOUT TO BEGIN
					if( this._curScreen && this._curScreen.illustrations) {
					       
						this._curScreen.illustrations.transitionOffBegin();
					}

					this.grid.move( toScreen, $.proxy( this.gridFinishedMoving, this));
				},

				gridFinishedMoving: function( toScreen) {

				        // TELL THE PREVIOUS SCREEN THE TRANSITION IS COMPLETED
					if( this._curScreen && this._curScreen.illustrations) {
					       
						this._curScreen.illustrations.transitionOffComplete();
					}

					this._curScreen = toScreen;

					this.viewport.setScreen( toScreen);

					// TELL THE NEW SCREEN THE TRANSITION IS COMPLETED
					if( toScreen.illustrations) toScreen.illustrations.transitionIntoComplete();
				},

				orientationchange: function( ev) {
				
					this._resize();
					//location.reload();

					//this.orientation = window.orientation;
				},

				resize: function() {

				       //this._debouncedResize();
					this._resize();

				},

				_resize: function(ev) {

					var settings = this.options.settings,
						width = $(window).width(),
						height = $(window).height();

					settings.layoutClass = this._addLayoutClass( width);

				
					// MAKE THE BUBBLE BACKGROUND FIT THE SCREEN
					this.$bgEl.find('div').offset({
						left: 0,
						top: 0
					}).width( $(window).width() ).height( $(window).height());

					// RESIZE THE VIEWPORT VIEW
					this.viewport.resize();

					// RESIZE THE GRID VIEW
					this.grid.resize();

					// RESIZE THE FOOTER
					this.footer.resize();

					// RESIZE THE VIGNETTE
					$.backstretch( 
						this.options.settings.baseUrl +
					      	'images/background-gradient.png'
					);

					// TODO: RESIZE THE CURRENT SCREEN
					if( this._curScreen && this._curScreen.illustrations) {

						this._curScreen.illustrations.resize();
					}
				},

				_changeBackground: function( color) {

					// FIXME: FIGURE OUT WHY THE ANIMATION ISN'T WORKING
					var options = {
						duration: 1000
					}

					$('body').animate({
						backgroundColor: color 
					}, options);
				},

				gridMoved: function(ev, pos) {

					// A FEW DOZEN PIXELS PER SCREEN (TODO: MAKE IT CONFIGURABLE IF POSSIBLE)
					var delta = pos.paths < 3 ? 3 : 2,
					    x = 0,
				            y = 0,	
					    prevX = this.prevX === undefined ? 0 : this.prevX,
					    prevY = this.prevY === undefined ? 0 : this.prevY,
					    offset = this.$bgEl.offset();

					if( pos.x < prevX) {
						x = (-1) * delta;
					} else if( pos.x > prevX) {
						x = delta;
					}

					if( pos.y < prevY) {
						y = (-1) * delta;
					} else if( pos.y > prevY) {
						y = delta;
					}

					this.$bgEl.offset({
						left: offset.left + x,
						top: offset.top + y
					});

					this.prevX = pos.x;
					this.prevY = pos.y;
				},

				_addLayoutClass: function( w) {

					var layoutClass = this.layoutClass,
						settings = this.options.settings,
						layoutClasses = settings.layoutClasses;

						// REMOVE THE PREVIOUS LAYOUT CLASS
						if( layoutClass) {

							this.$el.removeClass( layoutClass);
						}

						for( var c in layoutClasses) {

							var limits = layoutClasses[c],
								min = limits['min'],
								max = limits['max'];

							if( w >= min && w <= max) {

								layoutClass = c;
								break;
							}
						}

						if( layoutClass) {
							
							this.$el.addClass( layoutClass);
						}

						// KEEP A REFERENCE TO THE NEW LAYOUT CLASS
						this.layoutClass = layoutClass;

						return layoutClass;
				}
			});

			return NmsApp;
});

