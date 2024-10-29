let seaTrees = [];
let treeCount = [0, 0, 0, 0];
let isMagicForest = false;

function drawForest() {
  isMagicForest = false;
  background(57, 190, 127);
  push();
  noStroke();
  fill(41, 130, 79);
  rect(0, 0.5 * height, width, 0.5 * height);
  pop();

  if (frameCount % 2 == 0) {
    let side = random(["left", "right"]);
    seaTrees.push(new Tree(side));
  }

  drawTree();
}

function drawTree() {
  push();
  rectMode(CENTER);
  translate(width / 2, height / 2);

  for (let i = seaTrees.length - 1; i >= 0; i--) {
    let tree = seaTrees[i];
    tree.update();
    tree.show();

    if (tree.z < 0) {
      seaTrees.splice(i, 1);
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

    let types = ["silver", "sand",  "star","magic", "normal"];

    if (!isMagicForest){
      let number = random(1);
      if (number < 0.8) {
        this.type = "normal";
      } else if(number >=0.8 && number < 0.9){
        this.type = "magic";
      }else
        {
        this.type = types[int(random(3))];
      }
    }
    else{
      this.type = "night";
    }
    this.magicColor = random(["#607D8B", "#9E9E9E"]);
    this.color = this.getColorBasedOnType();
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
        return "#00BCD4";
      case "normal":
        return random(["#8BC34A", "#4CAF50"]);
      case "night":
        return random(["#8BC34A", "#4CAF50"]);
    }
  }

  update() {
    this.z -= speed;
    this.sx = map(this.x / this.z, 0, 1, 0, width);
    this.sy = map(this.y / this.z, 0, 1, 0, height);
    if(this.type == "night"){
      let nightSize = map(this.z, 0, width + height, width * 0.4, 0)
      this.size = map(this.z, 0, width + height, nightSize * 1.5, nightSize * -2);
      // print(this.size);
    }
    else{
      this.size = map(this.z, 0, width + height, width * 0.3, 0);
    }
    this.thick = map(this.z, 0, width + height, 15, 0);
    this.isClicked();
  }

  show() {
    push();

    stroke(101, 67, 33);
    strokeWeight(this.thick);
    line(this.sx, this.sy, this.sx, this.sy - this.size * 1);

    noStroke();
    if(isMagicForest){
      if(this.size > 0){
      fill(this.magicColor);
    }
    else{
      fill(this.color);
    }
    }
    else{
      fill(this.color);
    }
    
    triangle(
      this.sx - (this.size / 2) * 1.3,
      this.sy - this.size * 1,
      this.sx + (this.size / 2) * 1.3,
      this.sy - this.size * 1,
      this.sx,
      this.sy - this.size * 1.8
    );

    triangle(
      this.sx - (this.size / 2) * 1,
      this.sy - this.size * 1.5,
      this.sx + (this.size / 2) * 1,
      this.sy - this.size * 1.5,
      this.sx,
      this.sy - this.size * 2.3
    );

    triangle(
      this.sx - (this.size / 2) * 0.8,
      this.sy - this.size * 2,
      this.sx + (this.size / 2) * 0.8,
      this.sy - this.size * 2,
      this.sx,
      this.sy - this.size * 2.7
    );

    if (this.isHovered() && this.type != "normal" && this.type != "night") {
      stroke(255);
      strokeWeight(5);

      line(
        this.sx - (this.size / 2) * 1.3,
        this.sy - this.size * 1,
        this.sx + (this.size / 2) * 1.3,
        this.sy - this.size * 1
      );
      line(
        this.sx + (this.size / 2) * 1.3,
        this.sy - this.size * 1,
        this.sx,
        this.sy - this.size * 1.8
      );
      line(
        this.sx,
        this.sy - this.size * 1.8,
        this.sx - (this.size / 2) * 1.3,
        this.sy - this.size * 1
      );

      line(
        this.sx - (this.size / 2) * 1,
        this.sy - this.size * 1.5,
        this.sx + (this.size / 2) * 1,
        this.sy - this.size * 1.5
      );
      line(
        this.sx + (this.size / 2) * 1,
        this.sy - this.size * 1.5,
        this.sx,
        this.sy - this.size * 2.3
      );
      line(
        this.sx,
        this.sy - this.size * 2.3,
        this.sx - (this.size / 2) * 1,
        this.sy - this.size * 1.5
      );

      line(
        this.sx - (this.size / 2) * 0.8,
        this.sy - this.size * 2,
        this.sx + (this.size / 2) * 0.8,
        this.sy - this.size * 2
      );
      line(
        this.sx + (this.size / 2) * 0.8,
        this.sy - this.size * 2,
        this.sx,
        this.sy - this.size * 2.7
      );
      line(
        this.sx,
        this.sy - this.size * 2.7,
        this.sx - (this.size / 2) * 0.8,
        this.sy - this.size * 2
      );
    }

    pop();
  }

  isClicked() {
    if (mouseIsPressed) {
      if (this.isHovered() && !portal.active) {
        switch (this.type) {
          case "silver":
            portal.open("sea");
            break;
          case "sand":
            portal.open("desert");
            break;
          case "magic":
            portal.open("forestM");
            break;
          case "star":
            portal.open("space");
            break;
          case "normal":
            break;
          case "magic":
            break;
        }
      }
    }
  }

  isHovered() {
    return (
      dist(
        mouseX - 0.5 * width,
        mouseY - 0.5 * height,
        this.sx,
        this.sy - this.size * 1
      ) <
      this.size / 4
    );
  }
}
