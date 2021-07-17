
var trex, trex_running, edges;
var groundImage,ground;
var invisibleGround
var cloud,cloudImage,cloudGroup
var obstacle1
var obstacle2
var obstacle3
var obstacle4
var obstacle5
var obstacle6
var obstacle,obstacleGroup
var score = 0
var PLAY = 1
var END = 0
var gameState = PLAY
var restart,game_over
var restart_image,game_over_image;
var jumpSound,checkpointSound,dieSound
var message = "Hello Mohammed!!!";

function preload(){

  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  restart_image=loadImage("restart.png")
  game_over_image=loadImage("gameOver.png");

  jumpSound = loadSound("jump.mp3");
  checkpointSound = loadSound("checkpoint.mp3")
  dieSound = loadSound("die.mp3")
}

function setup(){
    createCanvas(600,200);

    
    //console.log(message);
    
    // creating trex
    trex = createSprite(50,180,20,50);
    trex.addAnimation("running", trex_running); //1
    trex.addAnimation("collided", trex_collided);
    edges = createEdgeSprites();
    
    //adding scale and position to trex
    trex.scale = 0.5;
    trex.x = 50
    trex.debug = true;
    trex.setCollider("rectangle",0,0,200,trex.height);
    //1 param  : shape ===> circle/rectangle
    //2Pamar :  x-offset ==> 
    //3 param : y-offset
    //4 param : radius/width
    //5 pram : height

    invisibleGround = createSprite(300,200,600,10)
    invisibleGround.visible=false

    ground = createSprite(300,180,600,10)
    ground.addImage("ground", groundImage)
    
    restart=createSprite(300,140,10,10)
    game_over=createSprite(300,100,10,10);
   

   restart.addImage("rs",restart_image);
   game_over.addImage("go",game_over_image);
    
   restart.scale = 0.4;
   game_over.scale = 1.5;

   game_over.visible = false;
   restart.visible = false;

  // frameRate(68);
    cloudGroup = createGroup()
    obstacleGroup = createGroup()
  }


function draw(){
  console.log(getFrameRate());
  //set background color 
  background(180);
  //console.log(message)
  //console.log(gameState);
  if(gameState===PLAY){
    ground.velocityX= -(4 + score/100);

  if(score%100===0 && score > 0){
      checkpointSound.play();
  }

    score = score+Math.round(getFrameRate()/60)

    if(keyDown("space")&&trex.y>=150){
      jumpSound.play();
      trex.velocityY = -10;
    }
    if(ground.x<=0){
      ground.x = ground.width/2
    }
    
    trex.velocityY = trex.velocityY + 0.5;

    
  if(frameCount%50===0){
    spawnCloud()
   
    //console.log(message);
  }

  if(frameCount%80===0){
    spawnObstacles()
  }
  if(trex.isTouching(obstacleGroup)){
    gameState=END
    dieSound.play();
  }
  }
  else if(gameState===END){
    trex.changeAnimation("collided");
    ground.velocityX=0
    trex.velocityY=0
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);

    game_over.visible = true;
    restart.visible = true;

  }

  text("SCORE: "+score,500,50)

  if(mousePressedOver(restart)){
    reset();
  }

  
  trex.collide(invisibleGround)
 
  drawSprites();
}

function reset(){
  game_over.visible = false;
  restart.visible = false;
  cloudGroup.destroyEach();
  obstacleGroup.destroyEach();
  score = 0
  trex.changeAnimation("running")
  gameState = PLAY
}

function spawnCloud(){
cloud = createSprite(610,20,10,10)
cloud.velocityX=-4
cloud.y = Math.round(random(20,70))
cloud.addImage("cloud",cloudImage)
cloud.scale = 0.5
cloud.depth=trex.depth
trex.depth = trex.depth+1
cloud.lifetime = 600/4
cloudGroup.add(cloud)
}

function spawnObstacles(){
obstacle=createSprite(610,160,10,10)
obstacle.velocityX = -(4 + score/100) 
obstacle.lifetime=600/4
var rand =  Math.round(random(1,6));

switch(rand){
  case 1:
    obstacle.addImage("ob1",obstacle1);
    break;

  case 2:
    obstacle.addImage("ob2",obstacle2);
    break;

  case 3:
    obstacle.addImage("ob3",obstacle3);
    break;
  case 4:
    obstacle.addImage("ob4",obstacle4);
    break;

  case 5:
    obstacle.addImage("ob5",obstacle5);
    break;

  case 6:
    obstacle.addImage("ob6",obstacle6);
    break;
  
      
}
obstacleGroup.add(obstacle)
obstacle.scale=0.5
}
   