let speed = 4;

function getYSpeed(y){
  return map(y, height * 0.5, height, speed * 0.1, speed * 1.8);
}