var a;
var b;
var c;
var scl = 20;

var collAB = [];
var collBA = [];

function checkPvP() {
    //check for the player
    for (var i = 0; i < c.total; i++) {
       if (c.tail.length > 2) {
      collAB[i] = dist(a.x, a.y, c.tail[i].x, c.tail[i].y);
    for (var l = 0; l < collAB.length; l++) {
      if (collAB[l] < scl - 3) {
        a = new snake();
        collAB = [];
        collBA = [];
      }
      }
    }
    }  
    //check for the bot
      for (var t = 0; t < a.total; t++) {
         if (a.tail.length > 2) {
      collBA[t] = dist(c.x, c.y, a.tail[t].x, a.tail[t].y);
    for (var j = 0; j < collBA.length; j++) {
      if (collBA[j] < scl - 3) {
        c = new bot();
        collBA = [];
        collAB = [];
      }
      }
    }
    } 
  }

function bot() {
  this.x = floor(random(0, (width / scl) - 1)) * scl;
  this.total = 1;
  this.tail = [];
  this.y = floor(random(0, (height / scl) - 1)) * scl;
  this.xspeed = 0;
  this.yspeed = 0;
  
  this.draw = function() {
    fill(255,0,0);
    noStroke();
    square(this.x, this.y, scl);
    for (var i = 0; i < this.tail.length; i++) {
      square(this.tail[i].x, this.tail[i].y, scl);
    }
  }
  
  this.update = function() {
    if (this.x > b.x && this.xspeed != scl) {
      this.xspeed = -scl;
      this.yspeed = 0;
    }
    else if (this.x > b.x && this.xspeed == scl) {
      this.xspeed = 0;
      this.yspeed = -scl;
    }
    if (this.x < b.x && this.speed != -scl) {
      this.xspeed = scl;
      this.yspeed = 0;
    }
    else if (this.x < b.x && this.xspeed == -scl) {
      this.xspeed = 0;
      this.yspeed = -scl;
    }
    if (this.x == b.x) {
      if (this.y > b.y && this.yspeed != scl) {
        this.yspeed = -scl;
        this.xspeed = 0;
      }
      else if (this.y > b.y && this.yspeed == scl) {
        this.yspeed = 0;
        this.xspeed = -scl;
      }
      if (this.y < b.y && this.yspeed != -scl) {
        this.yspeed = scl;
        this.xspeed = 0;
      }
      else if (this.y < b.y && this.yspeed == -scl) {
        this.yspeed = 0;
        this.xspeed = scl;
      }
    }
    
    
    this.x += this.xspeed;
    this.y += this.yspeed;
    
    if (this.x < 0) {
      this.x = width - scl;
    }
    if (this.x > width - scl) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = height - scl;
    }
    if (this.y > height - scl) {
      this.y = 0;
    }
    
    for (var i = 0; i < this.total; i++) {
      this.tail[this.total] = createVector(this.x, this.y);
      this.tail[i] = this.tail[i+1];
    }
  }
  this.dists = [];
  this.checkDeath = function() {
  for (var i = 1; i < this.total; i++) {
    for (var t = 0; t < this.total - 2; t++) {
    this.dists[t] = dist(this.x, this.y, this.tail[t].x, this.tail[t].y);
    }
    for (var b = 0; b < this.dists.length; b++) {
      if (this.dists[b] < 3) {
        c = new bot();
      }
    }
  }
  }
}
function checkEat() {
  if (dist(a.x, a.y, b.x, b.y) < scl - 1) {
    b.x = floor(random(0, (width / scl) - 1)) * scl;
    b.y = floor(random(0, (height / scl) - 1)) * scl;
    a.total++;
  }
  if (dist(c.x, c.y, b.x, b.y) < scl - 1) {
    b.x = floor(random(0, (width / scl) - 1)) * scl;
    b.y = floor(random(0, (height / scl) - 1)) * scl;
    c.total++;
  }
}

function food() {
  this.x = floor(random(0, (width / scl) - 1)) * scl;
  this.y = floor(random(0, (height / scl) - 1)) * scl;
  
  this.draw = function() {
    fill(0);
    ellipse(this.x + (scl / 2), this.y + (scl / 2), scl, scl);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
      a.yspeed = -scl;
      a.xspeed = 0;
      }
  if (keyCode === DOWN_ARROW) {
      a.yspeed = scl;
      a.xspeed = 0;
      }
  if (keyCode === LEFT_ARROW) {
      a.xspeed = -scl;
      a.yspeed = 0;
      }
  if (keyCode === RIGHT_ARROW) {
      a.xspeed = scl;
      a.yspeed = 0;
      }
}

function snake() {
  this.x = floor(random(0, (width / scl) - 1)) * scl;
  this.y = floor(random(0, (height / scl) - 1)) * scl;
  this.total = 1;
  this.tail = [];
  this.xspeed = 0;
  this.yspeed = 0;
  
  this.draw = function() {
    fill(0);
    square(this.x, this.y, scl);
    for (var i = 0; i < this.total; i++) {
      square(this.tail[i].x, this.tail[i].y, scl);
    }
  }
  
  this.update = function() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    
    if (this.x < 0) {
      this.x = width - scl;
    }
    if (this.x > width - scl) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = height - scl;
    }
    if (this.y > height - scl) {
      this.y = 0;
    }
    
    for (var i = 0; i < this.total; i++) {
      this.tail[this.total] = createVector(this.x, this.y);
      this.tail[i] = this.tail[i+1];
    }
  }
  this.dists = [];
  this.checkDeath = function() {
  for (var i = 1; i < this.total; i++) {
    for (var t = 0; t < this.total - 2; t++) {

       
      
    this.dists[t] = dist(this.x, this.y, this.tail[t].x, this.tail[t].y);
    }
    for (var b = 0; b < this.dists.length; b++) {
      if (this.dists[b] < 3) {
        a = new snake();
        
      }

    }

  }
  }
  
  
}

function give() {
  if (keyIsDown(ENTER)) {
    a.total++;
  }
  
}

function setup() {
  createCanvas(601, 601);
  a = new snake();
  b = new food();
  c = new bot();
  frameRate(10);
}

function draw() {
  background(10,150,255);
  checkPvP();
  checkEat();
  a.checkDeath();
  a.update();
  b.draw();
  a.draw();
  c.checkDeath();
  c.update();
  //pra fazer o bot ir mais lento é so apagar o c.update(); acima e tirar todas as barras duplas abaixo
  //if (frameCount % 2 == 0) {
  //c.update();
  //}
  //else if (frameCount < 2) {
  //c.update();  
  //}
  c.draw();
  give();
}
