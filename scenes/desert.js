function drawDesert() {
  background(251, 180, 88); // Desert background color

  // Draw the ground (desert floor)
  push();
  noStroke();
  fill(243, 65, 55); // Reddish ground color
  rect(0, 0.5 * height, width, 0.5 * height);
  pop();

  // Draw pyramids
  drawPyramid(width * 0.3, 0.5 * height, 150); // Left pyramid
  drawPyramid(width * 0.7, 0.55 * height, 200); // Right pyramid (bigger)
}

function drawPyramid(baseX, baseY, size) {
  push();
  noStroke();
  fill(216, 164, 65); // Pyramid color (sandy yellow)

  // Draw pyramid using a triangle
  triangle(
    baseX - size / 2, baseY, // Bottom-left corner
    baseX + size / 2, baseY, // Bottom-right corner
    baseX, baseY - size       // Top vertex
  );

  // Draw shadow side of the pyramid
  fill(194, 144, 53); // Darker shade for shadow
  beginShape();
  vertex(baseX, baseY - size); // Top vertex
  vertex(baseX + size / 2, baseY); // Bottom-right corner
  vertex(baseX, baseY); // Bottom-center (shadow)
  endShape(CLOSE);

  pop();
}
