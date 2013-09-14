var Control = {
	tetris: function(event){
		var axes = event.gamepad.axes;
		var buttons = event.gamepad.buttons;
	
		//use thresholds to avoid 'dirty' buttons
		if(buttons[15] > 0.5) { tetris.right(); }
		if(buttons[14] > 0.5) { tetris.left(); }
		if(buttons[2] > 0.5) { tetris.up(); }
		if(buttons[13] > 0.5) { tetris.down(); }
		if(buttons[0] > 0.5) { tetris.space(); }
	
		if(axes[0] > 0.6) {tetris.right(); }	
		if(axes[2] > 0.6) {tetris.right(); }	
		if(axes[0] < -0.6) {tetris.left(); }	
		if(axes[2] < -0.6) {tetris.left(); }
	
		//new game
		if(buttons[9] > 0.5) {
			tetris.start()
		}	
	},

	//stops slightly overeager slide change when button is a bit sticky
	okToGoNextSlide: true,

	bespoke: function(event){
		var buttons = event.gamepad.buttons;
		if(Control.okToGoNextSlide === true){
			okToGoNextSlide = false; 
			if(buttons[5] > 0.5) { bespoke.next(); }
			if(buttons[4] > 0.5) { bespoke.prev(); }
		}
		setTimeout(function(){ Control.okToGoNextSlide = true; }, 500)	
	},

	setController: function(event){
		if(event.slide.id == 'slide-tetris'){	
			document.addEventListener("gamepadChangedEvent", Control.tetris);	
		}
	
		if(event.slide.id == 'slide-gamepad'){
			document.addEventListener("gamepadChangedEvent", displayButtons);
		}
	},

	pauseController: function(event){
		if(event.slide.id === 'slide-tetris'){	
			document.removeEventListener("gamepadChangedEvent", Control.tetris);	
		}

		if(event.slide.id === 'slide-gamepad'){	
			document.removeEventListener("gamepadChangedEvent", displayButtons);
		}		
	}
};



(function() {
	document.addEventListener('DOMContentLoaded', function() {
		var deck = bespoke.horizontal.from('article');
		deck.on("activate", Control.setController);
		deck.on("deactivate", Control.pauseController);
		
		Gamepad.init();
		tetris = new Tetris();
		tetris.unit = 30;
		tetris.areaX = 16;
		tetris.areaY = 16;
		
		document.addEventListener("gamepadChangedEvent", Control.bespoke);
	})
	
}());




