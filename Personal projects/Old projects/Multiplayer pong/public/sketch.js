var socket;

var myId;

var hasReceivedId = false;

var bounceSound;
var scoreSound;

var offset = 5;

var paddle_length = 50;
var ball_radius = 5;

var ballposx;
var ballposy;
var leftpadpos;
var rightpadpos;
var leftscore;
var rightscore;

var is_even;

// Todo: add a button to reset the score

function preload() {
  bounceSound = loadSound('hit.mp3');
  scoreSound = loadSound('score.mp3');
}

function writeId(datar) {
    data = JSON.parse(datar);
    if (!hasReceivedId) {
        myId = parseInt(data.id);

        hasReceivedId = true;
    }
    //console.log("received id: " + data.id);
}

function playScoreSound() {
    scoreSound.play();
}

function playBounceSound() {
    bounceSound.play();
}

function sendInputs() {
    if (hasReceivedId) {
    var flags = [false, false, false, false];

    if (is_even) {
        if (keyIsDown(UP_ARROW)) {
            flags[0] = true;
        }
        if (keyIsDown(DOWN_ARROW)) {
            flags[1] = true;
        }
    }
    if (!is_even) {
        if (keyIsDown(LEFT_ARROW)) {
            flags[2] = true;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            flags[3] = true;
        }
    }

    var data = {
        up: flags[0],
        down: flags[1],
        left: flags[2],
        right: flags[3],
        }

    var emittingFlag = false;

    for (var i = 0; i < flags.length; i++) {
        if (flags[i]) {
            emittingFlag = true;
        }
    }

    var finalData = JSON.stringify(data);
    if (emittingFlag) {
        socket.emit("incomingInputs", finalData);
    }
    }
}

function updateData(datar) {
    data = JSON.parse(datar);
    ballposx = data.ballx;
    ballposy = data.bally;
    leftpadpos = data.leftpady;
    rightpadpos = data.rightpady;
    leftscore = data.lscore;
    rightscore = data.rscore;
}


function setup() {
    createCanvas(600, 400);
    socket = io.connect("http://localhost:3000");
    socket.emit("start_sketch");
    socket.emit("getId");

    socket.on('playBounceSound', playBounceSound);
    socket.on('playScoreSound', playScoreSound);
    socket.on('incomingData', updateData);
    socket.on('retrieveId', writeId);

}

function draw() {
    is_even = isEven(myId);
    sendInputs();
    background(0);
    stroke(255);

    push();
    fill(255);
    textSize(32);
    text(leftscore, width / 4, height / 4);
    text(rightscore, (3 * width) / 4, height / 4);
    pop();

    ellipse(ballposx, ballposy, ball_radius);
    line(offset, leftpadpos, offset, leftpadpos + paddle_length);
    line(width - offset, rightpadpos, width - offset, rightpadpos + paddle_length);

    drawDottedLine(15);

    //console.log(myId);
    //console.log(is_even);

}

function isEven(n) {
    if ((n % 2) == 0) {
        return true;
    }
    else if ((n % 2) != 0) {
        return false;
    }
}

function drawDottedLine(gap) {
  for (i = 0; i < height; i+=gap) {
    if (i % 2 == 0) {
      stroke(255);
      line(width/2, i, width/2, i + gap);
    }
  }
}

