var getWidth = function() {

	var w = 0;

	if( window.innerWidth) {
		
		w = window.innerWidth;
	} else if( document.documentElement && document.documentElement.clientWidth) {

		w = document.documentElement.clientWidth;
	} else if( document.body) {

		w = document.body.clientWidth;
	}

	return w;
}

var getHeight = function() {

	var h = 0;

	if( window.innerHeight) {
		
		h = window.innerHeight;
	} else if( document.documentElement && document.documentElement.clientHeight) {

		h = document.documentElement.clientHeight;
	} else if( document.body) {

		h = document.body.clientHeight;
	}

	return h;
}

var width = getWidth(),
    height = getHeight();
	homeEl = document.getElementById('home');
	homeVideoEl = document.getElementById('home-video');

if( homeEl && homeVideoEl) {

	if( width > 0) { 

		homeEl.style.width = width + 'px';
		homeVideoEl.style.width = width*2.6 + 'px';
	}

	/*if( height > 0) {

	   	homeEl.style.height = height + 'px';
		homeVideoEl.style.height = height + 'px';
	}*/
}

// NMS APPLICATION SETTINGS 
// ( INTENTIONALLY GLOBAL SO WE CAN ACCESS SETTINGS 
//   LIKE baseUrl EVERYWHERE IN THE NMS APPLICATION )
NMS = {};
NMS.SETTINGS = {
	baseUrl: '/',
	desktop: true
};

require.config({	
	waitSeconds: 30,
	baseUrl: NMS.SETTINGS.baseUrl,
	paths: {		
		text: 'libs/requirejs/plugins/text',
		raphael: 'libs/raphael/raphael-min',
		//raphael: 'libs/raphael/raphael',
		jquery: 'libs/jquery-1.7.1.min',
		//jquery: 'libs/jquery',
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
	'require',
	'jquery', 
	'underscore', 
	'backbonejs',
	'desktop/nms/nms'

], function( require, $, _, Backbone, NmsApp ){

	// BOOTSTRAP THE NMS APPLICATION
	var settings = NMS.SETTINGS;

	settings.layoutClasses = { 
	   			'from0to479': {
					'min': 0,
					'max': 479
				},
				'from480to639': {
					'min': 480,
					'max': 639
				},
				'from640to767': {
					'min': 640,
					'max': 767
				},
				'from768to979': {
					'min': 768,
					'max': 979
				},
				'from980to1199': {
					'min': 980,
					'max': 1199
				},
				'from1200to1899': {
					'min': 1200,
					'max': 1899
				},
				'from1900to9999': {
					'min': 1900,
					'max': 9999
				}
			};

	// BOOTSTRAP THE NMS APPLICATION ( DESKTOP VERSION)
	new NmsApp({
		el: $('#nms-app'),
		settings: settings
	});

	return NMS.APP;
});
