let stars = [];
let speed = 5;
let setSpeed = 5;
let spaceshipActive = true;

function setup() {
  // create the canvas using the full browser window
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // your cool abstract sonic artwork code goes in this draw function
  
}

// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "thumbnail.png" file) to your downloads folder.
// make sure you add and commit the image to the root folder of this repo.
function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }
}

function drawRails() {
  stroke(255); 
  strokeWeight(10); 


  for (let i = 0; i < 20; i++) {
    let progress = (i + railOffset) % 50; 

    let y = map(progress, 0, 50, height, height / 2);

    let leftX = map(progress, 0, 50, width * 0.25, width / 2);
    let rightX = map(progress, 0, 50, width * 0.75, width / 2);

    line(leftX, y, rightX, y);
  }

  strokeWeight(5); 
  line(width * 0.1, height, width / 2, height / 2); 
  line(width * 0.9, height, width / 2, height / 2); 

  railOffset += speed * 0.1;
}

function drawDessert(){
  
};

function drawForest(){
  
};

function drawCity(){
  
};

function drawSea(){
  
};

function drawSpace(){
  
};