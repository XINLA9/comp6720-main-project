let isMF = false;
let leftTrees = [];
let rightTrees = [];
let maxTrees = 120; // Maximum number of trees to generate

function drawForest() {
  if (!isMF) {
    background(57, 190, 127); // Forest background
    push();
    noStroke();
    fill(41, 130, 79); // Ground color
    rect(0, 0.5 * height, width, 0.5 * height); // Draw ground
    pop();

    // Randomly generate trees along the rail track
    if (leftTrees.length < maxTrees) {
      for (let i = 0; i < maxTrees; i++) {
        let xPos = random(width * 0.1, width * 0.9); // Random x position
        let yOffset = random(-50, 50); // Slight vertical offset for natural feel
        leftTrees.push(new Tree(xPos, 0.5 * height + yOffset));
      }
    }

    // Draw all the trees
    drawTree();
  }
}

function drawTree() {
  push();
  rectMode(CENTER);
  translate(width / 2, height / 2);
  for (let tree of leftTrees) {
    tree.update();
    tree.show();
  }
  pop();
}

class Tree {
  constructor() {
    this.reset()
  }

  // Reset the position and size of the pyramid
  reset() {
    do {
      this.x = random(- 0.5 * width, 0.5 * width);
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

    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

    let currentSize = map(this.z, 0, width, this.size * 5, 0);

    stroke(101, 67, 33);
    strokeWeight(5);
    line(sx, sy, sx, sy - currentSize * 1.5); 

    noStroke();
    fill(this.getColorBasedOnScene());

    // 绘制树叶，保持原来的三角形形状
    triangle(
      sx - currentSize / 2, sy - currentSize * 1.5, // 三角形底部
      sx + currentSize / 2, sy - currentSize * 1.5, // 三角形底部
      sx, sy - currentSize * 2 // 三角形顶部
    );

    triangle(
      sx - currentSize / 2 * 0.8, sy - currentSize * 1.8, // 第二层三角形底部
      sx + currentSize / 2 * 0.8, sy - currentSize * 1.8, // 第二层三角形底部
      sx, sy - currentSize * 2.2 // 第二层三角形顶部
    );

    triangle(
      sx - currentSize / 2 * 0.6, sy - currentSize * 2.2, // 第三层三角形底部
      sx + currentSize / 2 * 0.6, sy - currentSize * 2.2, // 第三层三角形底部
      sx, sy - currentSize * 2.6 // 第三层三角形顶部
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
