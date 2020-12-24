
var age = 0;
var LAVA = 0;
var stones = 10;
var id = 1;
const maxIt = 10;
const minIt = 5;
var dim = 50+20*stones/10.0;
const maxAge = 100;
var t;

function setup() {
  createCanvas(500, 500);
  t = new Tree(id);
}

function draw(){
  background(0);
  noStroke();
  fill(255);
  circle(width/2, 5*height/8, 400);
  t.show(width/2, 7*height/8, 0, maxIt*age/maxAge);
  if(keyIsDown(ENTER)) {
    id = Math.floor(random(1000000));
    t = new Tree(id);
    age = 0;
    stones = random(10);
    dim = 50+20*stones/10.0;
  }
  noStroke();
  fill(128);
  rect(0, 7*height/8, width, height);
  age+=0.5;
  fill(255);
  text("Age: "+ age, 0, 11);
  text("Stones: "+ stones, 0, 22);
  text("ID: "+ id, 0, 33);
}

class Tree {
  
  constructor(seed, angle=-HALF_PI, it=1, size=1){
    this.seed = seed;
    this.angle = angle;
    this.size = size;
    this.stroke = 15/(1+it);
    this.c = color(255*it/maxIt, 128*it/maxIt, 255-255*it/maxIt);
    randomSeed(this.seed);
    if(it < maxIt) {
      if(random(50) <= stones && it < minIt) this.middle = new Tree(random(999999999), angle+random(-PI/12, PI/12), it+1, size*random(0.6, 0.9));
      let l = it < minIt || random(2) == 0;
      let r = it < minIt || random(4) == 0 || l;
      if(l) this.left = new Tree(random(999999999), angle+random(PI/12, PI/6), it+1, size*random(0.8, 0.95));
      else this.left = null;
      if(r) this.right = new Tree(random(999999999), angle-random(PI/12, PI/6), it+1, size*random(0.8, 0.95));
      else this.right = null;
    }
    else {
      this.left = null;
      this.right = null;
      this.middle = null;
    }
  }
  
  show(startX, startY, depth, a){
    if(depth/maxIt > age/maxAge) return;
    strokeWeight(stroke);
    randomSeed(this.seed);
    stroke(this.c);
    
    let b = a;
    if(b > 1) b = 1;
    let angle2 = depth >= minIt ? this.angle + cos(age/maxAge)/4 : this.angle;
    let endX = startX+dim*this.size*cos(angle2)*b;
    let endY = startY+dim*this.size*sin(angle2)*b;
    line(startX, startY, endX, endY);
    noStroke();
    if(depth > minIt/2 || this.left == null || this.right == null) {
      randomSeed(this.seed);
      fill(this.c);
      let lfsize = 10+Math.floor(random(10));
      circle(endX, endY, b*lfsize);
    }
    if(this.left != null) this.left.show(endX, endY, depth+1, a-1);
    if(this.right != null) this.right.show(endX, endY, depth+1, a-1);
    if(this.middle != null) this.middle.show(endX, endY, depth+1, a-1);
  }
  
}

