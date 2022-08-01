var numPoints;
var scal = 50;
var conn = [];
var dh = 1;
function getDev() {
  var x1 = mouseX;
  var x2 = mouseX + dh;
  var y1 = calculate(mouseX / scal) * -scal;
  var y2 = calculate((mouseX + dh) / scal) * -scal;
  var a = (y2 - y1) / dh;
  var b = y1 - (a * x1);
  var p1 = -b / a;
  var p2 = (-height - b) / a;
  line(p1, 0, p2, -height);
  
  line(x1, y1, x2, y2);
  
  for (var o = 0; o < width - dh; o+= dh) {
    var xdva = o + dh;
    var yodin = calculate(o / scal) * -scal;
    var ydva = calculate((xdva / scal)) * -scal;
    var delt = (ydva - yodin) / dh;
    stroke(0,255,0);
    point(o, delt);
  }
}
function calculate(x) {
  return sin(4 *x) + 3;
  //aqui vai qql coisa
}

function setup() {
  createCanvas(401, 401);
}

function draw() {
  translate(0, height);
  background(255);
  //ellipse(0,0, 40)
  stroke(150);
  for (var ex = 0; ex < width; ex++) {
    if (ex % scal == 0) {
      line(ex, 0, ex, -height);
    }
    for (var why = 0; why > -height; why--) {
      if (why % scal == 0) {
      line(0, why, width, why);
      }
    }
  }
  stroke(0,0,255);
  for (var t = 0; t < width / scal; t++) {
    ellipse(t * scal, calculate(t) * -scal, 3);
    conn[t] = createVector(t * scal,calculate(t) * -scal);
  }
 // for (var o = 0; o < conn.length - 1; o++) {
   // line(conn[o].x, conn[o].y, conn[o+1].x, conn[o+1].y);
  //}
  for (var p = 0; p < width; p+= 0.1) {
    point(p, calculate(p / scal) * -scal);
  }
  stroke(0,255,0);
  line(mouseX, -height + mouseY, mouseX, calculate(mouseX / scal) * -scal);
  stroke(0,0,255);
  ellipse(mouseX, -height + mouseY, 5);
  if (mouseIsPressed) {
    console.log(calculate(mouseX / scal));
  }
  ellipse(mouseX, calculate(mouseX / scal) * -scal, 7);
  text(calculate(mouseX / scal), mouseX + 10, calculate(mouseX / scal) * -1 * scal);
  getDev();
}