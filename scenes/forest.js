let trees = [];

function drawForest() {
  background(57, 190, 127);
  push();
  noStroke();
  fill(41, 130, 79);
  rect(0, 0.5 * height, width, 0.5 * height);
  pop();

  if(frameCount % 2 == 0){
    let side = random(["left", "right"]);
    trees.push(new Tree(side));
  }
  

  drawTree();
}

function drawTree() {
  push();
  rectMode(CENTER);
  translate(width / 2, height / 2);
  
  for (let i = trees.length - 1; i >= 0; i--) {
    let tree = trees[i];
    tree.update();
    tree.show();

    if (tree.z < 0) {
      trees.splice(i, 1);
    }
  }
  pop();
}

class Tree {
  constructor(side) {
    this.reset(side);
  }

  reset(side) {
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

    let types = ["silver", "sand", "magic", "star", "normal"];
    
    let number = random(1);
    if (number < 0.95) {
      this.type = "normal";
    } else {
      let specialIndex = int(random(4));
      this.type = types[specialIndex];
    }
    this.clicked = false;
  }

  getColorBasedOnType() {
    switch (this.type) {
      case "silver":
        return "silver";
      case "sand":
        return "#FF5722";
      case "magic":
        return "#673AB7";
      case "star":
        return "#FFEB3B";
      case "normal":
        return "#8BC34A";
    }
  }

  update() {
    this.z -= speed;
    this.sx = map(this.x / this.z, 0, 1, 0, width);
    this.sy = map(this.y / this.z, 0, 1, 0, height);
    this.size = map(this.z, 0, width + height, width * 0.3, 0);
    this.thick = map(this.z, 0, width + height,15, 0);
    this.isClicked();
  }

  show() {
    push();

    fill(this.getColorBasedOnType());
    noStroke();

    stroke(101, 67, 33);
    strokeWeight(this.thick);
    line(this.sx, this.sy, this.sx, this.sy - this.size * 1);

    noStroke();
    fill(this.getColorBasedOnType());

    triangle(
      this.sx - this.size / 2 * 1.3, this.sy - this.size * 1,
      this.sx + this.size / 2 * 1.3, this.sy - this.size * 1,
      this.sx, this.sy - this.size * 1.8
    );

    triangle(
      this.sx - this.size / 2 * 1, this.sy - this.size * 1.5,
      this.sx + this.size / 2 * 1, this.sy - this.size * 1.5,
      this.sx, this.sy - this.size * 2.3
    );

    triangle(
      this.sx - this.size / 2 * 0.8, this.sy - this.size * 2,
      this.sx + this.size / 2 * 0.8, this.sy - this.size * 2,
      this.sx, this.sy - this.size * 2.7
    );

    pop();
  }

  isClicked() {
    if (mouseIsPressed) {
      if (this.isHovered()) {
      }
    }
  }

  isHovered() {
    return (
      dist(mouseX - 0.5 * width, mouseY - 0.5 * height, this.sx, this.sy) <
      this.size / 2
    );
  }
}
