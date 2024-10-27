// Global variables
let moonSize;
let eyeCircle = 0;
let eyeRandom = 0;
let maxPyramids = 1;
let pyramids = [];
let count = 0;
let cycleDuration = 1440;

// let eyeOpen = false;
let eyeOpen = true;
let mountainGreen = 0;

function setDesert() {
  pyramids.push(new Pyramid("left"));
  pyramids.push(new Pyramid("right"));
}

// Main drawing function
function drawDesert() {
  moonSize = 0.2 * width;

  count++;
  // print(count);
  if (count > cycleDuration) {
    count = 0;
  }
  let t = (count % cycleDuration) / cycleDuration;

  // Draw scene elements in order
  drawSky(t);
  drawPlanet(height * 0.9, 0, t);
  drawGround(t);
  drawPyramid();
}

// Sky drawing function with day/night cycle
function drawSky(t) {
  const dayColor1 = color(51, 9, 5);
  const nightColor1 = color(251, 180, 88);
  let bgColor;

  if (t < 0.25) {
    bgColor = lerpColor(dayColor1, nightColor1, (t + 0.25) * 2);
  } else if (t < 0.75) {
    bgColor = lerpColor(nightColor1, dayColor1, (t - 0.25) * 2);
  } else {
    bgColor = lerpColor(dayColor1, nightColor1, (t - 0.75) * 2);
  }

  background(bgColor);
}

// Ground drawing function
function drawGround(t) {
  push();

  // Draw the land
  const dayColor2 = color(245, 67, 54);
  const nightColor2 = color(254, 160, 64);
  let groundColor;

  if (t < 0.25) {
    groundColor = lerpColor(dayColor2, nightColor2, (t + 0.25) * 2);
  } else if (t < 0.75) {
    groundColor = lerpColor(nightColor2, dayColor2, (t - 0.25) * 2);
  } else {
    groundColor = lerpColor(dayColor2, nightColor2, (t - 0.75) * 2);
  }
  strokeWeight(0);
  fill(groundColor);
  rect(0, height * 0.5, width, height * 0.5);

  // Draw background mountains (first layer)
  let colorM1;
  if (mountainGreen > 0) {
    colorM1 = color("#8BC34A");
  } else {
    colorM1 = color("black");
  }
  colorM1.setAlpha(150);

  fill(colorM1);
  beginShape();
  vertex(0, height * 0.5);
  vertex(width * 0.2, height * 0.35);
  vertex(width * 0.4, height * 0.4);
  vertex(width * 0.7, height * 0.3);
  vertex(width, height * 0.5);

  endShape(CLOSE);

  // Draw closer mountains (second layer)
  if (mountainGreen > 1) {
    colorM1 = color("#8BC34A");
  } else {
    colorM1 = color(30, 30, 30);
  }
  colorM1.setAlpha(200);
  fill(colorM1);

  beginShape();
  vertex(0, height * 0.5);
  vertex(width * 0.3, height * 0.4);
  vertex(width * 0.5, height * 0.35);
  vertex(width * 0.8, height * 0.42);
  vertex(width, height * 0.5);

  endShape(CLOSE);

  if (mountainGreen > 1) {
    stroke(255);
    strokeWeight(5);
    noFill();

    if (
      isHoveredMountain(width * 0.2, height * 0.35, width * 0.4) ||
      isHoveredMountain(width * 0.3, height * 0.4, width * 0.5)
    ) {
      beginShape();
      vertex(0, height * 0.5);
      vertex(width * 0.2, height * 0.35);
      vertex(width * 0.4, height * 0.4);
      vertex(width * 0.7, height * 0.3);
      vertex(width, height * 0.5);

      endShape(CLOSE);

      beginShape();
      vertex(0, height * 0.5);
      vertex(width * 0.3, height * 0.4);
      vertex(width * 0.5, height * 0.35);
      vertex(width * 0.8, height * 0.42);
      vertex(width, height * 0.5);
      endShape(CLOSE);
    }
  }

  if (mouseIsPressed && mountainGreen > 1) {
    if (
      isHoveredMountain(width * 0.2, height * 0.35, width * 0.4) ||
      (isHoveredMountain(width * 0.3, height * 0.4, width * 0.5) &&
        !portal.active)
    ) {
      portal.open("forest");
    }
  }
  pop();
}

function isHoveredMountain(mx, my, size) {
  return dist(mouseX, mouseY, mx, my) < size / 2;
}

// Planet (sun/moon) drawing function
function drawPlanet(x, y, t) {
  push();
  translate(width / 2, height);
  let angle = map(t, 0, 1, 0, TWO_PI);
  rotate(angle);

  // Moon
  fill(255);
  circle(x, -y, moonSize);
  drawMoonTexture(x, -y);

  // Eye
  if (eyeOpen) {
    drawEye(x, 0, PI / 2, t + eyeRandom, 100, 40);
    
    // Check if the mouse is hovering over the moon
    let moonX = x;
    let moonY = -y;

    let isHoveredMoon = mouseY < 0.2 *  height;
    if (isHoveredMoon && count > 900 && count < 1200) {
      stroke(255, 215, 0); 
      strokeWeight(5);
      noFill();
      circle(moonX, moonY, moonSize);
      if (mouseIsPressed && !portal.active){
        portal.open("sea");
      }
    }
  }

  // Sun
  fill(255, 204, 0);
  circle(-x, y, 250);
  pop();
}

// Moon texture drawing function
function drawMoonTexture(x, y) {
  push();
  let numRings = int(map(moonSize, 180, 250, 5, 10));
  stroke(255, 200);
  strokeWeight(1);
  noFill();

  for (let i = 0; i < numRings; i++) {
    let ringRadius = moonSize * 0.2 + i * ((moonSize * 0.1) / numRings);
    let noiseFactor = noise(i + frameCount * 0.1) * 5;
    circle(x, y, ringRadius + noiseFactor);
  }
  pop();
}

// Eye drawing function
function drawEye(x, y, r, t, outerSize, innerSize) {
  push();
  translate(x, y);
  rotate(r);

  fill(65, 98, 112);
  let eyeOpen =
    innerSize +
    (outerSize - innerSize) / 10 +
    ((outerSize - innerSize) / 4) * (1 + sin(t * 30));
  ellipse(0, 0, outerSize, eyeOpen);

  fill(0);
  circle(0, 0, innerSize);
  pop();
}

// Desert scene with pyramids
function drawPyramid() {
  // Draw pyramids
  push();
  rectMode(CENTER);
  translate(width / 2, height / 2);
  for (let i = pyramids.length - 1; i >= 0; i--) {
    pyramids[i].update();
    pyramids[i].show();

    if (pyramids[i].z < -100) {
      pyramids.splice(i, 1);
      pyramids.push(new Pyramid());
    }
  }
  pop();
}

class Pyramid {
  constructor(side) {
    this.reset(side);
  }

  // Reset the position and size of the pyramid
  reset(side) {
    do {
      if (side == "left") {
        this.x = random(-0.5 * width, 0);
      } else if (side == "right") {
        this.x = random(0, 0.5 * width);
      }
    } while (this.x > -0.2 * width && this.x < 0.2 * width);

    this.y = random(0, height * 0.07);
    this.z = width + height;
    this.side = "side";

    let types = ["night", "day", "eye", "forest", "normal"];
    this.type = random(types);
    this.clicked = false;
  }

  update() {
    this.z -= speed;
    if (this.z < 1) {
      this.reset(this.side);
    }

    this.sx = map(this.x / this.z, 0, 1, 0, width);
    this.sy = map(this.y / this.z, 0, 1, 0, height);
    this.size = map(this.z, 0, width + height, width * 0.4, 0);

    this.isClicked();
  }

  show() {
    push();

    // Draw the main body of the pyramid
    fill(this.getColorBasedOnType());

    noStroke();

    triangle(
      this.sx - this.size / 2,
      this.sy,
      this.sx + this.size / 2,
      this.sy,
      this.sx,
      this.sy - this.size
    );

    // Draw the side of the pyramid
    fill(194, 144, 53);
    beginShape();
    vertex(this.sx, this.sy - this.size);
    vertex(this.sx + this.size / 2, this.sy);
    vertex(this.sx, this.sy);
    endShape(CLOSE);

    if (this.isHovered()) {
      stroke(255);
      strokeWeight(0.05 * this.size);
      noFill();
      triangle(
        this.sx - this.size / 2,
        this.sy,
        this.sx + this.size / 2,
        this.sy,
        this.sx,
        this.sy - this.size
      );
    }
    pop();
  }

  isClicked() {
    if (mouseIsPressed) {
      if (this.isHovered() && this.clicked == false) {
        this.clicked = true;
        switch (this.type) {
          case "forest":
            mountainGreen++;
          case "normal":
            break;
          case "eye":
            eyeOpen = true;
            break;
          case "night":
            count = 1080;
            break;
          case "day":
            count = 360;
            break;
        }
      }
    }
  }

  isHovered() {
    return (
      dist(mouseX - 0.5 * width, mouseY - 0.5 * height, this.sx, this.sy) <
      this.size / 2
    );
  }

  getColorBasedOnType() {
    switch (this.type) {
      case "forest":
        return "green";
      case "normal":
        return "#FFC107";
      case "eye":
        return "rgb(195,195,195)";
      case "night":
        return "black";
      case "day":
        return "#E7D748";
    }
  }
}
