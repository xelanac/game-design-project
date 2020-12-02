class Ball{

  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.r = 8;
    this.xSpeed = 0;
    this.ySpeed = 0;

    this.reset();
  }

  checkPlayerLeft(p){  
    if( this.y - this.r < p.y + p.h / 2 &&
        this.y + this.r > p.y - p.h / 2 &&
        this.x - this.r < p.x + p.w / 2 ) 
      {
        if (this.x > p.x) {
          let diff = this.y - (p.y - p.h / 2);
          let rad = radians(45);
          let angle = map(diff, 0, p.h, -rad, rad);
          this.xSpeed = 7 * cos(angle);
          this.ySpeed = 7 * sin(angle);
          this.x = p.x + p.w / 2 + this.r;
        }
        
        player_sound.play();
      }           
    }

  checkPlayerRight(p){
    if( this.y - this.r < p.y + p.h / 2 &&
        this.y + this.r > p.y - p.h / 2 &&
        this.x + this.r > p.x - p.w / 2 )
      {
        if (this.x < p.x) {
          let diff = this.y - (p.y - p.h / 2);
          let angle = map(diff, 0, p.h, radians(225), radians(135));
          this.xSpeed = 7 * cos(angle);
          this.ySpeed = 7 * sin(angle);
          this.x = p.x - p.w / 2 - this.r;
        }
        
        player_sound.play();
      }
  }

  update(){
    this.x += this.xSpeed;
    this.y += this.ySpeed; 
  }

  reset(){
    this.x = width/2;
    this.y = height/2;
    let angle = random(-PI / 4, PI / 4);
    this.xSpeed = 7 * Math.cos(angle);
    this.ySpeed = 7 * Math.sin(angle);

    if( random(1) < 0.5){
      this.xSpeed *= -1;
    }
  }


  edges(){
    if( this.y - this.r < 0 || this.y + this.r > height ){
      this.ySpeed *= -1;
      edge_sound.play();
    }

    if( this.x + this.r < 0){
      rightScore++;
      lost_sound.play();
      this.reset();
    }

    if( this.x - this.r > width){
      leftScore++;
      lost_sound.play();
      this.reset();
    }
  }

  show(){
    fill( 255 );
    ellipse( this.x, this.y , this.r * 2);
  }
}