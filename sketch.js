var song;
var pg;
var gg;
var img;
var symbolSize = 22;
var streams = [];
var button;

function preload(){
    img=loadImage("kreator.png");
    //song=loadSound("aos.mp3",loaded);
}




function setup() {
    pixelDensity(1,0);
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    gg = createGraphics(400,100,120,60);
    pg = createVideo([]);
    pg.loop();
    pg.hide();
    song=loadSound("aos.mp3",loaded);
    var x = 0;
    var y = floor(random(-2000,0));
    for (var i = 0; i <= width / symbolSize; i++){
        var stream = new Stream();
        stream.generateSymbols(x,y);
        streams.push(stream);
        x += symbolSize;
    }
   
    textSize(symbolSize);

}


function loaded(){
  song.setVolume(0.5);
    song.play();
  }







function draw() {
    background(20,30,40,190);
    gg.background(12,23,45,190);
    image(gg,0,0);
    image(gg,100,100);
    image(gg,90,90);
    image(gg,200,200);
    image(gg,400,400);
    image(gg,400,500);
    image(gg,500,400);
    image(img,img.width/2,img.height/2);
    streams.forEach(function(stream){
        stream.render();        
    });
    
    
  
}

function Symbol(x,y,speed,first){
    this.x = x;
    this.y = y;
    this.value; 
    this.speed = speed;
    this.switchInterval = round(random(2,20));
    this.first = first;
    
    this.setToRandomSymbol = function(){
        if(frameCount % this.switchInterval == 0){
        this.value = String.fromCharCode(
            0x02600 + round(random(0,256))
        );
        }
    }

    this.rain = function(){
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
}
}

function Stream(){
    this.symbols = [];
    this.totalSymbols = round(random(5,30));
    this.speed = random(5,20);
    
    this.generateSymbols = function (x,y){
        var first = floor(random(0,50))==1;
        for(var i = 0; i<= this.totalSymbols; i++){
            symbol = new Symbol(x,y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize; 
            first = false;
        }
    }
    this.render = function(){
        this.symbols.forEach(function(symbol){
            if(symbol.first){
                fill(120,90,90,200);                 
            }else{
            fill(255,0,0,220);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
    });

    }
}
