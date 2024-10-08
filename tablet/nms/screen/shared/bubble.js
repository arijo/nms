define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',

	'shared/nms/utils/random'],
       
	function( $, _, Backbone, Raphael, Random ) {

		// BUBBLE ANIMATION VIEW 
		var Bubble = Backbone.View.extend({

			events: {
				// SHOW BUBBLE ACTIVE STATUS ON THE IPAD
				'touchstart': 'touchstart',
				'touchend': 'touchend'
			},
			
			initialize: function() {

				var layout = this.options.layout;

				// GET THE CURRENT STATE 
				this.state = this.$el.data('state');

				// IS THERE AN EXISTING STATE?
				if( !this.state) {

					// IF NOT THEN GENERATE INIIAL POSITION AND SPEED ...
					this.state = this._generateInitialState();

					// ... AND DRAW THE BUBBLE ON THE INITAL POSITION
					/*this.$el.css({
						left: this.state.position.left + 'px',
						top: this.state.position.top + 'px'
					});*/

					// SAVE THE CURRENT STATE
					this.$el.data('state', this.state);
				}

				// IF THERE IS THEN UPDATE THE BUBBLE RELATIVE POSITION TO THE SCREEN
				var state = this.state, 
					randomOffset = Random.between( 35, 36),
					randomSign = Random.between(0, 100) > 50 ? -1 : 1,
					//left = Math.floor( state.position.relative.left * layout.width),
					left = Math.floor( state.position.left * layout.width),
					//top = Math.floor( state.position.relative.top * layout.height);
					top = Math.floor( state.position.top * layout.height);

					if( this.options.stay) {

						randomOffset = 0;
					}

					this.$el.css({
						left: left + 'px',
						top: ( top + randomSign*randomOffset) + 'px'
					});

					this.randomOffset = randomOffset;
					this.randomSign = randomSign;
			},

			touchstart: function( ev) {
			
				this.$el.addClass('hover');
			},

			touchend: function( ev) {

				this.$el.removeClass('hover');
			},

			start: function() {

				var layout = this.options.layout,
					randomOffset = this.randomOffset,
					randomSign = this.randomSign,
					options = {
						duration: 3000,//1500,
						//easing: 'easeInQuad'
						easing: 'swing'
					};

				if( !this.options.stay) {

					this.$el.animate({
						top: '+=' + ( -1 * randomSign*randomOffset)
					}, options);
				}
			},

			stop: function() {

				// STOP ANY PENDING ANIMATION
				this.$el.stop();
			},

			/*paint: function() {
			
				var state = this.state,	

				    // CALCULATE THE DELTA FOR THE NEXT MOVE
				    delta = this._calculateDelta(),

				    // SETUP THE ANIMATION PARAMETERS
				    options = {
					duration: this.options.layout.loopInterval,
					easing: 'swing'
				    };

				// MOVE THE BUBBLE TO THE NEW POSITION
				this.$el.animate({
					left: delta.left.toString(),
					top: delta.top.toString()
				}, options);
			
				// UPDATE THE STATE POSITION
				state.position.left += delta.left.toValue();
				state.position.top += delta.top.toValue();
			},*/

			_generateInitialState: function() {

			    	var layout = this.options.layout,
						layoutClass = layout.layoutClass,
						floatBox = this.options.floatBox,
					    floatSpeed = this.options.floatSpeed,

				    	// FLOAT WHERE? TOP, RIGHT, BOTTOM. LEFT OR INSIDE A VIRTUAL BOX?
						float = floatBox.type,
	
				    	leftLimits = this._getFloatLimits( float, 'left'),
						topLimits = this._getFloatLimits(float, 'top'),

						// GENERATE INITIAL POSITION INSIDE FLOATBOX LIMITS
						//left = Random.between( leftLimits['min'], leftLimits['max']),
						//top = Random.between( topLimits['min'], topLimits['max']),
						//position = this._getFloatBoxPosition( floatBox, layoutClass), 
						//left = position.x,
						//top = position.y,
						left = floatBox.x,
					    top = floatBox.y,	

						// GENERATE INITIAL SPEED
						rate = floatSpeed, 
						leftSign = Random.between(1, 100) > 50 ? 1 : -1,
						topSign = Random.between(1, 100) > 50 ? 1 : -1,

						// UPDATE STATE
						state = {
							position: {
								left: left,
								top: top/*,
								relative: {
									left: left / layout.width,
									top: top / layout.height
								}*/
							},
							speed: {
								rate: rate,
								leftSign: leftSign,
								topSign: topSign	
							}
						};

				    return state;
			},

			_getFloatBoxPosition: function( floatBox, layoutClass) {

				var position,
					positions = floatBox.positions,
					len = positions.length;
					
				for( var i=0; i<len; i++) {

					var p = positions[i];
					if( p.layoutClass === layoutClass) {

						position = {
							x: p.x,
							y: p.y,
							width: p.width,
							height: p.height
						}
						break;
					}
				}	

				return position;
			},

			_calculateDelta: function() {

				var state = this.state,
				    position = state.position,
				    speed = state.speed,
					floatBox = this.options.floatBox,
					float = floatBox.type,
				    leftLimits = this._getFloatLimits( float, 'left'),
				    topLimits = this._getFloatLimits( float, 'top'),
				    leftAdjustment,
				    topAdjustment;

				// DID THE BUBBLE CROSS THE MINIMUM HORIZONTAL FLOATING LIMIT?
				if( position.left < leftLimits['min']) {

					// MAKE IT MOVE TO THE RIGHT
					speed.leftSign = 1;
				}	

				// DID THE BUBBLE CROSS THE MAXIMUM HORIZONTAL FLOATING LIMIT?
				if( position.left > leftLimits['max']) {

					// IF SO THEN MOVE THE BUBBLE BACK INSIDE THE LIMIT ...
					leftAdjustment = leftLimits['max'] - position.left;

					// ... AND MAKE IT MOVE TO THE LEFT
					speed.leftSign = -1;
				}	

				// DID THE BUBBLE CROSS THE MINIMUM VERTICAL FLOATING LIMIT?
				if( position.top < topLimits['min']) {

					// MAKE IT MOVE DOWNARDS
					speed.topSign = 1;
				}	

				// DID THE BUBBLE CROSS THE MAXIMUM VERTICAL FLOATING LIMIT?
				if( position.top > topLimits['max']) {

					// IF SO THEN MOVE THE BUBBLE BACK INSIDE THE LIMIT ...
					topAdjustment = topLimits['max'] - position.top;

					// ... AND MAKE IT MOVE UPWARDS
					speed.topSign = -1;
				}	

				return {

					left: {
						toValue: function() {
							if( leftAdjustment) {
								return leftAdjustment;
							}
							return speed.leftSign * speed.rate;
						},
						toString: function() {
							if( leftAdjustment) {
								return '+=' + leftAdjustment;
							}
							return (speed.leftSign > 0 ?  '+=' : '-=') + speed.rate;
						}
					},
					top: {
						toValue: function() {
							if( topAdjustment) {
								return topAdjustment;
							}
							return speed.topSign * speed.rate;
						},
						toString: function() {
							if( topAdjustment) {
								return '+=' + topAdjustment;
							}
							return (speed.topSign > 0 ? '+=' : '-=') + speed.rate;
						}
					}
				}
			},

			_getFloatLimits: function( float, where) {

			    var layout = this.options.layout,
				    floatBox = this.options.floatBox,
			    	bubbleOuterWidth = this.$el.outerWidth(),
			    	bubbleOuterHeight = this.$el.outerWidth(),

			    	// LIMITS FOR THE BUBBLE RANDOM POSITIONS
			    	floatLimits = {

						'top': { 
							left: { 
								min: 0,
								max: layout.width - bubbleOuterWidth
							},
							top: {
								min: 0, 
								max: floatBox.height 
							}
						},
						'right': {
							left: { 
								min: layout.width - floatBox.width - bubbleOuterWidth,
								max: layout.width - bubbleOuterWidth
							},
							top: {
								min: 0, 
								max: layout.height - bubbleOuterHeight
							}
						},
						'bottom': {
							left: { 
								min: 0,
								max: layout.width - bubbleOuterWidth
							},
							top: {
								min: layout.height - floatBox.height - bubbleOuterHeight, 
								max: layout.height - bubbleOuterHeight 
							}
						},
						'left': {
							left: { 
								min: 0,
								max: floatBox.width
							},
							top: {
								min: 0,
								max: layout.height - bubbleOuterHeight 
							}
						},
						'box': {
							left: { 
								min: floatBox.x,
								max: floatBox.x + floatBox.width - bubbleOuterWidth
							},
							top: {
								min: floatBox.y,
								max: floatBox.y + floatBox.height - bubbleOuterHeight 
							}
						}
			    };	

			    return floatLimits[float][where];
			}
		});

		return Bubble;

});
