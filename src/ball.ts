import p5 from 'p5';

const exampleBSettings = {
  gravity: 0.1,
  bounceChance: 0.8, // chance a ball will bounce, between 0 and 1
  dampeningFactor: 0.9, // amount of velocity retained after bounce
}
type bSettings = typeof exampleBSettings;



export class Ball {
  p: p5;  // reference to p5 sketch
  pos: p5.Vector;
  vel: p5.Vector;
  size: number; // circle radius of ball
  color: p5.Color;
  valid: boolean; // marking for removal to save resources
  settings: bSettings;

  constructor(sketchRef: p5, startPos: p5.Vector, startVel: p5.Vector, size: number, settings?: bSettings) {
    this.p = sketchRef;
    this.pos = startPos;
    this.vel = startVel;
    this.size = size;
    this.color = this.p.color(`hsb(${Math.round(Math.random() * 360)}, 100%, 100%)`);
    this.valid = true;
    if (settings === undefined) {
      this.settings = exampleBSettings;
    } else {
      this.settings = settings;
    }
  }

  // draw this ball
  draw() {
    this.p.fill(this.color);
    this.p.ellipse(this.pos.x, this.pos.y, this.size);
  }

  // do one step of physics
  runSim() {
    this.vel.y += this.settings.gravity; // apply gravity
    this.pos.add(this.vel); // apply speed to position

    // check for out of bounds on the sides
    if (this.pos.x < 0) {
      this.pos.x *= -1;
      this.vel.x *= -1;
    } else if (this.pos.x > this.p.width) {
      this.pos.x = this.p.width - 2 * (this.pos.x - this.p.width);
      this.vel.x *= -1;
    }

    // check for bouncing at the bottom
    if (this.pos.y > this.p.height) {
      if (Math.random() < this.settings.bounceChance) {
        this.pos.y = this.p.height;
        this.vel.y *= -this.settings.dampeningFactor;
      }
    }

    // if ball didn't bounce, mark it
    if (this.pos.y > this.p.height) {
      this.valid = false;
    }
  }
}
