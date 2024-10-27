let scenes = ["forest", "space", "desert", "sea", "mf"];
let scene;
let portal;


function setup() {
  // scene = random(scenes);
  scene = "space";
  // scene = "desert";
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

   // set preset background color
   presetBgColors = [
    color(200),
    color(210),
    color(220)
  ];


  // Initialize oscillator and envelope
  osc = new p5.Oscillator('sine');
  osc.start();
  osc.amp(0);

  env = new p5.Envelope();
  env.setADSR(0.01, 0.2, 0.5, 0.1);
  env.setRange(1, 0);

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
    
    print(portal.scene);
    portal.active = true;
    
  }
  if (keyCode === UP_ARROW && speed < 5) {
    speed +=0.1;
  }
  if (keyCode === DOWN_ARROW && speed > 3.5) {
    speed -=0.1;
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
  forest: drawForest,
  space: drawSpace,
  desert: drawDesert,
  sea: drawSea,
  mf: drawMagicForest
};
