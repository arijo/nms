define([
	'jquery',
	'underscore',
	'backbonejs' ],
       
	function( $, _, Backbone ) {

		var ArticlesView = Backbone.View.extend({

			events: {
				'click .article':'selected'
			},

			selected: function( ev) {

				var articleEl = $(ev.currentTarget).closest('.article'),
				    src = articleEl.attr('data-src'),
				    selector = articleEl.attr('data-selector');

				if( src && selector) {

					this.$el.trigger('article', {
						src: src,
						selector: selector		
					});
				}
			}

		});	

		return ArticlesView;
});
