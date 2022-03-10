var bola,posicao,database;

function setup(){
  database = firebase.database();
  console.log(database);
 
  createCanvas(500,500);

  bola = createSprite(100,100,10,10);
  bola.shapeColor = "red";

  var bolaPosicao = database.ref('ball/position');
  bolaPosicao.on("value",lerBanco,showError);
 
}

function draw(){
  background("white");

    if(posicao !== undefined){
    if(keyDown(LEFT_ARROW)){
      escreverBanco(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      escreverBanco(5,0);
    }
    else if(keyDown(UP_ARROW)){
      escreverBanco(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
      escreverBanco(0,5);
    }
    drawSprites();
  }
}

function lerBanco(data){
    posicao = data.val();
    bola.x = posicao.x;
    bola.y = posicao.y;
}

function escreverBanco(a,b){
    database.ref('ball/position').set({
      'x': posicao.x + a,
      'y': posicao.y + b
    })
}

function showError(){
  console.log("Algo está errado");
}