define([
	'jquery',
	'underscore',
	'backbonejs', 

	'tablet/nms/viewport/navigation-bar/navigation-bar',
	'tablet/nms/viewport/swipe-navigation/swipe-navigation',
	'shared/nms/viewport/social-menu/social-menu' ],
       
	function( $, _, Backbone,
		
		  NavigationBar,
		  SwipeNavigation,
		  SocialMenu ) {

			// VIEWPORT VIEW
			var Viewport = Backbone.View.extend({

				events: {
					'navMenuSelect #navigation-bar': 'navMenuSelected',
					'swipeNavSelect': 'swipeNavSelected'/*,
					'touchmove': 'touchmove'*/
				},

				initialize: function() {

					// SETUP THE NAVIGATION MENU	
					this.navMenu = new NavigationBar({
						el: $('#navigation-bar'),
						settings: this.options.settings
					});

					// GET THE NAVIGATION MENU SCREEN METADATA
					this._screens = this.getMetadata();
					
					// SETUP THE KEYBOARD NAVIGATION MENU	
					this.swipeNav = new SwipeNavigation({
						el: this.$el,
						screens: this._screens
					});

					// SETUP THE SOCIAL MENU
					this.socialMenu = new SocialMenu({
						el: $('#social-menu'),
						settings: this.options.settings
					});
				},

				navMenuSelected: function(ev, screen) {

					ev.stopImmediatePropagation();

					this.$el.trigger('screen', [screen, 'navMenu']);

				},

				swipeNavSelected: function(ev, screen) {

					ev.stopImmediatePropagation();

					this.$el.trigger('screen', [screen, 'keyNav']);
				},

				/*touchmove: function( ev) {

					ev.preventDefault();

					ev.stopImmediatePropagation();
				},*/

				getMetadata: function() {

					var meta = this._screens;

					if( !this._screens) {

						meta = this.navMenu.getMetadata();
					}

					return meta;
				},

				setScreen: function( screen) {

					this._curScreen = screen;

					this.navMenu.setScreen( screen);

					this.swipeNav.setScreen( screen);
				},

				resize: function() {

					var w = $(window).width(),
					    h = $(window).height();

					// RESIZE THE VIEWPORT SO IT EXPANDS FULLSCREEN
					this.$el.width( w);
					this.$el.height( h);
				}
			});

			return Viewport;
});
