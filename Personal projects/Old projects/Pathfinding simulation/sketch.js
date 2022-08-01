// A simple pathfinding algorythm

var square_size = 16;
var row_size = 35;
var stack = []; // This stack is used to keep track of cells to be checked
var current_cell;
var final_cell;
var field = [];
var is_done = false; // Dictates whether the program has found the way
var iteration = -1;
var path = [];
var img;

var has_reset = false;

// Flags used to guide events done by the buttons
var flag_create_wall = false;
var flag_delete_wall = false;
var flag_change_starting_pos = false;
var flag_change_ending_pos = false;

// Used to keep track of the starting point and the flag
var current_starting_id;
var current_ending_id;

// The buttons
var create_wall;
var destroy_wall;
var change_starting_pos;
var change_ending_pos;

// Actions called by the buttons
function create_wall_event() {
  flag_create_wall = true;
  flag_delete_wall = false;
  flag_change_starting_pos = false;
  flag_change_ending_pos = false;
}

function destroy_wall_event() {
  flag_create_wall = false;
  flag_delete_wall = true;
  flag_change_starting_pos = false;
  flag_change_ending_pos = false;
}

function change_start_event() {
  flag_create_wall = false;
  flag_delete_wall = false;
  flag_change_starting_pos = true;
  flag_change_ending_pos = false;
}

function change_end_event() {
  flag_create_wall = false;
  flag_delete_wall = false;
  flag_change_starting_pos = false;
  flag_change_ending_pos = true;
}

function mousePressed() {
  if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {

      has_reset = true;

      // Current ID of the cell below the mouse at the time of the click
      var current_cell_index_x = floor(mouseX / square_size);
      var current_cell_index_y = floor(mouseY / square_size);

      // field[x + y * row_size]

      var current_cell_index = current_cell_index_x + current_cell_index_y * row_size;
      var current_starting_index = current_starting_id.x + current_starting_id.y * row_size;
      var current_ending_index = current_ending_id.x + current_ending_id.y * row_size;

      if (flag_create_wall) {
        field[current_cell_index].obstacle = true;
        current_cell = field[current_starting_id.x + current_starting_id.y * row_size];
        // current_cell is used to restart the drawing on the initial position
        // rather than on whatever cell it was at the time of the click
      }

      else if (flag_delete_wall) {
        field[current_cell_index].obstacle = false;
        current_cell = field[current_starting_index];
      }

      // Exceptions are no longer a problem as field size is no longer variable
      else if (flag_change_starting_pos) {
        field[current_cell_index].start = true;
        current_cell = field[current_cell_index];
        try {
        field[current_starting_index].start = false;
        }
        catch(e) {
          console.log(e);
        }
        current_starting_id.x = current_cell_index_x;
        current_starting_id.y = current_cell_index_y;
      }

      else if (flag_change_ending_pos) {
        field[current_cell_index].flag = true;
        current_cell = field[current_starting_index];
        try {
        field[current_ending_index].flag = false;
        }
        catch(e) {
          console.log(e);
        }
        current_ending_id.x = current_cell_index_x;
        current_ending_id.y = current_cell_index_y;
        final_cell = field[current_cell_index];
      }

      else {
        current_cell = field[current_starting_index];
      }

      render_again();
  }
}

function render_again() {
  // Resets everything but keeps track of obstacles and endpoints
  stack = [];
  stack.push(current_cell);
  is_done = false;
  iteration = 0;
  path = [];
  var obs;
  for (var y = 0; y < row_size; y++) {
    for (var x = 0; x < row_size; x++) {
      if (field[x + y * row_size].obstacle) {
        obs = true;
      }
      field[x + y * row_size] = new cell(x,y);
      field[x + y * row_size].obstacle = obs;
      obs = false;
    }
  }
  field[current_starting_id.x + current_starting_id.y * row_size].start = true;
  field[current_ending_id.x + current_ending_id.y * row_size].flag = true;
  current_cell.addInstructions([current_cell.id]);
}

function preload() {
    img = loadImage('flag.jpg');
}


function cell(x, y) {
    this.index = createVector(x, y);
    this.pos = createVector(x * square_size, y * square_size);

    this.obstacle = false;
    this.flag = false;
    this.visited = false;
    this.start = false;

    // This array is passed from cell to cell in each iteration
    // and when it reaches the flag it uses them to draw the path
    this.instructions = [];

    // This receives past instructions
    this.addInstructions = function (instructions) {
        this.instructions = instructions.slice();
        // .copy() is needed otherwise JS just references the original array
        this.instructions.push(this.pos.copy());
    }

    this.draw = function () {
        if (this.obstacle) {
            fill(50);
            stroke(50);
        }
        else if (this.flag) {
            fill(0, 150, 0, 50);
            stroke(0);
            image(img, this.pos.x, this.pos.y, square_size, square_size);
        } else if (this.start) {
            fill(0, 40, 160);
            stroke(0, 40, 160);
        }
        else if (this.visited) {
            fill(22, 125, 255);
            stroke(22, 125, 255);
        } else {
            fill(165);
            stroke(120);
        }
        square(this.pos.x, this.pos.y, square_size);
    }
}


function getFinalPath(instructions) {
    // The first element of instructions[] is undefined
    instructions.shift();

    is_done = true;
    // .slice() is used to make a copy of the final instructions
    // This needs to be done because this method is called only once
    path = instructions.slice();
}


function changeEdges(arr, check, first, second, firstCheck, secondCheck) {
    arr[0] = first;
    arr[3] = second;
    check[0] = firstCheck;
    check[3] = secondCheck;
}

function changeMiddle(arr, check, first, second, firstCheck, secondCheck) {
    arr[1] = first;
    arr[2] = second;
    check[1] = firstCheck;
    check[2] = secondCheck;
}


function checkCurrent(current) {
    // If it no longer can check the next element on the stack[]
    // and hasn't found the way, it means there's no path
    try {
        current.visited = true;
    }
    catch (e) {
        console.log("No path");
        return;
    }

    fieldIndex = current.index.x + current.index.y * row_size;


    var left = field[fieldIndex - 1]; // The cell to the left
    var right = field[fieldIndex + 1]; // The cell to the right
    var up = field[fieldIndex - row_size]; // The cell above
    var down = field[fieldIndex + row_size]; // The cell below


    var first, second, third, fourth;

    // Conditions in which the cells to those directions exist
    var condition_left = current.index.x != 0;
    var condition_right = current.index.x != row_size - 1;
    var condition_up = current.index.y != 0;
    var condition_down = current.index.y != row_size - 1;


    var order = [first, second, third, fourth];
    var checks = [false, false, false, false];


    var deltax = final_cell.pos.x - current.pos.x;
    var deltay = final_cell.pos.y - current.pos.y;

    // If I find a better way to do this I'll make sure to change

    // Note: This is just a quick way I found of doing this, but
    // Djikstra's algorithm actually checks in a predefined order
    // and I wanted to make that order more dynamic to avoid cases
    // where the path would go all the way to one side then all
    // the way to the other, which would end up in a suboptimal
    // path. This could all be done with way less lines if that
    // were the case and I'd use vectors for this. 
     
    if (deltax >= deltay) {
        if (deltax >= 0) {
            changeEdges(order, checks, left, right, condition_left, condition_right);
            if (deltay >= 0) {
                changeMiddle(order, checks, down, up, condition_down, condition_up);
            } else {
                changeMiddle(order, checks, up, down, condition_up, condition_down);
            }
        }
        else {
            changeEdges(order, checks, right, left, condition_right, condition_left);
            if (deltay >= 0) {
                changeMiddle(order, checks, down, up, condition_down, condition_up);
            } else {
                changeMiddle(order, checks, up, down, condition_up, condition_down);
            }
        }
    }
    else {
        if (deltay >= 0) {
            changeEdges(order, checks, down, up, condition_down, condition_up);
            if (deltax >= 0) {
                changeMiddle(order, checks, right, left, condition_right, condition_left);
            } else {
                changeMiddle(order, checks, left, right, condition_left, condition_right);
            }

        } else {
            changeEdges(order, checks, up, down, condition_up, condition_down);
            if (deltax >= 0) {
                changeMiddle(order, checks, right, left, condition_right, condition_left);
            } else {
                changeMiddle(order, checks, left, right, condition_left, condition_right);
            }
        }
    }

    // Does the checking
    for (var op = 0; op < order.length; op++) {
        if (checks[op]) { // If it's not on the edges
            if ((!order[op].obstacle && !order[op].visited) && !stack.includes(order[op])) { // If it can be visited
                order[op].addInstructions(current.instructions.slice()); // Add a copy of the instructions from the current_cell cell to them
                stack.push(order[op]); // Add them to the stack
            }
            if (order[op].flag) { // If it's the flag
                getFinalPath(order[op].instructions); // Gets the path :D
                return;
            }
        }
    }
}


var randomNum;


function setup() {


    createCanvas(row_size * square_size, row_size * square_size);


    create_wall = createButton('Create walls');
    destroy_wall = createButton('Destroy walls');
    change_starting_pos = createButton('Change starting position');
    change_ending_pos = createButton('Change ending position');

    create_wall.mousePressed(create_wall_event);
    destroy_wall.mousePressed(destroy_wall_event);
    change_starting_pos.mousePressed(change_start_event);
    change_ending_pos.mousePressed(change_end_event);


    for (var y = 0; y < row_size; y++) {

        for (var x = 0; x < row_size; x++) {
        
            field[x + y * row_size] = new cell(x, y);
            randomNum = random(0, 1);

            if (randomNum < 0.35) {
                field[x + y * row_size].obstacle = true;
            }
        }
    }

    // Sets up the initial point
    current_cell = field[floor(random(0, pow(row_size, 2) - 1))];
    current_cell.instructions.push(current_cell.id);
    current_cell.start = true;
    current_cell.obstacle = false;
    current_starting_id = current_cell.index;
    stack.push(current_cell);

    // Sets up the final_cell point
    final_cell = field[floor(random(0, pow(row_size, 2) - 1))];
    final_cell.flag = true;
    final_cell.obstacle = false;
    current_ending_id = final_cell.index;
}


function draw() {

    for (var i = 0; i < field.length; i++) {
        field[i].draw();
    }

    if (!is_done) {
        checkCurrent(current_cell);
        iteration++;
        current_cell = stack[iteration];
    }
    else {
        for (var k = 0; k < path.length; k++) {
            fill(255, 0, 0);
            stroke(255, 0, 0);
            square(path[k].x, path[k].y, square_size);
        }
    }

}
