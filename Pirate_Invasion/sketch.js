const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var tower,ground,cannon,cannonBall,backgroundImg;
var angle
var balls=[];
var boat
var boats=[];
var boatAnimation=[]
//*
//=[];
var boatSpriteData,boatSpriteSheet;


function preload(){
    backgroundImg = loadImage("./assets/background.gif");
    boatSpriteData=loadJSON("assets/boats/boat.json");
    boatSpriteSheet=loadImage("assets/boats/boat.png");
    //*
    boatAnimation=loadAnimation("assets/boat1.png","assets/boat2.png","assets/boat3.png","assets/boat4.png");
}
function setup(){
    canvas = createCanvas(windowWidth,windowHeight);
    engine = Engine.create();
    world = engine.world;
    angle = -PI / 4;
    ground = new Ground(0, height - 1, width * 2, 1);
    tower = new Tower(150, 350, 160, 310);
    cannon = new Cannon(180, 110, 100, 50, angle);
    var boatFrames = boatSpriteData.frames;
    //*
 /*for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }*/
 //   boat=new Boat(width,height-100,200,200,-100);
    

    
}

function draw(){
    background(189);
   // push();
     //translate(width/2,height/2)
    
        image(backgroundImg, 0, 0, width, height);
    //pop();

    

  Engine.update(engine);
  ground.display();
    /*TA in C26
    Matter.Body.setVelocity(boat.body,{
        x:-0.9,
        y:0
    })*/
 // SA C26
 showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for(var j=0;j<boats.length;j++){
        if(balls[i]!==undefined && boats[j]!==undefined){
            var collision=Matter.SAT.collides(balls[i].body,boats[j].body);
           // console.log(collision)
           if (collision.collided) {
            boats[j].remove(j);
  
                Matter.World.remove(world,balls[i].body);
                balls.splice(i,1);
                i--;
            }
        }
    }
  }

  cannon.display();
  tower.display();
  //boat.display();
}
function keyReleased(){
    if(keyCode===DOWN_ARROW){
        //console.log("Hello")
       balls[balls.length-1].shoot(); 
        cannonBall.shoot();

    }

}
function keyPressed(){
    if(keyCode===DOWN_ARROW){
        cannonBall=new CannonBall(cannon.x, cannon.y);
        balls.push(cannonBall);
    }
}
function showCannonBalls(ball,index){
     ball.display();
    if(ball.body.position.x>=width || ball.body.position.y>=height-50){
        Matter.World.remove(world,ball.body);
        balls.splice(index,1)
    }
   
}
function showBoats(){
    if (boats.length > 0) {
     // console.log(width - 300  )
     // console.log(boats[boats.length - 1].body.position.x )
        if (
            boats.length < 4 &&
            boats[boats.length - 1].body.position.x < width - 300
          )  {
             console.log("if")
                var positions = [-130, -100, -120, -80];
                var position = random(positions);
                var boat = new Boat(width,height-100, 200, 200, position,boatAnimation);
                boats.push(boat);
                
        }
        for (var i = 0; i < boats.length; i++) {
            Matter.Body.setVelocity(boats[i].body, {
              x: -0.9,
              y: 0
            });
            boats[i].display();
            boats[i].animate();
        }
       
        
    }
    else {
        var boat = new Boat(width, height-100, 200, 200, -100,boatAnimation);
        boats.push(boat);
      }
}