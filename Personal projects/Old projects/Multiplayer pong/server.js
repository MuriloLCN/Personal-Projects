var express = require('express');
var app = express();
var cors = require('cors');
var server = app.listen(3000, "0.0.0.0");

app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(cors({origin: '*'}));

io.sockets.on('connection', newConnection);

var numberOfConnectedPlayers;
var windowWidth = 600;
var windowHeight = 400;

var baseVelocity = 2; // Pixels per frame
var maxVelocityMultiplier = 0.1;
var paddleOffsetFromScreenEdges = 5;

var ball;
var ballRadius = 5;

var leftPaddle;
var rightPaddle;
var paddleLength = 50;

var scoreLeftPlayer;
var scoreRightPlayer;

var isGameRunning = false;


function newConnection(socket) {

    console.log('new connection  ' + socket.id);

    socket.on("getId", sendId);

    socket.on("start_sketch", startGame);

    socket.on('incomingInputs', movePaddles);

    socket.on('sendInputs', movePaddles);

    server.getConnections(function(error, count) {
        console.log(count - 1);
        numberOfConnectedPlayers = count - 1;
    });

    function sendId() {
        datum = {
            id: numberOfConnectedPlayers
        }

        var finalDatum = JSON.stringify(datum);
        io.sockets.emit("retrieveId", finalDatum);
    }

    function startGame() {

        if (!ball) {
            ball = new boll(windowWidth/2, windowHeight/2, baseVelocity + (0.5 * baseVelocity * Math.random()), baseVelocity + (0.5 * baseVelocity * Math.random()));
        }

        if (!leftPaddle) {
            leftPaddle = new paddle(true);
        }

        if (!rightPaddle) {
            rightPaddle = new paddle(false);
        }

        if (!scoreLeftPlayer) {
            scoreLeftPlayer = 0;
        }

        if (!scoreRightPlayer) {
            scoreRightPlayer = 0;
        }

        if (!isGameRunning) {
            setInterval(mainUpdate, 10);
            isGameRunning = true;
        }

    }

    function movePaddles(inputsy) {
        var inputs = JSON.parse(inputsy);
        if (inputs.up) {
            leftPaddle.move_up();
        }
        if (inputs.down) {
            leftPaddle.move_down();
        }
        if (inputs.left) {
            rightPaddle.move_down();
        }
        if (inputs.right) {
            rightPaddle.move_up();
        }
    }

}

console.log('Socket server is running!')


function boll(posx, posy, velx, vely) {
    // Note: I'd use P5.js Vectors for this, but p5.js is not
    // loaded for this file
    this.x = posx;
    this.y = posy;
    this.xvel = velx;
    this.yvel = vely;
    this.r = ballRadius;

    this.move = function() {
        this.x += this.xvel;
        this.y += this.yvel;
        if (this.y < 0) {
            this.y = 0;
            this.yvel *= -1;
        }
        if (this.y > windowHeight) {
            this.y = windowHeight;
            this.yvel *= -1;
        }
    }

    this.setVel = function(newx, newy) {
        this.xvel = newx;
        this.yvel = newy;
    }
}

function paddle(left) {
    this.pos = (windowHeight / 2) - (paddleLength / 2);
    this.vel = 5;
    if (left) {
        this.hor = paddleOffsetFromScreenEdges;
    }
    else {
        this.hor = windowWidth - paddleOffsetFromScreenEdges;
    }

    this.move_up = function() {
        this.pos -= this.vel;
        if (this.pos < 0) {
            this.pos = 0;
        }
    }

    this.move_down = function() {
        this.pos += this.vel;
        if (this.pos > windowHeight - paddleLength) {
            this.pos = windowHeight - paddleLength;
        }
    }

}

function setNewVelocities() {
    ball.yvel *= (1 + Math.random() *  0.25);
    ball.xvel *= -1 * (1 + Math.random() * 0.25);
}

function check_collisions(bill, lpad, rpad) {
    if (bill.x < paddleOffsetFromScreenEdges) {
        if (bill.y > lpad.pos && bill.y < lpad.pos + paddleLength) {
            io.sockets.emit('playBounceSound');
            setNewVelocities();
        }
        else {
            ball = new boll(windowWidth/2, windowHeight/2, baseVelocity + (0.5 * baseVelocity * Math.random()), baseVelocity + (0.5 * baseVelocity * Math.random()));
            io.sockets.emit('playScoreSound');
            scoreRightPlayer += 1;
        }
    }
    if (bill.x > windowWidth - paddleOffsetFromScreenEdges) {
        if (bill.y > rpad.pos && bill.y < rpad.pos + paddleLength) {
            io.sockets.emit('playBounceSound');
            setNewVelocities();
        }
        else {
            ball = new boll(windowWidth/2, windowHeight/2, baseVelocity + (0.5 * baseVelocity * Math.random()), baseVelocity + (0.5 * baseVelocity * Math.random()));
            io.sockets.emit('playScoreSound');
            scoreLeftPlayer += 1;
        }
    }
}

function mainUpdate() {

    check_collisions(ball, leftPaddle, rightPaddle);
    ball.move();

    var data = {
        ballx: ball.x,
        bally: ball.y,
        leftpady: leftPaddle.pos,
        rightpady: rightPaddle.pos,
        lscore: scoreLeftPlayer,
        rscore: scoreRightPlayer
    }

    var trueData = JSON.stringify(data);

    io.sockets.emit("incomingData", trueData);
}

