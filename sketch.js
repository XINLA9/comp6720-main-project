let speed = 5; 
let railOffset = 0; 

let scenes = ["forest", "space","desert","sea"];
let Scene;


let stars = [];
let sleepers = [];

let portal;
let portalColors = {};


function setup() {
  // scene = random(scenes);
  scene = "space";
  // print(`The journey begins! The first spot is ${scene}.`);
  // create the canvas using the full browser window
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 600; i++) {
    stars[i] = new star();
  }
  
  portalColors = {
    forest: color(0, 128, 0),  
    space: color(0, 0, 255),
    desert: color(255, 165, 0),
    sea: color(0, 128, 128),
  };
  
  portal = new Portal();

  for (i = 0; i <= 10; i++){
    tie = new Sleeper(i);
    sleepers.push(tie);    
  }
  
}

function draw() {
  // your cool abstract sonic artwork code goes in this draw function
  sceneFunctions[scene]();
  
  drawRails(); 
  
  portal.update();

}

// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "thumbnail.png" file) to your downloads folder.
// make sure you add and commit the image to the root folder of this repo.
function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }

}

function keyPressed() {
  if (keyCode === RIGHT_ARROW && portal.active === false) {
    portal.active = true;
    // print("portal present!");
  }
}


 const sceneFunctions = {
  forest: drawForest,
  space: drawSpace,
  desert: drawDesert,
  sea: drawSea,
};

