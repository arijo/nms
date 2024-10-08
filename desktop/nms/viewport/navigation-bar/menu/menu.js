define([
	   	'jquery',
		'underscore',
		'backbonejs'],

		function( $, _, Backbone) {

			// MENU VIEW
			var Menu = Backbone.View.extend({

				events: {
					'click': 'click',
					'mouseenter': 'mouseenter',
					'mouseleave': 'mouseleave'
				},

				initialize: function() {

					// MOVE THE TOP MENU ITEM INTO THE DROPDOWN
					// AND USE THE CURRENT ONE AS THE HEADER
					this._setupHeader();

					this.submenuEl = this.$el.find('ul');
					this.$el.css('overflow', 'visible');
					this.submenuEl.removeClass('hidden');
					this.submenuEl.hide();
					this.open = false;

					this.topMeta = this.$el.data('meta');
					this.curMeta = null;

					/*this._setHeaderDebounced = _.debounce( 
						$.proxy( this.setHeader, this), 350,
					   	true
					);*/
				        this._setHeaderDebounced = this.setHeader;

					// MENU UNLOCKED BY DEFAULT
					this.unlock();

					// MENU SUBITEMS HIDDEN BY DEFAULT
					this.deactivate();

				},

				lock: function() {

					this._locked = true;
				},

				unlock: function() {

					this._locked = false;
				},

				activate: function() {

					//this.unlock();

					this._activated = true;

					this.$el.addClass('current');
				},

				deactivate: function() {

					//this.lock();
					
					this._activated = false;

					this.$el.removeClass('current');

					this._setHeaderDebounced( this.topMeta.title);

					this._dehighlight( this.curMeta);

					this.hide();

					this.curMeta = null;
				},

				select: function( meta, options) {

					var prevMeta = this.curMeta;

					this.curMeta = meta;

					if( !options || options.effects) {

						this.open ? this.hide() : this.show();
					} else {
			
						if( this.open) this.hide();
					}

					this.setHeader( this.curMeta.title);
					
					this._highlight( this.curMeta, prevMeta);

					this.options.listenerEl.trigger('select', [meta, options]);
				},

				setHeader: function( text) {

						var titleEl = this.$el.find('a:first'),
						    curText = titleEl.text(),
							newText = text;

						if( newText !== curText) {

							titleEl.text( newText);
						}
				},

				click: function( ev) {

					if( !this.locked) {

						var el = $(ev.target).closest('li'),
							isHeader = el && el.hasClass('header'),
							meta = el.data('meta'),
							curMeta = this.curMeta;

						if( !isHeader || !curMeta) {

							if( meta && meta !== curMeta) {

								this.select( meta);
							}
						}
					}
				},

				mouseenter: function( ev) {


					if( this._activated && !this._locked) {

						this.show();
					}
				},

				mouseleave: function( ev) {


					if( this._activated && !this._locked) {

						this.hide();
					}
				},

				show: function() {

					if( this.submenuEl.size()) {

						this.submenuEl.stop(true, true).fadeIn();
						this.open = true;
					}
				},

				hide: function() {

					if( this.submenuEl.size()) {

						this.submenuEl.stop(true, true).fadeOut();
						this.open = false;
					}
				},

				_setupHeader: function() {

					var menuEl = this.$el, 
						meta = menuEl.data('meta'),
						newEl = $('<li><a href="javascript:void(0);">' + meta.title + '</a></li>');

					newEl.addClass('row_' + meta.row + ' col_' + meta.col);
					newEl.data('meta', meta);

					menuEl.find('ul.dropdown').prepend( newEl);
					menuEl.addClass( 'header');
					
					meta.$proxyMenuEl = newEl;
				},

				_highlight: function( cur, prev) {

						var curEl = cur && ( cur.$proxyMenuEl || cur.$menuEl),
							prevEl = prev && ( prev.$proxyMenuEl || prev.$menuEl);

						if( prevEl) {

							prevEl.removeClass('selected');
						}

						if( curEl) {

							curEl.addClass('selected');
						}
				},

				_dehighlight: function( cur) {

						var curEl = cur && ( cur.$proxyMenuEl || cur.$menuEl);

						if( curEl) {

							curEl.removeClass('selected');
						}
				}
			});

			return Menu;
		}

);
