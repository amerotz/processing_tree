class Tree {
  
  int seed;
  float size;
  float angle;
  float stroke;
  color c;
  Tree left = null;
  Tree right = null;
  Tree middle = null;
  
  Tree(int seed){
    this.seed = seed;
    angle = -HALF_PI;
    size = 1;
    stroke = 15;
    c = color(0, 0, 255);
    randomSeed(seed);
    left = new Tree((int)random(999999999), angle+random(PI/12, PI/5), 1, random(0.6, 0.9));
    right = new Tree((int)random(999999999), angle-random(PI/12, PI/5), 1, random(0.6, 0.9));
    if(stones >= 5) middle = new Tree((int)random(999999999), angle+random(-PI/12, PI/12), 1, random(0.6, 0.9));
  }
  
  Tree(int seed, float angle, int it, float size){
    this.seed = seed;
    this.angle = angle;
    this.size = size;
    this.stroke = 15/(1+it);
    this.c = color(255*it/maxIt, 128*it/maxIt, 255-255*it/maxIt);
    randomSeed(this.seed);
    if(it < maxIt) {
      if((int)random(50) <= stones && it < minIt) middle = new Tree((int)random(999999999), angle+random(-PI/12, PI/12), it+1, size*random(0.6, 0.9));
      boolean l = it < minIt || (int)random(2) == 0;
      boolean r = it < minIt || (int)random(4) == 0 || l;
      if(l) left = new Tree((int)random(999999999), angle+random(PI/12, PI/6), it+1, size*random(0.8, 0.95));
      else left = null;
      if(r) right = new Tree((int)random(999999999), angle-random(PI/12, PI/6), it+1, size*random(0.8, 0.95));
      else right = null;
    }
    else {
      left = null;
      right = null;
      middle = null;
    }
  }
  
  void show(){
    show(width/2, 7*height/8, 0, maxIt*age/maxAge);
  }
  
  void show(float startX, float startY, int depth, float a){
    if(depth/maxIt > age/maxAge) return;
    strokeWeight(stroke);
    randomSeed(seed);
    stroke(c);
    
    float b = a;
    if(b > 1) b = 1;
    float angle2 = depth >= minIt ? angle + cos(age/maxAge)/4 : angle;
    float endX = startX+dim*size*cos(angle2)*b;
    float endY = startY+dim*size*sin(angle2)*b;
    line(startX, startY, endX, endY);
    noStroke();
    if(depth > minIt/2 || left == null || right == null) {
      randomSeed(seed);
      fill(c);
      int lfsize = 10+(int)random(10);
      circle(endX, endY, b*lfsize);
    }
    if(left != null) left.show(endX, endY, depth+1, a-1);
    if(right != null) right.show(endX, endY, depth+1, a-1);
    if(middle != null) middle.show(endX, endY, depth+1, a-1);
  }
  
}
