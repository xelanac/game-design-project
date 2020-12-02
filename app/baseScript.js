//PONG 0
//SNAKE 1
//TETRIS 2
//SPACE INVADERS 3

function change(game){

  switch(game){
    case 0:
      window.location.href = "pong.html";
    break;
    case 1:
      window.location.href = "snake.html";
    break;
    case 2:
      window.location.href = "tetris.html";
    break;
    case 3:
      window.location.href = "space_invaders.html";
    break;
  }

}