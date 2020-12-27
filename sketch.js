var age = 0;
var LAVA = 0;
var maxLava = 500000;
var stones = 22;
var id = 156;
const maxIt = 10;
const minIt = 5;
var dim = 50 + 20 * stones / 30;
const maxAge = 100;
var t;

var leaves;

function setup() {
  createCanvas(500, 500);
  t = new Tree(id);

}

function draw() {
  background(59, 112, 128);

  //background
  sky();

  ground(id, 25 * height / 32, color(20, 4, 1));

  ground(id + 1, 13 * height / 16, color(39, 8, 2));

  //tree
  t.show();

  ground(id + 2, 14 * height / 16, color(58, 12, 3));


  //randomize
  if (keyIsDown(ENTER)) {
    id = Math.floor(random(1000000));
    t = new Tree(id);
    age = 0;
    stones = random(10);
    dim = 50 + 20 * stones / 10.0;
  }

  //age & stats
  age += 1;
  LAVA += random(1);

  fill(255);
  text("Age: " + age, 0, 11);
  text("Stones: " + stones, 0, 22);
  text("ID: " + id, 0, 33);
  text("LAVA: " + LAVA, 0, 44);
}

function sky(){
  noStroke();
  let k = 50;
  for(i = 0.6*k; i > 0; i--){
    fill(lerpColor(color(243, 246, 245), color(255, 207, 0), i/(2*k)));
    circle(width / 2, 5 * height / 8, dim * maxIt * i/k);
  }
}

function ground(seed, h, c) {
  randomSeed(seed);
  fill(c);
  beginShape();
  vertex(0, height);
  let k = 50;
  for (i = 0; i <= k; i++) {
    let x = i * width / k;
    let y = random(-5, 5) + h;
    vertex(x, y);
  }
  vertex(width, height);
  endShape(CLOSE);
}

function leaf(seed, endX, endY, angle, a) {
  randomSeed(seed);
  noStroke();
  fill(lerpColor(color(255, 207, 0, 220), color(224, 41, 0), random(1)));
  let lfsize1 = 10+random(3);
  let lfsize2 = 15+random(5);
  push();
  translate(endX, endY);
  rotate(angle + PI / 2);
  ellipse(0, 0, a * lfsize1, a * lfsize2);
  pop();
}

//tree object
class Tree {

  //tree is fully generated once
  constructor(seed, angle = -HALF_PI, it = 0, size = 1) {

    //init parameters
    this.seed = seed;
    this.angle = angle;
    this.size = size;
    this.stroke = 15 / (1 + it);
    this.c = lerpColor(color(96, 77, 83), color(213, 197, 200), it / maxIt);
    randomSeed(this.seed);

    //generate rest of the tree
    if (it < maxIt) {
      //first time
      if (it == 0) {

        //main branches
        this.left = new Tree(random(999999999), this.angle + random(PI / 12, PI / 5), 1, random(0.6, 0.9));
        this.right = new Tree(random(999999999), this.angle - random(PI / 12, PI / 5), 1, random(0.6, 0.9));

        //optional third branch
        if (stones >= 5) this.middle = new Tree(random(999999999), this.angle + random(-PI / 12, PI / 12), 1, random(0.6, 0.9));

      }

      //rest of the tree
      //at least 2 branches will spawn under minIt iterations
      //from minIt to maxIt branches are not mandatory and have 60% chance of spawning
      else if (it < minIt || random(1) <= 0.6) {

        //main branches
        this.left = new Tree(random(999999999), this.angle + random(PI / 12, PI / 6), it + 1, this.size * random(0.8, 0.95));
        this.right = new Tree(random(999999999), this.angle - random(PI / 12, PI / 6), it + 1, this.size * random(0.8, 0.95));

        //optional middle branch
        if (random(stones * 3) <= stones && it < minIt)
          this.middle = new Tree(random(999999999), this.angle + random(-PI / 12, PI / 12), it + 1, this.size * random(0.6, 0.9));
      }
      //when it reaches maxIt or no branch is spawned it stops
      else {
        this.left = null;
        this.right = null;
        this.middle = null;
      }
    }
  }

  //shows tree
  show1(startX, startY, depth) {

    //how many branches to show in advance
    let k = 2;

    let growPerc = age / maxAge;
    let a = maxIt * growPerc - (depth - k);
    a = a > 1 ? 1 : a;

    //show tree proportionally to age
    if ((depth - k) / maxIt > growPerc) {
      //draw leaf to avoid empty branch before exiting
      leaf(this.seed, startX, startY, this.angle, a);
      return;
    }

    let t = age > maxAge ? 1 : growPerc;
    strokeWeight(this.stroke * t + (1 - t) * 6);
    randomSeed(this.seed);
    stroke(this.c);

    //leaf movement
    let angle2 = depth >= minIt ? this.angle + Math.cos(millis() / 4000) / 4 : this.angle;
    let endX = startX + dim * this.size * Math.cos(angle2) * a;
    let endY = startY + dim * this.size * Math.sin(angle2) * a;
    line(startX, startY, endX, endY);

    //show leaves
    if (this.left == null || this.right == null) {
      leaf(this.seed, endX, endY, this.angle, a);
    }

    //show branches recursively
    if (this.left != null) this.left.show1(endX, endY, depth + 1);
    if (this.right != null) this.right.show1(endX, endY, depth + 1);
    if (this.middle != null) this.middle.show1(endX, endY, depth + 1);

  }

  show() {
    this.show1(width / 2, 7 * height / 8 + 5, 0);
  }

}
