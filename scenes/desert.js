// Global variables
let moonSize;
let eyeCircle = 0;
let eyeRandom = 0;
let maxPyramids = 1;
let pyramids = [];


function setDesert() {
  // for (let i = 0; i < maxPyramids; i++) {
  //   pyramids.push(new Pyramid());
  // }
  pyramids.push(new Pyramid("left"));
  pyramids.push(new Pyramid("right"));
}

// Main drawing function
function drawDesert() {
  moonSize = 0.2 * width;
  let cycleDuration = 1440;
  let t = (frameCount % cycleDuration) / cycleDuration;

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
  drawEye(x, 0, PI / 2, t + eyeRandom, 100, 40);

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
    print("123");
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
    this.reset(side)
  }

  // Reset the position and size of the pyramid
  reset() {
    do {
      this.x = random(- 0.5 *width, 0.5 * width);
    } while (this.x > - 0.3 * width && this.x < 0.3 * width);
    this.y = random(0, height * 0.3);
    this.z = width + height;

    this.sx = 0;
    this.sy = 0;
    this.size = 0;

    this.scene = random(scenes);
    do this.scene = random(scenes);
    while (this.scene == "space");
  }

  update() {
    this.z -= speed;
    if (this.z < 1) {
      this.reset();
    }

    this.sx = map(this.x / this.z, 0, 1, 0, width);
    this.sy = map(this.y / this.z, 0, 1, 0, height);
    this.size = map(this.z, 0, width + height, width * 0.4, 0);

    this.isClicked();
  }

  show() {
    push();

    fill(this.getColorBasedOnScene());

    noStroke();

    triangle(
      this.sx - this.size / 2, this.sy,
      this.sx + this.size / 2, this.sy,
      this.sx, this.sy - this.size
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
      ellipse(this.sx, this.sy, this.size, this.size);
    }
    pop();
  }

  isClicked() {
    if (mouseIsPressed) {
      if (this.isHovered()) {
        portal.open(this.scene);
      }
    }
  }

  isHovered() {
    return (
      dist(mouseX - 0.5 * width, mouseY - 0.5 * height, this.sx, this.sy) <
      this.size / 2
    );
  }

  getColorBasedOnScene() {
    switch (this.scene) {
      case "forest":
        return [34, 139, 34];
      case "desert":
        return "yellow";
      case "sea":
        return [0, 105, 148];
      case "space":
        return [0, 105, 148];
    }
  }
}

