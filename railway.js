let sleepers = [];
let intervals = 20;
let sleeperCount = intervals;
let station;
let portalColors = {};
let stationY;
let stationSpeed;

function setRail() {
  stationY = 0.51 * height;
}

function drawRails() {
  if (stationY < height) {
    push();
    fill("#999999");
    rect(0, stationY, width, 0.5 * height);
    staionSpeed = getYSpeed(stationY);
    stationY += staionSpeed;
  }

  pop();

  push();
  fill("sienna");
  noStroke();
  strokeWeight(2);

  intervals = height / speed / 10;
  sleeperCount++;
  if (sleeperCount >= intervals) {
    sleepers.push(new Sleeper(0));
    sleeperCount = 0;
  }

  // draw railway sleeper
  for (let i = 0; i < sleepers.length; i++) {
    if (sleepers[i].isOffscreen()) {
      sleepers.splice(i, 1);
      continue;
    }
    sleepers[i].update();
    sleepers[i].show();
  }

  // draw rail
  push();
  noStroke();
  fill("grey");
  quad(
    width * 0.1,
    height,
    width * 0.16,
    height,
    width * 0.49,
    height / 2,
    width * 0.485,
    height / 2
  );
  quad(
    width * 0.9,
    height,
    width * 0.84,
    height,
    width * 0.51,
    height / 2,
    width * 0.515,
    height / 2
  );
  // draw rail shadow
  fill(70);
  quad(
    width * 0.175,
    height,
    width * 0.16,
    height,
    width * 0.49,
    height / 2,
    width * 0.491,
    height / 2
  );
  quad(
    width * 0.84,
    height,
    width * 0.825,
    height,
    width * 0.51,
    height / 2,
    width * 0.511,
    height / 2
  );
  pop();
}

class Sleeper {
  constructor() {
    this.y = 0.5 * height;
    this.speed = 0;
  }

  update() {
    this.speed = getYSpeed(this.y);
    this.y += this.speed;
  }

  isOffscreen() {
    return this.y > height;
  }

  show() {
    for (let i = 0; i < 1; i++) {
      let thick = map(this.y, 0.5 * height, height, 0, 0.06 * height);

      let leftXTop = map(
        this.y,
        0.5 * height,
        height,
        width * 0.485,
        width * 0.09
      );
      let rightXTop = map(
        this.y,
        0.5 * height,
        height,
        width * 0.515,
        width * 0.91
      );
      let leftXBottom = leftXTop - ((0.8 * width) / height) * thick;
      let rightXBottom = rightXTop + ((0.8 * width) / height) * thick;

      quad(
        leftXTop,
        this.y,
        rightXTop,
        this.y,
        rightXBottom,
        this.y + thick,
        leftXBottom,
        this.y + thick
      );
    }
  }
}

class Portal {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.sizeFactor = 0.02;
    this.active = false;
    this.scene = random(scenes);

    do {
      this.scene = random(scenes);
    } while (this.scene == scene);

    this.color = this.getColorBasedOnScene();
  }

  update() {
    if (this.active) {
      this.show();

      if (this.y > height * 1.3) {
        scene = this.scene;
        this.reset();
      }

      this.speed = getYSpeed(this.y);
      this.y += this.speed;
    }
  }

  show() {
    push();
    fill(this.color);
    noStroke();
    // print(this.y);
    let shortRadius = map(this.y, height / 2, height, 0.06 * width, width);
    let longRadius = map(
      this.y,
      height / 2,
      height,
      0.1 * height,
      2.5 * height
    );
    arc(this.x, this.y, shortRadius, longRadius, PI, 0, CHORD);
    pop();
  }

  isOffscreen() {
    return this.y > windowWidth;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.sizeFactor = 0.02;
    this.active = false;

    do {
      this.scene = random(scenes);
    } while (this.scene == scene);

    this.color = portalColors[this.scene];
  }

  open(s) {
    this.scene = s;
    this.color = this.getColorBasedOnScene();
    this.active = true;
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

// function getColorBasedOnScene(s) {
//     switch (s) {
//       case "forest":
//         return [34, 139, 34];
//       case "desert":
//         return "yellow";
//       case "sea":
//         return [0, 105, 148];
//       case "space":
//         return [0, 105, 148];
//     }
//   }
