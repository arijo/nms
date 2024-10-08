define([
	'jquery',
	'underscore',
	'backbonejs',

	'libs/jquery.touchSwipe-1.2.6'/*,
	'libs/jquery.event.swipe'*/],

	function( $, _, Backbone ) {

		// SWIPE NAVIGATION VIEW
		var SwipeNavigation = Backbone.View.extend({

			initialize: function() {

				this._screens = this.options.screens;

				$('#nms-app').swipe({
					swipeUp: $.proxy( this.swipeup, this),
					swipeRight: $.proxy( this.swiperight, this),
					swipeDown: $.proxy( this.swipedown, this),
					swipeLeft: $.proxy( this.swipeleft, this),
					threshold: 5
				});

				// SWIPE NAVIGATION UNLOCKED BY DEFAULT
				this._locked = false;
			},

			setScreen: function( screen) {

				this._curScreen = screen;
			},

			lock: function() {

				this._locked = true;
			},

			unlock: function() {

				this._locked = false;
			},

			swipeup: function() {

				// IGNORE USER INPUT IF THE SWIPE NAVIGATION IS LOCKED
				if( this._locked) return;

				var toScreen = this._getNextScreen( 'down');

				this.$el.trigger('swipeNavSelect', toScreen);
			},

			swiperight: function() {

				// IGNORE USER INPUT IF THE SWIPE NAVIGATION IS LOCKED
				if( this._locked) return;

				var toScreen = this._getNextScreen( 'left');

				this.$el.trigger('swipeNavSelect', toScreen);
			},

			swipedown: function() {

				// IGNORE USER INPUT IF THE SWIPE NAVIGATION IS LOCKED
				if( this._locked) return;

				var toScreen = this._getNextScreen( 'up');

				this.$el.trigger('swipeNavSelect', toScreen);
			},

			swipeleft: function() {

				// IGNORE USER INPUT IF THE SWIPE NAVIGATION IS LOCKED
				if( this._locked) return;

				var toScreen = this._getNextScreen( 'right');

				this.$el.trigger('swipeNavSelect', toScreen);
			},

			_getNextScreen: function( direction) {

				var row = this._curScreen ? this._curScreen.row : 1,
				    col = this._curScreen ? this._curScreen.col : 1;

				if( direction === 'up') {

					row = row - 1;
					return this._getScreen( row, col);
				}	

				if( direction === 'right') {

					// ONLY ALLOW HORIZONTAL MOTION AT THE TOP ROW
					if( row > 1) return;

					col = col + 1;
					return this._getScreen( row, col);
				}	

				if( direction === 'down') {

					row = row + 1;
					return this._getScreen( row, col);
				}	

				if( direction === 'left') {

					// ONLY ALLOW HORIZONTAL MOTION AT THE TOP ROW
					if( row > 1) return;

					col = col - 1;
					return this._getScreen( row, col);
				}	
			},

			_getScreen: function( row, col) {

				var screens = this._screens;
				
				for( var s in screens) {

					if( screens[s].row === row && screens[s].col === col) {

						return screens[s];
					}
				}	
			}
		});

		return SwipeNavigation;
});
