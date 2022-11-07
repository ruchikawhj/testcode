var PLAY = 1;
var END= 0;
var gameState = PLAY;

var hero, hero_running,hero_collided;
var background, invisibleground, backgroundImg;
var stoneObstacle;
 var gameOverImg,restartImg;

function preload(){
    hero_running = loadAnimation("h1.png","h2.png","h3.png","h4.png","h5.png","h6.png","h7.png");
    backgroundImg = loadImage("bg2.jpg");
    stoneObstacle = loadImage("image-removebg-preview.png");
    restartImg = loadImage("restart.webp");
    gameOverImg = loadImage("game_over-removebg-preview.png");
    hero_collided=loadAnimation("h4.png")
}

function setup() {
 createCanvas(600,200);

 
 background = createSprite(300,100,600,200)
 background.addImage(backgroundImg);
 background.scale=1;
 

 hero = createSprite(50,160,20,50);
 hero.addAnimation("running", hero_running);
 hero.addAnimation("collided",hero_collided)
 hero.scale = 0.2;

 gameOver = createSprite(300,100);
 gameOver.addImage(gameOverImg);
 
 restart = createSprite(300,150);
 restart.addImage(restartImg);
 
 gameOver.scale = 0.4;
 restart.scale = 0.09;

 invisibleground = createSprite(200,190,400,10);
 invisibleground.visible = false;

 stoneObstaclesGroup = new Group();
}

function draw() {
 
 if(gameState === PLAY){
    hero.changeAnimation("running");
     gameOver.visible = false;
     restart.visible = false;
     
     background.velocityX = -4

     if (background.x < 150) {
        background.x = background.width/2;
    } 

    if(keyIsDown("space")) {
        hero.velocityY = -12;
       // jumpSound.play();
    }
    
    hero.velocityY = hero.velocityY + 0.8
    spawnstoneObstacles(); 
    if(stoneObstaclesGroup.isTouching(hero)){
        gameState = END;
    }
}
 else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    hero.changeAnimation("collided")

    background.velocityX = 0;
    hero.velocityY = 0;

    stoneObstaclesGroup.setLifetimeEach(-1);

    stoneObstaclesGroup.setVelocityEach(0);

    if(mousePressedOver(restart)) {
        reset();
    }    

  }

  hero.collide(invisibleground);
  
  drawSprites();
}

function reset(){
    gameState=PLAY
    stoneObstaclesGroup.destroyEach();
    gameOver.visible=false
    restart.visible=false
    hero.changeAnimation("running")
  }

  
  function spawnstoneObstacles(){
    if (frameCount % 120 === 0){
      var stone = createSprite(600,165,10,40);
      stone.addImage(stoneObstacle);
    
      stone.velocityX = -6;
                
       stone.scale = 0.3;
       stone.lifetime = 300;
      
       stoneObstaclesGroup.add(stone);
    }
   }