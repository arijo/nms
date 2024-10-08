define([
	'jquery',
	'underscore',
	'backbonejs',

	'shared/nmsui/modal/modal',

	'text!shared/nmsui/popup/popup.tmpl'],
       
	function( $, _, Backbone, Modal, tmpl) {

		var NmsUiPopup = Backbone.View.extend({

			defaults: {
				width: 300,
				height: 150
			},

			events: {
				'modalclick': 'hide'
			},

			initialize: function() {

				// SETUP THE MODAL WINDOW
				this.modal = new Modal({
					listenerEl: this.$el,
					//contentHtml: this.options.html,
					contentHtml: _.template( tmpl, { src: this.options.src }), 
					contentClass: this.options.contentClass || 'content',
					contentWidth: this.options.width || this.defaults.width,
					contentHeight: this.options.height || this.defaults.height,
					settings: this.options.settings
				});

				if( this.options.hasOwnProperty( 'html')) {

					this.modal.$el.find('.body').html( this.options.html);
				}

				// LISTEN TO THE CLOSE BUTTON
				this.modal.$el.find('.close').bind(
					'click', $.proxy( this.hide, this)
				);
			},

			show: function() {

				if( !this.modal.open) {

					this.modal.show();

					this.resize();
				}
			},

			hide: function() {

				if( this.modal.open) {

					this.modal.hide();

					this.options.listenerEl.trigger('popupclose');
				}
			},

			resize: function() {

				if( this.modal.open) {

					this.modal.resize();

					// RESIZE THE POPUP INFO EL TO FIT THE AVAILABLE SPACE
					var modalEl = this.modal.$el, 
						contentEl = modalEl.find('.content'), 
						topEl = contentEl.find('.header'),
						bodyEl = contentEl.find('.body'),
						ch = contentEl.height(),
						th = topEl.outerHeight(),
						ih = ch - th;

					bodyEl.height( ih);
				}
			}
		});

		return NmsUiPopup;
});
