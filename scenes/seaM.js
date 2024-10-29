let toriis = [];
let seaCount = 0;

function drawSeaM() {
  background(15, 58, 84);
  push();
  noStroke();
  fill("#607D8B");
  rect(0, 0.5 * height, width, 0.5 * height);
  pop();

  drawShrine();
  drawTorii();

  if ((seaCount > 600) & !portal.active) {
    portal.open("space");
  }
}

function drawShrine() {
  push();
  // Draw road
  fill("#9E9E9E");
  quad(
    width * -0.15,
    height,
    width * 1.15,
    height,
    width * 0.52,
    height / 2,
    width * 0.48,
    height / 2
  );

  // Draw shrine
  fill("rgb(255,255,255)");
  beginShape();
  
  vertex(width * 0.32, height * 0.32);
  vertex(width * 0.31, height * 0.5);
  vertex(width * 0.45, height * 0.5);
  vertex(width * 0.45, height * 0.4);
  vertex(width * 0.55, height * 0.4);
  vertex(width * 0.55, height * 0.5);
  vertex(width * 0.69, height * 0.5);
  vertex(width * 0.68, height * 0.32);
  
  endShape(CLOSE);

  fill("#F44336");
  beginShape();
  vertex(width * 0.29, height * 0.34);
  vertex(width * 0.29, height * 0.3);
  vertex(width * 0.71, height * 0.3);
  vertex(width * 0.71, height * 0.34);
  endShape(CLOSE);

  fill("#343232");
  beginShape();
  vertex(width * 0.33, height * 0.3);
  vertex(width * 0.33, height * 0.2);
  vertex(width * 0.67, height * 0.2);
  vertex(width * 0.67, height * 0.3);
  endShape(CLOSE);

  fill("#FF0000");
  beginShape();
  vertex(width * 0.15, height * 0.17);
  vertex(width * 0.33, height * 0.2);
  vertex(width * 0.67, height * 0.2);
  vertex(width * 0.85, height * 0.17);
  endShape(CLOSE);
  
  fill("#6C6B6B");
  beginShape();
  vertex(width * 0.15, height * 0.17);
  vertex(width * 0.31, height * 0.11);
  vertex(width * 0.33, height * 0.03);
  vertex(width * 0.67, height * 0.03);
  vertex(width * 0.69, height * 0.11);
  vertex(width * 0.85, height * 0.17);
  endShape(CLOSE);

  

  fill("rgb(239,199,41)");
  beginShape();

  endShape(CLOSE);

  pop();
}

function drawTorii() {
  push();

  seaCount++;

  if (seaCount % 60 == 0) {
    toriis.push(new Torii());
  }

  for (let i = toriis.length - 1; i >= 0; i--) {
    toriis[i].update();
    toriis[i].show();

    if (toriis[i].z < 0) {
      toriis.splice(i, 1);
      toriis.push(new Torii());
    }
  }
  pop();
}

class Torii {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
  }

  update() {
    this.speed = getYSpeed(this.y);
    this.y += this.speed;
  }

  show() {
    push();
    noStroke();
    let x = 1.2 * map(this.y, height / 2, height, 0, width);
    let y = 0.9 * map(this.y, height / 2, height, 0, height);

    translate(0, -height * 0.02);
    fill("red");
    noStroke();
    rect(0.5 * width - 0.8 * x, 0.5 * height - y, x * 0.2, y * 2);
    rect(0.5 * width + 0.8 * x, 0.5 * height - y, -x * 0.2, y * 2);
    rect(0.5 * width + x * 0.1, 0.5 * height - y, -x * 0.2, y * 0.7);
    fill("black");
    rect(0.5 * width - 0.8 * x, 0.5 * height + 0.5 * y, x * 0.2, y * 0.5);
    rect(0.5 * width + 0.8 * x, 0.5 * height + 0.5 * y, -x * 0.2, y * 0.5);
    fill("red");
    rect(0.5 * width - x, 0.5 * height - y, x * 2, y * 0.2);
    rect(0.5 * width - x, 0.5 * height - y * 0.5, x * 2, y * 0.2);
    fill("black");
    rect(0.5 * width - x * 1.2, 0.5 * height - y * 1.15, x * 2.4, y * 0.15);

    pop();
  }

  open(s) {
    if (s) {
      this.scene = s;
      this.color = this.getColorBasedOnScene();
      this.active = true;
    }
  }

  getColorBasedOnScene() {
    switch (this.scene) {
      case "forest":
        return "#BEE393";
      case "desert":
        return "#F3CD96";
      case "sea":
        return "#87B0B5";
      case "space":
        return "#AFAFAF";
      case "forestM":
        return [0, 105, 148];
      default:
        return [0, 0, 0];
    }
  }
}
