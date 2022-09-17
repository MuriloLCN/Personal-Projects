var scl = 380;

var drawShape = function(x, y, radius, n, scl) {
    if (n === 0) {
        x += radius/(2*sqrt(2));
        y -= radius/(2*sqrt(2));
    }
    if ((n % 2 === 0)) {
        x -= radius/(2*sqrt(2));
        y += radius/(2*sqrt(2));
        fill(x, y, x * y, 90);
    }
    else {
        x += radius/(2*sqrt(2)); 
        y -= radius/(2*sqrt(2));
        fill(y, x, y / x, 90);
    }
    
    ellipse(x, y, radius, radius);
    
    var newRadius = radius/2;
    if (newRadius >= scl) {
        drawShape(x, y, newRadius, n + 1, scl);
        drawShape(x, y, newRadius, n + 2, scl);
        drawShape(y, y, newRadius, n + 1, scl);
        drawShape(x, x, newRadius, n + 2, scl);
    }
};

function draw() {
    frameRate(1);
    background(255,255,255);
    scl = scl / 2;
    if (scl < 3) {
        scl = 380;
        frameCount = 0;    
    }
    drawShape(width/2, height/2, 380, 0, scl);
}
