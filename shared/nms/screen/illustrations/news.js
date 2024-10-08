define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random',

	'shared/nmsui/popup/popup',
	'shared/nmsui/scrollable/scrollable',

	'shared/nms/screen/shared/svg-image',
	//'shared/nms/screen/shared/scalable-image',
	'shared/nms/screen/shared/bubbles',

	'shared/nms/screen/shared/articles-view',
	'shared/nms/screen/shared/categories-view' ],
       
	function( $, _, Backbone, Raphael, 

		  Random,

		  Popup,
		  Scrollable,

		  //ScalableImage,
		  SvgImage,
		  Bubbles,
	       
		  ArticlesView,
		  CategoriesView	) {

			// CONTACT US ILLUSTRATION VIEW
			var NewsIllustrations = Backbone.View.extend({

				events: {
					'article .leftcol': 'articleSelected',
					'category .rightcol': 'categorySelected',
					'popupclose': 'popupclose'
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

					// DEFAULT CATEGORY IS JAN 2012 
					this.curCategoryId = 1; 

					// SETUP THE SCROLLABLE WIDGET
					this.scrollable = new Scrollable({
						el: this.$el.find('.content .leftcol'),
						settings: this.options.settings
					});

					// SETUP THE ARTICLES VIEW
					this.articlesView = new ArticlesView({
						el: this.$el.find('.content .leftcol'),
						settings: this.options.settings
					});

					// SETUP THE CATEGORIES VIEW
					this.categoriesView = new CategoriesView({
						el: this.$el.find('.content .rightcol'),
						settings: this.options.settings
					});

					// SETUP THE POPUP
					this.popup = new Popup({
						html: '<h1>SRCOLLABLE POPUP</h1>',
						listenerEl: this.$el,
						width: 300, 
						height: 230,
						contentClass: 'news content',
						settings: this.options.settings			    
					});	

					// SETUP THE POPUP SCROLLABLE
					this.popupScrollable = new Scrollable({
						el: this.popup.modal.$el.find('.body'),
						settings: this.options.settings
					});

					this._getIndex( 
						'pages/aboutus/news/recent.html', 
						'.news .index'
					);
				},

				articleSelected: function( ev, params) {

					/*var content = this._getArticleById( articleId);

					this.popupScrollable.setContent( content);

					this.popup.show();*/

				       this._getContents( 
						 params.src,
						 params.selector
					);

				},

				categorySelected: function( ev, params) {

					this._getIndex( 
						params.src,
						params.selector
					);

					//this._activateCategoryById( categoryId);

					//this.popup.show();
				},


				popupclose: function( ev) {
				
					this.popup.hide();
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
					this.bgImage = new SvgImage({
						image: image,
						layout: layout,
						drawingDefaults: drawingDefaults
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

				/*_getArticleById: function( id) {

					var articleEl = this.$el.find('.category-' + this.curCategoryId + ' .article-'+id),
				            header = articleEl.find('.title').html(),	
					    content = articleEl.find('.fullcontent').html();	

					return '<div class="title">' + header + '</div>'
					+ '<div class="fullcontent">' + content + '</div>';
				},

				_activateCategoryById: function( id) {

					var categoryEl = this.$el.find('.leftcol .category-'+id),
					    curCategoryEl = this.$el.find('.leftcol .category-'+this.curCategoryId);

					if( id === this.curCategoryId) return;

					// HIDE PREVIOUS CATEGORY ARTICLES
					curCategoryEl.addClass('hidden');

					// SHOW THE NEW CATEGORY ARTICLES
				  	categoryEl.removeClass('hidden');

					// SET THE NEW CURRENT CATEGORY
					this.curCategoryId = id;	
				}*/

				_getIndex: function( src, selector) {
				
					var src = src,
					    iframeEl = $('<iframe><\/iframe>'),
					    html, 
					    self = this;

					iframeEl.bind('load', function() {

						html = $(this).contents().find( selector).html();

						self.scrollable.setContent( html);

						iframeEl.remove();
					});

					iframeEl.attr('src', this.options.settings.baseUrl + src);

					$('head')[0].appendChild( iframeEl[0]);
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

			return NewsIllustrations;
});
