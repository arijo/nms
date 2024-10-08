define([
	'jquery',
	'underscore',
	'backbonejs',

	'libs/key'],
       
	function( $, _, Backbone ) {

			// KEYBOARD NAVIGATION VIEW
			var KeyboardNavigation = Backbone.View.extend({

				initialize: function() {

					this._screens = this.options.screens;

					$(document).bind( 'keyup', $.proxy( this.keyup, this));
					$(document).bind( 'keypress', $.proxy( this.keypress, this));

					// KEYBOARD NAVIGATION UNLOCKED BY DEFAULT
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

				keypress: function( ev) {
					
					// STOP THE DEFAULT DOCUMENT JUMP 
					if( ev.currentTarget == this.$el[0]) ev.preventDefault();
				},

				keyup: function(ev) {

					// IGNORE USER INPUT IF THE KEYBOARD NAVIGATION IS LOCKED
					if( this._locked) return;

					var toScreen = this._getNextScreen( ev.keyName());

					this.$el.trigger('keyNavSelect', toScreen);
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

			return KeyboardNavigation;
});
