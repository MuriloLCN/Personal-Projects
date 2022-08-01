var wid = 400;
var hei = 400;

// Array to be sorted
var array = [6, 12, 65, 234, 1, 4, 7, 23, 1, 4];

// Margin to make it look nicer
var margin = 20;

// How far the numbers need to be apart from each other
var stepX = (wid - (2 * margin)) / (array.length);
var stepY;

// Iterations of the sorting algorythm
var calculatedSteps = [];

// Points to be connected at the end
var pointsArray = [];

var numberOfIterations;

// Returns a shallow copy of an array
// Note: This needs to be done otherwise all steps get replaced by the final sorted array
function getNewArray(arr) {
    var newArr = [];
    for (var t = 0; t < arr.length; t++) {
        newArr.push(arr[t]);    
    }
    return newArr;
}

// Swaps two elements in an array
function swap(array, index1, index2) {
    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

// Gets the index of the smallest element after the starting index
function getMinSub(array, startingElement) {
    var minElem = array[startingElement];
    var minIndex = startingElement;
    
    for (var k = startingElement + 1; k < array.length; k++) {
        if (array[k] < minElem) {
            minElem = array[k];
            minIndex = k;
        }
    }

    return minIndex;
}

// Selection algo
function selectionSort(array) {
    var min;
    for (var t = 0; t < array.length; t++) {
        min = getMinSub(array, t);
        // Stores the points to be drawn as (x, y) PVectors
        // https://pt.khanacademy.org/computer-programming/pvectorx-y/5218818305556480        
        pointsArray.push(createVector(min, t));
        pointsArray.push(createVector(t, t + 1));
        var temp = getNewArray(array);
        calculatedSteps.push(temp);
        swap(array, t, min);
    }
    numberOfIterations = calculatedSteps.length;
    stepY = (hei - (2 * margin)) / numberOfIterations;
}

// Displays an array (with it's elements evenly spaced) at a given height
var displayArray = function(array, height) {
    push();
    textFont("monospace", 12);
    strokeWeight(0);
    fill(255);
    
    for (var p = 0; p < array.length; p++) {
        text(array[p].toString(), margin + (p * stepX), height);
    }
    pop();
};

// Draws a single line for a given swap
// Note: Sprinkled numbers are to make it look nicer.
function drawLine(x1, y1, x2, y2) {
    stroke(255, 255, 255);
    line(margin + 3 + x1 * stepX, margin + 3 +  y1 * stepY, margin + 3 +  x2 * stepX, margin - 13 + y2 * stepY);
}

// Draws all the individual steps
function drawSteps(iteration) {
    if (iteration > calculatedSteps.length) {
      iteration = calculatedSteps.length;
    }
    for (var t = 0; t < iteration; t++) {
        var y = margin + (t * stepY);
        displayArray(calculatedSteps[t], y);   
    }
}

// Draws all lines from the stored points
function drawLines(iteration) {
    if (iteration > floor((pointsArray.length - 2))) {
      iteration = floor((pointsArray.length - 2));
    }
    for (var t = 0; t < iteration; t+= 2) {
        drawLine(pointsArray[t].x, pointsArray[t].y, pointsArray[t + 1].x, pointsArray[t + 1].y);
    }
}

function setup() {
  createCanvas(wid, hei);
  frameRate(1);
  selectionSort(array);
}

// Draw function gets called every frame
function draw() {
  background(0);
  drawSteps(frameCount);
  drawLines((frameCount - 1) * 2);
}