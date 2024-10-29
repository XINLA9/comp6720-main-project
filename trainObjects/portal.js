class Portal {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.active = false;
  }

  update() {
    if (this.active) {
      this.show();

      // if train pass the portal, close portal and change scene.
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

  open(s) {
    if(s){
      this.scene = s;
      this.color = this.getColorBasedOnScene();
      this.active = true;
    }
  }

  getColorBasedOnScene() {
    switch (this.scene) {
      case "forest":
        return "#BEE393";
      case "desert":
        return "#F3CD96";
      case "sea":
        return "#87B0B5";
      case "space":
        return "#AFAFAF";
      case "forestM":
        return [0, 105, 148];
      default:
        return [0, 0, 0];
    }
  }
}


function getYSpeed(y) {
  return map(y, height * 0.5, height, speed * 0.1, speed * 1.8);
}