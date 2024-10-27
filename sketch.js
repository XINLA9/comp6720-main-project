let scenes = ["forest", "space", "desert", "sea"];
let scene;
let portal;


function setup() {
  // scene = random(scenes);
  scene = "space";
  scene = "desert";
  // create the canvas using the full browser window
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 600; i++) {
    stars[i] = new Star();
  }

  portalColors = {
    forest: color(0, 128, 0),
    space: color(0, 0, 255),
    desert: color(255, 165, 0),
    sea: color(0, 128, 128),
  };

  setRail();
  portal = new Portal();
  
  setSpace();
  setDesert();

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
  }
  if (keyCode === UP_ARROW && speed < 5) {
    speed +=0.1;
  }
  if (keyCode === DOWN_ARROW && speed > 3.5) {
    speed -=0.1;
  }
}

const sceneFunctions = {
  forest: drawForest,
  space: drawSpace,
  desert: drawDesert,
  sea: drawSea,
};
