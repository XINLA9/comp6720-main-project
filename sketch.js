let scene;
let portal;
let isClicked = false;

function setup() {
  // scene = random(scenes);
  scene = "space";
  // scene = "desertM";
  // scene = "forest";
  // scene = "sea";
  // create the canvas using the full browser window
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 600; i++) {
    stars[i] = new Star();
  }

  setRail();
  portal = new Portal();

  setSpace();
  setDesert();

  // Initialize oscillator and envelope
  osc = new p5.Oscillator("sine");
  osc.start();
  osc.amp(0);

  env = new p5.Envelope();
  env.setADSR(0.01, 0.2, 0.5, 0.1);
  env.setRange(1, 0);
}

function draw() {
  // your cool abstract sonic artwork code goes in this draw function
  // print(scene);
  sceneFunctions[scene]();

  drawRails();

  portal.update();

  if (!mouseIsPressed) {
    isClicked = false;
  }
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
    // print(portal.scene);
    // portal.active = true;
  }
  if (keyCode === UP_ARROW && speed < 8) {
    speed += 0.5;
  }
  if (keyCode === DOWN_ARROW && speed > 3.5) {
    speed -= 0.5;
  }
}

// Mouse press generates ripples
function mousePressed() {
  // Limit the number of ripples to 3; create new ones only after the previous ones disappear
  if (scene == "sea" && ripples.length < 3) {
    let newRipple = new Ripple(mouseX, mouseY);
    ripples.push(newRipple);
  }
}

const sceneFunctions = {
  space: drawSpace,
  forest: drawForest,
  desert: drawDesert,
  sea: drawSea,
  forestM: drawForestM,
  desertM: drawDesertM,
  seaM: drawSeaM,
};
