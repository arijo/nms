define([
	'jquery',
	'underscore' ],
       
	function( $, _ ) {

		var Random = {
			
			between: function( min, max) {

				return Math.floor( Math.random() * (max - min + 1) + min);
			}
		}

		return Random;
});
