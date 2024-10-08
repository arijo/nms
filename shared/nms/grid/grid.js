define([
	'jquery',
	'underscore',
	'backbonejs' ],

	function( $, _, Backbone){

		// GRID VIEW
		var Grid = Backbone.View.extend({

			defaults: {
				easing: 'easeOutQuad',
				screenTransitionTime: 500
			},

			initialize: function() {

				// CACHE A REFERENCE TO ALL COLUMN ELS
				this.columnEls = this.$el.find('.column'); 

				// CACHE A REFERENCE TO ALL SCREEN ELS ...
				this.screenEls = this.$el.find('.screen');
				// ... AND THEIR CONTENT ELS
				this.contentEls = this.screenEls.find('.content');
				
				this.columnCount = this._getColumnCount();
				this.maxRowCount = this._getMaxRowCount();

				// GET THE GRID/COLUMNS/SCREENS WIDTH/HEIGHT RIGHT
				this.resize();

				// GET GRID METADATA AND ATTACH IT TO SCREEN ELS
				this._getAndAttachGridMetadata();

				// MAKE SURE HOME IS THE CURRENT SCREEN
				this.$el.find('.current').removeClass('current');
				this.$el.find('.home').addClass('current');
				this.$curScreenEl = this.$el.find('.home');

				this.x = 0;
				this.y = 0;
			},

			move: function( toScreen, callback) {

				var path = [];

				// THERE MUST BE A SCREEN TO MOVE TO
				if( !toScreen) return;

				// MAKE SURE THE SCREEN EXISTS
				if( toScreen.$screenEl && toScreen.$screenEl.size()) {

					// CALCULATE PATH TO THE SELECTED SCREEN
					path = this._calculatePath( toScreen);
		
					var motionCompleted = function() {

						// DE-SELECT THE PREVIOUS SCREEN ...
						this.$el.find('.current').removeClass('current');

						// ... AND KEEP TRACK OF THE NEW SCREEN ...
						toScreen.$screenEl.addClass('current');
						this.$curScreenEl = toScreen.$screenEl;

						if( callback) callback( toScreen);
					}

					// EXECUTE MOVEMENT
					this._moveAlong( path, $.proxy( motionCompleted, this));
				}
			},

			_calculatePath: function( toScreen) {
					
				var gridPos,
			       	    toScreenPos, 
				    curScreenEl = this.$el.find('.current'),
				    //curScreen = this._getMeta( curScreenEl),
				    curScreen = curScreenEl.data('meta'),
				    path = [];
	
				// GET THE CURRENT GRID POSITION
				gridPos = this.$el.offset();

				// GET THE SCREEN POSITION
				toScreenPos = toScreen.$screenEl.offset();

				// SCREEN MARGIN ADJUSTMENT
				//toScreenLeftMargin = parseInt( toScreen.$screenEl.css('margin-left'), 10);
				//toScreenTopMargin = parseInt( toScreen.$screenEl.css('margin-top'), 10);
				toScreenLeftMargin = 0;
				toScreenTopMargin = 0;

				// BUILD PATH #1: BOTH GRID AND SCREEN AT THE TOP ROW
				if( toScreen.row === 1 && curScreen.row === 1) {

					// MOVE GRID HORIZONTALLY TO THE NEW SCREEN
					path.push({
					       	x: toScreenPos.left - toScreenLeftMargin,
				       		duration: this.defaults.screenTransitionTime
					});

					return path;
				}
				
				// BUILD PATH #2: BOTH GRID AND SCREEN ON THE SAME COLUMN
				if( toScreen.col === curScreen.col) {

					// MOVE GRID VERTICALLY TO THE NEW SCREEN
					path.push({ 
						y: toScreenPos.top - toScreenTopMargin,
						duration: this.defaults.screenTransitionTime
				       	});

					return path;
				}
				
				// BUILD PATH #3: GRID AND SCREEN AT DIFFERENT COLUMNS AND ...
				if( toScreen.col !== curScreen.col) {

					// ... GRID CURRENT POSITION AT A SUBMENU, TARGET SCREEN IS A TOPMENU
					if( curScreen.row > 1 && toScreen.row === 1) {

						// FIRST MOVE VERTICALLY UP TO THE NEW SCREEN'S ROW
						path.push({ 
							y: toScreenPos.top - toScreenTopMargin, 
							//y: gridPos.top - (toScreenPos.top - toScreenTopMargin), 
							duration: this.defaults.screenTransitionTime
						})

						// ... THEN HORIZONTALLY TO THE NEW SCREEN'S COLUMN ...
						path.push({ 
							x: toScreenPos.left - toScreenLeftMargin, 
							duration: this.defaults.screenTransitionTime 
						});

						return path;
					}
				}

				// BUILD PATH #4: GRID AND SCREEN ALSO AT DIFFERENT COLUMNS BUT ...
				if( toScreen.col !== curScreen.col) {

					// ... THIS TIME THE GRID CURRENT POSITION AT A TOPMENU AND TARGET SCREEN IS A SUBMENU
					if( curScreen.row === 1 && toScreen.row > 1) {

						// FIRST MOVE THE GRID HORIZONTALLY TO THE TARGET MENU'S COLUMN ...
						path.push({
							x: toScreenPos.left - toScreenLeftMargin,
							duration: this.defaults.screenTransitionTime
						});

						// ... THEN MOVE VERTICALLY DOWN TO THE TARGET MENU'S ROW
						path.push({
							y: - gridPos.top + (toScreenPos.top - toScreenTopMargin),
							duration: this.defaults.screenTransitionTime
						});

						return path;
					}
				}
			},

			_moveAlong: function( path, callback) {

				var p1 = path[0],
				    p2 = path[1];
				
				if( p2) {
				
					this.$el.bind(
						'webkitTransitionEnd',
					 	$.proxy( function( ev) {
							if( p2 && p2.x) {

								this.x = this.x - p2.x;
								this.$el.css({
									left: this.x + 'px'
								});
								
								callback();

								this.$el.unbind('webkitTransitionEnd');
							}
						}, this)
					);
				}

				if( p1 && p1.x) {
					
					this.x = this.x - p1.x;
					this.$el.css({
						left: this.x + 'px'
					});
				}

				if( p1 && p1.y) {

					this.y = this.y - p1.y;
					this.$el.css({
						top: this.y + 'px'
					});
				}

				/*var position = {
					x: this.x,
					y: this.y,
					path: 1,
					duration: 400,
					//time: time,
					paths: 1
				}	
				this.$el.trigger('move', position);*/

				if( !p2) {
			
					callback();			
				}


				/*var time = 0;
		
				if( path) {	

					var len = path.length, 
					    options = {
						//duration: this.defaults.screenTransitionTime,
						easing: this.defaults.easing,
						//complete: callback,
						queue: true
					}

					this.$el.stop();

					for(var i=0; i<len; i++) {

						var p = path[i];

						if( p.x !== undefined) {

							// LET OTHER VIEWS KNOW ABOUT THE GRID POSITION 
							var step = function(x) {

								time = time + 1;

								var position = {
									x: x,
									y: p.y,
									path: i,
									duration: p.duration,
									time: time,
								        paths: len
								}	
								this.$el.trigger('move', position);

							}

							options.duration = p.duration;
							options.step = $.proxy( step, this);

							// ONLY THROW THE COMPLETE CALLBACK ON THE LAST PATH
							if( i === len-1) {

								options.complete = callback;
							}

							this.$el.animate({
								left: '-=' + p.x
							}, options);
						}

						if( p.y !== undefined) {

							// LET OTHER VIEWS KNOW ABOUT THE GRID POSITION 
							var step = function(y) {

								time = time + 1;

								var position = {
									x: p.x,
									y: y,
									path: i,
									duration: p.duration,
									time: time,
								        paths: len
								}	
								this.$el.trigger('move', position);

							}

							options.duration = p.duration;
							options.step = $.proxy( step, this);

							// ONLY THROW THE COMPLETE CALLBACK ON THE LAST PATH
							if( i === len-1) {

								options.complete = callback;
							}

							this.$el.animate({
								top: '-=' + p.y
							}, options);
						}
					}
				}*/
			},

			resize: function() {

				var columnEls = this.columnEls,
					screenEls = this.screenEls,	
					contentEls = this.contentEls,

					columnCount = this.columnCount,
				    maxRowCount = this.maxRowCount,

					fullscreenWidth = $(window).width(),
				    fullscreenHeight = $(window).height(),

				    w = fullscreenWidth * columnCount,
				    h = fullscreenHeight * maxRowCount;

				// RESIZE THE GRID SO IT EXPANDS ALL SCREENS
				//this.$el.width( w);
				//this.$el.height( h);
				// UPDATE BOTH WIDTH AND HEIGHT AT THE SAME TIME TO SPEED UP RESIZE
				this.$el[0].style.cssText = ';width:' + w + 'px' + ';height:' + h + 'px';

				// HIDE ELS FOR BATCH STYLE UPADTES ON A SINGLE REFLOW
				columnEls.hide(); 
				screenEls.hide(); 

				// EACH COLUMN EXPANDS TO FULL SCREEN
				columnEls.width( fullscreenWidth)
				columnEls.height( h);

				// EACH SCREEN EXAPNDS TO FULL SCREEN ALSO
				// SCREEN MARGIN ADJUSTMENT
				screenLeftMargin = parseInt( screenEls.css('margin-left'), 10);
				screenTopMargin = parseInt( screenEls.css('margin-top'), 10);
				screenEls.width( fullscreenWidth - 2*screenLeftMargin);
				screenEls.height( fullscreenHeight - 2*screenTopMargin);
				
				// SHOW ELS AFTER BATCH STYLE UPDATE
				screenEls.show(); 
				columnEls.show(); 

				// NOTE: ILLUSTRATIONS RESIZES ITSELF ON START
				
				// EXPAND AND CENTER THE SCREEN CONTENT
				var contentWidth = contentEls.width(),
				    contentHeight = contentEls.height(),
				    contentHorizontalMargin = Math.floor( (fullscreenWidth - contentWidth) / 2),
				    contentVerticalMargin = Math.floor( (fullscreenHeight - contentHeight) / 2),
				    navBarOuterHeight = $('#navigation-bar').outerHeight();

				// IS THE CONTENT EL UNDERLAPPING THE NAVIGATION BAR?
				if( contentVerticalMargin < navBarOuterHeight) {

					// IF SO MAKE SURE IT DOESN'T
					contentVerticalMargin = navBarOuterHeight; 
				}

				columnEls.hide(); // HIDE ELS FOR BATCH STYLE UPADTES AND SINGLE REFLOW
				contentEls.css({
					'margin-left': contentHorizontalMargin,
					'margin-top': contentVerticalMargin
				});
				columnEls.show(); // SHOW ELS AFTER BATCH STYLE UPDATE

				// POSTION THE GRID ON THE CURRENT SCREEN
				if( this.$curScreenEl) {
					
					// SCREEN MARGIN ADJUSTMENT
					var el = this.$curScreenEl,
					    cso = el.offset(),
				 	    lm = parseInt( el.css('margin-left'), 10),
					    tm = parseInt( el.css('margin-top'), 10),
					    go = this.$el.offset(),
					    curScreen = el.data('meta');

					this.$el.offset({
						left: go.left - cso.left + lm,
						top: go.top - cso.top + tm
					});

					// TELL THE CURRENT SCREEN TO RESIZE
					//if( curScreen) curScreen.illustrations.resize();
				}
			},

			_getAndAttachGridMetadata: function() {

				var screens = this.options.screens,
				    len = screens.length,
				    screenEl, 
				    s;

				for(var id in screens) {

					meta = screens[id];
					screenEl = this.$el.find('.' + meta.name);	
					meta.$screenEl = screenEl;
					meta.defaultOffset = screenEl.offset();

					// ATTACH METADATA TO SCREEN EL
					screenEl.data('meta', meta);
				}
			},

			_getColumnCount: function() {

				var columnEls = this.$el.find('.column'),
				    count = columnEls.size();

				return count;
			},

			_getMaxRowCount: function() {

				var maxCount = 1,
				    columnEls = this.$el.find('.column'),
				    len = columnEls.length;

				for(var i=0; i<len; i++) {

					var colEl = columnEls[i],
					    rowEls = $(colEl).find('.screen'),
					    count = rowEls.size();

					if(count > maxCount) {

						maxCount = count;
					}
				}

				return maxCount;
			}
		});

		return Grid;
});
