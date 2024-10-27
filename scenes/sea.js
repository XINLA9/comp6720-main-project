let osc;
let env;
let ambientSound;
let ripples = [];
let shapes = ["circle", "square"];
const shapeSoundProperties = {
  circle: { waveType: "sine" },
  square: { waveType: "triangle" },
  triangle: { waveType: "cos" },
  cross: { waveType: "sawtooth" },
};
let notes = [];
let bgColor;
let count_whole = 0;
let playable_whole = true;
const notesType = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
const noteFrequencies = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
};

let countNotes = [0, 0, 0];
let sceneCount = [0, 0, 0];
let seaItems = [];

function drawSea() {
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

  // Update and display all ripple effects
  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].update();
    ripples[i].display();

    // If a ripple hits a note, the note changes and plays a sound
    for (let j = notes.length - 1; j >= 0; j--) {
      if (ripples[i].hits(notes[j]) && !ripples[i].collisionRecord[j]) {
        // Push the note away based on ripple's position
        let angle = atan2(notes[j].y - ripples[i].y, notes[j].x - ripples[i].x);
        notes[j].vx = cos(angle) * 3; // Adjust push strength
        notes[j].vy = sin(angle) * 3; // Adjust push strength
        notes[j].changeShape();
        notes[j].play(); // Play the note sound
        ripples[i].collisionRecord[j] = true;
      }
    }

    // Remove ripple if it has fully bloomed
    if (ripples[i].isBloomed) {
      ripples.splice(i, 1);
    }
  }

  // Update and display all notes
  for (let note of notes) {
    note.update();
    note.display();
  }

  // Check if all notes are cleared, if yes, reset the scene
  if (notes.length === 0) {
    resetScene();
  }

  // display all item

  drawSeaScene();
}

function drawSeaScene() {
  if (seaItems.length < 50) {
    if (countNotes[0] > 3) {
      seaItems.push(new SeaWeed(0));
      sceneCount[0]++;
      countNotes[0] = 0;
    }
    if (countNotes[1] > 3) {
      seaItems.push(new SeaWeed(1));
      sceneCount[1]++;
      countNotes[1] = 0;
    }
    if (countNotes[2] > 3) {
      seaItems.push(new SeaWeed(2));
      sceneCount[2]++;
      countNotes[2] = 0;
    }
  }
  print(sceneCount)
  if(!portal.active){
    if (sceneCount[0] > 50) {
       portal.open("desert");
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
  for (let i = seaItems.length - 1; i >= 0; i--) {
    seaItems[i].update();
    seaItems[i].show();

    if (seaItems[i].z < 0) {
      seaItems.splice(i, 1);
    }
  }

  pop();
}

// Reset scene: switch background color, clear ripples, regenerate notes
function resetScene() {
  bgColor = random(presetBgColors);
  ripples = [];
  notes = [];

  let notesNumber = map(max(width, height), 800, 2000, 6, 7);
  generateNotes(random(notesNumber, int((notesNumber * 5) / 4)));

  // Randomly switch note shapes
  let newShape = random(shapes);
  Note.shape = newShape;
  console.log("Switched to shape:", newShape);
}

// Generate non-overlapping notes
function generateNotes(count) {
  let no = 0;
  for (let i = 0; i < count; i++) {
    let note;
    let isOverlapping;

    do {
      note = new Note(no);
      isOverlapping = false;

      // Check for overlap with existing notes
      for (let other of notes) {
        let d = dist(note.x, note.y, other.x, other.y);
        if (d < note.r + other.r) {
          isOverlapping = true;
          break;
        }
      }
    } while (isOverlapping);

    notes.push(note);
    no += 1;
    if (no >= 7) {
      no = 0;
    }
  }
}

// Ripple class representing the expanding circles
class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.rMax = random(200, 400);
    this.speed = random(4, 5);
    this.isBloomed = false;
    this.color = color(random(255), random(255), random(255), 80);
    this.collisionRecord = Array(notes.length).fill(false);
  }

  update() {
    if (this.r < this.rMax) {
      this.r += this.speed;
    } else {
      this.isBloomed = true;
    }
    let transparent = map(this.r, 0, this.rMax, 80, 10);
    this.color.setAlpha(transparent);
  }

  display() {
    push();
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2);
    pop();
  }

  // Check if ripple hits a note
  hits(note) {
    let d = dist(this.x, this.y, note.x, note.y);
    return d < this.r + note.r;
  }
}

// Note class representing the moving notes
class Note {
  static shape = "circle"; // Static variable to track the current shape

  constructor(typeNo) {
    this.x = random(windowWidth / 5, (4 * windowWidth) / 5);
    this.y = random(windowHeight / 5, (4 * windowHeight) / 5);

    let rAdjust = (20 * min(width, height)) / 800;

    this.r = random(rAdjust, rAdjust * 2);
    this.color = color(random(255), random(255), random(255), 200);

    this.scale = notesType[typeNo]; // assign one of the seven notes
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
    this.shape = Note.shape; // Assign shape based on the static shape property

    this.canPlay = true;
    this.canPlayCount = 0;
  }

  update() {
    if (!this.canPlay) {
      this.canPlayCount++;
      this.color.setAlpha(50);
    }

    if (!this.canPlay && this.canPlayCount >= 60) {
      this.canPlay = true;
      this.canPlayCount = 0;
      this.color.setAlpha(180);
    }

    // Notes move away from the mouse as it approaches
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 100) {
      let angle = atan2(this.y - mouseY, this.x - mouseX);
      this.vx = cos(angle) * 5;
      this.vy = sin(angle) * 5;
    }

    // Update note position
    this.x += this.vx;
    this.y += this.vy;

    // Check for collision with boundaries and bounce back
    if (this.x < this.r || this.x > width - this.r) {
      this.vx *= -1;
      this.play();
    }
    if (this.y < this.r || this.y > height - this.r) {
      this.vy *= -1;
      this.play();
    }

    // Check for collision with other notes
    for (let other of notes) {
      if (other !== this && this.intersects(other)) {
        this.resolveCollision(other);
        if (playable_whole) {
          if (this.shape != other.shape) {
            countNotes[0]++;
          }
          if (this.shape == other.shape && this.shape == "circle") {
            countNotes[1]++;
          }
          if (this.shape == other.shape && this.shape != "circle") {
            countNotes[2]++;
          }
          this.play();
        }
      }
    }

    // Add boundary constraints: ensure note is not pushed out of the boundaries when bouncing
    this.constrainToBounds();
  }

  // Play note sound based on its shape and scale
  play() {
    if (this.canPlay && playable_whole) {
      let frequency = noteFrequencies[this.scale];

      let waveType = shapeSoundProperties[this.shape].waveType; // 使用定义的波形
      let attackTime = this.shape === "circle" ? 0.3 : 0.01;
      let releaseTime = this.shape === "circle" ? 0.5 : 0.1;

      osc.setType(waveType);
      env.setADSR(attackTime, 0.2, 0.5, releaseTime);
      env.setRange(1, 0);

      osc.freq(frequency);
      env.play(osc, 0, 0.1);

      this.canPlay = false;
      playable_whole = false;
      this.changeShape();
    }
  }

  // Check if two notes intersect
  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
  }

  // Resolve note collision
  resolveCollision(other) {
    let tempVx = this.vx;
    let tempVy = this.vy;
    this.vx = other.vx;
    this.vy = other.vy;
    other.vx = tempVx;
    other.vy = tempVy;
  }

  constrainToBounds() {
    if (this.x - this.r < 0) {
      this.x = this.r;
      this.vx = abs(this.vx);
    } else if (this.x + this.r > width) {
      this.x = width - this.r;
      this.vx = -abs(this.vx);
    }

    if (this.y - this.r < 0) {
      this.y = this.r;
      this.vy = abs(this.vy);
    } else if (this.y + this.r > height * 0.5) {
      this.y = height * 0.5 - this.r;
      this.vy = -abs(this.vy);
    }
  }

  // Change the shape to a different one randomly
  changeShape() {
    let newShape;
    do {
      newShape = random(shapes);
    } while (newShape === this.shape);

    this.shape = newShape;
    this.color = color(random(255), random(255), random(255), 180);
    let rAdjust = (20 * min(width, height)) / 800;
    this.r = random(rAdjust, rAdjust * 2);
  }

  // Check if hit by a ripple
  isHitByRipple(ripple) {
    let d = dist(this.x, this.y, ripple.x, ripple.y);
    return d < ripple.r;
  }

  // Draw the note based on its shape and color
  display() {
    push();
    translate(this.x, this.y);
    fill(this.color);
    noStroke();
    switch (this.shape) {
      case "circle":
        ellipse(0, 0, this.r * 2);
        break;
      case "square":
        rectMode(CENTER);
        rect(0, 0, this.r * 2, this.r * 2);
        break;
      case "triangle":
        triangle(-this.r, this.r, 0, -this.r, this.r, this.r);
        break;
      case "cross":
        stroke(this.color);
        strokeWeight(this.r / 2);
        rotate(PI / 4);
        line(-this.r, 0, this.r, 0);
        line(0, -this.r, 0, this.r);
        break;
    }
    pop();
  }
}

class SeaWeed {
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
