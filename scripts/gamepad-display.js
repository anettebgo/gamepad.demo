function displayButtons(event) {	
	var axes = event.gamepad.axes;
	moveDot(axes);
	
	var buttons = event.gamepad.buttons;

	for(var i=0; i < buttons.length; i++) {
		if(buttons[i] > 0.5) {
			highlightButton('button-' + i)
		}
	}
	
}

function highlightButton(buttonName){	
	var btn = document.getElementById(buttonName)
	btn.classList.add('on')
	window.setTimeout(function(){btn.classList.remove('on')}, 600)
}

function moveDot(axes){
	var dot = document.getElementById('dot')
	
	if(axes[0] > 0.2 || axes[0] < -0.2){
		dot.style.backgroundColor = 'red';
		dot.style.left = 400 + axes[0] * 400 + 'px';
	}
	
	if(axes[1] > 0.2 || axes[1] < -0.2){
		dot.style.backgroundColor = 'orange';
		dot.style.top = 300 + axes[1] * 300 + 'px';
	}
	
	if(axes[2] > 0.2 || axes[2] < -0.2){
		dot.style.backgroundColor = 'blue';
		dot.style.left = 400 + axes[2] * 400 + 'px';
	}
	
	if(axes[3] > 0.2 || axes[3] < -0.2){
		dot.style.backgroundColor = 'cyan';
		dot.style.top = 300 + axes[3] * 300 + 'px';
	}
}
