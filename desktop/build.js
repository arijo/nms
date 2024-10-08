({
 AppDir: "/var/tmp/nms/desktop",
 baseUrl: ".",
 dir: "../app-build",
 inlineText: true,
 //optimize: "none",
 paths: {		
	text: '../libs/requirejs/plugins/text',
	raphael: '../libs/raphael/raphael-min',
	//raphael: 'libs/raphael/raphael',
	//jquery: '../libs/jquery-1.7.1.min',
	jquery: 'libs/jquery',
	//underscore: '../libs/backbone/underscore-amd.min',
	underscore: 'libs/backbone/underscore-amd',
	//backbonejs: '../libs/backbone/backbone-amd.min',
	backbonejs: 'libs/backbone/backbone-amd',
	//lessjs: 'libs/less/less-1.3.0.min',
	lessjs: '../libs/less/less-1.3.0',
	videojs: 'libs/videojs/video',
	//videojs: '../libs/videojs/video.min',
	shared: '../shared',
	desktop: '../desktop',
	libs: '../libs',
	images: '../images'

 },
 modules: [{
	 name: "main"
 }] 
})
