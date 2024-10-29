let seaTower = [];

function drawSeaM() {
  background(31, 94, 139);
  push();
  noStroke();
  fill(color(132, 181, 201));
  rect(0, 0.5 * height, width, 0.5 * height);
  pop();

  if (!playable_whole && count_whole <= 10) {
    count_whole += 1;
  }

  if (count_whole > 10) {
    count_whole = 0;
    playable_whole = true;
  }
  // display all item

  drawSeaSceneM();
}

function drawSeaSceneM() {
  if (seaTower.length < 50) {
    if (countNotes[0] > 3) {
      seaTower.push(new SeaWeed(0));
      sceneCount[0]++;
      countNotes[0] = 0;
    }
    if (countNotes[1] > 3) {
      seaTower.push(new SeaWeed(1));
      sceneCount[1]++;
      countNotes[1] = 0;
    }
    if (countNotes[2] > 3) {
      seaTower.push(new SeaWeed(2));
      sceneCount[2]++;
      countNotes[2] = 0;
    }
  }
  if(!portal.active){
    if (sceneCount[0] > 50) {
       portal.open("desert");
       sceneCount = [0,0,0];
    }
    if (sceneCount[1] > 50) {
       portal.open("forest");
    }
    if (sceneCount[2] > 50) {
       portal.open("space");
    }
  }

  // Draw seaitems
  push();
  rectMode(CENTER);
  translate(width / 2, height / 2);
  for (let i = seaTower.length - 1; i >= 0; i--) {
    seaTower[i].update();
    seaTower[i].show();

    if (seaTower[i].z < 0) {
      seaTower.splice(i, 1);
    }
  }

  pop();
}

class SeaTower {
  constructor(no) {
    let side = random(["left", "right"]);
    do {
      if (side == "left") {
        this.x = random(-0.5 * width, 0);
      } else {
        this.x = random(0, 0.5 * width);
      }
    } while (this.x > -0.1 * width && this.x < 0.1 * width);

    this.y = random(height * 0.05, height * 0.1);
    this.z = width + height;
    this.side = "side";

    let types = ["sand", "star", "leaf"];

    this.type = types[no];

    this.color = this.getColorBasedOnType();
  }

  getColorBasedOnType() {
    switch (this.type) {
      case "sand":
        return random([color("#FF9800"), color("#FF5722")]);
      case "leaf":
        return random([color("#8BC34A"), color("#CDDC39")]);
      case "star":
        return random([color("#9E9E9E"), color("#00BCD4")]);
    }
  }

  update() {
    this.z -= speed;
    this.sx = map(this.x / this.z, 0, 1, 0, width);
    this.sy = map(this.y / this.z, 0, 1, 0, height);
    this.size = map(this.z, 0, width + height, width * 0.2, 0);

    this.thick = map(this.z, 0, width + height, 15, 0);
  }

  show() {
    push();

    stroke(34, 139, 34);
    strokeWeight(this.thick);
    noFill();

    beginShape();
    curveVertex(this.sx, this.sy);
    curveVertex(this.sx, this.sy);
    curveVertex(this.sx + random(-20, 20), this.sy - this.size * 0.5);
    curveVertex(this.sx + random(-30, 30), this.sy - this.size * 1.5);
    curveVertex(this.sx + random(-10, 10), this.sy - this.size * 2.5);
    endShape();

    let color = this.color;
    color.setAlpha(200);
    fill(color);

    noStroke();

    triangle(
      this.sx - this.size * 0.2,
      this.sy - this.size * 0.5,
      this.sx + this.size * 0.2,
      this.sy - this.size * 0.5,
      this.sx + random(-5, 5),
      this.sy - this.size * 1
    );

    triangle(
      this.sx - this.size * 0.3,
      this.sy - this.size * 1.2,
      this.sx + this.size * 0.3,
      this.sy - this.size * 1.2,
      this.sx + random(-10, 10),
      this.sy - this.size * 1.7
    );

    triangle(
      this.sx - this.size * 0.25,
      this.sy - this.size * 1.8,
      this.sx + this.size * 0.25,
      this.sy - this.size * 1.8,
      this.sx + random(-5, 5),
      this.sy - this.size * 2.3
    );
    pop();
  }
}
