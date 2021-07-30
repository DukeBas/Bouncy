import p5 from 'p5';
import { Ball } from './ball';

type ColorProfile = 'random' | 'step' | 'positional' | 'starting-speed';

const maxInitialspeed = 3;
const radius = 50;
const iterationsPerFrame = 10;
let borders = true;
let colProf: ColorProfile = 'random';
let counter = 0; // incremented every time a new ball object is created
const maxCounterStep = 5;

const sketch = (p: p5) => {
  const balls: Ball[] = [];

  // returns a new ball object
  const newBall = () => {
    const pos = p.createVector(p.random(0, p.width), -radius);
    const vel = p.createVector(p.random(-maxInitialspeed, maxInitialspeed), p.random(-maxInitialspeed, maxInitialspeed));
    let color: p5.Color = p.color(`hsb(${Math.round(Math.random() * 360)}, 100%, 100%)`); // default (and random) color
    if (colProf == 'step'){
      color = p.color(`hsb(${counter % 360}, 100%, 100%)`);
    } else if (colProf == 'positional') {
      const h = Math.round(p.map(pos.x, 0, p.width, 0, 120));
      color = p.color(`hsb(${h}, 100%, 100%)`);
    } else if (colProf == 'starting-speed') {
      const h = Math.round(p.map(Math.abs(vel.x), 0, maxInitialspeed, 120, 240));
      color = p.color(`hsb(${h}, 100%, 100%)`);
    }
    
    counter += Math.round(Math.random()*maxCounterStep);

    return new Ball(p,
      pos,
      vel,
      radius,
      color
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

  const changedColorProfile = () => {
    // get color profile from DOM
    const el = document.getElementById('color-profile') as HTMLSelectElement;
    const prof: ColorProfile = el.value as ColorProfile;

    colProf = prof;

    p.windowResized();
  }

  // set functions as global functions
  window.changedColorProfile = () => changedColorProfile();
  window.toggleBorders = () => toggleBorders();
  window.saveCanvas = () => p.saveCanvas('canvas', 'png');
  window.windowResized = p.windowResized;
};

const sketchP = new p5(sketch);
