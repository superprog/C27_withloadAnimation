class Boat{
    constructor(x, y, w, h, boatPos,boatAnimation) {
        var options = {
          restitution: 0.8,
          friction: 1.0,
          density: 1.0,
          label:"boat"
        };
        
        this.animation=boatAnimation
        this.speed=0.01
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.width = w;
        this.height = h;
       
        this.boatPosition = boatPos;
      this.image = loadImage("assets/boat.png");
        World.add(world, this.body);
      }
      remove(index) {
        Matter.World.remove(world, boats[index].body);
        boats.splice(index, 1);
    
      }
    display(){
        var angle = this.body.angle;
        var pos = this.body.position;
        console.log("Speed"+this.speed)
        var index=floor(this.speed % this.animation.length)
        //console.log("round"+Math.round(random(0,this.animation.length-1)));
        //console.log("Mod"+this.speed % this.animation.length)
       // console.log("floor"+floor(this.speed % this.animation.length))
        //floor(this.speed % this.animation.length)
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        //c26
        // image(this.image, 0, this.boatPosition, this.width, this.height);
        //C27
        animation(this.animation, 0, this.boatPosition, this.width, this.height);
        //image(this.animation[index], 0, this.boatPosition, this.width, this.height);
        noTint();
        pop();
    }
    animate(){
        this.speed +=0.05 % 1.1
        //0.05 % 1.1
    }
}