import p5 from 'p5';
import { Ball } from './ball';

const maxInitialspeed = 3;
const radius = 50;
const iterationsPerFrame = 10;
let borders = true;

const sketch = (p: p5) => {
  const balls: Ball[] = [];

  p.preload = () => { };

  // returns a new ball object
  const newBall = () => {
    return new Ball(p,
      p.createVector(p.random(0, p.width), -radius),
      p.createVector(p.random(-maxInitialspeed, maxInitialspeed), p.random(-maxInitialspeed, maxInitialspeed)),
      radius,
    )
  }

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    console.log("p5 loaded!");

    canvas.position(0, 0);  // make canvas start in top-left corner
    canvas.style('z-index', '-1');  // set canvas as background
    p.frameRate(60);  // target framerate

    p.windowResized(); // make initial state
  };

  // called when window is resized
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background(200);
    p.strokeWeight(borders ? 1 : 0);
    balls.splice(0, balls.length);
  };

  p.draw = () => {
    if (p.frameCount % 10 == 0){  // TODO setting
      balls.push(newBall());
    }
    // p.background(200, 90)
    for (let c = 0; c < iterationsPerFrame; c++) {
      balls.forEach((b, i, o) => {
        if (b.valid) {
          b.draw(); // draw ball
          b.runSim(); // run physics
          if (!b.valid) { // remove balls that are not valid anymore
            o.splice(i, 1);
          }
        }
      });
    }
  }

  const toggleBorders = () => {
    borders = !borders;
    p.windowResized();
  }

  // set functions as global functions
  window.toggleBorders = () => toggleBorders();
  window.saveCanvas = () => p.saveCanvas('canvas', 'png');
  window.windowResized = p.windowResized;
};

const sketchP = new p5(sketch);
