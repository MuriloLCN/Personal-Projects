var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(3000);
var io = socket(server);


app.use(express.static('public'));

console.log("Server is running");





var players = [];
var socketIds = [];
var field = [];
var w = 16; // Size of each square in the canvas
//var num = 35; // Number of squares in rows & columns
var numx = 81;
var numy = 38;
var foodPosx;
var foodPosy;

var currentIdCount = 0;

io.sockets.on('connection', newConnection);

setup();

setInterval(update, 66);


function newConnection(socket) {

    console.log("New connection, id: " + socket.id);
    socket.on('getId', sendId);
    socket.on('sendControls', handleControls);

    socket.on('disconnect', () => {

        var index = socketIds.indexOf(socket.id);

        if (players[index]) { //If the player exists, delete their snake 
            players[index].cleanup();
            players[index] = undefined;
            console.log("Player disconnected: " + socket.id);
        }
        else {
            console.log("Player disconnected before creating instance (probably restart-reload)");
        }
    });

    function sendId() {

        /* 
         * Each player has two assigned ids to them:
         * currentIdCount -> (0,1,2,3,...) -> Based on number of connections 
         * socketIds -> random string -> Based on the socket id assigned to that client 
         * They both have the same index in their respective arrays, because they're created on the same order
         */

        playerId = currentIdCount;

        var data = {
            id: playerId,
            squareWidth: w,
            numberSquaresx: numx,
            numberSquaresy: numy
        }

        io.sockets.emit('sendId', data);
        players[playerId] = new snake(Math.floor(getRandom(0, numx)), Math.floor(getRandom(0, numy)), currentIdCount, 0);
        socketIds[playerId] = socket.id;
        currentIdCount++;
    }

    function handleControls(data) {

        if (players[data.playerId]) { //If the player has a valid ID
            if (data.up) {
                players[data.playerId].setVelocity(0, -w);
            }
            if (data.down) {
                players[data.playerId].setVelocity(0, w);
            }
            if (data.left) {
                players[data.playerId].setVelocity(-w, 0);
            }
            if (data.right) {
                players[data.playerId].setVelocity(w, 0);
            }
        }
    }
}


// Runs once every 66ms (~15FPS). Changing that makes the game slower or faster
function update() {

    for (t = 0; t < players.length; t++) {
        if (players[t]) { //If the player is still connected
            players[t].move();
        }
    }

    var data = {
        playerStatus: players,
        boardStatus: field
    }

    io.sockets.emit("sendUpdatedData", data);
}


function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}


function setup() {

    // Create the field & food

    for (var y = 0; y < numy; y++) {
        for (var x = 0; x < numx; x++) {
            field[x + y * numx] = new cell(x, y);
        }
    }

    var rx = Math.floor(getRandom(0, numx));
    var ry = Math.floor(getRandom(0, numy));

    foodPosx = rx;
    foodPosy = ry;

    field[rx + ry * numx].food = true;
}


function resetFood() {
    field[foodPosx + foodPosy * numx].food = false;
    var randomX = Math.floor(getRandom(0, numx - 1));
    var randomY = Math.floor(getRandom(0, numy - 1));
    field[randomX + randomY * numx].food = true;
    foodPosx = randomX;
    foodPosy = randomY;
}


function cell(x, y) {
    this.food = false;
    this.is_part = false;
    this.x = x;
    this.y = y;
}


function snake(x, y, id, deaths) {

    this.id = id;

    this.deaths = deaths;

    this.indexx = x;
    this.indexy = y;

    this.posx = x * w;
    this.posy = y * w;

    this.xspeed = 0;
    this.yspeed = 0;

    this.total = 1;

    this.tailx = [];
    this.taily = [];

    this.setVelocity = function (x, y) {
        // Has to be done in two statements because negative zero is equal to zero
        if (this.yspeed != -y) {
            this.xspeed = x;
            this.yspeed = y;
        }
        if (this.xspeed != -x) {
            this.xspeed = x;
            this.yspeed = y;
        }
    }

    this.cleanup = function () {
        // Cleans up the collision cells after the client disconnects
        for (var h = 1; h < this.tailx.length - 2; h++) {
            if (field[this.tailx[h] + this.taily[h] * numx]) {
                field[this.tailx[h] + this.taily[h] * numx].is_part = false;
            }
        }
    }

    this.move = function () {

        // Changes the position
        if (this.xspeed == w) {
            /*
            if (this.indexx > num) {
                this.indexx = 0;
            }
            */
            //else {
                this.indexx++;
            //}
        }
        if (this.xspeed == -w) {
            //if (this.indexx < 0) {
            //    this.indexx = num - 2;
            //}
            //else {
                this.indexx--;
            //}
        }

        if (this.yspeed == w) {
            //if (this.indexy > num) {
            //    this.indexy = 0;
            //}
            //else {
                this.indexy++;
            //}
        }
        if (this.yspeed == -w) {
            //if (this.indexy < 0) {
            //    this.indexy = num;
            //}
            //else {
                this.indexy--;
            //}
        }

        // Edge cases
        if (this.indexx < 0) {
            this.indexx = numx - 2;
        }
        if (this.indexx > numx - 2) {
            this.indexx = 0;
        }

        if (this.indexy < 0) {
            this.indexy = numy - 1;
        }
        if (this.indexy > numy - 1) {
            this.indexy = 0;
        }

        this.posx = this.indexx * w;
        this.posy = this.indexy * w;

        this.tailx[this.total] = this.indexx;
        this.taily[this.total] = this.indexy;


        for (var i = 0; i < this.total; i++) {

            // Moves the tail
            this.tailx[i] = this.tailx[i + 1];
            this.taily[i] = this.taily[i + 1];

            // Removes the collision cell from the last part of the tail
            if (field[(this.tailx[0] + this.taily[0] * numx)]) {
                field[(this.tailx[0] + this.taily[0] * numx)].is_part = false;
            }
            
        }

        // Creates the collision objects for the updated position
        for (var test = 1; test < this.tailx.length - 2; test++) {
            if (field[this.tailx[test] + this.taily[test] * numx]) {
                field[this.tailx[test] + this.taily[test] * numx].is_part = true;
            }
        }
        

        // Handles collision & food contact
        if (field[this.indexx + this.indexy * numx]) {

            if (field[this.indexx + this.indexy * numx].is_part) {

                for (var ded = 0; ded < this.tailx.length; ded++) {

                    if (field[this.tailx[ded] + this.taily[ded] * numx]) {
                        field[this.tailx[ded] + this.taily[ded] * numx].is_part = false;
                    }

                }

                // Restart their snake with the same ID and +1 to the death counter
                players[this.id] = new snake(Math.floor(getRandom(0, numx)), Math.floor(getRandom(0, numy)), this.id, this.deaths + 1);

                let data = {
                    id: this.id
                }

                io.sockets.emit('playDeathSound', data);

            }

            if (field[this.indexx + this.indexy * numx].food) {

                resetFood();
                this.total++;

                let data = {
                    id: this.id
                }

                io.sockets.emit('playEatSound', data);

            }
        }

    }
}
