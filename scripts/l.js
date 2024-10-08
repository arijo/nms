var less = require('less'),
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    util = require('util');


if( process.argv.length < 3) {

	console.log('USAGE: l.js <PATH_TO_LESS_FILE>');
	process.exit(0);
}


var args = process.argv, 
    lessPath = args[2],
    cssPath = lessPath.replace(/\.less/,'.css'),
    compile = function() {

	fs.readFile(lessPath, 'utf8', function(err, str){

		if (err) { 

		  return console.log( util.inspect(err));
		}

		//console.log( str);

		var parser = new less.Parser({
		    paths: [path.dirname(lessPath)],
		    filename: lessPath,
		    optimization: 0 
		});

		parser.parse(str, function(err, tree) {

		    var css = tree.toCSS({
			compress: true 
		    });

		    //console.log( css);
		    fs.writeFile(cssPath, css, 'utf8', function(){});
		});

        });
};


compile();
