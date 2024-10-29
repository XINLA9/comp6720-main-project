let obelisks = [];
let templeCount = 0;

function drawDesertM() {
  background("rgb(82,24,0)");
  push();
  noStroke();
  fill("rgb(162,107,0)");
  rect(0, 0, width, 0.5 * height);
  pop();

  drawTemple();

  drawObelisks();

  if ((templeCount > 1200) & !portal.active) {
    portal.open("desert");
  }
}

function drawTemple() {
  // Draw road
  fill("rgb(162,107,0)");
  quad(
    width * 0.05,
    height,
    width * 0.95,
    height,
    width * 0.52,
    height / 2,
    width * 0.48,
    height / 2
  );

  // Draw temple
  fill("rgb(239,199,41)");

  beginShape();
  vertex(width * 0.39, height * 0.5);
  vertex(width * 0.4, height * 0.4);
  vertex(width * 0.35, height * 0.4);
  vertex(width * 0.35, height * 0.37);
  vertex(width * 0.3, height * 0.37);
  vertex(width * 0.3, height * 0.34);
  vertex(width * 0.5, height * 0.36);

  vertex(width * 0.7, height * 0.34);
  vertex(width * 0.7, height * 0.37);
  vertex(width * 0.65, height * 0.37);
  vertex(width * 0.65, height * 0.4);
  vertex(width * 0.6, height * 0.4);
  vertex(width * 0.61, height * 0.5);
  vertex(width, height * 0.5);

  endShape(CLOSE);

  // Draw sun
  push();
  rectMode(CENTER);
  translate(width / 2, height * 0.2);

  fill("rgb(255,239,148)");
  let numPoints = 8;
  let innerRadius = width * 0.22;
  let outerRadius = width * 0.05;
  let angleStep = TWO_PI / numPoints;

  rotate(frameCount * 0.01);
  beginShape();
  for (let i = 0; i < numPoints * 2; i++) {
    let angle = (i * angleStep) / 2;
    let radius = i % 2 === 0 ? outerRadius : innerRadius;
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    vertex(x, y);
  }
  endShape(CLOSE);
  fill(255);
  circle(0, 0, width / 18);
  pop();
}

function drawObelisks() {
  push();
  rectMode(CENTER);
  translate(width / 2, height / 2);

  templeCount++;

  if (templeCount % 200 == 0) {
    obelisks.push(new Obelisk("left"));
    obelisks.push(new Obelisk("right"));
  }

  for (let i = obelisks.length - 1; i >= 0; i--) {
    obelisks[i].update();
    obelisks[i].show();

    if (obelisks[i].z < 0) {
      obelisks.splice(i, 1);
      obelisks.push(new Obelisk());
    }
  }
  pop();
}

class Obelisk {
  constructor(side) {
    this.reset(side);
  }

  reset(side) {
    if (side === "left") {
      this.x = -0.3 * width;
    } else if (side === "right") {
      this.x = 0.3 * width;
    }

    this.y = 0.01 * height;
    this.z = width + height;
    this.side = side;

    let types = ["granite", "limestone", "sandstone"];
    this.type = random(types);
    this.clicked = false;
  }

  update() {
    this.z -= speed;

    this.sx = map(this.x / this.z, 0, 1, 0, width);
    this.sy = map(this.y / this.z, 0, 1, 0, height);
    this.baseSize = map(this.z, 0, width + height, width * 0.15, 0);
    this.height = this.baseSize * 2;

    this.isClicked();
  }

  show() {
    push();

    fill(this.getColorBasedOnType());
    noStroke();
    beginShape();
    vertex(this.sx - this.baseSize / 2, this.sy);
    vertex(this.sx + this.baseSize / 2, this.sy);
    vertex(this.sx + this.baseSize / 4, this.sy - this.height);
    vertex(this.sx - this.baseSize / 4, this.sy - this.height);
    endShape(CLOSE);

    fill(194, 144, 53);
    beginShape();
    vertex(this.sx - this.baseSize / 4, this.sy - this.height);
    vertex(this.sx + this.baseSize / 4, this.sy - this.height);
    vertex(this.sx, this.sy - this.height - this.baseSize / 2);
    endShape(CLOSE);

    pop();
  }

  getColorBasedOnType() {
    switch (this.type) {
      case "granite":
        return color(169, 169, 169);
      case "limestone":
        return color(255, 250, 240);
      case "sandstone":
        return color(210, 180, 140);
      default:
        return color(200);
    }
  }

  isClicked() {
    if (
      mouseIsPressed &&
      dist(mouseX, mouseY, this.sx, this.sy) < this.baseSize / 2
    ) {
      this.clicked = true;
      console.log("Obelisk clicked!");
    }
  }
}
