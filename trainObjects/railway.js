let sleepers = [];
let intervals = 20;
let sleeperCount = intervals;
let station;
let stationY;
let stationSpeed;

function setRail() {
  stationY = 0.51 * height;
}

let speed = 4;

function getYSpeed(y) {
  return map(y, height * 0.5, height, speed * 0.1, speed * 1.8);
}

function getXSpeed(x) {
  return map(x, width * 0.5, width, speed * 0.1, speed * 1.8);
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

