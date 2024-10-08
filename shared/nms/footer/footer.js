define([
	'jquery',
	'underscore',
	'backbonejs', 

	'shared/nmsui/popup/popup',
	'shared/nmsui/scrollable/scrollable'],
       
	function( $, _, Backbone,
		
		  Popup,
	          Scrollable	) {

			// FOOTER VIEW
			var Footer = Backbone.View.extend({

				events: {
					'click .privacyandterms': 'popupopen',
					'popupclose': 'popupclose'
				},

				initialize: function() {
				
					// SETUP POPUP WIDGET
					this.popup = new Popup({
						html: '<h1>SRCOLLABLE POPUP</h1>',
						listenerEl: this.$el,
						width: 300, 
						height: 230,
						contentClass: 'privacyandterms content',
						settings: this.options.settings			    
					});	

					// SETUP THE POPUP SCROLLABLE
					this.popupScrollable = new Scrollable({
						el: this.popup.modal.$el.find('.body'),
						settings: this.options.settings
					});
				},

				popupopen: function( ev) {

				       this._getContents( 
						 'pages/privacyandterms/popup.html',
						 'body'
					);
				},

				popupclose: function() {
				
				
				},

				resize: function() {
				
					this.popup.resize();	
				},

				_getContents: function( src, selector) {

					var src = src,
					    iframeEl = $('<iframe><\/iframe>'),
					    html, 
					    self = this;

					iframeEl.bind('load', function() {

						html = $(this).contents().find( selector).html();

						self.popupScrollable.setContent( html);

						self.popup.show();

						iframeEl.remove();
					});

					iframeEl.attr('src', this.options.settings.baseUrl + src);

					$('head')[0].appendChild( iframeEl[0]);
				}
			});

			return Footer;
});
