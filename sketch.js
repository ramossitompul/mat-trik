var streams = [];
var fadeInterval = 2.9;
var symbolSize = 24;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  var x = 0;
  for (var i = 0; i < width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-1000, 0));
    streams.push(stream);
    x += symbolSize
  }

  textFont('monospace');
  textSize(symbolSize);
}

function draw() {
  background(24, 220);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = round(random(2, 25));

  this.setToRandomSymbol = function() {
    var charType = round(random(0, 9999));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set it to Katakana
        this.value = String.fromCharCode(
          0x02600 + round(random(0, 2956))
        );
      } else {
        // set it to numeric
        this.value = round(random(0,9999));
      }
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
      this.x = (this.x >= width) ? 0 : this.x += this.speed;
  }

}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 350));
  this.speed = random(5, 10);

  this.generateSymbols = function(x, y) {
    var opacity = 255;
    var first = round(random(0, 8)) == 1;
    for (var i =0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(
        x,
        y,
        this.speed,
        first,
        opacity
      );
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(220, 190, 10,50, symbol.opacity);
      } else {
        fill(255, 210, 0, 200,symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}

