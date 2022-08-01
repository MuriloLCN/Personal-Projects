var dummy = 0;
var arr = [];
var numPts = 50;
var times = 0;

function move(ar) {
  for (var g = 0; g < ar.length - 1; g++) {
    if (ar[g] > ar[g+1]) {
      dummy = ar[g + 1];
      ar[g + 1] = ar[g];
      ar[g] = dummy;
      dummy = 0;
    }
  }
}

function setup() {
  createCanvas(400, 400);
  for (var t = 0; t < numPts; t++) {
    arr[t] = random(0, height);
  }
  frameRate(10);
}

function draw() {
  background(220);
  move(arr);
  for(var r = 0; r < arr.length; r++) {
    ellipse(r * (width / numPts), -arr[r] + height, 5);
    stroke(190);
    line(0, -arr[r] + height, r * (width / numPts), -arr[r] + height);
    line(r * (width / numPts), height, r * (width / numPts), -arr[r] + height);
    stroke(0,255,0);
    line(r * (width / numPts), -arr[r] + height, (r+1) * (width / numPts), -arr[r + 1] + height);
    stroke(0);
  }
}