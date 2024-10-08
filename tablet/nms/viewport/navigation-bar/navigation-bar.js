define([
	    'jquery',
	   	'underscore',
	   	'backbonejs',

		'tablet/nms/viewport/navigation-bar/menu/menu'],

		function( $, _, Backbone, Menu) {

				// NAVIGATION BAR VIEW
				var NavigationBar = Backbone.View.extend({

					events: {
						'select': 'select'
					},

					initialize: function() {

						var self = this, 
						    navEl = this.$el.find('nav>ul');

						// KEEP A LIST WHERE A GIVEN SCREEN'S METADATA
						// CAN BE FOUND BY USING ITS NAME AS KEY
						this._screens = {};

						// GET THE NAVIGATION MENU METADATA
						this._parseNavMenu( 
							navEl, 0, 0, this._screens
						);

						// SETUP THE ALL MENU VIEWS
						this._setupAllMenus( this._screens);

						// DEFAULT TO HOME SCREEN MENU
						this.curMenu = this._screens['home'].menu;
						setTimeout( function() {
							self.curMenu.activate();
						}, 13);

						// NAVIGATION BAR BACKGROUND FADEIN BY DEFAULT
						$('#navigation-bar-background').fadeIn();
					},

					setScreen: function( screen) {

					},

					select: function( ev, meta, options) {

						var curMenu = this.curMenu,
						    newMenu = meta.menu;

						// IS THIS SELECTION FROM A DIFFERENT MENU?
						if( curMenu !== newMenu) {

							// IF SO THEN HIDE THE MENU SUBITEMS
							curMenu.deactivate();
							
							// ... AND MAKE THE NEW MENU'S SUBITEMS VIEWABLE
							newMenu.activate();

							// UPDATE THE CURRENT MENU
							this.curMenu = newMenu;
						}
					
						if( !options || options.trigger) {	

							// LET THE NMS APP HANDLE THE SELECTED SCREEN 
							this.$el.trigger('navMenuSelect', meta);
						}
					},

					getMetadata: function() {

						return this._screens;
					},

					_parseNavMenu: function( ulEl, row, col, screens) {

						// KEEP LOOKING IF THERE ARE MORE SUB-LEVELS
						if( ulEl.size()) {

							var self = this, 
							
								fakeRow = 0, 

								liEls = ulEl.children('li');


							liEls.each( function( idx) {

								if(row === 0) {

									fakeRow = row + 1;
									col = col + 1;

								} else if( row === 1) {

									fakeRow = idx + 1 + 1;
									col = col;
								} 

								var liEl = $(this),
								
									// KEEP TRACK OF MENU ITEM METADATA
									meta = self._parseListItem( liEl, fakeRow, col);

								// LIST WHERE SCREEN METADATA CAN BE FOUND BY ID
								screens[meta.id] = meta;

								// ATTACH METADATA TO THE MENU EL
								liEl.data('meta', meta);

								// TAG THE NAVIGATION MENU ELS
								liEl.addClass( 'row_' + fakeRow);
								liEl.addClass( 'col_' + col);

								// MAKE SURE NO NASTY SIDE EFFECTS HAPPEN WHEN CLICKING 
								// THE MENU LI EL, LIKE APPENDING AN '#' TO THE END OF THE URL
								liEl.find('a:first').attr('href', 'javascript:void(0);');

								// KEEP PARSING UNTIL THE BOTTOM OF THE NAVIGATION TREE
								self._parseNavMenu( liEl.find('ul'), fakeRow, col, screens);
							});
						}
					},

					_parseListItem: function( liEl, row, col) {

						var meta = {},
							anchorEl = liEl.children('a'),	
							title = anchorEl.text(),
						    name = anchorEl.attr('href').replace('#',''),
							id = name,
							fragment = '/' + name,
							isSubmenu = row > 1 ? true : false,
							menu;

						if( name === 'home') {

							fragment = '/';
						}

						if( isSubmenu) {

							var topmenuEl = liEl.closest('.row_1'),
								topmenuName = topmenuEl.data('meta').name;
								
							id = topmenuName + '_' + name;
							fragment = '/' + topmenuName + '/' + name;
						}

						return {
							id: id, 
							$menuEl: liEl,
							title: title,
							name: name,
							row: row,
							col: col,
							fragment: fragment
						}
					},

					_setupAllMenus: function( screens) {

						for ( id in screens) {

							var s = screens[id];

							if( s.row === 1) {

								s.menu = new Menu({
									el: s.$menuEl,
									listenerEl: this.$el
								});

							} else {

								s.menu = s.$menuEl.closest('.row_1').data('meta').menu;		
							}
						}
					}
				});

				return NavigationBar;
		}
);
