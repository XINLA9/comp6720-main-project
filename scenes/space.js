let stars = [];
let planet;

let types = [
  { color: [255, 255, 255], name: "sea", size: 1 },
  { color: [244, 254, 255], name: "forest", size: 1 },
  { color: [169, 200, 125], name: "desert", size: 1 },
  { color: "blue", name: "", size: 1 },
];

function setSpace() {
  planet = new Planet();
}

function drawSpace() {
  background("purple");

  // draw space and stars
  push();
  rectMode(CENTER);
  translate(width / 2, height / 2);
  background(5);

  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
  planet.update();
  planet.show();

  pop();
}

class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);

    let types = [
      { color: [255, 255, 255], name: "normal stars", size: 1 },
      { color: [244, 254, 255], name: "white dwarf", size: 1 },
      { color: [169, 200, 125], name: "red gaint", size: 1 },
      { color: [198, 173, 212], name: "blue supergaint", size: 1 },
    ];

    let tpyeNum = random(0, 1);
    if (tpyeNum < 0.9) {
      this.starsType = types[0];
    } else if (tpyeNum >= 0.9 && tpyeNum < 0.93) {
      this.starsType = types[1];
    } else if (tpyeNum >= 0.93 && tpyeNum < 0.96) {
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
    // fill(this.starsType.color);
    fill(this.starsType.color);

    noStroke();

    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

    let r = map(this.z, 0, width, this.starsType.size * 5, 0);
    ellipse(sx, sy, r, r);
    pop();
  }
}

class Planet {
  constructor() {
    this.x = random(-width * 0.4, width * 0.4);
    this.y = random(-height * 0.4, height * 0.4);
    this.z = width + height;

    this.sx = 0;
    this.sy = 0;
    this.r = 0;

    this.scene = random(scenes);
    do this.scene = random(scenes);
    while (this.scene == "space");
  }

  update() {
    this.z -= speed;
    if (this.z < 1) {
      this.x = random(-width * 0.4, width * 0.4);
      this.y = random(-height * 0.4, height * 0.4);
      this.z = this.z = width + height;

      let newScene = random(scenes);
      do newScene = random(scenes);
      while (newScene == "space" || newScene == "mf" || newScene == this.scene);
      this.scene = newScene;
    }

    this.sx = map(this.x / this.z, 0, 1, 0, width);
    this.sy = map(this.y / this.z, 0, 1, 0, height);
    this.r = map(this.z, 0, width + height, width * 0.4, 0);

    this.isClicked();
  }

  show() {
    push();

    fill(this.getColorBasedOnScene());

    noStroke();

    ellipse(this.sx, this.sy, this.r, this.r);

    if (this.isHovered()) {
      stroke(255);
      strokeWeight(0.05 * this.r);
      noFill();
      ellipse(this.sx, this.sy, this.r, this.r);
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
      this.r / 2
    );
  }

  getColorBasedOnScene() {
    switch (this.scene) {
      case "forest":
        return [34, 139, 34];
      case "mf":
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
