define(['jquery', 'videojs'], function( $, _V_) {

	/* Close Button
	================================================================================ */
	_V_.CloseButton = _V_.Button.extend({

	  init: function(player, options){

	    this._super(player, options);
	  },

	  createElement: function(){

	    return this._super("div", {
	      className: "vjs-close-button",
	      innerHTML: "<span>CLOSE</span>"
	    });
	  },

	  onClick: function(){
		  
		  this.player.options.listenerEl.trigger('close');
	  }

	});

	return _V_.CloseButton;
});
