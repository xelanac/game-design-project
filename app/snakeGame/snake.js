//const variables
const constSpeed = 25;
const SPEED = 100;
const snakeSize = 20;
const bonusSize = 20;
const incrementScore = 5;
//colors' const
const yellow = [255, 204, 0];
const red = [255,0,0];
const green = [128, 255, 0];
const lightGreen = [0, 255, 128];
const white = [255];
const darkGray = [50,50,50];
const black = [0];

let myCanvas;
//snake's variables
let snake;
let snakePosX;
let snakePosY;
let snakeLenght;
//in the array is the last position, not the first!!!
let snakeHeadX;
let snakeHeadY;
//bonus' variables
let bonusPosX;
let bonusPosY;
let imgBonus;
let spownBonus;
//game score
let score;
//boolean vars for movements
let _RIGHT;
let _LEFT;
let _UP;
let _DOWN;
//boolean
let gameOver;
let playing;
//this variables generate a random pos for bonus
let _random;
let randomX;
let randomY;

let gameOverSound;
let bonusSound;

function setup() {
    myCanvas = createCanvas(800, 600);
    myCanvas.parent("canvas-container");

    snake = new Array(snakeLenght);
    snakePosX = 200;
    snakePosY = 200;
    snakeLenght = 6;

    score = 0;
    spownBonus = 10000;

    _RIGHT = false;
    _LEFT = false;
    _UP = false;
    _DOWN = true;

    gameOver = false;
    playing = true; //game starts immediately
    imgBonus = 'assets/image/snakeImage/apple.png';

    _random = [0, 25, 50, 75];
    randomX = [0, 100, 200, 300, 400 , 500, 600, 700];
    randomY = [0, 100, 200, 300, 400 , 500];

    gameOverSound = new Audio("assets/sound/snakeSound/game_over.mp3");
    bonusSound = new Audio("assets/sound/snakeSound/bonus.mp3");


    if(playing) {
        firstSetSnake();
        preloadImgBonus();
        setBonusPosition();
    }
}

function draw() {

    background(black);
    frameRate(60);

    fill(green);
    rect(snake[snakeLenght - 1].posX, snake[snakeLenght - 1].posY, snake[snakeLenght - 1].size);

    for (let i = 1; i < snakeLenght - 1; i++) {
        fill(yellow);
        rect(snake[i].posX, snake[i].posY, snake[i].size);
    }
    fill(yellow);
    rect(snake[0].posX, snake[0].posY, snake[0].size);

    if(gameOver){
        fill(darkGray);
        rect(250, 247, 310,150);

        textSize(50);
        textAlign(CENTER);
        fill(red);
        text('Game Over', 400, 300);

        textSize(30);
        textAlign(LEFT);
        fill(white);
        text('Score: ' + score, 320, 345);

        textSize(17);
        textAlign(LEFT);
        fill(lightGreen);
        text('Press ENTER to restart the game', 275, 380);
    }

    if(!gameOver) {
        image(imgBonus, bonusPosX, bonusPosY, bonusSize, bonusSize);
    }
}
//game's threads
setInterval(snakeMovement, SPEED);

function firstSetSnake() {
    for (let i = 0; i < snakeLenght; i++) {
        snake[i] = new SnakeCell(snakePosX, snakePosY, snakeSize);
        snakePosY = snake[i].downMovement(snakePosY , constSpeed); //start going down
    }
}

function setSnake() {
    let newPosX;
    let newPosY;
/*
    if(_UP){
        newPosX = snake[1].posX;
        newPosY = snake[1].posY + 25;
    }
    if(_DOWN){
        newPosX = snake[1].posX;
        newPosY = snake[1].posY - 25;
        console.log("down 1")
    }
    if(_LEFT){
        newPosX = snake[1].posX + 25;
        newPosY = snake[1].posY;
        console.log("left 1")

    }
    if(_RIGHT){
        newPosX = snake[1].posX - 25;
        newPosY = snake[1].posY;
        console.log("right 1")

    }*/
    snake[snakeLenght - 1] = new SnakeCell(snake[snakeLenght - 2].posX, snake[snakeLenght - 2].posY, snake[snakeLenght - 2].size);

    for(let i = snakeLenght - 1; i > 0; i--){
        snake[i].posX = snake[i - 1].posX;
        snake[i].posY = snake[i - 1].posY;
    }

    snake[0].posX = newPosX;
    snake[0].posY = newPosY;
}

function snakeMovement(){
    if(playing) {
        for (let j = 0; j < snakeLenght - 1; j++) {
            let nextPosX = snake[j + 1].posX;
            let nextPosY = snake[j + 1].posY;

            snake[j].movement(nextPosX, nextPosY);
        }

        if (_RIGHT) {
            snake[snakeLenght - 1].posX = snake[snakeLenght - 1].rightMovement(snake[snakeLenght - 1].posX , constSpeed);
        }
        if (_LEFT) {
            snake[snakeLenght - 1].posX = snake[snakeLenght - 1].leftMovement(snake[snakeLenght - 1].posX , constSpeed);
        }
        if (_UP) {
            snake[snakeLenght - 1].posY = snake[snakeLenght - 1].upMovement(snake[snakeLenght - 1].posY, constSpeed);
        }
        if (_DOWN) {
            snake[snakeLenght - 1].posY = snake[snakeLenght - 1].downMovement(snake[snakeLenght - 1].posY, constSpeed);
        }

        changeVerticalBorder();
        changeHorizontalBorder();
        gameOverFunction();
        checkCollision();
    }
}

function changeVerticalBorder(){
    for(let i = 0; i < snakeLenght; i++){
        if(snake[i].posX >= 800 - snakeSize) {
            snake[i].posX = 0;
        }
        if(snake[i].posX < 0){
            snake[i].posX = 800;
        }
    }
}
function changeHorizontalBorder(){
    for(let i = 0; i < snakeLenght; i++){
        if(snake[i].posY >= 600 - snakeSize) {
            snake[i].posY = 0;
        }
        if(snake[i].posY < 0){
            snake[i].posY = 600;
        }
    }
}

function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            if(!_DOWN) {
                _RIGHT = false;
                _LEFT = false;
                _UP = true;
                _DOWN = false;
            }
            break;
        case DOWN_ARROW:
            if(!_UP) {
                _RIGHT = false;
                _LEFT = false;
                _UP = false;
                _DOWN = true;
            }
            break;
        case RIGHT_ARROW:
            if(!_LEFT){
                _RIGHT = true;
                _LEFT = false;
                _UP = false;
                _DOWN = false;
            }
            break;
        case LEFT_ARROW:
            if(!_RIGHT){
                _RIGHT = false;
                _LEFT = true;
                _UP = false;
                _DOWN = false;
            }
            break;
        case ENTER:
            resetGame();
            break;
    }
}

function gameOverFunction(){

    for(let i = 0; i < snakeLenght - 1; i++){
        if(snake[snakeLenght - 1].posX === snake[i].posX
        && snake[snakeLenght - 1].posY=== snake[i].posY){
            gameOver = true;
            playing= false;
            gameOverSound.play();
        }
    }
}

function resetGame(){
    gameOver = false;
    playing = true;
    score = 0;
    snakePosX = 200;
    snakePosY = 200;
    //go down
    _RIGHT = false;
    _LEFT = false;
    _UP = false;
    _DOWN = true;
    snakeLenght = 6;
    firstSetSnake();
}

function generateRandomPositionX(x){

    x = random(_random) + random(randomX);

    console.log("random x: " + x);

    for(let i = 0; i < snakeLenght; i++){ //dont let spowning in snake's body
        if(snake[i].posX === x){
            x = random(_random) + random(randomX);
        }
    }
    return x;
}

function generateRandomPositionY(y){

    y = random(_random) + random(randomY);
    console.log("random y: " + y);

    for(let i = 0; i < snakeLenght; i++){ //dont let spowning in snake's body
        if(snake[i].posY === y ){
            y = random(_random) + random(randomY);
        }
    }
    return y;
}

function setBonusPosition(){
        bonusPosX = generateRandomPositionX(bonusPosX);
        bonusPosY = generateRandomPositionY(bonusPosY);
}

function preloadImgBonus() {
    imgBonus = loadImage(imgBonus);
}

function checkCollision() {
    snakeHeadX = snake[snakeLenght - 1].posX;
    snakeHeadY = snake[snakeLenght - 1].posY;

    if(_LEFT){
        if((snakeHeadY >= bonusPosY && snakeHeadY <= bonusPosY + bonusSize ||
            snakeHeadY <= bonusPosY && snakeHeadY + snakeSize >= bonusPosY) &&
            snakeHeadX <= bonusPosX + bonusSize && snakeHeadX >= bonusPosX){
            updateStatistics();
        }
    }

    if(_RIGHT){
         if((bonusPosY <= snakeHeadY && bonusPosY + bonusSize >= snakeHeadY || //debug
            snakeHeadY <= bonusPosY && snakeHeadY + snakeSize >= bonusPosY) &&
            snakeHeadX + snakeSize >= bonusPosX && snakeHeadX + snakeSize <= bonusPosX + bonusSize){
             updateStatistics();
         }
    }

    if(_UP){
        if((snakeHeadX >= bonusPosX && snakeHeadX <= bonusPosX + bonusSize ||
            snakeHeadX + snakeSize >= bonusPosX && snakeHeadX + snakeSize <= bonusPosX + bonusSize) &&
            snakeHeadY <= bonusPosY + bonusSize && snakeHeadY >= bonusPosY){
            updateStatistics();
        }
    }

    if(_DOWN){
        if((snakeHeadX >= bonusPosX && snakeHeadX <= bonusPosX + bonusSize ||
            snakeHeadX <= bonusPosX && snakeHeadX + snakeSize >= bonusPosX) &&
            snakeHeadY + snakeSize <= bonusPosY + bonusSize && snakeHeadY + snakeSize >= bonusPosY){
            updateStatistics();
        }
    }

}

function updateStatistics(){
    score += incrementScore;
    snakeLenght += 1;
    spownBonus = 10000;
    setSnake();
    setBonusPosition();
    bonusSound.play();
}

