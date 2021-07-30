import p5 from 'p5';

const sketch = (p: p5) => {

  p.preload = () => { };

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    console.log("p5 loaded!");

    canvas.position(0, 0);  // make canvas start in top-left corner
    canvas.style('z-index', '-1');  // set canvas as background
    p.frameRate(60);  // target framerate
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(0,200,200);
    p.ellipse(100, 150, 180, 60);
  }

  // set functions as global functions
  window.saveCanvas = () => p.saveCanvas('canvas', 'png');
  window.windowResized = p.windowResized;
};

const sketchP = new p5(sketch);
