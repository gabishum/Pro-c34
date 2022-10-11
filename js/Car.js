class Car {
  constructor(x, y, width, height, carPos, carAnimation) {
  
    this.animation = carAnimation;
    this.speed = 0.05;
    this.body = Bodies.rectangle(x, y, width, height);
    this.width = width;
    this.height = height;

    this.carPosition = carPos;
    this.isBroken = false;

    World.add(world, this.body);
  }
  animate() {
    this.speed += 0.05;
  }

  remove(index) {
    this.animation = brokenCarAnimation;
    this.speed = 0.05;
    this.width = 300;
    this.height = 300;
    this.Isbroken = true;
    setTimeout(() => {
      Matter.World.remove(world, cars[index].body);
      delete cars[index];
    }, 2000);
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    var index = floor(this.speed % this.animation.length);

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index], 0, this.carPosition, this.width, this.height);
    pop();
  }
}
