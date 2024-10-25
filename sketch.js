function drawRails() {
  push();
  fill("sienna");
  stroke("sienna");
  strokeWeight(2);

  for (let i = 0; i < sleepers.length; i++) {
    sleepers[i].update();
    sleepers[i].show();
  }

  push();
  noStroke();
  fill("grey");
  
  quad(width * 0.1,height,
    width * 0.16,height,
    width * 0.49, height / 2,
    width * 0.48,height /2);
  
  quad(width * 0.9,height,
    width * 0.84,height,
    width * 0.51, height / 2,
    width * 0.52,height / 2);
  fill(70);
  quad(width * 0.17,height,
    width * 0.16,height,
    width * 0.49, height / 2,
    width * 0.491,height /2);
  
  quad(width * 0.84,height,
    width * 0.82,height,
    width * 0.51, height / 2,
    width * 0.511,height /2);
  
  pop();
  railOffset += speed * 0.1;
}

class Sleeper{
constructor(){
this.y = height / 2;

}

update(){

}

show(){
for (let i = 0; i < 1; i++) {
let progress = (i + railOffset) % 50;

let y = map(progress, 0, 50, height / 2, height);
let widthFactor = pow(progress / 50, 1.2); 

let leftXTop = map(widthFactor, 0, 1, width / 2, width * 0.1);
let rightXTop = map(widthFactor, 0, 1, width / 2, width * 0.9);
let leftXBottom = map(widthFactor, 0, 1, width / 2, width * 0.08);
let rightXBottom = map(widthFactor, 0, 1, width / 2, width * 0.92);

let thick = map(progress, 2, 5, 0, 40);

quad(
leftXTop, y - progress, 
rightXTop, y - progress, 
rightXBottom, y + progress, 
leftXBottom, y + progress
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
  
  do{this.scene = random(scenes)}
  while( this.scene == scene);
  
  this.color = portalColors[this.scene];
  
}

update() {
  if(this.active){
    
    this.show();
    
    if (this.y > height * 1.3) {
      scene = this.scene;
      this.reset();
    }
    this.y += 5; 
  }
}

show(){
   push();
    fill(this.color);
    noStroke();
    let shortRadius = map(this.y, height / 2, height, 0.06 * width,  width );
    let longRadius = map(this.y, height / 2, height, 0.1 * height,  2.5 * height );
    arc(this.x, this.y, shortRadius, longRadius, PI, 0, CHORD);
    pop();
}

reset(){
  this.x = width / 2; 
  this.y = height / 2; 
  this.sizeFactor = 0.02; 
  this.active = false;
  
  do{this.scene = random(scenes)}
  while( this.scene == scene);
  
  this.color = portalColors[this.scene];
}
}