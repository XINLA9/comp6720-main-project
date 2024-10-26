let isMF = false;
let trees = [];
let maxTrees = 20; // Maximum number of trees to generate

function drawForest() {
  if (!isMF) {
    background(57, 190, 127); // Forest background
    push();
    noStroke();
    fill(41, 130, 79); // Ground color
    rect(0, 0.5 * height, width, 0.5 * height); // Draw ground
    pop();

    // Randomly generate trees along the rail track
    if (trees.length < maxTrees) {
      for (let i = 0; i < maxTrees; i++) {
        let xPos = random(width * 0.1, width * 0.9); // Random x position
        let yOffset = random(-50, 50); // Slight vertical offset for natural feel
        trees.push(new Tree(xPos, 0.5 * height + yOffset));
      }
    }

    // Draw all the trees
    for (let tree of trees) {
      tree.update();
      tree.show();
    }
  }
}

class Tree {
  constructor() {
    this.x = random(-width, width);  // 随机生成 x 位置
    this.y = random(-height, height); // 随机生成 y 位置
    this.z = random(width);            // 随机生成深度

    // 定义树的属性
    this.color = [34, 139, 34];  // 树的颜色（绿色）
    this.size = 15;               // 树的大小
  }

  update() {
    this.z -= speed; // 更新深度
    if (this.z < 1) {
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = width; // 重置深度
    }
  }

  show() {
    push();
    fill(this.color); // 使用树的颜色

    noStroke();

    // 根据 z 值计算位置
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

    // 根据 z 值计算大小
    let r = map(this.z, 0, width, this.size * 5, 0);
    ellipse(sx, sy, r, r); // 绘制树的形状
    pop();
  }
}
