var clicks = 0;

function reset() {
  for (var h = 0; h < houses.length; h++) {
    houses[h].state = 0;
    clicks = 0;
  }
}

function check() {
  if (houses[0].state == houses[1].state && houses[1].state == houses[2].state) {
    if (houses[0].state == 1) {
      console.log("Square has won");
      reset();
    }
    if (houses[0].state == 2) {
      console.log("Circle has won");
      reset();
    }
  }
  if (houses[0].state == houses[4].state && houses[4].state == houses[8].state) {
    if (houses[0].state == 1) {
      console.log("Square has won");
      reset();
    }
    if (houses[0].state == 2) {
      console.log("Circle has won");
      reset();
    }
  }
  if (houses[0].state == houses[3].state && houses[3].state == houses[6].state) {
    if (houses[0].state == 1) {
      console.log("Square has won");
      reset();
    }
    if (houses[0].state == 2) {
      console.log("Circle has won");
      reset();
    }
  }
  if (houses[3].state == houses[4].state && houses[4].state == houses[5].state) {
    if (houses[3].state == 1) {
      console.log("Square has won");
      reset();
    }
    if (houses[3].state == 2) {
      console.log("Circle has won");
      reset();
    }
  }
  if (houses[6].state == houses[7].state && houses[7].state == houses[8].state) {
    if (houses[6].state == 1) {
      console.log("Square has won");
      reset();
    }
    if (houses[6].state == 2) {
      console.log("Circle has won");
      reset();
    }
  }
  if (houses[2].state == houses[4].state && houses[4].state == houses[6].state) {
    if (houses[2].state == 1) {
      console.log("Square has won");
      reset();
    }
    if (houses[2].state == 2) {
      console.log("Circle has won");
      reset();
    }
  }
  if (houses[0].state == houses[3].state && houses[3].state == houses[6].state) {
    if (houses[0].state == 1) {
      console.log("Square has won");
      reset();
    }
    if (houses[0].state == 2) {
      console.log("Circle has won");
      reset();
    }
  }
  if (houses[1].state == houses[4].state && houses[4].state == houses[7].state) {
    if (houses[1].state == 1) {
      console.log("Square has won");
      reset();
    }
    if (houses[1].state == 2) {
      console.log("Circle has won");
      reset();
    }
  }
  if (houses[2].state == houses[5].state && houses[5].state == houses[8].state) {
    if (houses[2].state == 1) {
      console.log("Square has won");
      reset();
    }
    if (houses[2].state == 2) {
      console.log("Circle has won");
      reset();
    }
  }
}

function mousePressed() {
  clicks++;
  if (mouseX > 0 && mouseY > 0 && mouseX < width / 3 && mouseY < height / 3) {
    //0
    houses[0].change(clicks);
  }
  if (mouseX < (2 * width) /3 && mouseY < height / 3 && mouseX > width / 3 && mouseY > 0) {
    //1
    houses[1].change(clicks);
  }  
  if (mouseX < width && mouseY < height / 3 && mouseX > (2 * width) / 3 && mouseY > 0) {
    //2
    houses[2].change(clicks);
  }  
  if (mouseX < width / 3 && mouseY < (2 * height) / 3 && mouseX > 0 && mouseY > height / 3) {
    //3
    houses[3].change(clicks);
  }  
  if (mouseX < (2 * width) /3 && mouseY < (2 * height) / 3 && mouseX > width / 3 && mouseY > height / 3) {
    //4
    houses[4].change(clicks);
  }  
  if (mouseX < width && mouseY < (2 * height) / 3 && mouseX > (2 * width) /3 && mouseY > height / 3) {
    //5
    houses[5].change(clicks);
  }  
  if (mouseX < width / 3 && mouseY < height && mouseX > 0 && mouseY > (2 * height) / 3) {
    //6
    houses[6].change(clicks);
  }  
  if (mouseX < (2 * width) /3 && mouseY < height && mouseX > width / 3 && mouseY > (2 * height) / 3) {
    //7
    houses[7].change(clicks);
  }  
  if (mouseX < width && mouseY < height && mouseX > (2 * width) /3 && mouseY > (2 * height) / 3) {
    //8
    houses[8].change(clicks);
  }
}

function house() {
  this.state = 0;
  this.x = 0;
  this.y = 0;
  this.change = function(id) {
    if (id % 2 != 0) {
    this.state = 1;
    }
    if (id % 2 == 0) {
    this.state = 2;  
    }
  }
  this.draw = function() {
     if (this.state == 1) {
      rectMode(CENTER);
      fill(0,0,255);
      stroke(0,0,255);
      strokeWeight(5);
      line(this.x - 25, this.y - 25, this.x + 25, this.y + 25);
      line(this.x + 25, this.y - 25, this.x - 25, this.y + 25);
      stroke(0);
      //square(this.x, this.y, 50);
     }
    if (this.state == 2) {
      fill(255,0,0);
      ellipse(this.x, this.y, 50);
    }
  }
}

var houses = [];

function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < 9; i++) {
    houses[i] = new house();
  }
  houses[0].x = width / 6;
  houses[0].y = height / 6;
  
  houses[1].x = width / 2;
  houses[1].y = height / 6;
  
  houses[2].x = (5 * width) / 6;
  houses[2].y = height / 6;
  
  houses[3].x = width / 6;
  houses[3].y = height/ 2;
  
  houses[4].x = width / 2;
  houses[4].y = height / 2;
  
  houses[5].x = (5 * width) / 6;
  houses[5].y = height / 2;
  
  houses[6].x = width / 6;
  houses[6].y = (5 * height) / 6;
  
  houses[7].x = width / 2;
  houses[7].y = (5 * height) / 6;
  
  houses[8].x = (5 * width) / 6;
  houses[8].y = (5 * height) / 6;
  
}

function draw() {
  background(220);
  strokeWeight(2);
  line(0, height / 3, width, height / 3);
  line(0, (2 * height) / 3, width, (2 * height) / 3);
  line(width / 3, 0, width / 3, height);
  line((2 * width) / 3, 0, (2 * width) / 3, height);
  
  for (var i = 0; i < houses.length; i++) {
    houses[i].draw();
  }
    check();
}