require.config({	
	baseUrl: '/nms-frontend/',
	paths: {		
		text: 'libs/requirejs/plugins/text',
		raphael: 'libs/raphael/raphael-min',
		//raphael: 'libs/raphael/raphael',
		jquery: 'libs/jquery-1.7.1.min',
		underscore: 'libs/backbone/underscore-amd.min',
		//underscore: 'libs/backbone/underscore-amd',
		backbonejs: 'libs/backbone/backbone-amd.min',
		//backbonejs: 'libs/backbone/backbone-amd',
		//lessjs: 'libs/less/less-1.3.0.min',
		lessjs: 'libs/less/less-1.3.0',
		//videojs: 'libs/videojs/video'
		videojs: 'libs/videojs/video.min'
	}

});

require([
	'jquery', 
	'underscore', 
	'backbonejs',

	'desktop/nms/viewport/navigation-bar/navigation-bar'],
   
	function( $, _, Backbone, NavigationBar){

		new NavigationBar({
			el: $('#navigation-bar'),
			settings: {}
		});

});
