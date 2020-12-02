let rightScore;
let leftScore;
const MAX_SCORE = 10;
let gameStarted;

let edge_sound;
let player_sound;
let lost_sound;


function preload(){
	edge_sound = loadSound("assets/sound/pongSound/edges.mp3");
	player_sound = loadSound("assets/sound/pongSound/player.mp3");
	lost_sound = loadSound("assets/sound/pongSound/lost.mp3");

}

function setup() {
	var myCanvas = createCanvas(800, 600);
	myCanvas.parent("canvas-container");
	
	ball = new Ball();
	left = new Player(true);		
	right = new Player(false);

	gameStarted = false;
	
}

function draw() {
	background( 0 );
	drawCenterLine();

	if(!gameStarted){
		textAlign(CENTER)
	  textSize(72);
		text("Press for start", width/2 , height/2);
	}
			
	if(gameStarted){


		ball.checkPlayerLeft(left);
		ball.checkPlayerRight(right);

		left.show();
		right.show();
		left.update();
		right.update();

		ball.update();
		ball.edges();
		ball.show();
	}

	if(leftScore == MAX_SCORE){
		textAlign(CENTER)
	  textSize(72);
		text("PLAYER 1 WIN", width/2 , height/2 - 100 );
		gameStarted = false;
	}else if(rightScore == MAX_SCORE){
		textAlign(CENTER)
	  textSize(72);
		text("PLAYER 2 WIN", width/2 , height/2 -100);
		gameStarted = false;
	}

	fill(255);
	textSize(32);
  text(leftScore, 64, 40);
	text(rightScore, width - 64, 40);
}

function keyReleased() {
	left.move(0);
	right.move(0);
}

function doubleClicked() {
  ball = new Ball();
	left = new Player(true);
	right = new Player(false);
	gameStarted = false;
}

function startGame(){
	gameStarted = true;
	resetScore();
}

function drawCenterLine() {
	strokeWeight(1);
	stroke(255);
  line( width/2, 0, width/2, height);
}

function resetScore(){
	rightScore = 0;
	leftScore = 0;
}



function keyPressed() {
	if(keyCode == 13){
		if(!gameStarted){
			startGame();
		}else if( gameStarted ){
			gameStarted = false;
		}
	}

	if (keyCode == 65) {
		left.move(-10);
  } else if (keyCode == 90) {
		left.move(15);
	}
	if (keyCode == 75) {
		right.move(-10);
	} else if (keyCode == 77) {
		right.move(15);
	}
}

