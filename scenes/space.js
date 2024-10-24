function drawSpace(){
    background("purple");
    
     // draw space and stars
    push();
    rectMode(CENTER);
    translate(width / 2, height / 2)
    background(5);
    for (let i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].show();
    }
    pop();
    
  };

  class star {
    constructor() {
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = random(width);
  
      let types = [
        { color: [255, 255, 255], name: "normal stars", size: 1 },
        { color: [244, 254, 255], name: "white dwarf", size: 1 },
        { color: [169, 200, 125], name: "red gaint", size: 1 },
        { color: [198, 173, 212], name: "blue supergaint", size: 1 }
      ];
  
      let tpyeNum = random(0, 1);
      if (
        tpyeNum < 0.9) {
        this.starsType = types[0];
      } else if (
        tpyeNum >= 0.9 && tpyeNum < 0.93) {
        this.starsType = types[1];
      } else if (
        tpyeNum >= 0.93 && tpyeNum < 0.96) {
        this.starsType = types[2];
      } else if (tpyeNum >= 0.96) {
        this.starsType = types[3];
      }
  
    }
  
    update() {
      this.z -= speed;
      if (this.z < 1) {
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = width;
      }
    }
  
    show() {
  
      push();
      fill(this.starsType.color);
  
      noStroke();
  
      let sx = map(this.x / this.z, 0, 1, 0, width);
      let sy = map(this.y / this.z, 0, 1, 0, height);
  
      let r = map(this.z, 0, width, this.starsType.size * 6, 0);
      ellipse(sx, sy, r, r);
      pop()
  
    }
  }
  