define([
	'jquery',
	'underscore',
	'backbonejs' ],
       
	function( $, _, Backbone ) {

		var Placeholder = Backbone.View.extend({

			defaults: {
				defaultText: 'Enter text here ...'
			},

			events: {
				'focusin':'focusin',
				'focusout':'focusout',
				'click':'click'
			},

			initialize: function() {

				this.defaultText = this.options.defaultText 
					|| this.defaults.defaultText;
				
				this.reset();
			},

			click: function( ev) {

				if( this.$el.val() == this.defaultText) {

					this.clear();
				}
			},

			focusin: function( ev) {


			},

			focusout: function( ev) {

				this.reset();
			},
			
			clear: function() {

				this.$el.val('');

				this.$el.removeClass('placeholder');
			},

			reset: function() {

				if( !this.$el.val()) {

					this.$el.val( this.defaultText);

					this.$el.addClass('placeholder');
				}
			}
		});	

		return Placeholder;
});
