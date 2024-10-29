let treesM = [];

function drawForestM() {
  isMagicForest = true;
  background(10);
  push();
  noStroke();
  fill(60, 68, 110);
  rect(0, 0, width, 0.5 * height);
  pop();

// Draw moon
  let moon1X = 0.35 * width;
  let moon1Y = 0.15 * height;
  let moon2X = 0.65 * width;
  let moon2Y = 0.85 * height;
  let moonRadius = width * 0.2;
  let moon1IsHovered = (dist(mouseX, mouseY, moon1X, moon1Y) < moonRadius);
  let moon2IsHovered = (dist(mouseX, mouseY, moon2X, moon2Y) < moonRadius);
  
  noStroke();
  if(moon1IsHovered){
    stroke("yellow");
    strokeWeight(5);
  }
  fill("white");
  circle( moon1X, moon1Y,moonRadius);
  

  noStroke();
  if(moon2IsHovered){
    stroke("white");
    strokeWeight(5);
  }
  fill("yellow");
  circle( moon2X, moon2Y,moonRadius);

  if(mouseIsPressed){
    if(moon1IsHovered && !portal.active){
      portal.open("space");
    }
    if(moon2IsHovered && !portal.active){
      portal.open("forest");
    }
  }

  // Draw magic tree
  if (frameCount % 2 == 0) {
      let side = random(["left", "right"]);
      treesM.push(new Tree(side));
    }
  drawTreeM();
}

function drawTreeM() {
  push();
  rectMode(CENTER);
  translate(width / 2, height / 2);
  for (let i = treesM.length - 1; i >= 0; i--) {
    let tree = treesM[i];
    tree.update();
    tree.show();
    if (tree.z < 0) {
      treesM.splice(i, 1);
    }
  }
  pop();
}
