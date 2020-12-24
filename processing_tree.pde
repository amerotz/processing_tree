float age = 0;
float LAVA = 0;
float stones = 10;
int id = 1;
final float maxIt = 10;
final int minIt = 5;
float dim = 50+20*stones/10.0;
final float maxAge = 100;
Tree t;

void setup(){
  size(500, 500);
  t = new Tree(id);
}

void draw(){;
  background(0);
  noStroke();
  fill(255);
  circle(width/2, 5*height/8, 400);
  t.show();
  if(keyPressed) {
    id = (int)random(1000000);
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
