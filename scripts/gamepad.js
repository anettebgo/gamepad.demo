var Gamepad = {

  notified: false,
  gamepad: null,
  prevTimestamp: null,

  init: function() {
    if (!!navigator.webkitGetGamepads) {
		Gamepad.tick();
 	} else {
     	alert("this won't work in your browser. sad panda :(");
	}
  },

  tick: function() {
    Gamepad.pollStatus();
    window.requestAnimationFrame(Gamepad.tick);
  },

  pollStatus: function() {
	Gamepad.setGamepad();
	gamepad = Gamepad.gamepad;
	
	if(gamepad){
		if (!(gamepad.timestamp == Gamepad.prevTimestamp)) {
			Gamepad.prevTimestamp = gamepad.timestamp;
			Gamepad.fireEvent(gamepad);
		}
		
	} else { 
		if(!Gamepad.notified){
			alert('gamepad is not connected');
			Gamepad.notified = true; //please no endless dialog boxes
		}
	}
  },

  setGamepad: function() {
    Gamepad.gamepad = navigator.webkitGetGamepads()[0];
  },

  fireEvent: function(gamepad) {
    var evt = document.createEvent("Events")
    evt.initEvent('gamepadChangedEvent'); 
    evt.gamepad = gamepad
	console.log(evt)
	document.dispatchEvent(evt);
  }
};
