var points_left_player = 0; // Scores
var points_right_player = 0; 
var screen_offset = 5; // Offset to draw the paddles so they don't merge into the canvas' edges
var max_velocity = 2; // Velocity on which the ball speed is based on
var max_velocity_multiplier = 1.2;
var paddleLength = 50; // Size of the paddles
var ballRadius = 5; // Radius of the ball. 
                    // NOTE: The radius is not taken into consideration when
                    // calculating the collisions, so making it too big could have a
                    // weird drawing effect
var toggle_button; 
var isWall = false;

var right_paddle; // These are the objects used for the constructor functions
var left_paddle;
var boll;

// This constructor function is the ball
function ball(velx, vely, posx, posy) {
    
    this.vel = createVector(velx, vely); // Velocity
    this.pos = createVector(posx, posy); // Position
    this.r = ballRadius; // Radius

    this.move = function () {

        // Adds the velocity to the position
        this.pos.add(this.vel);

        // Checks for upper and lower bounds
        if (this.pos.y > height) {
            this.pos.y = height;
            this.vel.y *= -1;
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
            this.vel.y *= -1;
        }

        // If isWall is toggled, right paddle will disappear and the ball will simply
        // bounce off the right side aswell
        if (isWall && this.pos.x > width) {
            this.pos.x = width;
            this.vel.x *= -1;
        }
    }

    // Simply changes the velocity
    this.setVel = function (vel) {
        this.vel = vel;
    }

    // Draws the ball
    this.draw = function () {
        push();
        stroke(255);
        ellipse(this.pos.x, this.pos.y, this.r);
        pop();
    }

}

// This function checks the collision between the ball and the paddles
// or wall, if it's toggled as so
function checkCollision(ball, lPos, rPos) {

    // Checks if the ball is in the X range to collide with the left paddle
    if (ball.pos.x <= screen_offset) {
        // Checks if the ball is in the Y range to collide with the left paddle
        if (ball.pos.y >= lPos && ball.pos.y <= lPos + paddleLength) {
            // If so, calculate the new velocity and set it as the new velocity
            var temp = collider(ball.pos, lPos);
            ball.setVel(temp);
        }

        // If not, it means the paddle failed to hit the ball and the other side has scored
        if (ball.pos.x < 0) {
            points_right_player += 1;
            return true;
        }
    }

    // Same checks for the X and Y position
    if (ball.pos.x >= width - screen_offset && !isWall) {
        if (ball.pos.y >= rPos && ball.pos.y <= rPos + paddleLength) {
            // Note: The temp variable is to make it more manageable
            var tempb = collider(ball.pos, rPos);
            // The value returned by collider() is always positive, and it means it'll
            // go to the right side, so it has to be multiplied by -1 in order to go
            // to the left side
            tempb.x *= -1;
            ball.setVel(tempb);
        }
        if (ball.pos.x > width) {
            points_left_player += 1;
            return true;
        }
    }

}

// This function dictates the way the ball will behave after hitting a paddle or a wall
function collider(ballPos, paddlePos) {

    // Note: this is not the best way to make the ball change directions in a pong game,
    // it's just the result of a bit of trial and error

    var newVelx, newVely, finalVel;

    // Maps the an angle from the y position of the ball, which goes from the top of the
    // paddle (paddlePos) to the bottom of the paddle (paddlePos + paddleLength), to
    // between 0 and 180

    angle = map(ballPos.y, paddlePos, paddlePos + paddleLength, 0, 180);

    // Makes the new velocity a fraction of the max_velocity
    newVely = max_velocity * -1 * sin(angle + PI / 4);
    newVelx = max_velocity * abs(cos(angle));

    // Adds a random fraction of itself
    newVelx += random(-max_velocity_multiplier * max_velocity, max_velocity_multiplier * max_velocity);

    newVely += random(-max_velocity_multiplier * max_velocity, max_velocity_multiplier * max_velocity);

    // This bit right here was from when the ball still could get stuck near the edges,
    // this no longer happens with the new sin and cos functions but it'll be kept here
    // just in case

    //if (ballPos.y > (5 * height) / 6) {
    //  newVely = random(-max_velocity * 2, -1 * max_velocity);
    //} 
    //if (ballPos.y < height / 6) {
    //  newVely = random(2 * max_velocity, max_velocity);
    //}
    //if (newVely <= 0.5) {
    //  newVely = random(-max_velocity, max_velocity);
    //}

    finalVel = createVector(newVelx, newVely);
    return finalVel;

}

// This constructor function is the left paddle, controlled by the player
// with UP_ARROW and DOWN_ARROW
function leftPaddle() {

    // Length, position, and moving velocity
    this.len = paddleLength;
    this.pos = (height / 2) - (this.len / 2)
    this.vel = 5; // This velocity is how fast the paddles move up and down

    // Simple moving function
    this.move = function () {
        // Snaps back the position if it goes out of bound to avoid shifting
        if (this.pos < 0) {
            this.pos = 0;
        }
        if (this.pos > height - this.len) {
            this.pos = height - this.len;
        }

        if (keyIsDown(DOWN_ARROW)) {
            this.pos += this.vel;
        }
        if (keyIsDown(UP_ARROW)) {
            this.pos -= this.vel;
        }
    }

    // Draws the paddle
    this.draw = function () {
        push();
        stroke(255);
        strokeWeight(3);
        line(screen_offset, this.pos, screen_offset, this.pos + this.len);
        pop();
    }
}

// This constructor function is the right paddle, which can be disabled. I chose to
// do two separate objects instead of a paddle class as to keep their controls and conditions separate,
// since I'm planning on maybe making it multiplayer with a server sometime in the future.
function rightPaddle() {

    this.len = paddleLength;
    this.pos = (height / 2) - (this.len / 2)
    this.vel = 5;

    // These values and functions are the same as the leftPaddle, it's only a separate
    // constructor for future modifications to be easier
    this.move = function () {
        if (this.pos < 0) {
            this.pos = 0;
        }
        if (this.pos > height - this.len) {
            this.pos = height - this.len;
        }

        // The controls for the right paddle if enabled currently are LEFT_ARROW and RIGHT_ARROW
        if (keyIsDown(LEFT_ARROW)) {
            this.pos += this.vel;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.pos -= this.vel;
        }
    }

    this.draw = function () {
        push();
        stroke(255);
        strokeWeight(3);
        line(width - screen_offset, this.pos, width - screen_offset, this.pos + this.len);
        pop();
    }


}


function toggleWall() {
    isWall = !isWall;
}

// This is the P5.JS setup() function, which is called once when the sketch runs for the first time
function setup() {
    // Creates a 600 by 400 canvas
    createCanvas(600, 400);

    // Initializes the objects
    boll = new ball(random(-max_velocity, -max_velocity / 2), random(-max_velocity, -max_velocity / 2), width / 2, height / 2);
    left_paddle = new leftPaddle();
    right_paddle = new rightPaddle();

    angleMode(DEGREES);

    // Creates and displays the button
    toggle_button = createButton('Toggle between wall and opponent');
    toggle_button.position(0, height);
    toggle_button.mousePressed(toggleWall);
}

// This simply draws the dotted line in the middle
function drawDottedLine(gap) {
    for (i = 0; i < height; i += gap) {
        if (i % 2 == 0) {
            stroke(255);
            line(width / 2, i, width / 2, i + gap);
        }
    }
}

// This is the P5.JS draw() function, which is called every frame. Framerate can be changed but
// I'd advise to change the max_velocity if you want to inscrease the speed.
function draw() {

    background(0);

    push();
    fill(255);
    textSize(32);
    if (!isWall) {
        text(points_left_player, width / 4, height / 4);
        text(points_right_player, (3 * width) / 4, height / 4);
    }
    pop();

    drawDottedLine(15);

    boll.move();
    boll.draw();

    if (!isWall) {
        right_paddle.move();
        right_paddle.draw();
    }

    left_paddle.move();
    left_paddle.draw();

    // The checkCollision() function was called twice, which was causing the scores to be added 2 at
    // at time, but since only one needs to be called, I left it inside the if statement

    //checkCollision(boll, left_paddle.pos, right_paddle.pos);

    if (checkCollision(boll, left_paddle.pos, right_paddle.pos)) {

        boll = new ball(random(-max_velocity, -max_velocity / 2), random(-max_velocity, -max_velocity / 2), width / 2, height / 2);

    }
}
