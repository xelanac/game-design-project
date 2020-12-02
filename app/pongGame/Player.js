class Player{
	
	constructor(isLeft) {
		this.y = height / 2;
		this.w = 8;
		this.h = 60;
		this.yChange = 0

		if(isLeft){
			this.x = this.w + 20 ;
		}else{
			this.x = width - this.w - 20;
		}
	}

	update(){
		this.y += this.yChange;
		this.y = constrain(this.y, this.h/2 + 20, height - this.h / 2 - 20);
	}

	move(steps){
		this.yChange = steps;
	}

	show(){
		fill(255);
		rectMode(CENTER);
		rect( this.x, this.y, this.w, this.h )
	}
}