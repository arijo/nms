define([
	'jquery',
	'underscore',
	'backbonejs' ],
       
	function( $, _, Backbone ) {

		var NmsUiModal = Backbone.View.extend({

			globalDefaults: {
				contentHtml: '',
				contentWidth: 300,
				contentHeight: 150,
				contentClass: 'content',
				minLeftMargin: 100,
				minTopMargin: 20	
			},

			// BACKBONE USES THIS ATTRIBUTE TO SET THE MODAL CLASSNAME
			className: 'modal',

			events: {
				'click': 'click'
			},

			initialize: function() {

				this.defaults = {};

				$.extend( 
					this.defaults, 
					this.globalDefaults, 
					this.options || {}
				);

				var contentHtml = this.defaults.contentHtml,
					contentEl = $('<div/>');

				// ADD A DEFAULT CLASS TO THE CONTENT ELEMENT
				contentEl.addClass( this.defaults.contentClass);

				// ADD CONTENT TO THE MODAL WINDOW
				contentEl.html( contentHtml);
				this.$el.html( contentEl);

				// APPEND THE MODAL EL TO THE DOCUMENT BODY
				this.$el.appendTo( $(document.body));

				// MODAL HIDDEN BY DEFAULT
				this.$el.hide();

				this.open = false;
			},

			click: function( ev) {

				if( ev.target === this.$el[0]) {

					this.options.listenerEl.trigger('modalclick');
				}
			},

			show: function() {

				this._resize();
			
				this.$el.show();

				this.open = true;

				this.options.settings.app.$el.trigger('modalopen');
			},

			hide: function() {

				this.$el.hide();

				this.open = false;

				this.options.settings.app.$el.trigger('modalclose');
			},

			resize: function() {

				if( this.open) this.show();
			},

			_resize: function() {

				var ww = $(window).width(),
				 	wh = $(window).height(),

					// ORIGINAL CONTENT WIDTH AND HEIGHT
					ocw = this.defaults.contentWidth,
					och = this.defaults.contentHeight,
					aspectRatio = ocw / och,

					minLeftMargin = this.defaults.minLeftMargin,
					minTopMargin = this.defaults.minTopMargin,

					// CURRENT CONTENT WIDTH AND HEIGHT
					contentEl = this.$el.find('.content:first'),
					cw = contentEl.width() || ocw,
					ch = contentEl.height() || och,

					// CALCULATE THE ASPECT RATIO
					scale = ( ww - minLeftMargin*2) / cw,

					// CALCULATE THE CONTENT'S NEW WIDTH AND HEIGHT
					ncw = Math.floor( cw * scale),
					nch = Math.floor( ncw / aspectRatio),

					// THE CONTENT'S NEW CENTER POSITION
					left = 0,
					top = 0;

				// DOES HEIGHT FIT ON THE SCREEN? 
				if( nch > wh - minTopMargin) {

					// IF NOT THEN MAKE IT FIT ...
					nch = Math.floor( wh - 2*minTopMargin);

					// ... AND ADJUST WIDTH TO KEEP ASPECT RATIO
					ncw = Math.floor( nch * aspectRatio); 
				}

				this.$el.hide();

				// FIRST RESIZE THE MODAL WINDOW ...
				this.$el.css({
				  	width: ww + 'px', 
					height: wh + 'px'
				});
			
				// ... CALCULATE THE NEW CENTER POSITION ...
				left = Math.floor( ww/2 - ncw/2);
				top = Math.floor( wh/2 - nch/2);

				// ... THEN POSITION THE CONTENT EL THERE ...
				contentEl.css({
					left: left + 'px',
					top: top + 'px'
				})

				// ... SCALE IT ( KEEPING THE ASPECT RATIO)...
				contentEl.css({
				  	width: ncw + 'px', 
					height: nch + 'px'
				});

				this.$el.show();
			}
		});	

		return NmsUiModal;
});
