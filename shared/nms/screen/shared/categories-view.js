define([
	'jquery',
	'underscore',
	'backbonejs' ],
       
	function( $, _, Backbone ) {

		var CategoriesView = Backbone.View.extend({

			events: {
				'click .category':'selected'
			},

			selected: function( ev) {

				var categoryEl = $(ev.currentTarget).closest('.category'),
				    src = categoryEl.attr('data-src'),
				    selector = categoryEl.attr('data-selector');

				if( src && selector) {

					this.$el.trigger('category', {
						src: src,
						selector: selector
					});
				}
			}

		});	

		return CategoriesView;
});
