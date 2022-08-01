var socket;
var hasReceivedId = false;
var hasUpdatedAtLeastOnce = false;
var id;

var w = 16;
//var num = 35;
var numx = 81;
var numy = 38;

var field = [];
var mySnake;

let p;
let colorPicker;

let deathSound;
let eatSound;


function preload() {
	deathSound = loadSound('deathSound.wav');
	eatSound = loadSound('eatSound.wav');
}


function setup() {

	createCanvas(w * (numx - 1), w * (numy));

	p = createP();

	colorPicker = createColorPicker('#0000FF');

	socket = io.connect('http://localhost:3000');
	socket.emit('getId');

	socket.on('sendId', receiveId);

	socket.on('sendUpdatedData', updateData);

	socket.on('playEatSound', playEatSound);

	socket.on('playDeathSound', playDeathSound);

	// Receives the info whenever the server sends them
	function receiveId(data) {
		if (!hasReceivedId) {
			id = data.id;
			if (w != data.squareWidth || numx != data.numberSquaresx || numy != data.numberSquaresy) { //To avoid mismatch between client and server canvas' sizes
				w = data.squareWidth;
				numx = data.numberSquaresx;
				numy = data.numberSquaresy;
				resizeCanvas(w * (numx - 1), w * (numy));
			}
			hasReceivedId = true;
		}
	}

	function updateData(data) {
		field = data.boardStatus;
		mySnake = data.playerStatus[id];
		hasUpdatedAtLeastOnce = true;
	}

	function playEatSound(data) {
		if (data.id == id) {
			eatSound.play();
		}
	}

	function playDeathSound(data) {
		if (data.id == id) {
			deathSound.play();
		}
    }

	
}


function draw() {

	//frameRate(15);

	sendInputs();

	// Only continue once the player has connected & received data to avoid undefined data

	// For some reason, translate() doesn't work to shift the camera perspective

	if (hasReceivedId) {
		background(212);

		for (var p = 0; p < field.length; p++) {
			drawCell(field[p]);
		}

		drawSnake(mySnake);
	}

}


function drawCell(cell) {
	if (cell.x < numx - 1) { // <-- Is this still needed?

		// Sets the color & shape to be drawn depending on what the given cell is

		if (cell.food) {
			push();
			fill(255, 255, 0);
			stroke(0);
			ellipse(cell.x * w + w / 2, cell.y * w + w / 2, w - 2);
			pop();
		}
		else if (cell.is_part) {
			push();
			fill(255,0,0);
			//stroke(255,0,0);
			noStroke();
			square(cell.x * w, cell.y * w, w);
			pop();
		}
		else {
			//push();
			//stroke(212);
			//fill(212);
			//square(cell.x * w, cell.y * w, w);
			//pop();

			// Not drawing it at all and leaving the gray squares for the bg makes the performance far better
		}
	}
}


function drawSnake() {
	push();
	fill(colorPicker.color());
	noStroke();
	if (mySnake) {
		square(mySnake.posx, mySnake.posy, w);
		for (var h = 0; h < mySnake.tailx.length; h++) {
			square(mySnake.tailx[h] * w, mySnake.taily[h] * w, w);
		}
		push();
		stroke(0);

		p.position(10, w * (numy + 1));
		p.html("Deaths: " + mySnake.deaths);

		colorPicker.position(100, w * (numy + 1) + 13);
		pop();
	}
	pop();
	
}


function sendInputs() {
	if (hasReceivedId) {
		var flags = [false, false, false, false];

		if (keyIsDown(UP_ARROW)) {
			flags[0] = true;
		}
		if (keyIsDown(DOWN_ARROW)) {
			flags[1] = true;
		}
		if (keyIsDown(LEFT_ARROW)) {
			flags[2] = true;
		}
		if (keyIsDown(RIGHT_ARROW)) {
			flags[3] = true;
		}

		var data = {
			up: flags[0],
			down: flags[1],
			left: flags[2],
			right: flags[3],
			playerId: id
		}

		var emittingFlag = false;

		for (var i = 0; i < flags.length; i++) {
			if (flags[i]) {
				emittingFlag = true;
			}
		}

		// Only sends data once any key is pressed, which makes emittingFlag to be true

		if (emittingFlag) {
			socket.emit("sendControls", data);
		}

	}
	else {
		socket.emit('getId');
    }
}
