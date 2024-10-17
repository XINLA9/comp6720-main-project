let speed = 5; 
let railOffset = 0; 

let scenes = ["forest", "city","space","dessert","sea"];
let scene ;
let Scene;

let stars = [];
let ties = [];

let portal;
let portalActive;


function setup() {
  // create the canvas using the full browser window
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 600; i++) {
    stars[i] = new star();
  }

  // scene = random(scenes);
  scene = "space";
  portal = new Portal();
  portal = new Portal
}

function draw() {
  // your cool abstract sonic artwork code goes in this draw function
  if (sceneFunctions[scene]) {
    sceneFunctions[scene]();
  }
  drawRails(); 
}

// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "thumbnail.png" file) to your downloads folder.
// make sure you add and commit the image to the root folder of this repo.
function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }
  if (keyCode === RIGHT_ARROW) {
    portalActive = true; 
  }
}

function drawRails() {
  push();
  fill("sienna");
  stroke("sienna");
  strokeWeight(2);

  for (let i = 0; i < ties.length; i++) {
    ties[i].update();
    ties[i].show();
  }
  pop();

  for (let i = 0; i < 1; i++) {
    let progress = (i + railOffset) % 50;

    let y = map(progress, 0, 50, height / 2, height);
    let widthFactor = pow(progress / 50, 1.2); 

    let leftXTop = map(widthFactor, 0, 1, width / 2, width * 0.1);
    let rightXTop = map(widthFactor, 0, 1, width / 2, width * 0.9);
    let leftXBottom = map(widthFactor, 0, 1, width / 2, width * 0.08);
    let rightXBottom = map(widthFactor, 0, 1, width / 2, width * 0.92);
    
    let thick = map(progress, 2, 5, 0, 40);

    quad(
      leftXTop, y - progress, 
      rightXTop, y - progress, 
      rightXBottom, y + progress, 
      leftXBottom, y + progress
    );
  }
  pop();

  push();
  noStroke();
  fill("grey");
  
  quad(width * 0.1,height,
    width * 0.16,height,
    width * 0.49, height / 2,
    width * 0.48,height /2);
  
  quad(width * 0.9,height,
    width * 0.84,height,
    width * 0.51, height / 2,
    width * 0.52,height / 2);
  fill(70);
  quad(width * 0.17,height,
    width * 0.16,height,
    width * 0.49, height / 2,
    width * 0.491,height /2);
  
  quad(width * 0.84,height,
    width * 0.82,height,
    width * 0.51, height / 2,
    width * 0.511,height /2);
  
  pop();
  

  railOffset += speed * 0.1;
}

 const sceneFunctions = {
  forest: drawForest,
  city: drawCity,
  space: drawSpace,
  desert: drawDesert,
  sea: drawSea,
};

function drawForest(){
  background("green");
};

function drawCity(){
  background("grey");
};

function drawSea(){
  background("blue");
};

function drawSpace(){
  background("purple");
  
   // draw space and stars
  push();
  rectMode(CENTER);
  translate(width / 2, height / 2)
  background(5);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
  pop();
  
};

function drawDesert(){
  background("yellow");
};


class star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);

    let types = [
      { color: [255, 255, 255], name: "normal stars", size: 1 },
      { color: [244, 254, 255], name: "white dwarf", size: 1 },
      { color: [169, 200, 125], name: "red gaint", size: 1 },
      { color: [198, 173, 212], name: "blue supergaint", size: 1 }
    ];

    let tpyeNum = random(0, 1);
    if (
      tpyeNum < 0.9) {
      this.starsType = types[0];
    } else if (
      tpyeNum >= 0.9 && tpyeNum < 0.93) {
      this.starsType = types[1];
    } else if (
      tpyeNum >= 0.93 && tpyeNum < 0.96) {
      this.starsType = types[2];
    } else if (tpyeNum >= 0.96) {
      this.starsType = types[3];
    }

  }

  update() {
    this.z -= speed;
    if (this.z < 1) {
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = width;
    }
  }

  show() {

    push();
    fill(this.starsType.color);

    noStroke();

    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

    let r = map(this.z, 0, width, this.starsType.size * 6, 0);
    ellipse(sx, sy, r, r);
    pop()

  }
}

const portalColor = {
  forest: color("green"),

}

class Portal {
  constructor() {
    this.x = width / 2; 
    this.y = height / 2; 
    this.sizeFactor = 0.02; 
    do{this.scene = random[scenes]}
    while( this.scene == scene);
  }

  update() {
    this.y -= 5; 
    this.sizeFactor = map(y, height / 2, height, 0.02, 0.4 );
    
    if (this.y < height / 2 && this.size >= this.targetSize) {
      this.switchScene(); 
      portalActive = false; 
    }
  }

  show() {
    push();
    fill(this.color); 
    noStroke();
    rect()
    pop();
  }

  switchScene() {
    // 随机切换到一个新场景
    let newScene;
    do {
      newScene = random(scenes);
    } while (newScene === scene); // 确保不会切换到相同场景
    scene = newScene;
  }
}