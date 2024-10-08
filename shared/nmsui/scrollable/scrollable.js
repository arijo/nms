define([
	'jquery',
	'underscore',
	'backbonejs',

	'text!shared/nmsui/scrollable/scrollable.tmpl',

	'libs/jquery.mousewheel' ],

       
	function( $, _, Backbone, tmpl ) {

		var Scrollable = Backbone.View.extend({

			events: {
				'click .up': 'up',
				'click .down': 'down',
				'mousewheel': 'mousewheel'
			},

			initialize: function() {

			   var buttonsExist = this.$el.find('.buttons').size(),
			       buttons = _.template( tmpl),
			       fixedAreaEl  = $('<div/>'),
			       scrollAreaEl = $('<div/>');

			   // ARE WE ALREADY SETUP?
			   if( buttonsExist) {

				// IF SO THEN DO NOTHING
				return;
			   }

			   // ADD THE scrollable CLASSNAME 
			   this.$el.addClass('scrollable');

			   // ADD A CLASSNAME TO THE FIXEDAREA EL
			   fixedAreaEl.addClass('fixedarea');

			   // ADD A CLASSNAME TO THE SCROLLAREA EL
			   scrollAreaEl.addClass('scrollarea');

			   // GET THE ORIGINAL CONTENT ...
			   var children = this.$el.children();
				
			   // ... APPEND THE SCROLLABLE AREA TO THE FIXEDAREA EL ...
			   scrollAreaEl.appendTo( fixedAreaEl);

			   // ... AND WRAP IT AROUND THE ORIGINAL CONTENT
			   scrollAreaEl.append( children);

			   // APPEND THE FIXEDAREA EL TO THE SCROLLABLE WIDGET ...
			   fixedAreaEl.appendTo( this.$el);

			   // ADD THE SCROLL BUTTONS	
			   this.$el.append( buttons);
			},

			setContent: function( html) {
			

				this.$el.find('.scrollarea').html( html);	
			},

			/*replaceWith: function( html) {

				var el = $(html).addClass('scrollarea');
			
				this.$el.find('.scrollarea').replaceWith( el);

							
			},*/

			up: function( ev) {
		
				this._scroll( 2);
			},

			down: function( ev) {

				this._scroll( -2);
			},

			mousewheel: function( ev, delta, dx, dy) {
			
				this._scroll( dy);
			},

			resize: function() {

			},

			_scroll: function( dy) {

				var	faEl = this.$el.find('.fixedarea'), 
					saEl = this.$el.find('.scrollarea'), 
					cst = faEl.scrollTop(),
					speeder = 10,
					nst = cst - speeder*dy,
					min = 0,
					max = saEl.height();

				// DID WE REACH THE BOTTOM?
				if( nst <= min) {
					
					// THEN PREVENT SCROLLING
					return false;
				}

				// DID WE REACH THE TOP?
				if( nst >= max) {
					
					// THEN PREVENT SCROLLING ALSO
					return false;
				}

				// SCROLL TO THE NEW POSITION
				faEl.scrollTop( nst);
			}
		});

		return Scrollable;
});
