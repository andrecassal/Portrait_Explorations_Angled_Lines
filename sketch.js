/* eslint-disable no-undef, no-unused-vars */
let img;
let swatch;

function preload() {
  img = loadImage(
    "mona.jpg"
    // "Muybridge_race_horse_animated.gif"
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // swatch = new Palette();
  // swatch.swatch(2);

  const grid = new Grid();
  grid.setImage(img, 0, height * 0.5);
  grid.setBlock(15);
  grid.render();
  noLoop();
}

class Grid {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = width;
    this.h = height;
    this.blk = 10;
    this.minStroke = 1;
    this.maxStroke = 10;
  }
  setBlock(b) {
    this.blk = b;
  }
  setImage(img, w, h) {
    this.img = img;
    this.img.resize(w, h);
  }
  getPixel(x, y) {
    return this.img.get(x, y);
  }
  render() {
    this.renderStart();
    for (let x = 0; x < this.w; x += this.blk) {
      for (let y = 0; y < this.h; y += this.blk) {
        this.itemRender(x, y, this.blk, this.blk);
      }
    }
    this.renderEnd();
  }
  renderStart() {
    strokeWeight(5);
  }
  itemRender(x1, y1, x2, y2) {
    push();
    const px = this.getPixel(x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2);
    stroke(px);
    strokeWeight(map(px[0], 0, 255, this.maxStroke, this.minStroke, true));
    if (random() > 0.5) {
      line(x1, y1, x1 + x2, y1 + y2);
    } else {
      line(x1 + x2, y1, x1, y1 + y2);
    }
    pop();
  }
  renderEnd() {}
}
