let isMF = false;
let magicTrees = [];
let maxMagicTrees = 120;

function drawMagicForest() {
  if (!isMF) {
    background(0,0,0);
    push();
    noStroke();
    fill(60,68,110);
    rect(0, 0.5 * height, width, 0.5 * height);
    pop();

    if (magicTrees.length < maxMagicTrees) {
      for (let i = 0; i < maxMagicTrees; i++) {
        let xPos = random(width * 0.1, width * 0.9);
        let yOffset = random(-50, 50);
        magicTrees.push(new MagicTree(xPos, 0.5 * height + yOffset));
      }
    }

    drawMagicTree();
  }
}

function drawMagicTree() {
  push();
  rectMode(CENTER);
  translate(width / 2, height / 2);
  for (let magicTree of magicTrees) {
    magicTree.update();
    magicTree.show();
  }
  pop();
}

class MagicTree {
  constructor() {
    this.reset();
  }

  reset() {
    do {
      this.x = random(-0.5 * width, 0.5 * width);
    } while (this.x > -0.3 * width && this.x < 0.3 * width);
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

    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

    let currentSize = map(this.z, 0, width, this.size * 5, 0);

    stroke(101, 67, 33);
    strokeWeight(5);
    line(sx, sy, sx, sy - currentSize * 1.5);

    noStroke();
    fill(this.getColorBasedOnScene());

    triangle(
      sx - currentSize / 2, sy - currentSize * 1.5,
      sx + currentSize / 2, sy - currentSize * 1.5,
      sx, sy - currentSize * 2
    );

    triangle(
      sx - currentSize / 2 * 0.8, sy - currentSize * 1.8,
      sx + currentSize / 2 * 0.8, sy - currentSize * 1.8,
      sx, sy - currentSize * 2.2
    );

    triangle(
      sx - currentSize / 2 * 0.6, sy - currentSize * 2.2,
      sx + currentSize / 2 * 0.6, sy - currentSize * 2.2,
      sx, sy - currentSize * 2.6
    );

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
