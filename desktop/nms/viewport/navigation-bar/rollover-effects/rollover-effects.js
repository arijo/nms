define([
	   	'jquery',
		'underscore',
		'backbonejs'],

		function( $, _, Backbone) {

			// NAVIGATION BAR EFFECTS VIEW
			var RolloverEffects = Backbone.View.extend({

					initialize: function() {

						// NAB BAR BACKGROUND FADE OUT BY DEFAULT
						this.$el.fadeOut();

						this.fadein = false;

						this.unlock();
					},

					lock: function() {

						this._locked = true;
					},

					unlock: function() {

						this._locked = false;
					},

					mouseenter: function( ev) {
						
						if( !this._locked) {

							this.fade();
						}
						this.fadein = true;
					},

					mouseleave: function( ev) {

						if( !this._locked) {

							this.fade();
						}
						this.fadein = false;
					},

					fade: function() {

						if( !this.fadein) {

							this.$el.stop(true, true).fadeIn();

						} else {

							this.$el.stop(true, true).fadeOut();
						}
					}
			});

			return RolloverEffects;
		}
);
