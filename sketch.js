let speed = 5; 
let railOffset = 0; 

let scenes = ["forest", "city","space","dessert","sea"];
let Scene;


let stars = [];
let ties = [];

let portal;
let portalColors = {};


function setup() {
  // scene = random(scenes);
  scene = "space";
  print(`The journey begins! The first spot is ${scene}.`);
  // create the canvas using the full browser window
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 600; i++) {
    stars[i] = new star();
  }
  
  portalColors = {
    forest: color(0, 128, 0),  // 使用RGB
    city: color(128, 128, 128),
    space: color(0, 0, 255),
    desert: color(255, 165, 0),
    sea: color(0, 128, 128),
  };
  portal = new Portal();
  
}

function draw() {
  // your cool abstract sonic artwork code goes in this draw function
  if (sceneFunctions[scene]) {
    sceneFunctions[scene]();
  }
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
    print("portal present!");
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


class Portal {
  constructor() {
    this.x = width / 2; 
    this.y = height / 2; 
    this.sizeFactor = 0.02; 
    this.active = false;
    this.scene = random(scenes);
    print(this.scene);
    
    do{this.scene = random(scenes)}
    while( this.scene == scene);
    
    this.color = portalColors[this.scene];
    print(this.color);
    
  }

  update() {
    if(this.active){
      
      this.sizeFactor = map(this. y, height / 2, height, 0.02, 0.4 );
      print(this.y);
      this.show();
      
      if (this.y > height) {
        scene = this.scene;
        this.reset();
      }
      this.y += 5; 
    }
  }
  
  show(){
     push();
      fill(color("red"));
      noStroke();
  
      let shortRadius = this.sizeFactor * width;
      let longRadius = this.sizeFactor * height * 3;
  
  
      arc(this.x, this.y, shortRadius, longRadius, PI, 0, CHORD);
      pop();
  }
  
  reset(){
    this.x = width / 2; 
    this.y = height / 2; 
    this.sizeFactor = 0.02; 
    this.active = false;
    this.scene = random(scenes);
    print(this.scene);
    
    do{this.scene = random(scenes)}
    while( this.scene == scene);
    
    this.color = portalColors[this.scene];
    print(this.color);
  }
  

}