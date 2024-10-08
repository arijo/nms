define([
	'jquery',
	'underscore',
	'backbonejs',

	'videojs',

	'shared/nmsui/modal/modal',

	'text!shared/nmsui/video-player/video-player.tmpl', 

	'shared/nmsui/video-player/close-button/close-button' ],
       
	function( $, _, Backbone, VideoJs, NmsUiModal, playerTemplate/*, CloseButton*/) {

		var VideoPlayer = Backbone.View.extend({

			defaults: {
				skinClassNames: 'vjs-default-skin',
				width: 300,
				height: 150
			},

			events: {
				'close': 'close',
				'modalclick': 'close'
			},

			initialize: function() {

				// GET THE PLAYER'S HTML TEMPLATE
				var playerHtml = _.template( playerTemplate);

				// SETUP THE MODAL WINDOW
				this.modal = new NmsUiModal({
					listenerEl: this.$el,
					contentHtml: playerHtml,
					contentWidth: this.defaults.width,
					contentHeight: this.defaults.height,
					settings: this.options.settings
				});

				// KEEP A REFERENCE OF THE VIDEO EL
				this.playerEl = this.modal.$el.find('video');	

				// APPLY SKIN STYLES
				this.playerEl.addClass( this.defaults.skinClassNames);

				// VIDEOJS NEEDS THE PARENT EL TO BE VISIBLE WHEN FALLING BACK TO FLASH
				// SO WE MAKE IT VISIBLE BUT SET ITS SIZE TO 1PX AND OVERFLOW HIDDEN SO 
				// THAT THE VIDEO/FLASH OBJECT ELEMENT DOESNT BLEED OFF THE MODAL
				this.modal.$el.css({
					width: '1px',
					height: '1px',
					overflow: 'hidden'
				}).show();

				// SETUP THE VIDEO PLAYER
				//VideoJs.options.flash.swf = this.options.settings.baseUrl + 'libs/videojs/player-js.swf';
				VideoJs.options.components['closeButton'] = {};
				this.player = VideoJs(
					this.playerEl[0], {
						controls: true,
						preload: 'auto',
						listenerEl: this.$el,
						width: 300,
						height: 230,
						flash: {
							swf: this.options.settings.baseUrl + 'libs/videojs/video-js.swf'
						}
					}, 
					$.proxy( this.playerReady, this)
				);

				// LOAD THE VIDEOS
				this.player.src( this.options.sources );

				// RESIZE THE PLAYER
				this.resize();
			},

			playerReady: function() {

			
			},

			play: function() {

				var options = this.options,
				    listenerEl = options && options.listenerEl;

				if( !this.player.isReady) return;

				this.modal.show();

				// UPDATE WIDTH AND HEIGHT IN CASE THE WINDOW HAS BEEN RESIZED
				this.resize();

				this.player.play();

				if( listenerEl) {
					
					listenerEl.trigger('playstart');
				}
			},

			close: function() {

				var options = this.options,
				    listenerEl = options && options.listenerEl;

				if( this.player.isReady) {

					this.player.pause();

					if( listenerEl) {
					       
						listenerEl.trigger('playstop');
					}
				}

				this.modal.hide();
			},

			resize: function() {

				// RESIZE MODAL WINDOW ONLY WHEN ITS OPEN
				if( this.modal.open) {

					// RESIZE MODAL THEN ...
					this.modal.resize();

					// ... MAKE THE PLAYER FIT MODAL'S CONTENT EL
					var contentEl = this.modal.$el.find('.content:first'),
						cw = contentEl.width(),
						ch = contentEl.height();

					this.player.size( cw, ch);
				}
			}
		});	

		return VideoPlayer;
});
