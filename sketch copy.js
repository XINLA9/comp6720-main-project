let stars = [];
let speed = 5;
let setSpeed = 5;
let spaceshipActive = true;

function setup() {
  // create the canvas (1200px wide, 800px high)
  createCanvas(1200, 800);

  // draw a border to help you see the size
  // this isn't compulsory (remove this code if you like)
  strokeWeight(5);
  rect(0, 0, width, height);

  for (let i = 0; i < 600; i++) {
    stars[i] = new star();
  }

  rectMode(CENTER);
}

function draw() {

  if (spaceshipActive) {
    if (speed < setSpeed) {
      speed += 0.1;
    } else if (speed > setSpeed) {
      speed -= 0.1;
    }
  } else {
    if (speed > 0) {
      speed -= 0.1;
    }
  }

  // draw space and stars
  push();
  translate(width / 2, height / 2)
  background(5);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
  pop();

  // your cool workstation code goes in this draw function

  drawCover()

  drawWindowFrame()

  drawScreem();

  drawControlPanel();

  drawLight()

}

// define color
let frameColor1 = 100;
let frameColor2 = 70;
let frameColor3 = 50;
let windowC1 = 200;
let interfareC;

function drawWindowFrame() {
  push();
  strokeWeight(0);
  fill(frameColor1);
  rect(width / 2, 50, width, 100);
  rect(width / 2, height - 50, width, 100);

  fill(frameColor2);
  rect(width / 2, 90, width, 20);
  rect(width / 2, height - 90, width, 20);

  fill(frameColor3);
  rect(135, height / 2, 70, height);
  rect(1065, height / 2, 70, height);
  pop();
}

function drawControlPanel() {

  interfareC = color(182, 116, 42, 180);
  // interfareC = color(255, 255, 255, 50);

  // Drawing the Operator Panel Background
  fill(180);
  rect(width / 2, height - 50, 50, 200);
  fill(interfareC);
  rect(width / 2, height - 250, 300, 200);
  fill(234, 169, 39, 100);
  rect(width / 2 - 100, height - 250, 80, 180);
  rect(width / 2 + 45, height - 200, 180, 80);
  fill(255, 255, 255, 200);
  rect(width / 2 + 45, height - 300, 180, 80);

  // Drawing acceleration, deceleration, start/stop buttons
  fill(234, 169, 39);
  noStroke();
  triangle(width / 2 - 100, height - 332, width / 2 - 80, height - 302, width / 2 - 120, height - 302); // Up arrow (accelerate)
  triangle(width / 2 - 100, height - 244, width / 2 - 80, height - 274, width / 2 - 120, height - 274); // Down arrow (decelerate)
  fill(255, 37, 39);
  ellipse(width / 2 - 100, height - 199, 40, 40); // Circle button (start/stop)

  // Drawing light switches and visor switches
  fill(255, 255, 0);
  ellipse(width / 2 - 10, height - 199, 40, 40); // Circle button for light
  fill(150, 255, 150);
  ellipse(width / 2 + 45, height - 199, 40, 40); // Circle button for cover
  fill(150, 150, 250);
  ellipse(width / 2 + 100, height - 199, 40, 40); // Circle button for screem

  // Display button name
  textSize(12);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Accelerate", width / 2 - 100, height - 287);
  text("Decelerate", width / 2 - 100, height - 230);
  text("Start/Stop", width / 2 - 100, height - 168);
  text("Light", width / 2 - 10, height - 168);
  text("Cover", width / 2 + 45, height - 168);
  text("Screem", width / 2 + 100, height - 168);

  // Displaying the ship's status
  textSize(15);
  textAlign(LEFT);
  fill(100);
  text("Speed: " + Math.round(speed) + " km/s", width / 2 - 30, height - 310);
  text("Spaceship: " + (spaceshipActive ? "Active" : "Inactive"), width / 2 - 30, height - 280);
}

let screemHeight = -150;
let screemActive = false;
function drawScreem() {
  interfareC = color(182, 116, 42, 180);

  // Drawing the Operator Panel Background
  fill(180);
  rect(width / 2, screemHeight - 250, 50, 200);
  fill(180,180,180,100);
  rect(width / 2, screemHeight, 500, 300);
  fill(255, 255, 255, 200);
  rect(width / 2, screemHeight, 480, 280);

  if (screemActive) {
    screemHeight += 3;
  }
  else {
    screemHeight -= 3;
  }
  if (screemHeight > 250) {
    screemHeight = 250
  }
  else if (screemHeight < -150) {
    screemHeight = -150;
  }
  pop();
}

let coverHeight = 800;
let coverActive = false;

function drawCover() {
  push();
  rectMode(CORNER);
  stroke(40);
  fill(24, 32, 32);
  rect(-20, coverHeight, 290, 600);
  rect(170, coverHeight, 290, 600);
  rect(460, coverHeight, 290, 600);
  rect(750, coverHeight, 300, 600);
  rect(1050, coverHeight, 300, 600);


  if (coverActive) {
    coverHeight -= 3;
  }
  else {
    coverHeight += 3;
  }
  if (coverHeight > 800) {
    coverHeight = 800
  }
  else if (coverHeight < 100) {
    coverHeight = 100;
  }
  pop();

}

let lightActive = true;

function drawLight() {
  noStroke();
  rectMode();
  fill(24, 32, 33);
  rect(135, 0, 100, 80);
  rect(1065, 0, 100, 80);
  if (lightActive) {
    push();
    noStroke
    fill(255, 255, 255, 30);
    beginShape();
    vertex(85, 39);
    vertex(-110, height);
    vertex(400, height);
    vertex(185, 39);

    vertex(85 + 930, 39);
    vertex(-110 + 930, height);
    vertex(400 + 930, height);
    vertex(185 + 930, 39);
    endShape();
    pop();
  }
}

function mousePressed() {
  // Check if mouse is over the up arrow (accelerate)
  if (mouseX > width / 2 - 120 && mouseX < width / 2 - 80 && mouseY > height - 332 && mouseY < height - 302) {
    if (setSpeed < 20) {
      setSpeed += 1; // Increase speed
    }
  }

  // Check if mouse is over the down arrow (decelerate)
  if (mouseX > width / 2 - 120 && mouseX < width / 2 - 80 && mouseY > height - 274 && mouseY < height - 244) {
    if (setSpeed > 5) {
      setSpeed -= 1; // Decrease speed
    }
  }

  // Check if mouse is over the circle button (start/stop)
  if (dist(mouseX, mouseY, width / 2 - 100, height - 198) < 20) {
    spaceshipActive = !spaceshipActive; // Toggle spaceship state
  }

  // Check if mouse is over the light switch
  if (dist(mouseX, mouseY, width / 2 - 10, height - 198) < 20) {
    lightActive = !lightActive; // Toggle light state
  }

  // Check if mouse is over the cover switch
  if (dist(mouseX, mouseY, width / 2 + 45, height - 198) < 20) {
    coverActive = !coverActive; // Toggle cover state
  }

  // Check if mouse is over the screem switch
  if (dist(mouseX, mouseY, width / 2 + 100, height - 198) < 20) {
    screemActive = !screemActive; // Toggle screem state
  }
}


// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "thumbnail.png" file) to your downloads folder
function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }
}

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