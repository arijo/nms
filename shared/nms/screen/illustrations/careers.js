define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random',

	'shared/nmsui/popup/popup',
	'shared/nmsui/scrollable/scrollable',

	'shared/nms/screen/shared/scalable-image',
	'shared/nms/screen/shared/bubbles',

	'shared/nms/screen/shared/articles-view'],
       
	function( $, _, Backbone, Raphael, 

		  Random,

		  Popup,
		  Scrollable,

		  ScalableImage,
		  Bubbles,
	       
		  ArticlesView	) {

			// CONTACT US ILLUSTRATION VIEW
			var CareersIllustrations = Backbone.View.extend({

				events: {
					'article .leftcol': 'articleSelected'
				},

				initialize: function() {

					this.layoutDefaults = $.extend( 
						this.options.params.layoutDefaults || {},
						this.layoutDefaults || {}
					);

					this.colorDefaults = $.extend( 
						this.options.params.colorDefaults || {},
						this.colorDefaults || {}
					);

					this.drawingDefaults = $.extend( 
						this.options.params.drawingDefaults || {},
						this.drawingDefaults || {}
					);

					this.image = $.extend( 
						this.options.params.image || {},
						this.image || {}
					);

					// SETUP THE ARTICLES VIEW
					this.articlesView = new ArticlesView({
						el: this.$el.find('.content .leftcol'),
						settings: this.options.settings
					});

					// SETUP THE POPUP
					this.popup = new Popup({
						html: '<h1>SRCOLLABLE POPUP</h1>',
						listenerEl: this.$el,
						width: 300, 
						height: 230,
						contentClass: 'careers content',
						settings: this.options.settings			    
					});	

					// SETUP THE POPUP SCROLLABLE
					this.popupScrollable = new Scrollable({
						el: this.popup.modal.$el.find('.body'),
						settings: this.options.settings
					});

					// Set up the location categories -- TEMPORARY CODE
					this.$el.find('.leftcol .location').click(function(){
						$(this).toggleClass('open');
						$(this).find('.entries').slideToggle();
						//console.log(this);
					});
					this.$el.find('.leftcol .location .entries').hide();
				},

				articleSelected: function( ev, articleId) {

					/*var src = this._getArticleById( articleId);

					this.popupScrollable.setContent( 
						'<iframe src="' + this.options.settings.baseUrl + src + '" scrolling="no"/>'
					);

					this.popup.show();*/

					var src = this._getArticleById( articleId),
					    iframeEl = $('<iframe><\/iframe>'),
					    html, 
					    self = this;

					iframeEl.bind('load', function() {

						html = $(this).contents().find('.article').html();

						self.popupScrollable.setContent( html);

						self.popup.show();

						iframeEl.remove();
					});

					iframeEl.attr('src', this.options.settings.baseUrl + src);

					$('head')[0].appendChild( iframeEl[0]);
				},

				transitionIntoBegin: function() {

					this.start();

					this.bubbles.start();
				},

				transitionIntoComplete: function() {

					//this.bubbles.start();

					this._animateTextContent();
				},

				transitionOffBegin: function() {


				},

				transitionOffComplete: function() {

					this.stop();
				},

				start: function() {

				        var layout = this.layoutDefaults,
					    colors = this.colorDefaults,
					    drawingDefaults = this.drawingDefaults,
					    image = this.image;

					layout.width = $(window).width();	
					layout.height = $(window).height();

					layout.paper = Raphael(
						$(layout.selector)[0],
						layout.width,
						layout.height
					);

					// DRAW THE BACKGROUND IMAGE
					this.bgImage = new ScalableImage({
						image: image,
						layout: layout,
						drawingDefaults: drawingDefaults
					});

					this.scrollable = new Scrollable({
						el: this.$el.find('.content .leftcol'),
						settings: this.options.settings
					});

					// MAKE SURE THE SCROLLABLE WIDGET FITS THE SCREEN	
					var headlineEl = this.$el.find('.headline'),
					    scrollableEl = this.$el.find('.scrollable'),
					    headlineOffset = headlineEl.offset(),
					    headlineHeight = headlineEl.outerHeight(),
					    headlineMargin = headlineEl.outerHeight(true) - headlineEl.outerHeight(),
					    screenOffset = this.$el.offset(),
					    bottomMargin = 100,
					    h = screenOffset.top + layout.height - headlineOffset.top - headlineHeight - headlineMargin - bottomMargin;
					scrollableEl.height( h);
			
					// DRAW THE BUBBLES 
					this.bubbles = new Bubbles({
						el: this.$el.find('.bubbles'),
						layout: layout
					});

					// START THE ANIMATION LOOP
					this.clock = setInterval( 
						$.proxy( this.paint, this),
						layout.loopInterval
					);
				},

				paint: function() {

					//this.bubbles.paint();
				},

				stop: function() {

					var layout = this.layoutDefaults;
					clearInterval( this.clock);
					layout.paper.clear();

					//this.bubbles.stop();
					this.bubbles = null;
				},

				resize: function() {
					this.stop();
					this.start();

					this.bubbles.start();

					this.popup.resize();
				},

				getBgColor: function() {

					return this.colorDefaults.background;
				},

				_animateTextContent: function() {

				},

				_getArticleById: function( id) {

					var articleEl = this.$el.find(' .article-'+id),
					    src = articleEl.attr('source');

					return src;
				}
			});

			return CareersIllustrations;
});
