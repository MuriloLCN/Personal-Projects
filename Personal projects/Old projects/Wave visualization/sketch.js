var a;
var b;
var curColor;
var m;

// noprotect

function setup() {
  
  createCanvas(400, 400);
  
  // Sets up the points
  a = createVector(width / 2, height / 2 + 10);
  b = createVector(width / 2, height / 2 - 10);
  
  // Goes through all the points calculating its color and placing them
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      push();
      
        // The sum of the sine waves of the distances to the pts
        m = sin(dist(i,j,a.x,a.y)) + sin(dist(i,j,b.x,b.y));
      
        // Makes the curColor get a value from 0 (black) to 255 (white) depending on the value of its sum             (between -2 and 2)
        curColor = map(m, -2, 2, 0, 255);
      
        stroke(curColor);
        point(i, j);
      
      pop();
    }
  }
}

function mousePressed() {
    a.x = mouseX;
    a.y = mouseY;
    
    for (var i = 0; i < width; i++) {
      for (var j = 0; j < height; j++) {
        push();
          m = sin(dist(i,j,a.x,a.y)) + sin(dist(i,j,b.x,b.y));
          curColor = map(m, -2, 2, 0, 255);
          stroke(curColor);
          point(i, j);
        pop();
      }
    }
  
  
}

function draw() {
  
}