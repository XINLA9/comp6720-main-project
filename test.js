
show()
push();
noStroke();

// Set the main color based on the scene type
fill(this.getColorBasedOnScene());

// Draw the front side of the pyramid
triangle(
    this.sx - this.size / 2, this.sy,
    this.sx + this.size / 2, this.sy,
    this.sx, this.sy - this.size
);

// Draw the side of the pyramid
fill(194, 144, 53);
beginShape();
vertex(this.sx, this.sy - this.size);
vertex(this.sx + this.size / 2, this.sy);
vertex(this.sx, this.sy);
endShape(CLOSE);

pop();
  }

// Return the color based on the scene type
getColorBasedOnScene() {
    switch (this.sceneType) {
        case "ancient":
            return [216, 164, 65]; // Ancient pyramid color
        case "ruins":
            return [169, 143, 99]; // Ruins color
        case "sandstorm":
            return [210, 180, 140]; // Sandstorm color
        default:
            return [216, 164, 65]; // Default pyramid color
    }


    push();
    fill(this.color);
    noStroke();

    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    let r = map(this.z, 0, width, this.size * 5, 0);

    stroke(101, 67, 33);
    strokeWeight(5);
    line(sx, sy, sx, sy - 50); // Tree trunk

    noStroke();
    fill(this.color);

    triangle(sx - 30, sy - 50, sx + 30, sy - 50, sx, sy - 90); // Bottom triangle
    triangle(sx - 25, sy - 80, sx + 25, sy - 80, sx, sy - 120); // Middle triangle
    triangle(sx - 20, sy - 110, sx + 20, sy - 110, sx, sy - 140); // Top triangle
    pop();