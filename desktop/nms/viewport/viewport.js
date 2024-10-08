define([
	'jquery',
	'underscore',
	'backbonejs', 

	'desktop/nms/viewport/navigation-bar/navigation-bar',
	'shared/nms/viewport/keyboard-navigation/keyboard-navigation',
	'shared/nms/viewport/social-menu/social-menu' ],
       
	function( $, _, Backbone,
		
		  NavigationBar,
		  KeyboardNavigation,
		  SocialMenu ) {

			// VIEWPORT VIEW
			var Viewport = Backbone.View.extend({

				events: {
					'navMenuSelect #navigation-bar': 'navMenuSelected',
					'keyNavSelect': 'keyNavSelected'
				},

				initialize: function() {

					// SETUP THE NAVIGATION BAR
					this.navMenu = new NavigationBar({
						el: $('#navigation-bar'),
						settings: this.options.settings
					});

					// GET THE NAVIGATION MENU SCREEN METADATA
					this._screens = this.getMetadata();
					
					// SETUP THE KEYBOARD NAVIGATION MENU	
					this.keyNav = new KeyboardNavigation({
						el: this.$el,
						screens: this._screens
					});

					// SETUP THE SOCIAL MENU
					this.socialMenu = new SocialMenu({
						el: $('#social-menu'),
						settings: this.options.settings
					});
					
					// USER INPUT INLOCKED BY DEFAULT
					//this._locked = false;
				},

				navMenuSelected: function(ev, screen) {

					ev.stopImmediatePropagation();

					this.$el.trigger('screen', [screen, 'navMenu']);

				},

				keyNavSelected: function(ev, screen) {

					ev.stopImmediatePropagation();

					this.$el.trigger('screen', [screen, 'keyNav']);
				},

				getMetadata: function() {

					var meta = this._screens;

					if( !this._screens) {

						meta = this.navMenu.getMetadata();
					}

					return meta;
				},

				setScreen: function( screen) {

					this._curScreen = screen;

					this.keyNav.setScreen( screen);
				},

				lock: function() {

					// LOCK NAVIGATION BAR MENU'S INPUT
					this.navMenu.lock();

					// LOCK KEYBOARD NAVIGATION INPUT
					this.keyNav.lock();

					//this._locked = true;
				},

				unlock: function() {

					// UNLOCK NAVIGATION BAR MENU'S INPUT
					this.navMenu.unlock();

					// UNLOCK KEYBOARD NAVIGATION INPUT
					this.keyNav.unlock();

					//this._locked = false;
				},

				resize: function() {

					var w = $(window).width(),
					    h = $(window).height();

					// RESIZE THE VIEWPORT SO IT EXPANDS FULLSCREEN
					this.$el.width( w);
					this.$el.height( h);

					// TELL THE SOCIAL MENU TO RESIZE
					this.socialMenu.resize();
				}
			});

			return Viewport;
});
