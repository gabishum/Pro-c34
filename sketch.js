const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, ground, cannon;
var balls = [];
var cars = [];
var score = 0;
var CarAnimation = [];
var carSpritedata, carSpritesheet;

var brokenCarAnimation =[];
var brokenCarSpritedata, brokenCarSpritesheet ;



function preload() {
  backgroundImg = loadImage("assets/background.gif");
 // predioImage = loadImage("assets/predio.png");
 carSpritedata = loadJSON("assets/boat/car.json");
 carSpritesheet = loadImage("assets/boat/car.png");;
  brokenCarSpritedata = loadJSON("assets/boat/brokencar.json");
  brokenCarSpritesheet = loadImage("assets/boat/brokenCar.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
   angleMode(DEGREES)
  angle = 35


  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

 // predio = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
//  World.add(world, predio);

  cannon = new Cannon(160, 110, 100, 200, angle);

  var carFrames = carSpritedata.frames;
  for (var i = 0; i < carFrames.length; i++) {
    var pos = carFrames[i].position;
    var img = carSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    CarAnimation.push(img);
  }



  var brokenCarFrames = brokenCarSpritedata.frames;
  for (var i = 0; i <brokenCarFrames.length; i++){
    var pos = brokenCarFrames[i].position;
    var img = brokenCarSpritesheet.get(pos.x, pos.y,pos.w,pos.h);
    brokenCarAnimation.push(img);
  }
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  //push();
  //translate(predio.position.x, predio.position.y);
  //rotate(predio.angle);
  //imageMode(CENTER);
 // image(predioImage, 0, 0, 160, 310);
 // pop();

  showCars();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionWithCar(i);
  }

  cannon.display();


}

function collisionWithCar(index) {
  for (var i = 0; i < cars.length; i++) {
    if (balls[index] !== undefined && cars[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, cars[i].body);

      if (collision.collided) {
          cars[i].remove(i);
        

        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      if (!ball.isSink) {
        ball.remove(index);
      }
    }
  }
}

function showCars() {
  if (cars.length > 0) {
    if (
      cars[cars.length - 1] === undefined ||
      cars[cars.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var car = new Car(
        width,
        height - 100,
        170,
        170,
        position,
        CarAnimation
      );

      cars.push(car);
    }

    for (var i = 0; i < cars.length; i++) {
      if (cars[i]) {
        Matter.Body.setVelocity(cars[i].body, {
          x: -0.10,
          y: 0
        });

        cars[i].display();
        cars[i].animate();
        
    }
    }
  } else {
    var car = new Car (width, height - 60, 170, 170, -60, CarAnimation);
    cars.push(car);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}
