
var bola, position;
var database;

function setup(){
  
 database = firebase.database();
 console.log(database);
  createCanvas(500,500);

  bola = createSprite(150,150,10,10);
  bola.shapeColor = "red";

  var bolaPosition = database.ref('bola/position');
  bolaPosition.on("value", readPosition,showError);
 
}

function draw(){
  background("white");

    if(position !== undefined){
    if(keyDown(LEFT_ARROW)){
     writePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,5);
    }
    drawSprites();
    }
}

function writePosition(x,y){
  database.ref('bola/position').set({
    'x': position.x + x,
    'y': position.y + y

  })
}

function readPosition(data){
  position = data.val();
  bola.x = position.x;
  bola.y = position.y;
}

function showError(){
  console.log("Algo está errado no banco de dados");
}