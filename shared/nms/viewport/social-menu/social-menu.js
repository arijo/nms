define([
	'jquery',
	'underscore',
	'backbonejs',


	'shared/nmsui/modal/modal',
	'shared/nmsui/forms/placeholder',

	'text!shared/nms/viewport/social-menu/social-menu.tmpl',

	'libs/form_params'],
       
	function( $, _, Backbone, Modal, Placeholder, tmpl) {

		var SocialMenu = Backbone.View.extend({

			events: {
				'click .email':'emailclick',
				'click .twitter':'twitterclick',
				'click .facebook':'facebookclick',
				'click .google':'googleplusclick'
			},
			
			initialize: function() {

				this.modalEl = $('<div/>');
				
				this.modalEl.addClass('modal');
				this.modalEl.addClass('social-menu');

				this.modalEl.html( tmpl);

				this.modalEl.hide();

				this.modalEl.appendTo( $(document.body));

				// SETUP THE NAME PLACEHOLDER
				new Placeholder({
					el: this.modalEl.find('input[name="name"]'),
					defaultText: 'Name *'
				});

				// SETUP THE COMPANY PLACEHOLDER
				new Placeholder({
					el: this.modalEl.find('input[name="company"]'),
					defaultText: 'Company'
				});

				// SETUP THE EMAIL PLACEHOLDER
				new Placeholder({
					el: this.modalEl.find('input[name="email"]'),
					defaultText: 'Email address *'
				});

				// SETUP THE PHONE PLACEHOLDER
				new Placeholder({
					el: this.modalEl.find('input[name="phone"]'),
					defaultText: 'Telephone number'
				});

				// SETUP THE MESSAGE PLACEHOLDER
				new Placeholder({
					el: this.modalEl.find('textarea'),
					defaultText: 'Message *'
				});

				// HANDLE THE SOCIAL MENU CLOSE EVENT
				this.modalEl.delegate('.close', 'click', 
					$.proxy( this.close, this)
				);
	
				// HANDLE THE EMAIL SUBMISSION EVENT
				this.modalEl.delegate('.button', 'click', 
					$.proxy( this.submit, this)
				);
			},

			emailclick: function( ev, keep) {

				if( this._email && !keep) {
					
					return this.close();
				}

				this._open( ev, 'email');
			},

			submit: function( ev) {

				var form = this.modalEl.find('form').formParams(),
				    errors = this.validate( form)

				// ARE THERE ANY VALIDATION ERRORS?
				if( !errors || errors.length) {
	
					// SHOW THE ERRORS ...
					this.errors( errors);

					// ... AND WAIT FOR THE USER TO CORRECT THEM
					return;
				}

				this._clearErrors();

				this._clearMessage();

				// SEND THE EMAIL DATA TO THE SERVER
				$.ajax({
					url: '/email.php',
					type: 'post',
					dataType: 'json',
					data: form,
					success: $.proxy( this.emailSent, this),
					error: $.proxy( this.errorSendingEmail, this)
				});
			},

			validate: function( form) {

				var errors = [];

				// DO WE HAVE AN USER NAME?
				if( !form || !form.name || form.name == 'Name *') {

					// IF NOT THEN ADD name ERROR
					errors.push('name');
				}
				
				// DO WE HAVE AN EMAIL?
				if( !form || !form.email || form.email == 'Email address *') {

					// IF NOT THEN ADD email ERROR
					errors.push('email');
				}
				
				// TODO: VALIDATE THE PHONE FIELD

				// DO WE HAVE A MESSAGE?
				if( !form || !form.message || form.message == 'Message *') {

					// IF NOT THEN ADD message ERROR
					errors.push('message');
				}

				return errors;
			},

			errors: function( errors) {

				var errorsEl = this.modalEl.find('.errors');

				// CLEAR THE ERRORS BOX
				this._clearErrors();
				
				// CLEAR THE MESSAGE BOX
				this._clearMessage();
				
				// SHOW THE ERRORS 
				errorsEl.text('Please complete all required fields marked with an asterisk (*).');
			},

			_clearErrors: function() {

				this.modalEl.find('.errors').html('');
			},

			_clearMessage: function() {

				this.modalEl.find('.message').html('');
			},

			emailSent: function() {

				var self = this, 
				    msgEl = this.modalEl.find('.message');

				this._clearErrors();

				this._clearMessage();

				msgEl.html('Your message was sent successfully. Thanks!');

				setTimeout( function() {

					self.close();

				}, 2000);
			},

			errorSendingEmail: function( jqXHR, status, error) {

				var self = this, 
				    errorsEl = this.modalEl.find('.errors');

				this._clearErrors();

				this._clearMessage();

				errorsEl.html("Error: your message wasn't sent.");

				setTimeout( function() {

					self.close();

				}, 1500);
			},

			twitterclick: function( ev, keep) {

				if( this._twitter && !keep) {
					
					return this.close();
				}

				this._open( ev, 'twitter');
			},

			facebookclick: function( ev, keep) {

				if( this._facebook && !keep) {
					
					return this.close();
				}

				this._open( ev, 'facebook');
			},

			googleplusclick: function( ev, keep) {

				if( this._googleplus  && !keep) {
					
					return this.close();
				}

				this._open( ev, 'googleplus');
			},

			_open: function( ev,  widgetName) {

				var el, o;

				el = this.getEl( ev),
				o = el.offset();
				o.left = o.left + 20;

				this.modalEl.find('.popup').hide();
				this.modalEl.find('.' + widgetName).show();

				this.modalEl.show();
				this.modalEl.offset( o);	
				this.modalEl.hide();

				this.modalEl.stop( true, true).fadeIn();

				this._email = false;
				this._twitter = false;
				this._facebook = false;
				this._googleplus = false;

				if( widgetName === 'email') this._email = true;
				if( widgetName === 'twitter') this._twitter = true;
				if( widgetName === 'facebook') this._facebook = true;
				if( widgetName === 'googleplus') this._googleplus = true;
			},

			close: function( ev, keep) {

				this._clearErrors();
	
				this._clearMessage();

				//this.modalEl.hide();
				this.modalEl.stop(true, true).fadeOut();

				if( !keep) {

					this._email = false;
					this._twitter = false;
					this._facebook = false;
					this._googleplus = false;
				}
			},

			getEl: function( ev) {
			
				var targetEl = $( ev.target),
				    el = targetEl.closest('.widget');

				return el;
			},

			resize: function() {
			
				this.close( null, true);

				if( this._email) {

					return $('#social-menu .widget.email').trigger('click', {
						keep: true						
					});
				}

				if( this._twitter) {

					return $('#social-menu .widget.twitter').trigger('click',{
						keep: true						
					});
				}

				if( this._facebook) {

					return $('#social-menu .widget.facebook').trigger('click',{
						keep: true						
					});
				}
				
				if( this._googleplus) {

					return $('#social-menu .widget.google').click('click',{
						keep: true						
					});
				}
			}
		});
		
		return SocialMenu;
});
