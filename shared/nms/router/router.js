define([
	'jquery',
	'underscore',
	'backbonejs' ],
       
	function( $, _, Backbone ) {

		// NAVIGATION ROUTER
		var Router = Backbone.Router.extend({

			routes: {
				'': 'home',
				'index.html': 'home',
				':topmenu': 'topmenuRouted',
				':topmenu/:submenu': 'submenuRouted'
			},

			initialize: function( options) {

				this.nmsApp = options.nmsApp;
			},

			home: function() {

				this.nmsApp.screenRouted( 'home');
			},

			topmenuRouted: function( topmenu) {

				this.nmsApp.screenRouted( topmenu);
			},

			submenuRouted: function( topmenu, submenu) { 

				var id = topmenu + '_' + submenu;
				this.nmsApp.screenRouted( id);
			}
		});

		return Router;
});
